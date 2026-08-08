import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal, { RevealGroup, RevealItem } from './Reveal'
import RailHint from './RailHint'
import SmartImage from './SmartImage'
import { procedureCategories, proceduresByCategory } from '../data/site'

/** Bloco da home: as 3 categorias, em trilho no mobile e grade no desktop. */
export default function ProceduresPreview() {
  return (
    <section className="bg-soft-fade section-y">
      <div className="container-luxe">
        <SectionHeading
          variant="inline"
          eyebrow="Procedimentos"
          title="Estética facial e corporal em Santa Maria – DF"
          description="Protocolos com técnica profissional e atenção ao seu conforto. Cada procedimento tem página própria com duração, indicações e cuidados."
        />

        <RevealGroup className="rail rail-3 mt-9 lg:mt-12" stagger={0.1}>
          {procedureCategories.map((cat) => {
            const items = proceduresByCategory(cat.id)
            const cover = items[0]?.image

            return (
              <RevealItem key={cat.id} variant="fadeUp" className="rail-item">
                <Link
                  to={`/procedimentos?categoria=${cat.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-soft transition-all duration-500 md:hover:-translate-y-1.5 md:hover:shadow-lift"
                >
                  <div className="relative aspect-[16/11] overflow-hidden md:aspect-[16/10]">
                    <SmartImage
                      src={cover}
                      alt={cat.label}
                      label={cat.short}
                      kind={cat.id}
                      imgClassName="h-full w-full object-cover transition-transform duration-700 md:group-hover:scale-[1.07]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
                    <h3 className="absolute bottom-4 left-5 right-5 font-display text-lg text-white md:bottom-5 md:left-6 md:text-xl">
                      {cat.short}
                    </h3>
                  </div>

                  <div className="flex flex-1 flex-col p-5 md:p-7">
                    <p className="text-[13px] leading-relaxed text-ink/60">{cat.description}</p>

                    <ul className="mt-4 flex-1 space-y-1.5">
                      {items.map((p) => (
                        <li key={p.slug} className="text-[12.5px] text-ink/70">
                          · {p.shortName}
                        </li>
                      ))}
                    </ul>

                    <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-rose-600 transition-all duration-300 md:group-hover:gap-3">
                      {items.length} procedimentos
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              </RevealItem>
            )
          })}
        </RevealGroup>

        <RailHint label="Arraste para ver as categorias" />

        <Reveal delay={0.1} className="mt-9 lg:mt-12">
          <Link to="/procedimentos" className="btn-ghost w-full sm:w-auto">
            Ver todos os procedimentos
            <ArrowRight size={15} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
