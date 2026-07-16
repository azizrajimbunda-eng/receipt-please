// Madam Olivia — owner of Mabuhay Beverage. Shoulder-length hair framing the
// face, maroon blazer, gold earrings. Built the name; guards the name.

import { P } from '../palette'
import type { PixelSprite } from '../sprite'
import { compose } from '../sprite'

const base = [
  '........................',
  '........kkkkkkkk........',
  '......kkhhhhhhhhkk......',
  '.....khhhhhhhhhhhhk.....',
  '....khhhhhhhhhhhhhhk....',
  '....khhHhhhhhhhhHhhk....',
  '....khhhhhhhhhhhhhhk....',
  '....khhsssssssssshhk....',
  '....khhsssssssssshhk....',
  '....khsssssssssssshk....',
  '....khsepesssepesshk....',
  '....khsssssssssssshk....',
  '....kgsssssSSsssssgk....',
  '....khsssssssssssshk....',
  '....khsssmmmmsssssshk...',
  '....khhsssssssssshhk....',
  '.....khhsssssssshhk.....',
  '......khhsssssshhk......',
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

const MOUTH_OPEN = { x: 9, y: 13, rows: ['mmmm', 'mLLm'] }
const BROW_L = { x: 7, y: 9, rows: ['kk'] }
const BROW_R = { x: 13, y: 9, rows: ['kk'] }

export const olivia: PixelSprite = {
  id: 'olivia',
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
    g: P.gold,
    w: P.white,
    c: '#9c3a44',
    C: '#7a2c36',
  },
  frames: {
    neutral: base,
    'neutral-talk': compose(base, MOUTH_OPEN),
    stern: compose(base, BROW_L, BROW_R),
    'stern-talk': compose(base, BROW_L, BROW_R, MOUTH_OPEN),
  },
}
