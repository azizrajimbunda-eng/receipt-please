import { useState } from 'react'
import type { CaseData, EvidenceId } from '../engine/types'
import type { GameState } from '../engine/state'
import { workingPapers } from '../engine/selectors'

const ICON_GLYPHS: Record<string, string> = {
  'icon-ledger': '📒',
  'icon-receipt': '🧾',
  'icon-note': '📝',
  'icon-photo': '📷',
  'icon-cash': '💵',
  'icon-doc': '📄',
}

export function WorkingPapers({
  data,
  state,
  mode,
  onClose,
  onPresent,
}: {
  data: CaseData
  state: GameState
  mode: 'view' | 'present'
  onClose: () => void
  onPresent: (id: EvidenceId) => void
}) {
  const entries = workingPapers(data, state)
  const [openId, setOpenId] = useState<EvidenceId | null>(null)
  const [inspecting, setInspecting] = useState(false)
  const open = openId ? entries.find((e) => e.id === openId) : null

  return (
    <div className="overlay" onPointerDown={onClose}>
      <div className="card papers" onPointerDown={(e) => e.stopPropagation()}>
        <div className="card-header">
          <span>🗂 WORKING PAPERS</span>
          <button type="button" className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {!open && (
          <>
            {mode === 'present' && <div className="present-hint">Piliin ang ebidensiyang sasalungat sa statement.</div>}
            {entries.length === 0 && <div className="dim">Wala ka pang naipong ebidensiya.</div>}
            <div className="papers-grid">
              {entries.map((e) => (
                <button key={e.id} type="button" className="papers-item" onClick={() => setOpenId(e.id)}>
                  <span className="papers-icon">{ICON_GLYPHS[e.evidence.iconId] ?? '📄'}</span>
                  <span>{e.evidence.name}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {open && !inspecting && (
          <div className="papers-detail">
            <div className="papers-detail-name">
              {ICON_GLYPHS[open.evidence.iconId] ?? '📄'} {open.evidence.name}
            </div>
            <div className="papers-detail-body">{open.evidence.detail}</div>
            <div className="hud-row">
              <button type="button" className="hud-btn" onClick={() => setOpenId(null)}>
                ← Balik
              </button>
              {open.evidence.inspect && (
                <button type="button" className="hud-btn" onClick={() => setInspecting(true)}>
                  🔍 Suriin
                </button>
              )}
              {mode === 'present' && (
                <button type="button" className="hud-btn present" onClick={() => onPresent(open.id)}>
                  🧾 IHARAP!
                </button>
              )}
            </div>
          </div>
        )}

        {open && inspecting && open.evidence.inspect && (
          <div className="papers-detail">
            <div className="doc-view">{open.evidence.inspect.lines.join('\n')}</div>
            {open.evidence.inspect.hint && <div className="doc-hint">{open.evidence.inspect.hint}</div>}
            <div className="hud-row">
              <button type="button" className="hud-btn" onClick={() => setInspecting(false)}>
                ← Balik
              </button>
              {mode === 'present' && (
                <button type="button" className="hud-btn present" onClick={() => onPresent(open.id)}>
                  🧾 IHARAP!
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
