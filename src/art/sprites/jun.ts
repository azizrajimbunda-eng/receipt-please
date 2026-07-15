// Jun Ramos — the player character, junior auditor. Short hair, white barong-ish
// shirt, blue tie. Poses: neutral, determined (for shouts), sweating.

import { P } from '../palette'
import type { PixelSprite } from '../sprite'
import { compose } from '../sprite'

const base = [
  '........................',
  '........kkkkkk..........',
  '......kkhhhhhhkk........',
  '.....khhhhhhhhhhk.......',
  '.....khhhHhhhhhhk.......',
  '.....khhhhhhhhhhk.......',
  '.....khssssssssshk......',
  '.....kssssssssssshk.....',
  '.....ksssssssssssk......',
  '.....ksssssssssssk......',
  '.....ksepesssepesk......',
  '.....ksssssssssssk......',
  '.....kssssssSSsssk......',
  '.....ksssssssssssk......',
  '.....kssssmmmmssssk.....',
  '......kssssssssssk......',
  '.......kssssssssk.......',
  '.........kssssk.........',
  '........kwwwwwwk........',
  '......kkwwwwwwwwkk......',
  '....kkwwwwwddwwwwwwkk...',
  '...kwwwwwwwddwwwwwwwwk..',
  '..kwwwwwwwwddwwwwwwwwwk.',
  '..kwWwwwwwwddwwwwwwwWwk.',
  '..kwWwwwwwwddwwwwwwwWwk.',
  '..kwWwwwwwwddwwwwwwwWwk.',
  '..kwWwwwwwwddwwwwwwwWwk.',
  '..kwWwwwwwwddwwwwwwwWwk.',
  '..kwWwwwwwwddwwwwwwwWwk.',
  '..kwWwwwwwwddwwwwwwwWwk.',
  '..kwWwwwwwwddwwwwwwwWwk.',
  '..kwWwwwwwwddwwwwwwwWwk.',
]

const MOUTH_OPEN = { x: 10, y: 13, rows: ['mmmm', 'mLLm'] }
const BROWS = { x: 5, y: 9, rows: ['kkk...kkk'] }
const SWEAT = { x: 18, y: 7, rows: ['B', 'B'] }

export const jun: PixelSprite = {
  id: 'jun',
  w: 24,
  h: 32,
  palette: {
    k: P.outline,
    h: P.hairDark,
    H: P.hairShine,
    s: P.skin,
    S: P.skinShade,
    e: P.eyeWhite,
    p: P.pupil,
    m: P.mouth,
    L: P.tongue,
    w: P.white,
    W: P.whiteShade,
    d: P.blue,
    B: P.windowSky,
  },
  frames: {
    neutral: base,
    'neutral-talk': compose(base, MOUTH_OPEN),
    determined: compose(base, BROWS),
    'determined-talk': compose(base, BROWS, MOUTH_OPEN),
    sweating: compose(base, SWEAT),
    'sweating-talk': compose(base, SWEAT, MOUTH_OPEN),
  },
}
