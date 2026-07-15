// Stings, hand-built from oscillators and noise. Ids match the Effect
// descriptors the engine emits ('objection' | 'correct' | 'penalty' | 'reveal').

import { audioCtx, masterGain } from './context'

function noiseBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  const len = Math.floor(ctx.sampleRate * seconds)
  const buf = ctx.createBuffer(1, len, ctx.sampleRate)
  const data = buf.getChannelData(0)
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1
  return buf
}

function tone(
  ctx: AudioContext,
  out: GainNode,
  type: OscillatorType,
  freq: number,
  start: number,
  dur: number,
  peak: number,
  bendTo?: number,
  detune = 0,
): void {
  const osc = ctx.createOscillator()
  const g = ctx.createGain()
  osc.type = type
  osc.detune.value = detune
  osc.frequency.setValueAtTime(freq, start)
  if (bendTo !== undefined) osc.frequency.exponentialRampToValueAtTime(bendTo, start + dur)
  g.gain.setValueAtTime(0.0001, start)
  g.gain.exponentialRampToValueAtTime(peak, start + 0.012)
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur)
  osc.connect(g).connect(out)
  osc.start(start)
  osc.stop(start + dur + 0.02)
}

export function sfx(id: string): void {
  const ctx = audioCtx()
  const out = masterGain()
  if (!ctx || !out) return
  const t = ctx.currentTime

  switch (id) {
    case 'objection': {
      // detuned saw stack with a downward bend — the money sound
      for (const d of [-14, 0, 14]) {
        tone(ctx, out, 'sawtooth', 420, t, 0.42, 0.2, 130, d)
      }
      const src = ctx.createBufferSource()
      const g = ctx.createGain()
      src.buffer = noiseBuffer(ctx, 0.12)
      g.gain.setValueAtTime(0.22, t)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12)
      src.connect(g).connect(out)
      src.start(t)
      break
    }
    case 'correct': {
      // ascending major arpeggio: C-E-G-C
      ;[523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
        tone(ctx, out, 'square', f, t + i * 0.07, 0.14, 0.18)
      })
      break
    }
    case 'penalty': {
      tone(ctx, out, 'sawtooth', 200, t, 0.3, 0.2, 70)
      const src = ctx.createBufferSource()
      const g = ctx.createGain()
      src.buffer = noiseBuffer(ctx, 0.2)
      g.gain.setValueAtTime(0.18, t)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2)
      src.connect(g).connect(out)
      src.start(t)
      break
    }
    case 'reveal': {
      tone(ctx, out, 'triangle', 880, t, 0.1, 0.16)
      tone(ctx, out, 'triangle', 1318.5, t + 0.09, 0.16, 0.16)
      break
    }
  }
}
