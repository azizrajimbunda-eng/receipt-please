// Lazy AudioContext + mobile unlock. iOS/Android start the context suspended;
// resume() must be called synchronously inside a real user gesture. The title
// screen's tap is the primary unlock; a pointerdown on the viewport is the
// defensive one (iOS re-suspends on tab switch).

const PREFS_KEY = 'receipt-please:prefs:v1'

let ctx: AudioContext | null = null
let master: GainNode | null = null
let muted = readMuted()

function readMuted(): boolean {
  try {
    const raw = window.localStorage.getItem(PREFS_KEY)
    return raw ? Boolean(JSON.parse(raw).muted) : false
  } catch {
    return false
  }
}

function writeMuted(v: boolean): void {
  try {
    window.localStorage.setItem(PREFS_KEY, JSON.stringify({ muted: v }))
  } catch {
    // storage-denied viewers: preference just won't persist
  }
}

/** Create/resume the context. Safe to call repeatedly; must run in a gesture. */
export function ensureAudio(): AudioContext | null {
  try {
    if (!ctx) {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!Ctor) return null
      ctx = new Ctor()
      master = ctx.createGain()
      master.gain.value = muted ? 0 : 0.32
      master.connect(ctx.destination)
    }
    if (ctx.state === 'suspended') void ctx.resume()
    return ctx
  } catch {
    return null
  }
}

/** Null until unlocked — every synth call no-ops before the first gesture. */
export function audioCtx(): AudioContext | null {
  return ctx && ctx.state !== 'closed' ? ctx : null
}

export function masterGain(): GainNode | null {
  return master
}

export function setMuted(v: boolean): void {
  muted = v
  writeMuted(v)
  if (master && ctx) master.gain.setTargetAtTime(v ? 0 : 0.32, ctx.currentTime, 0.02)
}

export function isMuted(): boolean {
  return muted
}

/** Be a good phone citizen: silence while hidden, resume on return. */
export function installVisibilityHandling(): void {
  document.addEventListener('visibilitychange', () => {
    if (!ctx) return
    if (document.hidden) void ctx.suspend()
    else void ctx.resume()
  })
}
