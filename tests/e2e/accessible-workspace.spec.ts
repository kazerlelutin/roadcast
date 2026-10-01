import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("le corps d'un roadcast est accessible dans les deux thèmes @a11y", async ({ page }) => {
  await page.goto("/demo");
  await expect(page.getByRole("navigation", { name: "Arbre des chroniques" })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Contenu de la chronique" })).toBeVisible();
  await page.getByRole("button", { name: "Passer au mode clair" }).click();
  await expect(page.getByRole("button", { name: "Passer au mode sombre" })).toBeVisible();
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
