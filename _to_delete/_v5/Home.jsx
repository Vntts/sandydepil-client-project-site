import useSeo from '../hooks/useSeo'
import { business } from '../data/site'

import Hero from '../components/Hero'
import ProceduresMarquee from '../components/ProceduresMarquee'
import AboutPreview from '../components/AboutPreview'
import ProceduresPreview from '../components/ProceduresPreview'
import Results from '../components/Results'
import CoursesPreview from '../components/CoursesPreview'
import Reviews from '../components/Reviews'
import FinalCTA from '../components/FinalCTA'

/**
 * HOME — hero, faixa contínua de procedimentos e 5 seções de conteúdo.
 *
 * Saíram daqui:
 *  · Stats (barra de números) → substituída pela faixa de procedimentos: logo
 *    abaixo do hero o visitante vê o que a clínica faz, não uma estatística
 *  · WhyUs → vive em /sobre, onde o leitor já está buscando esse tipo de argumento
 *  · InstagramFeed → grade de posts fictícios; volta quando houver feed real
 *  · Location → o mapa e os horários são o conteúdo principal de /contato,
 *    e o iframe do Google Maps custava centenas de kB na página mais visitada
 *
 * A ordem segue quem chega sem conhecer a clínica:
 * quem somos → o que fazemos → prova de que funciona → o que mais oferecemos →
 * o que outras clientes dizem.
 */
export default function Home() {
  useSeo({
    title: 'Clínica de Estética e Depilação em Santa Maria – DF',
    description: `Clínica de estética em Santa Maria – DF desde ${business.foundedYear}. Depilação com cera, limpeza de pele, drenagem linfática, design de sobrancelhas e rejuvenescimento facial. Nota 5,0 no Google.`,
    path: '/',
  })

  return (
    <>
      <Hero />
      <ProceduresMarquee />
      <AboutPreview />
      <ProceduresPreview />
      <Results limit={3} />
      <CoursesPreview />
      <Reviews />
      <FinalCTA />
    </>
  )
}
