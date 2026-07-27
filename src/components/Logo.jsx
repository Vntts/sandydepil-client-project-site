export default function Logo({ className = '', variant = 'dark' }) {
  const main = variant === 'light' ? 'text-white' : 'text-ink'
  const accent = variant === 'light' ? 'text-rose-200' : 'text-rose-500'

  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className={`font-display text-2xl tracking-tight ${main}`}>
        Sandy<span className={accent}>depil</span>
      </span>
      <span
        className={`mt-1 text-[8px] font-medium uppercase tracking-luxe ${
          variant === 'light' ? 'text-white/70' : 'text-rose-500/80'
        }`}
      >
        Depilação &amp; Estética
      </span>
    </span>
  )
}
