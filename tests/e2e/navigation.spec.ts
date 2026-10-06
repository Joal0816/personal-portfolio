import { test, expect } from '@playwright/test'

const NAV = [
  { label: 'About', href: '#about', sectionId: 'about' },
  { label: 'The bench', href: '#telemetry', sectionId: 'telemetry' },
  { label: 'Projects', href: '#projects', sectionId: 'projects' },
  { label: 'Certifications', href: '#certifications', sectionId: 'certifications' },
  { label: 'Contact', href: '#contact', sectionId: 'contact' },
] as const

test.describe('navigation integrity', () => {
  test('the five nav links carry the expected hrefs', async ({ page }) => {
    await page.goto('/')

    for (const item of NAV) {
      const links = page.getByRole('link', { name: item.label })
      const count = await links.count()
      expect(count, `at least one "${item.label}" nav link`).toBeGreaterThan(0)

      // The links are rendered in more than one place (header + hero tabs);
      // every copy must point at the same anchor.
      for (let i = 0; i < count; i++) {
        await expect(links.nth(i), `"${item.label}" link #${i + 1}`).toHaveAttribute(
          'href',
          item.href,
        )
      }
    }
  })

  test('each nav target section exists exactly once in the DOM', async ({ page }) => {
    await page.goto('/')

    for (const item of NAV) {
      await expect(page.locator(`#${item.sectionId}`), `#${item.sectionId}`).toHaveCount(1)
    }
  })
})
