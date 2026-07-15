// Case registry. Every entry here is linted by tests/linter.test.ts and must
// stay completable — add a walkthrough + playthrough test per real case.

import type { CaseData } from '../engine/types'
import { case01 } from './case01-petty-cash/case'
import { microCase } from './micro-meryenda/case'

/** Play order: the first entry is what "Simulan" starts. */
export const cases: Record<string, CaseData> = {
  [case01.id]: case01,
  [microCase.id]: microCase,
}
