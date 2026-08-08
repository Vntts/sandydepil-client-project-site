import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Star } from 'lucide-react'
import { business, whatsappLink } from '../data/site'

const INTERVALO = 5000

/**
 * Cada slide carrega o próprio par de imagens, o próprio texto e o próprio
 * `tom`. O tom é o que decide se o texto é escuro sobre véu creme ou claro
 * sobre véu escuro — e isso não é decoração: a primeira foto é rosa pálida e a
 * segunda é uma cena de luz baixa. Aplicar o mesmo véu claro nas duas ou
 * apagaria a segunda foto inteira, ou deixaria o texto escuro ilegível sobre
 * ela.
 *
 * `posicao` controla o recorte. A foto do spa é horizontal (1536×1024); numa
 * tela de celular ela é cortada nas laterais, por isso o object-center mantém o
 * rosto e as velas no enquadramento.
 */
const slides = [
  {
    id: 'beleza',
    tom: 'claro',
    mobile: '/banner_mobile.webp',
    desktop: '/hero_woman.webp',
    largura: 941,
    altura: 1672,
    posicao: 'object-right-top md:object-center',
    alt: 'Mulher com a pele cuidada, tocando o rosto',
    titulo: (
      <>
        Sua beleza natural merece <span className="italic text-rose-500">cuidado, técnica</span> e
        atenção especial.
      </>
    ),
    texto: `Mais de ${business.yearsOfExperience} anos e milhares de atendimentos, com tratamentos estéticos personalizados.`,
  },
  {
    id: 'spa',
    tom: 'escuro',
    mobile: '/Relaxamente-spa.webp',
    desktop: '/Relaxamente-spa.webp',
    largura: 1536,
    altura: 1024,
    // No celular a foto horizontal é cortada nas laterais; 30% mantém o rosto
    // no enquadramento em vez de deixar só ombro e toalha.
    posicao: 'object-[30%_50%] md:object-center',
    alt: 'Cliente deitada na maca em ambiente de luz baixa, com velas, pedras quentes e óleo essencial',
    titulo: (
      <>
        Um tempo <span className="italic text-rose-300">só seu</span>, do começo ao fim do
        atendimento.
      </>
    ),
    texto:
      'Ambiente reservado, higiene sem concessões e o tempo que cada procedimento pede — sem pressa e sem espera.',
    // Slide de atmosfera: texto centralizado e sem botões. Os CTAs continuam a
    // um giro de distância, no slide 1, e o WhatsApp flutuante nunca sai da
    // tela — então nada de conversão se perde aqui.
    centralizado: true,
    acoes: false,
  },
]

const tema = {
  claro: {
    titulo: 'text-ink',
    texto: 'text-ink/70',
    nota: 'text-ink/70',
    selo: 'border-rose-200 bg-white/70 text-rose-600',
    seloNota: 'border-rose-100 bg-white/70 text-ink/70',
    ghost:
      'border-rose-300/70 bg-white/60 text-rose-600 md:hover:border-rose-400 md:hover:bg-white md:hover:text-rose-700',
    // Véu creme: no celular sobe de baixo, onde fica o texto; no desktop entra
    // pela esquerda, sobre a área vazia da foto.
    veuMobile: 'bg-gradient-to-t from-cream via-cream/85 via-50% to-transparent',
    veuDesktop: 'bg-gradient-to-r from-cream/70 via-cream/25 via-50% to-transparent',
  },
  escuro: {
    titulo: 'text-white',
    texto: 'text-white/75',
    nota: 'text-white/75',
    // Sobre o véu escuro, pílula branca a 70% vira um cinza sujo e o texto
    // rosa dentro dela some. Vidro escuro com texto branco resolve.
    selo: 'border-white/30 bg-white/15 text-white',
    seloNota: 'border-white/25 bg-white/15 text-white/85',
    ghost: 'border-white/45 bg-white/10 text-white md:hover:border-white md:hover:bg-white/20',
    // Foto de luz baixa: escurecer preserva o clima da imagem. Clarear com véu
    // creme lavaria a cena inteira para conseguir o mesmo contraste.
    veuMobile: 'bg-gradient-to-t from-ink/92 via-ink/70 via-55% to-ink/25',
    veuDesktop: 'bg-gradient-to-b from-ink/55 via-ink/62 to-ink/78',
  },
}

const classeTitulo =
  'font-display text-[34px] font-normal leading-[1.1] sm:text-5xl lg:text-[3.6rem]'
const classeTexto = 'max-w-lg text-[14.5px] leading-relaxed sm:text-base lg:text-lg'
const classeTextoCentro = `${classeTexto} mx-auto`

