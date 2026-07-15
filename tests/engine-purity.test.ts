// The engine must stay headless: no React, no DOM, no browser storage.
// This is the architectural invariant that makes every other test possible.

import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const ENGINE_DIR = fileURLToPath(new URL('../src/engine', import.meta.url))
const FORBIDDEN = ["from 'react'", 'from "react"', 'document.', 'window.', 'localStorage', 'navigator.']

describe('engine purity', () => {
  const files = readdirSync(ENGINE_DIR).filter((f) => f.endsWith('.ts'))

  it('has engine files to check', () => {
    expect(files.length).toBeGreaterThan(0)
  })

  for (const file of files) {
    it(`${file} has no React/DOM/storage dependencies`, () => {
      const src = readFileSync(join(ENGINE_DIR, file), 'utf8')
      for (const token of FORBIDDEN) {
        expect(src.includes(token), `${file} must not contain "${token}"`).toBe(false)
      }
    })
  }
})
