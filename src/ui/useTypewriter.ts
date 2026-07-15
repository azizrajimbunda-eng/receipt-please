import { useEffect, useRef, useState } from 'react'

export interface Typewriter {
  shown: string
  done: boolean
  /** reveal everything now (tap while typing) */
  skip: () => void
}

/** Letter-by-letter reveal. Purely presentational — the engine only knows lines. */
export function useTypewriter(text: string, cps = 30, onGlyph?: (ch: string) => void): Typewriter {
  const [count, setCount] = useState(0)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const onGlyphRef = useRef(onGlyph)
  onGlyphRef.current = onGlyph

  useEffect(() => {
    setCount(0)
    if (text.length === 0) return
    let i = 0
    timer.current = setInterval(() => {
      i++
      const ch = text[i - 1]
      if (ch && ch !== ' ' && i % 2 === 1) onGlyphRef.current?.(ch)
      // never regress past a skip()
      setCount((c) => Math.max(c, i))
      if (i >= text.length && timer.current) clearInterval(timer.current)
    }, 1000 / cps)
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [text, cps])

  return {
    shown: text.slice(0, count),
    done: count >= text.length,
    skip: () => {
      if (timer.current) clearInterval(timer.current)
      setCount(text.length)
    },
  }
}
