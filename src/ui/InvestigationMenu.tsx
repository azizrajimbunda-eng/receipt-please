import type { CaseData } from '../engine/types'
import type { GameState } from '../engine/state'
import { currentScene, visibleActions } from '../engine/selectors'

const KIND_ICONS = { talk: '💬', examine: '🔍', move: '🚪', testimony: '⚖️' } as const

export function InvestigationMenu({
  data,
  state,
  onAction,
  onPapers,
  onHint,
}: {
  data: CaseData
  state: GameState
  onAction: (id: string) => void
  onPapers: () => void
  onHint: () => void
}) {
  const scene = currentScene(data, state)
  const actions = visibleActions(data, state)

  return (
    <>
      <div className="scene-header">{scene?.name ?? ''}</div>
      <div className="menu-list">
        {actions.map((a) => (
          <button
            key={a.id}
            type="button"
            className={`menu-btn ${a.done ? 'done' : ''} ${a.kind === 'testimony' ? 'testimony-action' : ''}`}
            onClick={() => onAction(a.id)}
          >
            {KIND_ICONS[a.kind]} {a.label}
          </button>
        ))}
      </div>
      <button type="button" className="hud-btn hint-btn" onClick={onHint}>
        💡 Tanong kay Ate Cess
      </button>
      <button type="button" className="hud-btn papers-btn" onClick={onPapers}>
        🗂 Working Papers ({state.evidence.length})
      </button>
    </>
  )
}
