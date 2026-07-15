// Cabrera Trading accounting office — filing cabinets, the kaha on the desk,
// a wall calendar. Procedural painter on the 60×60 logical grid.

import { P } from '../palette'
import type { Grid } from '../render'

export function paintOffice(g: Grid): void {
  g.rect(0, 0, 60, 40, P.wall)
  g.rect(0, 0, 60, 6, P.wallLight)
  g.dither(0, 6, 60, 2, P.wallLight)
  g.dither(0, 36, 60, 2, P.wallShade)
  g.rect(0, 38, 60, 2, P.wallShade)

  // floor
  g.rect(0, 40, 60, 20, P.floor)
  g.rect(0, 57, 60, 3, P.floorShade)
  g.dither(0, 55, 60, 2, P.floorShade)

  // filing cabinets (left)
  g.rect(2, 14, 13, 28, P.outline)
  g.rect(3, 15, 11, 26, P.steel)
  g.rect(3, 15, 2, 26, P.steelShade)
  for (const y of [18, 26, 34]) {
    g.rect(4, y, 9, 1, P.steelShade)
    g.rect(7, y + 3, 3, 1, P.outline) // handle
  }

  // wall calendar
  g.rect(20, 4, 9, 8, P.outline)
  g.rect(21, 5, 7, 6, P.white)
  g.rect(21, 5, 7, 2, P.red)
  g.dither(21, 8, 7, 3, P.grayShade)

  // window (right)
  g.rect(42, 5, 15, 13, P.outline)
  g.rect(43, 6, 13, 11, P.windowSky)
  g.dither(43, 12, 13, 5, P.windowSkyDeep)
  g.rect(49, 6, 1, 11, P.outline)
  g.rect(43, 11, 13, 1, P.outline)

  // desk
  g.rect(14, 30, 34, 12, P.outline)
  g.rect(15, 31, 32, 3, P.counter)
  g.dither(15, 33, 32, 1, P.counterShade)
  g.rect(15, 34, 32, 7, P.counterShade)
  g.rect(19, 36, 4, 4, P.outline) // drawer
  g.rect(38, 36, 4, 4, P.outline)

  // THE KAHA — the cash box, dead center, the thing this case is about
  g.rect(25, 24, 12, 7, P.outline)
  g.rect(26, 25, 10, 5, P.grayShade)
  g.rect(26, 25, 10, 1, P.gray)
  g.rect(30, 26, 2, 2, P.gold) // latch
  g.rect(28, 23, 6, 1, P.outline) // lid lip

  // stacked papers + ledger
  g.rect(16, 26, 7, 4, P.white)
  g.dither(16, 28, 7, 2, P.whiteShade)
  g.rect(40, 25, 6, 5, P.teal)
  g.rect(40, 25, 6, 1, P.tealShade)
}
