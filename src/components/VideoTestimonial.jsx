import { useState } from 'react'
import { Play } from 'lucide-react'

/**
 * Card de depoimento em vídeo — mostra a miniatura (poster) com um botão de
 * play; só carrega e toca o vídeo de verdade depois do clique, para não
 * pesar a página com vídeos que ninguém pediu para ver.
 */
export default function VideoTestimonial({ src, poster, name }) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <div className="aspect-[9/16] w-full overflow-hidden rounded-2xl bg-ink shadow-soft">
        <video
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
          className="h-full w-full object-cover"
        >
          Seu navegador não suporta vídeo em HTML5.
        </video>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Assistir depoimento em vídeo${name ? ` de ${name}` : ''}`}
      className="group relative block aspect-[9/16] w-full overflow-hidden rounded-2xl bg-ink shadow-soft"
    >
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        className="h-full w-full object-cover transition-transform duration-700 md:group-hover:scale-[1.05]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />

      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-rose-600 shadow-lift transition-transform duration-300 group-hover:scale-105">
          <Play size={24} className="ml-1 fill-current" />
        </span>
      </span>

      {name && (
        <span className="absolute bottom-3.5 left-3.5 right-3.5 text-left text-[12.5px] font-medium text-white">
          {name}
        </span>
      )}
    </button>
  )
}
