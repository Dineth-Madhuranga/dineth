import { test, expect } from "@playwright/test";

async function fillForm(page: import("@playwright/test").Page) {
  await page.getByLabel("Full name", { exact: false }).fill("Alex Morgan");
  await page.getByLabel("Email address", { exact: false }).fill("alex@example.com");
  await page
    .getByLabel("Your message", { exact: false })
    .fill("I would like to discuss a new website for our company.");
}

test("empty and invalid fields show inline feedback and focus the first error", async ({
  page,
}) => {
  await page.goto("/#contact");
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(page.getByText("Please enter your full name.")).toBeVisible();
  await expect(page.getByLabel("Full name", { exact: false })).toBeFocused();
  await expect(page.getByText("Please enter a valid email address.")).toBeVisible();
  await expect(page.getByText("Please write at least 20 characters.")).toBeVisible();
  await page.getByLabel("Email address", { exact: false }).fill("bad-address");
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(page.locator("#email")).toHaveAttribute("aria-invalid", "true");
});

test("pending delivery disables submission; confirmed acceptance shows honest partial status", async ({
  page,
}) => {
  let attempts = 0;
  await page.route("**/api/contact", async (route) => {
    attempts++;
    await new Promise((resolve) => setTimeout(resolve, 800));
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        code: "owner_delivered",
        acknowledgment: false,
        message:
          "Message received. Your confirmation email could not be sent, but there’s no need to submit again.",
      }),
    });
  });
  await page.goto("/#contact");
  await fillForm(page);
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(page.getByRole("button", { name: "Sending message" })).toBeDisabled();
  await expect(page.getByRole("heading", { name: "Message received." })).toBeVisible();
  await expect(page.getByText(/Your confirmation email could not be sent/)).toBeVisible();
  expect(attempts).toBe(1);
});

test("network retry preserves the same idempotency key and does not show a false success", async ({
  page,
}) => {
  const keys: string[] = [];
  await page.route("**/api/contact", async (route) => {
    keys.push(route.request().postDataJSON().idempotencyKey);
    if (keys.length === 1) await route.abort("failed");
    else
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          ok: true,
          acknowledgment: true,
          message: "Message received. A confirmation is on its way to your inbox.",
        }),
      });
  });
  await page.goto("/#contact");
  await fillForm(page);
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(page.getByRole("form", { name: "Contact Dineth" }).getByRole("alert")).toContainText(
    "couldn’t confirm delivery",
  );
  await expect(page.getByRole("heading", { name: "Message received." })).not.toBeVisible();
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Message received." })).toBeVisible();
  expect(keys).toHaveLength(2);
  expect(keys[0]).toBe(keys[1]);
});
