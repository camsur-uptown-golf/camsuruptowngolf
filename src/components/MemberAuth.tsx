"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Tr from "@/components/Tr";

/**
 * Login at Sign up ng miyembro — iisang card, dalawang tab.
 *
 * Sa /api/members/login at /api/members/signup ito nagpo-POST. Kapag ok, ang
 * server na ang naglalagay ng httpOnly na session cookie, kaya `refresh()`
 * lang ang kailangan dito: muling binabasa ng /members ang cookie at
 * ipinapakita ang pahina ng miyembro.
 *
 * Code ang ibinabalik ng API ("credentials", "exists", …); dito pinipili ang
 * English na mensahe, at ang DomTranslator ang nagsasalin niyon.
 */

type Mode = "login" | "signup";

const ERRORS: Record<string, string> = {
  credentials: "The email or password is incorrect.",
  locked: "Too many attempts. Please wait 15 minutes and try again.",
  exists: "An account with this email already exists. Log in instead.",
  email: "Please enter a valid email address.",
  name: "Please enter your first and last name.",
  password: "Use at least 8 characters, with letters and numbers.",
  match: "The passwords do not match.",
  terms: "Please accept the Terms of Use to continue.",
  network: "Something went wrong. Please try again.",
  /* Galing sa /api/auth/<provider>/callback (`?auth_error=`). */
  unavailable: "Google and Apple sign-in are not available yet. Please use your email for now.",
  cancelled: "Sign-in was cancelled.",
  state: "That sign-in link has expired. Please try again.",
  failed: "We could not sign you in. Please try again.",
  link: "An account with this email already exists. Log in with your email and password.",
};

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.27c0-.82-.07-1.6-.2-2.36H12v4.47h6.46a5.53 5.53 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.56-5.17 3.56-8.73Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3a7.2 7.2 0 0 1-10.73-3.78H1.32v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.33 14.31a7.2 7.2 0 0 1 0-4.62v-3.1H1.32a12 12 0 0 0 0 10.82l4.01-3.1Z" />
      <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.6 4.59 1.8l3.44-3.44A11.5 11.5 0 0 0 12 0 12 12 0 0 0 1.32 6.59l4.01 3.1A7.15 7.15 0 0 1 12 4.75Z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
      <path d="M16.37 12.73c-.02-2.3 1.88-3.4 1.96-3.46a4.24 4.24 0 0 0-3.33-1.8c-1.42-.15-2.77.83-3.49.83-.72 0-1.83-.81-3-.79a4.45 4.45 0 0 0-3.76 2.28c-1.6 2.78-.41 6.9 1.15 9.16.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.24-.02 2.02-1.12 2.77-2.23a9.8 9.8 0 0 0 1.26-2.58 3.98 3.98 0 0 1-2.37-3.69ZM14.1 5.98a3.97 3.97 0 0 0 .92-2.87 4.05 4.05 0 0 0-2.63 1.36 3.8 3.8 0 0 0-.94 2.77 3.36 3.36 0 0 0 2.65-1.26Z" />
    </svg>
  );
}

/* "Continue with Google / Apple" — mga link papunta sa /api/auth/<provider>,
   na siyang nagre-redirect sa Google/Apple at pabalik. Karaniwang link (hindi
   fetch) dahil buong paglipat ng pahina ang OAuth. */
function SocialButtons() {
  const base =
    "inline-flex h-12 w-full items-center justify-center gap-3 rounded-full border text-sm font-semibold transition";
  return (
    <div className="grid gap-3">
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- route handler na nagre-redirect sa Google, hindi pahina */}
      <a href="/api/auth/google" className={`${base} border-[#1f3f2e]/20 bg-white text-[#14271d] hover:border-[#1f3f2e]/45 hover:bg-[#fbf8ef]`}>
        <GoogleIcon />
        Continue with Google
      </a>
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- route handler na nagre-redirect sa Apple, hindi pahina */}
      <a href="/api/auth/apple" className={`${base} border-black bg-black text-white hover:bg-[#222]`}>
        <AppleIcon />
        Continue with Apple
      </a>
    </div>
  );
}

