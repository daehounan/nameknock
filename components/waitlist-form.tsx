"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import {
  PRODUCT_KIND_OPTIONS,
  SCREEN_VOLUME_OPTIONS,
  type ProductKind,
  type ScreenVolume,
} from "@/lib/waitlist";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string };

export function WaitlistForm() {
  const formId = useId();
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const [email, setEmail] = useState("");
  const [productKind, setProductKind] = useState<ProductKind | "">("");
  const [screenVolume, setScreenVolume] = useState<ScreenVolume | "">("");
  const [status, setStatus] = useState<Status>({ state: "idle" });

  useEffect(() => {
    if (status.state === "success") {
      successHeadingRef.current?.focus();
    }
  }, [status]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ state: "submitting" });

    const payload: {
      email: string;
      productKind?: ProductKind;
      screenVolume?: ScreenVolume;
    } = { email };

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
      });

      const body = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!response.ok || !body?.ok) {
        setStatus({
          state: "error",
          message: body?.error ?? "Something went wrong. Try again.",
        });
        return;
      }

      setStatus({ state: "success" });
    } catch {
      setStatus({
        state: "error",
        message: "Network error. Check your connection and try again.",
      });
    }
  }

  const busy = status.state === "submitting";
  const errorMessage = status.state === "error" ? status.message : "";
  const emailInvalid = errorMessage.toLowerCase().includes("email");

  const selectClassName =
    "field-select mt-2 w-full cursor-pointer appearance-none border border-line bg-background px-3 py-2.5 pr-10 text-sm text-foreground outline-none transition focus-visible:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <div id="waitlist">
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {status.state === "success"
          ? "You’re on the NameKnock waitlist. We’ll email you when knockout screens open."
          : errorMessage}
      </p>

      {status.state === "success" ? (
        <div className="border border-ink bg-panel px-6 py-8 sm:px-8">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-pass">
            Waitlist · in
          </p>
          <h2
            ref={successHeadingRef}
            tabIndex={-1}
            className="mt-3 text-2xl tracking-tight text-foreground outline-none"
          >
            You’re on the list.
          </h2>
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
        >
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-accent">
            Early access
          </p>
          <p className="mt-2 text-2xl tracking-tight text-foreground">
            Join the knockout waitlist.
          </p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Email is enough. Optional context helps us build the first screen
            around how you actually name products.
          </p>

          <div className="mt-6">
            <label htmlFor={`${formId}-email`} className="block text-sm text-foreground">
              Email <span className="text-accent">*</span>
            </label>
            <input
              id={`${formId}-email`}
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={busy}
              aria-invalid={emailInvalid || undefined}
              aria-describedby={emailInvalid ? `${formId}-error` : undefined}
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
              onChange={(event) =>
                setProductKind(event.target.value as ProductKind | "")
              }
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
              onChange={(event) =>
                setScreenVolume(event.target.value as ScreenVolume | "")
              }
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
        </form>
      )}
    </div>
  );
}
