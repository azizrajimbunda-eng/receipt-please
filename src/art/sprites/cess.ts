// Ate Cess — senior auditor. Hair bun, glasses, purple blazer over white blouse.
// Base grid 24×32, rendered ×4. Poses are patches (see sprite.ts).

import { P } from '../palette'
import type { PixelSprite } from '../sprite'
import { compose } from '../sprite'

const base = [
  '........................',
  '..........kkkk..........',
  '.........khhhhk.........',
  '........khhhhhhk........',
  '......kkhhhhhhhhkk......',
  '.....khhhHhhhhhhhhk.....',
  '.....khhhhhhhhhhhhk.....',
  '.....khhsssssssshhk.....',
  '.....khsssssssssshk.....',
  '.....kssssssssssssk.....',
  '.....kssssssssssssk.....',
  '.....ksgeepssgeepsk.....',
  '.....ksssssSSsssssk.....',
  '.....kssssssssssssk.....',
  '.....kssssmmmmssssk.....',
  '......kssssssssssk......',
  '.......kssssssssk.......',
  '.........kssssk.........',
  '........kcwwwwck........',
  '......kccwwwwwwcck......',
  '....kccccwwwwwwcccck....',
  '...kccccccwwwwcccccck...',
  '..kccccccccwwcccccccck..',
  '..kcCccccccwwccccccCck..',
  '..kcCccccccwwccccccCck..',
  '..kcCccccccwwccccccCck..',
  '..kcCccccccwwccccccCck..',
  '..kcCccccccwwccccccCck..',
  '..kcCccccccwwccccccCck..',
  '..kcCccccccwwccccccCck..',
  '..kcCccccccwwccccccCck..',
  '..kcCccccccwwccccccCck..',
]

const MOUTH_OPEN = { x: 10, y: 13, rows: ['mmmm', 'mLLm'] }
const BROWS = { x: 6, y: 10, rows: ['kkk..kkk'] }

export const cess: PixelSprite = {
  id: 'cess',
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
    g: P.grayShade,
    m: P.mouth,
    L: P.tongue,
    w: P.white,
    c: P.purple,
    C: P.purpleShade,
  },
  frames: {
    neutral: base,
    'neutral-talk': compose(base, MOUTH_OPEN),
    stern: compose(base, BROWS),
    'stern-talk': compose(base, BROWS, MOUTH_OPEN),
  },
}
