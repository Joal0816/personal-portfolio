import { test, expect } from '@playwright/test'

const VIEWPORTS = [
  { name: 'Android Small (360x800)', width: 360, height: 800 },
  { name: 'iPhone SE (375x667)', width: 375, height: 667 },
  { name: 'iPhone 12/13/14 (390x844)', width: 390, height: 844 },
  { name: 'iPhone 15/16 Pro (393x852)', width: 393, height: 852 },
  { name: 'iPhone Plus/Pro Max (430x932)', width: 430, height: 932 },
  { name: 'Small Tablet (768x1024)', width: 768, height: 1024 },
]

test.describe('comprehensive mobile responsiveness', () => {
  for (const vp of VIEWPORTS) {
    test(`zero horizontal overflow on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height })
      await page.goto('/')

      // Scroll across entire document to trigger lazy-renders & check at every scroll height
      const scrollStep = 800
      const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight)

      for (let y = 0; y < totalHeight; y += scrollStep) {
        await page.evaluate((top) => window.scrollTo(0, top), y)
        await page.waitForTimeout(50)

        const overflow = await page.evaluate(() => {
          const docWidth = document.documentElement.clientWidth
          const scrollWidth = document.documentElement.scrollWidth
          const bodyWidth = document.body.scrollWidth
          return {
            hasOverflow: scrollWidth > docWidth || bodyWidth > docWidth,
            diff: Math.max(scrollWidth - docWidth, bodyWidth - docWidth),
          }
        })

        expect(
          overflow.hasOverflow,
          `Horizontal overflow detected at scroll position ${y}px on ${vp.name} (diff: ${overflow.diff}px)`
        ).toBeFalsy()
      }
    })
  }
})
