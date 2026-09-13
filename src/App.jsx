import { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import Layout from './components/Layout'
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Procedimentos from './pages/Procedimentos'
import ProcedimentoDetalhe from './pages/ProcedimentoDetalhe'
import Cursos from './pages/Cursos'
import Resultados from './pages/Resultados'
import Depoimentos from './pages/Depoimentos'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contato from './pages/Contato'
import NotFound from './pages/NotFound'
import CursoDermaplaning from './pages/CursoDermaplaning'
import CursoDepilacaoAxilasVirilha from './pages/CursoDepilacaoAxilasVirilha'

/**
 * Como o site é uma SPA, o `fbq('track', 'PageView')` do index.html só roda no
 * primeiro carregamento. Este efeito dispara um PageView a cada troca de rota
 * (pulando a primeira, que o index.html já contabilizou) para que o Meta Pixel
 * registre a navegação interna.
 */
function useMetaPixelPageView() {
  const { pathname, search } = useLocation()
  const primeiraRota = useRef(true)

  useEffect(() => {
    if (primeiraRota.current) {
      primeiraRota.current = false
      return
    }
    if (typeof window.fbq === 'function') window.fbq('track', 'PageView')
  }, [pathname, search])
}

export default function App() {
  useMetaPixelPageView()

  return (
    <Routes>
      {/* Landings de venda de cursos — fora do <Layout />: têm cabeçalho e
          rodapé próprios, sem o menu de 9 itens do site institucional, para
          manter o foco em converter a visita em vaga. */}
      <Route path="/cursos/dermaplaning" element={<CursoDermaplaning />} />
      <Route path="/cursos/depilacao-axilas-virilha" element={<CursoDepilacaoAxilasVirilha />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/procedimentos" element={<Procedimentos />} />
        <Route path="/procedimentos/:slug" element={<ProcedimentoDetalhe />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/resultados" element={<Resultados />} />
        <Route path="/depoimentos" element={<Depoimentos />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
