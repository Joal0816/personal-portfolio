import { test, expect } from '@playwright/test'

/**
 * The theme mechanism (components/theme-toggle.tsx): clicking swaps the
 * `dark` / `light` class on <html> and stores the choice in localStorage.
 * Two toggle instances exist in the navbar (desktop bar + compact controls),
 * so we click the visible one only.
 */
test.describe('theme toggle', () => {
  test('toggles the light/dark state on <html> and renders in both states', async ({
    page,
  }) => {
    await page.goto('/')

    const toggle = page
      .getByRole('button', { name: /Switch to daylight|Switch to lamp/i })
      .filter({ visible: true })
      .first()
    await expect(toggle).toBeVisible()

    const htmlClass = () => page.evaluate(() => document.documentElement.className)

    // Root layout ships in dark mode.
    expect(await htmlClass()).toMatch(/\bdark\b/)

    await toggle.click()
    await expect.poll(htmlClass).toMatch(/\blight\b/)
    expect(await htmlClass()).not.toMatch(/\bdark\b/)
    // Page still renders in the light state.
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

    await toggle.click()
    await expect.poll(htmlClass).toMatch(/\bdark\b/)
    // ...and back in the dark state.
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })
})
