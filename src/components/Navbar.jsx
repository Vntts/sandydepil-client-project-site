import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Instagram, Menu, Phone, X } from 'lucide-react'
import Logo from './Logo'
import { business, navLinks, whatsappLink } from '../data/site'

/** Agrupamento do menu mobile — nove itens numa lista corrida é uma parede. */
const mobileGroups = [
  {
    label: 'Serviços',
    items: [
      { label: 'Procedimentos', to: '/procedimentos' },
      { label: 'Cursos', to: '/cursos' },
      { label: 'Produtos', to: '/produtos' },
    ],
  },
  {
    label: 'Sobre',
    items: [
      { label: 'Nossa história', to: '/sobre' },
      { label: 'Resultados', to: '/resultados' },
      { label: 'Depoimentos', to: '/depoimentos' },
    ],
  },
  {
    label: 'Mais',
    items: [
      { label: 'Dicas', to: '/blog' },
      { label: 'Contato e localização', to: '/contato' },
    ],
  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [openSub, setOpenSub] = useState(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setOpenSub(null)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      {/* Faixa de contato — desktop apenas. No celular, essa informação
          já está na barra de ação fixa e no rodapé. */}
      <div className="hidden bg-ink text-white/70 lg:block">
        <div className="container-luxe flex items-center justify-between py-2 text-[11px] tracking-wide">
          <p>
            {business.address.street} · {business.address.city} – {business.address.state}
          </p>
          <div className="flex items-center gap-6">
            <span>Seg a Sex 09h–19h · Sáb 09h–17h</span>
            <a
              href={`tel:+${business.phoneRaw}`}
              className="inline-flex items-center gap-1.5 text-rose-200 transition-colors hover:text-white"
            >
              <Phone size={11} />
              {business.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Altura fixa (h-header) em vez de padding variável.
          Antes o cabeçalho encolhia ao rolar, o que deslocava a barra de
          filtros grudada logo abaixo dele em /procedimentos. Agora só o fundo
          e a sombra mudam — sem salto de layout. */}
      <header
        className={`sticky top-0 z-50 h-header lg:h-[5.25rem] transition-[background-color,border-color,box-shadow] duration-500 ${
          scrolled
            ? 'border-b border-rose-100/80 bg-cream/95 shadow-[0_2px_24px_-16px_rgba(28,23,25,0.25)] backdrop-blur-md'
            : 'border-b border-rose-100/40 bg-cream/85 backdrop-blur-sm'
        }`}
      >
        <nav className="container-luxe flex h-full items-center justify-between gap-6">
          <Link to="/" aria-label="Sandydepil — página inicial">
            <Logo />
          </Link>

          <ul className="hidden items-center gap-6 xl:flex">
            {navLinks.map((link) => (
              <li
                key={link.to}
                className="relative"
                onMouseEnter={() => link.children && setOpenSub(link.to)}
                onMouseLeave={() => link.children && setOpenSub(null)}
              >
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `group relative inline-flex items-center gap-1 text-[13px] font-medium transition-colors ${
                      isActive ? 'text-rose-600' : 'text-ink/70 hover:text-rose-600'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {link.children && <ChevronDown size={13} className="opacity-60" />}
                      <span
                        className={`absolute -bottom-1.5 left-0 h-px bg-rose-gradient transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </>
                  )}
                </NavLink>

                {link.children && (
                  <AnimatePresence>
                    {openSub === link.to && (
                      <motion.ul
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-4"
                      >
                        <div className="overflow-hidden rounded-xl border border-rose-100 bg-white py-2 shadow-lift">
                          {link.children.map((child) => (
                            <li key={child.to}>
                              <Link
                                to={child.to}
                                className="block px-5 py-2.5 text-[13px] text-ink/70 transition-colors hover:bg-rose-50 hover:text-rose-600"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </div>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                )}
              </li>
            ))}
          </ul>

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden !min-h-0 !px-6 !py-3 !text-[13px] xl:inline-flex"
          >
            Agendar
          </a>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="-mr-1 flex h-11 w-11 items-center justify-center rounded-full text-ink/70 transition-colors active:bg-rose-50 xl:hidden"
            aria-label="Abrir menu"
          >
            <Menu size={22} strokeWidth={1.8} />
          </button>
        </nav>
      </header>

      {/* Menu mobile — painel deslizante agrupado por seção */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[70] bg-ink/40 backdrop-blur-sm xl:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-[80] flex w-[86%] max-w-sm flex-col bg-cream shadow-[-12px_0_40px_-20px_rgba(28,23,25,0.4)] xl:hidden"
            >
              <div className="flex items-center justify-between border-b border-rose-100 px-5 py-4">
                <Logo />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-full text-ink/60 active:bg-rose-50"
                  aria-label="Fechar menu"
                >
                  <X size={21} strokeWidth={1.8} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `block pb-5 font-display text-[22px] ${
                      isActive ? 'text-rose-600' : 'text-ink'
                    }`
                  }
                >
                  Início
                </NavLink>

                {mobileGroups.map((group, gi) => (
                  <motion.div
                    key={group.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + gi * 0.07, duration: 0.35 }}
                    className="border-t border-rose-100 py-5"
                  >
                    <p className="text-[10px] font-medium uppercase tracking-luxe text-rose-400">
                      {group.label}
                    </p>
                    <ul className="mt-3 space-y-1">
                      {group.items.map((item) => (
                        <li key={item.to}>
                          <NavLink
                            to={item.to}
                            className={({ isActive }) =>
                              `-mx-2 flex min-h-[46px] items-center rounded-lg px-2 font-display text-[19px] transition-colors ${
                                isActive ? 'text-rose-600' : 'text-ink active:bg-rose-50'
                              }`
                            }
                          >
                            {item.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              <div className="border-t border-rose-100 px-5 py-4 safe-bottom">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full"
                >
                  Agendar pelo WhatsApp
                </a>
                <div className="mt-3 flex items-center justify-between text-[12px] text-ink/50">
                  <a
                    href={`tel:+${business.phoneRaw}`}
                    className="inline-flex items-center gap-1.5 active:text-rose-600"
                  >
                    <Phone size={13} />
                    {business.phone}
                  </a>
                  <a
                    href={business.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 active:text-rose-600"
                  >
                    <Instagram size={13} />
                    {business.instagramHandle}
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
