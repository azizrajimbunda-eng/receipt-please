import type { ShoutCardId } from '../engine/types'

export function ShoutCard({ card, onDone }: { card: ShoutCardId; onDone: () => void }) {
  return (
    <div className="overlay shout-overlay" onPointerDown={onDone}>
      <div className="shout">{card}</div>
    </div>
  )
}
