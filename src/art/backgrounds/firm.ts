// Ferrer & Alcaraz, CPAs — the audit firm. Early morning: blinds, desk lamp,
// stacked working-paper files. Also the fallback backdrop when no scene is set
// (the opening briefing plays here before the first moveTo).

import { P } from '../palette'
import type { Grid } from '../render'

export function paintFirm(g: Grid): void {
  // cool dawn wall
  g.rect(0, 0, 60, 42, P.blueShade)
  g.rect(0, 0, 60, 5, P.outline)
  g.dither(0, 5, 60, 3, P.blue)
  g.dither(0, 38, 60, 3, P.outline)

  // window with blinds — morning light
  g.rect(33, 7, 22, 20, P.outline)
  g.rect(34, 8, 20, 18, P.windowSkyDeep)
  for (let y = 9; y < 26; y += 3) {
    g.rect(34, y, 20, 1, P.steelShade) // blind slats
    g.dither(34, y + 1, 20, 1, P.windowSky)
  }

  // whiteboard (left)
  g.rect(4, 9, 22, 15, P.outline)
  g.rect(5, 10, 20, 13, P.white)
  g.rect(7, 13, 12, 1, P.blue)
  g.rect(7, 16, 15, 1, P.grayShade)
  g.rect(7, 19, 9, 1, P.grayShade)
  g.rect(20, 12, 4, 4, P.red) // circled number

  // desk
  g.rect(0, 42, 60, 18, P.outline)
  g.rect(0, 43, 60, 4, P.counter)
  g.dither(0, 46, 60, 2, P.counterShade)
  g.rect(0, 48, 60, 12, P.counterShade)

  // stacked working-paper files
  g.rect(4, 33, 12, 10, P.outline)
  g.rect(5, 34, 10, 8, P.gold)
  g.rect(5, 36, 10, 1, P.orangeShade)
  g.rect(6, 30, 12, 4, P.outline)
  g.rect(7, 31, 10, 2, P.white)

  // desk lamp
  g.rect(48, 30, 2, 13, P.grayShade)
  g.rect(44, 27, 10, 4, P.outline)
  g.rect(45, 28, 8, 2, P.gold)
  g.dither(43, 31, 12, 6, P.gold) // pool of light
}
