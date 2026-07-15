import type { PixelSprite } from '../sprite'
import { cess } from './cess'
import { jopay } from './jopay'

/** spriteId (from Speaker.spriteId) → sprite. Missing ids fall back to a
 * programmer-art placeholder in the Stage. */
export const sprites: Record<string, PixelSprite> = {
  cess,
  jopay,
}
