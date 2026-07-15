// Chiptune loops via the classic lookahead scheduler: a 25ms timer schedules
// note events ~100ms ahead on the AudioContext clock, so timing survives rAF
// throttling (background tabs, the Browser pane) that would wreck a rAF loop.
//
// Tracks are code data: 16th-note step arrays per channel. null = rest.

import { audioCtx, masterGain } from './context'

type Step = number | null

interface Track {
  bpm: number
  /** 16th-note steps; all channels must be the same length */
  lead: Step[]
  bass: Step[]
  drums: (0 | 1 | 2 | null)[] // 1 = kick, 2 = hat
}

const N = {
  c3: 130.81, d3: 146.83, e3: 164.81, f3: 174.61, g3: 196.0, a3: 220.0, b3: 246.94,
  c4: 261.63, d4: 293.66, e4: 329.63, f4: 349.23, g4: 392.0, a4: 440.0, as4: 466.16, b4: 493.88,
  c5: 523.25, d5: 587.33, e5: 659.25, f5: 698.46, g5: 783.99, a5: 880.0,
}

const _ = null

// Investigation — relaxed, curious office shuffle.
const investigation: Track = {
  bpm: 96,
  lead: [
    N.e4, _, N.g4, _, N.a4, _, N.g4, _, N.e4, _, _, N.d4, N.e4, _, _, _,
    N.c4, _, N.e4, _, N.g4, _, N.e4, _, N.d4, _, _, N.c4, N.d4, _, _, _,
  ],
  bass: [
    N.a3, _, _, _, N.a3, _, _, _, N.e3, _, _, _, N.e3, _, _, _,
    N.f3, _, _, _, N.f3, _, _, _, N.g3, _, _, _, N.g3, _, _, _,
  ],
  drums: [
    1, _, 2, _, 1, _, 2, _, 1, _, 2, _, 1, _, 2, 2,
    1, _, 2, _, 1, _, 2, _, 1, _, 2, _, 1, _, 2, 2,
  ],
}

// Testimony — tense, ticking, something's off.
const testimony: Track = {
  bpm: 132,
  lead: [
    N.a4, _, N.a4, _, N.c5, _, N.b4, _, N.a4, _, N.g4, _, N.a4, _, _, _,
    N.a4, _, N.a4, _, N.d5, _, N.c5, _, N.b4, _, N.a4, _, N.g4, _, _, _,
  ],
  bass: [
    N.a3, _, N.a3, _, N.a3, _, N.a3, _, N.f3, _, N.f3, _, N.f3, _, N.f3, _,
    N.g3, _, N.g3, _, N.g3, _, N.g3, _, N.e3, _, N.e3, _, N.e3, _, N.e3, _,
  ],
  drums: [
    1, _, 2, _, 1, 1, 2, _, 1, _, 2, _, 1, 1, 2, _,
    1, _, 2, _, 1, 1, 2, _, 1, _, 2, _, 1, 1, 2, 2,
  ],
}

// Cornered — driving, the breakdown is coming.
const cornered: Track = {
  bpm: 156,
  lead: [
    N.a5, N.g5, N.e5, N.g5, N.a5, _, N.e5, _, N.f5, N.e5, N.d5, N.e5, N.f5, _, _, _,
    N.g5, N.f5, N.d5, N.f5, N.g5, _, N.d5, _, N.e5, N.d5, N.c5, N.d5, N.e5, _, _, _,
  ],
  bass: [
    N.a3, N.a3, _, N.a3, N.a3, _, N.a3, _, N.f3, N.f3, _, N.f3, N.f3, _, N.f3, _,
    N.g3, N.g3, _, N.g3, N.g3, _, N.g3, _, N.e3, N.e3, _, N.e3, N.e3, _, N.e3, _,
  ],
  drums: [
    1, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 1, 1, 2, 2, 2,
    1, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 1, 1, 2, 2, 2,
  ],
}

const TRACKS: Record<string, Track> = { investigation, testimony, cornered }

const LOOKAHEAD_MS = 25
const SCHEDULE_AHEAD = 0.1

let current: string | null = null
let timer: ReturnType<typeof setInterval> | null = null
let step = 0
let nextTime = 0
let noise: AudioBuffer | null = null

function getNoise(ctx: AudioContext): AudioBuffer {
  if (!noise) {
    const len = Math.floor(ctx.sampleRate * 0.2)
    noise = ctx.createBuffer(1, len, ctx.sampleRate)
    const d = noise.getChannelData(0)
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1
  }
  return noise
}

function voice(ctx: AudioContext, out: GainNode, type: OscillatorType, freq: number, at: number, dur: number, peak: number): void {
  const osc = ctx.createOscillator()
  const g = ctx.createGain()
  osc.type = type
  osc.frequency.value = freq
  g.gain.setValueAtTime(0.0001, at)
  g.gain.exponentialRampToValueAtTime(peak, at + 0.01)
  g.gain.exponentialRampToValueAtTime(0.0001, at + dur)
  osc.connect(g).connect(out)
  osc.start(at)
  osc.stop(at + dur + 0.02)
}

function drum(ctx: AudioContext, out: GainNode, kind: 0 | 1 | 2, at: number): void {
  if (kind === 1) {
    const osc = ctx.createOscillator()
    const g = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(140, at)
    osc.frequency.exponentialRampToValueAtTime(46, at + 0.09)
    g.gain.setValueAtTime(0.34, at)
    g.gain.exponentialRampToValueAtTime(0.0001, at + 0.11)
    osc.connect(g).connect(out)
    osc.start(at)
    osc.stop(at + 0.12)
  } else if (kind === 2) {
    const src = ctx.createBufferSource()
    const hp = ctx.createBiquadFilter()
    const g = ctx.createGain()
    src.buffer = getNoise(ctx)
    hp.type = 'highpass'
    hp.frequency.value = 7000
    g.gain.setValueAtTime(0.07, at)
    g.gain.exponentialRampToValueAtTime(0.0001, at + 0.03)
    src.connect(hp).connect(g).connect(out)
    src.start(at)
    src.stop(at + 0.04)
  }
}

function tick(): void {
  const ctx = audioCtx()
  const out = masterGain()
  const track = current ? TRACKS[current] : undefined
  if (!ctx || !out || !track) return

  const stepDur = 60 / track.bpm / 4 // 16th notes
  while (nextTime < ctx.currentTime + SCHEDULE_AHEAD) {
    const i = step % track.lead.length
    const lead = track.lead[i]
    const bass = track.bass[i]
    const d = track.drums[i]
    if (lead) voice(ctx, out, 'square', lead, nextTime, stepDur * 1.6, 0.075)
    if (bass) voice(ctx, out, 'triangle', bass, nextTime, stepDur * 1.9, 0.13)
    if (d) drum(ctx, out, d, nextTime)
    nextTime += stepDur
    step++
  }
}

/** Switch loops, or pass null to stop. Re-selecting the same track is a no-op. */
export function music(id: string | null): void {
  if (id === current) return
  current = id
  if (!id || !TRACKS[id]) {
    if (timer) clearInterval(timer)
    timer = null
    current = null
    return
  }
  const ctx = audioCtx()
  if (!ctx) return // not unlocked yet; scene/testimony entry re-emits on resume
  step = 0
  nextTime = ctx.currentTime + 0.05
  if (!timer) timer = setInterval(tick, LOOKAHEAD_MS)
}

export function musicTrackIds(): string[] {
  return Object.keys(TRACKS)
}
