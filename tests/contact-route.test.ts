import { test } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { POST } from "../src/app/api/contact/route";

test("HTTP route rejects disabled configuration, cross-origin requests, invalid bodies, and invalid fields", async () => {
  const original = { ...process.env };
  try {
    delete process.env.SMTP_HOST;
    const disabled = await POST(
      new NextRequest("http://localhost:3000/api/contact", { method: "POST", body: "{}" }),
    );
    assert.equal(disabled.status, 503);
    assert.equal((await disabled.json()).code, "configuration_required");
    Object.assign(process.env, {
      NODE_ENV: "development",
      CONTACT_TEST_MODE: "true",
      SMTP_HOST: "test.invalid",
      SMTP_PORT: "587",
      SMTP_SECURE: "false",
      SMTP_USER: "test",
      SMTP_PASSWORD: "test",
      MAIL_FROM: "test@example.com",
      NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
    });
    const invoke = (body: string, origin = "http://localhost:3000", type = "application/json") =>
      POST(
        new NextRequest("http://localhost:3000/api/contact", {
          method: "POST",
          headers: { origin, "content-type": type },
          body,
        }),
      );
    assert.equal((await invoke("{}", "https://attacker.example")).status, 403);
    assert.equal((await invoke("{}", "http://localhost:3000", "text/plain")).status, 415);
    assert.equal((await invoke("{bad json")).status, 400);
    assert.equal((await invoke("a".repeat(25000))).status, 413);
    const invalid = await invoke(
      JSON.stringify({ name: "", email: "wrong", message: "short", idempotencyKey: "invalid" }),
    );
    assert.equal(invalid.status, 400);
    const result = await invalid.json();
    assert.ok(result.errors.name);
    assert.ok(result.errors.email);
    assert.ok(result.errors.message);
    assert.equal(invalid.headers.get("cache-control"), "no-store");
  } finally {
    process.env = original;
  }
});
