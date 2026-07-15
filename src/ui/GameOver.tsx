export function GameOver({ onRetry, onExit }: { onRetry: () => void; onExit: () => void }) {
  return (
    <div className="overlay">
      <div className="card gameover">
        <div className="gameover-title">GAME OVER</div>
        <div className="dim">Naubos ang kredibilidad mo sa engagement. Hindi ka na pinapansin ng kliyente.</div>
        <button type="button" className="hud-btn present" onClick={onRetry}>
          ↺ Subukan ulit (huling checkpoint)
        </button>
        <button type="button" className="hud-btn" onClick={onExit}>
          Balik sa title
        </button>
      </div>
    </div>
  )
}
