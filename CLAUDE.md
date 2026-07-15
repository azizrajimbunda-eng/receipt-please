# RECEIPT, PLEASE! — Ace Attorney for Philippine Accounting

Visual novel where a junior auditor exposes fraud by pressing testimony and presenting evidence. Taglish dialogue, 16-bit pixel art, for PH CPA board reviewees. React + Vite + TS, no backend.

## Links

- Live: https://azizrajimbunda-eng.github.io/receipt-please/ (GitHub Pages, auto-deploys `main` via Actions; tests gate the deploy)
- Repo: https://github.com/azizrajimbunda-eng/receipt-please (folder name "Receipt Please" ≠ repo slug — same convention as Slam City)
- Artifact mirror: (published at M8 — `npm run build:artifact` → `dist-artifact/index.html`)
- Dev server: launch config `receipt-please` → localhost:8643 (never start servers via Bash)

## Architecture (deliberate decisions — don't relitigate without cause)

- **Pure engine**: `src/engine/` is dependency-free TypeScript — no React/DOM/localStorage imports (enforced by `tests/engine-purity.test.ts`). The reducer is `step(caseData, state, event) → {state, effects}`; React interprets effects (sfx/music/shake/flash/save).
- **Cases are data**: the schema in `src/engine/types.ts` is the content API. Every contradiction REQUIRES a ReviewerNote (the educational contract, type-enforced). Progress is monotone (flags/evidence/reveals only grow) → saves are snapshots, completability is provable by BFS in `src/engine/linter.ts`.
- **Rendering split**: low-res canvases (240×240 stage; 96×128 characters) integer-scaled with `image-rendering: pixelated` for art; DOM for all text/menus. No devicePixelRatio math — pixelated upscale of a low-res store is exact at integer multiples.
- **`base: './'` + hash-only routing** — same bundle works on project Pages, single-file artifact, and `file://`. Never add history-API routing.
- **Dual build**: `npm run build` → `dist/` (Pages); `npm run build:artifact` → `dist-artifact/index.html` (vite-plugin-singlefile, zero external requests — artifact CSP blocks everything external).
- **StrictMode is on**: effects are drained from a ref keyed on `state.fxSeq` inside `useEffect` — keep effect handling idempotent per fxSeq.

## Systems map

- `src/engine/` — types (schema), state, events, reducer, selectors, save (versioned, injected StorageAdapter), linter (referential/shape/BFS-completability/orphans)
- `src/cases/` — registry + one folder per case (`case.ts`, `scripts/`, `walkthrough.ts` answer key)
- `src/art/` — palette, string-grid sprites + `compose()` patches, procedural background painters
- `src/audio/` — AudioContext unlock, per-speaker blips, stings, lookahead music sequencer
- `src/ui/` — GameRoot (useReducer + effect interpreter), Viewport/Stage/canvases, DialogueBox + typewriter, TestimonyHud, WorkingPapers, ShoutCard, ReviewerNoteCard, meters/recap
- `src/dev/SpritePreview.tsx` — art iteration gallery, DEV-only behind `#dev` hash
- `tests/` — engine, purity, linter (+ broken fixtures), full playthrough

## Verification (do this before every commit)

1. `npm test` — all suites green.
2. `npm run build && npm run build:artifact` — both compile (tsc gates types).
3. Open `dist-artifact/index.html` via `file://` — loads, no console errors, zero external network requests.
4. Dev-server smoke at 375px width: advance dialogue, press, present wrong (penalty fires), present right (shout + reviewer note).
5. Commit with a descriptive message (git log is the project history).

## Ways of working (user preferences)

- Casual Filipino/English tone; user iterates on phone-feel feedback — translate feel notes into root causes before coding.
- Resource efficiency matters: work inline for routine changes, no agent fan-outs.
- Commit per milestone. Push → Actions deploys Pages (~1-2 min) → verify live URL → (at M8+) republish artifact mirror.
- Case authoring flow: write `case.ts` → `npm run lint:case` → write `walkthrough.ts` → playthrough test green → hand-play on phone.

## Current state (2026-07-15)

- M0 in progress: scaffold + deploy pipeline. Engine (M1) not started.
- Open threads: none yet.
