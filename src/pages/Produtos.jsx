import { MessageCircle, ShieldCheck, Sparkles, UserCheck } from 'lucide-react'
import useSeo from '../hooks/useSeo'
import PageHero from '../components/PageHero'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import FinalCTA from '../components/FinalCTA'
import SmartImage from '../components/SmartImage'
import { products, whatsappLink } from '../data/site'

const perks = [
  {
    icon: UserCheck,
    title: 'Indicação individual',
    text: 'O produto é escolhido depois de avaliar a sua pele, não por catálogo.',
  },
  {
    icon: ShieldCheck,
    title: 'Linhas profissionais',
    text: 'Concentrações de ativos que a prateleira comum não oferece.',
  },
  {
    icon: Sparkles,
    title: 'Manutenção do resultado',
    text: 'O home care sustenta em casa o que foi conquistado no atendimento.',
  },
]

export default function Produtos() {
  useSeo({
    title: 'Produtos e Cosméticos',
    description:
      'Cosméticos profissionais selecionados para manutenção em casa dos resultados dos tratamentos estéticos. Indicação personalizada na Sandydepil, Santa Maria – DF.',
    path: '/produtos',
  })

  return (
    <>
      <PageHero
        eyebrow="Produtos"
        title="O cuidado continua em casa"
        description="Uma linha enxuta de cosméticos profissionais. Preferimos indicar poucos produtos certos do que uma prateleira inteira."
        image="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: 'Produtos' }]}
      />

      {/* Curadoria — lista em linha, sem ícones em círculo */}
      <section className="border-b border-rose-100 bg-offwhite py-8 sm:py-10">
        <RevealGroup
          className="container-luxe grid gap-5 sm:grid-cols-3 sm:gap-8"
          stagger={0.08}
        >
          {perks.map((p) => (
            <RevealItem key={p.title}>
              <div className="flex gap-3">
                <p.icon size={17} strokeWidth={1.7} className="mt-0.5 shrink-0 text-rose-400" />
                <div>
                  <p className="text-[13px] font-medium text-ink">{p.title}</p>
                  <p className="mt-0.5 text-[12.5px] leading-relaxed text-ink/50">{p.text}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="bg-cream section-y">
        <div className="container-luxe">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Nossa curadoria</p>
            <h2 className="mt-3 font-display text-[26px] leading-[1.2] text-ink sm:text-4xl">
              Produtos disponíveis na clínica
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-ink/60">
              Os valores variam conforme a linha e o tamanho — consulte pelo WhatsApp ou no seu
              próximo atendimento.
            </p>
          </Reveal>

          <RevealGroup
            className="mt-9 grid grid-cols-2 gap-4 sm:gap-7 lg:mt-12 lg:grid-cols-3"
            stagger={0.07}
          >
            {products.map((p) => (
              <RevealItem key={p.name} variant="fadeUp">
                <article className="card-luxe group flex h-full flex-col">
                  <div className="relative aspect-square overflow-hidden bg-beige sm:aspect-[4/3]">
                    {/* TODO: substituir por fotos próprias dos produtos */}
                    <SmartImage
                      src={p.image}
                      alt={p.name}
                      label={p.name}
                      kind="produto"
                      imgClassName="h-full w-full object-cover transition-transform duration-700 md:group-hover:scale-[1.07]"
                    />
                    <span className="absolute left-2.5 top-2.5 rounded-full bg-white/90 px-2.5 py-0.5 text-[9px] font-medium uppercase tracking-wide text-rose-600 backdrop-blur sm:left-3 sm:top-3 sm:px-3 sm:py-1 sm:text-[10px]">
                      {p.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-4 sm:p-6">
                    <h3 className="font-display text-[15px] leading-snug text-ink transition-colors duration-300 md:text-lg md:group-hover:text-rose-600">
                      {p.name}
                    </h3>
                    <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-ink/60 sm:text-[13px]">
                      {p.description}
                    </p>
                    <a
                      href={whatsappLink(`Olá! Gostaria de saber mais sobre: ${p.name}. 💗`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 self-start text-[11px] font-medium text-rose-600 transition-all duration-300 md:text-xs md:hover:gap-2.5"
                    >
                      <MessageCircle size={12} />
                      Consultar
                    </a>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.12} className="mt-12 border-t border-rose-100 pt-10">
            <p className="font-display text-[20px] leading-snug text-ink sm:text-2xl">
              Não sabe qual produto serve para a sua pele?
            </p>
            <p className="mt-2.5 max-w-lg text-[14px] leading-relaxed text-ink/60">
              Comprar o produto errado é desperdício — e às vezes piora o quadro. Descreva a sua pele
              e receba a indicação adequada.
            </p>
            <a
              href={whatsappLink(
                'Olá! Gostaria de indicação de produtos para o meu tipo de pele. 💗'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 w-full sm:w-auto"
            >
              Pedir indicação
            </a>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
