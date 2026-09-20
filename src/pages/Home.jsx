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
import Reveal from '../components/Reveal'
import LeadCaptureForm from '../components/LeadCaptureForm'

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
    title: 'Depilação com Cera e Estética em Santa Maria – DF',
    description: `Depilação com cera em axilas, virilha, pernas e rosto em Santa Maria – DF, desde ${business.foundedYear}. Mais de ${business.appointments / 1000} mil atendimentos em ${business.yearsInProfession} anos de profissão. Também limpeza de pele, dermaplaning e drenagem linfática. Nota 5,0 no Google.`,
    path: '/',
  })

  return (
    <>
      <Hero />
      <ProceduresMarquee />
      <AboutPreview />
      <ProceduresPreview />

      {/* Captação de lead — a cliente escolhe o procedimento de interesse
          (ver `showProcedureSelect` em LeadCaptureForm.jsx), diferente da
          versão de página de procedimento, que já vem com o procedimento
          preenchido sozinho. */}
      <section className="bg-cream pb-2 pt-14 sm:pt-16">
        <div className="container-luxe">
          <Reveal variant="fadeUp" className="mx-auto max-w-2xl">
            <LeadCaptureForm showProcedureSelect />
          </Reveal>
        </div>
      </section>

      <Results limit={3} />
      <CoursesPreview />
      <Reviews />
      <FinalCTA />
    </>
  )
}
