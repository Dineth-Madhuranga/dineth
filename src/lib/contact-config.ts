export function contactConfiguration() {
  const testMode =
    process.env.NODE_ENV !== "production" && process.env.CONTACT_TEST_MODE === "true";
  const required = [
    "SMTP_HOST",
    "SMTP_USER",
    "SMTP_PASSWORD",
    "MAIL_FROM",
    "NEXT_PUBLIC_SITE_URL",
    ...(testMode
      ? []
      : [
          "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
          "TURNSTILE_SECRET_KEY",
          "UPSTASH_REDIS_REST_URL",
          "UPSTASH_REDIS_REST_TOKEN",
          "CONTACT_HASH_SECRET",
        ]),
  ];
  const missing = required.filter((key) => !process.env[key]);
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = process.env.SMTP_SECURE;
  let validOrigin = false;
  try {
    const url = new URL(process.env.NEXT_PUBLIC_SITE_URL || "");
    const originOnly =
      url.pathname === "/" && !url.search && !url.hash && !url.username && !url.password;
    validOrigin =
      originOnly &&
      (process.env.NODE_ENV === "production"
        ? url.protocol === "https:" && url.hostname !== "localhost"
        : ["http:", "https:"].includes(url.protocol));
  } catch {
    /* A missing origin keeps the endpoint disabled. */
  }
  return {
    ready:
      missing.length === 0 &&
      [465, 587].includes(port) &&
      (!secure || secure === (port === 465 ? "true" : "false")) &&
      validOrigin,
    testMode,
  };
}
