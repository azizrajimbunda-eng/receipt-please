// Weng — timekeeper, the youngest person on site and the bravest. Short bob,
// gold company polo. Keeps her own logbook. Wrote the letter.

import { P } from '../palette'
import type { PixelSprite } from '../sprite'
import { compose } from '../sprite'

const base = [
  '........................',
  '........kkkkkkkk........',
  '......kkhhhhhhhhkk......',
  '.....khhhhhhhhhhhhk.....',
  '.....khhhhhhhhhhhhk.....',
  '.....khhHhhhhhhHhhk.....',
  '.....khhhhhhhhhhhhk.....',
  '.....khhsssssssshhk.....',
  '.....khsssssssssshk.....',
  '....khhsssssssssshhk....',
  '....khsseepsseepshk.....',
  '....khsssssssssssshk....',
  '....khsssssSSssssshk....',
  '.....khhsssssssshhk.....',
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
const SWEAT = { x: 19, y: 6, rows: ['B', 'B'] }

export const weng: PixelSprite = {
  id: 'weng',
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
    c: P.gold,
    C: P.orangeShade,
    B: P.windowSky,
  },
  frames: {
    neutral: base,
    'neutral-talk': compose(base, MOUTH_OPEN),
    nervous: compose(base, SWEAT),
    'nervous-talk': compose(base, SWEAT, MOUTH_OPEN),
  },
}
