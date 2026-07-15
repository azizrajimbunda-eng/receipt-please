import type { CaseData } from '../engine/types'
import type { GameState } from '../engine/state'
import { recapNotes } from '../engine/selectors'

export function CaseRecap({ data, state, onExit }: { data: CaseData; state: GameState; onExit: () => void }) {
  const notes = recapNotes(data, state)
  return (
    <div className="overlay">
      <div className="card recap">
        <div className="recap-title">CASE CLEARED ✓</div>
        <div className="dim">{data.title}</div>
        <div className="recap-subtitle">Mga konseptong nadaanan mo:</div>
        {notes.map((n, i) => (
          <div key={i} className="recap-note">
            <div className="note-concept">{n.concept}</div>
            <div className="note-citation">{n.citation}</div>
          </div>
        ))}
        <button type="button" className="hud-btn present" onClick={onExit}>
          Balik sa title
        </button>
      </div>
    </div>
  )
}
