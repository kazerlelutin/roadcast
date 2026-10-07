import { expect, test } from "@playwright/test";

test("expose les métadonnées SEO dans le HTML de l’accueil", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Roadcast — Écrire, diffuser, partager");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Préparez vos chroniques/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://roadcast.app/");
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", "Roadcast — Écrire, diffuser, partager");
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary");
});

test("protège les liens à jeton de l’indexation et des aperçus", async ({ page }) => {
  await page.goto("/read/private-token-123");

  await expect(page).toHaveTitle("Lecture privée — Roadcast");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow, noarchive");
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.locator('meta[property^="og:"]')).toHaveCount(0);
  await expect(page.locator('meta[name^="twitter:"]')).toHaveCount(0);
});
