import { checkoutPaid, createCheckout, paymongoConfigured } from "@/lib/paymongo";
import { capturePaypalOrder, createPaypalOrder, paypalConfigured } from "@/lib/paypal";

/**
 * Iisang daan para sa dalawang paraan ng bayad: PayMongo (GCash, Maya,
 * GrabPay, card) at PayPal. Ang guest ang pumipili; ang mga route ay
 * tumatawag lang dito.
 *
 * Ang session ID na itinatago sa DB (`payment_session_id`,
 * `checkout_session_id`) ay may unlapi para alam kung kanino itatanong:
 * PayMongo = `cs_…` gaya ng dati, PayPal = `paypal:<order id>`. Walang
 * kailangang migration.
 */

export type PaymentMethod = "paymongo" | "paypal";

const PAYPAL_PREFIX = "paypal:";

/** Mga paraang may susi — PayMongo muna (default), saka PayPal. */
export function paymentMethods(): PaymentMethod[] {
  const methods: PaymentMethod[] = [];
  if (paymongoConfigured()) methods.push("paymongo");
  if (paypalConfigured()) methods.push("paypal");
  return methods;
}

/** Ang hiniling na paraan kung may susi; kung wala o hindi kilala, ang una. */
export function pickMethod(requested: unknown): PaymentMethod | null {
  const methods = paymentMethods();
  return methods.find((method) => method === requested) ?? methods[0] ?? null;
}

export async function createPayment(
  method: PaymentMethod,
  input: {
    amount: number;
    name: string;
    description: string;
    reference: string;
    customer: { name: string; email: string; phone: string };
    successUrl: string;
    cancelUrl: string;
  },
): Promise<{ sessionId: string; url: string }> {
  if (method === "paypal") {
    const order = await createPaypalOrder(input);
    return { sessionId: `${PAYPAL_PREFIX}${order.id}`, url: order.url };
  }
  const checkout = await createCheckout(input);
  return { sessionId: checkout.id, url: checkout.url };
}

/**
 * `ref` ng bayad kapag bayad na ang session; kung hindi, `null`. Sa PayPal,
 * dito rin kinukuha (capture) ang na-approve na bayad.
 */
export async function sessionPaid(sessionId: string): Promise<string | null> {
  if (sessionId.startsWith(PAYPAL_PREFIX)) return capturePaypalOrder(sessionId.slice(PAYPAL_PREFIX.length));
  return checkoutPaid(sessionId);
}

export function paypalSessionId(orderId: string): string {
  return `${PAYPAL_PREFIX}${orderId}`;
}
