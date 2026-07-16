// Mabuhay Beverage warehouse office — corrugated wall, roll-up door, stacked
// beverage crates, a small desk of route folders.

import { P } from '../palette'
import type { Grid } from '../render'

export function paintWarehouse(g: Grid): void {
  // corrugated steel wall
  g.rect(0, 0, 60, 38, P.steelShade)
  for (let x = 1; x < 60; x += 4) {
    g.rect(x, 0, 1, 38, P.steel)
  }
  g.rect(0, 0, 60, 2, P.outline)

  // roll-up door (right)
  g.rect(37, 6, 20, 32, P.outline)
  g.rect(38, 7, 18, 30, P.gray)
  for (let y = 9; y < 37; y += 3) {
    g.rect(38, y, 18, 1, P.grayShade)
  }
  g.rect(45, 32, 4, 2, P.outline) // handle

  // hanging bulb
  g.rect(28, 0, 1, 6, P.outline)
  g.rect(26, 6, 5, 4, P.gold)
  g.rect(27, 7, 3, 2, '#fbe7a5')

  // stacked beverage crates (left)
  const colors = [P.red, P.orange, P.teal, P.orange, P.red, P.teal]
  let i = 0
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 3; col++) {
      const x = 2 + col * 8
      const y = 22 + row * 8
      g.rect(x, y, 8, 8, P.outline)
      g.rect(x + 1, y + 1, 6, 6, colors[i % colors.length] ?? P.red)
      // bottle necks peeking out
      g.rect(x + 2, y + 1, 1, 2, P.outline)
      g.rect(x + 4, y + 1, 1, 2, P.outline)
      i++
    }
  }

  // concrete floor
  g.rect(0, 38, 60, 22, P.grayShade)
  g.dither(0, 38, 60, 2, P.gray)
  g.rect(0, 56, 60, 4, '#565064')

  // route desk (center)
  g.rect(24, 31, 12, 9, P.outline)
  g.rect(25, 32, 10, 2, P.counter)
  g.rect(25, 34, 10, 5, P.counterShade)
  g.rect(26, 29, 5, 3, P.teal) // route folders
  g.rect(31, 30, 3, 2, P.white)
}
