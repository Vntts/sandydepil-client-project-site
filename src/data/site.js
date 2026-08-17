/**
 * FONTE ÚNICA DE VERDADE DO SITE
 * Altere aqui e o conteúdo se propaga para todas as páginas.
 */

export const business = {
  name: 'Sandydepil',
  fullName: 'Sandydepil Depilação e Estética',
  tagline: 'Depilação e Estética',
  foundedYear: 2013,
  yearsOfExperience: new Date().getFullYear() - 2013,
  phone: '(61) 98484-3437',
  phoneRaw: '5561984843437',
  email: 'contato@sandydepil.com.br', // TODO: confirmar e-mail real
  address: {
    street: 'QR 403 Lote D Loja 05',
    city: 'Santa Maria',
    state: 'DF',
    full: 'QR 403 Lote D Loja 05, Santa Maria – DF',
    zip: '72503-244',
  },
  rating: 5.0,
  reviewCount: 36,
  instagram: 'https://www.instagram.com/sandydepil',
  instagramHandle: '@sandydepil',
  // Perfil real do Google Business, via CID extraído do link do Google Maps
  googleProfile: 'https://www.google.com/maps?cid=9257600221229323941',
  // Coordenadas exatas do pino no Google Maps (mais confiável que buscar pelo texto do endereço)
  mapsEmbed: 'https://www.google.com/maps?q=-16.0366591,-48.0269644&z=17&output=embed',
  mapsDirections: 'https://www.google.com/maps/dir/?api=1&destination=-16.0366591,-48.0269644',
  hours: [
    { day: 'Segunda a Sexta', time: '09h às 19h' },
    { day: 'Sábado', time: '09h às 17h' },
    { day: 'Domingo', time: 'Fechado' },
  ],
  siteUrl: 'https://www.sandydepil.com.br', // TODO: trocar pelo domínio real
}

/** Mensagem padrão do WhatsApp */
export const whatsappMessage =
  'Olá! Vim pelo site da Sandydepil e gostaria de agendar um atendimento. 💗'

export const whatsappLink = (message = whatsappMessage) =>
  `https://wa.me/${business.phoneRaw}?text=${encodeURIComponent(message)}`

/* ------------------------------------------------------------------ */
/* NAVEGAÇÃO                                                           */
/* ------------------------------------------------------------------ */

export const navLinks = [
  { label: 'Início', to: '/' },
  {
    label: 'Sobre',
    to: '/sobre',
    children: [
      { label: 'Nossa história', to: '/sobre' },
      { label: 'Depoimentos', to: '/depoimentos' },
      { label: 'Dicas', to: '/blog' },
    ],
  },
  {
    label: 'Procedimentos',
    to: '/procedimentos',
    children: [
      { label: 'Todos os procedimentos', to: '/procedimentos' },
      { label: 'Faciais', to: '/procedimentos?categoria=faciais' },
      { label: 'Corporais', to: '/procedimentos?categoria=corporais' },
      { label: 'Tratamentos especiais', to: '/procedimentos?categoria=especiais' },
    ],
  },
  { label: 'Cursos', to: '/cursos' },
  { label: 'Resultados', to: '/resultados' },
  { label: 'Contato', to: '/contato' },
]

/* ------------------------------------------------------------------ */
/* NÚMEROS E CREDENCIAIS                                               */
/* ------------------------------------------------------------------ */

/**
 * Estatísticas da home.
 *
 * `icon`      nome de um ícone mapeado em src/components/Stats.jsx
 * `value`     número animado por contador
 * `separator` separador de milhar (use '.' para o padrão brasileiro)
 * `text`      alternativa a `value` para exibir texto sem contador
 *
 * TODO: 5.000 atendimentos é uma estimativa — dá cerca de 385 por ano, ou
 * pouco mais de um por dia útil desde 2013, então é um número defensável.
 * Se a agenda ou o sistema permitir chegar ao total real, vale trocar.
 */
