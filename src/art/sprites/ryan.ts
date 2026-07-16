// Ryan Villanueva — collector, Mabuhay Beverage. Company cap + teal polo.
// Smug by default; the sweat bead arrives with the questions.

import { P } from '../palette'
import type { PixelSprite } from '../sprite'
import { compose } from '../sprite'

const base = [
  '........................',
  '.......kkkkkkk..........',
  '......kaaaaaaaak........',
  '.....kaaaaaaaaaak.......',
  '.....kaaaaaaaaaak.......',
  '....kAAAAAAAAAAAAAk.....',
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
const WIDE_EYES = { x: 6, y: 10, rows: ['seepssseeps'] }

export const ryan: PixelSprite = {
  id: 'ryan',
  w: 24,
  h: 32,
  palette: {
    k: P.outline,
    a: P.teal,
    A: P.tealShade,
    h: P.hairDark,
    s: P.skin,
    S: P.skinShade,
    e: P.eyeWhite,
    p: P.pupil,
    m: P.mouth,
    L: P.tongue,
    w: P.white,
    c: P.teal,
    C: P.tealShade,
    B: P.windowSky,
  },
  frames: {
    neutral: base,
    'neutral-talk': compose(base, MOUTH_OPEN),
    nervous: compose(base, SWEAT),
    'nervous-talk': compose(base, SWEAT, MOUTH_OPEN),
    shocked: compose(base, WIDE_EYES, SWEAT, MOUTH_OPEN),
    'shocked-talk': compose(base, WIDE_EYES, SWEAT, MOUTH_OPEN),
  },
}
