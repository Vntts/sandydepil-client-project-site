import useSeo from '../hooks/useSeo'
import PageHero from '../components/PageHero'
import Results from '../components/Results'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import VideoTestimonial from '../components/VideoTestimonial'
import FinalCTA from '../components/FinalCTA'
import { videoTestimonials } from '../data/site'

export default function Resultados() {
  useSeo({
    title: 'Resultados — Antes e Depois',
    description:
      'Veja resultados reais de clientes atendidas na Sandydepil em Santa Maria – DF: limpeza de pele, design de sobrancelhas, drenagem linfática, dermaplaning e mais.',
    path: '/resultados',
  })

  return (
    <>
      <PageHero
        eyebrow="Resultados"
        title="O trabalho falando por si"
        description="Comparativos de clientes reais, publicados com autorização."
        image="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: 'Resultados' }]}
      />

      {/* Grade, não trilho: aqui a lista completa é o conteúdo da página */}
      <Results showHeading={false} asRail={false} />

      {videoTestimonials.length > 0 && (
        <section className="bg-offwhite section-y">
          <div className="container-luxe">
            <SectionHeading
              variant="inline"
              eyebrow="Depoimentos"
              title="Quem já passou por aqui conta"
              highlight="como foi"
              description="Clientes reais, com as próprias palavras — sem roteiro."
            />

            <RevealGroup
              className="mt-9 grid grid-cols-2 gap-4 sm:gap-6 lg:mt-12 lg:grid-cols-4"
              stagger={0.1}
            >
              {videoTestimonials.map((v) => (
                <RevealItem key={v.video}>
                  <VideoTestimonial src={v.video} poster={v.poster} name={v.name} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* Nota de transparência — sem card, como um aparte editorial */}
      <section className="bg-offwhite section-y-tight">
        <div className="container-luxe">
          <Reveal className="max-w-3xl border-l-2 border-rose-300 pl-5 sm:pl-7">
            <p className="eyebrow">Sobre estas imagens</p>
            <p className="mt-3 text-[13.5px] leading-relaxed text-ink/65 sm:text-[14.5px]">
              Resultados estéticos variam de pessoa para pessoa. Tipo de pele, histórico, idade,
              hábitos e adesão aos cuidados domiciliares influenciam diretamente o que cada protocolo
              consegue entregar. As imagens acima ilustram casos reais, mas não representam garantia
              de resultado idêntico — por isso toda avaliação começa com uma conversa honesta sobre
              expectativas.
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