export const stats = [
  {
    icon: 'Award',
    value: business.yearsOfExperience,
    suffix: '+',
    label: 'Anos de experiência',
  },
  {
    icon: 'Star',
    value: 5.0,
    decimals: 1,
    label: 'No Google',
  },
  {
    icon: 'Quote',
    value: business.reviewCount,
    suffix: '+',
    label: 'Avaliações',
  },
  {
    icon: 'Flower2',
    value: 5000,
    suffix: '+',
    separator: '.',
    label: 'Atendimentos',
  },
]

export const credentials = [
  { icon: 'Award', label: `Desde ${business.foundedYear}`, detail: 'Mais de uma década em Santa Maria – DF' },
  { icon: 'Star', label: 'Nota 5,0 no Google', detail: `${business.reviewCount} avaliações verificadas` },
  { icon: 'ShieldCheck', label: 'Protocolos de higiene', detail: 'Material esterilizado e descartável' },
  { icon: 'Gem', label: 'Produtos profissionais', detail: 'Marcas de uso exclusivo em clínica' },
]

/* ------------------------------------------------------------------ */
/* LINHA DO TEMPO                                                      */
/* ------------------------------------------------------------------ */

/** Marcos reais da trajetória da fundadora e da clínica. */
export const timeline = [
  {
    year: '2011',
    title: 'Antes de tudo',
    text: 'Trabalho com depilação como funcionária CLT — e começo a enxergar que poderia construir algo meu.',
  },
  {
    year: '2013',
    title: 'Nasce a Sandydepil',
    text: 'Com coragem, determinação e muita vontade de aprender, abro as portas do meu próprio negócio em Santa Maria, no Distrito Federal.',
  },
  {
    year: '2017',
    title: 'Graduação em Estética',
    text: 'Concluo minha graduação em Embelezamento e Estética, ampliando técnicas, serviços e conhecimento.',
  },
  {
    year: `${new Date().getFullYear()}`,
    title: `${business.yearsOfExperience} anos de história`,
    text: 'Um espaço onde beleza, cuidado e autoestima caminham juntos — e essa história ainda está sendo escrita.',
  },
]

/* ------------------------------------------------------------------ */
/* A PROFISSIONAL                                                      */
/* ------------------------------------------------------------------ */

/**
 * TODO: preencha com os dados reais da profissional.
 * Nome, formação e certificações são o que mais pesa na percepção de autoridade.
 */
export const professional = {
  name: 'Sandra Ventura',
  role: 'Esteticista responsável · Fundadora',
  photo: '/Especialista-sandra-ventura.webp',
  bio: [
    `Fundou a Sandydepil em ${business.foundedYear}, com pouco mais que uma maca, formação técnica e a convicção de que estética séria se faz com escuta antes da técnica.`,
    `Mais de ${business.yearsOfExperience} anos depois, segue atendendo pessoalmente e acompanhando cada protocolo do começo ao fim — é essa continuidade que permite ajustar o tratamento à resposta real da pele de cada cliente.`,
    'Mantém formação continuada em procedimentos faciais e corporais, acompanhando o que há de novo sem abandonar o que já provou funcionar.',
  ],
  credentials: [
    'Graduação em Estética e Cosmética', // TODO: confirmar
    'Especialização em protocolos faciais', // TODO: confirmar
    'Capacitação em drenagem linfática e terapias corporais', // TODO: confirmar
    'Atualização contínua em produtos e técnicas profissionais',
  ],
  quote: 'Antes de qualquer procedimento vem a escuta. É isso que define o resultado.',
}

/* ------------------------------------------------------------------ */
/* PROCEDIMENTOS                                                       */
/* ------------------------------------------------------------------ */

export const procedureCategories = [
  {
    id: 'faciais',
    label: 'Procedimentos Faciais',
    short: 'Faciais',
    description:
      'Cuidados que devolvem luminosidade, uniformidade e frescor ao rosto, sempre respeitando a sua pele.',
  },
  {
    id: 'corporais',
    label: 'Procedimentos Corporais',
    short: 'Corporais',
    description:
      'Técnicas profissionais para pele lisa, corpo leve e a sensação de bem-estar que você merece.',
  },
  {
    id: 'especiais',
    label: 'Tratamentos Especiais',
    short: 'Especiais',
    description: 'Detalhes que fazem diferença — porque cuidado completo também está nas mãos.',
  },
]

