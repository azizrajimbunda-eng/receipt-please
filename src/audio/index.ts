// Audio facade the UI talks to. Everything is synthesized in code — no audio
// files, so the single-file artifact build makes zero external requests.

import { ensureAudio, installVisibilityHandling, isMuted, setMuted } from './context'
import { blip } from './blip'
import type { BlipClass } from './blip'
import { music } from './music'
import { sfx } from './sfx'

export type { BlipClass }

let installed = false

export const audio = {
  /** Must be called synchronously inside a user gesture (title-screen tap). */
  ensure(): void {
    const ctx = ensureAudio()
    if (ctx && !installed) {
      installed = true
      installVisibilityHandling()
    }
  },
  blip,
  sfx,
  music,
  setMuted,
  isMuted,
}
