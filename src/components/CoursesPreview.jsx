import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap } from 'lucide-react'
import Reveal from './Reveal'
import CourseCard from './CourseCard'
import { business, courses } from '../data/site'

/** Bloco da home que divulga os cursos e leva para /cursos. */
export default function CoursesPreview() {
  if (courses.length === 0) return null

  return (
    <section className="relative overflow-hidden bg-ink section-y">
      <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-rose-400/20 blur-[110px]" />
      <div className="pointer-events-none absolute -left-24 bottom-0 hidden h-72 w-72 rounded-full bg-gold/10 blur-[100px] lg:block" />

      <div className="container-luxe relative grid items-center gap-9 lg:grid-cols-5 lg:gap-16">
        <Reveal variant="fadeUp" className="lg:col-span-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-luxe text-rose-200 backdrop-blur-sm sm:text-[11px]">
            <GraduationCap size={12} />
            Cursos
          </span>

          <h2 className="mt-5 font-display text-[26px] leading-[1.15] text-white sm:text-4xl">
            Quer aprender a <span className="italic text-rose-200">viver da profissão?</span>
          </h2>

          <p className="mt-5 text-[14.5px] leading-relaxed text-white/75">
            A Sandy também ensina. {business.yearsOfExperience} anos de prática diária em clínica
            própria transformados em formação profissional — turmas reduzidas, prática supervisionada
            e certificado.
          </p>

          <p className="mt-3 text-[13.5px] leading-relaxed text-white/50">
            Aprender com quem atende todos os dias é diferente de aprender com quem só ensina.
          </p>

          <Link to="/cursos" className="btn-primary mt-7 w-full sm:w-auto">
            {courses.length === 1 ? 'Conhecer o curso' : 'Ver os cursos'}
            <ArrowRight size={15} />
          </Link>
        </Reveal>

        <Reveal variant="fadeUp" delay={0.12} className="lg:col-span-3">
          <CourseCard course={courses[0]} />
        </Reveal>
      </div>
    </section>
  )
}
