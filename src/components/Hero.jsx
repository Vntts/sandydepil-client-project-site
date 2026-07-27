import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { business, whatsappLink } from '../data/site'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

/**
 * HERO — tema claro.
 *
 * A versão anterior cobria a foto com um gradiente escuro (ink/85) para dar
 * contraste ao texto branco. Com uma imagem rosa pálida isso apagava a
 * delicadeza da foto e criava uma mancha visível na transição.
 *
 * Agora o texto é escuro e se apoia na própria área clara da imagem — que é
 * exatamente para isso que a foto foi composta, com o rosto à direita e espaço
 * vazio à esquerda. No lugar do escurecimento entra um véu claro (creme) que
 * uniformiza o fundo sob o texto sem alterar o tom da imagem.
 */
export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[88svh] items-end overflow-hidden bg-cream md:min-h-[92svh] md:items-center"
    >
      {/* ==========================================================
          MÍDIA DE FUNDO — duas imagens, uma por formato de tela.
          O <img> traz a versão vertical (celular) e o <source> substitui pela
          panorâmica a partir de 768px — nessa ordem, o celular nunca baixa a
          imagem de desktop.

          Caminhos sempre com barra inicial: arquivos em /public são servidos a
          partir da raiz, então public/banner_mobile.webp vira
          /banner_mobile.webp. Sem a barra o caminho fica relativo à rota atual.

          object-right-top mantém o rosto inteiro: a imagem vertical é
          proporcionalmente mais larga que a tela do celular, então o recorte
          tira as sobras da esquerda em vez de cortar o rosto.

          TODO: para vídeo, coloque /public/videos/hero.mp4 e troque o <picture>
          por:
          <video className="h-full w-full object-cover" src="/videos/hero.mp4"
            poster="/banner_mobile.webp" autoPlay muted loop playsInline />
          ========================================================== */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 9, ease: 'easeOut' }}
      >
        <picture className="block h-full w-full">
          <source media="(min-width: 768px)" srcSet="/hero_woman.webp" />
          <img
            src="/banner_mobile.webp"
            alt="Mulher com a pele cuidada, tocando o rosto"
            width={941}
            height={1672}
            className="h-full w-full object-cover object-right-top md:object-center"
            loading="eager"
          />
        </picture>
      </motion.div>

      {/* Véu claro em vez de escurecimento.
          Mobile: sobe de baixo, onde fica o texto.
          Desktop: entra pela esquerda, sobre a área vazia da foto.
          Fica quase imperceptível na imagem e garante que o texto escuro tenha
          um fundo uniforme mesmo se a foto for trocada por uma mais movimentada. */}
      {/* Os valores destes gradientes não são estéticos por acaso: foram
          calibrados medindo o contraste do texto contra os pixels reais da foto
          (pior caso, percentil 5). No mobile o texto cai sobre o ombro e a mão,
          que são tons de pele mais escuros — daí o véu mais forte aqui do que
          no desktop, onde o texto se apoia no fundo liso da imagem.
          Se você trocar as fotos, vale reavaliar. */}
      <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/85 via-50% to-transparent md:hidden" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-cream/70 via-cream/25 via-50% to-transparent md:block" />

      <div className="container-luxe relative z-10 pb-14 pt-28 md:py-24 lg:py-28">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
          <motion.div variants={item} className="mb-5 flex flex-wrap items-center gap-3 lg:mb-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/70 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-luxe text-rose-600 backdrop-blur-sm sm:text-[11px]">
              Santa Maria – DF · desde {business.foundedYear}
            </span>

            <span className="hidden items-center gap-1.5 rounded-full border border-rose-100 bg-white/70 px-3.5 py-1.5 text-[11px] text-ink/70 backdrop-blur-sm sm:inline-flex">
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={11} className="fill-gold text-gold" />
                ))}
              </span>
              {business.rating.toFixed(1)} · {business.reviewCount} avaliações
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display text-[34px] font-normal leading-[1.1] text-ink sm:text-5xl lg:text-[3.6rem]"
          >
            Sua beleza natural merece{' '}
            <span className="italic text-rose-500">cuidado, técnica</span> e atenção especial.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-lg text-[14.5px] leading-relaxed text-ink/70 sm:text-base lg:mt-7 lg:text-lg"
          >
            Mais de {business.yearsOfExperience} anos e milhares de atendimentos, com tratamentos
            estéticos personalizados.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4 lg:mt-10">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto sm:!px-8"
            >
              Agendar atendimento
            </a>
            <Link
              to="/procedimentos"
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-rose-300/70 bg-white/60 px-8 text-sm font-medium tracking-wide text-rose-600 backdrop-blur transition-all duration-300 active:scale-[0.98] md:hover:border-rose-400 md:hover:bg-white md:hover:text-rose-700 sm:w-auto"
            >
              Ver procedimentos
            </Link>
          </motion.div>

          {/* Nota do Google no mobile — abaixo dos botões, discreta */}
          <motion.div
            variants={item}
            className="mt-6 flex items-center gap-2 text-[12px] text-ink/70 sm:hidden"
          >
            <span className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={10} className="fill-gold text-gold" />
              ))}
            </span>
            {business.rating.toFixed(1)} no Google · {business.reviewCount} avaliações
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
