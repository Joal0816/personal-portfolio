import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'

// ImageMagick is used only when regenerating assets, never at runtime.
const root = new URL('../', import.meta.url)
const svg = readFileSync(new URL('public/icon.svg', root), 'utf8')
const light = svg.replace(/\s*<style>[\s\S]*?<\/style>/, '')
const dark = light.replaceAll('#0071e3', '#2997ff').replaceAll('#ffffff', '#1c1c1e')

function render(source, size, output) {
  const scratch = mkdtempSync(join(tmpdir(), 'jv-favicon-'))
  const input = join(scratch, 'icon.svg')
  writeFileSync(input, source)
  try {
    const result = spawnSync('magick', [
      '-background', 'none', '-density', '384', `RSVG:${input}`,
      '-resize', `${size}x${size}`, `PNG32:${new URL(output, root).pathname}`,
    ], { encoding: 'utf8', timeout: 10000 })
    if (result.status !== 0) throw new Error(result.stderr || result.error?.message || 'Favicon rendering failed')
  } finally {
    rmSync(scratch, { recursive: true, force: true })
  }
}

function inset(source, scale) {
  const content = source.replace(/<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')
  const offset = 32 * (1 - scale)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><rect width="64" height="64" fill="#e8f2fe"/><g transform="translate(${offset} ${offset}) scale(${scale})">${content}</g></svg>`
}

// Keep the legacy URL usable, with one canonical SVG source.
writeFileSync(new URL('public/favicon.svg', root), svg)
render(light, 32, 'public/icon-light-32x32.png')
render(dark, 32, 'public/icon-dark-32x32.png')
render(inset(light, 0.84), 180, 'public/apple-icon.png')
render(light, 192, 'public/icons/icon-192.png')
render(light, 512, 'public/icons/icon-512.png')
render(inset(light, 0.64), 512, 'public/icons/icon-maskable-512.png')
console.log('Generated theme favicons, Apple icon, and PWA icons from public/icon.svg.')
