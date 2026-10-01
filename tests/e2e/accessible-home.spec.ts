import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("la page d'accueil est accessible @a11y", async ({ page }) => { await page.goto("/"); await expect(page.getByRole("heading", { name: /écrire une chronique/i })).toBeVisible(); const results = await new AxeBuilder({ page }).analyze(); expect(results.violations).toEqual([]); });
