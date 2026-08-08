# Sandydepil — Website Premium

Site institucional multipágina da **Sandydepil Depilação e Estética** (Santa Maria – DF).
React + Vite + Tailwind CSS, roteamento com React Router, animações com Framer Motion, carrossel Swiper e contadores React CountUp.

---

## Rodando localmente

Requer **Node 20.19+ ou 22.12+** (exigência do Vite 8).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # gera /dist
npm run preview    # pré-visualiza o build
```

---

## Páginas

| Rota | Conteúdo |
|---|---|
| `/` | Home — hero, números, apresentação, categorias, resultados, cursos, avaliações |
| `/sobre` | História, linha do tempo 2013→hoje, perfil da profissional, diferenciais, como é o atendimento |
| `/procedimentos` | Índice filtrável por categoria + FAQ |
| `/procedimentos/:slug` | Página individual (9 procedimentos): descrição, indicações, duração, cuidados, antes/depois, relacionados |
| `/cursos` | Índice dos cursos ministrados pela Sandy; o card leva à landing page do curso |
| `/resultados` | Todos os antes/depois + nota de transparência |
| `/depoimentos` | Avaliações do Google com selo de verificação |
| `/blog` e `/blog/:slug` | Seção de dicas (4 artigos iniciais) |
| `/contato` | Formulário que abre o WhatsApp, dados, horários, mapa |
| `*` | Página 404 |

---

## Estrutura

```
index.html                 meta tags base, JSON-LD da clínica, fontes, analytics (TODO)
vercel.json                deploy + rewrites SPA + headers de cache
public/
  favicon.svg · robots.txt · sitemap.xml
  images/                  ⭐ coloque as fotos reais aqui
src/
  data/
    site.js                ⭐ FONTE ÚNICA DE VERDADE — textos, procedimentos, timeline, produtos, FAQ
    blog.js                artigos do blog
  hooks/useSeo.js          title/description/canonical/OG/JSON-LD por página
  pages/                   uma página por rota
  components/              blocos reutilizáveis
  index.css                design system (cores, botões, cards)
```

**Para alterar textos, telefone, horários, procedimentos, produtos ou FAQ: edite `src/data/site.js`.**
**Para publicar um artigo: copie um objeto em `src/data/blog.js`.**

---

## Pendências antes de publicar

### 1. Imagens (obrigatório)

Todas as fotos atuais vêm de banco de imagens (Unsplash) e servem apenas como referência visual.

| Onde | O que | Formato |
|---|---|---|
| `components/Hero.jsx` | fachada / ambiente | 1920×1080 |
| `components/AboutPreview.jsx` | profissional em atendimento | 1000×1250 (4:5) |
| `data/site.js` → `professional.photo` | retrato profissional | 1000×1250 |
| `data/site.js` → `procedures[].image` | 1 foto por procedimento (9) | 1400×1050 |
| `data/site.js` → `results[]` | pares antes/depois (6) | mesmo enquadramento |
| `data/site.js` → `instagramPosts[]` | 6 posts | quadrado |
| `data/blog.js` → `image` | capa de cada artigo | 1400×900 |
| `components/PageHero` (nas páginas) | fundo de cada página interna | 2000×1000 |
| `public/images/og-sandydepil.jpg` | imagem de compartilhamento | 1200×630 |

Salve em `public/images/` e troque a URL pelo caminho local, ex.: `/images/procedimentos/limpeza-de-pele.jpg`.

> **Antes/depois:** use somente fotos com autorização por escrito. Mesmo enquadramento, iluminação e distância nas duas — é o que faz o slider comparativo funcionar.

### 2. Conteúdo a revisar com a profissional

| Onde | O que revisar |
|---|---|
| `data/site.js` → `professional` | **Nome completo, formação e certificações** — hoje são placeholders |
| `data/site.js` → `timeline` | Marcos de 2013 a hoje foram redigidos genericamente; substitua pelos reais |
| `data/site.js` → `procedures[]` | Duração, frequência, indicações e cuidados de cada procedimento |
| `data/site.js` → `business.hours` | Horários de funcionamento (estimativa) — ajuste também no JSON-LD do `index.html` |
| `data/site.js` → `faqs` | Última pergunta (formas de pagamento) está sem resposta real |
| `data/blog.js` | Os 4 artigos são conteúdo inicial informativo; revise e, se possível, reescreva na voz da clínica |

### 3. Cursos — cole a URL da landing page ⚠️

Em `src/data/site.js` → `courses[0].externalUrl` está como `null`. **Cole ali a URL completa da landing page** do curso:

```js
externalUrl: 'https://pay.hotmart.com/seu-curso',
```

Enquanto estiver `null`, o botão do curso abre o WhatsApp como fallback — nada quebra, mas você perde a conversão da landing.

Também revise em `courses[0]`: nome oficial do curso, subtítulo, carga horária, formato, nível, vagas e a lista "O que você aprende". Os valores atuais são um rascunho.

**Se a landing for interna** (dentro deste site em vez de externa): deixe `externalUrl: null`, preencha `slug: 'nome-do-curso'` e crie a rota `/cursos/:slug` — o `courseLink()` já trata os dois casos.

**Para adicionar um segundo curso:** copie o objeto inteiro dentro de `courses` e ajuste. A página `/cursos` muda de layout sozinha — com 1 curso mostra um card grande em destaque, com 2+ passa para grade de duas colunas.

### 4. Avaliações

As 3 primeiras em `reviews` são reais (marcadas com `verified: true`). As outras 3 são exemplos ilustrativos — **substitua ou remova**. Para puxar automaticamente: Google Places API (`Place Details` → `reviews`) ou widget Elfsight.

### 5. Sobre o número de clientes

O site usa **"milhares de atendimentos"** em vez de uma cifra específica. Essa escolha é deliberada: um número alto e inverificável é fácil de contestar e mina exatamente a credibilidade que o site constrói. Se você tiver um número que sustenta (registros de agenda, sistema, controle próprio), troque em `data/site.js` → `stats` e nos textos de `AboutPreview.jsx` e `Sobre.jsx`.

### 6. Analytics e verificação

Em `index.html`, descomente e preencha: **GA4** (`G-XXXXXXXXXX`), **Meta Pixel** (`SEU_PIXEL_ID`), **Search Console** (meta `google-site-verification`).

### 7. Domínio

Troque `https://www.sandydepil.com.br` em: `data/site.js` → `business.siteUrl`, `index.html` (canonical, og:url, JSON-LD), `public/robots.txt` e `public/sitemap.xml`.

