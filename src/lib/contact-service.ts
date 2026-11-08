import type { ContactRequest } from "./contact-schema";

export type DeliveryRecord = {
  fingerprint: string;
  state: "processing" | "owner_sent" | "complete" | "uncertain";
  acknowledgment?: boolean;
};
export type ContactResult = {
  status: number;
  body: { ok: boolean; code: string; message: string; acknowledgment?: boolean };
  retryAfter?: number;
};
export interface ContactDependencies {
  fingerprint(data: ContactRequest): string;
  rateLimit(data: ContactRequest): Promise<boolean>;
  verifyBot(token: string): Promise<boolean>;
  store: {
    get(key: string): Promise<DeliveryRecord | null>;
    claim(key: string, record: DeliveryRecord): Promise<boolean>;
    put(key: string, record: DeliveryRecord): Promise<void>;
  };
  sendOwner(data: ContactRequest, key: string): Promise<void>;
  sendAcknowledgment(data: ContactRequest, key: string): Promise<void>;
  log(event: string): void;
}
const accepted = (acknowledgment: boolean): ContactResult => ({
  status: 200,
  body: {
    ok: true,
    code: acknowledgment ? "delivered" : "owner_delivered",
    acknowledgment,
    message: acknowledgment
      ? "Message received. A confirmation is on its way to your inbox."
      : "Message received. Your confirmation email could not be sent, but there’s no need to submit again.",
  },
});

export async function processContact(
  data: ContactRequest,
  deps: ContactDependencies,
): Promise<ContactResult> {
  if (data.website)
    return {
      status: 400,
      body: {
        ok: false,
        code: "invalid_submission",
        message: "The submission could not be verified.",
      },
    };
  if (!(await deps.rateLimit(data)))
    return {
      status: 429,
      retryAfter: 900,
      body: {
        ok: false,
        code: "rate_limited",
        message: "Too many attempts. Please try again later or email me directly.",
      },
    };
  const key = data.idempotencyKey;
  const fingerprint = deps.fingerprint(data);
  const prior = await deps.store.get(key);
  if (prior) {
    if (prior.fingerprint !== fingerprint)
      return {
        status: 409,
        body: {
          ok: false,
          code: "key_conflict",
          message: "This submission has changed. Please reload before sending a new message.",
        },
      };
    if (prior.state === "complete" || prior.state === "owner_sent")
      return accepted(prior.acknowledgment ?? false);
    return {
      status: 409,
      body: {
        ok: false,
        code: "delivery_pending",
        message:
          "This message is already being processed, or its delivery could not be confirmed. Please wait before retrying, or email me directly.",
      },
    };
  }
  if (!(await deps.verifyBot(data.turnstileToken)))
    return {
      status: 400,
      body: {
        ok: false,
        code: "bot_rejected",
        message: "Please complete the verification and try again.",
      },
    };
  if (!(await deps.store.claim(key, { fingerprint, state: "processing" })))
    return {
      status: 409,
      body: {
        ok: false,
        code: "delivery_pending",
        message: "This message is already being processed. Please wait before retrying.",
      },
    };
  try {
    await deps.sendOwner(data, key);
  } catch {
    deps.log("owner_notification_unconfirmed");
    await deps.store
      .put(key, { fingerprint, state: "uncertain" })
      .catch(() => deps.log("delivery_state_write_failed"));
    return {
      status: 502,
      body: {
        ok: false,
        code: "delivery_unconfirmed",
        message:
          "Delivery could not be confirmed. Please email me directly so your message reaches me.",
      },
    };
  }
  await deps.store
    .put(key, { fingerprint, state: "owner_sent" })
    .catch(() => deps.log("delivery_state_write_failed"));
  let acknowledgment = true;
  try {
    await deps.sendAcknowledgment(data, key);
  } catch {
    acknowledgment = false;
    deps.log("visitor_confirmation_failed");
  }
  await deps.store
    .put(key, { fingerprint, state: "complete", acknowledgment })
    .catch(() => deps.log("delivery_state_write_failed"));
  return accepted(acknowledgment);
}
