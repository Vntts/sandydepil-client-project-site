import { ArrowRight } from 'lucide-react'

/** Dica de "arraste para o lado", visível apenas no mobile. */
export default function RailHint({ label = 'Arraste para ver mais' }) {
  return (
    <p className="rail-hint">
      {label}
      <ArrowRight size={12} className="animate-pulse" />
    </p>
  )
}