/**
 * Cada procedimento tem página própria em /procedimentos/:slug
 * TODO: revise duração, indicação e cuidados com a profissional antes de publicar.
 */
export const procedures = [
  {
    slug: 'limpeza-de-pele',
    category: 'faciais',
    name: 'Limpeza de Pele Profissional Completa',
    shortName: 'Limpeza de Pele',
    summary: 'Higienização profunda com extração cuidadosa e renovação da pele.',
    image: '/images/procedimentos/limpeza-de-pele.webp',
    duration: '60 a 90 minutos',
    sessions: 'Manutenção a cada 30 a 45 dias',
    benefits: ['Extração profunda', 'Higienização completa', 'Renovação da pele'],
    description: [
      'A limpeza de pele profissional vai muito além de lavar o rosto. É um protocolo em etapas — higienização, esfoliação, emoliência, extração, alta frequência e máscara final — pensado para desobstruir os poros sem agredir a barreira cutânea.',
      'Cada etapa é ajustada ao seu tipo de pele. Peles oleosas e com tendência acneica pedem uma abordagem diferente de peles secas ou sensíveis, e é essa leitura inicial que define o protocolo.',
    ],
    indications: [
      'Cravos e poros obstruídos',
      'Oleosidade excessiva',
      'Pele com textura irregular',
      'Preparação da pele para outros tratamentos',
    ],
    aftercare: [
      'Evite exposição solar direta nas primeiras 48 horas',
      'Use protetor solar diariamente',
      'Não manipule a pele nem use ácidos por 3 dias',
      'Mantenha a hidratação recomendada',
    ],
  },
  {
    slug: 'rejuvenescimento-facial',
    category: 'faciais',
    name: 'Rejuvenescimento Facial',
    shortName: 'Rejuvenescimento Facial',
    summary: 'Protocolo para clarear manchas e recuperar a luminosidade natural.',
    image: '/images/procedimentos/rejuvenescimento-facial.webp',
    duration: '60 minutos',
    sessions: 'Protocolo em série, conforme avaliação',
    benefits: ['Clareamento de manchas', 'Uniformização da pele', 'Recuperação da luminosidade'],
    description: [
      'O protocolo de rejuvenescimento trabalha a renovação celular com ativos específicos para uniformizar o tom da pele, atenuar manchas e devolver o brilho que o tempo e o sol vão apagando.',
      'Os resultados são progressivos e cumulativos: cada sessão constrói sobre a anterior. Por isso o protocolo é planejado em série, com intervalos definidos de acordo com a resposta da sua pele.',
    ],
    indications: [
      'Manchas e melasma',
      'Tom de pele irregular',
      'Perda de luminosidade',
      'Linhas finas de expressão',
    ],
    aftercare: [
      'Protetor solar é obrigatório — sem exceção',
      'Evite exposição solar prolongada durante o protocolo',
      'Siga o home care indicado; ele responde por boa parte do resultado',
      'Comunique qualquer sensibilidade fora do esperado',
    ],
  },
  {
    slug: 'dermaplaning',
    category: 'faciais',
    name: 'Dermaplaning',
    shortName: 'Dermaplaning',
    summary: 'Esfoliação física que deixa a pele visivelmente mais lisa e uniforme.',
    image: '/images/procedimentos/dermaplaning.webp',
    duration: '40 minutos',
    sessions: 'A cada 30 dias',
    benefits: ['Remoção de células mortas', 'Remoção de pelos finos', 'Pele mais uniforme'],
    description: [
      'O dermaplaning é uma esfoliação física realizada com lâmina estéril em movimentos precisos, removendo as células mortas da camada mais superficial da pele junto com os pelos finos (a chamada penugem).',
      'O efeito é imediato: a pele fica visivelmente mais lisa, a maquiagem assenta melhor e os produtos de skincare penetram com mais eficiência. Não estimula o crescimento de pelos — esse é um mito comum.',
    ],
    indications: [
      'Pele com aspecto opaco',
      'Textura áspera ao toque',
      'Penugem facial aparente',
      'Preparação da pele antes de eventos',
    ],
    aftercare: [
      'Protetor solar nas 72 horas seguintes, no mínimo',
      'Evite ácidos e esfoliantes por 5 dias',
      'Hidrate bem a pele',
      'Não faça depilação facial na mesma semana',
    ],
  },
  {
    slug: 'design-de-sobrancelhas',
    category: 'faciais',
    name: 'Design de Sobrancelhas',
    shortName: 'Design de Sobrancelhas',
    summary: 'Desenho personalizado que valoriza o formato natural do seu olhar.',
    image: '/images/procedimentos/design-de-sobrancelhas.webp',
    duration: '30 a 50 minutos',
    sessions: 'Manutenção a cada 20 a 30 dias',
    benefits: ['Henna', 'Linha', 'Cera', 'Pinça'],
    description: [
      'O design começa com a leitura do seu rosto: proporção, formato dos olhos, altura do arco natural. Só depois vem a técnica — linha, cera, pinça ou a combinação delas, conforme a espessura e a sensibilidade da sua pele.',
      'A henna entra quando há falhas a disfarçar ou quando se busca um resultado mais marcado, com duração de 8 a 15 dias na pele e mais tempo nos fios.',
    ],
    indications: [
      'Sobrancelhas sem definição',
      'Falhas e assimetrias',
      'Desejo de um olhar mais harmônico',
      'Correção de designs anteriores mal executados',
    ],
    aftercare: [
      'Evite molhar a região por 12 horas (quando houver henna)',
      'Não use esfoliantes na área por 3 dias',
      'Evite sauna e piscina nas primeiras 24 horas',
      'Não use pinça entre as manutenções',
    ],
  },
  {
    slug: 'epilacao-com-cera',
    category: 'corporais',
    name: 'Epilação com Cera',
    shortName: 'Epilação com Cera',
    summary: 'Método profissional com foco em conforto, segurança e pele lisa na hora.',
    image: '/images/procedimentos/Procedimento-corporal.webp',
    duration: '15 a 60 minutos, conforme a região',
    sessions: 'A cada 25 a 30 dias',
    benefits: ['Método profissional', 'Pele lisa imediatamente', 'Conforto e segurança'],
    description: [
      'A epilação com cera remove o pelo desde a raiz, o que garante pele lisa por muito mais tempo do que a lâmina. A técnica correta faz toda a diferença: temperatura adequada, direção certa da remoção e produto compatível com a sensibilidade de cada região.',
      'Trabalhamos com material descartável e protocolos rigorosos de higiene. Nenhum aplicador retorna ao pote de cera — regra sem exceção.',
    ],
    indications: [
      'Todas as regiões do corpo e do rosto',
      'Quem busca intervalos maiores entre depilações',
      'Peles irritadas pelo uso frequente de lâmina',
      'Redução progressiva da espessura do pelo',
    ],
    aftercare: [
      'Evite sol, sauna e piscina por 24 horas',
      'Não use desodorante na região nas primeiras horas (axilas)',
      'Esfolie levemente a partir do terceiro dia para prevenir foliculite',
      'Hidrate a pele diariamente',
    ],
  },
  {
    slug: 'drenagem-linfatica',
    category: 'corporais',
    name: 'Drenagem Linfática',
    shortName: 'Drenagem Linfática',
    summary: 'Manobras suaves que combatem a retenção de líquidos e a sensação de peso.',
    image: '/images/procedimentos/Procedimento-corporal.webp',
    duration: '50 a 60 minutos',
    sessions: 'Séries de 10 sessões, 1 a 2 por semana',
    benefits: ['Redução de retenção de líquidos', 'Bem-estar corporal'],
    description: [
      'A drenagem linfática é uma massagem de pressão leve e ritmo lento que estimula o sistema linfático a eliminar o excesso de líquido acumulado nos tecidos. Não é uma massagem forte — e não deveria ser.',
      'É especialmente indicada para quem sente pernas pesadas ao fim do dia, inchaço recorrente ou está em recuperação de procedimentos. O resultado aparece de forma mais consistente quando feita em série.',
    ],
    indications: [
      'Retenção de líquidos e inchaço',
      'Sensação de pernas pesadas',
      'Pós-operatório (com liberação médica)',
      'Rotina com muitas horas em pé ou sentada',
    ],
    aftercare: [
      'Beba bastante água nas horas seguintes',
      'Evite refeições muito salgadas no dia',
      'Caminhadas leves potencializam o efeito',
      'Mantenha a regularidade das sessões',
    ],
  },
  {
    slug: 'massagem-redutora',
    category: 'corporais',
    name: 'Massagem Redutora de Medidas',
    shortName: 'Massagem Redutora',
    summary: 'Modelagem corporal com pressão firme para auxiliar no contorno do corpo.',
    image: '/images/procedimentos/Procedimento-corporal.webp',
    duration: '50 a 60 minutos',
    sessions: 'Séries de 10 sessões, 2 por semana',
    benefits: ['Modelagem corporal', 'Auxílio estético'],
    description: [
      'A massagem redutora usa manobras firmes e movimentos de amassamento para mobilizar a gordura localizada e melhorar o contorno corporal, trabalhando também a circulação da região.',
      'É importante ser direta: massagem não substitui alimentação equilibrada nem atividade física. Ela funciona como um auxílio dentro de um contexto — e é assim que apresentamos o tratamento a cada cliente.',
    ],
    indications: [
      'Gordura localizada',
      'Contorno corporal irregular',
      'Complemento a rotina de exercícios',
      'Aspecto de celulite',
    ],
    aftercare: [
      'Hidratação abundante após a sessão',
      'Evite jejum prolongado antes do atendimento',
      'Associe a atividade física para melhores resultados',
      'Pequenos hematomas podem ocorrer e regridem em dias',
    ],
  },
  {
    slug: 'ventosaterapia',
    category: 'corporais',
    name: 'Ventosaterapia',
    shortName: 'Ventosaterapia',
    summary: 'Terapia de sucção que relaxa a musculatura e estimula a circulação.',
    image: '/images/procedimentos/Procedimento-corporal.webp',
    duration: '40 minutos',
    sessions: 'Semanal ou conforme avaliação',
    benefits: ['Relaxamento muscular', 'Melhora da circulação'],
    description: [
      'A ventosaterapia utiliza copos que criam pressão negativa sobre a pele, descolando suavemente os tecidos e aumentando o fluxo sanguíneo local. A sensação é de um alongamento profundo da musculatura.',
      'As marcas circulares avermelhadas são esperadas e fazem parte do processo — indicam a estagnação que estava presente na região. Regridem em poucos dias.',
    ],
    indications: [
      'Tensão muscular nas costas e ombros',
      'Circulação local comprometida',
      'Rotina de estresse físico',
      'Complemento a tratamentos corporais',
    ],
    aftercare: [
      'Evite sol direto sobre as marcas',
      'Não faça esforço físico intenso no mesmo dia',
      'Hidrate-se bem',
      'As marcas somem naturalmente em 3 a 7 dias',
    ],
  },
  {
    slug: 'harmonizacao-de-maos',
    category: 'especiais',
    name: 'Harmonização de Mãos',
    shortName: 'Harmonização de Mãos',
    summary: 'Protocolo de rejuvenescimento e hidratação profunda para as mãos.',
    image: '/images/procedimentos/Procedimentos-especiais.webp',
    duration: '45 minutos',
    sessions: 'Mensal',
    benefits: ['Rejuvenescimento', 'Hidratação', 'Cuidados específicos'],
    description: [
      'As mãos são uma das primeiras regiões a mostrar o tempo — e uma das mais esquecidas nos cuidados. O protocolo combina esfoliação, ativos clareadores e hidratação profunda com oclusão para devolver maciez e uniformidade.',
      'É um atendimento que costuma surpreender: a diferença ao toque é perceptível já na primeira sessão.',
    ],
    indications: [
      'Mãos ressecadas e áspera ao toque',
      'Manchas causadas pelo sol',
      'Pele fina com aspecto envelhecido',
      'Cuidado preventivo',
    ],
    aftercare: [
      'Use protetor solar nas mãos — é o cuidado mais negligenciado',
      'Hidratante sempre após lavar as mãos',
      'Use luvas em produtos de limpeza',
      'Mantenha a regularidade mensal',
    ],
  },
]

