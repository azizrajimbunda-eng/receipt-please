import type { Grid } from '../render'
import { paintConference } from './conference'
import { paintOffice } from './office'
import { paintPantry } from './pantry'
import { paintStreet } from './street'

/** backgroundId (from Scene.backgroundId) → painter on the 60×60 grid. */
export const backgrounds: Record<string, (g: Grid) => void> = {
  'bg-office': paintOffice,
  'bg-street': paintStreet,
  'bg-conference': paintConference,
  'bg-pantry': paintPantry,
}
