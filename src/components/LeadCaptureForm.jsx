import { useState } from 'react'
import { Check, Loader2, Send } from 'lucide-react'

/**
 * Formulário rápido de captação de lead (nome + WhatsApp) que grava a
 * resposta direto numa Planilha Google — sem backend próprio.
 *
 * COMO FUNCIONA: por baixo dos panos isto é um Google Forms.
 *   1. Crie um Google Forms com dois campos de resposta curta: "Nome" e
 *      "WhatsApp".
 *   2. Na aba "Respostas" do formulário, clique no ícone verde do Sheets
 *      para criar a planilha vinculada — toda resposta cai lá automaticamente.
 *   3. Pegue o link do formulário (Enviar → ícone de link) e me envie: eu
 *      extraio a URL de ação e os IDs dos dois campos e troco as três
 *      constantes abaixo pelos valores reais.
 *
 * Até lá, o formulário fica funcional na tela mas não entrega os dados a
 * lugar nenhum (o envio falha silenciosamente para as constantes de exemplo).
 *
 * Nota técnica: o POST usa `mode: 'no-cors'` porque o Google Forms não libera
 * CORS para domínios externos. Isso significa que não conseguimos ler a
 * resposta do Google — se a requisição não estourar erro de rede, assumimos
 * sucesso e mostramos a confirmação.
 */
const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/SEU_FORM_ID_AQUI/formResponse' // TODO: substituir
const FIELD_NAME_ENTRY = 'entry.000000001' // TODO: substituir pelo entry do campo "Nome"
const FIELD_PHONE_ENTRY = 'entry.000000002' // TODO: substituir pelo entry do campo "WhatsApp"

export default function LeadCaptureForm({ procedureName }) {
  const [form, setForm] = useState({ name: '', phone: '' })
  const [status, setStatus] = useState('idle') // idle | sending | done | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) return

    setStatus('sending')

    const body = new FormData()
    body.append(FIELD_NAME_ENTRY, form.name.trim())
    body.append(FIELD_PHONE_ENTRY, form.phone.trim())

    try {
      await fetch(GOOGLE_FORM_ACTION_URL, { method: 'POST', mode: 'no-cors', body })
      setStatus('done')
      setForm({ name: '', phone: '' })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-rose-100 bg-white p-8 text-center shadow-soft">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-gradient text-white">
          <Check size={20} />
        </span>
        <p className="font-display text-[17px] text-ink">Recebemos seus dados!</p>
        <p className="max-w-xs text-[13.5px] leading-relaxed text-ink/60">
          Em breve alguém da Sandydepil entra em contato pelo WhatsApp para falar sobre{' '}
          {procedureName.toLowerCase()}.
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
        Sem compromisso — é só para tirar dúvidas ou agendar uma avaliação de{' '}
        {procedureName.toLowerCase()}.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
            className="mt-2 w-full rounded-xl border border-rose-100 bg-offwhite px-4 py-3.5 text-[15px] text-ink placeholder:text-ink/35 focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-200"
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
            required
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            placeholder="(61) 90000-0000"
            className="mt-2 w-full rounded-xl border border-rose-100 bg-offwhite px-4 py-3.5 text-[15px] text-ink placeholder:text-ink/35 focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-200"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
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
