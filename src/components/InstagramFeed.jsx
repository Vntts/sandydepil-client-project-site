import { ArrowUpRight, Instagram } from 'lucide-react'
import Reveal, { RevealGroup, RevealItem } from './Reveal'
import { business, instagramPosts } from '../data/site'

/**
 * FEED DO INSTAGRAM — placeholders vindos de src/data/site.js.
 *
 * TODO — feed real, escolha uma abordagem:
 * 1) Widget sem código: Elfsight, Behold.so ou SnapWidget.
 * 2) Instagram Basic Display API: token de longa duração consultando
 *    graph.instagram.com/me/media — faça a chamada por uma serverless
 *    function na Vercel para não expor o token no cliente.
 *
 * No mobile mostramos 4 posts em grade 2×2 em vez de 6 — três fileiras de
 * imagens sem função de navegação é rolagem desperdiçada.
 */
export default function InstagramFeed() {
  return (
    <section className="bg-offwhite section-y-tight">
      <div className="container-luxe">
        <Reveal className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Instagram</p>
            <h2 className="mt-2.5 font-display text-[22px] leading-snug text-ink sm:text-3xl">
              O dia a dia da clínica
            </h2>
          </div>

          <a
            href={business.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 text-[12px] font-medium text-rose-600 transition-all duration-300 md:hover:gap-3"
          >
            <Instagram size={15} />
            <span className="hidden sm:inline">{business.instagramHandle}</span>
            <span className="sm:hidden">Seguir</span>
            <ArrowUpRight size={13} />
          </a>
        </Reveal>

        <RevealGroup
          className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:gap-3 lg:grid-cols-6"
          stagger={0.06}
        >
          {instagramPosts.map((post, i) => (
            <RevealItem
              key={i}
              variant="scaleIn"
              /* Os dois últimos só aparecem a partir de sm */
              className={i >= 4 ? 'hidden sm:block' : ''}
            >
              <a
                href={business.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-xl"
              >
                <img
                  src={post.image}
                  alt={post.caption}
                  className="h-full w-full object-cover transition-transform duration-700 md:group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 hidden items-center justify-center bg-rose-500/0 transition-colors duration-500 md:flex md:group-hover:bg-rose-500/45">
                  <Instagram
                    size={22}
                    className="text-white opacity-0 transition-opacity duration-500 md:group-hover:opacity-100"
                  />
                </div>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
