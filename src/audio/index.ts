// Audio facade the UI talks to. M5 fills these in with WebAudio synthesis;
// until then the game is silent but fully wired.

export type BlipClass = 'low' | 'mid' | 'high'

export const audio = {
  /** Must be called synchronously inside a user gesture (title-screen tap). */
  ensure(): void {},
  blip(_cls: BlipClass): void {},
  sfx(_id: string): void {},
  music(_id: string | null): void {},
  setMuted(_muted: boolean): void {},
  isMuted(): boolean {
    return false
  },
}
