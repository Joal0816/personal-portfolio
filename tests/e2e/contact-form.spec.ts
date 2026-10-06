import { test, expect } from '@playwright/test'

/**
 * components/contact.tsx — the form validates client-side and dispatches by
 * building a mailto: URL (window.location.href = mailto:...).
 *
 * Safety rules for this suite:
 *  - the legacy POST /api/contact endpoint is stubbed via page.route() so no
 *    request can ever reach a real mail pipeline;
 *  - a best-effort init guard cancels mailto: navigations (Navigation API),
 *    and headless Chromium never launches external protocol handlers.
 * No real email is sent from these tests.
 */
test.describe('contact form', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true, stubbed: true }),
      })
    })

    await page.addInitScript(() => {
      // Best-effort: cancel any navigation attempt to the mailto: scheme so
      // no external mail client can ever be launched during a test run.
      type NavigateEvent = {
        cancelable: boolean
        destination: { url: string }
        preventDefault: () => void
      }
      const w = window as unknown as {
        navigation?: {
          addEventListener: (type: string, listener: (e: NavigateEvent) => void) => void
        }
      }
      try {
        w.navigation?.addEventListener('navigate', (e) => {
          if (e.cancelable && e.destination.url.startsWith('mailto:')) {
            e.preventDefault()
          }
        })
      } catch {
        // Guard is best effort only; headless Chromium never hands mailto:
        // URLs to an external handler anyway.
      }
    })

    await page.goto('/')
  })

  test('submitting the empty form shows validation errors', async ({ page }) => {
    await page.getByRole('button', { name: 'Open my mail app and send' }).click()

    await expect(page.getByText('Please add your name.')).toBeVisible()
    await expect(page.getByText('Please add an email I can reply to.')).toBeVisible()
    await expect(page.getByText('Please write a message.')).toBeVisible()
  })

  test('a filled form reaches the dispatch UI state', async ({ page }) => {
    await page.getByLabel('Your name', { exact: true }).fill('Playwright Test')
    await page.getByLabel('Your email', { exact: true }).fill('test@example.com')
    await page.getByRole('textbox', { name: 'Message', exact: true }).fill('Automated test run — please ignore.')

    await page.getByRole('button', { name: 'Open my mail app and send' }).click()

    // The dispatch UI state (scoped to the form container to avoid companion toast)
    const statusBox = page.locator('#contact form').getByRole('status')
    await expect(statusBox).toContainText(
      'Your mail app should now be open with this message.',
    )

    // Dispatch is client-side (mailto:); the page itself must not navigate
    // away and no network request may fire.
    expect(new URL(page.url()).pathname).toBe('/')
  })
})
