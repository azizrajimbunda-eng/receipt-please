// DEV-only art iteration gallery at #dev: every sprite × frame with zoom and
// mouth-flap animation, plus each background with an actor overlaid.
// Edit a grid string → HMR → see it instantly.

import { useEffect, useRef, useState } from 'react'
import { sprites } from '../art/sprites'
import { backgrounds } from '../art/backgrounds'
import type { PixelSprite } from '../art/sprite'
import { STAGE, drawActor, drawSprite, paintOn } from '../art/render'

function FrameCanvas({ sprite, frame, zoom, flap }: { sprite: PixelSprite; frame: string; zoom: number; flap: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const ctx = ref.current?.getContext('2d')
    if (!ctx) return
    let open = false
    const draw = () => {
      ctx.clearRect(0, 0, sprite.w * zoom, sprite.h * zoom)
      const talk = `${frame}-talk`
      drawSprite(ctx, sprite, open && sprite.frames[talk] ? talk : frame, 0, 0, zoom)
    }
    draw()
    if (!flap) return
    const t = setInterval(() => {
      open = !open
      draw()
    }, 180)
    return () => clearInterval(t)
  }, [sprite, frame, zoom, flap])
  return <canvas ref={ref} width={sprite.w * zoom} height={sprite.h * zoom} className="stage-canvas-inline" />
}

function ScenePreview({ bgId, spriteId }: { bgId: string; spriteId: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const ctx = ref.current?.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, STAGE, STAGE)
    const painter = backgrounds[bgId]
    if (painter) paintOn(ctx, painter)
    const sprite = sprites[spriteId]
    if (sprite) drawActor(ctx, sprite, 'neutral')
  }, [bgId, spriteId])
  return <canvas ref={ref} width={STAGE} height={STAGE} className="stage-canvas-inline" style={{ width: 300, height: 300 }} />
}

export default function SpritePreview() {
  const [zoom, setZoom] = useState(6)
  const [flap, setFlap] = useState(true)
  const [actor, setActor] = useState(Object.keys(sprites)[0] ?? '')

  return (
    <div className="dev-preview">
      <h2>🧾 sprite preview (#dev)</h2>
      <div className="dev-controls">
        <label>
          zoom {zoom}×
          <input type="range" min={2} max={10} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} />
        </label>
        <label>
          <input type="checkbox" checked={flap} onChange={(e) => setFlap(e.target.checked)} /> mouth flap
        </label>
      </div>

      {Object.values(sprites).map((sprite) => (
        <section key={sprite.id}>
          <h3>{sprite.id}</h3>
          <div className="dev-row">
            {Object.keys(sprite.frames)
              .filter((f) => !f.endsWith('-talk'))
              .map((frame) => (
                <figure key={frame}>
                  <FrameCanvas sprite={sprite} frame={frame} zoom={zoom} flap={flap} />
                  <figcaption>{frame}</figcaption>
                </figure>
              ))}
          </div>
        </section>
      ))}

      <section>
        <h3>scenes</h3>
        <label>
          actor{' '}
          <select value={actor} onChange={(e) => setActor(e.target.value)}>
            {Object.keys(sprites).map((id) => (
              <option key={id}>{id}</option>
            ))}
          </select>
        </label>
        <div className="dev-row">
          {Object.keys(backgrounds).map((bg) => (
            <figure key={bg}>
              <ScenePreview bgId={bg} spriteId={actor} />
              <figcaption>{bg}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  )
}
