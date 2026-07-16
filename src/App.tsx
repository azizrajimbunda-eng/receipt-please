import { Suspense, lazy, useEffect, useState } from 'react'
import type { CaseData } from './engine/types'
import type { Snapshot } from './engine/state'
import { SAVE_KEY, parse, saveKeyFor } from './engine/save'
import { cases } from './cases'
import { audio } from './audio'
import { browserStorage } from './ui/storage'
import { readProgress } from './ui/progress'
import { GameRoot } from './ui/GameRoot'

const storage = browserStorage()

// One-time migration: the pre-case-select build kept a single global save slot.
// Move it to the per-case key so nobody loses a run to the case-select update.
;(() => {
  const raw = storage.get(SAVE_KEY)
  if (!raw) return
  for (const data of Object.values(cases)) {
    const snap = parse(raw, data)
    if (snap) {
      if (!storage.get(saveKeyFor(data.id))) storage.set(saveKeyFor(data.id), raw)
      break
    }
  }
  storage.set(SAVE_KEY, '')
})()

// Statically tree-shaken from both prod builds: the whole branch is dead code
// when import.meta.env.DEV is false, so the chunk never exists.
const SpritePreview = import.meta.env.DEV ? lazy(() => import('./dev/SpritePreview')) : null

interface Session {
  nonce: number
  data: CaseData
  resume: Snapshot | null
}

function savedSnapshot(data: CaseData): Snapshot | null {
  const raw = storage.get(saveKeyFor(data.id))
  return raw ? parse(raw, data) : null
}

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (import.meta.env.DEV && SpritePreview && hash === '#dev') {
    return (
      <Suspense fallback={null}>
        <SpritePreview />
      </Suspense>
    )
  }

  if (session) {
    return (
      <GameRoot
        key={session.nonce}
        data={session.data}
        resume={session.resume}
        storage={storage}
        onExit={() => setSession(null)}
      />
    )
  }

  const done = readProgress(storage)

  const start = (data: CaseData, resume: Snapshot | null) => {
    audio.ensure() // must run synchronously inside the tap gesture
    setSession({ nonce: Date.now(), data, resume })
  }

  return (
    <div className="title-screen">
      <div className="title-art">🧾</div>
      <h1 className="title-name">
        RECEIPT,
        <br />
        PLEASE!
      </h1>
      <p className="title-tagline">Walang resibo, walang kaso.</p>

      <div className="case-list">
        {Object.values(cases).map((data) => {
          const snap = savedSnapshot(data)
          return (
            <div key={data.id} className="case-row">
              <div className={`case-title ${done.has(data.id) ? 'done' : ''}`}>
                {done.has(data.id) ? '✓ ' : ''}
                {data.title}
              </div>
              <div className="hud-row">
                {snap && (
                  <button type="button" className="hud-btn present" onClick={() => start(data, snap)}>
                    ▶ Ituloy
                  </button>
                )}
                <button type="button" className="hud-btn" onClick={() => start(data, null)}>
                  {snap ? '↺ Ulitin' : '▶ Simulan'}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <p className="title-footer">
        isang audit fraud visual novel para sa CPA reviewees
        {!storage.persistent && <br />}
        {!storage.persistent && '(saves off sa viewer na ito)'}
      </p>
    </div>
  )
}
