import { useState } from 'react'
import { Flower2, GraduationCap, ImageIcon, Leaf, Sparkles } from 'lucide-react'

const icons = {
  faciais: Sparkles,
  corporais: Leaf,
  especiais: Flower2,
  produto: Flower2,
  artigo: GraduationCap,
  default: ImageIcon,
}

/**
 * Imagem com reserva elegante.
 *
 * Por que existe: as fotos do site apontam para arquivos locais que podem ainda
 * não ter sido adicionados. Sem tratamento, o navegador mostra o ícone de
 * imagem quebrada — pior que não ter foto. Aqui, se o arquivo não carrega,
 * entra uma reserva desenhada com a paleta do site, o ícone da categoria e o
 * nome do item. Fica evidente que a foto está pendente, sem parecer defeito.
 *
 * Assim que o arquivo aparecer na pasta com o nome esperado, a foto real passa
 * a ser exibida sozinha — nenhuma alteração de código é necessária.
 */
export default function SmartImage({
  src,
  alt,
  label,
  kind = 'default',
  className = '',
  imgClassName = '',
  width,
  height,
  loading = 'lazy',
}) {
  const [failed, setFailed] = useState(!src)
  const Icon = icons[kind] || icons.default

  if (failed) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-rose-50 via-beige to-rose-100/70 px-5 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Icon size={26} strokeWidth={1} className="text-rose-300" aria-hidden="true" />
        {label && (
          <span className="font-display text-[13px] italic leading-snug text-rose-700/70">
            {label}
          </span>
        )}
        <span className="text-[8.5px] font-medium uppercase tracking-[0.24em] text-rose-400/80">
          Foto em breve
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      onError={() => setFailed(true)}
      className={imgClassName || className}
    />
  )
}
