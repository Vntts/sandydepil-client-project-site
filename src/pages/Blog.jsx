import { Link } from 'react-router-dom'
import { ArrowUpRight, CalendarDays, Clock } from 'lucide-react'
import useSeo from '../hooks/useSeo'
import PageHero from '../components/PageHero'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import FinalCTA from '../components/FinalCTA'
import SmartImage from '../components/SmartImage'
import { blogPosts, formatDate } from '../data/blog'

export default function Blog() {
  useSeo({
    title: 'Dicas de Estética e Cuidados com a Pele',
    description:
      'Orientações práticas sobre cuidados com a pele, depilação, limpeza de pele e tratamentos corporais, escritas pela equipe da Sandydepil em Santa Maria – DF.',
    path: '/blog',
  })

  const [featured, ...rest] = blogPosts

  return (
    <>
      <PageHero
        eyebrow="Dicas"
        title="Conteúdo que ajuda antes e depois do atendimento"
        description="Orientações práticas sobre cuidados com a pele e corpo — sem promessa de milagre e sem termos técnicos desnecessários."
        image="https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: 'Dicas' }]}
      />

      <section className="bg-cream section-y">
        <div className="container-luxe">
          {/* Destaque */}
          {featured && (
            <Reveal>
              <Link
                to={`/blog/${featured.slug}`}
                className="group grid overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-soft transition-all duration-500 md:hover:shadow-lift lg:grid-cols-2"
              >
                <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
                  <SmartImage
                    src={featured.image}
                    alt={featured.title}
                    label={featured.category}
                    kind="artigo"
                    imgClassName="h-full w-full object-cover transition-transform duration-700 md:group-hover:scale-[1.05]"
                  />
                  <span className="absolute left-3.5 top-3.5 rounded-full bg-white/90 px-3 py-1 text-[9.5px] font-medium uppercase tracking-wide text-rose-600 backdrop-blur sm:left-4 sm:top-4 sm:text-[10px]">
                    {featured.category}
                  </span>
                </div>

                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
                  <div className="flex flex-wrap items-center gap-3.5 text-[10.5px] text-ink/45 sm:text-[11px]">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays size={12} />
                      {formatDate(featured.date)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={12} />
                      {featured.readingTime}
                    </span>
                  </div>

                  <h2 className="mt-3.5 font-display text-[21px] leading-snug text-ink transition-colors duration-300 md:group-hover:text-rose-600 sm:text-2xl lg:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-3.5 text-[13.5px] leading-relaxed text-ink/65 sm:text-[14.5px]">
                    {featured.excerpt}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 self-start text-xs font-medium text-rose-600 transition-all duration-300 md:group-hover:gap-3">
                    Ler o artigo
                    <ArrowUpRight size={13} />
                  </span>
                </div>
              </Link>
            </Reveal>
          )}

          {/* Demais posts — lista horizontal compacta no mobile */}
          <RevealGroup className="mt-8 lg:mt-10 lg:grid lg:grid-cols-3 lg:gap-7" stagger={0.08}>
            {rest.map((post) => (
              <RevealItem key={post.slug} variant="fadeUp">
                {/* Mobile: linha com miniatura. Desktop: card vertical. */}
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex gap-4 border-b border-rose-100 py-5 lg:block lg:h-full lg:overflow-hidden lg:rounded-2xl lg:border lg:border-rose-100 lg:bg-white lg:py-0 lg:shadow-soft lg:transition-all lg:duration-500 lg:hover:-translate-y-1.5 lg:hover:shadow-lift"
                >
                  <div className="relative h-[86px] w-[86px] shrink-0 overflow-hidden rounded-xl lg:aspect-[4/3] lg:h-auto lg:w-full lg:rounded-none">
                    <SmartImage
                      src={post.image}
                      alt={post.title}
                      label={post.category}
                      kind="artigo"
                      imgClassName="h-full w-full object-cover transition-transform duration-700 md:group-hover:scale-[1.07]"
                    />
                    <span className="absolute left-3 top-3 hidden rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-rose-600 backdrop-blur lg:block">
                      {post.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col lg:p-6">
                    <div className="flex flex-wrap items-center gap-2.5 text-[10px] text-ink/40 lg:text-[10.5px]">
                      <span className="lg:hidden">{post.category}</span>
                      <span className="hidden items-center gap-1 lg:inline-flex">
                        <CalendarDays size={11} />
                        {formatDate(post.date)}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={11} />
                        {post.readingTime}
                      </span>
                    </div>

                    <h3 className="mt-1.5 font-display text-[15.5px] leading-snug text-ink transition-colors duration-300 md:group-hover:text-rose-600 lg:mt-3 lg:text-lg">
                      {post.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-relaxed text-ink/55 lg:mt-2.5 lg:line-clamp-none lg:flex-1 lg:text-[13px] lg:text-ink/60">
                      {post.excerpt}
                    </p>

                    <span className="mt-4 hidden items-center gap-1.5 self-start text-xs font-medium text-rose-600 transition-all duration-300 md:hover:gap-2.5 lg:inline-flex">
                      Ler mais
                      <ArrowUpRight size={13} />
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
