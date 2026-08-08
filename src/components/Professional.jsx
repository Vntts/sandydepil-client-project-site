import { BadgeCheck, Quote } from 'lucide-react'
import Reveal from './Reveal'
import { professional, whatsappLink } from '../data/site'

/** Perfil da profissional responsável — reforço de autoridade. */
export default function Professional() {
  return (
    <section id="profissional" className="bg-offwhite py-24 lg:py-32">
      <div className="container-luxe grid items-start gap-14 lg:grid-cols-5 lg:gap-20">
        <Reveal variant="slideRight" className="lg:col-span-2">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift">
              <img
                src={professional.photo}
                alt={`${professional.name} — ${professional.role}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 left-6 right-6 rounded-2xl border border-rose-100 bg-white/95 p-5 shadow-lift backdrop-blur">
              <p className="font-display text-lg text-ink">{professional.name}</p>
              <p className="mt-1 text-[11px] uppercase tracking-luxe text-rose-500">
                {professional.role}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-3">
          <Reveal>
            <p className="eyebrow">Quem atende você</p>
            <div className="hairline mt-4" />
            <h2 className="title-display mt-6">
              A profissional por trás de{' '}
              <span className="italic text-rose-500">cada atendimento</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-ink/70">
              {professional.bio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-9 rounded-2xl border border-rose-100 bg-white p-7">
              <p className="text-[11px] font-medium uppercase tracking-luxe text-rose-500">
                Formação e capacitação
              </p>
              <ul className="mt-4 space-y-3">
                {professional.credentials.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-[14px] text-ink/75">
                    <BadgeCheck size={16} className="mt-0.5 shrink-0 text-rose-400" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <blockquote className="mt-9 flex gap-4 border-l-2 border-rose-300 pl-6">
              <Quote size={20} className="mt-1 shrink-0 text-rose-300" />
              <p className="font-display text-lg italic leading-snug text-ink/80">
                {professional.quote}
              </p>
            </blockquote>
          </Reveal>

          <Reveal delay={0.3}>
            <a
              href={whatsappLink('Olá! Gostaria de conversar sobre um procedimento. 💗')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-9"
            >
              Falar diretamente com a profissional
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
