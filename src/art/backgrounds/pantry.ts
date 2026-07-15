// Office pantry — procedural painter on a 60×60 logical grid (×4 → 240).

import { P } from '../palette'
import type { Grid } from '../render'

export function paintPantry(g: Grid): void {
  // walls
  g.rect(0, 0, 60, 38, P.wall)
  g.rect(0, 0, 60, 5, P.wallLight)
  g.dither(0, 5, 60, 2, P.wallLight)
  g.dither(0, 34, 60, 2, P.wallShade)
  g.rect(0, 36, 60, 2, P.wallShade)

  // floor
  g.rect(0, 38, 60, 22, P.floor)
  g.dither(0, 38, 60, 2, P.wallShade)
  g.rect(0, 56, 60, 4, P.floorShade)
  g.dither(0, 54, 60, 2, P.floorShade)

  // window (right)
  g.rect(38, 6, 16, 12, P.outline)
  g.rect(39, 7, 14, 10, P.windowSky)
  g.dither(39, 13, 14, 4, P.windowSkyDeep)
  g.rect(45, 7, 1, 10, P.outline)
  g.rect(39, 11, 14, 1, P.outline)

  // fridge (left)
  g.rect(3, 12, 11, 30, P.outline)
  g.rect(4, 13, 9, 28, P.steel)
  g.rect(4, 13, 2, 28, P.steelShade)
  g.rect(11, 16, 1, 5, P.outline) // handle
  g.rect(4, 24, 9, 1, P.steelShade) // door split

  // shelf with snacks (center)
  g.rect(17, 8, 16, 1, P.counterShade)
  g.rect(18, 5, 2, 3, P.red)
  g.rect(21, 4, 3, 4, P.teal)
  g.rect(25, 6, 2, 2, P.gold)
  g.rect(28, 4, 3, 4, P.orange)

  // counter with the meryenda fund box
  g.rect(16, 28, 28, 14, P.outline)
  g.rect(17, 29, 26, 3, P.counter)
  g.dither(17, 31, 26, 1, P.counterShade)
  g.rect(17, 32, 26, 9, P.counterShade)
  g.rect(20, 34, 3, 4, P.outline) // cabinet knob panel
  g.rect(36, 34, 3, 4, P.outline)

  // the kaha (cash box) on the counter
  g.rect(24, 23, 9, 6, P.outline)
  g.rect(25, 24, 7, 4, P.grayShade)
  g.rect(28, 25, 1, 1, P.gold) // latch

  // mug
  g.rect(37, 25, 3, 4, P.teal)
  g.rect(40, 26, 1, 2, P.tealShade)

  // wall clock
  g.rect(8, 3, 6, 6, P.outline)
  g.rect(9, 4, 4, 4, P.white)
  g.rect(11, 5, 1, 2, P.outline)
}
