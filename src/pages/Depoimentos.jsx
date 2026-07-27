import { BadgeCheck, ExternalLink, Quote, Star } from 'lucide-react'
import useSeo from '../hooks/useSeo'
import PageHero from '../components/PageHero'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import FinalCTA from '../components/FinalCTA'
import { business, reviews, whatsappLink } from '../data/site'

export default function Depoimentos() {
  useSeo({
    title: 'Depoimentos de Clientes',
    description: `Avaliações reais de clientes da ${business.fullName} em Santa Maria – DF. Nota ${business.rating.toFixed(1)} no Google com ${business.reviewCount} avaliações.`,
    path: '/depoimentos',
  })

  return (
    <>
      <PageHero
        eyebrow="Depoimentos"
        title="Nota 5,0 construída uma cliente por vez"
        description={`${business.reviewCount} avaliações no Google, todas espontâneas. Nenhuma campanha, nenhum incentivo.`}
        image="https://images.unsplash.com/photo-1596178060810-72660ee8d99a?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: 'Depoimentos' }]}
      >
        {/* Nota trazida para dentro do hero — antes era uma faixa própria
            logo abaixo, o que duplicava a informação em duas telas */}
        <div className="flex items-center gap-4">
          <span className="font-display text-5xl leading-none text-rose-200">
            {business.rating.toFixed(1)}
          </span>
          <div>
            <span className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={15} className="fill-gold-light text-gold-light" />
              ))}
            </span>
            <p className="mt-1.5 text-[12px] text-white/60">
              {business.reviewCount} avaliações verificadas
            </p>
            <a
              href={business.googleProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1.5 text-[12px] font-medium text-rose-200 hover:text-white"
            >
              Ver no Google
              <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </PageHero>

      <section className="bg-cream section-y">
        <div className="container-luxe">
          <RevealGroup className="grid gap-5 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3" stagger={0.08}>
            {reviews.map((r, i) => (
              <RevealItem key={i} variant="fadeUp">
                <article className="flex h-full flex-col rounded-2xl border border-rose-100 bg-white p-6 shadow-soft transition-all duration-500 md:hover:-translate-y-1.5 md:hover:shadow-lift sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <Quote size={20} className="text-rose-200" />
                    {r.verified && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-[10px] font-medium text-rose-600">
                        <BadgeCheck size={11} />
                        Google
                      </span>
                    )}
                  </div>

                  <p className="mt-3.5 flex-1 text-[14px] leading-relaxed text-ink/75">
                    “{r.text}”
                  </p>

                  <div className="mt-5 border-t border-rose-50 pt-4">
                    <span className="flex gap-0.5">
                      {Array.from({ length: r.rating }).map((_, j) => (
                        <Star key={j} size={11} className="fill-gold text-gold" />
                      ))}
                    </span>
                    <p className="mt-2 text-[13px] font-medium text-ink">{r.name}</p>
                    <p className="text-[10.5px] uppercase tracking-luxe text-ink/40">{r.service}</p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.12} className="mt-12 border-t border-rose-100 pt-10">
            <p className="font-display text-[20px] leading-snug text-ink sm:text-2xl">
              Já é nossa cliente?
            </p>
            <p className="mt-2.5 max-w-lg text-[14px] leading-relaxed text-ink/60">
              Sua avaliação ajuda outras pessoas da região a encontrar um atendimento de confiança.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a
                href={business.googleProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Deixar avaliação
              </a>
              <a
                href={whatsappLink(
                  'Olá! Gostaria de compartilhar um feedback sobre meu atendimento. 💗'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                Enviar feedback direto
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