### 8. Dados de contato

- **Google Business** — `business.googleProfile` aponta para uma busca genérica; troque pela URL do perfil
- **Instagram** — confirme se `@sandydepil` está correto
- **E-mail** — `business.email` é um placeholder
- **Coordenadas** — `latitude`/`longitude` no JSON-LD do `index.html` estão aproximadas

### 9. Feed do Instagram

Hoje são imagens estáticas. Para o feed real: Instagram Basic Display API (token protegido em serverless function da Vercel) ou widget pronto — instruções no topo de `InstagramFeed.jsx`.

### 10. Vídeo no hero (opcional)

Coloque `hero.mp4` em `public/videos/` e descomente o bloco `<video>` no `Hero.jsx`, removendo a `<motion.img>`. Mantenha abaixo de ~3 MB.

---

## Deploy na Vercel

```bash
npm i -g vercel
vercel
```

Ou conecte o repositório Git no painel. O `vercel.json` já traz framework, build, headers de cache e o **rewrite de SPA** — sem ele, acessar `/sobre` direto retornaria 404.

---

## SEO

- Meta tags, canonical, Open Graph e Twitter Card definidos por página via `useSeo`
- JSON-LD `BeautySalon` global no `index.html` com nota, avaliações, catálogo de serviços e horários
- JSON-LD `Service` em cada página de procedimento e `Article` em cada post
- Sitemap com todas as 21 URLs; `robots.txt` liberado
- Breadcrumbs em todas as páginas internas

**Uma limitação a considerar:** o site é uma SPA e as meta tags são aplicadas via JavaScript. O Google executa JS e indexa normalmente, mas outros crawlers (incluindo os de prévia de link do WhatsApp e do Facebook) leem apenas o HTML inicial — nesses casos aparece sempre o título e a imagem do `index.html`. Se o compartilhamento em redes for prioridade, vale migrar para pré-renderização estática com `vite-react-ssg` ou `vite-plugin-prerender`.

---

## Performance

Build de produção: ~9,0 kB CSS + ~168 kB JS (gzip), com `framer-motion` e `swiper` em chunks separados. Imagens abaixo da dobra usam `loading="lazy"`.

Para chegar aos 90+ no Lighthouse, o gargalo é o peso das fotos: exporte em **WebP**, largura máxima de 1600 px, qualidade 75–80.

