import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { RevealGroup, RevealItem } from './Reveal'
import { faqs } from '../data/site'

/**
 * FAQ em lista com divisórias, não em cards individuais.
 * Oito cards arredondados empilhados no celular parecem oito componentes
 * soltos; a lista com régua lê como um documento.
 */
export default function FaqAccordion({ items = faqs }) {
  const [open, setOpen] = useState(null)

  return (
    <RevealGroup className="mt-8 divide-y divide-rose-100 border-y border-rose-100" stagger={0.05}>
      {items.map((f, i) => {
        const isOpen = open === i
        return (
          <RevealItem key={f.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-5 py-5 text-left"
            >
              <span
                className={`font-display text-[16px] leading-snug transition-colors duration-300 sm:text-[17px] ${
                  isOpen ? 'text-rose-600' : 'text-ink'
                }`}
              >
                {f.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                  isOpen ? 'bg-rose-gradient text-white' : 'bg-rose-50 text-rose-500'
                }`}
              >
                <Plus size={14} />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-5 pr-10 text-[13.5px] leading-relaxed text-ink/65 sm:text-[14px]">
                    {f.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </RevealItem>
        )
      })}
    </RevealGroup>
  )
}