export default function Hero() {
  const [ativo, setAtivo] = useState(0)
  const semMovimento = useReducedMotion()

  useEffect(() => {
    // Com "reduzir movimento" ligado a troca automática não acontece: um
    // carrossel que gira sozinho é exatamente o que essa preferência pede para
    // desligar. Fica o primeiro slide, estático.
    if (semMovimento) return
    const id = setInterval(() => setAtivo((i) => (i + 1) % slides.length), INTERVALO)
    return () => clearInterval(id)
  }, [semMovimento])

  const slide = slides[ativo]
  const t = tema[slide.tom]
  const centro = Boolean(slide.centralizado)
  const comAcoes = slide.acoes !== false

  return (
    <section
      id="inicio"
      className="relative flex min-h-[88svh] items-end overflow-hidden bg-cream md:min-h-[92svh] md:items-center"
    >
      {/* ==========================================================
          MÍDIA DE FUNDO

          Todos os slides ficam montados o tempo todo e a troca é só opacidade —
          nada de montar/desmontar <img>, que causaria um piscar branco na
          primeira volta enquanto o arquivo baixa.

          Cada slide tem duas fontes: o <source> assume a partir de 768px, então
          o celular nunca baixa a imagem de desktop. Caminhos sempre com barra
          inicial — arquivos em /public são servidos a partir da raiz.
          ========================================================== */}
      {slides.map((s, i) => {
        const visivel = i === ativo
        return (
          <motion.div
            key={s.id}
            className="absolute inset-0"
            aria-hidden={!visivel}
            initial={false}
            animate={{ opacity: visivel ? 1 : 0, scale: visivel && !semMovimento ? 1 : 1.06 }}
            transition={{
              opacity: { duration: 1.2, ease: 'easeInOut' },
              scale: { duration: 8, ease: 'easeOut' },
            }}
          >
            <picture className="block h-full w-full">
              <source media="(min-width: 768px)" srcSet={s.desktop} />
              <img
                src={s.mobile}
                alt={visivel ? s.alt : ''}
                width={s.largura}
                height={s.altura}
                loading="eager"
                // Só a primeira imagem disputa prioridade: ela é o LCP. A
                // segunda só aparece aos 5s, então baixa depois.
                fetchPriority={i === 0 ? 'high' : 'low'}
                className={`h-full w-full object-cover ${s.posicao}`}
              />
            </picture>

            {/* Véu do próprio slide: crossfade junto com a foto */}
            <div className={`absolute inset-0 md:hidden ${tema[s.tom].veuMobile}`} />
            <div className={`absolute inset-0 hidden md:block ${tema[s.tom].veuDesktop}`} />
          </motion.div>
        )
      })}

      <div className="container-luxe relative z-10 pb-14 pt-28 md:py-24 lg:py-28">
        <div
          className={`max-w-3xl transition-all duration-700 ${centro ? 'mx-auto text-center' : ''}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={`mb-5 flex flex-wrap items-center gap-3 lg:mb-7 ${centro ? 'justify-center' : ''}`}
          >
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-luxe backdrop-blur-sm transition-colors duration-700 sm:text-[11px] ${t.selo}`}
            >
              Santa Maria – DF · desde {business.foundedYear}
            </span>

            <span
              className={`hidden items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[11px] backdrop-blur-sm transition-colors duration-700 sm:inline-flex ${t.seloNota}`}
            >
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={11} className="fill-gold text-gold" />
                ))}
              </span>
              {business.rating.toFixed(1)} · {business.reviewCount} avaliações
            </span>
          </motion.div>

          {/* ==========================================================
              TÍTULO E TEXTO

              Cada bloco é uma grade de uma célula só. As cópias `invisible`
              reservam a altura do maior texto — `visibility: hidden` mantém a
              caixa e some da árvore de acessibilidade. Sem isso, títulos de
              alturas diferentes empurrariam os botões para cima e para baixo a
              cada 5 segundos.

              O <h1> em si nunca é desmontado: só o conteúdo dele troca. Assim a
              página tem um <h1> só, e não um por slide.
              ========================================================== */}
          <div className="grid">
            {slides.map((s) => (
              <p key={`h-${s.id}`} className={`invisible [grid-area:1/1] ${classeTitulo}`}>
                {s.titulo}
              </p>
            ))}
            <h1 className={`[grid-area:1/1] transition-colors duration-700 ${classeTitulo} ${t.titulo}`}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={slide.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  {slide.titulo}
                </motion.span>
              </AnimatePresence>
            </h1>
          </div>

          <div className="mt-5 grid lg:mt-7">
            {slides.map((s) => (
              <p key={`p-${s.id}`} className={`invisible [grid-area:1/1] ${s.centralizado ? classeTextoCentro : classeTexto}`}>
                {s.texto}
              </p>
            ))}
            <p className={`[grid-area:1/1] transition-colors duration-700 ${centro ? classeTextoCentro : classeTexto} ${t.texto}`}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={slide.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  {slide.texto}
                </motion.span>
              </AnimatePresence>
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className={`mt-8 flex flex-col gap-3 transition-opacity duration-500 sm:flex-row sm:gap-4 lg:mt-10 ${
              centro ? 'justify-center' : ''
            } ${comAcoes ? '' : 'pointer-events-none opacity-0'}`}
            aria-hidden={!comAcoes}
          >
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={comAcoes ? undefined : -1}
              className="btn-primary w-full sm:w-auto sm:!px-8"
            >
              Agendar atendimento
            </a>
            <Link
              to="/procedimentos"
              tabIndex={comAcoes ? undefined : -1}
              className={`inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border px-8 text-sm font-medium tracking-wide backdrop-blur transition-all duration-500 active:scale-[0.98] sm:w-auto ${t.ghost}`}
            >
              Ver procedimentos
            </Link>
          </motion.div>

          {/* Nota do Google no mobile — abaixo dos botões, discreta */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className={`mt-6 flex items-center gap-2 text-[12px] transition-colors duration-700 sm:hidden ${
              centro ? 'justify-center' : ''
            } ${t.nota}`}
          >
            <span className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={10} className="fill-gold text-gold" />
              ))}
            </span>
            {business.rating.toFixed(1)} no Google · {business.reviewCount} avaliações
          </motion.div>
        </div>
      </div>
    </section>
  )
}
