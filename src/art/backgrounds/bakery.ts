// Bibingka ni Aling Rosa commissary — tiled wall, four brick ovens (three lit,
// one dark — the 60% utilization made visible), banana-leaf-lined trays, and
// the tarp-covered half-built Project Hurno in the corner.

import { P } from '../palette'
import type { Grid } from '../render'

export function paintBakery(g: Grid): void {
  // tiled upper wall
  g.rect(0, 0, 60, 26, P.wallLight)
  for (let x = 0; x < 60; x += 6) g.rect(x, 0, 1, 26, P.wall)
  for (let y = 6; y < 26; y += 6) g.rect(0, y, 60, 1, P.wall)

  // brick oven bank (left) — four arches, three glowing, one dark
  const ovenColors = [P.gold, P.orange, P.gold, null] // 4th unlit
  for (let i = 0; i < 4; i++) {
    const x = 2 + i * 7
    g.rect(x, 10, 6, 14, P.counterShade)
    g.rect(x, 10, 6, 1, P.outline)
    g.rect(x + 1, 13, 4, 4, P.outline) // oven mouth
    const glow = ovenColors[i]
    if (glow) {
      g.rect(x + 1, 14, 4, 3, glow)
      g.rect(x + 2, 15, 2, 1, '#fbe7a5')
    } else {
      g.rect(x + 1, 14, 4, 3, '#241a2e') // cold, dark
    }
  }

  // steam wisps from the lit ovens
  g.dither(4, 6, 4, 3, P.white)
  g.dither(18, 6, 4, 3, P.white)

  // shelf with cooling bibingka (right)
  g.rect(38, 8, 20, 2, P.counterShade)
  for (let i = 0; i < 5; i++) {
    const x = 39 + i * 4
    g.rect(x, 5, 3, 3, P.gold) // banana-leaf square
    g.rect(x + 1, 6, 1, 1, P.orange) // salted egg
  }

  // work counter
  g.rect(0, 40, 60, 20, P.counter)
  g.dither(0, 40, 60, 2, P.counterShade)
  g.rect(0, 40, 60, 1, P.wallLight) // steel edge
  g.rect(0, 56, 60, 4, P.counterShade)

  // trays lined with banana leaf on the counter
  for (const x of [6, 20, 34]) {
    g.rect(x, 34, 10, 5, P.outline)
    g.rect(x + 1, 35, 8, 3, P.teal) // banana leaf
    g.rect(x + 2, 35, 2, 2, P.gold) // a bibingka
    g.rect(x + 5, 35, 2, 2, P.gold)
  }

  // Project Hurno — tarp-covered steel frame in the corner (right)
  g.rect(48, 28, 11, 14, P.grayShade) // tarp
  g.dither(48, 28, 11, 3, P.gray)
  g.rect(48, 28, 11, 1, P.outline)
  g.rect(50, 30, 1, 10, P.steelShade) // rebar poking through
  g.rect(54, 29, 1, 11, P.steelShade)
  // tiny hand-lettered sign
  g.rect(49, 37, 9, 3, P.wallLight)
  g.rect(50, 38, 7, 1, P.outline)
}
