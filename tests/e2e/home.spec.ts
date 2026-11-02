import { test, expect } from '@playwright/test'
import { profile } from '../../lib/portfolio-data'

test.describe('home page', () => {
  test('loads with a title mentioning Joseph Vergara', async ({ page }) => {
    await page.goto('/')
    expect(await page.title()).toContain(profile.fullName)
  })

  test('hero shows the name and the tagline', async ({ page }) => {
    await page.goto('/')

    const heading = page.locator('#top').getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()
    await expect(heading).toContainText('Joseph Vergara')

    await expect(page.locator('#top').getByText(profile.tagline, { exact: true })).toBeVisible()
  })

  test('hero résumé and CV links serve PDFs', async ({ page, request }) => {
    await page.goto('/')
    const hero = page.locator('#top')
    await expect(hero.getByRole('link', { name: 'Résumé' })).toHaveAttribute('href', profile.resumeUrl)
    await expect(hero.getByRole('link', { name: 'Academic CV' })).toHaveAttribute('href', profile.cvUrl)

    for (const url of [profile.resumeUrl, profile.cvUrl]) {
      const response = await request.get(url)
      expect(response.ok()).toBe(true)
      expect(response.headers()['content-type']).toContain('application/pdf')
    }
  })
})
