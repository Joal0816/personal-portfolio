import { test, expect } from '@playwright/test'

/**
 * components/projects.tsx + components/project-modal.tsx (Base UI Dialog).
 * The featured card's "Read the full note" button opens the modal; the
 * dialog is dismissible with Escape.
 */
test.describe('project modal', () => {
  test('opens from a project card and Escape closes it', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('button', { name: 'Read the full note' }).click()

    // The featured project modal
    const dialog = page.getByRole('dialog', { name: /O\.I\.N\.K\.|Swine Thermal/i })
    await expect(dialog).toBeVisible()
    await expect(dialog.getByText('What it does')).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
  })
})
