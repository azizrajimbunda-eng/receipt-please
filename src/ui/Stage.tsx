// Canvas stage: background + character layers at 240×240 internal resolution,
// upscaled with device-pixel-exact integer scaling and pixelated rendering.
// Characters missing from the sprite registry fall back to programmer art.

import { useEffect, useRef, useState } from 'react'
import type { CaseData } from '../engine/types'
import type { GameState } from '../engine/state'
import { currentLine, currentScene, currentSpeaker, currentStatement } from '../engine/selectors'
import { sprites } from '../art/sprites'
import { backgrounds } from '../art/backgrounds'
import { STAGE, drawActor, paintOn } from '../art/render'
import { mouthBus } from './mouthBus'

const FALLBACK_COLORS: Record<string, string> = {
  jun: '#5b8def',
  cess: '#8d67c8',
  jopay: '#e0a03c',
}

function poseOf(data: CaseData, state: GameState): string {
  const line = currentLine(data, state)
  if (line?.kind === 'say' && line.pose) return line.pose
  if (state.mode === 'testimony') return currentStatement(data, state)?.pose ?? 'neutral'
  return 'neutral'
}

export function Stage({ data, state }: { data: CaseData; state: GameState }) {
  const scene = currentScene(data, state)
  const speaker = currentSpeaker(data, state)
  const pose = poseOf(data, state)
  const bgId = scene?.backgroundId ?? null
  const spriteId = speaker?.spriteId ?? null

  const wrapRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLCanvasElement>(null)
  const charRef = useRef<HTMLCanvasElement>(null)
  const [cssSize, setCssSize] = useState(STAGE)
  const [mouthOpen, setMouthOpen] = useState(false)
  const mouthTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Device-pixel-exact scaling: integer multiple in DEVICE px (so a DPR-2
  // phone can use 1.5× CSS scale and stay crisp), letterboxed by flex centering.
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      const dpr = window.devicePixelRatio || 1
      const avail = Math.min(el.clientWidth, el.clientHeight)
      const deviceScale = Math.max(1, Math.floor((avail * dpr) / STAGE))
      setCssSize((deviceScale * STAGE) / dpr)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Mouth flap: open while glyphs are appearing, close 130ms after the last one.
  useEffect(() => {
    const unsub = mouthBus.subscribe(() => {
      setMouthOpen(true)
      if (mouthTimer.current) clearTimeout(mouthTimer.current)
      mouthTimer.current = setTimeout(() => setMouthOpen(false), 130)
    })
    return () => {
      unsub()
      if (mouthTimer.current) clearTimeout(mouthTimer.current)
    }
  }, [])

  // Background layer — repaints only on scene change.
  useEffect(() => {
    const ctx = bgRef.current?.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, STAGE, STAGE)
    const painter = bgId ? backgrounds[bgId] : undefined
    if (painter) {
      paintOn(ctx, painter)
    } else {
      ctx.fillStyle = bgId ? '#26303f' : '#171321'
      ctx.fillRect(0, 0, STAGE, STAGE)
    }
  }, [bgId])

  // Character layer.
  useEffect(() => {
    const ctx = charRef.current?.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, STAGE, STAGE)
    if (!spriteId) return
    const sprite = sprites[spriteId]
    if (sprite) {
      const talk = `${pose}-talk`
      const frame = mouthOpen && sprite.frames[talk] ? talk : pose
      drawActor(ctx, sprite, frame)
    } else {
      // programmer-art fallback for cast members not yet drawn
      ctx.fillStyle = FALLBACK_COLORS[spriteId] ?? '#666'
      ctx.fillRect(70, 70, 100, 170)
      ctx.fillStyle = '#fff'
      ctx.font = '12px monospace'
      ctx.textAlign = 'center'
      ctx.fillText(speaker?.name ?? '?', 120, 225)
    }
  }, [spriteId, pose, mouthOpen, speaker])

  return (
    <div ref={wrapRef} className="stage-frame">
      <div className="stage" style={{ width: cssSize, height: cssSize }}>
        <canvas ref={bgRef} width={STAGE} height={STAGE} className="stage-canvas" />
        <canvas ref={charRef} width={STAGE} height={STAGE} className="stage-canvas" />
        {scene && <div className="scene-name">{scene.name}</div>}
      </div>
    </div>
  )
}
