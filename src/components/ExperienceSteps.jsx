import Reveal, { RevealGroup, RevealItem } from './Reveal'
import { experienceSteps } from '../data/site'

/**
 * Passo a passo do atendimento.
 * Era uma grade de 5 cards iguais — no celular, cinco caixas empilhadas.
 * Agora é uma lista com trilho vertical, que lê como sequência de verdade.
 */
export default function ExperienceSteps() {
  return (
    <section className="bg-cream section-y">
      <div className="container-luxe grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="eyebrow">A experiência</p>
            <h2 className="mt-3 font-display text-[26px] leading-[1.2] text-ink sm:text-4xl">
              Como funciona o seu atendimento
            </h2>
            <p className="mt-5 text-[14.5px] leading-relaxed text-ink/65">
              Do primeiro contato ao acompanhamento depois — nenhuma etapa é improvisada.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <RevealGroup className="relative" stagger={0.09}>
            {/* Trilho */}
            <span
              aria-hidden="true"
              className="absolute bottom-6 left-[13px] top-3 w-px bg-gradient-to-b from-rose-300 via-rose-200 to-transparent"
            />

            {experienceSteps.map((s) => (
              <RevealItem key={s.step} variant="fadeUp" className="relative pl-11 pb-8 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full border border-rose-200 bg-cream text-[10px] font-medium text-rose-500"
                >
                  {s.step}
                </span>
                <h3 className="font-display text-[17px] leading-snug text-ink sm:text-lg">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink/60">{s.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}
