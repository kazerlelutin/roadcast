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

test("partage et organise les chroniques depuis l'espace de travail", async ({ page }) => {
  await page.goto("/demo");
  await page.getByRole("button", { name: "Partager" }).click();
  await expect(page.getByRole("dialog", { name: "Choisir un lien" })).toBeVisible();
  await page.getByLabel("Lire").check();
  await expect(page.getByLabel("Lien à partager")).toHaveValue(/\/demo\/read$/);
  await page.getByRole("button", { name: "Fermer le partage" }).click();

  await page.getByLabel("Chroniqueur").fill("Nora");
  await page.getByRole("option", { name: "Créer « Nora »" }).click();
  await expect(page.getByLabel("Chroniqueur")).toHaveValue("Nora");
  await page.getByRole("button", { name: "+ Nouvelle chronique" }).click();
  await expect(page.getByLabel("Titre de la chronique")).toHaveValue("Nouvelle chronique");
  await expect(page.getByRole("heading", { name: "Aucune diffusion en cours" })).toBeVisible();
});
