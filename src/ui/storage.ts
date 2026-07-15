// Browser storage adapter with in-memory fallback: sandboxed artifact iframes
// can throw SecurityError on storage access — saves degrade, the game must not.

import type { StorageAdapter } from '../engine/save'
import { memoryStorage } from '../engine/save'

export interface AppStorage extends StorageAdapter {
  /** false when running on the in-memory fallback (show "saves off" note) */
  persistent: boolean
}

export function browserStorage(): AppStorage {
  try {
    const probe = '__receipt_probe__'
    window.localStorage.setItem(probe, '1')
    window.localStorage.removeItem(probe)
    return {
      persistent: true,
      get: (k) => window.localStorage.getItem(k),
      set: (k, v) => {
        try {
          window.localStorage.setItem(k, v)
        } catch {
          // quota/security errors mid-session: drop the write, never crash
        }
      },
    }
  } catch {
    return { persistent: false, ...memoryStorage() }
  }
}
