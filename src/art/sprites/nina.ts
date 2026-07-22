// Nina — Aling Rosa's daughter, operations manager. Practical ponytail, teal
// polo, reading glasses pushed up. The one who smelled something wrong first
// and called the auditors. Calm, sharp, protective of her mother.

import { P } from '../palette'
import type { PixelSprite } from '../sprite'
import { compose } from '../sprite'

const base = [
  '........................',
  '........kkkkkkk.........',
  '......kkhhhhhhhkk.......',
  '.....khhhhhhhhhhhk......',
  '.....khhhhhhhhhhhkk.....',
  '.....khhHhhhhhhhhkhk....',
  '.....khhhhhhhhhhhkhhk...',
  '.....khhsssssssshkhhk...',
  '.....khsssssssssshkhk...',
  '....khhsssssssssshkkk...',
  '....khsseepsseepsshk....',
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

export const nina: PixelSprite = {
  id: 'nina',
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
    c: P.teal,
    C: P.tealShade,
  },
  frames: {
    neutral: base,
    'neutral-talk': compose(base, MOUTH_OPEN),
  },
}
