import useSeo from '../hooks/useSeo'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Timeline from '../components/Timeline'
import Professional from '../components/Professional'
import WhyUs from '../components/WhyUs'
import ExperienceSteps from '../components/ExperienceSteps'
import FinalCTA from '../components/FinalCTA'
import { business } from '../data/site'

export default function Sobre() {
  useSeo({
    title: 'Sobre',
    description: `Conheça a história da ${business.fullName}: mais de ${business.yearsOfExperience} anos de atuação em Santa Maria – DF, milhares de atendimentos e nota 5,0 no Google.`,
    path: '/sobre',
  })

  return (
    <>
      <PageHero
        eyebrow="Sobre"
        title="Mais de uma década de estética séria em Santa Maria"
        description={`Desde ${business.foundedYear}, a Sandydepil construiu sua reputação atendimento por atendimento — sem promessas exageradas e sem atalhos.`}
        image="https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: 'Sobre' }]}
      />

      {/* História — texto corrido em coluna estreita, formato de leitura */}
      <section className="bg-cream section-y">
        <div className="container-luxe grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow">Nossa história</p>
              <h2 className="mt-3 font-display text-[26px] leading-[1.2] text-ink sm:text-4xl">
                Começou pequeno. Cresceu com quem confiou.
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-4 text-[14.5px] leading-relaxed text-ink/70 sm:space-y-5 sm:text-[15px]">
              <Reveal>
                <p className="text-[16px] font-light leading-relaxed text-ink/85 sm:text-[17px]">
                  A Sandydepil abriu as portas em {business.foundedYear}, num ponto simples em Santa
                  Maria. Não havia investidor, campanha de marketing ou estrutura grande — havia
                  formação técnica, uma maca e a decisão de fazer bem feito.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p>
                  O crescimento veio da forma mais lenta e mais sólida que existe: cliente indicando
                  cliente. Cada pessoa que saía satisfeita trazia outra, e é assim que se explica uma
                  clínica que atravessa {business.yearsOfExperience} anos num mercado onde muitos
                  negócios não completam dois.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <p>
                  Ao longo desse tempo o portfólio se ampliou — dos serviços de depilação para
                  protocolos faciais, tratamentos corporais e cuidados especiais. Mas o critério para
                  adotar qualquer procedimento novo nunca mudou: só entra o que a profissional domina
                  de fato e o que entrega resultado real, não apenas promessa de resultado.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p>
                  Hoje são milhares de atendimentos realizados e nota máxima no Google, com{' '}
                  {business.reviewCount} avaliações. Números que não vieram de campanha paga, e sim de
                  consistência.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Linha do tempo */}
      <section className="bg-offwhite section-y">
        <div className="container-luxe">
          <Reveal className="max-w-xl">
            <p className="eyebrow">Trajetória</p>
            <h2 className="mt-3 font-display text-[26px] leading-[1.2] text-ink sm:text-4xl">
              De {business.foundedYear} até hoje
            </h2>
          </Reveal>
          <Timeline />
        </div>
      </section>

      <Professional />

      <WhyUs />
      <ExperienceSteps />
      <FinalCTA />
    </>
  )
}
