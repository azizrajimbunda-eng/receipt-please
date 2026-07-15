import type { Grid } from '../render'
import { paintPantry } from './pantry'

/** backgroundId (from Scene.backgroundId) → painter on the 60×60 grid. */
export const backgrounds: Record<string, (g: Grid) => void> = {
  'bg-pantry': paintPantry,
}
