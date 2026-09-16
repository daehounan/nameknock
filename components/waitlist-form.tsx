"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import {
  PRODUCT_KIND_OPTIONS,
  SCREEN_VOLUME_OPTIONS,
  isValidEmail,
  parseProductKind,
  parseScreenVolume,
  type ProductKind,
  type ScreenVolume,
} from "@/lib/waitlist";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string; field?: "email" };

type WaitlistResponse = {
  ok?: boolean;
  error?: string;
};

function readWaitlistResponse(payload: unknown): WaitlistResponse | null {
  if (typeof payload !== "object" || payload === null) {
    return null;
  }

  const record = payload as Record<string, unknown>;
  return {
    ok: typeof record.ok === "boolean" ? record.ok : undefined,
    error: typeof record.error === "string" ? record.error : undefined,
  };
}

export function WaitlistForm() {
  const formId = useId();
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const submittingRef = useRef(false);
  const [email, setEmail] = useState("");
  const [productKind, setProductKind] = useState<ProductKind | "">("");
  const [screenVolume, setScreenVolume] = useState<ScreenVolume | "">("");
  const [status, setStatus] = useState<Status>({ state: "idle" });

  useEffect(() => {
    if (status.state === "success") {
      successHeadingRef.current?.focus();
    }

    if (status.state === "error" && status.field === "email") {
      emailRef.current?.focus();
    }
  }, [status]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) {
      return;
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setStatus({ state: "error", message: "Email is required.", field: "email" });
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setStatus({
        state: "error",
        message: "Enter a valid email address.",
        field: "email",
      });
      return;
    }

    submittingRef.current = true;
    setStatus({ state: "submitting" });

    const payload: {
      email: string;
      productKind?: ProductKind;
      screenVolume?: ScreenVolume;
    } = { email: trimmedEmail };

    if (productKind) {
      payload.productKind = productKind;
    }

    if (screenVolume) {
      payload.screenVolume = screenVolume;
    }

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10_000),
      });

      const body = readWaitlistResponse(await response.json().catch(() => null));

      if (!response.ok || !body?.ok) {
        const message = body?.error ?? "Something went wrong. Try again.";
        setStatus({
          state: "error",
          message,
          field: message.toLowerCase().includes("email") ? "email" : undefined,
        });
        return;
      }

      setStatus({ state: "success" });
    } catch (error) {
      const timedOut =
        error instanceof DOMException &&
        (error.name === "TimeoutError" || error.name === "AbortError");
      setStatus({
        state: "error",
        message: timedOut
          ? "That took too long. Try again."
          : "Network error. Check your connection and try again.",
      });
    } finally {
      submittingRef.current = false;
    }
  }

  const busy = status.state === "submitting";
  const errorMessage = status.state === "error" ? status.message : "";
  const emailInvalid = status.state === "error" && status.field === "email";

  const selectClassName =
    "field-select mt-2 w-full cursor-pointer appearance-none border border-line bg-background px-3 py-2.5 pr-10 text-sm text-foreground outline-none transition focus-visible:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <div id="waitlist" tabIndex={-1} className="scroll-mt-4 outline-none">
      {status.state === "success" ? (
        <div className="border border-ink bg-panel px-6 py-8 sm:px-8">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-pass">
            Waitlist · in
          </p>
          <h3
            ref={successHeadingRef}
            tabIndex={-1}
            className="mt-3 text-2xl tracking-tight text-foreground outline-none"
          >
            You’re on the list.
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted">
            We’ll email you when NameKnock opens for early knockout screens. No
            checkout, no filing, no attorney opinions — just the queue.
          </p>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className="border border-ink bg-panel px-6 py-7 sm:px-8 sm:py-8"
          noValidate
          aria-labelledby={`${formId}-title`}
        >
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-accent">
            Early access
          </p>
          <h3
            id={`${formId}-title`}
            className="mt-2 text-2xl tracking-tight text-foreground"
          >
            Join the knockout waitlist.
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted">
            Email is enough. Optional context helps us build the first screen
            around how you actually name products.
          </p>

          <div className="mt-6">
            <label htmlFor={`${formId}-email`} className="block text-sm text-foreground">
              Email <span className="text-accent">*</span>
            </label>
            <input
              ref={emailRef}
              id={`${formId}-email`}
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={busy}
              aria-invalid={emailInvalid || undefined}
              aria-describedby={
                emailInvalid
                  ? `${formId}-error`
                  : `${formId}-privacy`
              }
              className="mt-2 w-full border border-line bg-background px-3 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus-visible:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60"
              placeholder="you@studio.dev"
            />
          </div>

          <div className="mt-5">
            <label htmlFor={`${formId}-kind`} className="block text-sm text-foreground">
              What are you naming? <span className="text-muted">(optional)</span>
            </label>
            <select
              id={`${formId}-kind`}
              name="productKind"
              value={productKind}
              onChange={(event) => setProductKind(parseProductKind(event.target.value))}
              disabled={busy}
              className={selectClassName}
            >
              <option value="">Skip for now</option>
              {PRODUCT_KIND_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-5">
            <label htmlFor={`${formId}-volume`} className="block text-sm text-foreground">
              Names you screen per month{" "}
              <span className="text-muted">(optional)</span>
            </label>
            <select
              id={`${formId}-volume`}
              name="screenVolume"
              value={screenVolume}
              onChange={(event) => setScreenVolume(parseScreenVolume(event.target.value))}
              disabled={busy}
              className={selectClassName}
            >
              <option value="">Skip for now</option>
              {SCREEN_VOLUME_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {errorMessage ? (
            <p id={`${formId}-error`} className="mt-4 text-sm text-danger" role="alert">
              {errorMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={busy}
            className="mt-6 w-full cursor-pointer bg-accent px-4 py-3 text-sm font-medium text-panel transition hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? "Joining…" : "Join the waitlist"}
          </button>
          <p id={`${formId}-privacy`} className="mt-3 text-xs leading-5 text-muted">
            We’ll only email you when knockout screens open. No legal advice, no
            list-selling.
          </p>
        </form>
      )}
    </div>
  );
}
