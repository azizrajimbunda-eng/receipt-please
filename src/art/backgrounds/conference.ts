// Conference room — the "courtroom". Long table, PH flag, firm seal on the
// wall. Where the exit conference happens.

import { P } from '../palette'
import type { Grid } from '../render'

export function paintConference(g: Grid): void {
  // wood-panelled walls
  g.rect(0, 0, 60, 42, P.counterShade)
  g.rect(0, 0, 60, 4, P.outline)
  for (let x = 0; x < 60; x += 7) {
    g.rect(x, 4, 1, 38, P.floorShade) // panel seams
  }
  g.dither(0, 38, 60, 3, P.floorShade)

  // firm seal (center, behind the partner)
  g.rect(24, 8, 13, 13, P.outline)
  g.rect(25, 9, 11, 11, P.wallLight)
  g.rect(28, 12, 5, 5, P.gold)
  g.rect(29, 13, 3, 3, P.counterShade)

  // PH flag (left)
  g.rect(6, 8, 12, 9, P.outline)
  g.rect(7, 9, 11, 3, P.blue)
  g.rect(7, 12, 11, 4, P.red)
  g.rect(7, 9, 4, 7, P.white)
  g.rect(8, 11, 1, 1, P.gold)

  // certificates (right)
  g.rect(44, 9, 9, 7, P.outline)
  g.rect(45, 10, 7, 5, P.white)
  g.dither(45, 11, 7, 3, P.grayShade)
  g.rect(44, 19, 9, 7, P.outline)
  g.rect(45, 20, 7, 5, P.white)
  g.dither(45, 21, 7, 3, P.grayShade)

  // long table
  g.rect(0, 42, 60, 18, P.outline)
  g.rect(0, 43, 60, 4, P.counter)
  g.dither(0, 46, 60, 2, P.counterShade)
  g.rect(0, 48, 60, 12, P.counterShade)

  // water glass + folder on the table
  g.rect(8, 39, 4, 5, P.outline)
  g.rect(9, 40, 2, 3, P.windowSky)
  g.rect(46, 40, 9, 4, P.outline)
  g.rect(47, 41, 7, 2, P.white)
}
