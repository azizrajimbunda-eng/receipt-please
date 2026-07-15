// M3 programmer art: colored panels + name plates. M4 replaces the innards with
// pixel-art canvases; the wrapper contract (fills .stage-wrap, shows scene +
// speaker) stays the same.

import type { CaseData } from '../engine/types'
import type { GameState } from '../engine/state'
import { currentScene, currentSpeaker } from '../engine/selectors'

const BG_COLORS: Record<string, string> = {
  'bg-pantry': '#31405a',
}

const SPRITE_COLORS: Record<string, string> = {
  jun: '#5b8def',
  cess: '#8d67c8',
  jopay: '#e0a03c',
}

export function Stage({ data, state }: { data: CaseData; state: GameState }) {
  const scene = currentScene(data, state)
  const speaker = currentSpeaker(data, state)
  const bg = scene ? (BG_COLORS[scene.backgroundId] ?? '#26303f') : '#171321'

  return (
    <div className="stage" style={{ background: bg }}>
      {scene && <div className="scene-name">{scene.name}</div>}
      {speaker && (
        <div className="actor" style={{ background: SPRITE_COLORS[speaker.spriteId] ?? '#666' }}>
          {speaker.name}
        </div>
      )}
    </div>
  )
}
