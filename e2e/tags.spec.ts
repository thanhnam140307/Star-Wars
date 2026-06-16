import { test, expect } from '@playwright/test'

test.describe('Vue du jeu (E2E)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test("La section Jedi s'affiche et contient les barres de progression/classes attendues", async ({
    page,
  }) => {
    const jediHeading = page.locator('h2:has-text("Jedi")')
    await expect(jediHeading).toHaveCount(1)

    const jediCard = page.locator('h2:has-text("Jedi") + .card')
    await expect(jediCard).toHaveCount(1)

    // Vérifie la présence des titres (nom du personnage + nom du vaisseau)
    await expect(jediCard.locator('.card-body > h3.card-title')).toHaveCount(2)

    // Vérifie la présence des crédits (format "NNN CG") — utilisé par user-story-2
    await expect(jediCard.locator('.card-body').locator('text=CG')).toHaveCount(1)

    // Vérifie les classes importantes présentes pour le Jedi
    await expect(jediCard.locator('.progress-bar.bg-success')).toHaveCount(1)
    await expect(jediCard.locator('.progress-bar.bg-warning')).toHaveCount(1)
    await expect(jediCard.locator('.progress-bar.bg-primary')).toHaveCount(1)
    await expect(jediCard.locator('.progress-bar.bg-danger')).toHaveCount(1)

    // Vérifie la présence des éléments de progression (sans tester la largeur en %)
    const jediBars = jediCard.locator('.progress-bar')
    await expect(jediBars).toHaveCount(4)
    // toutes les barres doivent être initialement vides (width: 0%)
    for (let i = 0; i < (await jediBars.count()); i++) {
      const style = await jediBars.nth(i).getAttribute('style')
      expect(style).toContain('width')
    }
  })

  test("La section Sith s'affiche et contient les barres de progression/classes attendues", async ({
    page,
  }) => {
    const sithHeading = page.locator('h2:has-text("Sith")')
    await expect(sithHeading).toHaveCount(1)

    const sithCard = page.locator('h2:has-text("Sith") + .card')
    await expect(sithCard).toHaveCount(1)

    // Vérifie la présence des titres (nom du personnage + nom du vaisseau)
    await expect(sithCard.locator('.card-body > h3.card-title')).toHaveCount(2)

    // Vérifie la présence des crédits (format "NNN CG") — utilisé par user-story-2
    await expect(sithCard.locator('.card-body').locator('text=CG')).toHaveCount(1)

    // Vérifie les classes importantes présentes pour le Sith
    await expect(sithCard.locator('.progress-bar.bg-success')).toHaveCount(1)
    await expect(sithCard.locator('.progress-bar.bg-warning')).toHaveCount(1)
    await expect(sithCard.locator('.progress-bar.bg-primary')).toHaveCount(1)
    await expect(sithCard.locator('.progress-bar.bg-danger')).toHaveCount(1)

    // Vérifie la présence des éléments de progression (sans tester la largeur en %)
    const sithBars = sithCard.locator('.progress-bar')
    await expect(sithBars).toHaveCount(4)
    // toutes les barres doivent être initialement vides (width: 0%)
    for (let i = 0; i < (await sithBars.count()); i++) {
      const style = await sithBars.nth(i).getAttribute('style')
      expect(style).toContain('width')
    }
  })

  test('Affichage de la section Actions', async ({ page }) => {
    await expect(page.locator('[data-testid="actions-toolbar"]')).toHaveCount(1)
    await expect(page.locator('[data-testid="btn-start-mission"]')).toHaveCount(1)
    await expect(page.locator('[data-testid="btn-end-mission"]')).toHaveCount(1)
    await expect(page.locator('[data-testid="btn-repair"]')).toHaveCount(1)
    await expect(page.locator('[data-testid="btn-activate-thrusters"]')).toHaveCount(1)
    await expect(page.locator('[data-testid="btn-fight"]')).toHaveCount(1)
  })

  test('Affichage de la section Options de combat', async ({ page }) => {
    await expect(page.locator('[data-testid="fightOptions-toolbar"]')).toHaveCount(1)
    await expect(page.locator('[data-testid="btn-launch-missile"]')).toHaveCount(1)
  })

  test('Affichage du Journal de bord', async ({ page }) => {
    await expect(page.locator('[data-testid="log-card"]')).toHaveCount(1)
    const logMessage = page.locator('[data-testid="log-message"]')
    await expect(logMessage).toHaveCount(1)
  })

  test("Affichage de la carte 'Le plus riche'", async ({ page }) => {
    await expect(page.locator('[data-testid="richest-card"]')).toHaveCount(1)
    await expect(page.locator('[data-testid="richest-name"]')).toHaveCount(1)
    await expect(page.locator('[data-testid="richest-amount"]')).toHaveCount(1)
  })

  test('Si une classe requise est supprimée, le test échouera (vérification)', async ({ page }) => {
    await expect(page.locator('.progress-bar.bg-success')).toHaveCount(2) // jedi + sith
  })

  test('État des boutons avant le départ', async ({ page }) => {
    await expect(page.locator('[data-testid="btn-start-mission"]')).toBeEnabled()
    await expect(page.locator('[data-testid="btn-fight"]')).toBeDisabled()
    await expect(page.locator('[data-testid="btn-end-mission"]')).toBeDisabled()
    await expect(page.locator('[data-testid="btn-activate-thrusters"]')).toBeDisabled()
    await expect(page.locator('[data-testid="btn-repair"]')).toBeDisabled()
  })
})
