import { useEffect, useState } from 'react'
import {
  Award,
  Check,
  ChevronDown,
  Clock,
  HeartHandshake,
  Menu,
  MessageCircle,
  Sparkles,
  Users,
  X,
} from 'lucide-react'
import useSeo from '../hooks/useSeo'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import ScrollToTop from '../components/ScrollToTop'
import VideoTestimonial from '../components/VideoTestimonial'
import { business, professional, whatsappLink } from '../data/site'

/**
 * Landing de venda do curso presencial de Depilação em Axilas e Virilha —
 * página autônoma, fora do <Layout /> do site institucional (mesmo padrão da
 * landing do curso de Dermaplaning): cabeçalho e rodapé próprios.
 *
 * Reformulada para tráfego pago (anúncio no Meta): quem chega aqui não
 * conhece a Sandydepil ainda, então a página precisa, sozinha, vender a
 * ideia E tirar as objeções mais comuns antes de empurrar para o WhatsApp —
 * daí a seção de perguntas frequentes (#duvidas) e a barra fixa de WhatsApp
 * (mobile: barra inferior; desktop: botão flutuante), que ficam disponíveis
 * o tempo todo, não só no fim da página.
 *
 * A Sandy já ensinou esta técnica de forma particular para outras alunas
 * antes desta turma presencial ser aberta ao público — por isso os
 * depoimentos de texto usam apenas o papel da aluna como identificação, sem
 * nome inventado, já que não há fotos/nomes documentados dessas turmas
 * particulares. As fotos em "Bastidores" mostram só material real enviado
 * pela Sandy — sem espaços "Foto em breve" misturados.
 */

const whatsappCurso = (mensagem) => whatsappLink(mensagem)
const MSG_PADRAO =
  'Olá! Tenho interesse no curso presencial de 1 dia de Depilação em Axilas e Virilha e gostaria de garantir minha vaga. 💗'
const MSG_DUVIDA = 'Olá! Vi o curso de Depilação em Axilas e Virilha e tenho uma dúvida antes de garantir minha vaga. 💗'