export const proceduresByCategory = (categoryId) =>
  procedures.filter((p) => p.category === categoryId)

export const findProcedure = (slug) => procedures.find((p) => p.slug === slug)

/* ------------------------------------------------------------------ */
/* CURSOS                                                             */
/* ------------------------------------------------------------------ */

/**
 * CURSOS MINISTRADOS PELA SANDY
 *
 * Cada curso é um card em /cursos. Ao clicar, o visitante vai para a landing
 * page própria do curso.
 *
 * ⚠️ COMO APONTAR PARA A LANDING PAGE — dois modos:
 *
 * 1) LANDING EXTERNA (Hotmart, Kiwify, Eduzz, etc.)
 *    Preencha `externalUrl` com o link completo. O card abre em nova aba.
 *
 * 2) LANDING DENTRO DO SITE (o caso do curso abaixo)
 *    Deixe `externalUrl` como null e preencha `slug`. O card aponta para
 *    /cursos/:slug — a rota e a página precisam existir em App.jsx.
 *
 * PARA ADICIONAR UM SEGUNDO CURSO: copie o objeto inteiro e ajuste os campos.
 * A página /cursos se adapta sozinha à quantidade (1, 2, 3+ cursos).
 */
export const courses = [
  {
    id: 'curso-dermaplaning',
    // Landing interna: vive dentro do próprio site, em /cursos/dermaplaning
    // (src/pages/CursoDermaplaning.jsx), portada do projeto solto que existia
    // em "Sandydepil.com.br".
    externalUrl: null,
    slug: 'dermaplaning',

    name: 'Curso de Dermaplaning',
    subtitle: 'Domine a técnica que transforma a pele',

    summary:
      'Curso completo e prático de Dermaplaning para quem quer começar do zero na estética: técnica, materiais e como conquistar as primeiras clientes.',
    image: '/images/cursos/dermaplaning/hero.webp',
    format: 'Curso online, acesso vitalício',
    duration: 'Mais de 40 aulas em módulos progressivos',
    level: 'Iniciante — não exige experiência',
    vacancies: 'Turmas com vagas limitadas',
    certificate: true,

    highlights: [
      'Fundamentos da pele: anatomia, indicações e contraindicações',
      'Guia de materiais e produtos, sem equipamentos caros',
      'Técnica de Dermaplaning passo a passo',
      'Aula prática em modelo real',
      'Protocolo premium para valorizar o atendimento',
      'Como conquistar as primeiras clientes',
    ],

    forWho: [
      'Quem quer começar do zero na estética',
      'Profissionais de beleza que desejam ampliar os serviços',
      'Quem busca uma fonte de renda extra sem grande investimento inicial',
      'Quem já atua na área e quer dominar a técnica de Dermaplaning',
    ],

    // A autoridade de quem ensina é o principal argumento de venda
    authorityNote: `Ministrado por quem atua na área desde ${business.foundedYear} — mais de ${business.yearsOfExperience} anos de prática diária em clínica própria, não apenas teoria.`,
  },
]

