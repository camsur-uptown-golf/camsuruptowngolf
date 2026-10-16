"use client";

import { useEffect } from "react";
import { useTranslation } from "./LanguageProvider";
import { loadStrings, lookup, type Strings } from "./site-strings";

/**
 * ANG TAGASALIN NG BUONG SITE.
 *
 * Ang `t()` at `<T>` ay para sa iilang key sa header at homepage. Ang lahat
 * ng iba pa — bawat pahina, form, FAQ, data sa `lib/` — ay nakasulat nang
 * diretso sa English. Sa halip na gawing key ang libu-libong pangungusap sa
 * 90 file, isinasalin ito rito sa DOM mismo:
 *
 *   1. Kapag hindi English ang wika, nilalakad ang bawat text node at ang
 *      `placeholder` / `aria-label` / `alt` / `title`, at hinahanap ang
 *      eksaktong English (whitespace-normalized) sa `strings/<wika>.json`.
 *   2. Isang MutationObserver ang sumasalo sa lahat ng bagong lumalabas —
 *      mega menu, form, paglipat ng pahina. Microtask ang observer, kaya
 *      naisasalin ito bago pa ma-paint; walang kislap ng English.
 *   3. Itinatabi ang orihinal na English kada node, kaya kapag ibinalik sa
 *      English ay naibabalik ito nang eksakto.
 *
 * TEKSTO LANG ANG BINABAGO (`nodeValue` at attribute) — walang idinadagdag o
 * inaalis na node, kaya hindi nalilito ang React. Kapag binago ng React ang
 * isang text node (bagong English), napapansin iyon ng observer at isinasalin
 * ulit.
 *
 * MAY NUMERO: "Hole 7", "3 nights" — kapag walang eksaktong tugma, ginagawang
 * `{0}`, `{1}` ang mga numero at iyon ang hinahanap ("Hole {0}"). Ibinabalik
 * ang mga numero sa salin ayon sa pagkakasunod nila.
 *
 * Laktawan: anumang nasa loob ng `translate="no"` o `.notranslate`, at
 * script/style.
 *
 * PAANO MAGDAGDAG NG TEKSTO: isulat lang sa English gaya ng dati, saka
 * idagdag ang English → salin sa bawat `strings/*.json`. Ang wala sa JSON ay
 * nananatiling English (walang sira, kulang lang ang salin).
 */

const ATTRS = ["placeholder", "aria-label", "alt", "title"] as const;
const SKIP = "script,style,noscript,[translate=no],.notranslate";

type Applied = { original: string; applied: string };
const textState = new WeakMap<Text, Applied>();
const attrState = new WeakMap<Element, Map<string, Applied>>();
/* Lahat ng node na binago, para maibalik sa English. WeakRef para hindi
   mapigilan ang garbage collection ng mga node na wala na sa pahina. */
let touched: WeakRef<Text | Element>[] = [];

function withSpacing(original: string, translated: string) {
  const lead = original.match(/^\s*/)?.[0] ?? "";
  const trail = original.match(/\s*$/)?.[0] ?? "";
  return lead + translated + trail;
}

function skipped(el: Element | null) {
  return !el || el.closest(SKIP) !== null;
}

function translateText(node: Text, dict: Strings) {
  const current = node.nodeValue ?? "";
  const state = textState.get(node);
  if (state && current === state.applied) return;
  if (skipped(node.parentElement)) return;
  const translated = lookup(dict, current);
  if (translated === null) {
    textState.delete(node);
    return;
  }
  const applied = withSpacing(current, translated);
  textState.set(node, { original: current, applied });
  touched.push(new WeakRef(node));
  if (applied !== current) node.nodeValue = applied;
}

function translateAttr(el: Element, name: string, dict: Strings) {
  const current = el.getAttribute(name);
  if (current === null) return;
  let states = attrState.get(el);
  const state = states?.get(name);
  if (state && current === state.applied) return;
  if (skipped(el)) return;
  const translated = lookup(dict, current);
  if (translated === null) {
    states?.delete(name);
    return;
  }
  if (!states) {
    states = new Map();
    attrState.set(el, states);
  }
  states.set(name, { original: current, applied: translated });
  touched.push(new WeakRef(el));
  if (translated !== current) el.setAttribute(name, translated);
}

function translateTree(root: Node, dict: Strings) {
  if (root.nodeType === Node.TEXT_NODE) {
    translateText(root as Text, dict);
    return;
  }
  if (root.nodeType !== Node.ELEMENT_NODE) return;
  const el = root as Element;
  if (el.closest(SKIP)) return;
  for (const name of ATTRS) if (el.hasAttribute(name)) translateAttr(el, name, dict);
  for (const child of el.querySelectorAll(ATTRS.map((a) => `[${a}]`).join(","))) {
    for (const name of ATTRS) if (child.hasAttribute(name)) translateAttr(child, name, dict);
  }
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) translateText(node as Text, dict);
}

function restoreAll() {
  for (const ref of touched) {
    const node = ref.deref();
    if (!node) continue;
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node as Text;
      const state = textState.get(text);
      if (state && text.nodeValue === state.applied) text.nodeValue = state.original;
      textState.delete(text);
    } else {
      const el = node as Element;
      attrState.get(el)?.forEach((state, name) => {
        if (el.getAttribute(name) === state.applied) el.setAttribute(name, state.original);
      });
      attrState.delete(el);
    }
  }
  touched = [];
}

export default function DomTranslator() {
  const { locale } = useTranslation();

  useEffect(() => {
    let observer: MutationObserver | null = null;
    let cancelled = false;

    loadStrings(locale)
      .then((dict) => {
        if (cancelled || !dict) return;
        /* `head` para sa <title>; pinapalitan iyon ng Next sa bawat paglipat ng pahina. */
        const targets: Node[] = [document.head, document.body];
        targets.forEach((target) => translateTree(target, dict));
        observer = new MutationObserver((mutations) => {
          for (const m of mutations) {
            if (m.type === "characterData") translateText(m.target as Text, dict);
            else if (m.type === "attributes" && m.attributeName) translateAttr(m.target as Element, m.attributeName, dict);
            else m.addedNodes.forEach((added) => translateTree(added, dict));
          }
        });
        targets.forEach((target) =>
          observer!.observe(target, {
            subtree: true,
            childList: true,
            characterData: true,
            attributes: true,
            attributeFilter: [...ATTRS],
          }),
        );
      })
      .catch(() => {
        /* Hindi na-load ang salin — mananatiling English ang pahina. */
      });

    return () => {
      cancelled = true;
      observer?.disconnect();
      restoreAll();
    };
  }, [locale]);

  return null;
}