const FIELD =
  "w-full border border-[#1f3f2e]/25 bg-white px-4 py-3 text-sm text-[#14271d] outline-none transition placeholder:text-[#9aa39d] focus:border-[#265136] focus:ring-2 focus:ring-[#265136]/20";
const LABEL = "block font-navigation text-[11px] font-bold uppercase tracking-[0.12em] text-[#14271d]";

function EyeIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2.8" stroke="currentColor" strokeWidth="1.6" />
      {open ? null : <path d="m4 4 16 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />}
    </svg>
  );
}

function PasswordField({
  id,
  name,
  label,
  autoComplete,
  hint,
}: {
  id: string;
  name: string;
  label: string;
  autoComplete: string;
  hint?: string;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <label className={LABEL} htmlFor={id}>
        {label}
      </label>
      <div className="relative mt-2.5">
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          required
          autoComplete={autoComplete}
          minLength={name === "password" && autoComplete === "new-password" ? 8 : undefined}
          className={`${FIELD} pr-12`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-[#667269] transition hover:text-[#265136]"
        >
          <EyeIcon open={visible} />
        </button>
      </div>
      {hint ? <p className="mt-2 text-xs leading-5 text-[#8a938c]">{hint}</p> : null}
    </div>
  );
}

export default function MemberAuth({ initialMode = "login" }: { initialMode?: Mode }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const [error, setError] = useState<string | null>(null);

  /* Pagbalik mula sa Google/Apple na may error: ipakita, saka linisin ang URL
     para hindi na lumabas ulit sa pag-refresh. */
  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("auth_error");
    if (!code) return;
    url.searchParams.delete("auth_error");
    window.history.replaceState(null, "", url.toString());
    /* Walang cleanup na kumakansela nito: sa dev ay dalawang beses tumatakbo
       ang effect, at nalinis na ang URL sa una — kung kakanselahin ang timer,
       hindi na lalabas ang mensahe kailanman. */
    window.setTimeout(() => setError(ERRORS[code] ? code : "failed"), 0);
  }, []);

  function switchTo(next: Mode) {
    setMode(next);
    setError(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "");

    let payload: Record<string, unknown>;
    if (mode === "login") {
      payload = { email: value("email"), password: value("password") };
    } else {
      if (value("password") !== value("confirm")) {
        setError("match");
        return;
      }
      payload = {
        firstName: value("firstName"),
        lastName: value("lastName"),
        email: value("email"),
        mobile: value("mobile"),
        password: value("password"),
        terms: data.get("terms") === "on",
      };
    }

    setStatus("sending");
    setError(null);
    try {
      const response = await fetch(`/api/members/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (response.ok && result.ok) {
        router.refresh();
        return;
      }
      setError(result.error && ERRORS[result.error] ? result.error : "network");
    } catch {
      setError("network");
    }
    setStatus("idle");
  }

  const tab = (value: Mode, label: string) => (
    <button
      type="button"
      role="tab"
      id={`tab-${value}`}
      aria-selected={mode === value}
      aria-controls="member-auth-panel"
      onClick={() => switchTo(value)}
      className={`${mode === value ? "bg-[#265136] text-[#f3dda0]" : "text-[#3f4c45] hover:text-[#14271d]"} flex-1 rounded-full px-4 py-2.5 font-navigation text-[11px] font-bold uppercase tracking-[0.12em] transition-colors`}
    >
      {label}
    </button>
  );

  return (
    <div className="w-full border border-[#1f3f2e]/12 bg-white p-6 shadow-[0_24px_60px_rgba(20,39,29,0.12)] sm:p-9">
      <div role="tablist" aria-label="Member access" className="flex gap-1 rounded-full border border-[#1f3f2e]/15 bg-[#f7f5ee] p-1">
        {tab("login", "Log in")}
        {tab("signup", "Sign up")}
      </div>

      <div id="member-auth-panel" role="tabpanel" aria-labelledby={`tab-${mode}`} className="mt-8">
        <h2 className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-medium leading-[1] tracking-[-0.04em] text-[#14271d]">
          {mode === "login" ? "Welcome back." : "Become a member."}
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#5d685f]">
          {mode === "login"
            ? "Log in to manage your visits, bookings, and member benefits."
            : "Create your account to book faster and receive member-only news."}
        </p>

        {/* `key` para malinis ang laman ng form tuwing lilipat ng tab. */}
        <div className="mt-7">
          <SocialButtons />
        </div>
        <div className="my-6 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8a938c]" aria-hidden="true">
          <span className="h-px flex-1 bg-[#1f3f2e]/12" />
          or with email
          <span className="h-px flex-1 bg-[#1f3f2e]/12" />
        </div>

        <form key={mode} onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
          {mode === "signup" ? (
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={LABEL} htmlFor="ma-first">
                  First name
                </label>
                <input id="ma-first" name="firstName" type="text" required autoComplete="given-name" className={`${FIELD} mt-2.5`} />
              </div>
              <div>
                <label className={LABEL} htmlFor="ma-last">
                  Last name
                </label>
                <input id="ma-last" name="lastName" type="text" required autoComplete="family-name" className={`${FIELD} mt-2.5`} />
              </div>
            </div>
          ) : null}

          <div>
            <label className={LABEL} htmlFor="ma-email">
              Email
            </label>
            <input id="ma-email" name="email" type="email" required autoComplete="email" className={`${FIELD} mt-2.5`} />
          </div>

          {mode === "signup" ? (
            <div>
              <label className={LABEL} htmlFor="ma-mobile">
                Mobile number
                <span className="ml-1.5 font-normal normal-case italic tracking-normal text-[#8a938c]">(optional)</span>
              </label>
              <input
                id="ma-mobile"
                name="mobile"
                type="tel"
                autoComplete="tel"
                placeholder="Ex. +63 917 123 4567"
                className={`${FIELD} mt-2.5`}
              />
            </div>
          ) : null}

          <PasswordField
            id="ma-password"
            name="password"
            label="Password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            hint={mode === "signup" ? "At least 8 characters, with letters and numbers." : undefined}
          />

          {mode === "signup" ? (
            <>
              <PasswordField id="ma-confirm" name="confirm" label="Confirm password" autoComplete="new-password" />
              <label className="flex cursor-pointer gap-3 text-xs leading-5 text-[#5d685f]">
                <input type="checkbox" name="terms" required className="mt-0.5 h-4 w-4 shrink-0 accent-[#265136]" />
                <span>
                  <Tr
                    t="I agree to the {0}."
                    v={[
                      <Link key="terms" href="/terms-of-use" className="font-semibold text-[#265136] underline underline-offset-4">
                        Terms of Use
                      </Link>,
                    ]}
                  />
                </span>
              </label>
            </>
          ) : null}

          {error ? (
            <p role="alert" className="border-l-2 border-[#a8492f] bg-[#a8492f]/[0.06] px-3 py-2 text-sm leading-6 text-[#a8492f]">
              {ERRORS[error]}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#e7d18d] px-8 font-navigation text-[11px] font-bold uppercase tracking-[0.14em] text-[#14271d] transition hover:-translate-y-0.5 hover:bg-[#f3dfa0] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending" ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#5d685f]">
          {mode === "login" ? "New to the club?" : "Already a member?"}{" "}
          <button
            type="button"
            onClick={() => switchTo(mode === "login" ? "signup" : "login")}
            className="font-semibold text-[#265136] underline underline-offset-4 hover:text-[#1f3f2e]"
          >
            {mode === "login" ? "Create an account" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}
