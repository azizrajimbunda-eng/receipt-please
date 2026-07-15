// Sampaloc street — the shuttered R&M Merchandise: rolling door down, rusty
// padlock, barangay CLOSED notice. The scene that kills the June 12 purchase.

import { P } from '../palette'
import type { Grid } from '../render'

export function paintStreet(g: Grid): void {
  // sky strip above the storefront
  g.rect(0, 0, 60, 8, P.windowSky)
  g.dither(0, 6, 60, 3, P.windowSkyDeep)

  // building face
  g.rect(0, 8, 60, 44, P.wallShade)
  g.rect(0, 8, 60, 2, P.outline)

  // signage board — faded
  g.rect(6, 11, 48, 9, P.outline)
  g.rect(7, 12, 46, 7, P.counterShade)
  g.dither(7, 12, 46, 7, P.wallShade) // dust/fade over the sign
  g.rect(12, 14, 3, 3, P.gold)
  g.rect(17, 14, 2, 3, P.gold)
  g.rect(21, 14, 3, 3, P.gold)
  g.rect(27, 14, 3, 3, P.gold)
  g.rect(32, 14, 2, 3, P.gold)
  g.rect(36, 14, 3, 3, P.gold)
  g.rect(41, 14, 3, 3, P.gold)

  // rolling door — corrugated, DOWN
  g.rect(8, 21, 44, 27, P.outline)
  g.rect(9, 22, 42, 25, P.steel)
  for (let y = 23; y < 47; y += 2) {
    g.rect(9, y, 42, 1, P.steelShade)
  }

  // padlock + hasp, center bottom
  g.rect(28, 43, 5, 4, P.outline)
  g.rect(29, 44, 3, 2, P.orangeShade) // rust
  g.rect(30, 41, 1, 3, P.grayShade)

  // barangay CLOSED notice, taped crooked
  g.rect(34, 26, 13, 10, P.outline)
  g.rect(35, 27, 11, 8, P.white)
  g.rect(36, 29, 9, 1, P.red)
  g.rect(36, 31, 9, 1, P.grayShade)
  g.rect(36, 33, 6, 1, P.grayShade)

  // sidewalk
  g.rect(0, 48, 60, 12, P.gray)
  g.dither(0, 48, 60, 2, P.wallShade)
  g.rect(0, 56, 60, 4, P.grayShade)
  g.rect(20, 48, 1, 12, P.grayShade) // pavement seams
  g.rect(44, 48, 1, 12, P.grayShade)
}
