import { Link } from 'react-router-dom'
import { ArrowUpRight, Award, Check, Clock, GraduationCap, MapPin, Users } from 'lucide-react'
import { courseLink } from '../data/site'

/**
 * Card do curso. O destino vem de `courseLink()`:
 * landing externa (nova aba), landing interna (rota) ou WhatsApp (fallback
 * enquanto a URL da landing não estiver preenchida).
 */
export default function CourseCard({ course, featured = false }) {
  const link = courseLink(course)
  const ctaLabel = link.isFallback ? 'Falar sobre o curso' : 'Ver o curso completo'

  const CtaWrapper = ({ className, children }) =>
    link.external ? (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    ) : (
      <Link to={link.to} className={className}>
        {children}
      </Link>
    )

  return (
    <article
      className={`group overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-soft transition-all duration-500 md:hover:-translate-y-1.5 md:hover:border-rose-200 md:hover:shadow-lift ${
        featured ? 'lg:grid lg:grid-cols-2' : 'flex flex-col'
      }`}
    >
      <CtaWrapper
        className={`relative block overflow-hidden ${
          featured ? 'aspect-[16/11] lg:aspect-auto' : 'aspect-[16/10]'
        }`}
      >
        {/* TODO: substituir por foto real de uma turma ou da Sandy ensinando */}
        <img
          src={course.image}
          alt={course.name}
          className="h-full w-full object-cover transition-transform duration-700 md:group-hover:scale-[1.06]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />

        <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full bg-rose-gradient px-3 py-1.5 text-[9.5px] font-medium uppercase tracking-wide text-white shadow-soft sm:left-4 sm:top-4 sm:text-[10px]">
          <GraduationCap size={11} />
          Curso
        </span>

        {course.certificate && (
          <span className="absolute right-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1.5 text-[9.5px] font-medium text-ink/75 backdrop-blur sm:right-4 sm:top-4 sm:px-3 sm:text-[10px]">
            <Award size={11} className="text-rose-500" />
            Certificado
          </span>
        )}
      </CtaWrapper>

      <div className={`flex flex-1 flex-col ${featured ? 'p-6 sm:p-8 lg:p-11' : 'p-5 sm:p-7'}`}>
        <h3
          className={`font-display leading-snug text-ink transition-colors duration-300 md:group-hover:text-rose-600 ${
            featured ? 'text-[22px] sm:text-2xl lg:text-3xl' : 'text-[19px] sm:text-xl'
          }`}
        >
          <CtaWrapper>{course.name}</CtaWrapper>
        </h3>

        {course.subtitle && (
          <p className="mt-1.5 font-display text-[14px] italic text-rose-500 sm:text-[15px]">
            {course.subtitle}
          </p>
        )}

        <p className="mt-3.5 text-[13.5px] leading-relaxed text-ink/65 sm:text-[14px]">
          {course.summary}
        </p>

        {/* Ficha rápida */}
        <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
          {[
            { icon: MapPin, text: course.format },
            { icon: Clock, text: course.duration },
            { icon: GraduationCap, text: course.level },
            { icon: Users, text: course.vacancies },
          ]
            .filter((i) => i.text)
            .map((i) => (
              <li key={i.text} className="flex items-start gap-2.5 text-[12.5px] text-ink/70">
                <i.icon size={13} className="mt-0.5 shrink-0 text-rose-400" />
                {i.text}
              </li>
            ))}
        </ul>

        {featured && course.highlights?.length > 0 && (
          <div className="mt-6 border-t border-rose-50 pt-5">
            <p className="text-[10px] font-medium uppercase tracking-luxe text-rose-500">
              O que você aprende
            </p>
            <ul className="mt-3.5 grid gap-2 sm:grid-cols-2">
              {course.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-[12.5px] text-ink/70">
                  <Check size={12} className="mt-0.5 shrink-0 text-rose-400" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto pt-7">
          <CtaWrapper className="btn-primary w-full sm:w-auto">
            {ctaLabel}
            <ArrowUpRight size={15} />
          </CtaWrapper>
        </div>
      </div>
    </article>
  )
}
