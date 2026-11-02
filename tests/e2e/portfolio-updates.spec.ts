import { test, expect } from '@playwright/test'

test('project sorting keeps pinned entries first and sorts dated work chronologically', async ({ page }) => {
  await page.goto('/')
  const section = page.locator('#projects')
  const dates = () => section.locator('[data-project-date]').evaluateAll((nodes) => nodes.map((node) => ({
    date: node.getAttribute('data-project-date') || '',
    pinned: node.getAttribute('data-project-pinned') === 'true',
  })))
  const expectOrder = (entries: Awaited<ReturnType<typeof dates>>, order: 'newest' | 'oldest') => {
    const pinnedCount = entries.filter((entry) => entry.pinned).length
    expect(entries.slice(0, pinnedCount).every((entry) => entry.pinned)).toBe(true)
    const unpinned = entries.filter((entry) => !entry.pinned)
    const known = unpinned.filter((entry) => entry.date).map((entry) => entry.date)
    const expected = [...known].sort()
    if (order === 'newest') expected.reverse()
    expect(known).toEqual(expected)
    expect(unpinned.slice(known.length).every((entry) => !entry.date)).toBe(true)
  }
  const newest = await dates()
  expectOrder(newest, 'newest')
  await expect(section.getByRole('status')).toContainText('Newest first')
  await section.getByLabel('Sort by').selectOption('oldest')
  const oldest = await dates()
  expectOrder(oldest, 'oldest')
  expect(oldest.map((entry) => entry.date).filter(Boolean)).not.toEqual(newest.map((entry) => entry.date).filter(Boolean))
  await expect(section.getByRole('status')).toContainText('Oldest first')
  await section.getByRole('searchbox', { name: 'Search projects' }).fill('FreeRTOS')
  const filtered = (await dates()).map((entry) => entry.date).filter(Boolean)
  expect(filtered).toEqual([...filtered].sort())
})

test('priority projects show evidence-backed status labels and working project links', async ({ page }) => {
  await page.goto('/')
  const section = page.locator('#projects')

  const featured = section.locator('article').filter({ hasText: 'ParcelSense AI' })
  await expect(featured).toContainText('Prototype · Field Desk live')
  await expect(featured.getByRole('link', { name: 'Open Field Desk', exact: true })).toHaveAttribute(
    'href',
    'https://parcelsense.joalvergs.tech/',
  )

  const entries = [
    ['LabSentinel', 'Simulator verified · hardware pending', 'https://labsentinel.vercel.app'],
    ['Monitor — Smart Baby Monitoring System', 'Educational prototype · sample mode', 'https://monitor.joalvergs.tech'],
    ['CMU Assessment Hub', 'Academic pilot · fictional data', 'https://cmu-assessment-hub.joalvergs.tech'],
    ['MP-Detect — Microplastic Detection & Quantification GUI', 'Offline desktop application', 'https://github.com/Joal0816/Mp-Detect'],
    ['UNICHAT — Anonymous Campus 1-on-1 Chat', 'Live Campus PWA', 'https://unichat.studentio.xyz'],
  ] as const

  for (const [title, badge, href] of entries) {
    const entry = section.locator('li').filter({ hasText: title })
    await expect(entry).toContainText(badge)
    await expect(entry.getByRole('heading', { name: new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) })).toBeVisible()
    await expect(entry.locator('h3 a')).toHaveAttribute('href', href)
  }

  await expect(section.getByText(/CircuitSense|Klaro-CV/i)).toHaveCount(0)
})

test('selected work opens a project with a documented result and restores focus', async ({ page }) => {
  await page.goto('/')
  const section = page.locator('#projects')
  const title = 'Barangay Connect Web App'
  const featured = section.locator('article').filter({ hasText: title })
  const button = await featured.count()
    ? featured.getByRole('button', { name: 'Read the full note' })
    : section.locator('li').filter({ hasText: title }).getByRole('button', { name: 'Open note' })
  await button.click()
  const dialog = page.getByRole('dialog', { name: 'Barangay Connect Web App' })
  await expect(dialog.getByRole('heading', { name: 'Result', exact: true })).toBeVisible()
  await expect(dialog.getByText('Won 2nd Best Innovation and 3rd Best Pitch at TechShowcase 2025, MSU-IIT.', { exact: true })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(button).toBeFocused()
})

test('latest certificate is visible, opens the original PDF, and works with filters', async ({ page, request }) => {
  await page.goto('/')
  const section = page.locator('#certifications')
  await expect(section.getByRole('heading', { name: 'Latest certificate: Startup Basics 101' })).toBeVisible()
  const trigger = section.getByRole('button', { name: 'Preview latest certificate: Startup Basics 101' })
  await trigger.click()
  const dialog = page.getByRole('dialog', { name: 'Startup Basics 101' })
  await expect(dialog).toBeVisible()
  const pdf = dialog.getByRole('link', { name: 'Open the full PDF' })
  expect((await request.get((await pdf.getAttribute('href'))!)).ok()).toBe(true)
  await expect(dialog.getByRole('img', { name: 'Startup Basics 101 certificate scan' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(trigger).toBeFocused()
  await section.getByRole('button', { name: 'Data & entrepreneurship', exact: true }).click()
  await expect(section.locator('li').getByRole('button', { name: /Startup Basics 101/ })).toBeVisible()
})
