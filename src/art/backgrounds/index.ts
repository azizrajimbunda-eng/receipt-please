import type { Grid } from '../render'
import { paintConference } from './conference'
import { paintFirm } from './firm'
import { paintOffice } from './office'
import { paintPantry } from './pantry'
import { paintStreet } from './street'

/** backgroundId (from Scene.backgroundId) → painter on the 60×60 grid. */
export const backgrounds: Record<string, (g: Grid) => void> = {
  'bg-firm': paintFirm,
  'bg-office': paintOffice,
  'bg-street': paintStreet,
  'bg-conference': paintConference,
  'bg-pantry': paintPantry,
}

/** Backdrop before the first moveTo — the opening briefing happens at the firm. */
export const DEFAULT_BACKGROUND = 'bg-firm'
