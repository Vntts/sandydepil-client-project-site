import { Link } from 'react-router-dom'
import SmartImage from './SmartImage'
import { procedures } from '../data/site'

/**
 * FAIXA CONTÍNUA DE PROCEDIMENTOS
 *
 * Substitui a barra de números que ficava logo abaixo do hero. A ideia é que a
 * primeira coisa depois da dobra já mostre o que a clínica faz, e não uma
 * estatística.
 *
 * Como o loop funciona: a lista é renderizada duas vezes lado a lado e a trilha
 * inteira desliza até -50% da própria largura. Nesse ponto a segunda cópia está
 * exatamente onde a primeira começou, então o reinício da animação é invisível.
 * Por isso a duplicata leva `aria-hidden` — para o leitor de tela existe só uma
 * lista de nove procedimentos.
 *
 * Velocidade: 70s para uma volta completa. É lento de propósito — a faixa é
 * ambiente, não um carrossel que pede atenção. Passar o mouse pausa, para que
 * ninguém precise perseguir um card em movimento para clicar nele.
 *
 * Sem movimento (prefers-reduced-motion) ou em telas pequenas, a faixa continua
 * arrastável com o dedo: a animação para e o overflow-x assume.
 */
function Card({ procedure, hidden = false }) {
  return (
    <li className="w-[210px] shrink-0 sm:w-[250px]" aria-hidden={hidden || undefined}>
      <Link
        to={`/procedimentos/${procedure.slug}`}
        tabIndex={hidden ? -1 : undefined}
        className="group block overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-soft transition-shadow duration-500 hover:shadow-lift"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <SmartImage
            src={procedure.image}
            alt={procedure.name}
            label={procedure.shortName}
            kind={procedure.category}
            imgClassName="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
        </div>
        <div className="px-4 py-3.5">
          <p className="font-display text-[15px] leading-snug text-ink transition-colors duration-300 group-hover:text-rose-600">
            {procedure.shortName}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-luxe text-rose-400">
            {procedure.duration}
          </p>
        </div>
      </Link>
    </li>
  )
}

export default function ProceduresMarquee() {
  return (
    <section className="overflow-hidden bg-soft-fade py-12 sm:py-16" aria-labelledby="faixa-procedimentos">
      <div className="container-luxe">
        <p className="eyebrow">O que fazemos</p>
        <h2
          id="faixa-procedimentos"
          className="mt-2.5 max-w-xl font-display text-[22px] leading-[1.25] text-ink sm:text-[28px]"
        >
          Nove procedimentos, do facial ao corporal
        </h2>
      </div>

      {/* As máscaras laterais fazem os cards surgirem e sumirem em vez de
          serem cortados na borda da tela. */}
      <div className="relative mt-7 sm:mt-9">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-rose-50 to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-rose-100 to-transparent sm:w-24" />

        <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className="flex w-max gap-4 px-5 animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none sm:gap-6 sm:px-8">
            {procedures.map((p) => (
              <Card key={p.slug} procedure={p} />
            ))}
            {procedures.map((p) => (
              <Card key={`dup-${p.slug}`} procedure={p} hidden />
            ))}
          </ul>
        </div>
      </div>

      <div className="container-luxe mt-8">
        <Link
          to="/procedimentos"
          className="text-[13px] font-medium text-rose-600 transition-colors hover:text-rose-700"
        >
          Ver todos os procedimentos →
        </Link>
      </div>
    </section>
  )
}
