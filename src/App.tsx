import { Suspense, lazy, useEffect, useState } from 'react'
import type { CaseData } from './engine/types'
import type { Snapshot } from './engine/state'
import { SAVE_KEY, parse } from './engine/save'
import { cases } from './cases'
import { audio } from './audio'
import { browserStorage } from './ui/storage'
import { GameRoot } from './ui/GameRoot'

const storage = browserStorage()

// Statically tree-shaken from both prod builds: the whole branch is dead code
// when import.meta.env.DEV is false, so the chunk never exists.
const SpritePreview = import.meta.env.DEV ? lazy(() => import('./dev/SpritePreview')) : null

interface Session {
  nonce: number
  data: CaseData
  resume: Snapshot | null
}

function findSave(): { data: CaseData; snap: Snapshot } | null {
  const raw = storage.get(SAVE_KEY)
  if (!raw) return null
  for (const data of Object.values(cases)) {
    const snap = parse(raw, data)
    if (snap) return { data, snap }
  }
  return null
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

  const save = findSave()
  const firstCase = Object.values(cases)[0]!

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
      <div className="title-menu">
        {save && (
          <button type="button" className="menu-btn title-btn" onClick={() => start(save.data, save.snap)}>
            ▶ Ituloy ang laro
          </button>
        )}
        <button type="button" className="menu-btn title-btn" onClick={() => start(firstCase, null)}>
          {save ? '↺ Bagong laro' : '▶ Simulan'}
        </button>
      </div>
      <p className="title-footer">
        isang audit fraud visual novel para sa CPA reviewees
        {!storage.persistent && <br />}
        {!storage.persistent && '(saves off sa viewer na ito)'}
      </p>
    </div>
  )
}
