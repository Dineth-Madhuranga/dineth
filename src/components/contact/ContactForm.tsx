"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { contactFieldsSchema, inquiryTypes } from "@/lib/contact-schema";
import { site } from "@/data/site";
import { Turnstile } from "./Turnstile";

export function ContactForm({ configured, testMode }: { configured: boolean; testMode: boolean }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [token, setToken] = useState("");
  const [reset, setReset] = useState(0);
  const key = useRef("");
  const payload = useRef("");
  const busy = useRef(false);
  const form = useRef<HTMLFormElement>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current || !configured) return;
    const fields = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = contactFieldsSchema.safeParse(fields);
    if (!parsed.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) nextErrors[String(issue.path[0])] ??= issue.message;
      setErrors(nextErrors);
      const first = form.current?.elements.namedItem(Object.keys(nextErrors)[0]);
      if (first instanceof HTMLElement) first.focus();
      return;
    }
    setErrors({});
    if (!testMode && !token) {
      setFeedback("Please complete the verification below before sending.");
      setStatus("error");
      return;
    }
    busy.current = true;
    setStatus("sending");
    setFeedback("");
    const nextPayload = JSON.stringify(parsed.data);
    if (nextPayload !== payload.current || !key.current) {
      key.current = crypto.randomUUID();
      payload.current = nextPayload;
    }
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          website: fields.website || "",
          turnstileToken: token,
          idempotencyKey: key.current,
        }),
        signal: AbortSignal.timeout(55000),
      });
      const result: { ok?: boolean; message?: string; errors?: Record<string, string[]> } =
        await response.json();
      if (response.ok && result.ok) {
        setStatus("success");
        setFeedback(result.message || "Message received.");
        form.current?.reset();
      } else {
        setStatus("error");
        setFeedback(
          result.message ||
            "Your message could not be sent. Please try again or email me directly.",
        );
        if (result.errors)
          setErrors(
            Object.fromEntries(
              Object.entries(result.errors).map(([field, messages]) => [field, messages[0]]),
            ),
          );
      }
    } catch {
      setStatus("error");
      setFeedback(
        "I couldn’t confirm delivery. You can retry this message safely or email me directly.",
      );
    } finally {
      busy.current = false;
      setToken("");
      setReset((value) => value + 1);
    }
  }

  if (status === "success")
    return (
      <div className="form-success" role="status">
        <span>
          <Check size={30} />
        </span>
        <p className="eyebrow">A NEW CONVERSATION</p>
        <h3>Message received.</h3>
        <p>Thanks for reaching out — I’ll get back to you as soon as I can.</p>
        <p className="confirmation-detail">{feedback}</p>
        <button
          className="text-link"
          onClick={() => {
            setStatus("idle");
            setFeedback("");
            key.current = "";
          }}
        >
          Send another message <ArrowUpRight size={16} />
        </button>
      </div>
    );
  return (
    <form
      ref={form}
      onSubmit={submit}
      noValidate
      className="contact-form"
      aria-label="Contact Dineth"
    >
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="name">
            Full name <span>*</span>
          </label>
          <input
            id="name"
            name="name"
            placeholder="Your name"
            autoComplete="name"
            maxLength={100}
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="field-error">
              {errors.name}
            </p>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="email">
            Email address <span>*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            maxLength={254}
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="field-error">
              {errors.email}
            </p>
          )}
        </div>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="company">
            Company <span className="optional">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            placeholder="Where you work"
            autoComplete="organization"
            maxLength={150}
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? "company-error" : undefined}
          />
          {errors.company && (
            <p id="company-error" className="field-error">
              {errors.company}
            </p>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="inquiry">What brings you here?</label>
          <select id="inquiry" name="inquiry" defaultValue="General Inquiry">
            {inquiryTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="message">
          Your message <span>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell me a little about what you have in mind…"
          rows={4}
          minLength={20}
          maxLength={5000}
          required
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="field-error">
            {errors.message}
          </p>
        )}
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {configured && !testMode && <Turnstile onToken={setToken} reset={reset} />}
      {!configured && (
        <div className="form-config-note">
          <p>The contact form is not connected yet.</p>
          <a href={`mailto:${site.email}`}>
            Email me directly <ArrowUpRight size={14} />
          </a>
        </div>
      )}
      {feedback && (
        <p className="form-feedback" role="alert">
          {feedback}
        </p>
      )}
      <div className="form-submit">
        <button
          type="submit"
          className="button button-paper"
          disabled={!configured || status === "sending"}
          aria-describedby={!configured ? "form-availability" : undefined}
        >
          {status === "sending" ? (
            <>
              Sending message <LoaderCircle size={18} className="loading-icon" />
            </>
          ) : (
            <>
              Send message <ArrowUpRight size={19} />
            </>
          )}
        </button>
        <span id="form-availability">
          {configured ? "A good conversation starts here." : "Email is the best way to reach me."}
        </span>
      </div>
      <p className="privacy-note">
        Your details are used only to respond to your inquiry.{" "}
        {configured && !testMode && (
          <>
            This form uses Cloudflare Turnstile for spam protection (
            <a
              href="https://www.cloudflare.com/privacypolicy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              privacy policy
            </a>
            ).
          </>
        )}
      </p>
    </form>
  );
}
