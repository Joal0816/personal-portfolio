import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { resolve } from 'node:path'
import { certifications, projects, navLinks, profile, sortProjects } from '../lib/portfolio-data.ts'

const root = resolve(import.meta.dirname, '..')
const publicRoot = resolve(root, 'public')
function asset(path) {
  assert(path.startsWith('/'), `Asset must have a local absolute path: ${path}`)
  const file = resolve(publicRoot, `.${decodeURIComponent(path)}`)
  assert(file.startsWith(`${publicRoot}/`) && existsSync(file), `Missing public asset: ${path}`)
}
assert.equal(new Set(projects.map((p) => p.title)).size, projects.length, 'Duplicate project titles')
assert.equal(projects.length, 26, 'Expected all 26 portfolio projects')
assert.equal(new Set(certifications.map((c) => c.name)).size, certifications.length, 'Duplicate certificates')
for (const project of projects) {
  asset(project.image)
  if (project.favicon) asset(project.favicon)
  if (project.date) {
    assert(/^\d{4}-\d{2}-\d{2}$/.test(project.date), `Invalid date: ${project.title}`)
    assert.equal(new Date(`${project.date}T00:00:00Z`).toISOString().slice(0, 10), project.date)
    assert((project.dateSource || project.dateEvidence) && project.dateLabel, `Missing date evidence: ${project.title}`)
  }
  for (const value of [project.demo, project.repo, project.dateSource].filter(Boolean)) {
    if (value.startsWith('/')) asset(value)
    else if (value !== '#') assert.equal(new URL(value).protocol, 'https:', `Invalid link: ${value}`)
  }
}
for (const certificate of certifications) {
  asset(certificate.image)
  asset(certificate.preview)
}
for (const file of ['/resume.pdf', '/cv.pdf', '/profile.jpg', '/sw.js', '/manifest.webmanifest']) asset(file)
for (const [url, filename] of [[profile.resumeUrl, 'resume.pdf'], [profile.cvUrl, 'cv.pdf']]) {
  const hash = createHash('sha256').update(readFileSync(resolve(publicRoot, filename))).digest('hex').slice(0, 12)
  assert.equal(url, `/${filename}?v=${hash}`, `Stale cache-busting URL for ${filename}`)
}
for (const link of navLinks) {
  const pages = ['app/page.tsx', 'components/hero.tsx', 'components/about.tsx', 'components/projects.tsx', 'components/certifications.tsx', 'components/contact.tsx'].map((p) => readFileSync(resolve(root, p), 'utf8')).join('\n')
  assert(pages.includes(`id="${link.href.slice(1)}"`), `Missing navigation target: ${link.href}`)
}
assert.deepEqual(projects, sortProjects(projects), 'Projects must default to newest first')
assert.equal(certifications[0].name, 'Startup Basics 101', 'Latest certificate is missing or out of order')
console.log(`Content checks passed: ${projects.length} projects, ${certifications.length} certificates, local assets, dates, and navigation.`)
