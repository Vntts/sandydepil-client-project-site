import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone } from 'lucide-react'
import { business, whatsappLink } from '../data/site'

/**
 * Barra de ação fixa no rodapé, só no mobile.
 *
 * Substitui o botão flutuante do WhatsApp em telas pequenas: um botão redondo
 * cobre conteúdo e oferece uma única ação, enquanto a barra ancorada dá as três
 * ações que alguém procurando um salão no celular realmente quer — agendar,
 * ligar e traçar rota. É o padrão de sites de serviço local por um motivo.
 *
 * O `pb-actionbar` no rodapé garante que nada fique escondido atrás dela.
 */
export default function MobileActionBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 260)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.div
      initial={false}
      animate={{ y: visible ? 0 : 110 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-rose-100 bg-cream/95 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-stretch gap-2 px-4 py-3">
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full bg-rose-gradient text-sm font-medium text-white shadow-soft active:scale-[0.98]"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
            <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.005c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411zm-8.47 18.297h-.004c-1.774 0-3.513-.475-5.031-1.374l-.361-.214-3.741.98.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.267c.002-5.45 4.436-9.884 9.889-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.451-4.437 9.889-9.886 9.889z" />
          </svg>
          Agendar
        </a>

        <a
          href={`tel:+${business.phoneRaw}`}
          aria-label={`Ligar para ${business.phone}`}
          className="flex h-[48px] w-[48px] items-center justify-center rounded-full border border-rose-200 bg-white text-rose-600 active:scale-[0.98]"
        >
          <Phone size={18} strokeWidth={1.8} />
        </a>

        <a
          href={business.mapsDirections}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Traçar rota até a clínica"
          className="flex h-[48px] w-[48px] items-center justify-center rounded-full border border-rose-200 bg-white text-rose-600 active:scale-[0.98]"
        >
          <MapPin size={18} strokeWidth={1.8} />
        </a>
      </div>
    </motion.div>
  )
}
