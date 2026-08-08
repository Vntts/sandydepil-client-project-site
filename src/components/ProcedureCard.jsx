import { Link } from 'react-router-dom'
import { ArrowUpRight, Check, Clock } from 'lucide-react'

export default function ProcedureCard({ procedure, compact = false }) {
  return (
    <article className="card-luxe group flex h-full flex-col p-7 md:p-8">
      {procedure.duration && (
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50/70 px-3 py-1 text-[11px] font-medium tracking-wide text-rose-600">
          <Clock size={11} />
          {procedure.duration}
        </span>
      )}

      <h3 className="mt-5 font-display text-[19px] leading-snug text-ink transition-colors duration-300 md:text-xl md:group-hover:text-rose-600">
        <Link to={`/procedimentos/${procedure.slug}`}>{procedure.name}</Link>
      </h3>

      <div className="hairline mt-3" />

      <p className="mt-4 text-[13.5px] leading-relaxed text-ink/60">{procedure.summary}</p>

      {!compact && (
        <ul className="mt-4 space-y-1.5">
          {procedure.benefits.slice(0, 3).map((b) => (
            <li key={b} className="flex items-start gap-2 text-[12.5px] text-ink/70">
              <Check size={12} className="mt-0.5 shrink-0 text-rose-400" />
              {b}
            </li>
          ))}
        </ul>
      )}

      <Link
        to={`/procedimentos/${procedure.slug}`}
        className="mt-auto inline-flex items-center gap-1.5 self-start pt-6 text-xs font-medium text-rose-600 transition-all duration-300 md:hover:gap-2.5"
      >
        Ver detalhes
        <ArrowUpRight size={13} />
      </Link>
    </article>
  )
}
