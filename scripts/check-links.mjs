import { writeFileSync } from 'node:fs'
import { certifications, projects, profile } from '../lib/portfolio-data.ts'

const urls = [...new Set([
  ...projects.flatMap((project) => [project.demo, project.repo]),
  ...Object.values(profile.socials),
].filter((url) => url?.startsWith('https://'))) ]
const results = []
// Limit concurrency so hosts are not flooded and rate-limit failures remain readable.
for (let offset = 0; offset < urls.length; offset += 4) {
  await Promise.all(urls.slice(offset, offset + 4).map(async (url) => {
    try {
      const response = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(20000), headers: { 'User-Agent': 'PortfolioLinkCheck/1.0' } })
      await response.body?.cancel()
      const status = response.ok ? 'ok' : [401, 403, 429, 999].includes(response.status) ? 'restricted' : 'failed'
      results.push({ url, status, httpStatus: response.status, finalUrl: response.url })
    } catch (error) {
      results.push({ url, status: 'unverified', reason: error.cause?.code || error.message })
    }
  }))
}
results.sort((a, b) => a.url.localeCompare(b.url))
writeFileSync('docs/link-check-results.json', JSON.stringify({ checkedAt: new Date().toISOString(), results }, null, 2) + '\n')
for (const result of results) console.log(`${result.status.padEnd(10)} ${result.httpStatus || ''} ${result.url}`)
console.log(`Checked ${results.length} external URLs. Restricted hosts and timeouts require manual review.`)
process.exitCode = results.some((result) => result.status === 'failed') ? 1 : 0
