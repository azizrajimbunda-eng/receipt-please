// Case registry. Every entry here is linted by tests/linter.test.ts and must
// stay completable — add a walkthrough + playthrough test per real case.

import type { CaseData } from '../engine/types'
import { microCase } from './micro-meryenda/case'

export const cases: Record<string, CaseData> = {
  [microCase.id]: microCase,
}
