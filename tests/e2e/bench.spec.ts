import { test, expect } from '@playwright/test'

/**
 * "The bench" fold-out section (rendered inside the hero, id="telemetry").
 *
 * Deliberately shallow: only assert the section renders. Console internals
 * (components/hardware-playground.tsx) are being redesigned right now and
 * are NOT asserted here.
 */
test.describe('the bench section', () => {
  test('renders the bench section', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('heading', { name: /The bench/ })).toBeVisible()
  })
})
