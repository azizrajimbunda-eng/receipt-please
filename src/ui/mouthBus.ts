// Tiny pub/sub between the typewriter (glyph reveals) and the Stage (mouth
// flap): the mouth moves exactly while text is appearing, like GBA AA.

type Listener = () => void

const listeners = new Set<Listener>()

export const mouthBus = {
  subscribe(fn: Listener): () => void {
    listeners.add(fn)
    return () => listeners.delete(fn)
  },
  notify(): void {
    for (const fn of listeners) fn()
  },
}
