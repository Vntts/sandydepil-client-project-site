import { Clock, MapPin, Navigation, Phone } from 'lucide-react'
import Reveal from './Reveal'
import { business } from '../data/site'

/**
 * Localização.
 * No mobile, o mapa de 380px de altura empurrava as informações fora da tela.
 * Agora os dados vêm primeiro e o mapa fica mais baixo — quem está no celular
 * quer o botão de rota, não explorar o mapa embutido.
 */
export default function Location() {
  return (
    <section id="localizacao" className="bg-cream section-y">
      <div className="container-luxe">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Onde estamos</p>
          <h2 className="mt-3 font-display text-[26px] leading-[1.2] text-ink sm:text-4xl">
            Santa Maria – DF, com ambiente reservado
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:mt-12 lg:grid-cols-5 lg:gap-8">
          {/* Informações — primeiro no mobile */}
          <Reveal variant="fadeUp" delay={0.08} className="lg:order-2 lg:col-span-2">
            <div className="flex h-full flex-col justify-between rounded-2xl border border-rose-100 bg-white p-6 sm:p-7">
              <div className="space-y-5 sm:space-y-6">
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
                  <Clock size={18} strokeWidth={1.7} className="mt-0.5 shrink-0 text-rose-400" />
                  <div className="flex-1">
                    <p className="text-[10px] font-medium uppercase tracking-luxe text-ink/40">
                      Horários
                    </p>
                    {/* TODO: confirmar horários reais em src/data/site.js */}
                    <ul className="mt-1.5 space-y-1">
                      {business.hours.map((h) => (
                        <li key={h.day} className="flex justify-between gap-4 text-[13px] text-ink/70">
                          <span>{h.day}</span>
                          <span className="text-ink/45">{h.time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-2.5 sm:flex-row lg:flex-col">
                <a
                  href={business.mapsDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex-1"
                >
                  <Navigation size={15} />
                  Traçar rota
                </a>
                <a href={`tel:+${business.phoneRaw}`} className="btn-ghost flex-1">
                  <Phone size={15} />
                  {business.phone}
                </a>
              </div>
            </div>
          </Reveal>

          {/* Mapa */}
          <Reveal variant="fadeUp" className="lg:order-1 lg:col-span-3">
            <div className="h-[240px] overflow-hidden rounded-2xl border border-rose-100 shadow-soft sm:h-[320px] lg:h-full lg:min-h-[380px]">
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
          </Reveal>
        </div>
      </div>
    </section>
  )
}