export const findCourse = (id) => courses.find((c) => c.id === id)

/** Resolve o destino do card do curso, com fallback seguro. */
export const courseLink = (course) => {
  if (course.externalUrl) return { href: course.externalUrl, external: true }
  if (course.slug) return { to: `/cursos/${course.slug}`, external: false }
  return {
    href: whatsappLink(`Olá! Gostaria de informações sobre o curso: ${course.name}. 💗`),
    external: true,
    isFallback: true,
  }
}

/* ------------------------------------------------------------------ */
/* DIFERENCIAIS                                                        */
/* ------------------------------------------------------------------ */

export const differentials = [
  {
    icon: 'HeartHandshake',
    title: 'Atendimento Humanizado',
    text: 'Cada cliente recebe atenção individualizada, do primeiro contato ao pós-procedimento.',
  },
  {
    icon: 'Sparkles',
    title: 'Atendimento Personalizado',
    text: 'Tratamentos adaptados às necessidades, à pele e à rotina de cada pessoa.',
  },
  {
    icon: 'Award',
    title: `Mais de ${business.yearsOfExperience} Anos de Experiência`,
    text: `Atuação contínua no Distrito Federal desde ${business.foundedYear}, com técnica refinada ao longo do tempo.`,
  },
  {
    icon: 'ShieldCheck',
    title: 'Ambiente Seguro',
    text: 'Higiene rigorosa, conforto e total privacidade durante todo o atendimento.',
  },
  {
    icon: 'Leaf',
    title: 'Resultados Naturais',
    text: 'Foco em beleza real e saudável, valorizando o que você já tem de mais bonito.',
  },
  {
    icon: 'Crown',
    title: 'Você em Primeiro Lugar',
    text: 'Sua satisfação e bem-estar orientam cada decisão dentro da clínica.',
  },
]

