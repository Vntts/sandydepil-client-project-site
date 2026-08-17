import useSeo from '../hooks/useSeo'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Timeline from '../components/Timeline'
import Professional from '../components/Professional'
import ExperienceSteps from '../components/ExperienceSteps'
import FinalCTA from '../components/FinalCTA'
import { business } from '../data/site'

export default function Sobre() {
  useSeo({
    title: 'Sobre',
    description: `Conheça a história da ${business.fullName}: mais de ${business.yearsOfExperience} anos de atuação em Santa Maria – DF, atendendo o Distrito Federal desde ${business.foundedYear}.`,
    path: '/sobre',
  })

  return (
    <>
      <PageHero
        eyebrow="Sobre"
        title="Mais de uma década de estética séria em Santa Maria – DF"
        description={`Desde ${business.foundedYear}, a Sandydepil construiu sua reputação atendimento por atendimento — sem promessas exageradas e sem atalhos.`}
        image="https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: 'Sobre' }]}
      />

      {/* História — texto corrido em coluna estreita, formato de leitura.
          Título/eyebrow fica sticky no desktop (acompanha a rolagem do texto,
          que é longo); no mobile some o sticky para não roubar espaço de tela. */}
      <section className="bg-cream section-y">
        <div className="container-luxe grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            {/* Sticky fica num wrapper sem animação: um elemento com
                `position: sticky` e `transform` (o que o Reveal aplicaria)
                na mesma tag perde o comportamento de fixar ao rolar. */}
            <div className="lg:sticky lg:top-[7rem]">
              <Reveal>
                <p className="eyebrow">Nossa história</p>
                <h2 className="mt-3 font-display text-[24px] leading-[1.2] text-ink sm:text-4xl">
                  De um sonho em {business.foundedYear} a uma história de dedicação
                </h2>
                <p className="mt-4 hidden text-[13.5px] italic leading-relaxed text-ink/50 lg:block">
                  Beleza que cuida, autoestima que transforma.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-4 text-[14.5px] leading-relaxed text-ink/70 sm:space-y-5 sm:text-[15px]">
              <Reveal>
                <p className="text-[15.5px] font-light leading-relaxed text-ink/85 sm:text-[17px]">
                  Em 2011, eu já trabalhava com depilação, mas como funcionária CLT. Foi ali que
                  comecei a perceber que poderia construir algo meu — e transformar aquilo que eu
                  fazia em um propósito.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p>
                  Em {business.foundedYear}, nasceu mais do que uma ideia: nasceu o sonho de ter o
                  meu próprio negócio e conquistar meu espaço no mundo da beleza. Comecei com
                  coragem, determinação e muita vontade de aprender, entendendo aos poucos que
                  trabalhar com beleza vai muito além de um procedimento — é cuidar da autoestima,
                  da confiança e do bem-estar de cada cliente.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <p>
                  Ao longo dos anos, a Sandydepil foi crescendo comigo. Vieram novos conhecimentos,
                  novas técnicas, novos serviços e muitos aprendizados — nunca parei de buscar
                  aperfeiçoamento. Em 2017, concluí minha formação em Embelezamento e Estética, mais
                  um passo na construção da profissional que sou hoje.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p>
                  De lá para cá, passamos por diferentes fases, espaços e desafios — conquistas,
                  mudanças, recomeços. Mas uma coisa nunca mudou: o compromisso com um atendimento
                  feito com carinho, respeito, profissionalismo e atenção a cada cliente.
                </p>
              </Reveal>

              <Reveal delay={0.26} className="border-l-2 border-rose-300 py-1 pl-5 sm:pl-6">
                <p className="font-display text-[17px] italic leading-snug text-ink sm:text-xl">
                  {business.foundedYear} foi o começo. {new Date().getFullYear()} é uma nova fase. E
                  o melhor ainda está por vir.
                </p>
              </Reveal>

              <Reveal delay={0.32}>
                <p>
                  Hoje, a Sandydepil é muito mais do que depilação: é um espaço em Santa Maria – DF
                  onde beleza, cuidado e autoestima caminham juntos, recebendo clientes de toda a
                  região do Distrito Federal. São {business.yearsOfExperience} anos construídos com
                  trabalho, fé, aprendizado e, acima de tudo, amor pelo que faço — e essa história
                  ainda está sendo escrita.
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
              Há mais de {business.yearsOfExperience} anos realçando a beleza natural
            </h2>
          </Reveal>
          <Timeline />
        </div>
      </section>

      <Professional />

      <ExperienceSteps />
      <FinalCTA />
    </>
  )
}
