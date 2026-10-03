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
  await expect(page.getByLabel("Lien à partager")).toHaveValue(/\/read\/[a-f0-9]{32}$/);
  await page.getByRole("button", { name: "Fermer le partage" }).click();

  await page.getByLabel("Chroniqueur").fill("Nora");
  await page.getByRole("option", { name: "Créer « Nora »" }).click();
  await expect(page.getByLabel("Chroniqueur")).toHaveValue("Nora");
  await page.getByRole("button", { name: "+ Nouvelle chronique" }).click();
  await expect(page.getByLabel("Titre de la chronique")).toHaveValue("Nouvelle chronique");
  await expect(page.getByRole("heading", { name: "Aucune diffusion en cours" })).toBeVisible();
});

test("affiche le chroniqueur sous un titre long dans l’arbre", async ({ page }) => {
  await page.goto("/demo");
  await page.getByLabel("Titre de la chronique").fill("Découverte du personnage Promeia");
  await page.getByRole("combobox", { name: "Chroniqueur" }).fill("kazerlelutin");
  await page.getByRole("option", { name: "Créer « kazerlelutin »" }).click();

  const chronicleButton = page.getByRole("navigation", { name: "Arbre des chroniques" }).locator("ol > li").first().getByRole("button").first();
  const layout = await chronicleButton.evaluate((button) => {
    const [title, metadata] = Array.from(button.children).map((child) => child.getBoundingClientRect());
    return { metadataTop: metadata?.top, titleBottom: title?.bottom, titleRight: title?.right, buttonRight: button.getBoundingClientRect().right };
  });

  expect(layout.metadataTop).toBeGreaterThanOrEqual(layout.titleBottom ?? 0);
  expect(layout.titleRight).toBeLessThanOrEqual(layout.buttonRight);
});

test("permet de faire défiler l’éditeur, l’arbre et l’aperçu sur mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/demo");

  const header = page.locator("main > header");
  const headerLayout = await header.evaluate((element) => {
    const brand = element.firstElementChild?.getBoundingClientRect();
    const links = element.lastElementChild?.getBoundingClientRect();
    return { brandBottom: brand?.bottom, linksTop: links?.top };
  });
  expect(headerLayout.brandBottom).toBeLessThanOrEqual(headerLayout.linksTop ?? 0);
  const lecture = page.getByRole("link", { name: "Lecture" });
  const share = page.getByRole("button", { name: "Partager" });
  const lectureLayout = await lecture.evaluate((element) => ({ alignItems: globalThis.getComputedStyle(element).alignItems, display: globalThis.getComputedStyle(element).display, height: element.getBoundingClientRect().height }));
  const shareLayout = await share.evaluate((element) => ({ display: globalThis.getComputedStyle(element).display, height: element.getBoundingClientRect().height }));
  expect(lectureLayout.display).toBe("flex");
  expect(lectureLayout.alignItems).toBe("center");
  expect(lectureLayout.height).toBe(shareLayout.height);

  const workspace = page.locator("main");
  await expect.poll(() => workspace.evaluate((element) => element.scrollHeight)).toBeGreaterThan(844);
  expect(await workspace.evaluate((element) => globalThis.getComputedStyle(element).scrollbarColor)).not.toBe("auto");
  await page.getByRole("region", { name: "Éditeur de chronique" }).hover();
  await page.mouse.wheel(0, 500);
  await expect.poll(() => workspace.evaluate((element) => element.scrollTop)).toBeGreaterThan(0);
  await workspace.evaluate((element) => { element.scrollTop = element.scrollHeight; });

  await expect(page.getByRole("navigation", { name: "Arbre des chroniques" })).toBeVisible();
  await expect(page.getByRole("complementary", { name: "Aperçu des sliders" })).toBeVisible();
  await expect(page.getByLabel("Lien du slider")).toBeVisible();
});
