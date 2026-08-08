import { Link } from 'react-router-dom'
import { procedures } from '../data/site'

/**
 * FAIXA CONTÍNUA DE PROCEDIMENTOS
 *
 * Ocupa o lugar da antiga barra de números, logo abaixo do hero. É um elemento
 * de ambiente, não um chamariz: caixa alta pequena, peso normal e tom apagado,
 * mais perto de uma legenda do que de um título. Quem quiser ler, lê; quem não
 * quiser, o olho passa direto para o conteúdo abaixo.
 *
 * A animação vive em src/index.css (`.marquee-track`), não no tailwind.config —
 * mudança em config só vale depois de reiniciar o servidor de dev, e nesse meio
 * tempo a faixa fica parada como se estivesse quebrada.
 *
 * Como o loop fica infinito de verdade: a lista é renderizada duas vezes lado a
 * lado e a trilha desliza até -50% da própria largura, ponto em que a segunda
 * cópia está exatamente onde a primeira começou.
 *
 * Para isso as duas metades precisam ter largura idêntica. Por isso o
 * espaçamento mora dentro de cada item (`pr`) e não num `gap` do <ul>: com
 * `gap`, 18 itens têm 17 intervalos, a metade cai no meio de um deles e sobra
 * meio intervalo — na prática, um salto a cada volta.
 *
 * A duplicata leva `aria-hidden` e sai da ordem de tabulação: para o leitor de
 * tela existe uma lista só, de nove itens.
 */
function Item({ procedure, hidden = false }) {
  return (
    <li className="flex shrink-0 items-center gap-5 pr-5 sm:gap-7 sm:pr-7" aria-hidden={hidden || undefined}>
      <Link
        to={`/procedimentos/${procedure.slug}`}
        tabIndex={hidden ? -1 : undefined}
        className="whitespace-nowrap text-[10.5px] font-medium uppercase leading-none tracking-luxe text-ink/40 transition-colors duration-300 hover:text-rose-500 sm:text-[11px]"
      >
        {procedure.shortName}
      </Link>
      {/* Ponto separador — decorativo, fora da árvore de acessibilidade */}
      <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-rose-200" />
    </li>
  )
}

export default function ProceduresMarquee() {
  return (
    <section
      aria-label="Procedimentos oferecidos"
      className="overflow-hidden border-b border-rose-100/70 bg-cream py-3.5 sm:py-4"
    >
      {/* Máscara nas laterais: os nomes surgem e somem em vez de serem cortados
          na borda. `mask-image` e não um retângulo com degradê, para funcionar
          sobre qualquer fundo. */}
      <div className="overflow-x-auto [-webkit-mask-image:linear-gradient(to_right,transparent,#000_4rem,#000_calc(100%-4rem),transparent)] [mask-image:linear-gradient(to_right,transparent,#000_4rem,#000_calc(100%-4rem),transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul className="marquee-track flex w-max items-center">
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
