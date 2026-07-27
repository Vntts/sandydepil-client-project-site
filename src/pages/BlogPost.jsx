import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock } from 'lucide-react'
import useSeo from '../hooks/useSeo'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import FinalCTA from '../components/FinalCTA'
import SmartImage from '../components/SmartImage'
import NotFound from './NotFound'
import { blogPosts, findPost, formatDate } from '../data/blog'
import { business, whatsappLink } from '../data/site'

function Block({ block }) {
  if (block.type === 'h2')
    return <h2 className="mt-9 font-display text-[20px] leading-snug text-ink sm:text-2xl">{block.text}</h2>

  if (block.type === 'ul')
    return (
      <ul className="mt-5 space-y-2.5">
        {block.items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[14.5px] leading-relaxed text-ink/70 sm:text-[15px]">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
            {item}
          </li>
        ))}
      </ul>
    )

  if (block.type === 'quote')
    return (
      <blockquote className="my-8 border-l-2 border-rose-300 pl-5 sm:pl-6">
        <p className="font-display text-[18px] italic leading-snug text-ink/80 sm:text-xl">{block.text}</p>
      </blockquote>
    )

  return <p className="mt-4 text-[14.5px] leading-relaxed text-ink/70 sm:text-[15px]">{block.text}</p>
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = findPost(slug)

  useSeo({
    title: post ? post.title : 'Artigo não encontrado',
    description: post ? post.excerpt : 'O artigo que você procura não existe ou foi movido.',
    path: `/blog/${slug}`,
    image: post?.image,
    jsonLd: post
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          image: post.image,
          datePublished: post.date,
          author: { '@type': 'Organization', name: business.fullName },
          publisher: { '@type': 'Organization', name: business.fullName },
        }
      : undefined,
  })

  if (!post) return <NotFound />

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        image={post.image}
        breadcrumbs={[{ label: 'Dicas', to: '/blog' }, { label: post.category }]}
      >
        <div className="flex flex-wrap items-center gap-5 text-xs text-white/70">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={13} />
            {formatDate(post.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={13} />
            {post.readingTime} de leitura
          </span>
        </div>
      </PageHero>

      <article className="bg-cream section-y">
        <div className="container-luxe grid gap-10 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-2">
            <Reveal>
              <p className="text-[15.5px] font-light leading-relaxed text-ink/85 sm:text-[17px]">{post.excerpt}</p>
              <div className="hairline mt-7" />
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-2">
                {post.content.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.12} className="mt-12 rounded-2xl border border-rose-100 bg-white p-6 sm:p-8">
              <p className="font-display text-xl leading-snug text-ink">
                Ficou com alguma dúvida sobre o seu caso?
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">
                Conteúdo geral ajuda a entender o assunto, mas cada pele responde de forma diferente.
                Mande uma mensagem e receba uma orientação específica.
              </p>
              <a
                href={whatsappLink('Olá! Li um artigo no site e gostaria de uma orientação. 💗')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-6 w-full sm:w-auto"
              >
                Falar com a profissional
              </a>
            </Reveal>

            <Reveal delay={0.16} className="mt-10">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-rose-600 transition-all hover:gap-3"
              >
                <ArrowLeft size={15} />
                Voltar para as dicas
              </Link>
            </Reveal>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <Reveal variant="slideLeft" className="lg:sticky lg:top-32">
              <div className="rounded-2xl border border-rose-100 bg-white p-7 shadow-soft">
                <p className="text-[11px] font-medium uppercase tracking-luxe text-rose-500">
                  Outras leituras
                </p>
                <ul className="mt-5 space-y-5">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link to={`/blog/${r.slug}`} className="group flex gap-4">
                        <span className="block h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                          <SmartImage
                            src={r.image}
                            alt=""
                            kind="artigo"
                            imgClassName="h-16 w-16 object-cover"
                          />
                        </span>
                        <span>
                          <span className="block text-[13.5px] font-medium leading-snug text-ink transition-colors group-hover:text-rose-600">
                            {r.title}
                          </span>
                          <span className="mt-1 block text-[11px] text-ink/40">
                            {r.readingTime} de leitura
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 border-t border-rose-50 pt-6">
                  <Link
                    to="/procedimentos"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-600 transition-all hover:gap-2.5"
                  >
                    Ver os procedimentos
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </article>

      <FinalCTA />
    </>
  )
}
