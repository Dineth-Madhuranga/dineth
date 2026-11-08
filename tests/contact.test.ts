import { test } from "node:test";
import assert from "node:assert/strict";
import { contactFieldsSchema, contactRequestSchema } from "../src/lib/contact-schema";
import { ownerEmail, visitorEmail, escapeHtml } from "../src/lib/email/templates";
import {
  processContact,
  type ContactDependencies,
  type DeliveryRecord,
} from "../src/lib/contact-service";

const input = {
  name: "Alex Morgan",
  email: "alex@example.com",
  company: "Example",
  inquiry: "Freelance Project" as const,
  message: "I would like to discuss a new website for our company.",
  website: "",
  turnstileToken: "verified",
  idempotencyKey: "0ca085bd-3ed0-4f94-9474-34e6ad4de98f",
};
function setup() {
  const records = new Map<string, DeliveryRecord>();
  const counts = { owner: 0, acknowledgment: 0 };
  const deps: ContactDependencies = {
    fingerprint: (data) =>
      JSON.stringify([data.name, data.email, data.company, data.inquiry, data.message]),
    rateLimit: async () => true,
    verifyBot: async () => true,
    store: {
      get: async (key) => records.get(key) ?? null,
      claim: async (key, value) => {
        if (records.has(key)) return false;
        records.set(key, value);
        return true;
      },
      put: async (key, value) => {
        records.set(key, value);
      },
    },
    sendOwner: async () => {
      counts.owner++;
    },
    sendAcknowledgment: async () => {
      counts.acknowledgment++;
    },
    log: () => {},
  };
  return { deps, counts, records };
}

test("validation normalizes email and rejects short/missing/invalid fields", () => {
  assert.equal(
    contactFieldsSchema.parse({ ...input, email: " Alex@Example.com " }).email,
    "alex@example.com",
  );
  for (const change of [
    { name: "" },
    { email: "wrong" },
    { message: "short" },
    { message: "x".repeat(5001) },
    { company: "x".repeat(151) },
    { name: "Alex\r\nBcc: stranger@example.com" },
    { inquiry: "Unknown" },
  ])
    assert.equal(contactRequestSchema.safeParse({ ...input, ...change }).success, false);
  assert.equal(
    contactRequestSchema.safeParse({ ...input, idempotencyKey: "not-a-uuid" }).success,
    false,
  );
});

test("HTML emails escape visitor content and include text alternatives", () => {
  const evil = {
    ...input,
    name: '<img src=x onerror="alert(1)">',
    message: "<script>alert('bad')</script>\nSecond line & more",
  };
  const owner = ownerEmail(evil, "https://example.com", "2026-11-08T00:00:00Z");
  const visitor = visitorEmail(evil, "https://example.com");
  assert.ok(!owner.html.includes("<script>"));
  assert.ok(!owner.html.includes("<img"));
  assert.ok(owner.html.includes("&lt;script&gt;"));
  assert.ok(owner.html.includes("<br>Second line &amp; more"));
  assert.ok(visitor.html.includes("&lt;img"));
  assert.ok(owner.text.includes(evil.message));
  assert.ok(visitor.text.includes("https://example.com/#work"));
  assert.equal(escapeHtml(`&<>"'`), "&amp;&lt;&gt;&quot;&#39;");
});

test("successful submission sends both emails and replay sends neither", async () => {
  const { deps, counts } = setup();
  const first = await processContact(input, deps);
  const second = await processContact({ ...input, turnstileToken: "expired" }, deps);
  assert.equal(first.status, 200);
  assert.equal(first.body.acknowledgment, true);
  assert.equal(second.body.ok, true);
  assert.deepEqual(counts, { owner: 1, acknowledgment: 1 });
});

test("acknowledgment failure is accepted without duplicating owner notification", async () => {
  const { deps, counts } = setup();
  deps.sendAcknowledgment = async () => {
    counts.acknowledgment++;
    throw new Error("SMTP timeout");
  };
  const first = await processContact(input, deps);
  const second = await processContact(input, deps);
  assert.equal(first.body.code, "owner_delivered");
  assert.equal(first.body.acknowledgment, false);
  assert.equal(second.body.ok, true);
  assert.deepEqual(counts, { owner: 1, acknowledgment: 1 });
});

test("uncertain SMTP failure blocks a blind resend and never sends a false confirmation", async () => {
  const { deps, counts } = setup();
  deps.sendOwner = async () => {
    counts.owner++;
    throw new Error("timeout");
  };
  assert.equal((await processContact(input, deps)).status, 502);
  assert.equal((await processContact(input, deps)).status, 409);
  assert.deepEqual(counts, { owner: 1, acknowledgment: 0 });
});

test("concurrent duplicate submissions send the owner only one notification", async () => {
  const { deps, counts } = setup();
  const results = await Promise.all([processContact(input, deps), processContact(input, deps)]);
  assert.ok(results.some((result) => result.status === 200));
  assert.equal(counts.owner, 1);
  assert.equal(counts.acknowledgment, 1);
});

test("honeypot, rejected bot token, and rate limits prevent all delivery", async () => {
  for (const mode of ["honeypot", "bot", "rate"] as const) {
    const { deps, counts } = setup();
    if (mode === "bot") deps.verifyBot = async () => false;
    if (mode === "rate") deps.rateLimit = async () => false;
    const result = await processContact(
      { ...input, website: mode === "honeypot" ? "spam" : "" },
      deps,
    );
    assert.equal(result.status, mode === "rate" ? 429 : 400);
    assert.deepEqual(counts, { owner: 0, acknowledgment: 0 });
  }
});

test("an idempotency key cannot be reused with different content", async () => {
  const { deps, counts } = setup();
  await processContact(input, deps);
  assert.equal(
    (await processContact({ ...input, message: "A different message with enough length." }, deps))
      .body.code,
    "key_conflict",
  );
  assert.equal(counts.owner, 1);
});

test("persistent store outage fails closed before email delivery", async () => {
  const { deps, counts } = setup();
  deps.store.claim = async () => {
    throw new Error("Redis unavailable");
  };
  await assert.rejects(processContact(input, deps));
  assert.deepEqual(counts, { owner: 0, acknowledgment: 0 });
});

test("state write failure after owner delivery still attempts confirmation and avoids duplicate notifications", async () => {
  const { deps, counts } = setup();
  deps.store.put = async () => {
    throw new Error("Redis write unavailable");
  };
  assert.equal((await processContact(input, deps)).body.ok, true);
  assert.equal((await processContact(input, deps)).status, 409);
  assert.deepEqual(counts, { owner: 1, acknowledgment: 1 });
});
