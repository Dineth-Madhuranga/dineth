import { test } from "node:test";
import assert from "node:assert/strict";
import { contactConfiguration } from "../src/lib/contact-config";

test("production never enables public submissions with test mode or missing protections", () => {
  const original = { ...process.env };
  try {
    Object.assign(process.env, {
      NODE_ENV: "production",
      CONTACT_TEST_MODE: "true",
      SMTP_HOST: "smtp.example.com",
      SMTP_PORT: "465",
      SMTP_SECURE: "true",
      SMTP_USER: "test",
      SMTP_PASSWORD: "not-a-real-secret",
      MAIL_FROM: "test@example.com",
      NEXT_PUBLIC_SITE_URL: "https://example.com",
    });
    for (const key of [
      "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
      "TURNSTILE_SECRET_KEY",
      "UPSTASH_REDIS_REST_URL",
      "UPSTASH_REDIS_REST_TOKEN",
      "CONTACT_HASH_SECRET",
    ])
      delete process.env[key];
    assert.equal(contactConfiguration().testMode, false);
    assert.equal(contactConfiguration().ready, false);
  } finally {
    process.env = original;
  }
});

test("local SMTP test mode is explicit and enforces TLS port consistency", () => {
  const original = { ...process.env };
  try {
    Object.assign(process.env, {
      NODE_ENV: "development",
      CONTACT_TEST_MODE: "true",
      SMTP_HOST: "smtp.example.com",
      SMTP_PORT: "587",
      SMTP_SECURE: "false",
      SMTP_USER: "test",
      SMTP_PASSWORD: "not-a-real-secret",
      MAIL_FROM: "test@example.com",
      NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
    });
    assert.equal(contactConfiguration().ready, true);
    process.env.SMTP_SECURE = "true";
    assert.equal(contactConfiguration().ready, false);
    process.env.SMTP_SECURE = "false";
    process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000/incorrect-path";
    assert.equal(contactConfiguration().ready, false);
  } finally {
    process.env = original;
  }
});
