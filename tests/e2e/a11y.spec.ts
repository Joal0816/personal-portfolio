import { test, expect } from '@playwright/test'

test.describe('accessibility smoke', () => {
  test('every rendered <img> has an alt attribute', async ({ page }) => {
    await page.goto('/')

    const imagesWithoutAlt = await page.evaluate(() =>
      Array.from(document.images)
        .filter((img) => !img.hasAttribute('alt'))
        .map((img) => img.getAttribute('src') ?? '(no src)'),
    )

    expect(imagesWithoutAlt, 'images missing an alt attribute').toEqual([])
  })
})
