"use client";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type TurnstileAPI = {
  render(
    container: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      theme: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ): string;
  remove(id: string): void;
};
declare global {
  interface Window {
    turnstile?: TurnstileAPI;
  }
}

export function Turnstile({ onToken, reset }: { onToken: (token: string) => void; reset: number }) {
  const container = useRef<HTMLDivElement>(null);
  const callback = useRef(onToken);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    callback.current = onToken;
  }, [onToken]);
  useEffect(() => {
    if (!ready || !window.turnstile || !container.current) return;
    const api = window.turnstile;
    const id = api.render(container.current, {
      sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
      action: "contact",
      theme: "dark",
      callback: (token) => {
        callback.current(token);
        setFailed(false);
      },
      "expired-callback": () => callback.current(""),
      "error-callback": () => {
        callback.current("");
        setFailed(true);
      },
    });
    return () => {
      api.remove(id);
    };
  }, [ready, reset]);
  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="lazyOnload"
        onReady={() => setReady(true)}
        onError={() => setFailed(true)}
      />
      <div ref={container} className="turnstile-container" />
      {failed && (
        <p className="field-error" role="alert">
          Verification could not load. Please reload or use the email link below.
        </p>
      )}
    </>
  );
}
