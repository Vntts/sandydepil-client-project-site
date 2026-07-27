import { useCallback, useRef, useState } from 'react'
import { MoveHorizontal } from 'lucide-react'

/**
 * Slider comparativo antes/depois.
 *
 * A versão anterior escutava touchmove de forma passiva, então arrastar no
 * celular movia o divisor E rolava a página ao mesmo tempo — inutilizável.
 *
 * Agora usa Pointer Events com captura no punho de arraste:
 *  - o punho tem `touch-action: none`, logo o gesto pertence a ele;
 *  - o container tem `touch-action: pan-y`, então a rolagem vertical da página
 *    continua funcionando normalmente ao deslizar sobre a imagem;
 *  - tocar em qualquer ponto da imagem move o divisor até ali (mais rápido que
 *    arrastar, e o alvo é a imagem inteira em vez de um punho de 44px);
 *  - setas do teclado continuam ajustando de 4 em 4%.
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

  const onHandleDown = (e) => {
    e.currentTarget.setPointerCapture?.(e.pointerId)
    setDragging(true)
  }

  const onHandleMove = (e) => {
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
      onClick={(e) => updateFromClientX(e.clientX)}
      className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-2xl bg-beige"
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

      {/* Divisor + punho */}
      <div
        className="pointer-events-none absolute inset-y-0 w-[2px] bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.25)]"
        style={{ left: `${position}%` }}
      >
        <button
          type="button"
          onPointerDown={onHandleDown}
          onPointerMove={onHandleMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={onKeyDown}
          aria-label="Arraste para comparar antes e depois"
          aria-valuenow={Math.round(position)}
          aria-valuemin={0}
          aria-valuemax={100}
          role="slider"
          tabIndex={0}
          style={{ touchAction: 'none' }}
          className={`pointer-events-auto absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-2 border-white bg-rose-500 text-white shadow-lift transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
            dragging ? 'scale-110' : 'md:hover:scale-110'
          }`}
        >
          <MoveHorizontal size={17} />
        </button>
      </div>
    </div>
  )
}
