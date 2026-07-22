// Aling Rosa — the baker, 40 years in. Silver hair in a neat bun, warm face,
// floral duster under a flour-dusted apron. Not a villain: a grandmother
// holding onto a promise.

import { P } from '../palette'
import type { PixelSprite } from '../sprite'
import { compose } from '../sprite'

const base = [
  '........................',
  '..........kkkk..........',
  '.........kGGGGk.........',
  '........kGGGGGGk........',
  '......kkGGGGGGGGkk......',
  '.....kGGGGGGGGGGGGk.....',
  '.....kGGGGGGGGGGGGk.....',
  '.....kGGsssssssGGGk.....',
  '.....kGsssssssssGk......',
  '.....kssssssssssssk.....',
  '.....kssepssssepssk.....',
  '.....kssssssssssssk.....',
  '.....ksSssssssssSsk.....',
  '.....kssssmmmmmsssk.....',
  '......ksssssssssssk.....',
  '.......kssssssssk.......',
  '.........kssssk.........',
  '........kaaaaaak........',
  '......kaawwwwwwaak......',
  '....kaaawwwwwwwwaaak....',
  '...kaawwwwffffwwwwaak...',
  '..kaawwwwffFFffwwwwaak..',
  '..kawwwwwffFFffwwwwwak..',
  '..kaWwwwwwffffwwwwwWak..',
  '..kaWwwwwwwwwwwwwwwWak..',
  '..kaWwwwwwwwwwwwwwwWak..',
  '..kaWwwwwwwwwwwwwwwWak..',
  '..kaWwwwwwwwwwwwwwwWak..',
  '..kaWwwwwwwwwwwwwwwWak..',
  '..kaWwwwwwwwwwwwwwwWak..',
  '..kaWwwwwwwwwwwwwwwWak..',
  '..kaWwwwwwwwwwwwwwwWak..',
]

const MOUTH_OPEN = { x: 10, y: 13, rows: ['mmmmm', 'smLLms'] }
const BROW_L = { x: 8, y: 9, rows: ['GG'] }
const BROW_R = { x: 14, y: 9, rows: ['GG'] }

export const rosa: PixelSprite = {
  id: 'rosa',
  w: 24,
  h: 32,
  palette: {
    k: P.outline,
    G: P.gray, // silver hair
    s: P.skinDeep,
    S: P.skinShade,
    e: P.eyeWhite,
    p: P.pupil,
    m: P.mouth,
    L: P.tongue,
    a: P.red, // floral duster
    w: P.white, // apron
    f: P.orange, // floral print
    F: P.gold,
    W: P.whiteShade,
  },
  frames: {
    neutral: base,
    'neutral-talk': compose(base, MOUTH_OPEN),
    shocked: compose(base, BROW_L, BROW_R, MOUTH_OPEN),
    'shocked-talk': compose(base, BROW_L, BROW_R, MOUTH_OPEN),
  },
}
