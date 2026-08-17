import { useCallback, useRef, useState } from 'react'
import { MoveHorizontal } from 'lucide-react'

/**
 * Slider comparativo antes/depois.
 *
 * Versão anterior: só o punho de 48px reagia ao arraste. Tocar e arrastar em
 * qualquer outro ponto da foto — o que a maioria das pessoas tenta fazer no
 * celular, porque o punho é um alvo minúsculo perto do dedo — não movia nada.
 * Parecia quebrado.
 *
 * Agora o container inteiro escuta o gesto, com Pointer Events:
 *  - o container tem `touch-action: pan-y`, então o navegador reserva o eixo
 *    vertical para a rolagem nativa da página e deixa o eixo horizontal livre
 *    para o JavaScript — um arraste vertical rola a página, um arraste
 *    horizontal move o divisor, e os dois nunca disputam o mesmo gesto;
 *  - tocar ou pressionar em qualquer ponto da imagem já move o divisor até ali
 *    e inicia o arraste a partir dele — não é preciso acertar o punho;
 *  - setas do teclado, com foco no punho, continuam ajustando de 4 em 4%.
 */
export default function BeforeAfter({ before, after, alt = 'Comparativo antes e depois' }) {
  const [position, setPosition] = useState(50)
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef(null)

  const updateFromClientX = useCallback((clientX) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, pct)))
  }, [])

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture?.(e.pointerId)
    setDragging(true)
    updateFromClientX(e.clientX)
  }

  const onPointerMove = (e) => {
    if (!dragging) return
    updateFromClientX(e.clientX)
  }

  const endDrag = (e) => {
    e.currentTarget.releasePointerCapture?.(e.pointerId)
    setDragging(false)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setPosition((p) => Math.max(0, p - 4))
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      setPosition((p) => Math.min(100, p + 4))
    }
  }

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className="relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden rounded-2xl bg-beige"
      style={{ touchAction: 'pan-y' }}
    >
      {/* Depois (fundo) */}
      <img
        src={after}
        alt={`${alt} — depois`}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        draggable={false}
      />

      {/* Antes (recortado) */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={before}
          alt={`${alt} — antes`}
          className="h-full w-full object-cover"
          loading="lazy"
          draggable={false}
        />
      </div>

      {/* Etiquetas */}
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/55 px-2.5 py-1 text-[9px] font-medium uppercase tracking-luxe text-white backdrop-blur-sm sm:left-4 sm:top-4 sm:px-3 sm:text-[10px]">
        Antes
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-rose-500/85 px-2.5 py-1 text-[9px] font-medium uppercase tracking-luxe text-white backdrop-blur-sm sm:right-4 sm:top-4 sm:px-3 sm:text-[10px]">
        Depois
      </span>

      {/* Divisor + punho — só visual e teclado agora. O arraste em si é
          tratado pelo container inteiro logo acima, então o punho não
          precisa mais dos próprios listeners de ponteiro (o clique nele
          continua funcionando: o evento sobe até o container). */}
      <div
        className="pointer-events-none absolute inset-y-0 w-[2px] bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.25)]"
        style={{ left: `${position}%` }}
      >
        <button
          type="button"
          onKeyDown={onKeyDown}
          aria-label="Arraste para comparar antes e depois"
          aria-valuenow={Math.round(position)}
          aria-valuemin={0}
          aria-valuemax={100}
          role="slider"
          tabIndex={0}
          className={`pointer-events-auto absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-rose-500 text-white shadow-lift transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
            dragging ? 'scale-110' : 'md:hover:scale-110'
          }`}
        >
          <MoveHorizontal size={17} />
        </button>
      </div>
    </div>
  )
}
