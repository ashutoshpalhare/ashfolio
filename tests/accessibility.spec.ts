import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const wcagTags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"];

test("desktop portfolio has no automated accessibility violations", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("./");

  await expect(page).toHaveTitle(/Ashutosh Palhare/);
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
  expect(
    results.violations.map(({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      elements: nodes.map(({ target }) => target),
    })),
  ).toEqual([]);
});

test("mobile navigation remains accessible when expanded", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("./");

  const menuButton = page.getByRole("button", { name: "Open menu" });
  await menuButton.click();

  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#mobile-navigation")).toBeVisible();

  const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
  expect(
    results.violations.map(({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      elements: nodes.map(({ target }) => target),
    })),
  ).toEqual([]);
});

test("skip link and mobile menu support keyboard navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("./");

  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();

  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();

  const menuButton = page.getByRole("button", { name: "Open menu" });
  await menuButton.focus();
  await page.keyboard.press("Enter");
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");

  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  await expect(page.locator("#mobile-navigation")).toHaveCount(0);
});
