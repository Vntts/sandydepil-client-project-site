import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import useSeo from '../hooks/useSeo'
import { whatsappLink } from '../data/site'

export default function NotFound() {
  useSeo({
    title: 'Página não encontrada',
    description: 'A página que você procura não existe ou foi movida.',
    path: '/404',
  })

  return (
    <section className="flex min-h-[70vh] items-center bg-soft-fade py-24">
      <div className="container-luxe text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-display text-7xl text-rose-300 lg:text-8xl">404</p>
          <div className="hairline mx-auto mt-6" />
          <h1 className="mt-7 font-display text-3xl text-ink lg:text-4xl">
            Não encontramos esta página
          </h1>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-ink/60">
            O endereço pode ter mudado ou o link estar incorreto. Você pode voltar ao início ou ver
            todos os procedimentos disponíveis.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/" className="btn-primary">
              Voltar ao início
              <ArrowRight size={15} />
            </Link>
            <Link to="/procedimentos" className="btn-ghost">
              Ver procedimentos
            </Link>
          </div>

          <p className="mt-8 text-sm text-ink/50">
            Ou{' '}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-rose-600 underline decoration-rose-200 underline-offset-4 hover:decoration-rose-400"
            >
              fale com a gente pelo WhatsApp
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  )
}
