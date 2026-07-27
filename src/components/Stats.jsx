import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import { Award, Flower2, Quote, Star } from 'lucide-react'
import { RevealGroup, RevealItem } from './Reveal'
import { stats } from '../data/site'

const icons = { Award, Star, Quote, Flower2 }

/**
 * Número animado.
 *
 * Usa `animate()` do framer-motion em vez do react-countup: aquele escreve
 * direto no nó do DOM e o zera na montagem, esperando o gatilho de scroll. Se o
 * gatilho não dispara, o visitante vê "0" no lugar de "5.000". Aqui o React é
 * dono do texto e o estado inicial é o valor FINAL — a animação apenas
 * sobrescreve enquanto acontece.
 */
function StatNumber({ value, decimals = 0, separator = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const [display, setDisplay] = useState(value)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true

    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
      onComplete: () => setDisplay(value),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <span ref={ref}>
      {display.toLocaleString('pt-BR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping: !!separator,
      })}
    </span>
  )
}

/**
 * Faixa de números.
 *
 * Decisões de composição:
 *  · Réguas em degradê no lugar de bordas retas — uma linha que nasce e morre
 *    em transparente parece filete gravado; borda cheia parece tabela.
 *  · Ícone sem cápsula circular, dourado e de traço 1. O círculo tingido é o
 *    reflexo automático de "ícone = bolinha colorida" e pesa a composição.
 *  · O "+" vira volado, em corpo menor e elevado, como em tipografia editorial.
 *  · Grade 2×2 no celular em vez de rolagem lateral: são apenas quatro dados
 *    curtos, e ver tudo de uma vez é mais calmo que precisar arrastar.
 *  · Entressanha larga (0.3em) no rótulo e numeral serifado grande — a
 *    hierarquia sustenta a elegância sem precisar de ornamento.
 */
export default function Stats() {
  return (
    <section className="relative bg-gradient-to-b from-cream via-white to-cream">
      {/* Filetes dourados que se dissolvem nas pontas */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />

      <div className="container-luxe">
        <RevealGroup
          className="grid grid-cols-2 gap-y-10 py-12 sm:gap-y-0 sm:py-14 lg:grid-cols-4 lg:py-16"
          stagger={0.1}
        >
          {stats.map((s, i) => {
            const Icon = icons[s.icon] || Award
            return (
              <RevealItem key={s.label} variant="fadeUp">
                <div className="relative flex flex-col items-center px-2 text-center">
                  {/* Régua vertical em degradê entre as colunas.
                      Some na primeira coluna de cada linha no mobile. */}
                  {i % 2 === 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute -left-px inset-y-2 w-px bg-gradient-to-b from-transparent via-rose-200 to-transparent lg:hidden"
                    />
                  )}
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      className="absolute -left-px inset-y-1 hidden w-px bg-gradient-to-b from-transparent via-rose-200 to-transparent lg:block"
                    />
                  )}

                  {/* Os tons abaixo foram escolhidos medindo contraste, não a
                      olho — a primeira versão desta seção reprovava em quatro
                      pontos (rótulo 2,5:1, sufixo 2,5:1, ícone 2,6:1).
                      Referência: texto normal >= 4,5:1, texto grande >= 3,0:1. */}
                  <Icon size={17} strokeWidth={1} aria-hidden="true" className="mb-4 text-gold-dark" />

                  <p className="font-display text-[34px] leading-none tracking-[-0.01em] text-rose-600 sm:text-[40px] lg:text-[3.15rem]">
                    {s.text ? (
                      s.text
                    ) : (
                      <StatNumber
                        value={s.value}
                        decimals={s.decimals || 0}
                        separator={s.separator || ''}
                      />
                    )}
                    {s.suffix && (
                      <span className="ml-0.5 inline-block -translate-y-[0.45em] text-[0.45em] font-normal text-rose-700">
                        {s.suffix}
                      </span>
                    )}
                  </p>

                  <p className="mt-4 max-w-[128px] text-[9.5px] font-medium uppercase leading-[1.6] tracking-[0.3em] text-ink/65 sm:text-[10px]">
                    {s.label}
                  </p>
                </div>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
