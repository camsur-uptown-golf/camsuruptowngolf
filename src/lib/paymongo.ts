import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * PayMongo — GCash, Maya, GrabPay, at card, sa iisang hosted checkout page.
 *
 * Daloy ng downpayment:
 *   1. `createCheckout()` → URL ng PayMongo checkout; doon nagbabayad ang guest.
 *   2. Pagkatapos magbayad, bumabalik sa `success_url` (/api/tee-times/return)
 *      at doon `checkoutPaid()` ang sinusuri — hindi pinagkakatiwalaan ang
 *      pagbalik mismo, ang sagot ng PayMongo ang batayan.
 *   3. Pangalawang daan: ang webhook (/api/paymongo/webhook), para makumpirma
 *      kahit isinara ng guest ang tab bago bumalik.
 *
 * Mga susi sa `.env.local`: PAYMONGO_SECRET_KEY (sk_test_… o sk_live_…), at
 * PAYMONGO_WEBHOOK_SECRET (whsk_…) para sa webhook.
 */

const API = "https://api.paymongo.com/v1";

export function paymongoConfigured(): boolean {
  return Boolean(process.env.PAYMONGO_SECRET_KEY?.trim());
}

function auth() {
  return "Basic " + Buffer.from(`${process.env.PAYMONGO_SECRET_KEY?.trim()}:`).toString("base64");
}

export async function createCheckout(input: {
  amount: number; // PHP, buong piso
  name: string;
  description: string;
  reference: string;
  customer: { name: string; email: string; phone: string };
  successUrl: string;
  cancelUrl: string;
}): Promise<{ id: string; url: string }> {
  const response = await fetch(`${API}/checkout_sessions`, {
    method: "POST",
    headers: { Authorization: auth(), "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      data: {
        attributes: {
          line_items: [{ currency: "PHP", amount: Math.round(input.amount * 100), name: input.name, quantity: 1 }],
          payment_method_types: ["gcash", "paymaya", "grab_pay", "card"],
          description: input.description,
          reference_number: input.reference,
          billing: input.customer,
          success_url: input.successUrl,
          cancel_url: input.cancelUrl,
          send_email_receipt: true,
          show_description: true,
          show_line_items: true,
        },
      },
    }),
  });
  if (!response.ok) throw new Error(`paymongo ${response.status}: ${await response.text()}`);
  const body = (await response.json()) as { data: { id: string; attributes: { checkout_url: string } } };
  return { id: body.data.id, url: body.data.attributes.checkout_url };
}

/** `ref` ng bayad kapag bayad na ang checkout session; kung hindi, `null`. */
export async function checkoutPaid(sessionId: string): Promise<string | null> {
  const response = await fetch(`${API}/checkout_sessions/${encodeURIComponent(sessionId)}`, {
    headers: { Authorization: auth(), Accept: "application/json" },
  });
  if (!response.ok) return null;
  const body = (await response.json()) as {
    data: { attributes: { payments?: { id: string; attributes: { status: string } }[] } };
  };
  const paid = body.data.attributes.payments?.find((payment) => payment.attributes.status === "paid");
  return paid ? paid.id : null;
}

/**
 * Sinusuri ang `Paymongo-Signature` ng webhook: `t=…,te=…,li=…`, HMAC-SHA256
 * ng `${t}.${rawBody}` gamit ang webhook secret (te = test mode, li = live).
 */
export function verifyWebhook(rawBody: string, header: string | null): boolean {
  const secret = process.env.PAYMONGO_WEBHOOK_SECRET?.trim();
  if (!secret || !header) return false;
  const parts = Object.fromEntries(header.split(",").map((part) => part.split("=") as [string, string]));
  const expected = createHmac("sha256", secret).update(`${parts.t}.${rawBody}`).digest("hex");
  const given = parts.li || parts.te || "";
  const a = Buffer.from(expected);
  const b = Buffer.from(given);
  return a.length === b.length && timingSafeEqual(a, b);
}
