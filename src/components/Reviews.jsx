import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { ExternalLink, Quote, Star } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/pagination'
import Reveal from './Reveal'
import { business, reviews } from '../data/site'

export default function Reviews({ showLink = true }) {
  return (
    <section className="relative overflow-hidden bg-soft-fade section-y">
      <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-rose-200/40 blur-[110px]" />

      <div className="container-luxe relative">
        {/* Nota e título na mesma linha — antes eram dois blocos centralizados
            empilhados, o que no celular consumia meia tela antes do conteúdo */}
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Depoimentos</p>
            <h2 className="mt-3 font-display text-[26px] leading-[1.2] text-ink sm:text-4xl">
              O que dizem nossas clientes
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-display text-4xl leading-none text-rose-500 sm:text-5xl">
              {business.rating.toFixed(1)}
            </span>
            <div>
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} className="fill-gold text-gold" />
                ))}
              </span>
              <p className="mt-1 text-[11px] text-ink/45">
                {business.reviewCount} avaliações no Google
              </p>
              <a
                href={business.googleProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-rose-600"
              >
                Ver perfil
                <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 lg:mt-12">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={16}
            slidesPerView={1.12}
            loop={reviews.length > 3}
            speed={800}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 28 },
            }}
            className="!pb-12"
          >
            {reviews.map((r, i) => (
              <SwiperSlide key={i} className="!h-auto">
                <article className="flex h-full flex-col rounded-2xl border border-rose-100 bg-white p-6 shadow-soft sm:p-7">
                  <Quote size={20} className="text-rose-200" />
                  <p className="mt-3.5 flex-1 text-[14px] leading-relaxed text-ink/75">
                    “{r.text}”
                  </p>
                  <div className="mt-5 border-t border-rose-50 pt-4">
                    <span className="flex gap-0.5">
                      {Array.from({ length: r.rating }).map((_, j) => (
                        <Star key={j} size={11} className="fill-gold text-gold" />
                      ))}
                    </span>
                    <p className="mt-2 text-[13px] font-medium text-ink">{r.name}</p>
                    <p className="text-[10.5px] uppercase tracking-luxe text-ink/40">{r.service}</p>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </Reveal>

        {showLink && (
          <Reveal delay={0.08}>
            <Link to="/depoimentos" className="btn-ghost w-full sm:w-auto">
              Ler todos os depoimentos
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  )
}
