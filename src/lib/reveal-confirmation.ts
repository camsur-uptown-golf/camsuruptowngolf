/**
 * Ref callback para sa "Thank you" panel ng mga form.
 *
 * Mas maikli ang panel kaysa sa form na pinapalitan nito, kaya pagka-submit ay
 * bakanteng espasyo ang naiiwan sa screen at nasa itaas na ng viewport ang
 * kumpirmasyon — hindi alam ng bisita kung pumasok ang request. Pagka-mount ng
 * panel, itinatapat ito sa gitna ng screen at doon inilalagay ang focus (para
 * rin sa screen reader, kasama ng `role="status"` sa panel).
 *
 * Gamit: `<div ref={revealConfirmation} role="status" tabIndex={-1} …>`.
 */
export function revealConfirmation(el: HTMLElement | null) {
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.focus({ preventScroll: true });
  el.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
}
