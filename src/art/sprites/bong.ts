// Kuya Bong — the neighboring storekeeper. Sando, towel on shoulder, mustache.
// One pose: he's a one-scene witness.

import { P } from '../palette'
import type { PixelSprite } from '../sprite'
import { compose } from '../sprite'

const base = [
  '........................',
  '........kkkkkk..........',
  '......kkhhhhhhkk........',
  '.....khhhhhhhhhhk.......',
  '.....khhhhhhhhhhk.......',
  '.....khssssssssshk......',
  '.....kssssssssssshk.....',
  '.....ksssssssssssk......',
  '.....ksssssssssssk......',
  '.....ksepesssepesk......',
  '.....ksssssssssssk......',
  '.....kssssssSSsssk......',
  '.....kssskkkkksssk......',
  '.....ksssssssssssk......',
  '.....kssssmmmmssssk.....',
  '......kssssssssssk......',
  '.......kssssssssk.......',
  '.......kkssssssKk.......',
  '......kwwsssssswwk......',
  '.....kwwwsssssswwwk.....',
  '....kwwwwssssssswwwwk...',
  '...ksswwwsssssswwwsssk..',
  '..ksssswwsssssswwsssssk.',
  '..ksssswwsssssswwsssssk.',
  '..kssssswssssssswssssssk',
  '..kssssswssssssswssssssk',
  '..kssssswssssssswssssssk',
  '..kssssswssssssswssssssk',
  '..kssssswssssssswssssssk',
  '..kssssswssssssswssssssk',
  '..kssssswssssssswssssssk',
  '..kssssswssssssswssssssk',
]

const MOUTH_OPEN = { x: 10, y: 13, rows: ['mmmm', 'mLLm'] }

export const bong: PixelSprite = {
  id: 'bong',
  w: 24,
  h: 32,
  palette: {
    k: P.outline,
    K: P.outline,
    h: P.hairDark,
    s: P.skin,
    S: P.skinShade,
    e: P.eyeWhite,
    p: P.pupil,
    m: P.mouth,
    L: P.tongue,
    w: P.white, // sando
  },
  frames: {
    neutral: base,
    'neutral-talk': compose(base, MOUTH_OPEN),
  },
}
