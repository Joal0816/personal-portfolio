import { test, expect } from '@playwright/test'

/**
 * components/projects.tsx + components/project-modal.tsx (Base UI Dialog).
 * The featured card's "Read the full note" button opens the modal; the
 * dialog is dismissible with Escape.
 */
test.describe('project modal', () => {
  test('opens from a project card and Escape closes it', async ({ page }) => {
    await page.goto('/')

    const featured = page.locator('#projects article').first()
    const triggerLabel = await featured.getByRole('button', { name: /^Open / }).getAttribute('aria-label')
    const title = triggerLabel?.replace(/^Open /, '')
    expect(title).toBeTruthy()
    await page.getByRole('button', { name: 'Read the full note' }).click()

    const dialog = page.getByRole('dialog', { name: title!, exact: true })
    await expect(dialog).toBeVisible()
    await expect(dialog.getByText('What it does')).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
  })
})
