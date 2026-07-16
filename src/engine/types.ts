// The case data schema — this is the content API. Every future case is a CaseData
// object and nothing else. The linter (linter.ts) enforces referential integrity
// and completability over these types.

export type SpeakerId = string
export type SceneId = string
export type EvidenceId = string
export type ScriptId = string
export type TestimonyId = string
export type StatementId = string
export type FlagId = string
export type NoteId = string

export interface Speaker {
  name: string
  role?: string
  spriteId: string
  /** voice blip pitch class for the text typewriter */
  blip: 'low' | 'mid' | 'high'
}

/** Papers, Please-style close-up: a zoomable document body with the tell buried in it. */
export interface EvidenceInspect {
  kind: 'document'
  lines: string[]
  hint?: string
}

export interface Evidence {
  name: string
  iconId: string
  /** one-liner in the Working Papers list */
  short: string
  /** examine view; multiline ok */
  detail: string
  inspect?: EvidenceInspect
}

/** The educational payoff card — required on every contradiction. */
export interface ReviewerNote {
  concept: string
  /** e.g. 'PSA 240; AT reviewer: cash & cash equivalents' */
  citation: string
  body: string
}

export interface Condition {
  allOf?: FlagId[]
  noneOf?: FlagId[]
}

export interface SceneAction {
  id: string
  label: string
  kind: 'talk' | 'examine' | 'move' | 'testimony'
  /** ScriptId for talk/examine, SceneId for move, TestimonyId for testimony */
  target: string
  when?: Condition
  /** auto-set after running; UI shows a check mark */
  doneFlag?: FlagId
}

export interface Scene {
  name: string
  backgroundId: string
  musicId?: string
  actions: SceneAction[]
}

export interface LineFx {
  shake?: boolean
  flash?: 'white' | 'red'
  sting?: string
  /** switch bgm, or null to stop it */
  music?: string | null
}

export type ShoutCardId = 'OBJECTION!' | 'SANDALI!' | 'ETO, O!'

export type DialogueLine =
  | { kind: 'say'; speaker: SpeakerId; pose?: string; text: string; fx?: LineFx }
  | { kind: 'narrate'; text: string }
  | { kind: 'give'; evidence: EvidenceId }
  | { kind: 'setFlag'; flag: FlagId }
  | { kind: 'label'; name: string }
  | { kind: 'goto'; label: string }
  | { kind: 'branch'; when: Condition; label: string }
  | { kind: 'choice'; prompt: string; options: { text: string; label: string }[] }
  | { kind: 'shout'; card: ShoutCardId; speaker: SpeakerId }
  | { kind: 'note'; note: NoteId }
  | { kind: 'moveTo'; scene: SceneId }
  | { kind: 'testimony'; testimony: TestimonyId }
  | { kind: 'checkpoint' }
  | { kind: 'endCase' }

export interface Statement {
  id: StatementId
  text: string
  pose?: string
  /** not shown until a press reveals it */
  hidden?: boolean
  press: {
    /** press conversation; returns to this statement afterwards */
    script: ScriptId
    reveals?: StatementId
    setsFlag?: FlagId
  }
  contradiction?: {
    /** any one of these works (usually length 1) */
    evidence: EvidenceId[]
    /** takedown script; must end in moveTo/testimony/endCase (linter-enforced) */
    script: ScriptId
    /** shown automatically before the takedown's ending transition */
    note: NoteId
  }
}

export interface Testimony {
  title: string
  speaker: SpeakerId
  musicId?: string
  /** 4–6 typically; hidden ones revealed via press */
  statements: Statement[]
  /**
   * Authored consult hints for this round, in Ate Cess's voice, mildest first
   * (concept nudge → sharper pointer). The engine always appends two generated
   * tiers after these: the target statement, then the exact evidence.
   */
  hints?: string[]
}

export interface CaseData {
  id: string
  schemaVersion: 1
  title: string
  /** penalty marks, e.g. 5 */
  credibilityMax: number
  speakers: Record<SpeakerId, Speaker>
  evidence: Record<EvidenceId, Evidence>
  notes: Record<NoteId, ReviewerNote>
  scenes: Record<SceneId, Scene>
  scripts: Record<ScriptId, DialogueLine[]>
  testimonies: Record<TestimonyId, Testimony>
  startScript: ScriptId
  /** generic "hindi yata konektado 'yan..." flavor after a wrong present */
  wrongPresentScript?: ScriptId
}
