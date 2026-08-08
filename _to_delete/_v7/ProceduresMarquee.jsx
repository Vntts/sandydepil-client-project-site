import { Link } from 'react-router-dom'
import { procedures } from '../data/site'

/**
 * FAIXA CONTÍNUA DE PROCEDIMENTOS — só os nomes.
 *
 * Ocupa o lugar da antiga barra de números, logo abaixo do hero: a primeira
 * coisa depois da dobra é o que a clínica faz.
 *
 * Como o loop funciona: a lista é renderizada duas vezes lado a lado e a
 * trilha desliza até -50% da própria largura. Nesse ponto a segunda cópia está
 * exatamente onde a primeira começou, então o reinício é invisível. A duplicata
 * leva `aria-hidden` e sai da ordem de tabulação — para o leitor de tela existe
 * uma lista só, de nove itens.
 *
 * Passar o mouse pausa: sem isso não dá para clicar num nome em movimento.
 * Com `prefers-reduced-motion` a animação não roda e a faixa continua
 * arrastável com o dedo, via overflow-x.
 */
function Item({ procedure, hidden = false }) {
  return (
    <li className="flex shrink-0 items-center gap-8 sm:gap-12" aria-hidden={hidden || undefined}>
      <Link
        to={`/procedimentos/${procedure.slug}`}
        tabIndex={hidden ? -1 : undefined}
        className="whitespace-nowrap font-display text-[26px] leading-none text-ink transition-colors duration-300 hover:text-rose-600 sm:text-[38px] lg:text-[46px]"
      >
        {procedure.shortName}
      </Link>
      {/* Losango separador — decorativo, fora da árvore de acessibilidade */}
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rotate-45 shrink-0 bg-rose-300 sm:h-2 sm:w-2"
      />
    </li>
  )
}

export default function ProceduresMarquee() {
  return (
    <section
      aria-label="Procedimentos oferecidos"
      className="overflow-hidden border-y border-rose-100 bg-cream py-8 sm:py-12"
    >
      {/* Máscara nas laterais: os nomes surgem e somem em vez de serem cortados
          na borda da tela. `mask-image` e não um retângulo com degradê, para
          funcionar sobre qualquer fundo. */}
      <div className="overflow-x-auto [-webkit-mask-image:linear-gradient(to_right,transparent,#000_3rem,#000_calc(100%-3rem),transparent)] [mask-image:linear-gradient(to_right,transparent,#000_3rem,#000_calc(100%-3rem),transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul className="flex w-max animate-marquee items-center gap-8 pl-8 hover:[animation-play-state:paused] motion-reduce:animate-none sm:gap-12 sm:pl-12">
          {procedures.map((p) => (
            <Item key={p.slug} procedure={p} />
          ))}
          {procedures.map((p) => (
            <Item key={`dup-${p.slug}`} procedure={p} hidden />
          ))}
        </ul>
      </div>
    </section>
  )
}
