import { Route, Routes } from 'react-router-dom'

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

export default function App() {
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
