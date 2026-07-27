import { useEffect } from 'react'
import { business } from '../data/site'

const setMeta = (attr, key, content) => {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const setLink = (rel, href) => {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Define title, description, canonical, Open Graph e (opcionalmente) um bloco
 * JSON-LD específico da página.
 *
 * Observação: o site é uma SPA, então esses valores são aplicados no cliente.
 * O Google executa JavaScript e indexa normalmente, mas se o SEO se tornar
 * prioridade máxima, considere migrar para pré-renderização estática
 * (vite-plugin-ssg ou similar) — está anotado no README.
 */
export default function useSeo({ title, description, path = '/', image, jsonLd }) {
  // Serializamos o JSON-LD para que o efeito não reexecute a cada render
  // (o objeto literal muda de identidade em toda renderização).
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : null

  useEffect(() => {
    const fullTitle = title ? `${title} | ${business.name}` : `${business.fullName}`
    const url = `${business.siteUrl}${path}`
    const img = image || `${business.siteUrl}/images/og-sandydepil.jpg`

    document.title = fullTitle
    setMeta('name', 'description', description)
    setLink('canonical', url)

    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', img)
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', img)

    let script
    if (jsonLdKey) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.page = 'true'
      script.textContent = jsonLdKey
      document.head.appendChild(script)
    }

    return () => {
      if (script && script.parentNode) script.parentNode.removeChild(script)
    }
  }, [title, description, path, image, jsonLdKey])
}
