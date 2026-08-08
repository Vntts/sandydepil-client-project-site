import { Link } from 'react-router-dom'
import { ArrowRight, Quote } from 'lucide-react'
import Reveal from './Reveal'
import { business, professional } from '../data/site'

/**
 * Apresentação da clínica na home.
 *
 * Proporções da grade: o texto ocupa 5 de 12 colunas e a imagem 7. Antes eram
 * 6 e 6 com um vão de 80px, o que deixava a foto do mesmo tamanho do bloco de
 * texto — e a foto é o ativo mais forte desta seção.
 *
 * A moldura usa proporção ~1:1 porque o arquivo é 2048×1888 (quase quadrado).
 * Na versão anterior ela estava em 4:5, e o object-cover descartava cerca de
 * 20% da largura — cortava a luminária de anel à direita e parte do ambiente.
 */
export default function AboutPreview() {
  return (
    <section id="destaques" className="relative overflow-hidden bg-cream section-y">
      <div className="pointer-events-none absolute -right-24 top-24 hidden h-80 w-80 rounded-full bg-rose-100/60 blur-[100px] lg:block" />

      <div className="container-luxe grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Imagem */}
        <Reveal variant="fadeUp" className="relative lg:order-2 lg:col-span-7">
          {/* Antes a foto avançava 64px além do container no 2xl. Removido: com
              o cartão de citação agora ancorado à direita, o transbordo deslocava
              os dois de forma diferente em cada largura de tela. Sem ele, a borda
              direita da foto coincide com a da grade em qualquer resolução e o
              recuo do cartão fica previsível. */}
          <div className="relative aspect-[16/11] overflow-hidden rounded-2xl shadow-lift sm:aspect-[4/3] lg:aspect-square lg:rounded-[2rem]">
            <img
              src="/atendimento.webp"
              alt="Sandra Ventura realizando um atendimento estético na clínica Sandydepil"
              width={2048}
              height={1888}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            {/* Vinheta muito leve na base: assenta a foto e dá contraste ao
                cartão de citação que a sobrepõe */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink/15 to-transparent"
            />
          </div>

          {/* Cartão de citação.
              No celular entra no fluxo, abaixo da foto. No desktop flutua sobre
              a quina inferior direita, com um leve transbordo (-right-8) que cabe
              dentro do respiro lateral do container em qualquer breakpoint. */}
          <figure className="relative -mt-6 mx-4 rounded-2xl border border-rose-100 bg-white/95 p-5 shadow-lift backdrop-blur sm:mx-8 lg:absolute lg:-bottom-7 lg:-right-8 lg:mx-0 lg:mt-0 lg:w-[19rem] lg:p-6">
            <Quote size={17} strokeWidth={1.25} aria-hidden="true" className="text-gold-dark" />

            <blockquote className="mt-2.5 font-display text-[14.5px] italic leading-relaxed text-ink/85 lg:text-[15px]">
              Cada cliente é única — e o atendimento também deve ser.
            </blockquote>

            <figcaption className="mt-4 flex items-center gap-3 border-t border-rose-100 pt-4">
              <span aria-hidden="true" className="h-px w-5 shrink-0 bg-gold" />
              <span>
                <span className="block text-[12px] font-medium leading-snug text-ink">
                  {professional.name}
                </span>
                <span className="block text-[9.5px] uppercase tracking-[0.22em] text-ink/65">
                  Fundadora
                </span>
              </span>
            </figcaption>
          </figure>
        </Reveal>

        {/* Texto */}
        <div className="lg:order-1 lg:col-span-5">
          <Reveal>
            <p className="eyebrow">Sobre</p>
            <h2 className="mt-3 font-display text-[26px] leading-[1.2] text-ink sm:text-4xl lg:text-[2.5rem]">
              {business.yearsOfExperience} anos construídos com técnica e acolhimento
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-5 space-y-4 text-[14.5px] leading-relaxed text-ink/70 lg:mt-7 lg:space-y-5 lg:text-[15px]">
              <p>
                Desde {business.foundedYear}, a{' '}
                <strong className="font-medium text-ink">{business.fullName}</strong> atua em Santa
                Maria – DF oferecendo serviços de depilação e estética com atendimento humanizado,
                técnicas atualizadas e foco em realçar a beleza natural, promovendo autoestima,
                bem-estar e confiança.
              </p>
              <p>
                Ao longo dos anos, esse compromisso com a excelência e o atendimento humanizado
                construiu muito mais do que uma empresa: construiu relações de confiança, avaliação
                por avaliação. Hoje somos nota 5,0 no Google com +{business.reviewCount} avaliações.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 border-l-2 border-rose-300 pl-5 font-display text-[17px] italic leading-snug text-ink/85 sm:text-lg lg:mt-8">
              A estética transforma resultados. O acolhimento transforma experiências.
            </p>
          </Reveal>

          <Reveal delay={0.22} className="mt-7 lg:mt-9">
            <Link to="/sobre" className="btn-primary w-full sm:w-auto">
              Conhecer nossa história
              <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
