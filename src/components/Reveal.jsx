import { motion } from 'framer-motion'

const variants = {
  fadeUp: { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0 } },
  fadeIn: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  slideUp: { hidden: { opacity: 0, y: 64 }, show: { opacity: 1, y: 0 } },
  scaleIn: { hidden: { opacity: 0, scale: 0.94 }, show: { opacity: 1, scale: 1 } },
  slideLeft: { hidden: { opacity: 0, x: 48 }, show: { opacity: 1, x: 0 } },
  slideRight: { hidden: { opacity: 0, x: -48 }, show: { opacity: 1, x: 0 } },
}

/** Wrapper de animação on-scroll reutilizável. */
export default function Reveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.7,
  className = '',
  as = 'div',
  amount = 0.25,
}) {
  const MotionTag = motion[as] || motion.div

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={variants[variant]}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}

/** Container para escalonar a entrada de filhos. */
export function RevealGroup({ children, className = '', stagger = 0.12, amount = 0.15 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  )
}

/** Filho de RevealGroup. */
export function RevealItem({ children, variant = 'fadeUp', className = '', duration = 0.65 }) {
  return (
    <motion.div
      className={className}
      variants={variants[variant]}
      transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
