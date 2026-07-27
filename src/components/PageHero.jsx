import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

/**
 * Cabeçalho das páginas internas.
 * Altura reduzida no mobile (py-12) — 20 de padding vertical em tela de 390px
 * consumia metade da primeira dobra só com título.
 *
 * Se a imagem de fundo não carregar (arquivo ainda não adicionado), ela é
 * descartada e sobra o fundo escuro com o degradê — que já é o suficiente para
 * o texto branco. Sem isso, alguns navegadores desenham o ícone de imagem
 * quebrada sobre o cabeçalho.
 */
export default function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  image,
  breadcrumbs = [],
  children,
}) {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <section className="relative overflow-hidden bg-ink">
      {image && !imageFailed && (
        <>
          <motion.img
            src={image}
            alt=""
            aria-hidden="true"
            onError={() => setImageFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ scale: 1.06, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/70 to-ink/45 lg:bg-gradient-to-r lg:from-ink/90 lg:via-ink/70 lg:to-ink/35" />
        </>
      )}
      <div className="pointer-events-none absolute -left-24 top-0 hidden h-80 w-80 rounded-full bg-rose-400/20 blur-[110px] lg:block" />

      <div className="container-luxe relative py-12 sm:py-16 lg:py-24">
        <motion.nav
          aria-label="Você está aqui"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-1.5 text-[10.5px] text-white/45 sm:text-[11px]"
        >
          <Link to="/" className="transition-colors hover:text-rose-200">
            Início
          </Link>
          {breadcrumbs.map((b, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <ChevronRight size={10} className="opacity-50" />
              {b.to && i < breadcrumbs.length - 1 ? (
                <Link to={b.to} className="transition-colors hover:text-rose-200">
                  {b.label}
                </Link>
              ) : (
                <span className="text-white/75">{b.label}</span>
              )}
            </span>
          ))}
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-3xl sm:mt-7"
        >
          {eyebrow && (
            <p className="text-[10px] font-medium uppercase tracking-luxe text-rose-200 sm:text-[11px]">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-3 font-display text-[28px] leading-[1.15] text-white sm:text-4xl lg:text-[2.9rem]">
            {title} {highlight && <span className="italic text-rose-200">{highlight}</span>}
          </h1>
          {description && (
            <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-white/70 sm:mt-6 sm:text-[15px]">
              {description}
            </p>
          )}
          {children && <div className="mt-6 sm:mt-8">{children}</div>}
        </motion.div>
      </div>
    </section>
  )
}
