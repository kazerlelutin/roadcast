import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("la page d'accueil est accessible @a11y", async ({ page }) => { await page.goto("/"); await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Préparez\. Partagez\.\s*Diffusez\./); await expect(page.getByLabel("Créer un roadcast")).toBeVisible(); const results = await new AxeBuilder({ page }).analyze(); expect(results.violations).toEqual([]); });
