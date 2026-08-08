import {
  Award,
  Crown,
  Gem,
  HeartHandshake,
  Leaf,
  Sparkles,
  ShieldCheck,
  Star,
} from 'lucide-react'
import Reveal, { RevealGroup, RevealItem } from './Reveal'
import { business, credentials, differentials } from '../data/site'

const icons = {
  HeartHandshake,
  Sparkles,
  Award,
  ShieldCheck,
  Leaf,
  Crown,
  Star,
  Gem,
}

/**
 * Substitui CredentialsBar + Differentials, que eram duas seções com
 * estrutura idêntica (ícone circular + título + texto) aparecendo na mesma
 * página. Agora é um bloco só, em layout assimétrico: coluna de texto à
 * esquerda com os selos, lista numerada à direita.
 */
export default function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-offwhite section-y">
      <div className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-rose-100/70 blur-[100px]" />

      <div className="container-luxe relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Coluna esquerda — argumento + selos */}
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">Por que a Sandydepil</p>
            <h2 className="mt-3 font-display text-[26px] leading-[1.2] text-ink sm:text-4xl">
              {business.yearsOfExperience} anos no mesmo bairro dizem mais que qualquer promessa.
            </h2>
            <p className="mt-5 text-[14.5px] leading-relaxed text-ink/65">
              Negócio de estética que atravessa uma década em Santa Maria – DF não sobrevive de
              publicidade. Sobrevive de cliente que volta e de cliente que indica.
            </p>
          </Reveal>

          {/* Selos — agora compactos, em linha, não mais cards */}
          <RevealGroup className="mt-9 grid gap-x-6 gap-y-5 sm:grid-cols-2" stagger={0.07}>
            {credentials.map((c) => {
              const Icon = icons[c.icon] || Award
              return (
                <RevealItem key={c.label}>
                  <div className="flex gap-3">
                    <Icon size={17} strokeWidth={1.7} className="mt-0.5 shrink-0 text-rose-400" />
                    <div>
                      <p className="text-[13px] font-medium leading-snug text-ink">{c.label}</p>
                      <p className="mt-0.5 text-[12px] leading-relaxed text-ink/45">{c.detail}</p>
                    </div>
                  </div>
                </RevealItem>
              )
            })}
          </RevealGroup>
        </div>

        {/* Coluna direita — lista numerada, sem cards */}
        <div className="lg:col-span-7">
          <RevealGroup className="divide-y divide-rose-100 border-t border-rose-100" stagger={0.08}>
            {differentials.map((d, i) => {
              const Icon = icons[d.icon] || Sparkles
              return (
                <RevealItem key={d.title}>
                  <div className="group flex gap-4 py-5 sm:gap-6 sm:py-6">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 w-6 shrink-0 font-display text-lg text-rose-300 transition-colors duration-300 group-hover:text-rose-500"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2.5">
                        <Icon size={15} strokeWidth={1.8} className="shrink-0 text-rose-400" />
                        <h3 className="font-display text-[17px] leading-snug text-ink sm:text-lg">
                          {d.title}
                        </h3>
                      </div>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-ink/60">{d.text}</p>
                    </div>
                  </div>
                </RevealItem>
              )
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}
