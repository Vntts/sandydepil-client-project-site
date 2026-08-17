import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Instagram, Menu, Phone, X } from 'lucide-react'
import Logo from './Logo'
import { business, navLinks, whatsappLink } from '../data/site'

/**
 * O menu vem inteiro de `navLinks` em src/data/site.js — seis itens no topo,
 * com os secundários agrupados em submenu. Desktop e mobile leem a mesma
 * lista, então incluir ou remover uma página é uma edição só.
 */
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
      {/* Altura fixa (h-header) em vez de padding variável: ao rolar mudam só
          o fundo e a sombra, sem salto de layout nas barras grudadas abaixo. */}
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

          {/* Com seis itens o menu cabe já em lg — antes só aparecia em xl */}
          <ul className="hidden items-center gap-7 lg:flex">
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
                  onFocus={() => link.children && setOpenSub(link.to)}
                  aria-haspopup={link.children ? 'true' : undefined}
                  aria-expanded={link.children ? openSub === link.to : undefined}
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
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-4"
                      >
                        <ul className="overflow-hidden rounded-xl border border-rose-100 bg-white py-2 shadow-lift">
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
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram — ${business.instagramHandle}`}
              className="flex h-9 w-9 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-rose-50 hover:text-rose-600"
            >
              <Instagram size={18} strokeWidth={1.8} />
            </a>

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !min-h-0 !px-6 !py-3 !text-[13px]"
            >
              Agendar
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="-mr-1 flex h-11 w-11 items-center justify-center rounded-full text-ink/70 transition-colors active:bg-rose-50 lg:hidden"
            aria-label="Abrir menu"
            aria-expanded={open}
            aria-controls="menu-mobile"
          >
            <Menu size={22} strokeWidth={1.8} />
          </button>
        </nav>
      </header>

      {/* Menu mobile — mesma lista do desktop, sem agrupamento paralelo */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[70] bg-ink/40 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              id="menu-mobile"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-[80] flex w-[86%] max-w-sm flex-col bg-cream shadow-[-12px_0_40px_-20px_rgba(28,23,25,0.4)] lg:hidden"
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

              <nav className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">
                <ul>
                  {navLinks.map((link, i) => {
                    const subs = (link.children || []).filter((c) => c.to !== link.to)

                    return (
                      <motion.li
                        key={link.to}
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                        className="border-b border-rose-100/70 py-1 last:border-0"
                      >
                        <NavLink
                          to={link.to}
                          end={link.to === '/'}
                          className={({ isActive }) =>
                            `-mx-2 flex min-h-[52px] items-center rounded-lg px-2 font-display text-[20px] transition-colors ${
                              isActive ? 'text-rose-600' : 'text-ink active:bg-rose-50'
                            }`
                          }
                        >
                          {link.label}
                        </NavLink>

                        {subs.length > 0 && (
                          <ul className="-mt-1 flex flex-wrap gap-x-4 gap-y-1 pb-3 pl-0.5">
                            {subs.map((child) => (
                              <li key={child.to}>
                                <NavLink
                                  to={child.to}
                                  className={({ isActive }) =>
                                    `inline-flex min-h-[34px] items-center text-[13px] transition-colors ${
                                      isActive ? 'text-rose-600' : 'text-ink/55 active:text-rose-600'
                                    }`
                                  }
                                >
                                  {child.label}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </motion.li>
                    )
                  })}
                </ul>
              </nav>

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