## Sobre o `npm audit`

`npm audit` reporta **2 alertas high** no `react-router` / `react-router-dom` (versão 7.18.1, a mais recente disponível). Vale entender antes de agir:

- O alerta é o [GHSA-qwww-vcr4-c8h2](https://github.com/advisories/GHSA-qwww-vcr4-c8h2) — *RSC Mode CSRF Bypass*. Ele afeta exclusivamente o **modo RSC (React Server Components)** do React Router, que exige servidor, server actions e `matchRSCServerRequest`.
- Este site é uma SPA estática: só `BrowserRouter`, `Routes`, `Link` e `useSearchParams`, sem servidor e sem actions. O código vulnerável nunca é carregado.
- **Não rode `npm audit fix --force`.** Ele faria downgrade para a 7.11.0, que carrega **14 vulnerabilidades mais antigas** — incluindo XSS via open redirect e RCE no turbo-stream, essas sim aplicáveis a uso normal. O remédio seria pior que a doença.
- A versão está **pinada exatamente** (`"react-router-dom": "7.18.1"`, sem `^`) para o estado não mudar sem intenção. Quando a equipe do React Router publicar a correção, atualize o pin.

## Decisões de design mobile

O mobile não é o desktop comprimido — foi modelado separadamente.

- **Barra de ação fixa** (`MobileActionBar`) com Agendar / Ligar / Rota substitui o botão flutuante do WhatsApp em telas pequenas. O rodapé usa `pb-actionbar` para nada ficar escondido atrás dela, e há `env(safe-area-inset-bottom)` para o iPhone com barra de gestos.
- **Menu lateral agrupado** em Serviços / A clínica / Mais, em vez de nove itens em lista corrida.
- **Trilhos com snap** (`.rail` no `index.css`): no celular, grades longas viram scroll horizontal com encaixe; a partir de `md` voltam a ser grade. Aplicado em categorias, resultados e procedimentos relacionados.
- **Slider antes/depois** reescrito com Pointer Events. A versão anterior escutava `touchmove` de forma passiva, então arrastar movia o divisor *e* rolava a página. Agora o punho tem `touch-action: none` e o container `pan-y` — o gesto horizontal é do slider, o vertical continua rolando a página. Tocar em qualquer ponto da imagem também move o divisor.
- **Alvos de toque de 48px** mínimos em todos os botões (`.btn-primary`, `.btn-ghost`).
- **Inputs em 15px** no formulário de contato: abaixo de 16px o Safari do iPhone dá zoom automático ao focar o campo e quebra o layout.
- **Cabeçalho de altura fixa** (`h-header`, 4rem / 5,25rem no desktop). Ele mudava de altura ao rolar, o que deslocava a barra de filtros grudada abaixo dele em `/procedimentos`. Se você alterar a altura, ajuste `height.header` no `tailwind.config.js` — `top-header` usa o mesmo valor.
- **Loading screen de 1,2s** no celular contra 1,9s no desktop.
- **Hero** com texto ancorado na base e gradiente vertical no mobile, à esquerda com gradiente horizontal no desktop.

## O que mudou para o site não parecer template automático

O padrão anterior era uniforme demais: praticamente toda seção era "rótulo + traço + título centralizado com uma palavra em itálico", e havia quatro seções diferentes com a mesma estrutura de ícone circular + título + texto.

- `SectionHeading` agora tem quatro tratamentos (`stack`, `inline`, `centered`, `numbered`) usados de forma alternada, em vez de um só repetido.
- `CredentialsBar` e `Differentials` foram fundidos em **`WhyUs`** — layout assimétrico com argumento à esquerda e lista numerada à direita, sem cards.
- `ExperienceSteps` deixou de ser uma grade de cinco cards e virou lista com trilho vertical; saiu da home para `/sobre`.
- FAQ, indicações, missão/visão/valores e "para quem é" passaram de cards para **listas com divisórias**.
- Os quatro blocos "Quer X? Manda mensagem" no meio das seções foram removidos. O CTA aparece **uma vez por página**, no fim.
- Home reduzida de 13 para 11 seções, com ritmo vertical menor no celular (`.section-y`).

## Acessibilidade

Navegação por teclado no menu, submenu, acordeão de FAQ e slider antes/depois. `aria-label` nos ícones, `aria-expanded` nos acordeões, breadcrumbs com `<nav aria-label>`, contraste conferido nos textos sobre imagem e suporte a `prefers-reduced-motion`.
