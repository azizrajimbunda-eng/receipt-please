// Marco Z. Reyes, MBA — the consultant. Slicked-back hair, sharp navy suit,
// red power tie. Confident by default; the sweat comes when the SEC doc lands.

import { P } from '../palette'
import type { PixelSprite } from '../sprite'
import { compose } from '../sprite'

const base = [
  '........................',
  '.........kkkkkk.........',
  '.......kkHHHHHHkk.......',
  '......kHHHHHHHHHHk......',
  '......kHHhhhhhhHHk......',
  '......khhhhhhhhhhk......',
  '.....khhsssssssshhk.....',
  '.....khsssssssssshk.....',
  '.....kssssssssssssk.....',
  '.....ksepesssepessk.....',
  '.....kssssssssssssk.....',
  '.....kssssssSSsssssk....',
  '.....kssssssssssssk.....',
  '.....kssssmmmmssssk.....',
  '......kssssssssssk......',
  '.......kssssssssk.......',
  '........kkttkkk.........',
  '.......kddtrtddk........',
  '......kddddtrtdddk......',
  '.....kddddktrtkdddk.....',
  '....kdddddktrtkddddk....',
  '...kddddddktrtkdddddk...',
  '..kdddddddktrtkddddddk..',
  '..kdDddddddtrtdddddDdk..',
  '..kdDdddddddrddddddDdk..',
  '..kdDddddddddddddddDdk..',
  '..kdDddddddddddddddDdk..',
  '..kdDddddddddddddddDdk..',
  '..kdDddddddddddddddDdk..',
  '..kdDddddddddddddddDdk..',
  '..kdDddddddddddddddDdk..',
  '..kdDddddddddddddddDdk..',
]

const MOUTH_OPEN = { x: 10, y: 12, rows: ['mmmm', 'mLLm'] }
const SWEAT = { x: 18, y: 6, rows: ['B', 'B'] }
const WIDE_EYES = { x: 6, y: 9, rows: ['seepssseepss'] }

export const marco: PixelSprite = {
  id: 'marco',
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
    t: P.white, // shirt collar
    r: P.red, // power tie
    d: P.blue, // navy suit
    D: P.blueShade,
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
