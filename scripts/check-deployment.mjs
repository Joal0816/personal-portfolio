import assert from 'node:assert/strict'
import { certifications, projects } from '../lib/portfolio-data.ts'

const raw = process.argv[2] || process.env.DEPLOYMENT_URL
assert(raw, 'Usage: npm run check:deployment -- https://your-deployment.example')
const base = new URL(raw)
assert(['http:', 'https:'].includes(base.protocol), 'Expected an HTTP(S) deployment URL')
const response = await fetch(base, { cache: 'no-store', signal: AbortSignal.timeout(30000) })
assert(response.ok, `Deployment returned HTTP ${response.status}`)
const html = await response.text()
assert(html.includes(certifications[0].name), `Deployment is stale: missing ${certifications[0].name}`)
assert(html.includes('Sort by') && html.includes('Newest first'), 'Deployment is stale: project sorting is missing')
assert(html.includes('Selected work'), 'Deployment is stale: selected work is missing')
for (const path of [certifications[0].image, certifications[0].preview, projects[0].image, '/resume.pdf']) {
  const asset = await fetch(new URL(path, base), { signal: AbortSignal.timeout(30000) })
  assert(asset.ok, `Missing deployed asset: ${path} (HTTP ${asset.status})`)
  const contentType = asset.headers.get('content-type') || ''
  assert(!contentType.includes('text/html'), `Asset returned HTML instead of a file: ${path}`)
  await asset.body?.cancel()
}
console.log(`Deployment checks passed: ${base.origin}, current content and key assets.`)
