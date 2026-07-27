import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import { business, whatsappLink } from '../data/site'

/**
 * CTA de fechamento.
 * Aparece uma vez por página, no fim. Os blocos "Quer X? Manda mensagem" que
 * existiam no meio de cada seção foram removidos — repetir o mesmo pedido
 * quatro vezes na mesma página não aumenta conversão, só cansa.
 */
export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <img
        src="https://images.unsplash.com/photo-1596178060810-72660ee8d99a?auto=format&fit=crop&w=2000&q=80"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-rose-600/90 via-rose-500/85 to-gold-dark/80" />

      <div className="container-luxe relative">
        <div className="max-w-2xl">
          <Reveal>
            <h2 className="font-display text-[27px] leading-[1.15] text-white sm:text-4xl lg:text-[2.9rem]">
              Pronta para cuidar da sua beleza e autoestima?
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 max-w-lg text-[14.5px] leading-relaxed text-white/85 sm:text-base">
              Agende seu atendimento e descubra uma experiência pensada para você — com{' '}
              {business.yearsOfExperience} anos de prática por trás.
            </p>
          </Reveal>

          <Reveal delay={0.18} className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-full bg-white px-8 text-sm font-medium tracking-wide text-rose-600 shadow-lift transition-all duration-300 active:scale-[0.98] md:hover:scale-[1.03] md:hover:bg-cream sm:w-auto"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.005c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411zm-8.47 18.297h-.004c-1.774 0-3.513-.475-5.031-1.374l-.361-.214-3.741.98.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.267c.002-5.45 4.436-9.884 9.889-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.451-4.437 9.889-9.886 9.889z" />
              </svg>
              Agendar pelo WhatsApp
            </a>
            <Link
              to="/contato"
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-white/5 px-8 text-sm font-medium tracking-wide text-white backdrop-blur transition-all duration-300 active:scale-[0.98] md:hover:border-white/70 md:hover:bg-white/15 sm:w-auto"
            >
              Contato e localização
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
