"use client";

import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { clearOptionalPreferences, getPrivacyChoice, getServerPrivacyChoice, savePrivacyChoice, subscribeToPrivacyChoice, type PrivacyChoice } from "@/lib/privacy-consent";
import styles from "./PrivacyNotice.module.css";

type PrivacyContextValue = {
  hasOptionalConsent: boolean;
  openPrivacyPreferences: () => void;
};

const PrivacyContext = createContext<PrivacyContextValue | null>(null);

export function usePrivacyPreferences() {
  const context = useContext(PrivacyContext);
  if (!context) throw new Error("Privacy preferences require PrivacyProvider");
  return context;
}

export function PrivacyPreferencesButton({ className }: { className?: string }) {
  const { openPrivacyPreferences } = usePrivacyPreferences();
  return <button type="button" onClick={openPrivacyPreferences} className={className}>Privacy preferences</button>;
}

export function PrivacyProvider({ children }: { children: React.ReactNode }) {
  const choice = useSyncExternalStore(subscribeToPrivacyChoice, getPrivacyChoice, getServerPrivacyChoice);
  const [reopened, setReopened] = useState(false);
  const panel = useRef<HTMLElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const visible = choice !== undefined && (choice === null || reopened);

  const openPrivacyPreferences = useCallback(() => {
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setReopened(true);
  }, []);

  useEffect(() => {
    if (choice !== undefined && choice !== "accepted") clearOptionalPreferences();
  }, [choice]);

  useEffect(() => {
    // Do not move focus on a first visit. Focus the panel only when requested.
    if (reopened) panel.current?.focus({ preventScroll: true });
  }, [reopened]);

  function choose(next: PrivacyChoice) {
    savePrivacyChoice(next);
    setReopened(false);
    if (previousFocus.current?.isConnected) previousFocus.current.focus({ preventScroll: true });
    previousFocus.current = null;
  }

  const value = useMemo(() => ({ hasOptionalConsent: choice === "accepted", openPrivacyPreferences }), [choice, openPrivacyPreferences]);

  return (
    <PrivacyContext.Provider value={value}>
      {children}
      {visible ? (
        <section ref={panel} tabIndex={-1} role="region" aria-labelledby="privacy-notice-title" aria-describedby="privacy-notice-description" className={styles.notice}>
          <div className={styles.heading}>
            <span className={styles.icon} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none"><path d="m12 3 8 3v5c0 5-4.4 8.4-8 10-3.6-1.6-8-5-8-10V6l8-3Z" stroke="currentColor" strokeWidth="1.5" /><path d="m8.5 11.5 2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <div>
              <p className={styles.eyebrow}>Your visit. Your choice.</p>
              <h2 id="privacy-notice-title">Data Privacy Policy</h2>
            </div>
          </div>
          <p id="privacy-notice-description" className={styles.description}>
            We use essential storage for secure sign-in and your privacy choice. Accept to save language and display preferences and enable embedded video, or Reject to use essential storage only. Read our <Link href="/privacy-policy">Privacy Policy</Link>.
          </p>
          <div className={styles.actions}>
            <button type="button" onClick={() => choose("rejected")} className={styles.reject}>Reject</button>
            <button type="button" onClick={() => choose("accepted")} className={styles.accept}>Accept</button>
          </div>
          <p className={styles.footnote}>Change your choice anytime in the footer’s Privacy preferences.</p>
        </section>
      ) : null}
    </PrivacyContext.Provider>
  );
}
