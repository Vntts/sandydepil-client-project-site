import { useState } from 'react'
import { Clock, Instagram, MapPin, Navigation, Phone, Send } from 'lucide-react'
import useSeo from '../hooks/useSeo'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { business, procedures, whatsappLink } from '../data/site'

const fieldClass =
  'mt-2 w-full rounded-xl border border-rose-100 bg-offwhite px-4 py-3.5 text-[15px] text-ink placeholder:text-ink/35 focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-200'

export default function Contato() {
  useSeo({
    title: 'Contato e Localização',
    description: `Agende seu atendimento na ${business.fullName}. ${business.address.full}. WhatsApp ${business.phone}.`,
    path: '/contato',
  })

  const [form, setForm] = useState({ name: '', procedure: '', message: '' })

  /**
   * O formulário monta uma mensagem e abre o WhatsApp — não há backend.
   * Zero infraestrutura e resposta no canal que a clínica já usa. Se um dia
   * quiser receber por e-mail: Formspree, Resend ou serverless na Vercel.
   *
   * Nota sobre mobile: os inputs usam fonte de 15px porque abaixo de 16px o
   * Safari do iPhone dá zoom automático ao focar o campo — e o zoom quebra o
   * layout. 15px com o meta viewport atual não dispara o comportamento.
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    const parts = [
      'Olá! Vim pelo site da Sandydepil.',
      form.name && `Meu nome é ${form.name}.`,
      form.procedure && `Tenho interesse em: ${form.procedure}.`,
      form.message && `\n${form.message}`,
    ].filter(Boolean)

    window.open(whatsappLink(parts.join(' ')), '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Vamos conversar sobre o que você precisa"
        description="Atendimento por agendamento, para que cada cliente tenha o tempo necessário sem pressa e sem espera."
        image="https://images.unsplash.com/photo-1596178060810-72660ee8d99a?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: 'Contato' }]}
      />

      {/* Atalhos diretos — quem abre esta página no celular quase sempre
          quer uma dessas três ações, não preencher formulário */}
      <section className="border-b border-rose-100 bg-offwhite py-5 lg:hidden">
        <div className="container-luxe grid grid-cols-3 gap-2.5">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1.5 rounded-xl border border-rose-100 bg-white py-3.5 text-[11px] font-medium text-ink/70 active:bg-rose-50"
          >
            <Send size={17} className="text-rose-500" />
            WhatsApp
          </a>
          <a
            href={`tel:+${business.phoneRaw}`}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-rose-100 bg-white py-3.5 text-[11px] font-medium text-ink/70 active:bg-rose-50"
          >
            <Phone size={17} className="text-rose-500" />
            Ligar
          </a>
          <a
            href={business.mapsDirections}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1.5 rounded-xl border border-rose-100 bg-white py-3.5 text-[11px] font-medium text-ink/70 active:bg-rose-50"
          >
            <Navigation size={17} className="text-rose-500" />
            Rota
          </a>
        </div>
      </section>

      <section className="bg-cream section-y">
        <div className="container-luxe grid gap-8 lg:grid-cols-5 lg:gap-10">
          {/* Informações — primeiro no mobile */}
          <Reveal variant="fadeUp" className="lg:order-2 lg:col-span-2">
            <div className="space-y-5">
              <div className="rounded-2xl border border-rose-100 bg-white p-6 sm:p-7">
                <div className="space-y-5">
                  <div className="flex gap-3.5">
                    <MapPin size={18} strokeWidth={1.7} className="mt-0.5 shrink-0 text-rose-400" />
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-luxe text-ink/40">
                        Endereço
                      </p>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-ink/75">
                        {business.address.street}
                        <br />
                        {business.address.city} – {business.address.state}
                        <br />
                        CEP {business.address.zip}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3.5">
                    <Phone size={18} strokeWidth={1.7} className="mt-0.5 shrink-0 text-rose-400" />
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-luxe text-ink/40">
                        Telefone / WhatsApp
                      </p>
                      <a
                        href={`tel:+${business.phoneRaw}`}
                        className="mt-1 block text-[13.5px] text-ink/75 transition-colors hover:text-rose-600"
                      >
                        {business.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3.5">
                    <Clock size={18} strokeWidth={1.7} className="mt-0.5 shrink-0 text-rose-400" />
                    <div className="flex-1">
                      <p className="text-[10px] font-medium uppercase tracking-luxe text-ink/40">
                        Horários
                      </p>
                      {/* TODO: confirmar horários reais em src/data/site.js */}
                      <ul className="mt-1.5 space-y-1">
                        {business.hours.map((h) => (
                          <li
                            key={h.day}
                            className="flex justify-between gap-4 text-[13px] text-ink/70"
                          >
                            <span>{h.day}</span>
                            <span className="text-ink/45">{h.time}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-3.5">
                    <Instagram size={18} strokeWidth={1.7} className="mt-0.5 shrink-0 text-rose-400" />
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-luxe text-ink/40">
                        Instagram
                      </p>
                      <a
                        href={business.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block text-[13.5px] text-ink/75 transition-colors hover:text-rose-600"
                      >
                        {business.instagramHandle}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-[220px] overflow-hidden rounded-2xl border border-rose-100 shadow-soft sm:h-[280px]">
                <iframe
                  title="Mapa da localização da Sandydepil"
                  src={business.mapsEmbed}
                  className="h-full w-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </Reveal>

          {/* Formulário */}
          <Reveal variant="fadeUp" delay={0.08} className="lg:order-1 lg:col-span-3">
            <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-soft sm:p-8 lg:p-10">
              <p className="eyebrow">Agendamento</p>
              <h2 className="mt-3 font-display text-[22px] leading-snug text-ink sm:text-2xl">
                Monte sua mensagem
              </h2>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink/60">
                Preencha e o botão abrirá o WhatsApp com o texto pronto. Você revisa antes de enviar.
              </p>

              <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[10px] font-medium uppercase tracking-luxe text-ink/50"
                  >
                    Seu nome
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Como podemos te chamar?"
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="procedure"
                    className="block text-[10px] font-medium uppercase tracking-luxe text-ink/50"
                  >
                    Procedimento de interesse
                  </label>
                  <select
                    id="procedure"
                    value={form.procedure}
                    onChange={(e) => setForm({ ...form, procedure: e.target.value })}
                    className={fieldClass}
                  >
                    <option value="">Ainda não sei / quero orientação</option>
                    {procedures.map((p) => (
                      <option key={p.slug} value={p.name}>
                        {p.shortName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-[10px] font-medium uppercase tracking-luxe text-ink/50"
                  >
                    Sua mensagem
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Conte o que gostaria de tratar, dúvidas ou preferência de horário."
                    className={`${fieldClass} resize-none`}
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  <Send size={15} />
                  Abrir no WhatsApp
                </button>

                <p className="text-center text-[11px] text-ink/40">
                  Você será direcionada ao WhatsApp com a mensagem preenchida.
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
