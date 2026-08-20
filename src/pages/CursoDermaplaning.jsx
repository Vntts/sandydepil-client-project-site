import { useEffect, useState } from 'react'
import {
  Award,
  Check,
  HeartHandshake,
  Infinity as InfinityIcon,
  Menu,
  Play,
  Video,
  X,
} from 'lucide-react'
import useSeo from '../hooks/useSeo'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import ScrollToTop from '../components/ScrollToTop'
import VideoTestimonial from '../components/VideoTestimonial'
import { business, whatsappLink, videoTestimonials } from '../data/site'

/**
 * Landing de venda do curso de Dermaplaning — página autônoma, fora do
 * <Layout /> do site institucional (por isso não aparece aqui o Navbar de
 * nove links, nem o rodapé com Sobre/Blog/Procedimentos): o objetivo de uma
 * página de venda é manter a atenção num único caminho, sem saída lateral.
 * Cabeçalho e rodapé são próprios desta página.
 *
 * Portada do projeto solto (HTML + CSS + JS puro) que já existia em
 * "Sandydepil.com.br" para dentro do projeto do site, reescrita em React e no
 * mesmo sistema de design (Tailwind, paleta rose/gold, fontes Playfair
 * Display + Inter que o site inteiro já carrega — por isso as fontes
 * Italiana e Cormorant Garamond do HTML original saíram: eram carregadas mas
 * nunca usadas em nenhuma regra do CSS antigo).
 *
 * Duas correções em relação ao original, registradas aqui porque não são
 * óbvias de fora:
 *  1. Todo botão de conversão ("Garantir minha vaga", "Quero participar" etc.)
 *     apontava para `#cta-final`, uma seção que nunca chegou a ser criada no
 *     HTML — clicar não fazia nada. Agora todos abrem o WhatsApp direto.
 *  2. O botão "Assistir apresentação" do hero apontava para `#video`, mas o
 *     id da seção estava escrito com espaço (`id="vide o"`) — outro clique
 *     que não fazia nada. Corrigido para `id="video"`.
 */

// TODO: cole aqui a URL de embed do vídeo de apresentação real, ex.:
// 'https://www.youtube.com/embed/SEU_ID?autoplay=1'. Enquanto estiver null,
// clicar no player abre o WhatsApp como alternativa — nada fica quebrado.
const VIDEO_EMBED_URL = null

const whatsappCurso = (mensagem) => whatsappLink(mensagem)
const MSG_PADRAO = 'Olá! Tenho interesse no curso de Dermaplaning e gostaria de garantir minha vaga. 💗'

const navLinks = [
  { label: 'Sobre o curso', href: '#sobre' },
  { label: 'Conteúdo', href: '#aprender' },
  { label: 'Materiais', href: '#materiais' },
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'Depoimentos', href: '#depoimentos' },
]

const modulos = [
  {
    numero: '01',
    titulo: 'Fundamentos da pele',
    texto: 'Anatomia, tipos de pele, indicações e contraindicações para você atender com total segurança.',
  },
  {
    numero: '02',
    titulo: 'Materiais e produtos',
    texto: 'Guia de lâminas e cosméticos para começar do zero sem investir em equipamentos caros.',
  },
  {
    numero: '03',
    titulo: 'Técnica de Dermaplaning',
    texto: 'Postura das mãos, ângulos corretos e movimentos precisos para um procedimento sem riscos.',
  },
  {
    numero: '04',
    titulo: 'Aula prática real',
    texto: 'Passo a passo em modelos reais para você ver a aplicação de perto e eliminar a insegurança.',
  },
  {
    numero: '05',
    titulo: 'Protocolo premium',
    texto: 'Associações e finalizações exclusivas para valorizar seu atendimento e cobrar mais caro.',
  },
  {
    numero: '06',
    titulo: 'Como conseguir clientes',
    texto: 'Estratégias simples de divulgação e marketing para conquistar suas primeiras clientes rapidamente.',
  },
]

const materiais = [
  'Lâminas estéreis específicas para Dermaplaning',
  'Cabo profissional em aço inox',
  'Higienizador e antisséptico facial',
  'Toalhas descartáveis e faixa de cabelo',
  'Sérum hidratante e protetor solar pós-procedimento',
  'EPIs: luvas, máscara e óculos de proteção',
]

