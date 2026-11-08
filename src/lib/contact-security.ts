import { createHmac } from "node:crypto";
import { isIP } from "node:net";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import type { ContactDependencies, DeliveryRecord } from "./contact-service";
import { sendOwner, sendAcknowledgment } from "./email/transporter";
import { contactConfiguration } from "./contact-config";
import { siteUrl } from "../data/site";

const localRecords = new Map<string, DeliveryRecord>();
function hash(value: string) {
  return createHmac("sha256", process.env.CONTACT_HASH_SECRET || "local-test-only")
    .update(value)
    .digest("hex");
}

export function contactDependencies(ip: string): ContactDependencies {
  const { testMode } = contactConfiguration();
  const redis = testMode ? null : Redis.fromEnv();
  const ipLimiter = redis
    ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5, "15 m"), prefix: "portfolio:ip" })
    : null;
  const emailLimiter = redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(3, "1 h"),
        prefix: "portfolio:email",
      })
    : null;
  const globalLimiter = redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.fixedWindow(100, "1 d"),
        prefix: "portfolio:global",
      })
    : null;
  const storeKey = (key: string) => `portfolio:submission:${key}`;
  return {
    fingerprint: (data) =>
      hash(JSON.stringify([data.name, data.email, data.company, data.inquiry, data.message])),
    async rateLimit(data) {
      if (testMode) return true;
      const results = await Promise.all([
        ipLimiter!.limit(hash(ip)),
        emailLimiter!.limit(hash(data.email)),
        globalLimiter!.limit("daily"),
      ]);
      return results.every((result) => result.success);
    },
    async verifyBot(token) {
      if (testMode) return true;
      if (!token) return false;
      const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY!,
          response: token,
          ...(isIP(ip) ? { remoteip: ip } : {}),
        }),
        signal: AbortSignal.timeout(6000),
      });
      if (!response.ok) return false;
      const result: { success?: boolean; hostname?: string; action?: string } =
        await response.json();
      return (
        result.success === true &&
        result.hostname === new URL(siteUrl()).hostname &&
        result.action === "contact"
      );
    },
    store: {
      async get(key) {
        return redis ? redis.get<DeliveryRecord>(storeKey(key)) : (localRecords.get(key) ?? null);
      },
      async claim(key, record) {
        if (redis)
          return (await redis.set(storeKey(key), record, { nx: true, ex: 86400 })) === "OK";
        if (localRecords.has(key)) return false;
        if (localRecords.size > 100) localRecords.clear();
        localRecords.set(key, record);
        return true;
      },
      async put(key, record) {
        if (redis) await redis.set(storeKey(key), record, { ex: 86400 });
        else localRecords.set(key, record);
      },
    },
    sendOwner,
    sendAcknowledgment,
    log: (event) => console.error(`[contact] ${event}`),
  };
}
