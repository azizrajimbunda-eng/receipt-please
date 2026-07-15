// Per-speaker text blips: 50ms square chirps, pitched by voice class, slightly
// detuned per glyph so a line of dialogue burbles like GBA Ace Attorney.

import { audioCtx, masterGain } from './context'

export type BlipClass = 'low' | 'mid' | 'high'

const BASE_HZ: Record<BlipClass, number> = { low: 220, mid: 330, high: 440 }

export function blip(cls: BlipClass): void {
  const ctx = audioCtx()
  const out = masterGain()
  if (!ctx || !out) return

  const t = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'square'
  osc.frequency.value = BASE_HZ[cls] * (1 + (Math.random() - 0.5) * 0.08)
  gain.gain.setValueAtTime(0.0001, t)
  gain.gain.exponentialRampToValueAtTime(0.16, t + 0.005)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05)
  osc.connect(gain).connect(out)
  osc.start(t)
  osc.stop(t + 0.06)
}
