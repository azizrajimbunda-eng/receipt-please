// Sprite format: palette-indexed string grids. Poses are PATCHES over one
// hand-authored base grid — you never retype the whole body. Grids are
// validated (row count/length, known palette chars) by tests/art.test.ts.

export interface PixelSprite {
  id: string
  /** logical grid size; rendered at RENDER_SCALE× on the 240×240 stage */
  w: number
  h: number
  /** grid char → CSS color; '.' means transparent */
  palette: Record<string, string>
  frames: Record<string, string[]>
}

export interface Patch {
  x: number
  y: number
  rows: string[]
}

/** Overlay small row-blocks onto a copy of the base grid. */
export function compose(base: string[], ...patches: Patch[]): string[] {
  const rows = [...base]
  for (const p of patches) {
    for (let i = 0; i < p.rows.length; i++) {
      const y = p.y + i
      const row = rows[y]
      const pr = p.rows[i]
      if (row === undefined || pr === undefined) continue
      rows[y] = row.slice(0, p.x) + pr + row.slice(p.x + pr.length)
    }
  }
  return rows
}

/** Pure structural validation — runs headless in tests. Returns problems. */
export function validateSprite(s: PixelSprite): string[] {
  const problems: string[] = []
  for (const [name, rows] of Object.entries(s.frames)) {
    if (rows.length !== s.h) {
      problems.push(`${s.id}/${name}: ${rows.length} rows, expected ${s.h}`)
    }
    rows.forEach((row, y) => {
      if (row.length !== s.w) {
        problems.push(`${s.id}/${name} row ${y}: ${row.length} chars, expected ${s.w}`)
      }
      for (const ch of row) {
        if (ch !== '.' && !s.palette[ch]) {
          problems.push(`${s.id}/${name} row ${y}: unknown palette char "${ch}"`)
          break
        }
      }
    })
  }
  if (!s.frames['neutral']) problems.push(`${s.id}: missing required "neutral" frame`)
  return problems
}
