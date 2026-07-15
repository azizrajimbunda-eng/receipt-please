export function CredibilityMeter({ value, max }: { value: number; max: number }) {
  return (
    <div className="pips" title="Kredibilidad">
      {Array.from({ length: max }, (_, i) => (
        <div key={i} className={`pip ${i < value ? '' : 'off'}`} />
      ))}
    </div>
  )
}
