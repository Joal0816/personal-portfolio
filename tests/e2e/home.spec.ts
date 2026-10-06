import { test, expect } from '@playwright/test'

test.describe('home page', () => {
  test('loads with a title mentioning Joseph Vergara', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Joseph Vergara/)
  })

  test('hero shows the name and the tagline', async ({ page }) => {
    await page.goto('/')

    const heading = page.locator('#top').getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()
    await expect(heading).toContainText('Joseph Vergara')

    // First clause of profile.tagline from lib/portfolio-data.ts.
    await expect(
      page.locator('#top').getByText('I write the software that lives directly on hardware'),
    ).toBeVisible()
  })
})
