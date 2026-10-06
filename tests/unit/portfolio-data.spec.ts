import { test, expect } from '@playwright/test'
import {
  certifications,
  navLinks,
  projectCategories,
  projects,
} from '../../lib/portfolio-data'

const EXPECTED_NAV_HREFS = [
  '#about',
  '#telemetry',
  '#projects',
  '#certifications',
  '#contact',
] as const

test.describe('lib/portfolio-data invariants', () => {
  test('every project has non-empty title, category, role, description, image and tags', () => {
    expect(projects.length, 'at least one project').toBeGreaterThan(0)

    for (const project of projects) {
      const label = project.title || '(untitled project)'
      expect(project.title.trim(), `title of ${label}`).not.toBe('')
      expect(project.category.trim(), `category of ${label}`).not.toBe('')
      expect(project.role.trim(), `role of ${label}`).not.toBe('')
      expect(project.description.trim(), `description of ${label}`).not.toBe('')
      expect(project.image.trim(), `image of ${label}`).not.toBe('')
      expect(project.tags.length, `tags of ${label}`).toBeGreaterThan(0)
      for (const tag of project.tags) {
        expect(tag.trim(), `a tag of ${label}`).not.toBe('')
      }
    }
  })

  test('every project category belongs to projectCategories', () => {
    for (const project of projects) {
      expect(projectCategories, `category of "${project.title}"`).toContain(project.category)
    }
  })

  test('every certification has non-empty name, issuer, date and image', () => {
    expect(certifications.length, 'at least one certification').toBeGreaterThan(0)

    for (const cert of certifications) {
      const label = cert.name || '(unnamed cert)'
      expect(cert.name.trim(), 'cert name').not.toBe('')
      expect(cert.issuer.trim(), `issuer of ${label}`).not.toBe('')
      expect(cert.date.trim(), `date of ${label}`).not.toBe('')
      expect(cert.image.trim(), `image of ${label}`).not.toBe('')
    }
  })

  test('certification names are unique', () => {
    const names = certifications.map((cert) => cert.name)
    expect(new Set(names).size, `duplicate names in ${JSON.stringify(names)}`).toBe(names.length)
  })

  test('navLinks hrefs are exactly the five section anchors', () => {
    expect(navLinks.map((link) => link.href)).toEqual([...EXPECTED_NAV_HREFS])
    expect(navLinks, 'exactly five nav links').toHaveLength(5)
    for (const link of navLinks) {
      expect(link.label.trim(), 'nav label').not.toBe('')
    }
  })

  // NOTE: certification ordering is intentionally not asserted — the cert
  // array is being reordered right now.
})