/* ------------------------------------------------------------------ */
/* EXPERIÊNCIA DA VISITA                                               */
/* ------------------------------------------------------------------ */

export const experienceSteps = [
  {
    step: '01',
    title: 'Primeiro contato',
    text: 'Você manda uma mensagem, conta o que procura e recebe orientação antes mesmo de agendar.',
  },
  {
    step: '02',
    title: 'Avaliação',
    text: 'Na clínica, conversamos sobre histórico, sensibilidades e objetivos. O protocolo nasce daí.',
  },
  {
    step: '03',
    title: 'Procedimento',
    text: 'Ambiente reservado, material esterilizado e explicação de cada etapa enquanto ela acontece.',
  },
  {
    step: '04',
    title: 'Cuidados em casa',
    text: 'Você sai com orientações claras do que fazer e do que evitar — o resultado depende disso.',
  },
  {
    step: '05',
    title: 'Acompanhamento',
    text: 'Retorno para avaliar a resposta da pele e ajustar o que for necessário na próxima sessão.',
  },
]

/* ------------------------------------------------------------------ */
/* AVALIAÇÕES                                                          */
/* ------------------------------------------------------------------ */

/**
 * As 3 primeiras são avaliações reais do Google.
 * TODO: as demais são exemplos ilustrativos — substitua por avaliações reais
 * ou remova. Para puxar automaticamente: Google Places API (Place Details → reviews).
 */
