// The consult overlay: Ate Cess answers, one tier at a time. Closing keeps the
// tier, so re-asking in the same round resumes where she left off.

export function HintCard({
  text,
  tier,
  total,
  onMore,
  onClose,
}: {
  text: string
  tier: number
  total: number
  onMore: () => void
  onClose: () => void
}) {
  const hasMore = tier < total - 1
  return (
    <div className="overlay">
      <div className="card note-card hint-card">
        <div className="note-header hint-header">💡 TANONG KAY ATE CESS</div>
        <div className="hint-body">{text}</div>
        <div className="hint-tier">
          {tier + 1}/{total}
        </div>
        <div className="hud-row">
          <button type="button" className="hud-btn" onClick={onClose}>
            Kaya ko na
          </button>
          {hasMore && (
            <button type="button" className="hud-btn press" onClick={onMore}>
              Isa pa, Ate 💡
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
