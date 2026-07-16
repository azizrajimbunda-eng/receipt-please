// Completed-case tracking for the case-select screen.

import type { StorageAdapter } from '../engine/save'

export const PROGRESS_KEY = 'receipt-please:progress:v1'

export function readProgress(storage: StorageAdapter): Set<string> {
  try {
    const raw = storage.get(PROGRESS_KEY)
    if (!raw) return new Set()
    const arr = JSON.parse(raw) as unknown
    return new Set(Array.isArray(arr) ? arr.filter((x): x is string => typeof x === 'string') : [])
  } catch {
    return new Set()
  }
}

export function markComplete(storage: StorageAdapter, caseId: string): void {
  const done = readProgress(storage)
  if (done.has(caseId)) return
  done.add(caseId)
  storage.set(PROGRESS_KEY, JSON.stringify([...done]))
}