export const reviews = [
  {
    name: 'Cliente Google',
    rating: 5,
    text: 'Gostei muito da experiência, ótima no que faz, amei o resultado.',
    service: 'Estética facial',
    verified: true,
  },
  {
    name: 'Cliente Google',
    rating: 5,
    text: 'Serviço rápido, atenciosa e explicativa.',
    service: 'Depilação',
    verified: true,
  },
  {
    name: 'Cliente Google',
    rating: 5,
    text: 'Uma boa opção, recomendo.',
    service: 'Atendimento geral',
    verified: true,
  },
  {
    name: 'Cliente Google',
    rating: 5,
    text: 'Ambiente acolhedor e profissional dedicada. Saí me sentindo muito bem cuidada.',
    service: 'Limpeza de pele',
    verified: false,
  },
  {
    name: 'Cliente Google',
    rating: 5,
    text: 'Atendimento impecável do início ao fim. Já virei cliente fiel.',
    service: 'Design de sobrancelhas',
    verified: false,
  },
  {
    name: 'Cliente Google',
    rating: 5,
    text: 'Explicou cada etapa do procedimento e o resultado ficou exatamente como combinado.',
    service: 'Drenagem linfática',
    verified: false,
  },
]

/* ------------------------------------------------------------------ */
/* RESULTADOS (ANTES E DEPOIS)                                         */
/* ------------------------------------------------------------------ */

/**
 * TODO: troque as URLs por fotos reais e autorizadas em /public/images/resultados/
 * Regra de ouro: mesmo enquadramento, mesma iluminação, mesma distância nas duas fotos.
 */
