// The React↔engine bridge: useReducer wraps the pure step(); effects are queued
// in a ref tagged with fxSeq and drained exactly once per seq (StrictMode
// double-invokes reducers in dev — the seq filter makes that harmless).

import { useEffect, useReducer, useRef, useState } from 'react'
import type { CaseData } from '../engine/types'
import type { GameState, Snapshot } from '../engine/state'
import type { Effect, GameEvent } from '../engine/events'
import { initialState, step } from '../engine/reducer'
import { SAVE_KEY, serializeSnapshot } from '../engine/save'
import { currentLine, currentNote, currentSpeaker } from '../engine/selectors'
import { audio } from '../audio'
import type { AppStorage } from './storage'
import { Stage } from './Stage'
import { DialogueBox } from './DialogueBox'
import { InvestigationMenu } from './InvestigationMenu'
import { TestimonyHud } from './TestimonyHud'
import { WorkingPapers } from './WorkingPapers'
import { ShoutCard } from './ShoutCard'
import { ReviewerNoteCard } from './ReviewerNoteCard'
import { CredibilityMeter } from './CredibilityMeter'
import { GameOver } from './GameOver'
import { CaseRecap } from './CaseRecap'

interface FxBatch {
  seq: number
  effects: Effect[]
}

export function GameRoot({
  data,
  resume,
  storage,
  onExit,
}: {
  data: CaseData
  resume: Snapshot | null
  storage: AppStorage
  onExit: () => void
}) {
  const fxQueue = useRef<FxBatch[]>([])
  const [state, dispatch] = useReducer(
    (s: GameState, e: GameEvent): GameState => {
      const r = step(data, s, e)
      if (r.effects.length) fxQueue.current.push({ seq: r.state.fxSeq, effects: r.effects })
      return r.state
    },
    data,
    (d: CaseData): GameState => {
      const fresh = initialState(d)
      if (!resume) return fresh
      const r = step(d, fresh, { type: 'LOAD', snapshot: resume })
      if (r.effects.length) fxQueue.current.push({ seq: r.state.fxSeq, effects: r.effects })
      return r.state
    },
  )

  const drained = useRef(0)
  const [shakeSeq, setShakeSeq] = useState(0)
  const [flash, setFlash] = useState<{ color: 'white' | 'red'; seq: number } | null>(null)
  const [toast, setToast] = useState<{ text: string; seq: number } | null>(null)
  const [papers, setPapers] = useState<'view' | 'present' | null>(null)

  useEffect(() => {
    const batches = fxQueue.current.filter((b) => b.seq > drained.current)
    fxQueue.current = []
    if (batches.length === 0) return
    drained.current = Math.max(drained.current, ...batches.map((b) => b.seq))
    for (const b of batches) {
      for (const e of b.effects) {
        switch (e.type) {
          case 'sfx':
            audio.sfx(e.id)
            break
          case 'music':
            audio.music(e.id)
            break
          case 'shake':
            setShakeSeq((n) => n + 1)
            break
          case 'flash':
            setFlash((f) => ({ color: e.color, seq: (f?.seq ?? 0) + 1 }))
            break
          case 'save':
            if (state.checkpoint) {
              storage.set(SAVE_KEY, serializeSnapshot(data.id, state.checkpoint, Date.now()))
            }
            break
          case 'evidenceAdded': {
            const ev = data.evidence[e.evidence]
            if (ev) setToast((t) => ({ text: `🗂 ${ev.name} — nasa Working Papers na`, seq: (t?.seq ?? 0) + 1 }))
            break
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.fxSeq])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(t)
  }, [toast])

  const line = currentLine(data, state)
  const note = currentNote(data, state)
  const speaker = currentSpeaker(data, state)

  const advance = () => dispatch({ type: 'ADVANCE' })

  return (
    <div className="viewport">
      <div className="stage-wrap" key={shakeSeq} data-shake={shakeSeq > 0 ? '' : undefined}>
        <Stage data={data} state={state} />
        {flash && (
          <div
            key={flash.seq}
            className="flash"
            style={{ background: flash.color === 'white' ? '#fff' : 'rgba(190,30,40,.85)' }}
          />
        )}
        <CredibilityMeter value={state.credibility} max={data.credibilityMax} />
        {toast && (
          <div key={toast.seq} className="toast">
            {toast.text}
          </div>
        )}
      </div>

      <div className="ui-area">
        {state.mode === 'investigation' && !note && (
          <InvestigationMenu
            data={data}
            state={state}
            onAction={(id) => dispatch({ type: 'DO_ACTION', actionId: id })}
            onPapers={() => setPapers('view')}
          />
        )}

        {(state.mode === 'dialogue' || state.mode === 'choice') && line && line.kind !== 'shout' && (
          <DialogueBox
            line={line}
            speaker={speaker}
            onAdvance={advance}
            onChoose={(i) => dispatch({ type: 'CHOOSE', index: i })}
          />
        )}

        {state.mode === 'testimony' && !note && (
          <TestimonyHud
            data={data}
            state={state}
            onPrev={() => dispatch({ type: 'STATEMENT_PREV' })}
            onNext={() => dispatch({ type: 'STATEMENT_NEXT' })}
            onPress={() => dispatch({ type: 'PRESS' })}
            onPresent={() => setPapers('present')}
            onPapers={() => setPapers('view')}
          />
        )}
      </div>

      {line?.kind === 'shout' && <ShoutCard card={line.card} onDone={advance} />}
      {note && <ReviewerNoteCard note={note} onDismiss={advance} />}
      {papers && (
        <WorkingPapers
          data={data}
          state={state}
          mode={papers}
          onClose={() => setPapers(null)}
          onPresent={(id) => {
            setPapers(null)
            dispatch({ type: 'PRESENT', evidence: id })
          }}
        />
      )}
      {state.mode === 'gameOver' && <GameOver onRetry={() => dispatch({ type: 'RETRY' })} onExit={onExit} />}
      {state.mode === 'caseComplete' && <CaseRecap data={data} state={state} onExit={onExit} />}
    </div>
  )
}
