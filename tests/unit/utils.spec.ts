import { test, expect } from '@playwright/test'
import { cn } from '../../lib/utils'

const asSet = (value: string) => new Set(value.split(/\s+/).filter(Boolean))

test.describe('lib/utils cn()', () => {
  test('joins class names in argument order', () => {
    expect(cn('alpha', 'beta')).toBe('alpha beta')
  })

  test('drops falsy values', () => {
    expect(cn('alpha', false, undefined, null, '', 'beta')).toBe('alpha beta')
  })

  test('supports conditional objects', () => {
    expect(cn({ 'text-red-500': true, 'text-blue-500': false }, 'p-2')).toBe(
      'text-red-500 p-2',
    )
  })

  test('deduplicates identical classes', () => {
    expect(cn('p-4', 'p-4')).toBe('p-4')
  })

  test('the last conflicting tailwind utility wins', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
    expect(cn('px-2', 'py-1', 'px-4')).not.toContain('px-2')
    expect(asSet(cn('px-2', 'py-1', 'px-4'))).toEqual(new Set(['py-1', 'px-4']))
  })

  test('keeps non-conflicting utilities together', () => {
    expect(asSet(cn('px-2', 'py-1', 'font-bold'))).toEqual(
      new Set(['px-2', 'py-1', 'font-bold']),
    )
  })
})
