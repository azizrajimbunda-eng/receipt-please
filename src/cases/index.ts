// Case registry. Every entry here is linted by tests/linter.test.ts and must
// stay completable — add a walkthrough + playthrough test per real case.

import type { CaseData } from '../engine/types'
import { case01 } from './case01-petty-cash/case'
import { case02 } from './case02-lapping/case'
import { case03 } from './case03-ghost-payroll/case'
import { case04 } from './case04-mas/case'
import { microCase } from './micro-meryenda/case'

/** Registry order = display order on the case-select screen. */
export const cases: Record<string, CaseData> = {
  [case01.id]: case01,
  [case02.id]: case02,
  [case03.id]: case03,
  [case04.id]: case04,
  [microCase.id]: microCase,
}
