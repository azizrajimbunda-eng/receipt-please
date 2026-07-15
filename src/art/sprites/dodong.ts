// Dodong Bautista — messenger. Young, cap, red company polo. Earnest.

import { P } from '../palette'
import type { PixelSprite } from '../sprite'
import { compose } from '../sprite'

const base = [
  '........................',
  '......kkkkkkkkkk........',
  '.....kccccccccccck......',
  '....kccccccccccccck.....',
  '....kkkkkkkkkkkkkkkkk...',
  '.....khhhhhhhhhhhk......',
  '.....khssssssssshk......',
  '.....ksssssssssssk......',
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
  '........kcwwwwck........',
  '......kkccwwwwcckk......',
  '....kkccccwwwwccccckk...',
  '...kccccccwwwwcccccck...',
  '..kcccccccwwwwccccccck..',
  '..kcCcccccwwwwcccccCck..',
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
const WIDE = { x: 5, y: 10, rows: ['keeepesskeeepesk'] }

export const dodong: PixelSprite = {
  id: 'dodong',
  w: 24,
  h: 32,
  palette: {
    k: P.outline,
    h: P.hairDark,
    s: P.skin,
    S: P.skinShade,
    e: P.eyeWhite,
    p: P.pupil,
    m: P.mouth,
    L: P.tongue,
    w: P.white,
    c: P.red,
    C: P.orangeShade,
  },
  frames: {
    neutral: base,
    'neutral-talk': compose(base, MOUTH_OPEN),
    confused: compose(base, WIDE),
    'confused-talk': compose(base, WIDE, MOUTH_OPEN),
  },
}
