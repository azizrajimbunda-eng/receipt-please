// Aling Baby — sari-sari store owner. Gray-streaked bun, duster + white apron.
// The most reliable witness in the barangay. WALANG RESIBO, WALANG USAPAN.

import { P } from '../palette'
import type { PixelSprite } from '../sprite'
import { compose } from '../sprite'

const base = [
  '........................',
  '..........kkkk..........',
  '.........kGhhGk.........',
  '........khhGhhhk........',
  '......kkhhhhhhhhkk......',
  '.....khGhhhhhhhhGhk.....',
  '.....khhhhhhhhhhhhk.....',
  '.....khhsssssssshhk.....',
  '.....khsssssssssshk.....',
  '.....kssssssssssssk.....',
  '.....kssepssssepssk.....',
  '.....kssssssssssssk.....',
  '.....ksssssSSsssssk.....',
  '.....ksSssssssssSsk.....',
  '.....kssssmmmmssssk.....',
  '......kssssssssssk......',
  '.......kssssssssk.......',
  '.........kssssk.........',
  '........kcwwwwck........',
  '......kccwwwwwwcck......',
  '....kccccwwwwwwcccck....',
  '...kccccccwwwwcccccck...',
  '..kccccccccwwcccccccck..',
  '..kcCccccwwwwwwccccCck..',
  '..kcCccccwwwwwwccccCck..',
  '..kcCccccwwwwwwccccCck..',
  '..kcCccccwwwwwwccccCck..',
  '..kcCccccwwwwwwccccCck..',
  '..kcCccccwwwwwwccccCck..',
  '..kcCccccwwwwwwccccCck..',
  '..kcCccccwwwwwwccccCck..',
  '..kcCccccwwwwwwccccCck..',
]

const MOUTH_OPEN = { x: 10, y: 13, rows: ['mmmm', 'mLLm'] }
const BROW_L = { x: 8, y: 9, rows: ['kk'] }
const BROW_R = { x: 14, y: 9, rows: ['kk'] }

export const baby: PixelSprite = {
  id: 'baby',
  w: 24,
  h: 32,
  palette: {
    k: P.outline,
    h: P.hairDark,
    G: P.gray,
    s: P.skin,
    S: P.skinShade,
    e: P.eyeWhite,
    p: P.pupil,
    m: P.mouth,
    L: P.tongue,
    w: P.white,
    c: P.orange,
    C: P.orangeShade,
  },
  frames: {
    neutral: base,
    'neutral-talk': compose(base, MOUTH_OPEN),
    annoyed: compose(base, BROW_L, BROW_R),
    'annoyed-talk': compose(base, BROW_L, BROW_R, MOUTH_OPEN),
  },
}
