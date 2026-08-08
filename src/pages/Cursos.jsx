import { Award, BadgeCheck, HeartHandshake, Users } from 'lucide-react'
import useSeo from '../hooks/useSeo'
import PageHero from '../components/PageHero'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import CourseCard from '../components/CourseCard'
import FinalCTA from '../components/FinalCTA'
import { business, courses, whatsappLink } from '../data/site'

const reasons = [
  {
    icon: Award,
    title: 'Quem ensina, atende',
    text: `${business.yearsOfExperience} anos de prática diária em clínica própria. O conteúdo vem da rotina real.`,
  },
  {
    icon: Users,
    title: 'Turmas reduzidas',
    text: 'Poucas alunas por turma, para correção individual durante a prática.',
  },
  {
    icon: HeartHandshake,
    title: 'Prática de verdade',
    text: 'Você não sai apenas sabendo o que fazer — sai tendo feito, com supervisão.',
  },
  {
    icon: BadgeCheck,
    title: 'Certificado',
    text: 'Documento que comprova a formação para clientes e empregadores.',
  },
]

export default function Cursos() {
  useSeo({
    title: 'Cursos de Estética e Depilação',
    description: `Cursos ministrados pela Sandydepil em Santa Maria – DF, para toda a região do Distrito Federal. Formação prática com quem atua na área desde ${business.foundedYear}.`,
    path: '/cursos',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Cursos Sandydepil',
      itemListElement: courses.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Course',
          name: c.name,
          description: c.summary,
          provider: {
            '@type': 'Organization',
            name: business.fullName,
            address: {
              '@type': 'PostalAddress',
              streetAddress: business.address.street,
              addressLocality: business.address.city,
              addressRegion: business.address.state,
              postalCode: business.address.zip,
              addressCountry: 'BR',
            },
          },
        },
      })),
    },
  })

  const single = courses.length === 1

  return (
    <>
      <PageHero
        eyebrow="Cursos"
        title="Aprenda com quem faz isso todos os dias"
        description={`Formação ministrada por quem atua no mercado desde ${business.foundedYear}, em clínica própria. Técnica que funciona na prática, não só no papel.`}
        image="https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: 'Cursos' }]}
      />

      {/* Argumentos — lista em linha, não cards com ícone circular */}
      <section className="border-b border-rose-100 bg-offwhite py-8 sm:py-10">
        <RevealGroup
          className="container-luxe grid gap-5 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-6 lg:grid-cols-4"
          stagger={0.08}
        >
          {reasons.map((r) => (
            <RevealItem key={r.title}>
              <div className="flex gap-3">
                <r.icon size={17} strokeWidth={1.7} className="mt-0.5 shrink-0 text-rose-400" />
                <div>
                  <p className="text-[13px] font-medium text-ink">{r.title}</p>
                  <p className="mt-0.5 text-[12.5px] leading-relaxed text-ink/50">{r.text}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="bg-cream section-y">
        <div className="container-luxe">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{single ? 'Turma aberta' : 'Nossos cursos'}</p>
            <h2 className="mt-3 font-display text-[26px] leading-[1.2] text-ink sm:text-4xl">
              {single ? 'O curso disponível no momento' : 'Cursos disponíveis'}
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-ink/60">
              {single
                ? 'Uma formação por vez, com atenção total à turma. Toque para ver conteúdo completo, valores e datas.'
                : 'Escolha a formação e veja o conteúdo completo, valores e datas na página do curso.'}
            </p>
          </Reveal>

          <RevealGroup
            className={`mt-9 grid gap-6 lg:mt-12 ${single ? '' : 'lg:grid-cols-2'}`}
            stagger={0.12}
          >
            {courses.map((course) => (
              <RevealItem key={course.id} variant="fadeUp">
                <CourseCard course={course} featured={single} />
              </RevealItem>
            ))}
          </RevealGroup>

          {/* Para quem é */}
          {single && courses[0].forWho?.length > 0 && (
            <div className="mt-12 grid gap-8 border-t border-rose-100 pt-10 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-4">
                <p className="eyebrow">Para quem é</p>
                <h2 className="mt-3 font-display text-[22px] leading-snug text-ink sm:text-3xl">
                  Esse curso faz sentido para você?
                </h2>
                <p className="mt-4 text-[13.5px] leading-relaxed text-ink/60">
                  {courses[0].authorityNote}
                </p>
              </Reveal>

              <RevealGroup className="lg:col-span-8" stagger={0.07}>
                <ul className="divide-y divide-rose-100 border-y border-rose-100">
                  {courses[0].forWho.map((w) => (
                    <RevealItem key={w}>
                      <li className="flex items-start gap-3 py-4 text-[13.5px] text-ink/75 sm:text-[14px]">
                        <BadgeCheck size={15} className="mt-0.5 shrink-0 text-rose-400" />
                        {w}
                      </li>
                    </RevealItem>
                  ))}
                </ul>
              </RevealGroup>
            </div>
          )}

          <Reveal delay={0.16} className="mt-12 border-t border-rose-100 pt-10">
            <p className="font-display text-[20px] leading-snug text-ink sm:text-2xl">
              Quer ser avisada quando abrir turma nova?
            </p>
            <p className="mt-2.5 max-w-lg text-[14px] leading-relaxed text-ink/60">
              As turmas são reduzidas e costumam preencher rápido. Entre na lista de interesse — sem
              compromisso.
            </p>
            <a
              href={whatsappLink(
                'Olá! Gostaria de entrar na lista de interesse dos próximos cursos. 💗'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 w-full sm:w-auto"
            >
              Entrar na lista
            </a>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
