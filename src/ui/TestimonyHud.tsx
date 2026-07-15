import type { CaseData } from '../engine/types'
import type { GameState } from '../engine/state'
import { currentSpeaker, currentStatement, currentTestimony, visibleStatements } from '../engine/selectors'
import { audio } from '../audio'
import { mouthBus } from './mouthBus'
import { useTypewriter } from './useTypewriter'

export function TestimonyHud({
  data,
  state,
  onPrev,
  onNext,
  onPress,
  onPresent,
  onPapers,
}: {
  data: CaseData
  state: GameState
  onPrev: () => void
  onNext: () => void
  onPress: () => void
  onPresent: () => void
  onPapers: () => void
}) {
  const t = currentTestimony(data, state)
  const st = currentStatement(data, state)
  const witness = currentSpeaker(data, state)
  const list = visibleStatements(data, state)
  const idx = st ? list.findIndex((x) => x.id === st.id) : -1
  const tw = useTypewriter(st?.text ?? '', 30, () => {
    if (witness) audio.blip(witness.blip)
    mouthBus.notify()
  })

  return (
    <>
      <div className="testimony-title">— {t?.title ?? ''} —</div>
      <div className="dialogue testimony" onPointerDown={() => !tw.done && tw.skip()}>
        {witness && <div className="name-tag witness">{witness.name}</div>}
        <span>{tw.shown}</span>
      </div>
      <div className="hud-row">
        <button type="button" className="hud-btn nav" onClick={onPrev}>
          ◀
        </button>
        <div className="statement-counter">
          {idx + 1}/{list.length}
        </div>
        <button type="button" className="hud-btn nav" onClick={onNext}>
          ▶
        </button>
      </div>
      <div className="hud-row">
        <button type="button" className="hud-btn press" onClick={onPress}>
          ✋ DIINAN
        </button>
        <button type="button" className="hud-btn present" onClick={onPresent}>
          🧾 IHARAP
        </button>
      </div>
      <button type="button" className="hud-btn papers-btn" onClick={onPapers}>
        🗂 Working Papers ({state.evidence.length})
      </button>
    </>
  )
}
