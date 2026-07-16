import { describe, expect, it } from 'vitest'
import { lintCase } from '../src/engine/linter'
import type { LintIssue } from '../src/engine/linter'
import { cases } from '../src/cases'
import * as broken from './fixtures/broken-cases'

function codes(issues: LintIssue[], level?: 'error' | 'warn'): string[] {
  return issues.filter((i) => !level || i.level === level).map((i) => i.code)
}

describe('registered cases lint clean', () => {
  for (const [id, data] of Object.entries(cases)) {
    it(`${id}: zero errors, zero warnings`, () => {
      const issues = lintCase(data)
      expect(issues, issues.map((i) => `${i.level} ${i.code} @ ${i.where}: ${i.message}`).join('\n')).toEqual([])
    })
  }
})

describe('seeded defects are each caught with a specific code', () => {
  it('ref-evidence: give of nonexistent evidence', () => {
    expect(codes(lintCase(broken.refEvidence), 'error')).toContain('ref-evidence')
  })

  it('ref-label: goto to a missing label', () => {
    expect(codes(lintCase(broken.refLabel), 'error')).toContain('ref-label')
  })

  it('shape-no-transition: takedown that dead-ends', () => {
    expect(codes(lintCase(broken.noTransition), 'error')).toContain('shape-no-transition')
  })

  it('shape-hidden-unreachable: hidden statement never revealed', () => {
    expect(codes(lintCase(broken.hiddenUnreachable), 'error')).toContain('shape-hidden-unreachable')
  })

  it('solver-not-completable: contradiction evidence never obtainable, with an actionable message', () => {
    const issues = lintCase(broken.notCompletable)
    expect(codes(issues, 'error')).toContain('solver-not-completable')
    const msg = issues.find((i) => i.code === 'solver-not-completable')!.message
    expect(msg).toContain('t-jopay/st-2')
    expect(msg).toContain('ev-mt-resibo')
  })

  it('solver-softlock: testimony enterable without its winning evidence', () => {
    const issues = lintCase(broken.softlockable)
    expect(codes(issues, 'error')).toContain('solver-softlock')
    const msg = issues.find((i) => i.code === 'solver-softlock')!.message
    expect(msg).toContain('t-jopay')
    expect(msg).toContain('ev-mt-resibo')
  })

  it('orphan-script: unreferenced script warns but stays completable', () => {
    const issues = lintCase(broken.orphanScript)
    expect(codes(issues, 'error')).toEqual([])
    expect(codes(issues, 'warn')).toContain('orphan-script')
  })
})
