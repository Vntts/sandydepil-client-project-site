import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Clock, Instagram, MapPin, Phone } from 'lucide-react'
import Logo from './Logo'
import { business, procedures, whatsappLink } from '../data/site'

const columns = [
  {
    title: 'Procedimentos',
    links: [
      ...procedures.slice(0, 6).map((p) => ({ label: p.shortName, to: `/procedimentos/${p.slug}` })),
      { label: 'Ver todos', to: '/procedimentos', accent: true },
    ],
  },
  {
    title: 'Institucional',
    links: [
      { label: 'Sobre', to: '/sobre' },
      { label: 'Cursos', to: '/cursos' },
      { label: 'Resultados', to: '/resultados' },
      { label: 'Depoimentos', to: '/depoimentos' },
      { label: 'Produtos', to: '/produtos' },
      { label: 'Dicas', to: '/blog' },
      { label: 'Contato', to: '/contato' },
    ],
  },
]

/** Coluna que vira acordeão no mobile — evita rodapé de três telas de altura. */
function FooterColumn({ column }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-white/10 md:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 md:pointer-events-none md:py-0"
      >
        <span className="text-[11px] font-medium uppercase tracking-luxe text-rose-300">
          {column.title}
        </span>
        <ChevronDown
          size={16}
          className={`text-white/40 transition-transform duration-300 md:hidden ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <ul
        className={`space-y-2.5 overflow-hidden text-sm transition-all duration-300 md:mt-5 md:max-h-none md:opacity-100 ${
          open ? 'max-h-96 pb-4 opacity-100' : 'max-h-0 opacity-0 md:opacity-100'
        }`}
      >
        {column.links.map((l) => (
          <li key={l.to}>
            <Link
              to={l.to}
              className={`transition-colors hover:text-rose-300 ${
                l.accent ? 'text-rose-300' : ''
              }`}
            >
              {l.label}
              {l.accent && ' →'}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-ink text-white/70 pb-actionbar lg:pb-0">
      <div className="container-luxe grid gap-8 py-14 md:grid-cols-2 md:gap-12 lg:grid-cols-4 lg:py-16">
        <div className="lg:col-span-1">
          <Logo variant="light" />
          <p className="mt-5 max-w-sm text-[13.5px] leading-relaxed">
            Desde {business.foundedYear} em Santa Maria – DF. Mais de {business.yearsOfExperience}{' '}
            anos e milhares de atendimentos.
          </p>
          <a
            href={business.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-[42px] items-center gap-2 rounded-full border border-white/15 px-4 text-xs text-white/80 transition-colors hover:border-rose-300 hover:text-white"
          >
            <Instagram size={14} />
            {business.instagramHandle}
          </a>
        </div>

        {columns.map((c) => (
          <FooterColumn key={c.title} column={c} />
        ))}

        <div>
          <p className="py-4 text-[11px] font-medium uppercase tracking-luxe text-rose-300 md:py-0">
            Contato
          </p>
          <ul className="space-y-4 pb-4 text-sm md:mt-5 md:pb-0">
            <li className="flex gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-rose-300" />
              <span>
                {business.address.street}
                <br />
                {business.address.city} – {business.address.state}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone size={16} className="mt-0.5 shrink-0 text-rose-300" />
              <a href={`tel:+${business.phoneRaw}`} className="transition-colors hover:text-rose-300">
                {business.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock size={16} className="mt-0.5 shrink-0 text-rose-300" />
              <span>
                {business.hours.map((h) => (
                  <span key={h.day} className="block">
                    {h.day}: <span className="text-white/50">{h.time}</span>
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

      <div className="border-t border-white/10">
        <div className="container-luxe flex flex-col items-center justify-between gap-2 py-5 text-[11px] text-white/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {business.fullName}
          </p>
          <p>Santa Maria – Brasília/DF</p>
        </div>
      </div>
    </footer>
  )
}
