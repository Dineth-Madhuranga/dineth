import { NextRequest, NextResponse } from "next/server";
import { contactRequestSchema } from "@/lib/contact-schema";
import { contactConfiguration } from "@/lib/contact-config";
import { contactDependencies } from "@/lib/contact-security";
import { processContact } from "@/lib/contact-service";

export const runtime = "nodejs";
export const maxDuration = 60;
const headers = { "Cache-Control": "no-store" };
const error = (status: number, code: string, message: string) =>
  NextResponse.json({ ok: false, code, message }, { status, headers });

export async function POST(request: NextRequest) {
  if (!contactConfiguration().ready)
    return error(
      503,
      "configuration_required",
      "The contact form is not connected yet. Please email dinethlaksitha@gmail.com directly.",
    );
  const expectedOrigin = new URL(process.env.NEXT_PUBLIC_SITE_URL!).origin;
  if (request.headers.get("origin") !== expectedOrigin)
    return error(403, "origin_rejected", "This request could not be verified.");
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return error(415, "invalid_content_type", "Please send a valid form submission.");
  if (Number(request.headers.get("content-length")) > 24000)
    return error(413, "too_large", "The message is too large.");
  let body: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return error(400, "invalid_json", "Please send a valid form submission.");
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 24000) {
        await reader.cancel();
        return error(413, "too_large", "The message is too large.");
      }
      chunks.push(value);
    }
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return error(400, "invalid_json", "Please send a valid form submission.");
  }
  const parsed = contactRequestSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json(
      {
        ok: false,
        code: "validation_failed",
        message: "Please check the highlighted fields.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400, headers },
    );
  // Vercel overwrites this header. On local/test servers all visitors share a conservative bucket.
  const ip = process.env.VERCEL
    ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || "unknown"
    : "local";
  try {
    const result = await processContact(parsed.data, contactDependencies(ip));
    return NextResponse.json(result.body, {
      status: result.status,
      headers: {
        ...headers,
        ...(result.retryAfter ? { "Retry-After": String(result.retryAfter) } : {}),
      },
    });
  } catch {
    console.error("[contact] provider_unavailable");
    return error(
      503,
      "temporarily_unavailable",
      "The contact service is temporarily unavailable. Please retry or email me directly.",
    );
  }
}
