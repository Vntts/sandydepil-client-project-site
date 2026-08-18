import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Clock, Instagram, MapPin, Phone, Youtube } from 'lucide-react'
import Logo from './Logo'
import { business, whatsappLink } from '../data/site'

/**
 * Rodapé em três colunas (antes eram quatro, uma delas repetindo os nove
 * procedimentos que a própria página /procedimentos já lista).
 */
const navigation = [
  { label: 'Sobre', to: '/sobre' },
  { label: 'Procedimentos', to: '/procedimentos' },
  { label: 'Cursos', to: '/cursos' },
  { label: 'Resultados', to: '/resultados' },
  { label: 'Depoimentos', to: '/depoimentos' },
  { label: 'Dicas', to: '/blog' },
  { label: 'Contato', to: '/contato' },
]

export default function Footer() {
  const [open, setOpen] = useState(false)

  return (
    <footer className="border-t border-rose-100 bg-beige text-ink/60 pb-actionbar lg:pb-0">
      <div className="container-luxe grid gap-8 py-14 md:grid-cols-3 md:gap-12 lg:py-16">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-[13.5px] leading-relaxed">
            Desde {business.foundedYear} em Santa Maria – DF, atendendo o Distrito Federal. Mais de{' '}
            {business.yearsOfExperience} anos e milhares de atendimentos.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-rose-200 bg-white/60 px-4 text-xs text-ink/70 transition-colors hover:border-rose-300 hover:text-rose-600"
            >
              <Instagram size={14} />
              {business.instagramHandle}
            </a>
            <a
              href={business.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-rose-200 bg-white/60 px-4 text-xs text-ink/70 transition-colors hover:border-rose-300 hover:text-rose-600"
            >
              <Youtube size={14} />
              YouTube
            </a>
          </div>
        </div>

        {/* Acordeão no celular, lista aberta a partir de md */}
        <div className="border-y border-rose-200/60 md:border-0">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="rodape-navegacao"
            className="flex w-full items-center justify-between py-4 md:pointer-events-none md:py-0"
          >
            <span className="text-[11px] font-medium uppercase tracking-luxe text-rose-500">
              Navegação
            </span>
            <ChevronDown
              size={16}
              className={`text-ink/35 transition-transform duration-300 md:hidden ${
                open ? 'rotate-180' : ''
              }`}
            />
          </button>

          <ul
            id="rodape-navegacao"
            className={`space-y-2.5 overflow-hidden text-sm transition-all duration-300 md:mt-5 md:max-h-none md:opacity-100 ${
              open ? 'max-h-96 pb-4 opacity-100' : 'max-h-0 opacity-0 md:opacity-100'
            }`}
          >
            {navigation.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-rose-600">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="py-4 text-[11px] font-medium uppercase tracking-luxe text-rose-500 md:py-0">
            Contato
          </p>
          <ul className="space-y-4 pb-4 text-sm md:mt-5 md:pb-0">
            <li className="flex gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-rose-500" />
              <span>
                {business.address.street}
                <br />
                {business.address.city} – {business.address.state}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone size={16} className="mt-0.5 shrink-0 text-rose-500" />
              <a href={`tel:+${business.phoneRaw}`} className="transition-colors hover:text-rose-600">
                {business.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock size={16} className="mt-0.5 shrink-0 text-rose-500" />
              <span>
                {business.hours.map((h) => (
                  <span key={h.day} className="block">
                    {h.day}: <span className="text-ink/45">{h.time}</span>
                  </span>
                ))}
              </span>
            </li>
          </ul>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-2 !min-h-[44px] !px-6 !py-2.5 text-xs lg:mt-4"
          >
            Agendar
          </a>
        </div>
      </div>

      <div className="border-t border-rose-200/60">
        <div className="container-luxe flex flex-col items-center justify-between gap-2 py-5 text-[11px] text-ink/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {business.fullName}
          </p>
          <p>Santa Maria – Brasília/DF</p>
        </div>
      </div>
    </footer>
  )
}
