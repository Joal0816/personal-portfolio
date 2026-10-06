import { test, expect } from '@playwright/test'

/**
 * Mobile layout guard: the page must not overflow horizontally at 390px.
 *
 * KNOWN IN-FLUX: this check may currently FAIL — the mobile overflow fix is
 * still in flight with the design lane. Kept red-flagged on purpose.
 */
test.describe('mobile layout', () => {
  test('no horizontal overflow at the 390px viewport', async ({ page }) => {
    test.skip(test.info().project.name !== 'mobile', 'mobile project (390px) only')

    await page.goto('/')

    const metrics = await page.evaluate(() => {
      const root = document.scrollingElement ?? document.documentElement
      return { scrollWidth: root.scrollWidth, innerWidth: window.innerWidth }
    })

    expect(
      metrics.scrollWidth,
      `document scrollWidth ${metrics.scrollWidth} exceeds viewport ${metrics.innerWidth}`,
    ).toBeLessThanOrEqual(metrics.innerWidth)
  })
})
