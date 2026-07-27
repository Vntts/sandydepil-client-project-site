import { Link } from 'react-router-dom'
import SectionHeading from './SectionHeading'
import Reveal, { RevealGroup, RevealItem } from './Reveal'
import BeforeAfter from './BeforeAfter'
import RailHint from './RailHint'
import { results } from '../data/site'

/**
 * Grade de antes e depois.
 * `limit` define quantos aparecem (home mostra 3, a página mostra todos).
 * No mobile os itens ficam em trilho horizontal — três sliders empilhados
 * ocupariam mais de duas telas de rolagem.
 */
export default function Results({ limit, showHeading = true, asRail = true }) {
  const items = limit ? results.slice(0, limit) : results

  return (
    <section className="bg-cream section-y">
      <div className="container-luxe">
        {showHeading && (
          <SectionHeading
            variant="numbered"
            number="01"
            eyebrow="Resultados"
            title="Antes e depois de clientes reais"
            description="Arraste o controle de cada imagem para comparar. Todas publicadas com autorização."
          />
        )}

        <RevealGroup
          className={`${asRail ? 'rail rail-3' : 'grid gap-8 sm:grid-cols-2 lg:grid-cols-3'} ${
            showHeading ? 'mt-9 lg:mt-12' : ''
          }`}
          stagger={0.12}
        >
          {items.map((r) => (
            <RevealItem key={r.title} variant="fadeUp" className={asRail ? 'rail-item' : ''}>
              <div className="group">
                <BeforeAfter before={r.before} after={r.after} alt={r.title} />
                <h3 className="mt-4 font-display text-[17px] leading-snug text-ink transition-colors duration-300 md:group-hover:text-rose-600">
                  {r.procedure ? (
                    <Link to={`/procedimentos/${r.procedure}`}>{r.title}</Link>
                  ) : (
                    r.title
                  )}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink/60">{r.description}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {asRail && items.length > 1 && <RailHint label="Arraste para ver outros casos" />}

        {limit && results.length > limit && (
          <Reveal delay={0.1} className="mt-9 lg:mt-12">
            <Link to="/resultados" className="btn-ghost w-full sm:w-auto">
              Ver todos os {results.length} resultados
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  )
}
