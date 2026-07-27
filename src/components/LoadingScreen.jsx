import { motion } from 'framer-motion'
import Logo from './Logo'

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-soft-fade"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
    >
      {/* Halo decorativo */}
      <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-rose-200/40 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex flex-col items-center"
      >
        <Logo className="scale-125" />

        {/* Barra de progresso */}
        <div className="mt-8 h-[2px] w-40 overflow-hidden rounded-full bg-rose-200/60">
          <motion.div
            className="h-full bg-rose-gradient"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          />
        </div>

        <motion.p
          className="mt-6 text-center text-xs font-light uppercase tracking-luxe text-rose-600/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          Sua experiência de beleza começa aqui
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
