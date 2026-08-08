import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Star } from 'lucide-react'
import { business, whatsappLink } from '../data/site'

/** Tempo que cada banner fica parado na tela, antes de deslizar para fora. */
const INTERVALO = 8000
/** Duração da passagem de um banner para o outro. */
const TRANSICAO = 0.95
/** Entrada pela direita, saída pela esquerda — a passagem clássica de banner. */
const EASE = [0.65, 0, 0.35, 1]

/**
 * Cada slide carrega o próprio par de imagens, o próprio texto e o próprio
 * `tom`. O tom decide se o texto é escuro sobre véu creme ou claro sobre véu
 * escuro — e isso não é decoração: a primeira foto é rosa pálida e a segunda é
 * uma cena de luz baixa. O mesmo véu nas duas ou apagaria a segunda foto, ou
 * deixaria o texto escuro ilegível sobre ela.
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
    texto: `Clínica de estética em Santa Maria – DF, atendendo o Distrito Federal desde ${business.foundedYear} com milhares de atendimentos e tratamentos personalizados.`,
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
    // Sobre o véu escuro, pílula branca a 70% vira um cinza sujo e o texto rosa
    // dentro dela some. Vidro escuro com texto branco resolve.
    selo: 'border-white/30 bg-white/15 text-white',
    seloNota: 'border-white/25 bg-white/15 text-white/85',
    ghost: 'border-white/45 bg-white/10 text-white md:hover:border-white md:hover:bg-white/20',
    // Foto de luz baixa: escurecer preserva o clima. Clarear lavaria a cena
    // inteira para conseguir o mesmo contraste. O degradê é vertical porque o
    // texto deste slide é centralizado — um lateral deixaria metade da frase
    // sobre a parte clara.
    veuMobile: 'bg-gradient-to-t from-ink/92 via-ink/70 via-55% to-ink/25',
    veuDesktop: 'bg-gradient-to-b from-ink/55 via-ink/62 to-ink/78',
  },
}

/**
 * Todo o conteúdo do banner — selos, título, texto e botões.
 *
 * Ele mora DENTRO da camada que desliza, e não solto sobre a seção. Essa é a
 * diferença que faz a passagem parecer um banner de verdade: o texto sai junto
 * com a própria foto, com a própria cor e o próprio alinhamento. Quando o texto
 * ficava fora, o tom trocava no primeiro quadro da transição e o título do slide
 * que estava saindo virava branco em cima do fundo claro — sumia no ar em vez de
 * deslizar.
 *
 * `medida` renderiza a mesma marcação em fluxo e invisível, só para dar altura
 * à seção: as camadas são absolutas e não empurram nada. Nessa cópia o título
 * vira <p>, para a página não ter um <h1> por slide.
 */
