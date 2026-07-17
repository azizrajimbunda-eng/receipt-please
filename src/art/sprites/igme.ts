// Foreman Igme — site foreman, twenty years at Tibay. Gold hard hat, mustache,
// weathered skin, orange safety vest over a teal shirt.

import { P } from '../palette'
import type { PixelSprite } from '../sprite'
import { compose } from '../sprite'

const base = [
  '........................',
  '........kkkkkkk.........',
  '.......kaaaaaaaak.......',
  '......kaaaaaaaaaak......',
  '......kaaaaaaaaaak......',
  '....kAAAAAAAAAAAAAAk....',
  '.....khssssssssshk......',
  '.....kssssssssssshk.....',
  '.....ksssssssssssk......',
  '.....ksssssssssssk......',
  '.....ksepesssepesk......',
  '.....ksssssssssssk......',
  '.....kssssssSSsssk......',
  '.....kssskkkkksssk......',
  '.....kssssmmmmssssk.....',
  '......kssssssssssk......',
  '.......kssssssssk.......',
  '.........kssssk.........',
  '........kvccccvk........',
  '......kvvccccccvvk......',
  '....kvvccccccccccvvk....',
  '...kvvccccccccccccvvk...',
  '..kvvccccccccccccccvvk..',
  '..kvCccccccccccccccCvk..',
  '..kvCccccccccccccccCvk..',
  '..kvCccccccccccccccCvk..',
  '..kvCccccccccccccccCvk..',
  '..kvvvvvvvvvvvvvvvvvvk..',
  '..kvvvvvvvvvvvvvvvvvvk..',
  '..kvCccccccccccccccCvk..',
  '..kvCccccccccccccccCvk..',
  '..kvCccccccccccccccCvk..',
]

const MOUTH_OPEN = { x: 10, y: 14, rows: ['mmmm', 'mLLm'] }
const SWEAT = { x: 19, y: 6, rows: ['B', 'B'] }
const WIDE_EYES = { x: 6, y: 10, rows: ['seepssseeps'] }

export const igme: PixelSprite = {
  id: 'igme',
  w: 24,
  h: 32,
  palette: {
    k: P.outline,
    a: P.gold,
    A: P.orangeShade,
    h: P.hairDark,
    s: P.skinDeep,
    S: P.skinShade,
    e: P.eyeWhite,
    p: P.pupil,
    m: P.mouth,
    L: P.tongue,
    c: P.teal,
    C: P.tealShade,
    v: P.orange,
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
