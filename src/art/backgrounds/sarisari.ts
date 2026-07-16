// Aling Baby's sari-sari store — striped awning, window grill counter,
// hanging sachet strips (tingi culture), shelves of paninda.

import { P } from '../palette'
import type { Grid } from '../render'

export function paintSarisari(g: Grid): void {
  // morning sky
  g.rect(0, 0, 60, 9, P.windowSky)
  g.dither(0, 7, 60, 2, P.windowSkyDeep)

  // awning: red/white stripes with scalloped edge
  for (let x = 0; x < 60; x += 8) {
    g.rect(x, 9, 4, 5, P.red)
    g.rect(x + 4, 9, 4, 5, P.white)
    g.dither(x, 14, 4, 1, P.red)
    g.dither(x + 4, 14, 4, 1, P.white)
  }
  g.rect(0, 9, 60, 1, P.outline)

  // store front (wood)
  g.rect(0, 15, 60, 28, P.counter)
  g.dither(0, 15, 60, 2, P.counterShade)

  // signboard
  g.rect(14, 16, 32, 6, P.outline)
  g.rect(15, 17, 30, 4, P.white)
  g.rect(17, 18, 8, 2, P.red) // "SARI"
  g.rect(27, 18, 8, 2, P.blue) // "SARI"
  g.rect(37, 18, 6, 2, P.teal) // "STORE"

  // window opening with goods
  g.rect(8, 23, 44, 14, P.outline)
  g.rect(9, 24, 42, 12, P.floorShade)
  // shelves
  g.rect(9, 29, 42, 1, P.counterShade)
  // paninda: canned goods / bottles / packs
  const goods = [P.red, P.gold, P.teal, P.orange, P.white, P.blue]
  for (let i = 0; i < 12; i++) {
    const x = 11 + i * 3.4
    g.rect(Math.floor(x), 26, 2, 3, goods[i % goods.length] ?? P.red)
    g.rect(Math.floor(x), 31, 2, 3, goods[(i + 3) % goods.length] ?? P.gold)
  }
  // hanging sachet strips (tingi!)
  for (const x of [12, 20, 28, 36, 44]) {
    g.rect(x, 24, 1, 4, P.gold)
    g.rect(x + 1, 24, 1, 4, P.red)
  }

  // counter ledge + the biskwit lata
  g.rect(6, 37, 48, 3, P.counterShade)
  g.rect(10, 34, 5, 3, P.steel) // ang lata ng biskwit (may resibo sa loob)
  g.rect(11, 33, 3, 1, P.steelShade)

  // ground
  g.rect(0, 43, 60, 17, P.floor)
  g.dither(0, 43, 60, 2, P.floorShade)
  g.rect(0, 57, 60, 3, P.floorShade)

  // wooden bench
  g.rect(44, 44, 12, 2, P.counterShade)
  g.rect(45, 46, 2, 4, P.outline)
  g.rect(53, 46, 2, 4, P.outline)
}
