import type { DialogueLine, Speaker } from '../engine/types'
import { audio } from '../audio'
import { mouthBus } from './mouthBus'
import { useTypewriter } from './useTypewriter'

export function DialogueBox({
  line,
  speaker,
  onAdvance,
  onChoose,
}: {
  line: DialogueLine
  speaker: Speaker | null
  onAdvance: () => void
  onChoose: (index: number) => void
}) {
  const text =
    line.kind === 'say' || line.kind === 'narrate'
      ? line.text
      : line.kind === 'choice'
        ? line.prompt
        : ''
  const tw = useTypewriter(text, 30, () => {
    if (speaker) audio.blip(speaker.blip)
    if (line.kind === 'say') mouthBus.notify()
  })
  const isChoice = line.kind === 'choice'
  const narrating = line.kind === 'narrate'

  return (
    <>
      <div
        className={`dialogue ${narrating ? 'narrate' : ''}`}
        onPointerDown={() => {
          if (!tw.done) tw.skip()
          else if (!isChoice) onAdvance()
        }}
      >
        {line.kind === 'say' && speaker && (
          <div className="name-tag">
            {speaker.name}
            {speaker.role ? <span className="name-role"> · {speaker.role}</span> : null}
          </div>
        )}
        <span>{tw.shown}</span>
        {tw.done && !isChoice && <span className="caret">▼</span>}
      </div>
      {isChoice && tw.done && line.kind === 'choice' && (
        <div className="menu-list">
          {line.options.map((o, i) => (
            <button key={i} type="button" className="menu-btn" onClick={() => onChoose(i)}>
              {o.text}
            </button>
          ))}
        </div>
      )}
    </>
  )
}
