import type { PixelSprite } from '../sprite'
import { alcaraz } from './alcaraz'
import { baby } from './baby'
import { bong } from './bong'
import { cess } from './cess'
import { dodong } from './dodong'
import { igme } from './igme'
import { jopay } from './jopay'
import { jun } from './jun'
import { malou } from './malou'
import { nestor } from './nestor'
import { olivia } from './olivia'
import { ryan } from './ryan'
import { weng } from './weng'

/** spriteId (from Speaker.spriteId) → sprite. Missing ids fall back to a
 * programmer-art placeholder in the Stage. */
export const sprites: Record<string, PixelSprite> = {
  jun,
  cess,
  malou,
  alcaraz,
  dodong,
  bong,
  jopay,
  ryan,
  baby,
  olivia,
  nestor,
  igme,
  weng,
}
