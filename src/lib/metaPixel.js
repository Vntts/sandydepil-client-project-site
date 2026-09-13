/**
 * META PIXEL — camada fina em volta do `fbq` carregado no index.html.
 *
 * Por que existe: o Pixel é carregado por um <script> no index.html, fora do
 * React. Chamar `window.fbq(...)` espalhado pelos componentes é frágil (quebra
 * se o script for bloqueado por um ad blocker) e difícil de auditar depois.
 * Aqui tudo passa por uma função só, que é no-op quando o Pixel não carregou.
 *
 * Eventos usados:
 *   Contact — clique em WhatsApp nas páginas do site institucional
 *   Lead    — clique em WhatsApp nas landings de curso (/cursos/...)
 * A separação existe para que as campanhas de serviço e as de curso possam ser
 * otimizadas por eventos diferentes no Gerenciador de Eventos da Meta.
 */

import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/** Dispara um evento padrão do Pixel. Silencioso se o fbq não estiver disponível. */
export function pixelTrack(evento, parametros = {}) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
  window.fbq('track', evento, parametros)
}

/** Landings de curso ficam sob /cursos — lá o clique vale como Lead. */
export function ehRotaDeCurso(pathname) {
  const caminho =
    pathname ?? (typeof window !== 'undefined' ? window.location.pathname : '')
  return caminho.startsWith('/cursos')
}

/**
 * Registra a intenção de contato via WhatsApp.
 * @param {object}  opts
 * @param {string}  opts.origem   Rótulo do botão/contexto, para identificar no relatório.
 * @param {string} [opts.pathname] Rota no momento do clique (default: a atual).
 */
export function trackWhatsApp({ origem, pathname } = {}) {
  const curso = ehRotaDeCurso(pathname)
  pixelTrack(curso ? 'Lead' : 'Contact', {
    content_name: origem || 'WhatsApp',
    content_category: curso ? 'Curso' : 'Servico',
  })
}

/** Texto legível do botão, para saber depois qual CTA converteu mais. */
function rotuloDoLink(elemento) {
  const rotulo =
    elemento.getAttribute('aria-label') || elemento.textContent || ''
  return rotulo.replace(/\s+/g, ' ').trim().slice(0, 60) || 'WhatsApp'
}

/**
 * Intercepta, por delegação no document, o clique em qualquer link de WhatsApp
 * da aplicação. Feito assim (e não com um onClick em cada botão) porque o site
 * tem mais de 25 CTAs de WhatsApp espalhados: um listener só cobre todos e
 * continua cobrindo os que forem criados depois, sem risco de esquecer um.
 *
 * Usa a fase de captura para registrar o evento mesmo que algum handler
 * intermediário chame stopPropagation.
 */
export function useWhatsAppTracking() {
  const { pathname } = useLocation()
  const rotaAtual = useRef(pathname)
  rotaAtual.current = pathname

  useEffect(() => {
    const aoClicar = (evento) => {
      const link = evento.target?.closest?.(
        'a[href*="wa.me"], a[href*="api.whatsapp.com"]'
      )
      if (!link) return
      trackWhatsApp({ origem: rotuloDoLink(link), pathname: rotaAtual.current })
    }

    document.addEventListener('click', aoClicar, true)
    return () => document.removeEventListener('click', aoClicar, true)
  }, [])
}

/**
 * Como o site é uma SPA, o `fbq('track', 'PageView')` do index.html só roda no
 * primeiro carregamento. Este efeito dispara um PageView a cada troca de rota
 * (pulando a primeira, que o index.html já contabilizou).
 */
export function usePageViewTracking() {
  const { pathname, search } = useLocation()
  const primeiraRota = useRef(true)

  useEffect(() => {
    if (primeiraRota.current) {
      primeiraRota.current = false
      return
    }
    pixelTrack('PageView')
  }, [pathname, search])
}

/** Atalho para ligar todo o rastreamento de uma vez (usado no App). */
export function useMetaPixel() {
  usePageViewTracking()
  useWhatsAppTracking()
}
