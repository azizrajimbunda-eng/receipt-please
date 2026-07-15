// Browser-side sprite decoding and stage painting. Decoded frames are cached
// as small canvases (1 logical px = 1 canvas px) and blitted with smoothing
// off — pixelated upscale is exact at integer multiples.

import type { PixelSprite } from './sprite'

export const STAGE = 240
/** logical sprite px → stage px */
export const SPRITE_SCALE = 4

const cache = new Map<string, HTMLCanvasElement>()

export function decodeFrame(sprite: PixelSprite, frame: string): HTMLCanvasElement | null {
  const rows = sprite.frames[frame] ?? sprite.frames['neutral']
  if (!rows) return null
  const key = `${sprite.id}/${sprite.frames[frame] ? frame : 'neutral'}`
  const hit = cache.get(key)
  if (hit) return hit
  const c = document.createElement('canvas')
  c.width = sprite.w
  c.height = sprite.h
  const ctx = c.getContext('2d')
  if (!ctx) return null
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const ch = row[x]
      if (!ch || ch === '.') continue
      const color = sprite.palette[ch]
      if (!color) continue
      ctx.fillStyle = color
      ctx.fillRect(x, y, 1, 1)
    }
  })
  cache.set(key, c)
  return c
}

export function drawSprite(
  ctx: CanvasRenderingContext2D,
  sprite: PixelSprite,
  frame: string,
  x: number,
  y: number,
  scale = SPRITE_SCALE,
): void {
  const decoded = decodeFrame(sprite, frame)
  if (!decoded) return
  ctx.imageSmoothingEnabled = false
  ctx.drawImage(decoded, x, y, sprite.w * scale, sprite.h * scale)
}

/** Center-bottom placement for the standard talking bust shot. */
export function drawActor(ctx: CanvasRenderingContext2D, sprite: PixelSprite, frame: string): void {
  const w = sprite.w * SPRITE_SCALE
  const h = sprite.h * SPRITE_SCALE
  drawSprite(ctx, sprite, frame, Math.floor((STAGE - w) / 2), STAGE - h)
}

export type BackgroundPainter = (ctx: CanvasRenderingContext2D) => void

/** Background painters draw on a 60×60 logical grid, scaled ×4 to 240. */
export function paintOn(ctx: CanvasRenderingContext2D, fn: (g: Grid) => void): void {
  ctx.save()
  ctx.imageSmoothingEnabled = false
  ctx.setTransform(4, 0, 0, 4, 0, 0)
  fn(new Grid(ctx))
  ctx.restore()
}

/** Chunky-pixel drawing helpers for background painters. */
export class Grid {
  private ctx: CanvasRenderingContext2D

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
  }

  rect(x: number, y: number, w: number, h: number, color: string): void {
    this.ctx.fillStyle = color
    this.ctx.fillRect(x, y, w, h)
  }

  /** 50% checkerboard dither band between two regions */
  dither(x: number, y: number, w: number, h: number, color: string): void {
    this.ctx.fillStyle = color
    for (let yy = y; yy < y + h; yy++) {
      for (let xx = x + ((yy - y) % 2); xx < x + w; xx += 2) {
        this.ctx.fillRect(xx, yy, 1, 1)
      }
    }
  }

  outline(x: number, y: number, w: number, h: number, color: string): void {
    this.rect(x, y, w, 1, color)
    this.rect(x, y + h - 1, w, 1, color)
    this.rect(x, y, 1, h, color)
    this.rect(x + w - 1, y, 1, h, color)
  }
}
