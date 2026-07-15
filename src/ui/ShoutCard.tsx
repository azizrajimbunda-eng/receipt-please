import type { ShoutCardId } from '../engine/types'

// Full-screen splash: radiating speedlines behind chunky italic text.
// Speedlines are a conic-gradient (pure CSS, no assets) so it inlines in the
// single-file artifact build.
export function ShoutCard({ card, onDone }: { card: ShoutCardId; onDone: () => void }) {
  return (
    <div className="overlay shout-overlay" onPointerDown={onDone}>
      <div className="speedlines" />
      <div className="shout" data-card={card}>
        {card}
      </div>
    </div>
  )
}
