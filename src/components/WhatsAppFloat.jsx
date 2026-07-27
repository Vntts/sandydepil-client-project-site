import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { whatsappLink } from '../data/site'

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Agendar pelo WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          /* Oculto no mobile: lá a barra de ação fixa (MobileActionBar) faz esse papel */
          className="group fixed bottom-6 right-6 z-50 hidden items-center gap-3 lg:flex"
        >
          <span className="hidden rounded-full border border-rose-100 bg-white/95 px-4 py-2 text-xs font-medium text-ink shadow-soft backdrop-blur transition-all duration-300 group-hover:border-rose-200 sm:block">
            Agendar atendimento
          </span>

          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lift transition-transform duration-300 group-hover:scale-105">
            <span className="absolute inset-0 animate-pulseRing rounded-full bg-[#25D366]/50" />
            <svg viewBox="0 0 24 24" className="relative h-7 w-7 fill-white" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.347-.347.52-.52.174-.174.232-.298.347-.497.115-.198.058-.372-.058-.52-.115-.149-.67-1.612-.917-2.207-.243-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.005c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411zm-8.47 18.297h-.004c-1.774 0-3.513-.475-5.031-1.374l-.361-.214-3.741.98.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.267c.002-5.45 4.436-9.884 9.889-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.451-4.437 9.889-9.886 9.889z" />
            </svg>
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
