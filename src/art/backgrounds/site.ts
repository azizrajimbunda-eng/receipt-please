// Tibay Builders Site A — unfinished CHB wall with rebar, scaffolding, cement
// bags, hollow blocks, and the bulletin board where the closure memo lives.

import { P } from '../palette'
import type { Grid } from '../render'

export function paintSite(g: Grid): void {
  // sky with clouds
  g.rect(0, 0, 60, 22, P.windowSky)
  g.dither(6, 4, 10, 2, P.white)
  g.rect(8, 3, 6, 2, P.white)
  g.dither(34, 7, 12, 2, P.white)
  g.rect(37, 6, 7, 2, P.white)

  // unfinished CHB wall (left) with mortar lines + rebar
  g.rect(2, 12, 22, 28, P.gray)
  g.rect(2, 12, 22, 1, P.outline)
  for (let y = 15; y < 40; y += 4) {
    g.rect(2, y, 22, 1, P.grayShade)
  }
  for (let x = 6; x < 24; x += 6) {
    g.rect(x, 16, 1, 24, P.grayShade)
  }
  // rebar sticking out the top
  for (const x of [5, 10, 15, 20]) {
    g.rect(x, 6, 1, 6, P.counterShade)
  }

  // scaffolding (right)
  for (const x of [40, 48, 56]) {
    g.rect(x, 8, 1, 32, P.steelShade)
  }
  for (const y of [12, 22, 32]) {
    g.rect(40, y, 17, 1, P.steelShade)
  }
  g.rect(40, 21, 17, 1, P.counter) // work plank

  // bulletin board on the scaffold — where the closure memo is posted
  g.rect(43, 24, 11, 8, P.outline)
  g.rect(44, 25, 9, 6, P.counter)
  g.rect(45, 26, 3, 3, P.white)
  g.rect(49, 26, 3, 4, P.wallLight)
  g.rect(45, 30, 2, 1, P.white)

  // dirt ground
  g.rect(0, 40, 60, 20, P.floorShade)
  g.dither(0, 40, 60, 2, P.floor)
  g.rect(0, 56, 60, 4, '#4a3a26')

  // cement bags (center-left pile)
  for (const [x, y] of [
    [24, 36],
    [30, 36],
    [27, 32],
  ] as const) {
    g.rect(x, y, 6, 4, P.outline)
    g.rect(x + 1, y + 1, 4, 2, P.wallLight)
  }

  // hollow blocks stack (right of bags)
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 3; col++) {
      const x = 8 + col * 5
      const y = 42 + row * 4
      g.rect(x, y, 5, 4, P.outline)
      g.rect(x + 1, y + 1, 3, 2, P.gray)
    }
  }

  // safety cones
  for (const x of [36, 52]) {
    g.rect(x, 46, 3, 1, P.outline)
    g.rect(x + 1, 43, 1, 3, P.red)
    g.rect(x + 1, 44, 1, 1, P.white)
  }
}