function Conteudo({ slide, medida = false }) {
  const t = tema[slide.tom]
  const centro = Boolean(slide.centralizado)
  const comAcoes = slide.acoes !== false
  const Titulo = medida ? 'p' : 'h1'
  const inerte = medida ? -1 : undefined

  return (
    <div className="container-luxe relative z-10 pb-14 pt-28 md:py-24 lg:py-28">
      <div className={`max-w-3xl ${centro ? 'mx-auto text-center' : ''}`}>
        <div className={`mb-5 flex flex-wrap items-center gap-3 lg:mb-7 ${centro ? 'justify-center' : ''}`}>
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-luxe backdrop-blur-sm sm:text-[11px] ${t.selo}`}
          >
            Santa Maria – DF · desde {business.foundedYear}
          </span>

          <span
            className={`hidden items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[11px] backdrop-blur-sm sm:inline-flex ${t.seloNota}`}
          >
            <span className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={11} className="fill-gold text-gold" />
              ))}
            </span>
            {business.rating.toFixed(1)} · {business.reviewCount} avaliações
          </span>
        </div>

        <Titulo
          className={`font-display text-[34px] font-normal leading-[1.1] sm:text-5xl lg:text-[3.6rem] ${t.titulo}`}
        >
          {slide.titulo}
        </Titulo>

        <p
          className={`mt-5 max-w-lg text-[14.5px] leading-relaxed sm:text-base lg:mt-7 lg:text-lg ${
            centro ? 'mx-auto' : ''
          } ${t.texto}`}
        >
          {slide.texto}
        </p>

        {/* O bloco continua ocupando o espaço mesmo quando o slide não tem
            botões: assim a altura da seção é a mesma nos dois e o título não
            muda de lugar a cada passagem. */}
        <div
          className={`mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4 lg:mt-10 ${
            centro ? 'justify-center' : ''
          } ${comAcoes ? '' : 'pointer-events-none invisible'}`}
          aria-hidden={!comAcoes || medida}
        >
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={comAcoes ? inerte : -1}
            className="btn-primary w-full sm:w-auto sm:!px-8"
          >
            Agendar atendimento
          </a>
          <Link
            to="/procedimentos"
            tabIndex={comAcoes ? inerte : -1}
            className={`inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border px-8 text-sm font-medium tracking-wide backdrop-blur transition-all duration-500 active:scale-[0.98] sm:w-auto ${t.ghost}`}
          >
            Ver procedimentos
          </Link>
        </div>

        {/* Nota do Google no mobile — abaixo dos botões, discreta */}
        <div
          className={`mt-6 flex items-center gap-2 text-[12px] sm:hidden ${
            centro ? 'justify-center' : ''
          } ${t.nota}`}
        >
          <span className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={10} className="fill-gold text-gold" />
            ))}
          </span>
          {business.rating.toFixed(1)} no Google · {business.reviewCount} avaliações
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const [ativo, setAtivo] = useState(0)
  const semMovimento = useReducedMotion()

  useEffect(() => {
    // Com "reduzir movimento" ligado a troca automática não acontece: um
    // carrossel que gira sozinho é exatamente o que essa preferência pede para
    // desligar. Fica o primeiro banner, estático.
    if (semMovimento) return
    const id = setInterval(() => setAtivo((i) => (i + 1) % slides.length), INTERVALO)
    return () => clearInterval(id)
  }, [semMovimento])

  useEffect(() => {
    // Só o banner visível fica montado, então a foto seguinte só seria baixada
    // no instante da troca — e a primeira passagem mostraria um retângulo vazio
    // deslizando. Aquecer o cache aqui resolve, sem poluir o DOM.
    const desktop = window.matchMedia('(min-width: 768px)').matches
    slides.forEach((s) => {
      const img = new Image()
      img.src = desktop ? s.desktop : s.mobile
    })
  }, [])

  const slide = slides[ativo]

  return (
    <section
      id="inicio"
      className="relative flex min-h-[88svh] items-end overflow-hidden bg-cream md:min-h-[92svh] md:items-center"
    >
      {/* ==========================================================
          O BANNER INTEIRO — foto, véu e conteúdo — entra pela direita
          empurrando o anterior para fora pela esquerda.

          `initial={false}` no AnimatePresence evita que o primeiro banner entre
          deslizando no carregamento da página: ele já começa no lugar, o que
          também não atrasa o LCP.

          Cada slide tem duas fontes: o <source> assume a partir de 768px, então
          o celular nunca baixa a imagem de desktop. Caminhos sempre com barra
          inicial — arquivos em /public são servidos a partir da raiz.
          ========================================================== */}
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.id}
          className="absolute inset-0 flex items-end md:items-center"
          initial={semMovimento ? false : { x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: TRANSICAO, ease: EASE }}
        >
          {/* Zoom lento durante a permanência, num elemento à parte: no mesmo nó
              do deslocamento as duas transformações disputariam a mesma
              propriedade. */}
          <motion.div
            className="absolute inset-0"
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

          <div className={`absolute inset-0 md:hidden ${tema[slide.tom].veuMobile}`} />
          <div className={`absolute inset-0 hidden md:block ${tema[slide.tom].veuDesktop}`} />

          <Conteudo slide={slide} />
        </motion.div>
      </AnimatePresence>

      {/* Régua de altura: as camadas acima são absolutas e não empurram nada, e
          sem isso a seção só teria o min-height — num celular em paisagem, ou
          com fonte aumentada, o texto vazaria para fora. Esta cópia fica em
          fluxo, invisível, e as duas versões empilhadas dão a altura da maior. */}
      <div className="invisible grid w-full" aria-hidden="true">
        {slides.map((s) => (
          <div key={`medida-${s.id}`} className="[grid-area:1/1]">
            <Conteudo slide={s} medida />
          </div>
        ))}
      </div>
    </section>
  )
}
