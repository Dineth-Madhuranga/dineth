import { defineConfig } from "@playwright/test";
import { existsSync } from "node:fs";

const edge = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
export default defineConfig({
  testDir: "./tests/contact-browser",
  workers: 1,
  timeout: 45000,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3001",
    viewport: { width: 1440, height: 960 },
    launchOptions: {
      ...(process.env.BROWSER_PATH
        ? { executablePath: process.env.BROWSER_PATH }
        : existsSync(edge)
          ? { executablePath: edge }
          : {}),
    },
  },
  webServer: {
    command: "npm run dev -- --port 3001",
    url: "http://localhost:3001",
    timeout: 120000,
    reuseExistingServer: false,
    env: {
      NEXT_DIST_DIR: ".next-contact-test",
      CONTACT_TEST_MODE: "true",
      SMTP_HOST: "smtp.test.invalid",
      SMTP_PORT: "587",
      SMTP_SECURE: "false",
      SMTP_USER: "test-only",
      SMTP_PASSWORD: "not-a-real-secret",
      MAIL_FROM: "test@example.com",
      CONTACT_TO_EMAIL: "owner@example.com",
      NEXT_PUBLIC_SITE_URL: "http://localhost:3001",
    },
  },
});
