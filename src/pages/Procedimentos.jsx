import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import useSeo from '../hooks/useSeo'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import ProcedureCard from '../components/ProcedureCard'
import FaqAccordion from '../components/FaqAccordion'
import FinalCTA from '../components/FinalCTA'
import { procedureCategories, procedures, whatsappLink } from '../data/site'

export default function Procedimentos() {
  const [params, setParams] = useSearchParams()
  const active = params.get('categoria') || 'todos'

  const filtered =
    active === 'todos' ? procedures : procedures.filter((p) => p.category === active)

  const activeCategory = procedureCategories.find((c) => c.id === active)

  useSeo({
    title: activeCategory ? activeCategory.label : 'Procedimentos Estéticos',
    description:
      'Estética facial e corporal em Santa Maria – DF: limpeza de pele, dermaplaning, design de sobrancelhas, epilação com cera e drenagem linfática.',
    path: '/procedimentos',
  })

  const setCategory = (id) => {
    if (id === 'todos') setParams({}, { replace: true })
    else setParams({ categoria: id }, { replace: true })
  }

  const tabs = [{ id: 'todos', short: 'Todos' }, ...procedureCategories]

  return (
    <>
      <PageHero
        eyebrow="Procedimentos"
        title="Todos os tratamentos em um só lugar"
        description="Cada procedimento tem página própria com indicações, duração, o que esperar e os cuidados posteriores."
        image="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: 'Procedimentos' }]}
      />

      {/* Filtros grudados no topo — no mobile viram trilho horizontal.
          Ficam acessíveis durante toda a rolagem da lista. */}
      <div className="sticky top-header z-30 border-b border-rose-100 bg-cream/95 backdrop-blur-md lg:top-[5.25rem]">
        <div className="container-luxe">
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 py-3 sm:mx-0 sm:px-0 sm:py-4 [&::-webkit-scrollbar]:hidden">
            {tabs.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`shrink-0 rounded-full px-4 py-2.5 text-[13px] font-medium transition-all duration-300 sm:px-5 ${
                  active === cat.id
                    ? 'bg-rose-gradient text-white shadow-soft'
                    : 'border border-rose-200 bg-white/70 text-ink/60 active:bg-rose-50 md:hover:border-rose-300 md:hover:text-rose-600'
                }`}
              >
                {cat.short}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="bg-cream section-y">
        <div className="container-luxe">
          {activeCategory && (
            <Reveal>
              <p className="max-w-xl text-[14px] italic leading-relaxed text-ink/50">
                {activeCategory.description}
              </p>
            </Reveal>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`grid gap-5 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 ${
                activeCategory ? 'mt-8' : ''
              }`}
            >
              {filtered.map((p) => (
                <ProcedureCard key={p.slug} procedure={p} />
              ))}
            </motion.div>
          </AnimatePresence>

          <Reveal delay={0.1} className="mt-12 border-t border-rose-100 pt-10">
            <p className="font-display text-[20px] leading-snug text-ink sm:text-2xl">
              Não sabe qual procedimento é o ideal para você?
            </p>
            <p className="mt-2.5 max-w-lg text-[14px] leading-relaxed text-ink/60">
              Descreva o que gostaria de melhorar e receba uma orientação antes de agendar.
            </p>
            <a
              href={whatsappLink(
                'Olá! Gostaria de orientação sobre qual procedimento é ideal para mim. 💗'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 w-full sm:w-auto"
            >
              Pedir orientação
            </a>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-soft-fade section-y">
        <div className="container-luxe">
          <Reveal className="max-w-xl">
            <p className="eyebrow">Dúvidas frequentes</p>
            <h2 className="mt-3 font-display text-[26px] leading-[1.2] text-ink sm:text-4xl">
              Perguntas que recebemos sempre
            </h2>
          </Reveal>
          <FaqAccordion />
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