export const results = [
  {
    title: 'Limpeza de Pele Profissional',
    procedure: 'limpeza-de-pele',
    description: 'Redução de cravos e pele visivelmente mais uniforme após o protocolo completo.',
    before: 'https://images.unsplash.com/photo-1614859324967-bdf413c35a55?auto=format&fit=crop&w=1000&q=80',
    after: 'https://images.unsplash.com/photo-1620065692460-4a2e5c9f4d4c?auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'Design de Sobrancelhas com Henna',
    procedure: 'design-de-sobrancelhas',
    description: 'Simetria e preenchimento respeitando o formato natural do rosto.',
    before: 'https://images.unsplash.com/photo-1583001809873-a128495da465?auto=format&fit=crop&w=1000&q=80',
    after: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'Drenagem Linfática Corporal',
    procedure: 'drenagem-linfatica',
    description: 'Menos retenção de líquidos e sensação imediata de leveza.',
    before: 'https://images.unsplash.com/photo-1611073615830-9f76e0b6cbd7?auto=format&fit=crop&w=1000&q=80',
    after: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'Rejuvenescimento Facial',
    procedure: 'rejuvenescimento-facial',
    description: 'Clareamento progressivo de manchas ao longo do protocolo em série.',
    before: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
    after: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'Dermaplaning',
    procedure: 'dermaplaning',
    description: 'Textura mais lisa e pele com aspecto imediatamente mais luminoso.',
    before: 'https://images.unsplash.com/photo-1595475207225-428b62bda831?auto=format&fit=crop&w=1000&q=80',
    after: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'Harmonização de Mãos',
    procedure: 'harmonizacao-de-maos',
    description: 'Hidratação profunda e uniformização do tom da pele das mãos.',
    before: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=1000&q=80',
    after: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=1000&q=80',
  },
]

/* ------------------------------------------------------------------ */
/* INSTAGRAM                                                           */
/* ------------------------------------------------------------------ */

/**
 * TODO: para o feed real, use a Instagram Basic Display API com token de longa
 * duração (protegido em serverless function) ou um widget (Elfsight / Behold.so).
 */
export const instagramPosts = [
  { image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80', caption: 'Limpeza de pele completa' },
  { image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=600&q=80', caption: 'Design de sobrancelhas' },
  { image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=600&q=80', caption: 'Drenagem linfática' },
  { image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=600&q=80', caption: 'Dermaplaning' },
  { image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=600&q=80', caption: 'Harmonização de mãos' },
  { image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80', caption: 'Cosméticos selecionados' },
]

/* ------------------------------------------------------------------ */
/* PERGUNTAS FREQUENTES                                                */
/* ------------------------------------------------------------------ */

export const faqs = [
  {
    q: 'Preciso agendar com antecedência?',
    a: 'Sim, o atendimento é feito exclusivamente por agendamento. Isso garante que cada cliente tenha o tempo necessário sem pressa e sem espera na recepção.',
  },
  {
    q: 'Qual a diferença entre limpeza de pele e dermaplaning?',
    a: 'A limpeza de pele desobstrui os poros com extração; o dermaplaning é uma esfoliação de superfície que remove células mortas e penugem. São complementares — muitas clientes fazem os dois em momentos diferentes.',
  },
  {
    q: 'A depilação com cera dói muito?',
    a: 'Há desconforto, especialmente nas primeiras sessões e em regiões mais sensíveis. A técnica correta, a temperatura adequada da cera e a experiência da profissional reduzem bastante essa sensação. Com a continuidade, o pelo afina e o incômodo diminui.',
  },
  {
    q: 'Quantas sessões preciso para ver resultado?',
    a: 'Depende do procedimento. Dermaplaning e limpeza de pele mostram efeito imediato. Protocolos de clareamento, drenagem e massagem redutora são cumulativos e trabalham em séries — definidas na avaliação.',
  },
  {
    q: 'Atendem homens?',
    a: 'Sim. Vários procedimentos faciais, corporais e de depilação são realizados em clientes homens.',
  },
  {
    q: 'Posso fazer procedimentos estando grávida?',
    a: 'Alguns sim, outros não. É essencial informar a gestação no agendamento para que o protocolo seja avaliado — e em certos casos pedimos liberação do seu médico.',
  },
  {
    q: 'Vocês vendem os produtos usados nos atendimentos?',
    a: 'Sim, trabalhamos com uma linha selecionada de cosméticos para manutenção em casa. A indicação é sempre feita conforme o seu tipo de pele, nunca de forma genérica.',
  },
  {
    q: 'Quais formas de pagamento são aceitas?',
    a: 'Consulte as condições no momento do agendamento pelo WhatsApp.', // TODO: listar formas reais
  },
]