const beneficios = [
  { icon: Video, titulo: 'Aulas em alta definição', texto: 'Câmeras em close para você não perder nenhum detalhe da técnica.' },
  { icon: InfinityIcon, titulo: 'Acesso vitalício', texto: 'Estude no seu ritmo, revise sempre que quiser, sem prazo final.' },
  { icon: HeartHandshake, titulo: 'Suporte com a expert', texto: 'Comunidade exclusiva para tirar dúvidas e compartilhar resultados.' },
  { icon: Award, titulo: 'Certificado digital', texto: 'Comprovação de conclusão para divulgar nas redes e atrair clientes.' },
]

const stats = [
  { valor: '4.9', label: '★★★★★ avaliação' },
  { valor: '+100', label: 'alunas formadas' },
  { valor: '97%', label: 'recomendariam' },
  { valor: '+7', label: 'estados atendidos' },
]

const depoimentos = [
  {
    texto: 'Em três semanas já tinha pago o curso. Hoje Dermaplaning é o meu carro-chefe e minhas clientes não param de indicar.',
    nome: 'Camila Rocha',
    papel: 'Esteticista · São Paulo, SP',
    foto: '/images/cursos/dermaplaning/depoimento-t1.webp',
  },
  {
    texto: 'Conteúdo riquíssimo, didática impecável. Saí do curso confiante para atender no mesmo dia. Triplicou meu faturamento em 2 meses.',
    nome: 'Juliana Mendes',
    papel: 'Biomédica esteta · Rio de Janeiro, RJ',
    foto: '/images/cursos/dermaplaning/depoimento-t3.webp',
    destaque: true,
  },
  {
    texto: 'Minhas clientes ficam viciadas no resultado. A pele fica iluminada na hora e elas voltam todo mês sem falta!',
    nome: 'Patrícia Lima',
    papel: 'Spa Owner · Belo Horizonte, MG',
    foto: '/images/cursos/dermaplaning/depoimento-t2.webp',
  },
]

