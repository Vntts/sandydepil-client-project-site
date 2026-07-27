import Reveal from './Reveal'

/**
 * Cabeçalho de seção com três tratamentos visuais distintos.
 *
 * Antes existia um só, aplicado em toda seção do site — rótulo + traço +
 * título centralizado com uma palavra em itálico. Repetido dez vezes, esse
 * padrão é justamente o que dá ao site a cara de template automático.
 *
 * variant:
 *  - 'stack'     rótulo pequeno acima, título à esquerda (padrão, discreto)
 *  - 'inline'    rótulo e título na mesma linha de base, com régua ao lado
 *  - 'centered'  centralizado — usar com parcimônia, no máximo uma vez por página
 *  - 'numbered'  numeral grande de apoio, tom editorial
 */
export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  variant = 'stack',
  number,
  invert = false,
  className = '',
  children,
}) {
  const titleColor = invert ? 'text-white' : 'text-ink'
  const eyebrowColor = invert ? 'text-rose-200' : 'text-rose-500'
  const descColor = invert ? 'text-white/70' : 'text-ink/60'

  const heading = (
    <h2
      className={`font-display text-[26px] leading-[1.2] sm:text-4xl lg:text-[2.6rem] ${titleColor}`}
    >
      {title}
      {highlight && <> <span className="italic text-rose-500">{highlight}</span></>}
    </h2>
  )

  if (variant === 'numbered') {
    return (
      <Reveal className={className}>
        <div className="flex items-start gap-5 sm:gap-7">
          {number && (
            <span
              aria-hidden="true"
              className="mt-1 font-display text-4xl leading-none text-rose-200 sm:text-5xl"
            >
              {number}
            </span>
          )}
          <div className="max-w-2xl">
            {eyebrow && (
              <p className={`text-[10px] font-medium uppercase tracking-luxe sm:text-[11px] ${eyebrowColor}`}>
                {eyebrow}
              </p>
            )}
            <div className="mt-3">{heading}</div>
            {description && (
              <p className={`mt-4 text-[14.5px] leading-relaxed sm:text-[15px] ${descColor}`}>
                {description}
              </p>
            )}
            {children}
          </div>
        </div>
      </Reveal>
    )
  }

  if (variant === 'inline') {
    return (
      <Reveal className={className}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <div className="max-w-xl">
            {eyebrow && (
              <p className={`text-[10px] font-medium uppercase tracking-luxe sm:text-[11px] ${eyebrowColor}`}>
                {eyebrow}
              </p>
            )}
            <div className="mt-3">{heading}</div>
          </div>
          {description && (
            <p className={`max-w-sm text-[14px] leading-relaxed sm:text-right ${descColor}`}>
              {description}
            </p>
          )}
        </div>
        {children}
      </Reveal>
    )
  }

  if (variant === 'centered') {
    return (
      <Reveal className={`mx-auto max-w-2xl text-center ${className}`}>
        {eyebrow && (
          <p className={`text-[10px] font-medium uppercase tracking-luxe sm:text-[11px] ${eyebrowColor}`}>
            {eyebrow}
          </p>
        )}
        <div className="mt-3">{heading}</div>
        {description && (
          <p className={`mt-4 text-[14.5px] leading-relaxed sm:text-[15px] ${descColor}`}>
            {description}
          </p>
        )}
        {children}
      </Reveal>
    )
  }

  // stack (padrão)
  return (
    <Reveal className={`max-w-2xl ${className}`}>
      {eyebrow && (
        <p className={`text-[10px] font-medium uppercase tracking-luxe sm:text-[11px] ${eyebrowColor}`}>
          {eyebrow}
        </p>
      )}
      <div className="mt-3">{heading}</div>
      {description && (
        <p className={`mt-4 text-[14.5px] leading-relaxed sm:text-[15px] ${descColor}`}>
          {description}
        </p>
      )}
      {children}
    </Reveal>
  )
}
