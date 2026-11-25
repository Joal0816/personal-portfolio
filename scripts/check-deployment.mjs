import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { certifications, projects, profile } from '../lib/portfolio-data.ts'

const args = process.argv.slice(2).filter((arg) => arg !== '--')
const raw = args[0] || process.env.DEPLOYMENT_URL
assert(raw, 'Usage: pnpm run check:deployment -- https://your-deployment.example')
const base = new URL(raw)
assert(['http:', 'https:'].includes(base.protocol), 'Expected an HTTP(S) deployment URL')
const response = await fetch(base, { cache: 'no-store', signal: AbortSignal.timeout(30000) })
assert(response.ok, `Deployment returned HTTP ${response.status}`)
const html = await response.text()
assert(html.includes(certifications[0].name), `Deployment is stale: missing ${certifications[0].name}`)
assert(html.includes('Sort by') && html.includes('Newest first') && html.includes('pinned first'), 'Deployment is stale: project sorting is missing')
assert(html.includes('Selected work'), 'Deployment is stale: selected work is missing')
for (const path of [certifications[0].image, certifications[0].preview, projects[0].image, '/resume.pdf', '/cv.pdf']) {
  const asset = await fetch(new URL(path, base), { signal: AbortSignal.timeout(30000) })
  assert(asset.ok, `Missing deployed asset: ${path} (HTTP ${asset.status})`)
  const contentType = asset.headers.get('content-type') || ''
  assert(!contentType.includes('text/html'), `Asset returned HTML instead of a file: ${path}`)
  await asset.body?.cancel()
}
console.log(`Deployment checks passed: ${base.origin}, current content and key assets.`)

for (const [url, filename, label] of [
  [profile.resumeUrl, 'resume.pdf', 'résumé'],
  [profile.cvUrl, 'cv.pdf', 'CV'],
]) {
  assert(url && html.includes(url), `Deployment is stale: the latest ${label} link is missing`)
  const document = await fetch(new URL(url, base), { cache: 'no-store', signal: AbortSignal.timeout(30000) })
  assert(document.ok, `${label} returned HTTP ${document.status}`)
  const deployedHash = createHash('sha256').update(Buffer.from(await document.arrayBuffer())).digest('hex')
  const localHash = createHash('sha256').update(readFileSync(new URL(`../public/${filename}`, import.meta.url))).digest('hex')
  assert.equal(deployedHash, localHash, `Deployment is stale: ${label} PDF differs from the current local file`)
  console.log(`Verified deployed ${label} matches the updated local PDF byte for byte.`)
}