export default function CursoDermaplaning() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [videoAtivo, setVideoAtivo] = useState(false)

  useSeo({
    title: 'Curso de Dermaplaning — Domine a técnica que transforma a pele',
    description:
      'Curso completo de Dermaplaning. Aprenda a técnica passo a passo, materiais, protocolos e diferenciais para multiplicar seus resultados na estética.',
    path: '/cursos/dermaplaning',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'Curso de Dermaplaning',
      description:
        'Curso completo de Dermaplaning: técnica passo a passo, materiais, protocolos e como conquistar as primeiras clientes.',
      provider: {
        '@type': 'Organization',
        name: business.fullName,
        sameAs: business.siteUrl,
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

  const onVideoClick = () => {
    if (VIDEO_EMBED_URL) {
      setVideoAtivo(true)
    } else {
      window.open(whatsappCurso('Olá! Gostaria de assistir à apresentação do curso de Dermaplaning. 💗'), '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="bg-cream font-sans text-ink">
      <ScrollToTop />

      {/* Barra utilitária — some ao rolar, junto com o resto da página */}
      <div className="bg-ink py-2.5 text-white">
        <div className="container-luxe flex items-center justify-between gap-4 text-[11px] tracking-wide">
          <span className="text-gold-light">✦ Vagas limitadas por turma</span>
          <span className="hidden text-white/70 sm:inline">
            sandydepil26@gmail.com · {business.phone}
          </span>
        </div>
      </div>

      {/* Nav — fixo, com marca própria da landing (não é o Navbar do site) */}
      <header
        className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
          scrolled ? 'bg-cream/95 shadow-[0_8px_30px_-10px_rgba(28,23,25,0.15)] backdrop-blur-md' : 'bg-cream/85 backdrop-blur-sm'
        }`}
      >
        <div className="container-luxe flex h-[72px] items-center justify-between gap-6">
          <a href="#top" className="inline-flex flex-col leading-none">
            <span className="font-display text-xl tracking-wide text-rose-600">SANDYDEPIL</span>
            <span className="mt-1 text-[9px] font-medium uppercase tracking-luxe text-rose-500/80">
              Dermaplaning
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
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
              Inscreva-se
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

      {/* Menu mobile — painel deslizando da direita */}
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
              Dermaplaning
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
            Inscreva-se
          </a>
        </nav>
      </div>

      <main id="top">
        {/* HERO */}
        <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
          <img
            src="/images/cursos/dermaplaning/hero-bg.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-40"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-cream/80 to-cream" />
          <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-rose-400/20 blur-[110px]" />
          <div className="pointer-events-none absolute -left-20 bottom-0 hidden h-64 w-64 rounded-full bg-gold/15 blur-[100px] lg:block" />

          <div className="container-luxe relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal variant="fadeUp">
              <span className="eyebrow">✦ Método prático</span>
              <h1 className="mt-4 font-display text-[32px] font-normal leading-[1.15] text-ink sm:text-5xl lg:text-[3.4rem]">
                Comece do zero e conquiste suas{' '}
                <span className="italic text-rose-500">primeiras</span> clientes com Dermaplaning
              </h1>
              <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-ink/65 sm:text-base">
                Descubra como atender suas primeiras clientes com segurança usando uma técnica
                simples, lucrativa e de resultados imediatos.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <a href={whatsappCurso(MSG_PADRAO)} target="_blank" rel="noopener noreferrer" className="btn-primary w-full sm:w-auto sm:!px-8">
                  Garantir minha vaga
                </a>
                <a href="#video" className="btn-ghost w-full sm:w-auto">
                  <Play size={15} className="fill-current" />
                  Assistir apresentação
                </a>
              </div>

              <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
                {['Certificado ao final do curso', 'Acesso vitalício', 'Suporte com a expert'].map((b) => (
                  <li key={b} className="flex items-center gap-1.5 text-[13px] font-medium text-ink/65">
                    <Check size={13} className="text-rose-500" />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal variant="fadeUp" delay={0.12} className="relative">
              <img
                src="/images/cursos/dermaplaning/hero.webp"
                alt="Especialista realizando atendimento de Dermaplaning"
                className="aspect-[4/5] w-full rounded-[32px] object-cover shadow-lift"
                loading="eager"
              />
              <div className="absolute -bottom-6 -left-6 rounded-2xl border border-rose-100 bg-white px-6 py-4 shadow-soft">
                <strong className="block font-display text-2xl italic text-rose-600">+100 alunas</strong>
                <span className="text-[12px] text-ink/60">Método validado</span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* VÍDEO */}
        <section id="video" className="scroll-mt-20 bg-offwhite py-16 sm:py-20 lg:py-24">
          <div className="container-luxe">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Assista ao vídeo</span>
              <h2 className="mt-3 font-display text-[26px] leading-tight text-ink sm:text-4xl">
                Veja como o método funciona em <span className="italic text-rose-500">1 minuto e meio</span>
              </h2>
              <p className="mt-4 text-[14.5px] leading-relaxed text-ink/60">
                Em apenas 1 minuto e meio, veja como o Dermaplaning pode se transformar na sua
                primeira fonte de renda na estética.
              </p>
            </Reveal>

            <Reveal delay={0.12} className="mx-auto mt-10 max-w-3xl">
              {videoAtivo && VIDEO_EMBED_URL ? (
                <div className="aspect-video overflow-hidden rounded-[28px] shadow-lift">
                  <iframe
                    src={VIDEO_EMBED_URL}
                    title="Apresentação do curso de Dermaplaning"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={onVideoClick}
                  className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-[28px] shadow-lift"
                >
                  <img
                    src="/images/cursos/dermaplaning/video-poster.webp"
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-ink/75 via-ink/55 to-ink/40" />
                  <span className="pointer-events-none absolute h-40 w-40 animate-floaty rounded-full bg-rose-400/40 blur-3xl" />

                  <span className="relative flex h-24 w-24 items-center justify-center">
                    <span className="absolute inset-0 animate-ping rounded-full bg-white/50" />
                    <span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white text-rose-600 shadow-lift transition-transform duration-300 group-hover:scale-105">
                      <Play size={28} className="ml-1 fill-current" />
                    </span>
                  </span>

                  <span className="absolute bottom-6 text-[11px] font-medium uppercase tracking-luxe text-gold-light">
                    Veja como funciona · 1:30
                  </span>
                </button>
              )}
            </Reveal>

            <Reveal delay={0.2} className="mt-9 text-center">
              <a href={whatsappCurso(MSG_PADRAO)} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Quero participar
              </a>
            </Reveal>
          </div>
        </section>

        {/* SOBRE */}
        <section id="sobre" className="scroll-mt-20 section-y">
          <div className="container-luxe grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal variant="fadeUp">
              <span className="eyebrow">Sobre o curso</span>
              <h2 className="mt-3 font-display text-[26px] leading-tight text-ink sm:text-4xl">
                Um método completo, <span className="italic text-rose-500">do zero</span> ao avançado
              </h2>
              <p className="mt-5 text-[14.5px] leading-relaxed text-ink/65">
                O curso <strong className="font-medium text-ink">Renda Extra com Dermaplaning</strong>{' '}
                é para mulheres que desejam começar na estética mesmo sem experiência. Você vai
                aprender, passo a passo, como realizar o procedimento com segurança, dominar a
                técnica correta e atender suas primeiras clientes com confiança.
              </p>
              <p className="mt-4 text-[14.5px] leading-relaxed text-ink/65">
                Com um método prático e fácil de aplicar, você descobrirá como transformar o
                Dermaplaning em uma nova fonte de renda, sem precisar investir em equipamentos caros
                ou ter um salão próprio.
              </p>
              <p className="mt-4 text-[14.5px] leading-relaxed text-ink/65">
                Desde o manuseio seguro da lâmina até os protocolos mais utilizados no mercado, você
                terá acesso a um treinamento completo para começar do zero e evoluir na área da
                estética com segurança e profissionalismo.
              </p>
              <a href={whatsappCurso(MSG_PADRAO)} target="_blank" rel="noopener noreferrer" className="btn-primary mt-7 w-full sm:w-auto">
                Começar agora
              </a>
            </Reveal>

            <Reveal variant="fadeUp" delay={0.12}>
              <img
                src="/images/cursos/dermaplaning/atendimento-sobre.webp"
                alt="Atendimento de Dermaplaning em andamento"
                className="aspect-[4/3] w-full rounded-[28px] object-cover shadow-lift"
                loading="lazy"
              />
            </Reveal>
          </div>
        </section>

        {/* O QUE VOCÊ VAI APRENDER */}
        <section id="aprender" className="scroll-mt-20 bg-offwhite section-y">
          <div className="container-luxe">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Conteúdo programático</span>
              <h2 className="mt-3 font-display text-[26px] leading-tight text-ink sm:text-4xl">
                O que você vai <span className="italic text-rose-500">aprender</span>
              </h2>
              <p className="mt-4 text-[14.5px] leading-relaxed text-ink/60">
                Mais de 40 aulas práticas divididas em módulos progressivos.
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

        {/* MATERIAIS */}
        <section id="materiais" className="scroll-mt-20 section-y">
          <div className="container-luxe grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal variant="fadeUp" className="order-2 lg:order-1">
              <img
                src="/images/cursos/dermaplaning/mesa-equipamentos.webp"
                alt="Materiais de Dermaplaning organizados em mármore"
                className="aspect-[4/3] w-full rounded-[28px] object-cover shadow-lift"
                loading="lazy"
              />
            </Reveal>

            <Reveal variant="fadeUp" delay={0.12} className="order-1 lg:order-2">
              <span className="eyebrow">Materiais necessários</span>
              <h2 className="mt-3 font-display text-[26px] leading-tight text-ink sm:text-4xl">
                Tudo o que você precisa para <span className="italic text-rose-500">começar</span>
              </h2>
              <p className="mt-5 text-[14.5px] leading-relaxed text-ink/65">
                Descubra exatamente quais materiais utilizar e onde comprar cada item para começar
                seus atendimentos com segurança e profissionalismo.
              </p>
              <ul className="mt-6 divide-y divide-rose-100 border-y border-rose-100">
                {materiais.map((item) => (
                  <li key={item} className="flex items-start gap-3 py-3.5 text-[13.5px] text-ink/70">
                    <Check size={14} className="mt-0.5 shrink-0 text-rose-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* BENEFÍCIOS */}
        <section id="beneficios" className="scroll-mt-20 bg-offwhite section-y">
          <div className="container-luxe">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Por que escolher</span>
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

        {/* DEPOIMENTOS */}
        <section id="depoimentos" className="scroll-mt-20 relative overflow-hidden bg-gradient-to-b from-ink to-[#2E1A23] py-16 text-white sm:py-20 lg:py-24">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-rose-500/20 blur-[130px]" />

          <div className="container-luxe relative">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="text-[10px] font-medium uppercase tracking-luxe text-gold-light">
                ✦ Prova social
              </span>
              <h2 className="mt-3 font-display text-[26px] leading-tight text-white sm:text-4xl">
                Mais de <span className="italic text-rose-200">100 alunas</span> já aprenderam Dermaplaning
              </h2>
              <p className="mt-3 text-[14.5px] text-white/60">e começaram a faturar com o procedimento</p>
            </Reveal>

            <RevealGroup className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur sm:grid-cols-4 lg:mt-12" stagger={0.08}>
              {stats.map((s) => (
                <RevealItem key={s.label}>
                  <div className="text-center">
                    <strong className="block font-display text-[26px] italic text-white">{s.valor}</strong>
                    <span className="mt-1 block text-[11px] tracking-wide text-gold-light">{s.label}</span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <RevealGroup className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-3" stagger={0.12}>
              {depoimentos.map((d) => (
                <RevealItem key={d.nome}>
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
                      <img
                        src={d.foto}
                        alt={d.nome}
                        className="h-12 w-12 rounded-full border-2 border-rose-400/50 object-cover"
                        loading="lazy"
                      />
                      <div>
                        <strong className="block text-[14px] text-white">{d.nome}</strong>
                        <span className="text-[12px] text-white/55">{d.papel}</span>
                      </div>
                    </footer>
                  </blockquote>
                </RevealItem>
              ))}
            </RevealGroup>

            {videoTestimonials.length > 0 && (
              <div className="mt-14 lg:mt-16">
                <Reveal className="mx-auto max-w-xl text-center">
                  <span className="text-[10px] font-medium uppercase tracking-luxe text-gold-light">
                    ✦ Direto de quem fez o curso
                  </span>
                  <h3 className="mt-2 font-display text-[22px] italic text-white sm:text-[26px]">
                    Veja e escute os relatos
                  </h3>
                </Reveal>

                <RevealGroup
                  className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3"
                  stagger={0.1}
                >
                  {videoTestimonials.map((v) => (
                    <RevealItem key={v.video}>
                      <VideoTestimonial src={v.video} poster={v.poster} name={v.name} />
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            )}
          </div>
        </section>

        {/* CTA FINAL — recriada: no HTML original não existia (todo botão da
            página apontava para uma #cta-final que nunca foi construída) */}
        <section className="relative overflow-hidden bg-gradient-to-br from-rose-100 via-beige to-cream py-16 sm:py-20 lg:py-24">
          <div className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-rose-400/20 blur-[110px]" />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-gold/15 blur-[100px]" />

          <Reveal className="container-luxe relative mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[27px] leading-[1.15] text-ink sm:text-4xl lg:text-[2.9rem]">
              Sua vaga na próxima turma está <span className="italic text-rose-500">a uma mensagem</span> de
              distância
            </h2>
            <p className="mt-5 text-[14.5px] leading-relaxed text-ink/65 sm:text-base">
              Fale com a Sandy agora pelo WhatsApp e garanta seu lugar — turmas com vagas limitadas,
              certificado ao final e acesso vitalício ao conteúdo.
            </p>
            <a
              href={whatsappCurso(MSG_PADRAO)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-8 w-full sm:w-auto sm:!px-10"
            >
              Garantir minha vaga agora
            </a>
            <p className="mt-4 text-[12px] text-ink/50">
              Sem compromisso — a conversa é para tirar dúvidas e falar sobre valores e datas.
            </p>
          </Reveal>
        </section>

        {/* FOOTER — próprio da landing, sem os links do site institucional */}
        <footer className="bg-ink py-14 text-white/70">
          <div className="container-luxe grid gap-10 sm:grid-cols-3">
            <div>
              <span className="inline-flex flex-col leading-none">
                <span className="font-display text-lg text-rose-200">SANDYDEPIL</span>
                <span className="mt-1 text-[9px] font-medium uppercase tracking-luxe text-rose-200/70">
                  Dermaplaning
                </span>
              </span>
              <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-white/50">
                Capacitação profissional em estética facial para mulheres que querem viver da beleza.
              </p>
            </div>

            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-luxe text-white">Contato</h4>
              <ul className="mt-4 space-y-2 text-[13.5px] text-white/60">
                <li>sandydepil26@gmail.com</li>
                <li>{business.phone}</li>
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
                  <a href="https://www.youtube.com/@sandydepil" target="_blank" rel="noopener noreferrer" className="text-white/60 transition-colors hover:text-rose-300">
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
    </div>
  )
}
