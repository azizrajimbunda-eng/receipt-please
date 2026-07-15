// Partner Alcaraz — engagement partner, the "judge" of the exit conference.
// Older, balding with gray sides, cream barong. Gravitas.

import { P } from '../palette'
import type { PixelSprite } from '../sprite'
import { compose } from '../sprite'

const base = [
  '........................',
  '........kkkkkk..........',
  '......kkssssssskk.......',
  '.....kGsssssssssGk......',
  '....kGGssssssssssGGk....',
  '....kGGssssssssssGGk....',
  '....kGssssssssssssGk....',
  '.....ksssssssssssk......',
  '.....kkksssssskkkk......',
  '.....ksssssssssssk......',
  '.....ksepesssepesk......',
  '.....ksssssssssssk......',
  '.....kssssssSSsssk......',
  '.....ksssssssssssk......',
  '.....kssssmmmmssssk.....',
  '......kssssssssssk......',
  '.......kGGGGGGGGk.......',
  '.........kssssk.........',
  '........kbbbbbbk........',
  '......kkbbbbbbbbkk......',
  '....kkbbbbbbbbbbbbbkk...',
  '...kbbbbbbbbbbbbbbbbbk..',
  '..kbbbbbbbbbbbbbbbbbbbk.',
  '..kbBbbbbbbbbbbbbbbbBbk.',
  '..kbBbbbbbbbbbbbbbbbBbk.',
  '..kbBbbbbbbbbbbbbbbbBbk.',
  '..kbBbbbbbbbbbbbbbbbBbk.',
  '..kbBbbbbbbbbbbbbbbbBbk.',
  '..kbBbbbbbbbbbbbbbbbBbk.',
  '..kbBbbbbbbbbbbbbbbbBbk.',
  '..kbBbbbbbbbbbbbbbbbBbk.',
  '..kbBbbbbbbbbbbbbbbbBbk.',
]

const MOUTH_OPEN = { x: 10, y: 13, rows: ['mmmm', 'mLLm'] }
const BROWS = { x: 5, y: 9, rows: ['kkkk.kkkk'] }

export const alcaraz: PixelSprite = {
  id: 'alcaraz',
  w: 24,
  h: 32,
  palette: {
    k: P.outline,
    G: P.gray,
    s: P.skin,
    S: P.skinShade,
    e: P.eyeWhite,
    p: P.pupil,
    m: P.mouth,
    L: P.tongue,
    b: P.wallLight, // cream barong
    B: P.wall,
  },
  frames: {
    neutral: base,
    'neutral-talk': compose(base, MOUTH_OPEN),
    stern: compose(base, BROWS),
    'stern-talk': compose(base, BROWS, MOUTH_OPEN),
  },
}
