import { test, expect } from '@playwright/test'
import { CHARACTER_ORDER, CHARACTERS, getReply } from '../../lib/companion-data'

/**
 * Pure-function smoke over lib/companion-data.ts. Structural only — reply
 * copy and randomization are not asserted.
 */
test.describe('lib/companion-data getReply()', () => {
  test('always returns a non-empty string for every character', () => {
    const messages = ['', '   ', 'hello', 'what is your name?', 'thanks a lot!']

    for (const character of CHARACTER_ORDER) {
      for (const message of messages) {
        const reply = getReply(character, message)
        expect(typeof reply, `reply type for ${character}`).toBe('string')
        expect(reply.trim().length, `reply for ${character} / "${message}"`).toBeGreaterThan(0)
      }
    }
  })

  test('falls back to a known character for unknown ids', () => {
    const reply = getReply('nobody' as never, 'hello')
    expect(typeof reply).toBe('string')
    expect(reply.trim().length).toBeGreaterThan(0)
  })

  test('CHARACTER_ORDER and CHARACTERS stay in sync', () => {
    expect(CHARACTER_ORDER.length).toBeGreaterThan(0)
    for (const id of CHARACTER_ORDER) {
      const character = CHARACTERS[id]
      expect(character, `CHARACTERS[${id}]`).toBeTruthy()
      expect(character.name.trim().length, `name of ${id}`).toBeGreaterThan(0)
    }
  })
})
