import { Link } from 'react-router-dom'
import { ArrowUpRight, Check, Clock } from 'lucide-react'
import SmartImage from './SmartImage'

export default function ProcedureCard({ procedure, compact = false }) {
  return (
    <article className="card-luxe group flex h-full flex-col">
      <Link
        to={`/procedimentos/${procedure.slug}`}
        className="relative block aspect-[16/11] overflow-hidden md:aspect-[4/3]"
      >
        <SmartImage
          src={procedure.image}
          alt={procedure.name}
          label={procedure.shortName}
          kind={procedure.category}
          imgClassName="h-full w-full object-cover transition-transform duration-700 md:group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-70 transition-opacity duration-500 md:group-hover:opacity-90" />
        {procedure.duration && (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium text-ink/70 backdrop-blur">
            <Clock size={10} />
            {procedure.duration}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-display text-[17px] leading-snug text-ink transition-colors duration-300 md:text-lg md:group-hover:text-rose-600">
          <Link to={`/procedimentos/${procedure.slug}`}>{procedure.name}</Link>
        </h3>
        <p className="mt-2 text-[13px] leading-relaxed text-ink/60">{procedure.summary}</p>

        {!compact && (
          <ul className="mt-3.5 space-y-1.5">
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
          className="mt-auto inline-flex items-center gap-1.5 self-start pt-5 text-xs font-medium text-rose-600 transition-all duration-300 md:hover:gap-2.5"
        >
          Ver detalhes
          <ArrowUpRight size={13} />
        </Link>
      </div>
    </article>
  )
}
