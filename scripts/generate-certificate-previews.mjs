import { mkdirSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { certifications } from '../lib/portfolio-data.ts'

mkdirSync('public/certificates/previews', { recursive: true })
for (const cert of certifications.filter((cert) => cert.image.endsWith('.pdf'))) {
  const result = spawnSync('pdftoppm', ['-f', '1', '-singlefile', '-scale-to', '640', '-jpeg', '-jpegopt', 'quality=85', `public${cert.image}`, `public${cert.preview.slice(0, -4)}`], { stdio: 'inherit' })
  if (result.error || result.status !== 0) {
    console.error(result.error?.message || `Preview generation failed: ${cert.name}`)
    process.exit(1)
  }
}
console.log('Certificate previews generated from the first page of the original local PDFs.')
