import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("la page d'accueil est accessible @a11y", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Gérez et partagez vos chroniques");
  await expect(page.getByLabel("Créer un roadcast")).toBeVisible();
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("le choix du mode clair est conservé", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Passer au mode clair" }).click();
  await expect(page.getByRole("button", { name: "Passer au mode sombre" })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("button", { name: "Passer au mode sombre" })).toBeVisible();
});
