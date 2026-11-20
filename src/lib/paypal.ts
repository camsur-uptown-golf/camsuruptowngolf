/**
 * PayPal — PayPal balance at card, sa hosted approval page ng PayPal.
 * Katabi ito ng PayMongo (GCash, Maya, GrabPay); ang guest ang pumipili.
 *
 * Daloy (Orders API v2, intent CAPTURE):
 *   1. `createPaypalOrder()` → order + `approve` URL; doon nag-a-approve ang guest.
 *   2. Pagbalik sa `return_url`, `capturePaypalOrder()` — DITO lang talaga
 *      nakukuha ang pera. Hindi pinagkakatiwalaan ang pagbalik mismo: ang
 *      sagot ng PayPal sa capture ang batayan.
 *   3. Pangalawang daan: ang webhook (/api/paypal/webhook), para ma-capture at
 *      makumpirma kahit isinara ng guest ang tab pagkatapos mag-approve.
 *
 * Mga susi sa `.env.local`: PAYPAL_ENV (sandbox | live), PAYPAL_CLIENT_ID,
 * PAYPAL_CLIENT_SECRET, at PAYPAL_WEBHOOK_ID para sa webhook.
 */

function api(): string {
  return process.env.PAYPAL_ENV?.trim() === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";
}

export function paypalConfigured(): boolean {
  return Boolean(process.env.PAYPAL_CLIENT_ID?.trim() && process.env.PAYPAL_CLIENT_SECRET?.trim());
}

let cached: { token: string; expires: number } | null = null;

async function accessToken(): Promise<string> {
  if (cached && cached.expires > Date.now() + 60_000) return cached.token;
  const basic = Buffer.from(`${process.env.PAYPAL_CLIENT_ID?.trim()}:${process.env.PAYPAL_CLIENT_SECRET?.trim()}`).toString("base64");
  const response = await fetch(`${api()}/v1/oauth2/token`, {
    method: "POST",
    headers: { Authorization: `Basic ${basic}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: "grant_type=client_credentials",
  });
  if (!response.ok) throw new Error(`paypal token ${response.status}: ${await response.text()}`);
  const body = (await response.json()) as { access_token: string; expires_in: number };
  cached = { token: body.access_token, expires: Date.now() + body.expires_in * 1000 };
  return body.access_token;
}

async function call(path: string, init: RequestInit = {}): Promise<Response> {
  return fetch(`${api()}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${await accessToken()}`, "Content-Type": "application/json", ...init.headers },
  });
}

export async function createPaypalOrder(input: {
  amount: number; // PHP, buong piso
  name: string;
  description: string;
  reference: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<{ id: string; url: string }> {
  const value = input.amount.toFixed(2);
  const response = await call("/v2/checkout/orders", {
    method: "POST",
    headers: { "PayPal-Request-Id": `create-${input.reference}-${Date.now()}` },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: input.reference,
          invoice_id: `${input.reference}-${Date.now()}`,
          description: input.description.slice(0, 127),
          amount: { currency_code: "PHP", value, breakdown: { item_total: { currency_code: "PHP", value } } },
          items: [{ name: input.name.slice(0, 127), quantity: "1", unit_amount: { currency_code: "PHP", value }, category: "DIGITAL_GOODS" }],
        },
      ],
      payment_source: {
        paypal: {
          experience_context: {
            brand_name: "CamSur Uptown Golf",
            shipping_preference: "NO_SHIPPING",
            user_action: "PAY_NOW",
            return_url: input.successUrl,
            cancel_url: input.cancelUrl,
          },
        },
      },
    }),
  });
  if (!response.ok) throw new Error(`paypal order ${response.status}: ${await response.text()}`);
  const body = (await response.json()) as { id: string; links: { rel: string; href: string }[] };
  const url = body.links.find((link) => link.rel === "payer-action" || link.rel === "approve")?.href;
  if (!url) throw new Error("paypal order: no approval link");
  return { id: body.id, url };
}

type Order = {
  status?: string;
  purchase_units?: { payments?: { captures?: { id: string; status: string }[] } }[];
};

function completedCapture(order: Order): string | null {
  const capture = order.purchase_units?.[0]?.payments?.captures?.find((c) => c.status === "COMPLETED");
  return capture ? capture.id : null;
}

/**
 * Kinukuha ang bayad kapag na-approve na ng guest. Ibinabalik ang capture ID
 * kapag bayad na (ngayon o dati pa), `null` kung hindi pa na-approve o
 * tinanggihan. Ligtas tawagin nang dalawang beses (pagbalik + webhook).
 */
export async function capturePaypalOrder(orderId: string): Promise<string | null> {
  const id = encodeURIComponent(orderId);
  const current = await call(`/v2/checkout/orders/${id}`);
  if (!current.ok) return null;
  const order = (await current.json()) as Order;
  if (order.status === "COMPLETED") return completedCapture(order);
  if (order.status !== "APPROVED") return null;

  const response = await call(`/v2/checkout/orders/${id}/capture`, {
    method: "POST",
    /* Iisang request ID: kapag sabay ang pagbalik at webhook, iisang capture lang. */
    headers: { "PayPal-Request-Id": `capture-${orderId}` },
  });
  if (response.ok) return completedCapture((await response.json()) as Order);
  /* Nauna na ang kabila (ORDER_ALREADY_CAPTURED): basahin ulit ang order. */
  const again = await call(`/v2/checkout/orders/${id}`);
  return again.ok ? completedCapture((await again.json()) as Order) : null;
}

/** Sinusuri sa PayPal mismo kung tunay ang webhook (verify-webhook-signature). */
export async function verifyPaypalWebhook(headers: Headers, event: unknown): Promise<boolean> {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID?.trim();
  if (!webhookId || !paypalConfigured()) return false;
  const response = await call("/v1/notifications/verify-webhook-signature", {
    method: "POST",
    body: JSON.stringify({
      auth_algo: headers.get("paypal-auth-algo"),
      cert_url: headers.get("paypal-cert-url"),
      transmission_id: headers.get("paypal-transmission-id"),
      transmission_sig: headers.get("paypal-transmission-sig"),
      transmission_time: headers.get("paypal-transmission-time"),
      webhook_id: webhookId,
      webhook_event: event,
    }),
  });
  if (!response.ok) return false;
  const body = (await response.json()) as { verification_status?: string };
  return body.verification_status === "SUCCESS";
}