const navLinks = [
  { label: 'Resultado real', href: '#resultado' },
  { label: 'Quem é a Sandy', href: '#sobre' },
  { label: 'Conteúdo', href: '#conteudo' },
  { label: 'Fotos das aulas', href: '#fotos' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Dúvidas', href: '#duvidas' },
]

// Selo rápido logo abaixo do hero — resposta imediata às primeiras perguntas
// de quem chega pelo anúncio, antes mesmo de rolar a página.
const selosRapidos = [
  { icon: Clock, texto: '1 dia de curso' },
  { icon: Award, texto: 'Certificado inclusos' },
  { icon: Users, texto: 'Turma personalizada' },
  { icon: Sparkles, texto: 'Prática em modelo real' },
]

const modulos = [
  {
    numero: '01',
    titulo: 'Biossegurança e anatomia da região',
    texto: 'Cuidados essenciais de higiene, avaliação da pele e quando (não) realizar o procedimento.',
  },
  {
    numero: '02',
    titulo: 'Cera, método espanhol',
    texto: 'Cera quente, morna e em fita: vantagens de cada tipo para axilas e virilha.',
  },
  {
    numero: '03',
    titulo: 'Técnica em axilas — passo a passo',
    texto: 'Postura das mãos, sentido de aplicação e remoção corretos para uma depilação rente e sem falhas.',
  },
  {
    numero: '04',
    titulo: 'Técnica em virilha: cavado, tradicional e íntima completa',
    texto: 'As três modalidades mais pedidas em clínica, com o cuidado e o conforto que a região exige.',
  },
  {
    numero: '05',
    titulo: 'Prática supervisionada em modelo real',
    texto: 'Mão na massa, com a Sandy acompanhando cada movimento e corrigindo em tempo real.',
  },
  {
    numero: '06',
    titulo: 'Precificação e primeiras clientes',
    texto: 'Como precificar seu atendimento e estratégias simples para conquistar as primeiras clientes.',
  },
]

const beneficios = [
  {
    icon: Clock,
    titulo: '1 dia, do zero à prática',
    texto: 'Teoria direto ao ponto e várias horas de prática guiada, tudo em um único encontro presencial.',
  },
  {
    icon: Users,
    titulo: 'Turma personalizada',
    texto: 'Grupos reduzidos para garantir atenção individual e prática de verdade em cada aluna.',
  },
  {
    icon: HeartHandshake,
    titulo: 'Suporte após o curso',
    texto: 'Tire dúvidas com a Sandy mesmo depois de formada, para atender com segurança.',
  },
  {
    icon: Award,
    titulo: 'Certificado de conclusão',
    texto: 'Comprovante para divulgar nas redes e atrair suas primeiras clientes.',
  },
]

// TODO: a Sandy já deu este curso de forma particular antes desta turma
// presencial, mas não há fotos/nomes documentados dessas alunas. Os textos
// abaixo resumem o retorno real que elas deram, sem inventar nome — troque
// por depoimentos com nome e foto reais assim que houver esse material.
const depoimentos = [
  {
    texto: 'Tinha medo de fazer errado na hora de atender, mas a Sandy corrigiu cada detalhe até eu sentir segurança total na técnica.',
    papel: 'Aluna do curso particular',
  },
  {
    texto: 'O que mais me marcou foi a atenção individual — não é aula em vídeo, é a Sandy ao lado, ensinando de verdade, com o cuidado que a região pede.',
    papel: 'Aluna certificada pela Sandy',
    destaque: true,
  },
  {
    texto: 'Depois do curso comecei a oferecer axilas e virilha no meu atendimento, e hoje já é um dos serviços mais pedidos pelas minhas clientes.',
    papel: 'Aluna do curso particular',
  },
]

// Só as fotos reais enviadas pela Sandy — sem espaços "Foto em breve"
// misturados. Todas em moldura quadrada (aspect-square) para ficarem do
// mesmo tamanho lado a lado; as fotos de aula são em retrato, então usam
// object-top para manter rostos/toucas no enquadramento em vez de cortar
// pelo centro.
const fotosAulas = [
  {
    src: '/images/cursos/depilacao-axilas-virilha/turma-1.webp',
    alt: 'Sandy com aluna durante o curso presencial de depilação em axilas e virilha',
    caption: 'Prática guiada durante a aula presencial',
    position: 'object-top',
  },
  {
    src: '/images/cursos/depilacao-axilas-virilha/turma-2-certificado.webp',
    alt: 'Aluna recebendo o certificado de conclusão do curso de axilas e virilha',
    caption: 'Entrega do certificado de conclusão',
    position: 'object-center',
  },
  {
    src: '/images/cursos/depilacao-axilas-virilha/turma-3.webp',
    alt: 'Sandy com alunas no espaço da Sandydepil',
    caption: 'Sandy com alunas no espaço da Sandydepil',
    position: 'object-top',
  },
]

// Perguntas que mais aparecem antes de fechar — o objetivo é que quem chega
// pelo anúncio saia desta seção sem nenhuma dúvida real pendente antes de ir
// para o WhatsApp.
const duvidas = [
  {
    pergunta: 'Preciso ter experiência anterior em estética?',
    resposta: 'Não. O curso foi pensado para quem está começando do zero, com explicações passo a passo e prática guiada — mas também é útil para quem já atua e quer aperfeiçoar a técnica.',
  },
  {
    pergunta: 'Um dia de curso é suficiente para aprender de verdade?',
    resposta: 'Sim. É um encontro presencial intensivo de 1 dia (8 horas), com teoria direto ao ponto e boa parte do tempo dedicada à prática — sem enrolação, você sai sabendo aplicar a técnica com segurança.',
  },
  {
    pergunta: 'Vou praticar em modelo real ou só assistir a Sandy?',
    resposta: 'Você pratica em modelo real durante o próprio curso, com a Sandy acompanhando de perto e corrigindo cada movimento na hora.',
  },
  {
    pergunta: 'Preciso levar meus próprios materiais no dia do curso?',
    resposta: 'Não — a prática do dia é feita com os materiais da própria Sandydepil. Você sai com a lista completa do que precisa comprar para começar a atender depois.',
  },
  {
    pergunta: 'O certificado serve para eu atender clientes depois?',
    resposta: 'Você recebe certificado de conclusão emitido pela Sandydepil, com carga horária e conteúdo do curso — ótimo para comprovar sua qualificação nas redes e para suas primeiras clientes.',
  },
  {
    pergunta: 'Quanto custa e como faço para me inscrever?',
    resposta: 'O valor e as formas de pagamento são combinados diretamente com a Sandy pelo WhatsApp. Fale agora e já saia com data e vaga confirmadas.',
  },
  {
    pergunta: 'Moro em outra cidade, vale a pena vir até Santa Maria – DF?',
    resposta: 'O curso é presencial porque a prática em modelo real, com correção na hora, faz toda a diferença no aprendizado — é justamente isso que faz valer o deslocamento.',
  },
  {
    pergunta: 'E se eu ainda tiver dúvidas depois do curso?',
    resposta: 'Você pode falar com a Sandy mesmo depois de formada, para tirar dúvidas e atender suas primeiras clientes com mais segurança.',
  },
]

function FaqItem({ item, aberto, onToggle }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-soft">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={aberto}
        className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors active:bg-rose-50/70 sm:px-6 sm:py-5"
      >
        <span className="font-display text-[15px] leading-snug text-ink sm:text-[16.5px]">{item.pergunta}</span>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-50">
          <ChevronDown
            size={17}
            className={`text-rose-500 transition-transform duration-300 ${aberto ? 'rotate-180' : ''}`}
          />
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${aberto ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-4 text-[13.5px] leading-relaxed text-ink/65 sm:px-6 sm:pb-5 sm:text-[14px]">
            {item.resposta}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function CursoDepilacaoAxilasVirilha() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [faqAberta, setFaqAberta] = useState(0)

  useSeo({
    title: 'Curso de Depilação em Axilas e Virilha — 1 Dia Presencial em Santa Maria – DF',
    description:
      'Curso presencial de 1 dia de depilação em axilas e virilha na Sandydepil, em Santa Maria – DF. Técnica completa, prática em modelo real e certificado ao final.',
    path: '/cursos/depilacao-axilas-virilha',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'Curso de Depilação em Axilas e Virilha',
      description:
        'Curso presencial de 1 dia (8 horas) de depilação em axilas e virilha: biossegurança, técnica completa, prática supervisionada em modelo real e certificado de conclusão.',
      provider: {
        '@type': 'Organization',
        name: business.fullName,
        sameAs: business.siteUrl,
      },
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'Onsite',
        courseWorkload: 'PT8H',
        location: {
          '@type': 'Place',
          name: business.fullName,
          address: business.address.full,
        },
      },
    },
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <div className="bg-cream font-sans text-ink">
      <ScrollToTop />

      {/* Barra utilitária */}
      <div className="bg-ink py-2.5 text-white">
        <div className="container-luxe flex items-center justify-between gap-4 text-[11px] tracking-wide">
          <span className="text-gold-light">✦ Curso presencial de 1 dia · Vagas limitadas</span>
          <span className="hidden text-white/70 sm:inline">
            {business.address.city} – {business.address.state} · {business.phone}
          </span>
        </div>
      </div>

      {/* Nav — fixo, marca própria da landing */}
      <header
        className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
          scrolled ? 'bg-cream/95 shadow-[0_8px_30px_-10px_rgba(28,23,25,0.15)] backdrop-blur-md' : 'bg-cream/85 backdrop-blur-sm'
        }`}
      >
        <div className="container-luxe flex h-[72px] items-center justify-between gap-6">
          <a href="#top" className="inline-flex flex-col leading-none">
            <span className="font-display text-xl tracking-wide text-rose-600">SANDYDEPIL</span>
            <span className="mt-1 text-[9px] font-medium uppercase tracking-luxe text-rose-500/80">
              Axilas &amp; Virilha
            </span>
          </a>

          <nav className="hidden items-center gap-5 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-[13px] font-medium text-ink/70 transition-colors hover:text-rose-600"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-rose-gradient transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href={whatsappCurso(MSG_PADRAO)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-ink px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-rose-600"
            >
              Garantir vaga
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink/70 lg:hidden"
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
          >
            <Menu size={22} strokeWidth={1.8} />
          </button>
        </div>
      </header>

      {/* Menu mobile */}
      <div
        className={`fixed inset-0 z-[70] bg-ink/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setMenuOpen(false)}
      />
      <div
        className={`fixed inset-y-0 right-0 z-[80] flex w-[80%] max-w-sm flex-col bg-cream shadow-[-12px_0_40px_-20px_rgba(28,23,25,0.4)] transition-transform duration-400 lg:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-rose-100 px-5 py-4">
          <span className="inline-flex flex-col leading-none">
            <span className="font-display text-lg text-rose-600">SANDYDEPIL</span>
            <span className="mt-1 text-[9px] font-medium uppercase tracking-luxe text-rose-500/80">
              Axilas &amp; Virilha
            </span>
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink/60"
            aria-label="Fechar menu"
          >
            <X size={21} strokeWidth={1.8} />
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-5 py-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-2 py-3 font-display text-lg text-ink active:bg-rose-50"
            >
              {link.label}
            </a>
          ))}
          <a
            href={whatsappCurso(MSG_PADRAO)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="btn-primary mt-4 w-full"
          >
            Garantir vaga
          </a>
        </nav>
      </div>

      {/* pb-actionbar (definida no index.css) já soma a área segura do iOS
          (notch/home indicator) à altura da barra fixa de WhatsApp abaixo */}
      <main id="top" className="pb-actionbar lg:pb-0">
        {/* HERO */}
        <section className="relative overflow-hidden py-14 sm:py-20 lg:py-24">
          <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-rose-400/20 blur-[110px]" />
          <div className="pointer-events-none absolute -left-20 bottom-0 hidden h-64 w-64 rounded-full bg-gold/15 blur-[100px] lg:block" />

          <div className="container-luxe relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal variant="fadeUp">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-gradient px-3.5 py-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-white shadow-soft">
                <Clock size={12} />
                Curso presencial de 1 dia
              </span>
              <h1 className="mt-4 font-display text-[32px] font-normal leading-[1.15] text-ink sm:text-5xl lg:text-[3.2rem]">
                Domine a técnica de depilação em{' '}
                <span className="italic text-rose-500">axilas e virilha</span> em apenas 1 dia
              </h1>
              <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-ink/65 sm:text-base">
                Curso presencial e prático, direto na Sandydepil, com quem atende há mais de{' '}
                {business.yearsOfExperience} anos: aprenda a técnica completa, pratique em modelo
                real sob supervisão e saia com certificado no mesmo dia.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <a href={whatsappCurso(MSG_PADRAO)} target="_blank" rel="noopener noreferrer" className="btn-primary w-full sm:w-auto sm:!px-8">
                  <MessageCircle size={17} />
                  Garantir minha vaga
                </a>
                <a href="#duvidas" className="btn-ghost w-full sm:w-auto">
                  Tirar minhas dúvidas
                </a>
              </div>

              <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
                {['Certificado de conclusão', 'Turma personalizada e presencial', 'Prática em modelo real'].map((b) => (
                  <li key={b} className="flex items-center gap-1.5 text-[13px] font-medium text-ink/65">
                    <Check size={13} className="text-rose-500" />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal variant="fadeUp" delay={0.12} className="relative">
              <img
                src="/images/cursos/depilacao-axilas-virilha/turma-3.webp"
                alt="Sandy com alunas do curso presencial de depilação em axilas e virilha"
                className="aspect-[4/5] w-full rounded-[32px] object-cover object-top shadow-lift"
                loading="eager"
              />
              <div className="absolute -bottom-6 -left-6 rounded-2xl border border-rose-100 bg-white px-6 py-4 shadow-soft">
                <strong className="block font-display text-2xl italic text-rose-600">
                  +{business.yearsOfExperience} anos
                </strong>
                <span className="text-[12px] text-ink/60">de experiência prática</span>
              </div>
            </Reveal>
          </div>

          {/* Selos rápidos — resposta imediata às primeiras perguntas de quem chega pelo anúncio */}
          <RevealGroup
            className="container-luxe relative mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-4 sm:gap-4"
            stagger={0.08}
          >
            {selosRapidos.map((s) => (
              <RevealItem key={s.texto}>
                <div className="flex items-center gap-3 rounded-2xl border border-rose-100 bg-white/80 px-4 py-3.5 shadow-soft backdrop-blur">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-gradient text-white">
                    <s.icon size={16} strokeWidth={1.8} />
                  </div>
                  <span className="text-[12.5px] font-medium leading-tight text-ink/75">{s.texto}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* RESULTADO REAL — logo após o hero, de propósito: é a prova mais
            forte da página (feedback real de uma cliente atendida pela Sandy
            com a mesma técnica do curso) e sozinha já quebra a maior
            objeção ("será que funciona mesmo?") antes de explicar qualquer
            outra coisa. Não é depoimento de aluna do curso — por isso fica
            separada da seção de Depoimentos mais abaixo. Destaque visual de
            propósito: fundo em gradiente rosa + selo, diferente do restante
            da página, para não passar despercebida. */}
        <section id="resultado" className="scroll-mt-20 relative overflow-hidden bg-gradient-to-br from-rose-100 via-cream to-beige section-y">
          <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-rose-400/25 blur-[120px]" />
          <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-gold/20 blur-[110px]" />

          <div className="container-luxe relative grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            {/* No mobile o vídeo vem primeiro (order-1): é a prova mais forte
                da página, então aparece antes mesmo do texto de contexto. No
                desktop volta ao normal (texto à esquerda, vídeo à direita). */}
            <Reveal variant="fadeUp" delay={0.12} className="order-1 mx-auto w-full max-w-[240px] sm:max-w-[280px] lg:order-2">
              <div className="rounded-[30px] border-2 border-rose-300/70 bg-white p-2.5 shadow-glow">
                <VideoTestimonial
                  src="/videos/depoimentos/depoimento-3.mp4"
                  poster="/images/depoimentos/depoimento-3-poster.webp"
                  name="Cliente atendida pela Sandy"
                />
              </div>
            </Reveal>

            <Reveal variant="fadeUp" className="order-2 text-center lg:order-1 lg:text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-gradient px-3.5 py-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-white shadow-soft">
                ✦ Prova real, sem atriz
              </span>
              <h2 className="mt-4 font-display text-[24px] leading-tight text-ink sm:text-4xl">
                O resultado que você vai aprender a <span className="italic text-rose-500">entregar</span>
              </h2>
              <p className="mx-auto mt-4 max-w-md text-[14.5px] leading-relaxed text-ink/65 sm:text-[15px] lg:mx-0">
                Este é o retorno real de uma cliente atendida pela Sandy com a mesma técnica de
                depilação em axilas e virilha que você vai aprender no curso. Assista antes de
                decidir.
              </p>
              <a href={whatsappCurso(MSG_PADRAO)} target="_blank" rel="noopener noreferrer" className="btn-primary mt-7 w-full sm:w-auto">
                <MessageCircle size={17} />
                Quero aprender essa técnica
              </a>
            </Reveal>
          </div>
        </section>

        {/* QUEM É A SANDY */}
        <section id="sobre" className="scroll-mt-20 bg-offwhite section-y">
          <div className="container-luxe grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal variant="fadeUp">
              <img
                src={professional.photo}
                alt={professional.name}
                className="aspect-[4/5] w-full max-w-sm rounded-[28px] object-cover shadow-lift"
                loading="lazy"
              />
            </Reveal>

            <Reveal variant="fadeUp" delay={0.12}>
              <span className="eyebrow">Quem é a Sandy</span>
              <h2 className="mt-3 font-display text-[26px] leading-tight text-ink sm:text-4xl">
                Aprenda com quem <span className="italic text-rose-500">atende todos os dias</span>
              </h2>
              {professional.bio.map((paragrafo) => (
                <p key={paragrafo} className="mt-4 text-[14.5px] leading-relaxed text-ink/65">
                  {paragrafo}
                </p>
              ))}
              <blockquote className="mt-6 border-l-2 border-rose-300 pl-4 font-display text-[16px] italic leading-relaxed text-ink/70">
                “{professional.quote}”
              </blockquote>
              <a href={whatsappCurso(MSG_PADRAO)} target="_blank" rel="noopener noreferrer" className="btn-primary mt-7 w-full sm:w-auto">
                Quero aprender com a Sandy
              </a>
            </Reveal>
          </div>
        </section>

        {/* CONTEÚDO PROGRAMÁTICO */}
        <section id="conteudo" className="scroll-mt-20 section-y">
          <div className="container-luxe">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Conteúdo programático · 1 dia de curso</span>
              <h2 className="mt-3 font-display text-[26px] leading-tight text-ink sm:text-4xl">
                O que você vai <span className="italic text-rose-500">aprender</span>
              </h2>
              <p className="mt-4 text-[14.5px] leading-relaxed text-ink/60">
                Tudo isso em um único encontro presencial: teoria direto ao ponto e prática
                supervisionada em modelo real, sem enrolação.
              </p>
            </Reveal>

            <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3" stagger={0.1}>
              {modulos.map((m) => (
                <RevealItem key={m.numero}>
                  <div className="h-full rounded-2xl border border-rose-100 bg-white p-7 shadow-soft transition-all duration-500 md:hover:-translate-y-1.5 md:hover:shadow-lift">
                    <span className="bg-rose-gradient bg-clip-text font-display text-3xl italic font-semibold text-transparent">
                      {m.numero}
                    </span>
                    <h3 className="mt-3 font-display text-[18px] text-ink">{m.titulo}</h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-ink/60">{m.texto}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* BENEFÍCIOS */}
        <section id="beneficios" className="scroll-mt-20 bg-offwhite section-y">
          <div className="container-luxe">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Por que fazer este curso</span>
              <h2 className="mt-3 font-display text-[26px] leading-tight text-ink sm:text-4xl">
                Benefícios e <span className="italic text-rose-500">diferenciais</span>
              </h2>
            </Reveal>

            <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4" stagger={0.1}>
              {beneficios.map((b) => (
                <RevealItem key={b.titulo}>
                  <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-gradient text-white shadow-soft">
                      <b.icon size={26} strokeWidth={1.6} />
                    </div>
                    <h3 className="mt-4 font-display text-[16px] text-ink">{b.titulo}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink/60">{b.texto}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.2} className="mt-10 text-center">
              <a href={whatsappCurso(MSG_PADRAO)} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Quero esses benefícios
              </a>
            </Reveal>
          </div>
        </section>

        {/* FOTOS REAIS DAS AULAS */}
        <section id="fotos" className="scroll-mt-20 section-y">
          <div className="container-luxe">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Bastidores</span>
              <h2 className="mt-3 font-display text-[26px] leading-tight text-ink sm:text-4xl">
                Fotos reais das <span className="italic text-rose-500">aulas</span>
              </h2>
              <p className="mt-4 text-[14.5px] leading-relaxed text-ink/60">
                Registros direto da turma presencial, na Sandydepil em {business.address.full}.
              </p>
            </Reveal>

            <RevealGroup
              className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-5 sm:grid-cols-3 lg:mt-12 lg:gap-7"
              stagger={0.1}
            >
              {fotosAulas.map((f) => (
                <RevealItem key={f.src}>
                  <figure>
                    <img
                      src={f.src}
                      alt={f.alt}
                      loading="lazy"
                      className={`aspect-square w-full rounded-[24px] object-cover ${f.position} shadow-soft`}
                    />
                    <figcaption className="mt-3 text-center text-[13px] text-ink/60">
                      {f.caption}
                    </figcaption>
                  </figure>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* DEPOIMENTOS DE ALUNAS */}
        <section id="depoimentos" className="scroll-mt-20 relative overflow-hidden bg-gradient-to-b from-ink to-[#2E1A23] py-16 text-white sm:py-20 lg:py-24">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-rose-500/20 blur-[130px]" />

          <div className="container-luxe relative">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="text-[10px] font-medium uppercase tracking-luxe text-gold-light">
                ✦ Prova social
              </span>
              <h2 className="mt-3 font-display text-[26px] leading-tight text-white sm:text-4xl">
                Depoimentos de <span className="italic text-rose-200">alunas</span>
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[14.5px] leading-relaxed text-white/60">
                A Sandy já ensinou esta técnica de forma particular — veja o que quem já passou
                pelo curso tem a dizer.
              </p>
            </Reveal>

            <RevealGroup className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-3" stagger={0.12}>
              {depoimentos.map((d) => (
                <RevealItem key={d.texto}>
                  <blockquote
                    className={`flex h-full flex-col gap-4 rounded-2xl border p-7 backdrop-blur ${
                      d.destaque
                        ? 'border-rose-400/40 bg-gradient-to-b from-rose-500/20 to-rose-500/5 shadow-glow lg:-translate-y-3'
                        : 'border-white/15 bg-white/[0.05]'
                    }`}
                  >
                    <span className="text-gold-light">★★★★★</span>
                    <p className="flex-1 font-display text-[16px] italic leading-relaxed text-white/90">
                      “{d.texto}”
                    </p>
                    <footer className="mt-auto flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-rose-400/50 bg-white/10">
                        <Users size={18} className="text-white/50" strokeWidth={1.6} />
                      </div>
                      <span className="text-[13px] text-white/60">{d.papel}</span>
                    </footer>
                  </blockquote>
                </RevealItem>
              ))}
            </RevealGroup>

            <p className="mx-auto mt-8 max-w-lg text-center text-[12px] leading-relaxed text-white/40">
              Depoimentos com base no retorno real das alunas atendidas de forma particular. Nomes
              e fotos entram assim que houver esse registro.
            </p>
          </div>
        </section>

        {/* DÚVIDAS FREQUENTES — objeções mais comuns antes de fechar */}
        <section id="duvidas" className="scroll-mt-20 bg-offwhite section-y">
          <div className="container-luxe">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Antes de decidir</span>
              <h2 className="mt-3 font-display text-[26px] leading-tight text-ink sm:text-4xl">
                Tire suas <span className="italic text-rose-500">dúvidas</span>
              </h2>
              <p className="mt-4 text-[14.5px] leading-relaxed text-ink/60">
                As perguntas que mais recebemos antes de alguém garantir a vaga.
              </p>
            </Reveal>

            <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-3.5 lg:mt-12">
              {duvidas.map((item, i) => (
                <FaqItem
                  key={item.pergunta}
                  item={item}
                  aberto={faqAberta === i}
                  onToggle={() => setFaqAberta(faqAberta === i ? -1 : i)}
                />
              ))}
            </div>

            <Reveal delay={0.15} className="mx-auto mt-9 max-w-2xl text-center">
              <p className="text-[13.5px] text-ink/60">Ainda ficou com alguma dúvida?</p>
              <a
                href={whatsappCurso(MSG_DUVIDA)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost mt-3"
              >
                <MessageCircle size={16} />
                Falar com a Sandy no WhatsApp
              </a>
            </Reveal>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="relative overflow-hidden bg-gradient-to-br from-rose-100 via-beige to-cream py-16 sm:py-20 lg:py-24">
          <div className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-rose-400/20 blur-[110px]" />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-gold/15 blur-[100px]" />

          <Reveal className="container-luxe relative mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-rose-600 shadow-soft">
              <Clock size={12} />
              Vagas limitadas · Turma personalizada
            </span>
            <h2 className="mt-5 font-display text-[27px] leading-[1.15] text-ink sm:text-4xl lg:text-[2.9rem]">
              Sua vaga na próxima turma presencial de{' '}
              <span className="italic text-rose-500">1 dia</span> está a uma mensagem de distância
            </h2>
            <p className="mt-5 text-[14.5px] leading-relaxed text-ink/65 sm:text-base">
              Fale com a Sandy agora pelo WhatsApp e garanta seu lugar — turma personalizada,
              prática em modelo real, certificado ao final do dia.
            </p>
            <a
              href={whatsappCurso(MSG_PADRAO)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-8 w-full sm:w-auto sm:!px-10"
            >
              <MessageCircle size={18} />
              Garantir minha vaga agora
            </a>
            <p className="mt-4 text-[12px] text-ink/50">
              Sem compromisso — a conversa é para tirar dúvidas e falar sobre valores e datas.
            </p>
          </Reveal>
        </section>

        {/* FOOTER — próprio da landing */}
        <footer className="bg-ink py-14 text-white/70">
          <div className="container-luxe grid gap-10 sm:grid-cols-3">
            <div>
              <span className="inline-flex flex-col leading-none">
                <span className="font-display text-lg text-rose-200">SANDYDEPIL</span>
                <span className="mt-1 text-[9px] font-medium uppercase tracking-luxe text-rose-200/70">
                  Axilas &amp; Virilha
                </span>
              </span>
              <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-white/50">
                Curso presencial de 1 dia de depilação em axilas e virilha, para quem quer atender
                com técnica e segurança.
              </p>
            </div>

            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-luxe text-white">Contato</h4>
              <ul className="mt-4 space-y-2 text-[13.5px] text-white/60">
                <li>{business.email}</li>
                <li>{business.phone}</li>
                <li>{business.address.full}</li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-luxe text-white">Redes sociais</h4>
              <ul className="mt-4 space-y-2 text-[13.5px]">
                <li>
                  <a href={business.instagram} target="_blank" rel="noopener noreferrer" className="text-white/60 transition-colors hover:text-rose-300">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href={business.youtube} target="_blank" rel="noopener noreferrer" className="text-white/60 transition-colors hover:text-rose-300">
                    YouTube
                  </a>
                </li>
                <li>
                  <a href={whatsappCurso(MSG_PADRAO)} target="_blank" rel="noopener noreferrer" className="text-white/60 transition-colors hover:text-rose-300">
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="container-luxe mt-10 border-t border-white/10 pt-6 text-center text-[11.5px] tracking-wide text-white/40">
            © {new Date().getFullYear()} Sandydepil | Todos os direitos reservados.
          </div>
        </footer>
      </main>

      {/* BARRA FIXA DE WHATSAPP — mobile: barra inferior sempre visível.
          Tráfego de anúncio decide rápido; o CTA precisa estar sempre à mão,
          não só no fim da página. safe-bottom evita que o home indicator do
          iPhone fique em cima do botão. */}
      <div
        className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-rose-100 bg-white/95 px-4 pt-3 shadow-[0_-8px_30px_-15px_rgba(28,23,25,0.25)] backdrop-blur-md lg:hidden"
      >
        <a
          href={whatsappCurso(MSG_PADRAO)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mb-3 flex w-full items-center justify-center gap-2"
        >
          <MessageCircle size={18} />
          Garantir minha vaga no WhatsApp
        </a>
      </div>

      {/* Botão flutuante — desktop */}
      <a
        href={whatsappCurso(MSG_PADRAO)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-7 right-7 z-40 hidden h-16 w-16 items-center justify-center rounded-full bg-rose-gradient text-white shadow-lift transition-transform duration-300 hover:scale-105 lg:flex"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-rose-400/50" />
        <MessageCircle size={26} className="relative" strokeWidth={1.8} />
      </a>
    </div>
  )
}
