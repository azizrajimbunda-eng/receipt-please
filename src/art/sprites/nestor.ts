// Sir Nestor Ramirez — payroll officer. Gray-streaked combed hair, rectangular
// glasses, crisp white polo, the blue-black fountain pen in the chest pocket.
// Twenty-five years of tidy paper.

import { P } from '../palette'
import type { PixelSprite } from '../sprite'
import { compose } from '../sprite'

const base = [
  '........................',
  '.........kkkkkk.........',
  '.......kkhhhhhhkk.......',
  '......khhGhhhhGhhk......',
  '.....khhhhhhhhhhhhk.....',
  '.....khGhhhhhhhhGhk.....',
  '.....khhhhhhhhhhhhk.....',
  '.....khhsssssssshhk.....',
  '.....khsssssssssshk.....',
  '.....kssssssssssssk.....',
  '.....ksggggssggggsk.....',
  '.....ksgpegssgpegsk.....',
  '.....ksssssSSsssssk.....',
  '.....kssssssssssssk.....',
  '.....kssssmmmmssssk.....',
  '......kssssssssssk......',
  '.......kssssssssk.......',
  '.........kssssk.........',
  '........kwwwwwwk........',
  '......kwwwwwwwwwwk......',
  '....kwwwwwwwwwwwwwwk....',
  '...kwwwwdwwwwwwwwwwwk...',
  '..kwwwwwdwwwwwwwwwwwwk..',
  '..kwWwwwdwwwwwwwwwwWwk..',
  '..kwWwwwwwwwwwwwwwwWwk..',
  '..kwWwwwwwwwwwwwwwwWwk..',
  '..kwWwwwwwwwwwwwwwwWwk..',
  '..kwWwwwwwwwwwwwwwwWwk..',
  '..kwWwwwwwwwwwwwwwwWwk..',
  '..kwWwwwwwwwwwwwwwwWwk..',
  '..kwWwwwwwwwwwwwwwwWwk..',
  '..kwWwwwwwwwwwwwwwwWwk..',
]

const MOUTH_OPEN = { x: 10, y: 13, rows: ['mmmm', 'mLLm'] }
const SWEAT = { x: 19, y: 6, rows: ['B', 'B'] }
const WIDE_EYES = { x: 6, y: 11, rows: ['sgeegssgeegs'] }

export const nestor: PixelSprite = {
  id: 'nestor',
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
    g: P.grayShade,
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
    nervous: compose(base, SWEAT),
    'nervous-talk': compose(base, SWEAT, MOUTH_OPEN),
    shocked: compose(base, WIDE_EYES, SWEAT, MOUTH_OPEN),
    'shocked-talk': compose(base, WIDE_EYES, SWEAT, MOUTH_OPEN),
  },
}
