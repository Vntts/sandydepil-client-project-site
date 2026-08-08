import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Star } from 'lucide-react'
import { business, whatsappLink } from '../data/site'

/** Tempo que cada banner fica parado na tela, antes de deslizar para fora. */
const INTERVALO = 8000
/** Duração da passagem de um banner para o outro. */
const TRANSICAO = 0.95

/**
 * Cada slide carrega o próprio par de imagens, o próprio texto e o próprio
 * `tom`. O tom é o que decide se o texto é escuro sobre véu creme ou claro
 * sobre véu escuro — e isso não é decoração: a primeira foto é rosa pálida e a
 * segunda é uma cena de luz baixa. Aplicar o mesmo véu claro nas duas ou
 * apagaria a segunda foto inteira, ou deixaria o texto escuro ilegível sobre
 * ela.
 *
 * `posicao` controla o recorte. A foto do spa é horizontal (1536×1024); numa
 * tela de celular ela é cortada nas laterais, por isso o deslocamento para 30%
 * mantém o rosto no enquadramento em vez de deixar só ombro e toalha.
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
    // creme lavaria a cena inteira para conseguir o mesmo contraste. O degradê
    // é vertical porque o texto deste slide é centralizado — um degradê lateral
    // deixaria metade da frase sobre a parte clara.
    veuMobile: 'bg-gradient-to-t from-ink/92 via-ink/70 via-55% to-ink/25',
    veuDesktop: 'bg-gradient-to-b from-ink/55 via-ink/62 to-ink/78',
  },
}

const classeTitulo =
  'font-display text-[34px] font-normal leading-[1.1] sm:text-5xl lg:text-[3.6rem]'
const classeTexto = 'max-w-lg text-[14.5px] leading-relaxed sm:text-base lg:text-lg'
const classeTextoCentro = `${classeTexto} mx-auto`

/** Entrada pela direita, saída pela esquerda — a passagem clássica de banner. */
const passagem = {
  entra: { x: '100%' },
  fica: { x: 0 },
  sai: { x: '-100%' },
}
const easeBanner = [0.65, 0, 0.35, 1]

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

  useEffect(() => {
    // Só o slide visível fica montado, então a foto seguinte só seria baixada
    // no instante da troca — e a primeira passagem mostraria um retângulo vazio
    // deslizando. Aquecer o cache aqui resolve, sem poluir o DOM.
    const desktop = window.matchMedia('(min-width: 768px)').matches
    slides.forEach((s) => {
      const img = new Image()
      img.src = desktop ? s.desktop : s.mobile
    })
  }, [])

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

          A foto e o véu dela viajam juntos: o banner inteiro entra pela direita
          empurrando o anterior para fora pela esquerda. Por isso o véu mora
          dentro do slide, e não solto sobre a seção.

          `initial={false}` no AnimatePresence evita que o primeiro banner entre
          deslizando no carregamento da página — ele já começa no lugar.

          Cada slide tem duas fontes: o <source> assume a partir de 768px, então
          o celular nunca baixa a imagem de desktop. Caminhos sempre com barra
          inicial — arquivos em /public são servidos a partir da raiz.
          ========================================================== */}
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          initial={semMovimento ? false : passagem.entra}
          animate={passagem.fica}
          exit={passagem.sai}
          transition={{ duration: TRANSICAO, ease: easeBanner }}
        >
          {/* Zoom lento durante a permanência, num elemento à parte: se
              estivesse no mesmo nó do deslocamento, as duas transformações
              disputariam a mesma propriedade. */}
          <motion.div
            className="h-full w-full"
            initial={{ scale: semMovimento ? 1 : 1.07 }}
            animate={{ scale: 1 }}
            transition={{ duration: INTERVALO / 1000 + TRANSICAO, ease: 'linear' }}
          >
            <picture className="block h-full w-full">
              <source media="(min-width: 768px)" srcSet={slide.desktop} />
              <img
                src={slide.mobile}
                alt={slide.alt}
                width={slide.largura}
                height={slide.altura}
                loading="eager"
                fetchPriority={ativo === 0 ? 'high' : 'low'}
                className={`h-full w-full object-cover ${slide.posicao}`}
              />
            </picture>
          </motion.div>

          <div className={`absolute inset-0 md:hidden ${t.veuMobile}`} />
          <div className={`absolute inset-0 hidden md:block ${t.veuDesktop}`} />
        </motion.div>
      </AnimatePresence>

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
              alturas diferentes empurrariam o resto para cima e para baixo a
              cada troca.

              O <h1> em si nunca é desmontado: só o conteúdo dele troca. Assim a
              página tem um <h1> só, e não um por slide. O texto acompanha o
              sentido da passagem — entra pela direita, sai pela esquerda.
              ========================================================== */}
          <div className="grid">
            {slides.map((s) => (
              <p key={`h-${s.id}`} className={`invisible [grid-area:1/1] ${classeTitulo}`}>
                {s.titulo}
              </p>
            ))}
            <h1
              className={`[grid-area:1/1] transition-colors duration-700 ${classeTitulo} ${t.titulo}`}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={slide.id}
                  initial={{ opacity: 0, x: 44 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -44 }}
                  transition={{ duration: 0.55, ease: easeBanner }}
                  className="block"
                >
                  {slide.titulo}
                </motion.span>
              </AnimatePresence>
            </h1>
          </div>

          <div className="mt-5 grid lg:mt-7">
            {slides.map((s) => (
              <p
                key={`p-${s.id}`}
                className={`invisible [grid-area:1/1] ${s.centralizado ? classeTextoCentro : classeTexto}`}
              >
                {s.texto}
              </p>
            ))}
            <p
              className={`[grid-area:1/1] transition-colors duration-700 ${centro ? classeTextoCentro : classeTexto} ${t.texto}`}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={slide.id}
                  initial={{ opacity: 0, x: 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -32 }}
                  transition={{ duration: 0.55, delay: 0.06, ease: easeBanner }}
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
            className="mt-8 lg:mt-10"
          >
            {/* O bloco continua ocupando o espaço mesmo escondido: sem isso o
                título subiria e desceria a cada troca. A visibilidade fica num
                invólucro comum porque o framer escreve `opacity` inline no
                elemento que anima, e inline vence a classe do Tailwind. */}
            <div
              className={`flex flex-col gap-3 transition-opacity duration-500 sm:flex-row sm:gap-4 ${
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
            </div>
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
