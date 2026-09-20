import { useState } from 'react'
import { Check, Loader2, Send } from 'lucide-react'
import { procedures } from '../data/site'

/**
 * Formulário rápido de captação de lead (nome + WhatsApp, opcionalmente
 * procedimento) que grava a resposta direto na Planilha Google do Gabriel —
 * sem backend próprio.
 *
 * Por baixo dos panos isto é o Google Forms "Formulário do site", que já
 * está vinculado à planilha. Testado em 2026-09-20 com um envio real pela
 * interface do próprio formulário (registrado com sucesso).
 *
 * Dois jeitos de usar:
 *   - Em página de procedimento: passe `procedureName` (ex.: "Depilação com
 *     Cera"). O campo "Procedimento" vai preenchido e escondido — é assim
 *     que dá pra saber, na planilha, de qual página cada lead veio.
 *   - Fora de página de procedimento (ex.: Home): use `showProcedureSelect`
 *     para mostrar um campo de seleção e deixar a própria cliente escolher.
 *
 * Os três campos (Nome, WhatsApp, Procedimento) foram testados com envios
 * reais em 2026-09-20 — um simulando a página de procedimento (procedimento
 * preenchido sozinho) e outro simulando a Home (procedimento escolhido pela
 * cliente) — e os dois caíram certinho na planilha.
 *
 * Nota técnica: o POST usa `mode: 'no-cors'` porque o Google Forms não libera
 * CORS para domínios externos. Isso significa que não conseguimos ler a
 * resposta do Google — se a requisição não estourar erro de rede, assumimos
 * sucesso e mostramos a confirmação.
 */
const GOOGLE_FORM_ACTION_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdINjBDMAMCTCfSt_KbMwy8Z8hkmBInNLqJr0qd1pOLu71jkg/formResponse'
const FIELD_NAME_ENTRY = 'entry.350608030' // campo "Nome"
const FIELD_PHONE_ENTRY = 'entry.35496212' // campo "WhatsApp"
const FIELD_PROCEDURE_ENTRY = 'entry.955633583' // campo "Procedimento"

const fieldClass =
  'mt-2 w-full rounded-xl border border-rose-100 bg-offwhite px-4 py-3.5 text-[15px] text-ink placeholder:text-ink/35 focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-200'

/**
 * Máscara de telefone brasileiro, aplicada enquanto a pessoa digita.
 * Aceita só dígitos (cola, teclado numérico, etc. — qualquer coisa que não
 * for número é descartada) e limita a 11 (DDD + 9 dígitos, celular). Com 10
 * dígitos o resultado fica no formato de telefone fixo (4-4); com 11, no de
 * celular (5-4) — os dois formatos válidos no Brasil.
 */
const formatPhone = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length === 0) return ''
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

// Válido com DDD + 8 dígitos (fixo) ou DDD + 9 dígitos (celular).
const isPhoneValid = (value) => {
  const digits = value.replace(/\D/g, '')
  return digits.length === 10 || digits.length === 11
}

export default function LeadCaptureForm({ procedureName, showProcedureSelect = false }) {
  const [form, setForm] = useState({ name: '', phone: '', procedure: procedureName || '' })
  const [status, setStatus] = useState('idle') // idle | sending | done | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !isPhoneValid(form.phone)) return

    setStatus('sending')

    const body = new FormData()
    body.append(FIELD_NAME_ENTRY, form.name.trim())
    body.append(FIELD_PHONE_ENTRY, form.phone.trim())
    body.append(FIELD_PROCEDURE_ENTRY, form.procedure || 'Não informado')

    try {
      await fetch(GOOGLE_FORM_ACTION_URL, { method: 'POST', mode: 'no-cors', body })
      setStatus('done')
      setForm((f) => ({ ...f, name: '', phone: '' }))
    } catch {
      setStatus('error')
    }
  }

  const procedureLabel = (form.procedure || 'o que você precisa').toLowerCase()

  if (status === 'done') {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-rose-100 bg-white p-8 text-center shadow-soft">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-gradient text-white">
          <Check size={20} />
        </span>
        <p className="font-display text-[17px] text-ink">Recebemos seus dados!</p>
        <p className="max-w-xs text-[13.5px] leading-relaxed text-ink/60">
          Em breve alguém da Sandydepil entra em contato pelo WhatsApp para falar sobre{' '}
          {procedureLabel}.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-rose-100 bg-white p-6 shadow-soft sm:p-8"
    >
      <p className="eyebrow">Quer saber mais?</p>
      <h2 className="mt-3 font-display text-[20px] leading-snug text-ink sm:text-2xl">
        Deixe seu contato que a gente te chama
      </h2>
      <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink/60">
        {procedureName ? (
          <>Sem compromisso — é só para tirar dúvidas ou agendar uma avaliação de {procedureLabel}.</>
        ) : (
          <>Sem compromisso — conte o que te interessa e deixe seu contato.</>
        )}
      </p>

      <div className={`mt-6 grid gap-4 ${showProcedureSelect ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
        <div>
          <label
            htmlFor="lead-name"
            className="block text-[10px] font-medium uppercase tracking-luxe text-ink/50"
          >
            Nome
          </label>
          <input
            id="lead-name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Seu nome"
            className={fieldClass}
          />
        </div>
        <div>
          <label
            htmlFor="lead-phone"
            className="block text-[10px] font-medium uppercase tracking-luxe text-ink/50"
          >
            WhatsApp
          </label>
          <input
            id="lead-phone"
            type="tel"
            inputMode="tel"
            required
            autoComplete="tel"
            maxLength={15}
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: formatPhone(e.target.value) }))}
            placeholder="(61) 90000-0000"
            aria-invalid={form.phone.length > 0 && !isPhoneValid(form.phone)}
            className={fieldClass}
          />
          {form.phone.length > 0 && !isPhoneValid(form.phone) && (
            <p className="mt-1.5 text-[11.5px] text-red-500">
              Confira o número — falta incluir o DDD ou algum dígito.
            </p>
          )}
        </div>

        {/* Só aparece fora de página de procedimento (ex.: Home) — em
            página de procedimento o valor já vem fixo de `procedureName`,
            sem precisar perguntar de novo. */}
        {showProcedureSelect && (
          <div>
            <label
              htmlFor="lead-procedure"
              className="block text-[10px] font-medium uppercase tracking-luxe text-ink/50"
            >
              Procedimento
            </label>
            <select
              id="lead-procedure"
              value={form.procedure}
              onChange={(e) => setForm((f) => ({ ...f, procedure: e.target.value }))}
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
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'sending' || (form.phone.length > 0 && !isPhoneValid(form.phone))}
        className="btn-primary mt-6 w-full disabled:opacity-60"
      >
        {status === 'sending' ? (
          <>
            <Loader2 size={15} className="animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send size={15} />
            Quero saber mais
          </>
        )}
      </button>

      {status === 'error' && (
        <p className="mt-3 text-center text-[12px] text-red-500">
          Não conseguimos enviar agora. Tente novamente ou chame no WhatsApp.
        </p>
      )}

      <p className="mt-3 text-center text-[11px] text-ink/40">
        Seus dados são usados só para retorno da Sandydepil.
      </p>
    </form>
  )
}
