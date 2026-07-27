import { RevealGroup, RevealItem } from './Reveal'
import { timeline } from '../data/site'

/** Linha do tempo da trajetória da clínica (alternada no desktop). */
export default function Timeline() {
  return (
    <RevealGroup className="relative mt-14" stagger={0.12}>
      {/* Linha vertical */}
      <div
        className="absolute bottom-4 left-[15px] top-2 w-px bg-gradient-to-b from-rose-300 via-rose-200 to-transparent md:left-1/2 md:-translate-x-1/2"
        aria-hidden="true"
      />

      <div className="space-y-10 md:space-y-0">
        {timeline.map((item, i) => {
          const isLeft = i % 2 === 0
          return (
            <RevealItem
              key={item.year}
              variant={isLeft ? 'slideRight' : 'slideLeft'}
              className="relative pl-12 md:pb-14 md:pl-0"
            >
              {/* Marcador */}
              <span
                className="absolute left-0 top-1.5 flex h-8 w-8 items-center justify-center rounded-full border-2 border-rose-300 bg-cream md:left-1/2 md:-translate-x-1/2"
                aria-hidden="true"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-rose-gradient" />
              </span>

              <div className="md:grid md:grid-cols-2 md:gap-12">
                <div className={isLeft ? 'md:pr-4 md:text-right' : 'md:col-start-2 md:pl-4'}>
                  <p className="font-display text-3xl text-rose-400">{item.year}</p>
                  <h3 className="mt-2 font-display text-xl text-ink">{item.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink/65">{item.text}</p>
                </div>
              </div>
            </RevealItem>
          )
        })}
      </div>
    </RevealGroup>
  )
}
