import { Link, useParams } from 'react-router-dom'
import { AlertCircle, ArrowRight, Check, Clock, RefreshCw } from 'lucide-react'
import useSeo from '../hooks/useSeo'
import PageHero from '../components/PageHero'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import BeforeAfter from '../components/BeforeAfter'
import ProcedureCard from '../components/ProcedureCard'
import RailHint from '../components/RailHint'
import FinalCTA from '../components/FinalCTA'
import NotFound from './NotFound'
import {
  business,
  findProcedure,
  procedureCategories,
  procedures,
  results,
  whatsappLink,
} from '../data/site'

export default function ProcedimentoDetalhe() {
  const { slug } = useParams()
  const procedure = findProcedure(slug)

  useSeo({
    title: procedure ? `${procedure.name} em Santa Maria – DF` : 'Procedimento não encontrado',
    description: procedure
      ? `${procedure.summary} Atendimento em Santa Maria – DF na ${business.fullName}. Duração aproximada: ${procedure.duration}.`
      : 'O procedimento que você procura não existe ou foi movido.',
    path: `/procedimentos/${slug}`,
    image: procedure?.image,
    jsonLd: procedure
      ? {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: procedure.name,
          description: procedure.summary,
          provider: {
            '@type': 'BeautySalon',
            name: business.fullName,
            address: {
              '@type': 'PostalAddress',
              streetAddress: business.address.street,
              addressLocality: business.address.city,
              addressRegion: business.address.state,
              postalCode: business.address.zip,
              addressCountry: 'BR',
            },
          },
          areaServed: { '@type': 'City', name: 'Santa Maria' },
        }
      : undefined,
  })

  if (!procedure) return <NotFound />

  const category = procedureCategories.find((c) => c.id === procedure.category)
  const related = procedures
    .filter((p) => p.category === procedure.category && p.slug !== procedure.slug)
    .slice(0, 3)
  const relatedResult = results.find((r) => r.procedure === procedure.slug)

  return (
    <>
      <PageHero
        eyebrow={category?.label}
        title={procedure.name}
        description={procedure.summary}
        image={procedure.image}
        breadcrumbs={[
          { label: 'Procedimentos', to: '/procedimentos' },
          { label: procedure.shortName },
        ]}
      >
        {/* Ficha técnica no próprio hero — antes era uma faixa separada logo
            abaixo, que no mobile virava mais uma tela de rolagem */}
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-[12.5px] text-white/75">
          <span className="inline-flex items-center gap-2">
            <Clock size={14} className="text-rose-200" />
            {procedure.duration}
          </span>
          <span className="inline-flex items-center gap-2">
            <RefreshCw size={14} className="text-rose-200" />
            {procedure.sessions}
          </span>
        </div>

        <a
          href={whatsappLink(`Olá! Vim pelo site e gostaria de agendar: ${procedure.name}. 💗`)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-6 w-full sm:w-auto sm:!px-8"
        >
          Agendar este procedimento
        </a>
      </PageHero>

      <section className="bg-cream section-y">
        <div className="container-luxe grid gap-10 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-2">
            {/* Descrição */}
            <Reveal>
              <div className="space-y-4 sm:space-y-5">
                {procedure.description.map((p, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? 'text-[15.5px] font-light leading-relaxed text-ink/85 sm:text-[17px]'
                        : 'text-[14.5px] leading-relaxed text-ink/70 sm:text-[15px]'
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>

            {/* Benefícios — movidos da sidebar para cá no mobile */}
            <Reveal delay={0.08} className="mt-10">
              <h2 className="font-display text-[20px] text-ink sm:text-2xl">Benefícios</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {procedure.benefits.map((b) => (
                  <li
                    key={b}
                    className="inline-flex items-center gap-1.5 rounded-full border border-rose-100 bg-white px-3.5 py-2 text-[12.5px] text-ink/75"
                  >
                    <Check size={12} className="text-rose-400" />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Indicações */}
            <Reveal delay={0.12} className="mt-10">
              <h2 className="font-display text-[20px] text-ink sm:text-2xl">
                Para quem é indicado
              </h2>
              <ul className="mt-4 divide-y divide-rose-100 border-y border-rose-100">
                {procedure.indications.map((ind) => (
                  <li
                    key={ind}
                    className="flex items-start gap-3 py-3.5 text-[13.5px] text-ink/75 sm:text-[14px]"
                  >
                    <Check size={14} className="mt-0.5 shrink-0 text-rose-400" />
                    {ind}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Cuidados */}
            <Reveal delay={0.16} className="mt-10">
              <h2 className="font-display text-[20px] text-ink sm:text-2xl">
                Cuidados após o procedimento
              </h2>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink/55">
                Boa parte do resultado depende do que acontece depois que você sai da clínica.
              </p>
              <ul className="mt-4 space-y-3">
                {procedure.aftercare.map((care) => (
                  <li
                    key={care}
                    className="flex items-start gap-3 text-[13.5px] text-ink/75 sm:text-[14px]"
                  >
                    <AlertCircle size={14} className="mt-0.5 shrink-0 text-rose-400" />
                    {care}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Resultado */}
            {relatedResult && (
              <Reveal delay={0.2} className="mt-12">
                <h2 className="font-display text-[20px] text-ink sm:text-2xl">Resultado real</h2>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink/55">
                  {relatedResult.description}
                </p>
                <div className="mt-5 max-w-xl">
                  <BeforeAfter
                    before={relatedResult.before}
                    after={relatedResult.after}
                    alt={relatedResult.title}
                  />
                </div>
              </Reveal>
            )}
          </div>

          {/* Sidebar — no mobile é só um bloco de orçamento no fim */}
          <aside className="lg:col-span-1">
            <Reveal variant="fadeUp" className="lg:sticky lg:top-32">
              <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-soft sm:p-7">
                <p className="text-[10px] font-medium uppercase tracking-luxe text-rose-500">
                  Valor
                </p>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink/65">
                  Varia conforme a região e a avaliação inicial. Envie uma mensagem para receber o
                  orçamento exato.
                </p>
                <a
                  href={whatsappLink(`Olá! Gostaria de saber o valor de: ${procedure.name}. 💗`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-5 w-full"
                >
                  Consultar valor
                </a>
                <a href={`tel:+${business.phoneRaw}`} className="btn-ghost mt-3 w-full">
                  <Clock size={14} />
                  {business.phone}
                </a>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* Relacionados */}
      {related.length > 0 && (
        <section className="bg-soft-fade section-y">
          <div className="container-luxe">
            <Reveal className="flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Também em {category?.short.toLowerCase()}</p>
                <h2 className="mt-2.5 font-display text-[22px] leading-snug text-ink sm:text-3xl">
                  Você também pode gostar
                </h2>
              </div>
              <Link
                to={`/procedimentos?categoria=${procedure.category}`}
                className="inline-flex shrink-0 items-center gap-1.5 text-[12.5px] font-medium text-rose-600 transition-all md:hover:gap-3"
              >
                <span className="hidden sm:inline">Ver categoria</span>
                <span className="sm:hidden">Ver mais</span>
                <ArrowRight size={14} />
              </Link>
            </Reveal>

            <RevealGroup className="rail rail-3 mt-8" stagger={0.1}>
              {related.map((p) => (
                <RevealItem key={p.slug} className="rail-item">
                  <ProcedureCard procedure={p} compact />
                </RevealItem>
              ))}
            </RevealGroup>

            {related.length > 1 && <RailHint />}
          </div>
        </section>
      )}

      <FinalCTA />
    </>
  )
}
