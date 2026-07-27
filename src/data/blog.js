/**
 * BLOG / DICAS
 *
 * Conteúdo inicial redigido para dar partida à seção — todos os textos são
 * informativos e genéricos o suficiente para serem verdadeiros, mas você deve
 * revisá-los com a profissional antes de publicar e, idealmente, reescrever na
 * voz da clínica.
 *
 * Para publicar um post novo: copie um objeto, troque slug/título/data/conteúdo.
 * O campo `content` aceita blocos: { type: 'p' | 'h2' | 'ul' | 'quote' }
 */

export const blogPosts = [
  {
    slug: 'como-preparar-a-pele-antes-da-depilacao',
    title: 'Como preparar a pele antes da depilação com cera',
    excerpt:
      'Alguns cuidados simples nos dias anteriores mudam completamente o conforto e o resultado da sessão.',
    date: '2026-06-18',
    readingTime: '4 min',
    category: 'Depilação',
    image: '/images/blog/como-preparar-a-pele-antes-da-depilacao.webp',
    content: [
      {
        type: 'p',
        text: 'A maior parte das queixas sobre depilação com cera — dor excessiva, pelo que não sai, irritação depois — tem origem no que aconteceu antes da sessão, não durante. A preparação é a parte que está sob o seu controle.',
      },
      { type: 'h2', text: 'Deixe o pelo crescer o suficiente' },
      {
        type: 'p',
        text: 'Esse é o ponto mais importante e o mais ignorado. A cera precisa de pelo para aderir. Com menos de 5 milímetros, a remoção fica incompleta e a sessão termina com aquela sensação de "não saiu tudo". O ideal são cerca de 30 dias sem lâmina.',
      },
      { type: 'h2', text: 'Esfolie, mas não no dia' },
      {
        type: 'p',
        text: 'Uma esfoliação suave dois a três dias antes remove as células mortas que aprisionam pelos encravados, facilitando a saída. Fazer isso no mesmo dia, porém, deixa a pele sensibilizada e aumenta o desconforto.',
      },
      { type: 'h2', text: 'Evite no dia da sessão' },
      {
        type: 'ul',
        items: [
          'Hidratante, óleo ou creme na região — atrapalham a aderência da cera',
          'Exposição solar intensa nas 24 horas anteriores',
          'Cafeína em excesso, que aumenta a sensibilidade à dor',
          'Ácidos e retinoides na área nos dias anteriores',
        ],
      },
      { type: 'h2', text: 'Um detalhe sobre o ciclo menstrual' },
      {
        type: 'p',
        text: 'A sensibilidade à dor aumenta nos dias que antecedem a menstruação e durante o fluxo. Se puder escolher a data, agende para a semana seguinte ao término — a diferença é perceptível.',
      },
      {
        type: 'quote',
        text: 'Pele preparada é meio caminho para uma sessão confortável e um resultado que dura.',
      },
      {
        type: 'p',
        text: 'Na dúvida sobre a sua situação específica, mande uma mensagem antes de agendar. Orientar previamente faz parte do atendimento.',
      },
    ],
  },
  {
    slug: 'com-que-frequencia-fazer-limpeza-de-pele',
    title: 'Com que frequência fazer limpeza de pele?',
    excerpt:
      'A resposta honesta é: depende do seu tipo de pele. Mas existem faixas de referência que ajudam a se planejar.',
    date: '2026-05-27',
    readingTime: '5 min',
    category: 'Cuidados faciais',
    image: '/images/blog/com-que-frequencia-fazer-limpeza-de-pele.webp',
    content: [
      {
        type: 'p',
        text: 'Essa é provavelmente a pergunta que mais recebemos. E a resposta que circula na internet — "uma vez por mês" — está certa para algumas pessoas e errada para muitas outras.',
      },
      { type: 'h2', text: 'O que define a frequência' },
      {
        type: 'p',
        text: 'A velocidade com que a sua pele produz sebo e renova as células determina em quanto tempo os poros voltam a se obstruir. Peles oleosas chegam nesse ponto mais rápido; peles secas levam bem mais tempo.',
      },
      {
        type: 'ul',
        items: [
          'Pele oleosa ou acneica: a cada 30 dias',
          'Pele mista: a cada 45 dias',
          'Pele seca ou sensível: a cada 60 a 90 dias',
          'Pele madura: conforme avaliação, geralmente 60 dias',
        ],
      },
      { type: 'h2', text: 'Fazer com frequência excessiva prejudica' },
      {
        type: 'p',
        text: 'Extração é um procedimento invasivo, ainda que controlado. Repetir antes que a pele tenha se recuperado compromete a barreira cutânea, o que gera um efeito perverso: a pele desidratada produz ainda mais oleosidade para se proteger.',
      },
      { type: 'h2', text: 'Sinais de que está na hora' },
      {
        type: 'ul',
        items: [
          'Textura granulada ao passar a mão',
          'Cravos visíveis na zona T',
          'Maquiagem que não assenta como antes',
          'Aspecto opaco mesmo com a rotina de skincare em dia',
        ],
      },
      { type: 'h2', text: 'O home care responde por mais do que você imagina' },
      {
        type: 'p',
        text: 'Uma limpeza de pele bem feita perde valor rapidamente sem manutenção em casa. Limpeza adequada duas vezes ao dia, protetor solar e os ativos indicados para o seu caso são o que espaça o intervalo entre as sessões.',
      },
    ],
  },
  {
    slug: 'drenagem-linfatica-o-que-esperar',
    title: 'Drenagem linfática: o que esperar de verdade',
    excerpt:
      'Entre a promessa de milagre e o ceticismo total existe o que a drenagem realmente faz — e o que ela não faz.',
    date: '2026-04-30',
    readingTime: '5 min',
    category: 'Cuidados corporais',
    image: '/images/blog/drenagem-linfatica-o-que-esperar.webp',
    content: [
      {
        type: 'p',
        text: 'A drenagem linfática é um dos procedimentos mais buscados e também um dos mais mal compreendidos. Vale separar o que é efeito real do que é expectativa criada por publicidade.',
      },
      { type: 'h2', text: 'O que ela faz' },
      {
        type: 'p',
        text: 'A drenagem estimula mecanicamente o sistema linfático a mobilizar o líquido acumulado nos tecidos, direcionando-o para os gânglios onde será filtrado. O resultado é redução de inchaço, alívio da sensação de peso e melhora do conforto corporal.',
      },
      { type: 'h2', text: 'O que ela não faz' },
      {
        type: 'ul',
        items: [
          'Não elimina gordura — o alvo é líquido, não tecido adiposo',
          'Não substitui atividade física',
          'Não produz emagrecimento permanente',
          'Não resolve celulite isoladamente',
        ],
      },
      {
        type: 'p',
        text: 'A redução de medidas que aparece na fita métrica após a sessão é real, mas corresponde ao líquido drenado. Sem mudança de hábitos, o inchaço retorna — e isso não é falha do procedimento, é como o corpo funciona.',
      },
      { type: 'h2', text: 'Por que a pressão é leve' },
      {
        type: 'p',
        text: 'Os vasos linfáticos são superficiais e delicados. Pressão forte os comprime em vez de estimulá-los. Se a sua drenagem dói, ela provavelmente não está sendo uma drenagem.',
      },
      {
        type: 'quote',
        text: 'Massagem que dói não é drenagem linfática. É outra técnica, com outro objetivo.',
      },
      { type: 'h2', text: 'Quando faz mais sentido' },
      {
        type: 'p',
        text: 'Retenção de líquidos recorrente, pernas pesadas ao fim do dia, rotina com muitas horas em pé ou sentada, TPM com inchaço acentuado e pós-operatório com liberação médica. Nesses cenários, a série de sessões traz benefício consistente.',
      },
    ],
  },
  {
    slug: 'protetor-solar-o-passo-que-ninguem-pode-pular',
    title: 'Protetor solar: o passo que ninguém pode pular',
    excerpt:
      'Nenhum protocolo estético entrega o resultado prometido se esse item ficar de fora da rotina.',
    date: '2026-03-22',
    readingTime: '4 min',
    category: 'Cuidados faciais',
    image: '/images/blog/protetor-solar-o-passo-que-ninguem-pode-pular.webp',
    content: [
      {
        type: 'p',
        text: 'Se houvesse apenas um produto para recomendar a alguém que nunca cuidou da pele, seria o protetor solar. Não é o mais sofisticado nem o mais interessante — é o que faz mais diferença ao longo dos anos.',
      },
      { type: 'h2', text: 'Por que ele é decisivo depois de procedimentos' },
      {
        type: 'p',
        text: 'Após limpeza de pele, dermaplaning ou qualquer protocolo de renovação, a pele fica temporariamente mais vulnerável à radiação. Exposição sem proteção nesse período pode gerar exatamente a mancha que o tratamento tentava clarear.',
      },
      { type: 'h2', text: 'Como usar de forma correta' },
      {
        type: 'ul',
        items: [
          'Aplique todas as manhãs, inclusive em dias nublados',
          'Reaplique a cada 3 horas em exposição contínua',
          'Não esqueça orelhas, pescoço, colo e mãos',
          'Use a quantidade suficiente — a maioria das pessoas aplica menos do que o necessário',
        ],
      },
      { type: 'h2', text: 'Vidro de janela não protege' },
      {
        type: 'p',
        text: 'A radiação UVA atravessa o vidro. Se você trabalha perto de uma janela ou passa horas no trânsito, a proteção continua necessária dentro de casa e do carro.',
      },
      {
        type: 'p',
        text: 'Na avaliação indicamos o protetor adequado ao seu tipo de pele — a textura errada é o principal motivo pelo qual as pessoas abandonam o hábito.',
      },
    ],
  },
]

export const findPost = (slug) => blogPosts.find((p) => p.slug === slug)

export const formatDate = (iso) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
