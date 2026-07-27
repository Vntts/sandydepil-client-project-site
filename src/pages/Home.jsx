import useSeo from '../hooks/useSeo'
import { business } from '../data/site'

import Hero from '../components/Hero'
import Stats from '../components/Stats'
import AboutPreview from '../components/AboutPreview'
import ProceduresPreview from '../components/ProceduresPreview'
import Results from '../components/Results'
import WhyUs from '../components/WhyUs'
import CoursesPreview from '../components/CoursesPreview'
import Reviews from '../components/Reviews'
import InstagramFeed from '../components/InstagramFeed'
import Location from '../components/Location'
import FinalCTA from '../components/FinalCTA'

/**
 * HOME — 10 seções (antes 13).
 *
 * Saíram daqui:
 *  · CredentialsBar e Differentials → fundidas em WhyUs
 *  · ExperienceSteps → movida para /sobre, onde o contexto é mais natural
 *    (na home, entre resultados e depoimentos, atrasava o caminho até a prova social)
 *  · Os blocos "Quer X? Manda mensagem" no meio das seções
 *
 * A ordem segue a lógica de quem chega sem conhecer a clínica:
 * quem somos → o que fazemos → prova de que funciona → por que confiar →
 * o que mais oferecemos → o que outras dizem → onde estamos.
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
      <Stats />
      <AboutPreview />
      <ProceduresPreview />
      <Results limit={3} />
      <WhyUs />
      <CoursesPreview />
      <Reviews />
      <InstagramFeed />
      <Location />
      <FinalCTA />
    </>
  )
}
