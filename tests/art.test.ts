// Structural validation of every registered sprite — wrong row lengths and
// unknown palette chars are the typo class the string-grid format invites.

import { describe, expect, it } from 'vitest'
import { sprites } from '../src/art/sprites'
import { validateSprite } from '../src/art/sprite'

describe('sprite grids', () => {
  for (const [id, sprite] of Object.entries(sprites)) {
    it(`${id}: all frames are ${sprite.w}×${sprite.h} with known palette chars`, () => {
      expect(validateSprite(sprite)).toEqual([])
    })
  }
})
