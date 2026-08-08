/**
 * Marca em rosa nos dois fundos.
 *
 * Duas tonalidades em vez de uma só: "Sandy" mais fechado e "depil" mais claro
 * mantêm a leitura da palavra composta sem que o conjunto deixe de ser rosa.
 * No fundo escuro (rodapé) a escala inverte para tons claros, senão o texto
 * some contra o ink. Os tons escolhidos ficam acima de 3:1 de contraste
 * — rose-400 no fundo creme dava 2,45:1 e a palavra sumia.
 */
export default function Logo({ className = '', variant = 'dark' }) {
  const light = variant === 'light'
  const main = light ? 'text-rose-200' : 'text-rose-600'
  const accent = light ? 'text-rose-300' : 'text-rose-500'
  const tagline = light ? 'text-rose-200/70' : 'text-rose-500/80'

  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className={`font-display text-2xl tracking-tight ${main}`}>
        Sandy<span className={accent}>depil</span>
      </span>
      <span className={`mt-1 text-[8px] font-medium uppercase tracking-luxe ${tagline}`}>
        Depilação &amp; Estética
      </span>
    </span>
  )
}
