// Jopay — intern. Side ponytail, orange polo, blue ID lanyard.
// Base grid 24×32, rendered ×4.

import { P } from '../palette'
import type { PixelSprite } from '../sprite'
import { compose } from '../sprite'

const base = [
  '........................',
  '.........kkkkk..........',
  '.......kkhhhhhkk........',
  '......khhhhhhhhhk.......',
  '.....khhhhhhhhhhhk......',
  '....khhHhhhhhhhhhhk.....',
  '....khhhhhhhhhhhhhkk....',
  '....khhssssssssshhkhk...',
  '....khssssssssssshkhhk..',
  '....kssssssssssssskhhk..',
  '....kssepesssepesskhhk..',
  '....kssssssssssssskhhk..',
  '....kssssssSSssssskhhk..',
  '....kssssssssssssskkkk..',
  '....kssssmmmmsssssk.....',
  '.....ksssssssssssk......',
  '.......kssssssssk.......',
  '.........kssssk.........',
  '........kcwwwwck........',
  '......kccwwwwwwcck......',
  '....kccccwwwwwwcccck....',
  '...kccccccwwwwcccccck...',
  '..kccccccccwwcccccccck..',
  '..kcCccccccddccccccCck..',
  '..kcCccccccddccccccCck..',
  '..kcCccccccddccccccCck..',
  '..kcCccccccddccccccCck..',
  '..kcCcccccwwwwcccccCck..',
  '..kcCcccccwwwwcccccCck..',
  '..kcCcccccwwwwcccccCck..',
  '..kcCccccccccccccccCck..',
  '..kcCccccccccccccccCck..',
]

const MOUTH_OPEN = { x: 9, y: 13, rows: ['mmmm', 'mLLm'] }
const WIDE_EYES = { x: 5, y: 10, rows: ['seeepesseeepes'] }

export const jopay: PixelSprite = {
  id: 'jopay',
  w: 24,
  h: 32,
  palette: {
    k: P.outline,
    h: P.hairBrown,
    H: P.hairBrownShine,
    s: P.skin,
    S: P.skinShade,
    e: P.eyeWhite,
    p: P.pupil,
    m: P.mouth,
    L: P.tongue,
    w: P.white,
    c: P.orange,
    C: P.orangeShade,
    d: P.blue,
  },
  frames: {
    neutral: base,
    'neutral-talk': compose(base, MOUTH_OPEN),
    shocked: compose(base, WIDE_EYES, MOUTH_OPEN),
    'shocked-talk': compose(base, WIDE_EYES, MOUTH_OPEN),
  },
}
