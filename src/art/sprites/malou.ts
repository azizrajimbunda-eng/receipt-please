// Malou Salcedo — petty cash custodian, the suspect. Middle-aged, short
// permed hair with gray, teal blouse. Poses: composed → nervous → shocked.

import { P } from '../palette'
import type { PixelSprite } from '../sprite'
import { compose } from '../sprite'

const base = [
  '........................',
  '.......kkkkkkkk.........',
  '.....kkhhhGhhhhkk.......',
  '....khhhhhhhhGhhhk......',
  '....khGhhhhhhhhhhk......',
  '....khhhhhhhhhhhhk......',
  '....khhssssssssshhk.....',
  '....khssssssssssshk.....',
  '....ksssssssssssssk.....',
  '....ksssssssssssssk.....',
  '....kssepesssepessk.....',
  '....ksssssssssssssk.....',
  '....kssssssSSsssssk.....',
  '....ksssssssssssssk.....',
  '....kssssmmmmsssssk.....',
  '.....kssssssssssssk.....',
  '......kssssssssssk......',
  '........kssssssk........',
  '.......kcwwwwwwck.......',
  '.....kkccwwwwwwcckk.....',
  '...kkccccwwwwwwccccck...',
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
  '..kcCccccccwwccccccCck..',
]

const MOUTH_OPEN = { x: 9, y: 13, rows: ['mmmm', 'mLLm'] }
// nervous: sweat bead by the temple + a worried squint
const SWEAT = { x: 18, y: 8, rows: ['B', 'B'] }
const SQUINT = { x: 4, y: 10, rows: ['kssspksssspsssk'] }
// shocked: blown-out eyes + open mouth
const WIDE = { x: 4, y: 10, rows: ['kseeepesseeepesk'] }

export const malou: PixelSprite = {
  id: 'malou',
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
    c: P.teal,
    C: P.tealShade,
    B: P.windowSky,
  },
  frames: {
    neutral: base,
    'neutral-talk': compose(base, MOUTH_OPEN),
    nervous: compose(base, SQUINT, SWEAT),
    'nervous-talk': compose(base, SQUINT, SWEAT, MOUTH_OPEN),
    shocked: compose(base, WIDE, SWEAT, MOUTH_OPEN),
    'shocked-talk': compose(base, WIDE, SWEAT, MOUTH_OPEN),
  },
}
