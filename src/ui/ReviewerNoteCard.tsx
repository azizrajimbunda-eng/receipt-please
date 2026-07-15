import type { ReviewerNote } from '../engine/types'

export function ReviewerNoteCard({ note, onDismiss }: { note: ReviewerNote; onDismiss: () => void }) {
  return (
    <div className="overlay">
      <div className="card note-card">
        <div className="note-header">📌 REVIEWER NOTE</div>
        <div className="note-concept">{note.concept}</div>
        <div className="note-citation">{note.citation}</div>
        <div className="note-body">{note.body}</div>
        <button type="button" className="hud-btn present" onClick={onDismiss}>
          Kuha ko! →
        </button>
      </div>
    </div>
  )
}
