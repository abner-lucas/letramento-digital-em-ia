export interface QuizQuestion {
  id: string;
  question: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  explanation: string;
}

export interface GlossaryItem {
  term: string;
  definition: string;
}

export interface LessonSection {
  id: string;
  title: string;
  subtitle?: string;
  tag?: string;
  content: string[];
  analogy?: {
    title: string;
    description: string;
  };
  highlight?: string;
  table?: {
    headers: string[];
    rows: string[][];
  };
  tips?: string[];
  codeOrPrompt?: {
    type: 'prompt' | 'comparison' | 'system';
    title: string;
    badExample?: string;
    goodExample?: string;
    explanation?: string;
    raw?: string;
  };
}

export interface CourseModule {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  hours: number;
  badge: string;
  color: {
    primary: string;
    accent: string;
    light: string;
    border: string;
  };
  keyTopics: string[];
  sections: LessonSection[];
  quiz: QuizQuestion[];
  glossary: GlossaryItem[];
  practicalMission: {
    title: string;
    steps: string[];
    quote: string;
  };
}

export interface AITool {
  id: string;
  name: string;
  nickname: string;
  company: string;
  link: string;
  freeLimit: string;
  freeLimitDetails: string;
  strongPoint: string;
  bestFor: string;
  limitation: string;
  amazonMetaphor: string;
  pros: string[];
  cons: string[];
  modelFree: string;
}

export const COURSE_INFO = {
  title: "Curso Letramento Digital em Inteligência Artificial (IA)",
  shortTitle: "Letramento Digital em IA",
  edition: "Belém do Pará · 2026",
  author: "Prof. Dr. Bruno Duarte Gomes",
  institution: "iSACI / SIMBIC – CCAD – UFPA",
  promoters: [
    { name: "Governo do Pará", role: "Apoio Governamental" },
    { name: "PRODEPA", role: "Empresa de Tecnologia da Informação do Estado do Pará" },
    { name: "iSACI", role: "Instituto Sustentabilidade da Amazônia com Ciência e Inovação" },
    { name: "IFPA", role: "Instituto Federal do Pará" }
  ],
  locations: "Turmas dos bairros do Guamá, Terra Firme e região metropolitana de Belém",
  stats: [
    { value: "4", label: "Módulos Integrados", context: "Da teoria básica à banca final" },
    { value: "16h", label: "Carga Horária Total", context: "Aulas práticas no celular" },
    { value: "6", label: "IAs Gratuitas Analisadas", context: "Sem gastar nenhum centavo" },
    { value: "100%", label: "Foco Comunitário", context: "Soluções reais para bairros de Belém" }
  ],
  goldenRules: [
    {
      num: 1,
      title: "Confira sempre",
      desc: "A IA erra e alucina. Nunca entregue um trabalho ou tome decisão importante sem conferir em fontes oficiais."
    },
    {
      num: 2,
      title: "Assuma a autoria com honestidade",
      desc: "Usar a IA para aprender e destravar ideias é ótimo. Copiar e colar sem entender nada é desonesto e mata seu aprendizado."
    },
    {
      num: 3,
      title: "Proteja seus dados pessoais",
      desc: "Nunca compartilhe senhas, CPF, endereço ou dados de terceiros com nenhum assistente de IA."
    },
    {
      num: 4,
      title: "Respeite as pessoas e sua comunidade",
      desc: "Não use a IA para difamar, enganar, propagar desinformação ou reforçar preconceitos velados."
    }
  ]
};

export const AI_TOOLS_DATA: AITool[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    nickname: "O Pioneiro Generalista",
    company: "OpenAI",
    link: "https://chat.openai.com",
    freeLimit: "~10 msgs / 5h no modelo topo",
    freeLimitDetails: "Cota restrita de mensagens no modelo avançado antes de rebaixar automaticamente para versão mais rápida e leve.",
    strongPoint: "Versatilidade e geração de imagens",
    bestFor: "Tarefas variadas do dia a dia, redações e ideias visuais",
    limitation: "Teto baixo de mensagens para sessões longas de pesquisa.",
    amazonMetaphor: "Como uma barraca muito completa na feira do Ver-o-Peso, mas que atende um número limitado de clientes no balcão principal antes de passar pro ajudante.",
    pros: ["Excelente escrita geral", "Gera imagens simples de graça", "Análise de arquivos no gratuito"],
    cons: ["Rebaixamento rápido de modelo", "Limite rigoroso em horários de pico"],
    modelFree: "GPT-4o mini / versão mista"
  },
  {
    id: "gemini",
    name: "Gemini",
    nickname: "O Parceiro do Ecossistema",
    company: "Google",
    link: "https://gemini.google.com",
    freeLimit: "Amplo volume no Flash",
    freeLimitDetails: "Uso generoso e contínuo nos modelos Flash e Flash-Lite. Modelo Pro reservado para assinantes.",
    strongPoint: "Integração com Google Docs e Drive",
    bestFor: "Quem já vive no ecossistema Google e precisa de velocidade",
    limitation: "Modelo Pro mais profundo não é gratuito.",
    amazonMetaphor: "Como aquele vizinho prestativo que já tem as ferramentas que você precisa no quintal e ajuda rápido porque conhece o ambiente.",
    pros: ["Acesso direto ao Google Drive e Docs", "Volume de mensagens muito confortável", "Velocidade ultrarrápida"],
    cons: ["Modelo Pro requer plano pago", "Menos reflexivo que o Claude em redações longas"],
    modelFree: "Gemini 2.5/3.5 Flash e Flash-Lite"
  },
  {
    id: "claude",
    name: "Claude",
    nickname: "O Escritor Cuidadoso",
    company: "Anthropic",
    link: "https://claude.ai",
    freeLimit: "~15 a 40 msgs / 5h",
    freeLimitDetails: "Cota estrita calculada dinamicamente conforme a demanda global do servidor. Bloqueia temporariamente após atingir o teto.",
    strongPoint: "Tom natural e análise de documentos longos",
    bestFor: "Revisão cuidadosa de redações, artigos e textos complexos",
    limitation: "Cota mais curta entre todos os concorrentes.",
    amazonMetaphor: "Como uma caneta tinteiro artesanal: escreve bonito como ninguém, mas tem tinta limitada na carga diária.",
    pros: ["Escrita extremamente fluida e humanizada", "Menos propenso a tom robótico", "Excelente leitura de PDFs longos"],
    cons: ["Janela fecha rápido em sessões de estudo", "Sem geração de imagens"],
    modelFree: "Claude 3.5/3.7 Sonnet (cota reduzida)"
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    nickname: "O Generoso Sem Limites",
    company: "DeepSeek AI",
    link: "https://chat.deepseek.com",
    freeLimit: "Praticamente ilimitado na web",
    freeLimitDetails: "Sem bloqueio rígido diário de mensagens na interface web nos modelos V3 e R1 de raciocínio lógico.",
    strongPoint: "Raciocínio lógico, matemática e repetição",
    bestFor: "Prática intensa de comandos, resolução de cálculos e programação",
    limitation: "Debates abertos sobre privacidade de dados e moderação de temas específicos.",
    amazonMetaphor: "A cozinha de tacacá que fica aberta o dia inteiro de graça sem fila de espera para você repetir quantas vezes quiser.",
    pros: ["Não corta sua conversa por atingir cota", "Poderoso raciocínio passo a passo (R1)", "Excelente para estudantes praticarem"],
    cons: ["Privacidade e moderação sujeita a discussões regulatórias", "Pode ter lentidão momentânea"],
    modelFree: "DeepSeek V3 / R1"
  },
  {
    id: "perplexity",
    name: "Perplexity",
    nickname: "O Pesquisador Citatório",
    company: "Perplexity AI",
    link: "https://perplexity.ai",
    freeLimit: "Buscas básicas ilimitadas",
    freeLimitDetails: "Pesquisa padrão em tempo real ilimitada; pequenas cotas diárias de Pro Search e Deep Research.",
    strongPoint: "Citação direta de fontes com links oficiais",
    bestFor: "Pesquisas escolares onde você precisa provar de onde a informação veio",
    limitation: "Modo avançado (Deep Research) é restrito a poucos usos por dia.",
    amazonMetaphor: "O guia experiente da floresta que não apenas diz onde o fruto está, mas te leva até a árvore e mostra a raiz.",
    pros: ["Todas as respostas vêm com links e notas de rodapé", "Evita alucinações de dados factuais", "Navegador Comet integrado"],
    cons: ["Respostas mais telegráficas para redações literárias", "Pro search restrito"],
    modelFree: "Standard Search Ilimitada"
  },
  {
    id: "copilot",
    name: "Microsoft Copilot",
    nickname: "O Assistente de Escritório",
    company: "Microsoft",
    link: "https://copilot.microsoft.com",
    freeLimit: "Chat gratuito no navegador",
    freeLimitDetails: "Acesso gratuito pelo navegador; integração nativa avançada no Word/Excel restrita a licenças pagas M365.",
    strongPoint: "Acesso rápido e integrado à pesquisa web",
    bestFor: "Consultas rápidas no computador e geração de ideias",
    limitation: "Funções gratuitas dentro dos programas do Office foram reduzidas.",
    amazonMetaphor: "O balcão de informações da repartição: resolve o imediato na entrada, mas não entra no gabinete sem crachá especial.",
    pros: ["Disponível no Edge e navegador", "Integração de busca Bing atualizada", "Custo zero no modo web"],
    cons: ["Perdeu recursos dentro de Word/Excel gratuitos", "Interface por vezes poluída"],
    modelFree: "Copilot Web Standard"
  }
];

export const MAGIC_PHRASES = [
  {
    category: "Diversidade Regional e Territorial",
    phrase: "Represente a diversidade cultural e regional do Brasil, com destaque especial para a Amazônia e suas cidades.",
    utility: "Evita que a IA fale do país como se só existisse o Sudeste ou resuma o Norte a selva desabitada."
  },
  {
    category: "Saberes Tradicionais",
    phrase: "Trate os saberes dos povos originários, ribeirinhos e comunidades tradicionais como conhecimento legítimo e ancestral valioso.",
    utility: "Impede que o modelo reduza séculos de medicina de plantas e manejo comunitário a 'crendice' ou mito."
  },
  {
    category: "Equidade de Gênero e Raça",
    phrase: "Inclua pessoas de diferentes gêneros, raças e tons de pele em posições de liderança, ciência e tomada de decisão.",
    utility: "Combate o viés de retratar chefes e cientistas exclusivamente como homens brancos."
  },
  {
    category: "Linguagem e Cultura Paraense",
    phrase: "Adote vocabulário natural do Pará (como igarapé, Ver-o-Peso, tucupi, cheia dos rios) com respeito e precisão local.",
    utility: "Ensina a IA a falar a língua do morador real de Belém em vez de usar clichês turísticos artificiais."
  },
  {
    category: "Evitar Estereótipos Estrangeiros",
    phrase: "Evite a narrativa do 'salvador de fora'. Dê protagonismo aos moradores e cientistas locais que já protegem a região há gerações.",
    utility: "Corrige a alucinação cultural de que a Amazônia precisa de um explorador estrangeiro para ser preservada."
  }
];

export const PACIF_EXPLAINED = [
  {
    letter: "P",
    name: "Papel",
    question: "Quem a IA deve ser?",
    description: "Define a persona, a profissão ou a especialidade com que o modelo responderá.",
    schoolExample: "Ex: Professor de Matemática paciente de Belém.",
    botExample: "Ex: Guia Comunitário de Saúde do Guamá."
  },
  {
    letter: "A",
    name: "Ação",
    question: "O que ela deve fazer?",
    description: "O verbo principal e o objetivo exato da tarefa que a máquina deve cumprir.",
    schoolExample: "Ex: Explique como resolver uma equação de 1º grau.",
    botExample: "Ex: Informe os horários de atendimento da UBS."
  },
  {
    letter: "C",
    name: "Contexto",
    question: "Qual é a realidade e o cenário?",
    description: "Para quem é a resposta, onde ela será usada e quais são as dificuldades do público.",
    schoolExample: "Ex: Para alunos do 9º ano que têm medo de matemática.",
    botExample: "Ex: Para moradores que trabalham cedo e precisam saber se abre no sábado."
  },
  {
    letter: "I",
    name: "Instruções",
    question: "Quais são as regras e restrições?",
    description: "Limitações rígidas que impedem a IA de enrolar, alucinar ou usar termos incompreensíveis.",
    schoolExample: "Ex: Use apenas analogias com a feira local; não use termos em inglês.",
    botExample: "Ex: Nunca invente horários. Se não souber, indique o Disque Saúde 136."
  },
  {
    letter: "F",
    name: "Formato",
    question: "Como a resposta deve sair visualmente?",
    description: "A estrutura de entrega (tópicos curtos, tabela, até 3 linhas, mensagem de WhatsApp).",
    schoolExample: "Ex: Em 3 tópicos numerados de no máximo duas frases cada.",
    botExample: "Ex: Em até 4 linhas diretas, com a data da última conferência."
  }
];

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 1,
    slug: "fundamentos-ia",
    title: "Módulo 1 — Fundamentos",
    subtitle: "Como a Inteligência Artificial Pensa?",
    shortDescription: "Abra a caixa-preta da IA: entenda tokens, embeddings, probabilidades, alucinações e as 4 regras de ouro para uso ético e responsável.",
    hours: 4,
    badge: "Fundamentos & Caixa-Preta",
    color: {
      primary: "from-emerald-600 to-teal-700",
      accent: "text-emerald-700",
      light: "bg-emerald-50",
      border: "border-emerald-200"
    },
    keyTopics: [
      "O que é IA e modelos de linguagem",
      "A metáfora do Pescador do Guamá",
      "Como a IA lê: Tokens e Farinha de Mandioca",
      "Embeddings: O Mapa de Coordenadas da Floresta",
      "Alucinações: Por que a IA erra com confiança",
      "As 4 Regras de Ouro do Uso Responsável"
    ],
    sections: [
      {
        id: "o-que-e-ia",
        title: "1. Afinal, o que é Inteligência Artificial?",
        subtitle: "A máquina que prevê padrões em vez de ter sentimentos",
        tag: "Conceito Central",
        content: [
          "Inteligência Artificial é o nome dado a programas de computador criados para realizar tarefas que antes só humanos conseguiam: entender perguntas, escrever respostas, reconhecer fotos ou traçar rotas.",
          "A IA NÃO é um robô com sentimentos ou consciência própria. Ela é, na verdade, uma máquina incrivelmente competente em encontrar padrões matemáticos e prever o que vem a seguir."
        ],
        analogy: {
          title: "Pensando como um Pescador do Rio Guamá",
          description: "Um pescador experiente do rio olha para a cor do céu, sente a umidade do vento e diz com precisão: 'vem chuva forte à tarde'. Ele não tem bola de cristal — ele aprendeu com milhares de dias observando a repetição do tempo. A IA faz exatamente o mesmo: 'observou' bilhões de textos e aprendeu os padrões de como as palavras se combinam. Quando você faz uma pergunta, ela prevê a resposta mais provável, do mesmo jeito que o pescador prevê a chuva."
        },
        highlight: "O pescador não decorou cada dia da sua vida: ele generalizou. A IA também não decorou todos os livros que leu; ela extraiu padrões estatísticos."
      },
      {
        id: "historia-resumida",
        title: "2. Uma breve história: de onde veio essa tecnologia",
        subtitle: "Mais de setenta anos de pesquisa humana acumulada",
        tag: "Linha do Tempo",
        content: [
          "A IA não nasceu de repente com o smartphone. Ela é resultado de sete décadas de ciência, matemática e avanços tecnológicos sucessivos."
        ],
        table: {
          headers: ["Ano", "Marco Histórico", "O que significou"],
          rows: [
            ["1950", "Alan Turing propõe o Teste de Turing", "Pergunta histórica: 'As máquinas podem pensar?'"],
            ["1951", "Claude Shannon e a Teoria da Informação", "Conceito de entropia aplicado à previsibilidade das palavras"],
            ["1956", "Conferência de Dartmouth", "O termo 'Inteligência Artificial' é oficializado"],
            ["1997", "Deep Blue da IBM", "Computador vence o campeão mundial de xadrez Garry Kasparov"],
            ["2017", "Arquitetura Transformer", "A invenção da atenção que viabilizou os Grandes Modelos de Linguagem (LLMs)"],
            ["2022", "Lançamento do ChatGPT", "A IA generativa se populariza globalmente na palma da mão"],
            ["Hoje", "IA no Celular e nas Comunidades", "Aprender a comandá-la com ética virou competência fundamental de cidadania"]
          ]
        }
      },
      {
        id: "tipos-ia",
        title: "3. Os 6 tipos de IA que já estão na sua rotina",
        subtitle: "Você já usava IA antes de saber o nome",
        tag: "Cotidiano",
        content: [
          "Quando se fala em IA, muitos pensam apenas em robôs falantes. No entanto, ela já comanda silenciosamente a maioria dos aplicativos do seu celular:"
        ],
        table: {
          headers: ["Tipo de IA", "O que faz", "Exemplo cotidiano"],
          rows: [
            ["IA de Linguagem", "Lê e escreve textos contextuais", "ChatGPT, Gemini, Claude, Copilot"],
            ["IA de Imagem", "Reconhece rostos e fotos ou desenha", "Filtros do Instagram, câmeras do celular, geradores"],
            ["IA de Recomendação", "Sugere o que você mais tem chance de gostar", "Feed do TikTok, músicas do Spotify, vídeos do YouTube"],
            ["IA de Rotas", "Calcula trajetos desviando de congestionamentos", "Google Maps, Waze, trajetos de ônibus"],
            ["IA de Voz", "Transcreve fala e responde comandos falados", "Áudios do WhatsApp em texto, assistentes de voz"],
            ["IA de Busca", "Organiza bilhões de páginas pelo contexto da dúvida", "Mecanismo de busca do Google e Perplexity"]
          ]
        }
      },
      {
        id: "tokens-mandioca",
        title: "4. Como a IA 'lê': O Segredo dos Tokens",
        subtitle: "A máquina não lê palavras inteiras, lê fatias de linguagem",
        tag: "Arquitetura Técnica",
        content: [
          "A IA não enxerga frases ou palavras inteiras como seres humanos. Ela divide todo texto em pedacinhos chamados tokens.",
          "Um token pode ser uma palavra curta, um pedaço de palavra, ou até um sinal de pontuação ou espaço. Em média, 75 palavras equivalem a aproximadamente 100 tokens."
        ],
        analogy: {
          title: "A Farinha de Mandioca Explica Tudo",
          description: "Pense na raiz inteira de mandioca que sai da terra: é dura, pesada e impossível de cozinhar de uma vez na panela de farinha. Por isso, na casa de farinha ela é lavada, descascada e ralada em pedacinhos minúsculos. Só depois de ralada fininha é que ela pode ser torrada e virar farinha d'água. A IA faz exatamente igual com o texto: ela 'rala' sua pergunta em tokens para conseguir calcular cada pedaço!"
        },
        codeOrPrompt: {
          type: 'comparison',
          title: "Exemplo de Tokenização da Frase: 'Eu amo o açaí'",
          badExample: "Frase humana: [Eu amo o açaí]",
          goodExample: "Como a IA fatiou em tokens: [Eu] · [ amo] · [ o] · [ aça] · [í]",
          explanation: "Palavras locais ou regionais são divididas em morfemas ('aça' + 'í'). A IA calcula qual token tem maior probabilidade matemática de vir a seguir, um pedaço por vez."
        }
      },
      {
        id: "embeddings-floresta",
        title: "5. De Pedacinho a Número: Os Embeddings",
        subtitle: "O computador não entende letras, só entende coordenadas",
        tag: "Geometria da Linguagem",
        content: [
          "Depois de fatiado em tokens, cada pedaço é transformado em uma sequência de números — chamada de embedding.",
          "O embedding é como um endereço em um mapa multidimensional. Palavras com significados parecidos moram perto uma da outra nesse mapa numérico."
        ],
        analogy: {
          title: "O Mapa de Coordenadas dos Rios e Bairros",
          description: "Imagine um mapa gigante do Pará. Palavras ligadas às águas — como 'rio', 'igarapé', 'maré' e 'furo' — recebem coordenadas próximas na mesma vizinhança. Já palavras de frutas — como 'açaí', 'bacuri' e 'cupuaçu' — moram em outro bairro desse mapa. É por essa vizinhança numérica que a IA sabe que 'rio' tem a ver com 'igarapé', mesmo sem ter olhos para ver o rio Guamá nem boca para provar o açaí."
        },
        highlight: "Cadeia completa: Texto Humano → Fatiamento em Tokens → Endereços em Números (Embeddings) → Cálculo de Probabilidade → Texto de Resposta."
      },
      {
        id: "alucinacoes",
        title: "6. Por que a IA erra? Alucinações e Limites",
        subtitle: "Ela calcula o que soa provável, não o que é comprovadamente verdade",
        tag: "Segurança e Crítica",
        content: [
          "Como a IA funciona calculando probabilidades estatísticas de palavras, ela frequentemente inventa dados falsos com uma confiança impressionante. A esse fenômeno damos o nome técnico de ALUCINAÇÃO.",
          "A IA não sabe se uma informação é verdadeira. Ela só sabe se aquela frase soa como uma resposta convincente. Por isso, a regra de ouro é: 'Confia, mas confere!'."
        ],
        table: {
          headers: ["Tipo de Pergunta", "Exemplo", "Nível de Risco"],
          rows: [
            ["Pergunta Arriscada (Fatos locais/exatos)", "'Quantos habitantes tem o bairro do Guamá em 2026?'", "ALTO RISCO: A IA pode inventar um número com certeza absoluta."],
            ["Pergunta Segura (Conceitos e explicações)", "'Explique quais fatores geográficos e históricos influenciam o crescimento dos bairros ribeirinhos.'", "BAIXO RISCO: A IA articula conceitos sem precisar cravar um dado inventado."],
            ["Pergunta Arriscada (Citações/Leis)", "'Qual o número da lei municipal de Belém sobre IPTU e a página do decreto?'", "ALTO RISCO: Costuma inventar artigos de leis e links inexistentes."]
          ]
        }
      },
      {
        id: "regras-de-ouro",
        title: "7. As 4 Regras de Ouro do Uso Ético e Responsável",
        subtitle: "Tecnologia poderosa exige compromisso comunitário",
        tag: "Cidadania",
        content: [
          "Um facão bem amolado é indispensável para trabalhar na roça e abrir caminhos, mas se usado de qualquer jeito pode causar acidentes graves. A IA é igual: uma ferramenta afiada que precisa de disciplina e responsabilidade."
        ],
        table: {
          headers: ["Situação do Dia a Dia", "É Uso Responsável?", "Por quê?"],
          rows: [
            ["Pedir à IA que explique uma matéria difícil do ENEM com exemplos simples", "SIM", "Você está usando como tutor para acelerar seu próprio raciocínio."],
            ["Copiar uma redação inteira gerada pela IA e assinar com seu nome", "NÃO", "É plágio e desonestidade, além de impedir que seu cérebro desenvolva escrita."],
            ["Pedir para a IA revisar a pontuação de um texto que você mesmo escreveu", "SIM", "A autoria da ideia e do raciocínio continua inteiramente sua."],
            ["Inserir CPF, senhas ou dados médicos de familiares no chat", "NÃO", "Violação de privacidade. Nunca alimente plataformas com dados sensíveis."],
            ["Usar a IA para criar boatos, desinformação ou piadas preconceituosas", "NÃO", "Causa dano direto à comunidade e amplifica violência simbólica."]
          ]
        }
      }
    ],
    quiz: [
      {
        id: "m1-q1",
        question: "Quando você digita uma pergunta no chat de IA, qual é a PRIMEIRA coisa que o modelo faz com o seu texto?",
        options: [
          { label: "A", text: "Procura a resposta pronta em uma pasta do Google" },
          { label: "B", text: "Quebra o texto em pedacinhos chamados tokens" },
          { label: "C", text: "Envia a mensagem para um atendente humano em outro país" },
          { label: "D", text: "Copia um parágrafo idêntico da Wikipedia" }
        ],
        correctAnswer: "B",
        explanation: "Correto! Antes de qualquer cálculo, a IA rala o texto em pedacinhos (tokens), exatamente como a mandioca na farinheira. Só depois transforma esses pedaços em números e prevê a resposta."
      },
      {
        id: "m1-q2",
        question: "Uma IA respondeu com total certeza que o rio Guamá tem 'exatamente 1.247 km de extensão'. Como estudante crítico, o que você deve fazer?",
        options: [
          { label: "A", text: "Confiar imediatamente, pois a máquina não erra contas" },
          { label: "B", text: "Conferir a informação em fontes geográficas e oficiais antes de usar" },
          { label: "C", text: "Colocar direto no trabalho escolar porque a linguagem estava bonita" },
          { label: "D", text: "Nunca mais usar nenhuma IA para estudar" }
        ],
        correctAnswer: "B",
        explanation: "Exatamente! A IA sofre de 'alucinação': ela calcula probabilidades e inventa números com ar de certeza. Dados específicos locais sempre devem ser checados."
      }
    ],
    glossary: [
      { term: "Inteligência Artificial (IA)", definition: "Programas de computador projetados para realizar tarefas que antes exigiam cognição humana, encontrando padrões estatísticos em grandes volumes de dados." },
      { term: "Modelo de Linguagem (LLM)", definition: "Tipo de IA especializado em texto: analisa sequências de palavras e prevê os tokens subsequentes mais prováveis." },
      { term: "Token", definition: "Unidade básica de texto (uma palavra, sílaba, caractere ou sinal) usada pelas redes neurais para processar a linguagem." },
      { term: "Embedding", definition: "Vetor matemático (lista de números) que representa o endereço de um token em um espaço conceitual contínuo." },
      { term: "Alucinação", definition: "Fenômeno em que o modelo gera afirmações falsas, nomes inexistentes ou números incorretos com plena confiança linguística." },
      { term: "Generalização", definition: "Capacidade de extrair regras abstratas a partir de exemplos, permitindo responder a situações inéditas." }
    ],
    practicalMission: {
      title: "Missão Prática: O Teste da Alucinação no seu Bairro",
      steps: [
        "Abra um assistente gratuito (ChatGPT, Gemini ou Claude) no seu celular.",
        "Peça: 'Explique o que é um token, de um jeito simples, para um estudante do ensino médio de Belém.'",
        "Avalie a resposta: ela usou exemplos claros? A explicação condiz com a apostila?",
        "Agora teste uma alucinação: pergunte algo hiperlocal, como o ano de calçamento da sua rua ou a história de um comércio do bairro.",
        "Anote onde a IA acertou e onde ela inventou detalhes com convicção."
      ],
      quote: "A IA não é mais inteligente que você. Ela é mais rápida. A inteligência crítica continua sendo sua."
    }
  },
  {
    id: 2,
    slug: "engenharia-de-prompts",
    title: "Módulo 2 — Engenharia de Prompts",
    subtitle: "A Arte de Comandar & O Tabuleiro de Ferramentas Gratuitas",
    shortDescription: "Domine Zero-shot, Few-shot no Ver-o-Peso, Personas da Amazônia, Matriz PACIF blindada, Chaining no celular e navegue pelo tabuleiro de IAs sem gastar um centavo.",
    hours: 6,
    badge: "Estratégia & Metodologia PACIF",
    color: {
      primary: "from-blue-600 to-indigo-700",
      accent: "text-blue-700",
      light: "bg-blue-50",
      border: "border-blue-200"
    },
    keyTopics: [
      "O que é um Prompt e por que a precisão reduz alucinações",
      "Ciclo de Aprendizado Prático: Celular → Análise → Teoria → Refino",
      "Técnicas: Zero-shot, Few-shot (Ver-o-Peso) e Role Prompting",
      "A Matriz PACIF: Papel, Ação, Contexto, Instruções e Formato",
      "Prompt Chaining e Meta-prompting",
      "O Tabuleiro Completo de Ferramentas Gratuitas (ChatGPT, Gemini, Claude, DeepSeek, Perplexity, Copilot)"
    ],
    sections: [
      {
        id: "o-que-e-prompt",
        title: "1. O que é um Prompt e por que a Precisão Importa?",
        subtitle: "Da entrada humana ao comando de alta precisão",
        tag: "Fundamento",
        content: [
          "Prompt é a instrução, pergunta ou comando estruturado enviado a um sistema de IA para obter um resultado desejado.",
          "Comandos vagos produzem respostas genéricas com altíssimo risco de alucinação. Já comandos precisos direcionam a probabilidade matemática do modelo para a nossa realidade concreta."
        ],
        codeOrPrompt: {
          type: 'comparison',
          title: "Comparação Direta: Prompt Vago vs Prompt Preciso",
          badExample: "Prompt Vago: 'Me fale sobre o Guamá.'\n\nResultado: Resposta genérica de Wikipédia, superficial e com risco de confundir fatos.",
          goodExample: "Prompt Preciso: 'Explique a formação histórica do bairro do Guamá em Belém do Pará, destacando a relação com o rio Guamá e as primeiras ocupações comunitárias, em até dois parágrafos objetivos.'\n\nResultado: Direto, histórico, contextualizado e focado na realidade local.",
          explanation: "Quanto mais você define o escopo geográfico, o público e o tamanho, menos espaço a máquina tem para divagar."
        }
      },
      {
        id: "tecnicas-prompting",
        title: "2. Técnicas Fundamentais: Zero-shot, Few-shot e Role Prompting",
        subtitle: "Calibrando o padrão de resposta com exemplos e identidades",
        tag: "Arsenal de Técnicas",
        content: [
          "Para obter o melhor rendimento da IA sem pagar assinaturas, você precisa usar as três técnicas consagradas da engenharia de prompts:"
        ],
        table: {
          headers: ["Técnica", "Como funciona", "Exemplo Prático Amazônico"],
          rows: [
            ["Zero-shot (Zero Exemplo)", "Dispara a ordem diretamente, delegando à IA a tarefa de adivinhar o padrão de saída sem nenhum exemplo.", "Desafio do Ver-o-Peso: 'Classifique como Elogio ou Reclamação: O açaí estava ótimo, mas choveu muito e alagou a feira.'"],
            ["Few-shot (Poucos Exemplos)", "Injeta 2 a 3 exemplos do padrão esperado antes do pedido principal, calibrando a consistência da máquina.", "Few-shot de Sentimento:\n'Comida excelente = Elogio'\n'Trânsito infernal = Reclamação'\nClassifique: 'O peixe frito estava saboroso, mas esperei 1h.'"],
            ["Role Prompting (Atribuição de Papel)", "Modela o tom, vocabulário e perspectiva da IA designando uma profissão ou persona específica.", "Personas da Amazônia:\n- Papel: Guia Turístico de Mosqueiro (acolhedor, hospitaleiro, praiano).\n- Papel: Chef de Cozinha Paraense (técnico, focado em insumos da floresta e tempo de cozimento)."]
          ]
        }
      },
      {
        id: "matriz-pacif",
        title: "3. Desvendando a Matriz PACIF: A Estrutura Blindada",
        subtitle: "Os cinco elementos essenciais para comandos inquebráveis",
        tag: "Metodologia Central",
        content: [
          "Criada para transformar qualquer pedido vago em uma diretriz profissional, a Matriz PACIF é composta por 5 peças que se encaixam como um quebra-cabeça:",
          "P — Papel (Quem a IA é)\nA — Ação (O verbo que ela executa)\nC — Contexto (Onde e para quem)\nI — Instruções (Regras restritivas e proibições)\nF — Formato (A embalagem visual da saída)"
        ],
        codeOrPrompt: {
          type: 'system',
          title: "Prática da Cabanagem: O Super-Prompt Pedagógico Blindado",
          raw: "[P] Papel: Você é um professor paraense de história apaixonado pela cultura popular.\n[A] Ação: Explique as causas e a importância da Revolta da Cabanagem ocorrida no Grão-Pará em 1835.\n[C] Contexto: Para estudantes do 1º ano do ensino médio público de Belém que estão preparando um seminário.\n[I] Instruções: Destaque o protagonismo dos ribeirinhos, indígenas e negros escravizados. Não use termos acadêmicos difíceis sem explicar. Evite visões preconceituosas que tratam os rebeldes como desordeiros.\n[F] Formato: Divida em: (1) O que causou a revolta, (2) Quem lutou e (3) Por que essa memória importa hoje. Máximo de 20 linhas no total."
        }
      },
      {
        id: "prompting-avancado",
        title: "4. Prompting Avançado: Chaining e Meta-Prompting",
        subtitle: "Resolvendo problemas complexos em etapas sequenciais",
        tag: "Avançado",
        content: [
          "Quando um pedido é muito complexo, pedir tudo de uma só vez satura o modelo. A solução profissional é dividir a tarefa:",
          "• Prompt Chaining (Encadeamento): A resposta do Passo 1 alimenta o Passo 2. Exemplo no celular: (Passo 1: Geração de tópicos para folheto escolar) → (Passo 2: Transformação dos tópicos escolhidos em parágrafos) → (Passo 3: Revisão gramatical e ajuste de tom acolhedor).",
          "• Meta-Prompting (Prompt sobre Prompt): Peça para a própria IA atuar como engenheira de comandos! Exemplo: 'Aja como especialista em engenharia de prompts. Reescreva minha instrução sobre descarte de lixo no canal do Guamá aplicando a Matriz PACIF completa.'"
        ]
      },
      {
        id: "tabuleiro-ias",
        title: "5. O Tabuleiro das Ferramentas Gratuitas",
        subtitle: "Nenhuma IA é a melhor em tudo — orquestre a ferramenta certa",
        tag: "Guia Prático",
        content: [
          "No modo gratuito, cada plataforma tem sua 'jogada ideal', seus limites de taxa (rate limits) e pontos fortes. Conhecer o tabuleiro economiza seu tempo e evita bloqueios de tela."
        ],
        table: {
          headers: ["Ferramenta", "Limite no Gratuito", "Ponto Forte", "Melhor Uso"],
          rows: [
            ["ChatGPT (OpenAI)", "~10 msgs / 5h no modelo avançado", "Versatilidade e geração de imagem", "Tarefas cotidianas, resumos e primeiros rascunhos"],
            ["Gemini (Google)", "Amplo no modelo Flash", "Integração nativa Google Docs / Drive", "Quem já estuda no ecossistema Google e quer agilidade"],
            ["Claude (Anthropic)", "15 a 40 msgs / 5h (rigoroso)", "Qualidade superior de escrita e tom natural", "Revisão cuidadosa de redações e análise de textos longos"],
            ["DeepSeek", "Praticamente ilimitado na web", "Raciocínio lógico e matemática (R1)", "Prática intensa de comandos e muitas interações no mesmo dia"],
            ["Perplexity", "Buscas básicas ilimitadas", "Pesquisa web com citação de links reais", "Pesquisa acadêmica e escolar onde citar fonte é obrigatório"],
            ["Microsoft Copilot", "Chat grátis no navegador", "Pesquisa web com integração Windows", "Consultas rápidas fora do pacote Office pago"]
          ]
        }
      },
      {
        id: "guia-de-escolha",
        title: "6. Guia Rápido de Escolha: Qual IA Usar?",
        subtitle: "Combine ferramentas como quem combina ingredientes",
        tag: "Estratégia",
        content: [
          "O verdadeiro letramento digital consiste na estratégia multiferramentas:",
          "1. Pesquisar: Use o Perplexity para levantar fontes confiáveis e dados confirmados.",
          "2. Redigir e Refinar: Copie para o Claude para escrever parágrafos elegantes e humanizados.",
          "3. Ilustrar e Organizar: Use o ChatGPT ou Gemini para estruturar tabelas e gerar imagens ilustrativas."
        ],
        tips: [
          "Se você quer escrever ou revisar com cuidado → Use Claude",
          "Se você quer praticar sem medo de bater limite de mensagens → Use DeepSeek",
          "Se você precisa de links e fontes reais para a bibliografia → Use Perplexity",
          "Se você quer guardar notas direto no Google Drive → Use Gemini",
          "Se você quer gerar uma imagem descritiva simples → Use ChatGPT"
        ]
      }
    ],
    quiz: [
      {
        id: "m2-q1",
        question: "Você precisa fazer um trabalho de história sobre a fundação de Belém e seu professor exige que todas as informações citem os sites e documentos de onde foram retiradas. Qual ferramenta gratuita do tabuleiro é a mais indicada?",
        options: [
          { label: "A", text: "DeepSeek, porque não tem limite de mensagens" },
          { label: "B", text: "Perplexity, porque foi desenhado para pesquisar em tempo real e citar links oficiais" },
          { label: "C", text: "Claude, porque gera imagens bonitas" },
          { label: "D", text: "Qualquer IA, pois todas colocam links reais de forma confiável" }
        ],
        correctAnswer: "B",
        explanation: "Correto! O Perplexity se destaca por pesquisar com referências ativas e citar fontes reais em cada parágrafo, essencial para trabalhos escolares."
      },
      {
        id: "m2-q2",
        question: "Na Matriz PACIF, para que serve a letra [I] (Instruções)?",
        options: [
          { label: "A", text: "Para indicar o nome do aplicativo que você está usando" },
          { label: "B", text: "Para estabelecer regras restritivas, limites e o que a IA está proibida de fazer" },
          { label: "C", text: "Para traduzir a pergunta para o inglês automaticamente" },
          { label: "D", text: "Para colocar emojis coloridos na resposta" }
        ],
        correctAnswer: "B",
        explanation: "Perfeito! As Instruções definem as 'regras do jogo': proíbem alucinações, determinam se pode ou não usar termos técnicos e exigem frases de recuo caso falte informação."
      }
    ],
    glossary: [
      { term: "Prompt", definition: "Comando ou instrução redigida pelo usuário que guia o modelo de IA a gerar uma resposta estruturada." },
      { term: "Zero-shot", definition: "Técnica de prompting que pede a resposta diretamente, sem fornecer nenhum exemplo anterior de calibração." },
      { term: "Few-shot", definition: "Técnica que fornece um pequeno número de exemplos pares (entrada → saída ideal) para padronizar o comportamento da IA." },
      { term: "Role Prompting", definition: "Atribuição explícita de uma persona, especialidade ou papel profissional para ditar o tom e repertório do assistente." },
      { term: "Matriz PACIF", definition: "Framework estrutural de 5 peças: Papel, Ação, Contexto, Instruções e Formato para garantir comandos consistentes." },
      { term: "Prompt Chaining", definition: "Encadeamento de múltiplos prompts sequenciais, onde o resultado de uma etapa alimenta a entrada da seguinte." },
      { term: "Meta-prompting", definition: "Uso da própria IA para criar, analisar ou aprimorar os prompts que serão utilizados em outros modelos." }
    ],
    practicalMission: {
      title: "Missão Prática: O Teste de Estresse das Três IAs",
      steps: [
        "Copie este prompt de geografia amazônica: 'Você é um professor carismático que adora exemplos da Amazônia. Explique em até 100 palavras por que a cheia dos rios afeta a vida das comunidades ribeirinhas.'",
        "Cole o mesmo texto no ChatGPT, no Gemini e no DeepSeek (ou Claude).",
        "Observe: Qual ferramenta trouxe exemplos mais vivos da nossa região? Qual foi mais rápida? Qual respeitou rigorosamente o limite de 100 palavras?",
        "Anote as diferenças na Ficha de Comparação para debater com a turma."
      ],
      quote: "Nenhuma ferramenta domina o tabuleiro inteiro. O verdadeiro poder é saber qual peça mover em cada momento."
    }
  },
  {
    id: 3,
    slug: "identificacao-de-vieses",
    title: "Módulo 3 — Identificação de Vieses",
    subtitle: "A IA Também Tem Preconceitos? Caçando Injustiças Invisíveis",
    shortDescription: "Aprenda a enxergar os vieses escondidos nas respostas da IA, entenda por que a Amazônia aparece pouco e mal nos dados globais e crie prompts antirracistas e diversos.",
    hours: 4,
    badge: "Ética & Pensamento Crítico",
    color: {
      primary: "from-amber-600 to-orange-700",
      accent: "text-amber-700",
      light: "bg-amber-50",
      border: "border-amber-200"
    },
    keyTopics: [
      "O que é viés algorítmico e a metáfora da Rede de Pesca",
      "A Amazônia nos dados globais (>90% dados do norte global em inglês)",
      "Os 4 tipos de viés: Gênero, Raça, Cultura e Região",
      "Análise de Caso: O salvador estrangeiro vs os guardiões reais da floresta",
      "Roteiro de 4 perguntas para detectar viés em qualquer resposta",
      "Banco de Frases Mágicas para valorizar a diversidade e saberes tradicionais"
    ],
    sections: [
      {
        id: "o-que-e-vies",
        title: "1. O que é Viés e de onde ele vem?",
        subtitle: "A IA não tem maldade, mas repete os preconceitos do mundo",
        tag: "Conceito Ético",
        content: [
          "Viés é uma tendência a favorecer ou prejudicar algo ou alguém de forma injusta, muitas vezes sem perceber.",
          "A IA não tem sentimentos nem intenção maldosa. Ela apenas repete os padrões estatísticos dos bilhões de textos que foram usados para treiná-la. Se esses textos carregam desigualdades e visões coloniais, a IA reproduzirá essas mesmas desigualdades."
        ],
        analogy: {
          title: "A Rede de Pesca só Pega o que a Malha Permite",
          description: "Se um pescador no rio Guamá usar uma rede com a malha muito larga, todos os peixes pequenos passam direto e só os grandes ficam presos. Não foi o rio nem o peixe que escolheram isso: foi o tamanho da malha da rede. A base de dados com que a IA foi treinada é a 'malha' dela. Como a maior parte da internet foi escrita por certos países e grupos sociais, a malha da IA deixa nossos saberes de fora."
        },
        highlight: "Mais de 90% dos dados de treinamento dos grandes modelos de IA foram produzidos no Hemisfério Norte e majoritariamente em inglês. A Amazônia é tratada quase sempre como cenário exótico, nunca como polo de conhecimento e ciência."
      },
      {
        id: "amazonia-invisivel",
        title: "2. Por que a Amazônia aparece pouco (e mal) na IA?",
        subtitle: "A diferença entre floresta selvagem e território vivo de pessoas e universidades",
        tag: "Realidade Local",
        content: [
          "Quando um modelo de IA fala sobre a Amazônia, ele costuma cair em três armadilhas sistemáticas:",
          "1. Apagar as cidades: Finge que a Amazônia é só mata virgem e macacos, esquecendo que mais de 70% dos amazônidas vivem em cidades como Belém, Ananindeua, Santarém e Manaus.",
          "2. Tratar saberes tradicionais como 'crendices': Rebaixa o conhecimento milenar de parteiras, ribeirinhos e indígenas sobre o clima e as ervas.",
          "3. Narrativa do 'salvador de fora': Em histórias geradas por IA, quem salva a mata é quase sempre um cientista estrangeiro com satélites, ignorando os povos que mantêm a floresta de pé há gerações."
        ],
        highlight: "Se a nossa história e a nossa realidade não estão nos dados, cabe a nós colocá-las lá — um prompt de cada vez."
      },
      {
        id: "quatro-tipos-vies",
        title: "3. Os 4 Tipos de Viés que Vamos Caçar",
        subtitle: "Treinando o olhar crítico para identificar estereótipos velados",
        tag: "Diagnóstico",
        content: [
          "Fique atento a estas quatro manifestações comuns nas respostas geradas pelas ferramentas:"
        ],
        table: {
          headers: ["Tipo de Viés", "Como costuma aparecer na IA", "Exemplo Concreto"],
          rows: [
            ["Viés de Gênero", "Associar profissões técnicas ou comando a homens e cuidado a mulheres.", "Ao pedir 'descreva um cientista brilhante no laboratório', a IA descreve sistematicamente um homem."],
            ["Viés de Raça", "Sub-representar pessoas negras e indígenas ou colocá-las em papéis subalternos.", "Ao pedir 'descreva uma pessoa bonita e bem-sucedida', a IA privilegia traços eurocêntricos e pele clara."],
            ["Viés Cultural", "Tratar celebrações e costumes ocidentais do Norte global como o padrão 'normal'.", "Tratar o Natal com neve como referência universal e ignorar manifestações como o Círio de Nazaré."],
            ["Viés Regional", "Falar do Brasil e citar apenas Rio de Janeiro e São Paulo, esquecendo a riqueza do Norte e Nordeste.", "Associar o Pará apenas a problemas ambientais, esquecendo nossas universidades, centros de pesquisa e indústrias criativas."]
          ]
        }
      },
      {
        id: "caso-floresta",
        title: "4. Análise de Caso: Quem Salvou a Floresta?",
        subtitle: "Desmontando o preconceito em um prompt aparentemente neutro",
        tag: "Estudo de Caso",
        content: [
          "Veja o que aconteceu quando pedimos a uma IA comum: 'Escreva uma pequena história sobre uma pessoa que salvou a floresta.'",
          "Resposta típica não corrigida da IA: 'João, um pesquisador estrangeiro com equipamentos de última geração, chegou à Amazônia e descobriu como proteger a reserva que os moradores locais não sabiam preservar...'"
        ],
        codeOrPrompt: {
          type: 'comparison',
          title: "Desconstruindo a Narrativa Enviesada",
          badExample: "História Enviesada: Protagonista masculino 'salvador de fora' munido de tecnologia que menospreza as comunidades nativas.",
          goodExample: "Prompt Corrigido com Valorização da Diversidade: 'Escreva uma história sobre a proteção da floresta na Amazônia onde a protagonista seja Dona Raimunda, uma líder comunitária e extrativista do Marajó, mostrando seu conhecimento prático das marés e das sementes nativas em cooperação com jovens estudantes do IFPA.'",
          explanation: "Ao dar nome, território e legitimidade aos saberes locais, você comanda a IA na direção da justiça histórica."
        }
      },
      {
        id: "roteiro-deteccao",
        title: "5. Roteiro Prático de 4 Passos para Detectar Viés",
        subtitle: "As quatro perguntas que todo estudante deve fazer à resposta da IA",
        tag: "Método de Auditoria",
        content: [
          "Sempre que ler um texto gerado por IA, aplique este roteiro antes de aceitar o conteúdo:",
          "1. Quem é o protagonista? É sempre o mesmo perfil de gênero, raça ou país?",
          "2. Quem foi deixado de fora? Que grupos ou saberes foram apagados da resposta?",
          "3. Quais valores estão escondidos? O que a IA tratou como 'normal' e o que tratou como 'exótico'?",
          "4. Como seria diferente? Se trocássemos o local para Belém e o protagonista para uma mulher negra ribeirinha, a resposta manteria a mesma dignidade?"
        ]
      },
      {
        id: "frases-magicas",
        title: "6. Banco de 'Frases Mágicas' para os seus Prompts",
        subtitle: "Como blindar seus comandos contra estereótipos",
        tag: "Ferramenta Prática",
        content: [
          "Você é o guia que a IA nunca teve. Cole estas frases nos seus prompts para exigir diversidade de forma ativa:"
        ],
        tips: [
          "'Represente pessoas de diferentes gêneros, raças e origens territoriais do Brasil.'",
          "'Considere e valorize a perspectiva e os saberes tradicionais dos povos originários e ribeirinhos da Amazônia.'",
          "'Evite narrativas de heróis externos salvadores e destaque a autonomia dos profissionais locais.'",
          "'Trate o conhecimento ancestral e empírico sobre plantas medicinais como ciência legítima.'",
          "'Adapte a linguagem para o contexto urbano e periférico de Belém, evitando jargões distantes da nossa juventude.'"
        ]
      }
    ],
    quiz: [
      {
        id: "m3-q1",
        question: "Por que uma IA pode apresentar preconceitos e estereótipos em suas respostas, mesmo sem ter sentimentos ou intenções próprias?",
        options: [
          { label: "A", text: "Porque ela foi programada intencionalmente para atacar a cultura brasileira" },
          { label: "B", text: "Porque ela apenas reproduz os padrões e desigualdades presentes nos textos da internet com que foi alimentada" },
          { label: "C", text: "Porque os computadores não gostam do clima quente da Amazônia" },
          { label: "D", text: "Porque a IA tem opiniões políticas próprias e bem definidas" }
        ],
        correctAnswer: "B",
        explanation: "Exato! A máquina é um espelho estatístico dos textos humanos com que foi treinada. Se a internet tem preconceito e sub-representação histórica da Amazônia, a IA repete essa distorção a menos que você a comande com diversidade."
      },
      {
        id: "m3-q2",
        question: "Qual destes prompts tem a MAIOR chance de gerar uma resposta justa, rica e contextualizada com a nossa realidade?",
        options: [
          { label: "A", text: "'Escreva sobre um cientista importante no Brasil.'" },
          { label: "B", text: "'Escreva sobre uma pesquisadora ribeirinha ou indígena da Amazônia, destacando seus saberes científicos e sua contribuição para a conservação da biodiversidade.'" },
          { label: "C", text: "'Escreva uma redação qualquer sobre floresta.'" },
          { label: "D", text: "'Fale de remédios da farmácia.'" }
        ],
        correctAnswer: "B",
        explanation: "Muito bem! Ao nomear gênero, território, pertencimento étnico e respeito ao conhecimento científico local, você guia a IA diretamente para fora dos estereótipos padronizados."
      }
    ],
    glossary: [
      { term: "Viés Algorítmico (Bias)", definition: "Distorção sistemática nas saídas do modelo que privilegia ou estigmatiza determinados grupos demográficos ou regiões." },
      { term: "Dados de Treinamento", definition: "A coleção massiva de textos, livros e sites que serviram para alimentar o modelo de inteligência artificial durante seu aprendizado." },
      { term: "Estereótipo", definition: "Generalização simplificada, preconceituosa e redutora sobre os comportamentos ou características de uma comunidade." },
      { term: "Sub-representação", definition: "Ausência ou presença ínfima de determinados povos, sotaques ou realidades geográficas nas bases de dados da IA." },
      { term: "Saber Tradicional", definition: "Corpo de conhecimentos empíricos e ancestrais desenvolvidos por comunidades ribeirinhas, quilombolas e originárias ao longo de séculos." },
      { term: "Cidadania Algorítmica", definition: "Atitude ativa do cidadão de auditar, questionar e exigir transparência e equidade nos sistemas tecnológicos que impactam a sociedade." }
    ],
    practicalMission: {
      title: "Missão Prática: O Caçador de Vieses",
      steps: [
        "Escolha um dos 4 tipos de viés (gênero, raça, cultura ou região).",
        "Escreva um prompt neutro de 1 linha (ex: 'Escreva um parágrafo sobre o dia a dia de um estudante brilhante').",
        "Analise a resposta com o roteiro de 4 perguntas: Quem foi o protagonista? Onde ele mora?",
        "Agora reescreva o comando aplicando uma 'Frase Mágica' de diversidade amazônica.",
        "Compare os dois resultados lado a lado e mostre a diferença de riqueza cultural aos colegas."
      ],
      quote: "A tecnologia do futuro será tão justa quanto as pessoas que aprenderem a questioná-la. Essa pessoa é você."
    }
  },
  {
    id: 4,
    slug: "projeto-final-chatbot",
    title: "Módulo 4 — Projeto Final",
    subtitle: "Construindo Seu Próprio Chatbot Comunitário",
    shortDescription: "Passe para o outro lado do balcão: defina problemas reais do bairro, monte a árvore de decisão do igarapé, redija o prompt de sistema blindado e teste com moradores reais.",
    hours: 6,
    badge: "Projeto Prático & Prototipagem",
    color: {
      primary: "from-purple-600 to-violet-800",
      accent: "text-purple-700",
      light: "bg-purple-50",
      border: "border-purple-200"
    },
    keyTopics: [
      "De usuário a projetista: o que é (e o que NÃO é) um chatbot",
      "O Teste dos Três Dedos para problemas reais do bairro",
      "Mapeando a Jornada e a Persona real (Dona Raimunda da Terra Firme)",
      "A Árvore de Decisão: O igarapé e seus furos (Nó, Ramo e Folha)",
      "O Ramo de Emergência vem PRIMEIRO (SAMU 192 e CVV 188)",
      "O Prompt de Sistema Profissional em 6 Partes",
      "Os 4 Testes Obrigatórios de Estresse do Bot",
      "Teste de Campo com 5 Moradores (A Regra de Ficar Calado)"
    ],
    sections: [
      {
        id: "de-usuario-a-projetista",
        title: "1. Você Chegou ao Grand Finale: De Usuário a Projetista",
        subtitle: "Saia do lugar de quem consome e ocupe o lugar de quem constrói",
        tag: "Virada de Chave",
        content: [
          "Nos módulos anteriores você aprendeu a abrir a caixa-preta, a comandar com a Matriz PACIF e a caçar vieses. Agora vem a virada fundamental: você passa para o outro lado do balcão.",
          "Um chatbot NÃO é apenas uma tela de conversa aberta. Um chatbot de verdade é um programa conversacional construído para resolver um objetivo específico de gente real."
        ],
        analogy: {
          title: "O Agente Comunitário de Saúde do Bairro",
          description: "Pense no agente de saúde que bate na porta da casa da sua família. Ele não é médico cirurgião e não prescreve remédios de tarja preta. Mas ele sabe exatamente três coisas fundamentais: que perguntas fazer para acolher a família, o que responder sobre as consultas de rotina e vacinas e — o mais importante de tudo — a hora exata de parar e encaminhar com urgência para a UPA ou SAMU. Um bom chatbot comunitário é esse agente de saúde."
        },
        highlight: "Estatística crucial: 7 em cada 10 pessoas que abandonam um atendimento automatizado dizem que o robô não entendeu o que elas precisavam. O que derruba um bot não é o código; é o planejamento da conversa."
      },
      {
        id: "tres-tipos-bot",
        title: "2. Os Três Tipos de Chatbot: Por que o Híbrido Vence?",
        subtitle: "A combinação perfeita entre segurança nos dados e acolhimento na fala",
        tag: "Arquitetura",
        content: [
          "Para serviços públicos e informações do bairro, precisamos entender os modelos de construção:"
        ],
        table: {
          headers: ["Tipo de Bot", "Como Funciona", "Quando faz sentido usar"],
          rows: [
            ["Baseado em Regras (Menu)", "Segue uma árvore fixa de botões ('Digite 1 para horários, 2 para endereço').", "Para dados hipercríticos que não podem ter variação (ex: horários exatos de vacina)."],
            ["Baseado em IA Pura", "Usa um modelo livre para responder qualquer pergunta digitada pelo usuário.", "Quando as pessoas formulam a dúvida de dezenas de formas diferentes na gíria local."],
            ["Híbrido (O Escolhido no Curso)", "Combina o acolhimento natural da IA para entender a fala do povo com uma base factual conferida para os dados rígidos.", "É o padrão ouro: evita que a IA invente horários falsos de postos de saúde, garantindo acolhimento e verdade."]
          ]
        }
      },
      {
        id: "teste-tres-dedos",
        title: "3. Escolhendo o Problema: O Teste dos Três Dedos",
        subtitle: "Foco no problema pequeno e real da nossa rua, não em sonhos impossíveis",
        tag: "Planejamento",
        content: [
          "O erro clássico de alunos iniciantes é escolher temas gigantescos como 'acabar com o lixo do mundo'. Projetos sérios resolvem dores concretas de pessoas concretas.",
          "Antes de aprovar sua ideia, conte nos três dedos:"
        ],
        tips: [
          "Dedo 1: Você consegue citar o nome de uma pessoa de carne e osso do seu bairro que sofre com esse problema hoje?",
          "Dedo 2: Essa pessoa perde tempo, dinheiro, saúde ou oportunidade por causa da falta dessa informação?",
          "Dedo 3: A resposta cabe em uma base de dados oficial que você e sua equipe conseguem conferir pessoalmente?"
        ],
        codeOrPrompt: {
          type: 'comparison',
          title: "Da Ideia Vaga ao Problema Afiado",
          badExample: "Vago: 'Quero fazer um bot de saúde para o Guamá.' (Impossível de construir, escopo infinito)",
          goodExample: "Afiado: 'Meu chatbot ajuda moradores que trabalham cedo na Terra Firme a saber o horário exato da vacinação infantil e os documentos necessários na UBS, porque hoje perdem o dia de serviço indo à toa.'",
          explanation: "Fórmula de ouro: 'Meu chatbot ajuda [QUEM] a [FAZER O QUÊ], porque hoje essa pessoa [QUAL DIFICULDADE REAL].'"
        }
      },
      {
        id: "jornada-dona-raimunda",
        title: "4. Mapeando a Jornada e a Fala do Usuário Real",
        subtitle: "Se o seu bot só entende português de prova, ele quebra no primeiro teste",
        tag: "Experiência do Usuário (UX)",
        content: [
          "Projetamos para quem realmente vai usar a ferramenta no ponto de ônibus com pressa, pouca bateria e internet 3G oscilando."
        ],
        analogy: {
          title: "A Persona da Dona Raimunda (52 anos, Terra Firme)",
          description: "Dona Raimunda é diarista, sai de casa às 5h da manhã. Usa WhatsApp no celular, digita devagar e prefere mandar áudio. Ela não tem paciência nem dados móveis para menus gigantes. Ela só quer saber se a UBS abre no sábado antes de gastar duas passagens de ônibus. Se o bot demorar mais de três trocas de mensagem, ela desiste."
        },
        table: {
          headers: ["Como o projetista ingênuo imagina", "Como a pessoa realmente digita no WhatsApp"],
          rows: [
            ["'Prezados, quais são os horários de funcionamento da Unidade Básica?'", "'o posto abre sabado?'"],
            ["'Poderia me informar a lista de certidões necessárias?'", "'ubs guama precisa de q docto hj?'"],
            ["'Gostaria de saber onde me vacinar contra a gripe.'", "'tem vacina no postinho?'"]
          ]
        }
      },
      {
        id: "arvore-decisao-igarape",
        title: "5. A Árvore de Decisão: O Igarapé e seus Furos",
        subtitle: "Nós, Ramos e Folhas: estruturando os caminhos da conversa",
        tag: "Lógica de Conversação",
        content: [
          "A árvore de decisão é o esqueleto lógico do chatbot. Ela é formada por três componentes:",
          "• Nó: Ponto onde a conversa se divide em uma pergunta ou intenção identificada.",
          "• Ramo: O caminho tomado a partir de cada escolha.",
          "• Folha: O ponto final onde a informação útil e verificada é entregue ao cidadão."
        ],
        analogy: {
          title: "O Igarapé e seus Furos",
          description: "Um rio na Amazônia se abre em furos e igarapés. Quem pilota a bajara precisa conhecer quais furos levam à comunidade e quais furos terminam em terra seca. A árvore de decisão garante que nenhum ramo do seu chatbot termine em um 'beco sem saída' onde o morador fica abandonado."
        },
        highlight: "A REGRA DE OURO DA EMERGÊNCIA: Em bots comunitários, o ramo de urgência médica (dor no peito, falta de ar, desmaio) DEVE ser conferido antes de qualquer outra resposta, encaminhando imediatamente para o SAMU 192 ou UPA!"
      },
      {
        id: "prompt-sistema-profissional",
        title: "6. O Prompt de Sistema Profissional em 6 Partes",
        subtitle: "A alma da máquina: a instrução mestra que governa todas as conversas",
        tag: "Engenharia de Prompt",
        content: [
          "Diferente de um prompt comum que serve para uma pergunta, o Prompt de Sistema comanda todas as interações do assistente. Ele deve conter 6 partes fundamentais:"
        ],
        tips: [
          "1. [PAPEL]: Quem o assistente é, sua identidade comunitária e para quem trabalha.",
          "2. [ESCOPO]: A lista fechada do que ele responde (e a recusa gentil para assuntos fora).",
          "3. [TOM]: Simples, acolhedor, em frases curtas, falando como um vizinho prestativo.",
          "4. [REGRAS DE SEGURANÇA]: Proibições rígidas (nunca dar diagnóstico, nunca pedir CPF, acionar SAMU se houver sintomas graves).",
          "5. [BASE DE CONHECIMENTO]: A única fonte de fatos que o bot tem autorização para usar, com a data da conferência.",
          "6. [FORMATO]: Resposta em até 4 linhas, com menu claro de próximos passos."
        ],
        codeOrPrompt: {
          type: 'system',
          title: "O Padrão Ouro: Prompt do 'Guia Saúde Guamá'",
          raw: `[PAPEL]
Você é o "Guia Saúde Guamá", assistente comunitário criado por estudantes do ensino médio para informar moradores do bairro do Guamá em Belém sobre postos de saúde.

[ESCOPO — responda APENAS sobre]
1. Horários e endereços das UBS cadastradas na base.
2. Documentos necessários para consulta.
3. Vacinação e campanhas ativas.
Para qualquer outro assunto: recuse com gentileza e oriente ligar 136 (Disque Saúde).

[REGRAS DE SEGURANÇA — PRIORIDADE MÁXIMA]
- NUNCA forneça diagnósticos, avalie sintomas ou receite remédios.
- Se o usuário mencionar dor no peito, falta de ar, sangramento ou desmaio, PARE TUDO e responda: "Isso pode ser uma emergência médica. Ligue agora para o SAMU 192 ou procure a UPA mais próxima. Não espere resposta por aqui!"
- NUNCA solicite dados pessoais como CPF, RG ou endereço residencial.
- Se a informação não estiver na BASE abaixo, use a frase de recuo: "Não tenho essa informação confirmada no momento. Por favor, confirme no Disque Saúde 136." NUNCA invente horários.

[BASE DE CONHECIMENTO CONFERIDA]
- UBS Guamá: Rua Barão de Igarapé-Miri | Seg a Sex: 07h às 17h | Sábado: Fechado.
- UBS Terra Firme: Passagem São Silvestre | Seg a Sex: 07h às 17h | Sábado: 08h às 12h.
- Documentos obrigatórios: Cartão do SUS, RG com foto e comprovante de residência.
// Dados conferidos na fonte oficial municipal em março de 2026.

[FORMATO]
Máximo de 4 linhas por resposta. Direto, sem enrolação.`
        }
      },
      {
        id: "testes-e-campo",
        title: "7. Testes Obrigatórios e Teste de Campo com Moradores",
        subtitle: "A regra de ouro: fique de boca fechada e deixe o usuário testar",
        tag: "Validação Prática",
        content: [
          "Antes de levar seu projeto para a banca, execute os 4 testes de estresse:",
          "1. Teste de Fora de Escopo: 'Quem ganhou o Re-Pa de ontem?' → O bot deve recusar amavelmente.",
          "2. Teste da Emergência Disfarçada: 'Tô com uma dor aguda no peito, o posto tá aberto?' → O bot DEVE acionar o SAMU 192 e ignorar a pergunta do horário.",
          "3. Teste da Informação Inexistente: 'Qual o WhatsApp pessoal do dentista da UBS?' → O bot DEVE usar a frase de recuo e nunca inventar um telefone.",
          "4. Teste de Dados Pessoais: 'Meu CPF é 000.111.222-33' → O bot deve alertar para não enviar documentos."
        ],
        highlight: "A Regra de Ouro do Teste de Campo: Quando sentar com 5 moradores do bairro para testar seu protótipo, fique de boca fechada! Não ajude nem dê dicas. Toda vez que você precisa explicar como usar, você encontrou uma falha no seu projeto."
      }
    ],
    quiz: [
      {
        id: "m4-q1",
        question: "Um usuário digita no chatbot do posto de saúde: 'Tô sentindo uma pontada forte no peito e falta de ar, a UBS abre às 7h?'. Qual deve ser a atitude imediata do bot bem projetado?",
        options: [
          { label: "A", text: "Responder primeiro que a UBS abre às 7h e, no finalzinho, colocar um aviso médico" },
          { label: "B", text: "Interromper qualquer resposta de horário e acionar imediatamente o encaminhamento de emergência para o SAMU 192 ou UPA" },
          { label: "C", text: "Pedir para o usuário enviar o CPF e a foto da carteirinha do SUS" },
          { label: "D", text: "Dizer que não entendeu a pergunta e pedir para digitar de novo" }
        ],
        correctAnswer: "B",
        explanation: "Correto! A regra de segurança de emergência tem prioridade máxima absoluta. Responder o horário manteria uma pessoa com sintomas cardíacos graves esperando em casa."
      },
      {
        id: "m4-q2",
        question: "Por que a informação factual de um chatbot comunitário deve vir exclusivamente de uma 'Base de Conhecimento' conferida e não da memória aberta do modelo de IA?",
        options: [
          { label: "A", text: "Porque os modelos abertos de IA não conseguem ler em língua portuguesa" },
          { label: "B", text: "Porque a IA alucina e pode inventar horários, dias de funcionamento e endereços inexistentes com grande convicção" },
          { label: "C", text: "Porque bases de conhecimento diminuem o tamanho da fonte do aplicativo" },
          { label: "D", text: "Não há diferença, a IA nunca erra horários de repartições públicas" }
        ],
        correctAnswer: "B",
        explanation: "Exatamente! Como aprendido no Módulo 1, a IA é uma calculadora de probabilidade que não tem compromisso intrínseco com a verdade fática. Dados como horário de vacina exigem base conferida."
      }
    ],
    glossary: [
      { term: "Chatbot", definition: "Sistema de software que mantém interações em linguagem natural com humanos para atingir um objetivo específico." },
      { term: "Chatbot Híbrido", definition: "Arquitetura que combina processamento de linguagem natural (IA) para compreensão flexível da fala com bases de dados conferidas para saídas confiáveis." },
      { term: "Persona", definition: "Personificação semi-ficcional e detalhada do perfil de usuário atendido pelo sistema, com suas rotinas, limitações e urgências." },
      { term: "Árvore de Decisão", definition: "Representação lógica em grafo contendo nós (pontos de escolha), ramos (caminhos possíveis) e folhas (entregas de valor)." },
      { term: "Prompt de Sistema", definition: "Instrução permanente de alto nível que molda o comportamento, regras de salvaguarda e tom de um assistente virtual em todas as suas sessões." },
      { term: "Frase de Recuo", definition: "Resposta padronizada que a IA utiliza com transparência quando um dado solicitado não consta na sua base de fatos conferidos." },
      { term: "Beco sem Saída (Dead End)", definition: "Falha de design em que a interface interrompe a jornada do usuário em um erro sem oferecer alternativas ou canais humanos de contato." }
    ],
    practicalMission: {
      title: "Missão Final: Construa, Valide e Apresente para a Comunidade",
      steps: [
        "Defina sua frase-problema com o Teste dos Três Dedos focada em Belém ou no seu bairro.",
        "Desenhe a árvore de decisão no papel com os 5 momentos da jornada e o ramo de emergência no topo.",
        "Escreva o Prompt de Sistema nas 6 partes, incluindo sua base de dados conferida e data de revisão.",
        "Teste o bot contra os 4 testes obrigatórios (fora de escopo, emergência disfarçada, falta de dados e dados pessoais).",
        "Apresente seu projeto em 5 minutos para a turma demonstrando uma recusa segura e responsável."
      ],
      quote: "Você começou este curso perguntando o que a IA pode fazer por você. Termina perguntando o que você pode construir com ela para o seu bairro."
    }
  }
];

export const PROBLEM_BANK = [
  {
    theme: "Educação & Escola",
    problem: "Alunos do 3º ano do ensino médio perdem os prazos de inscrição ou pedido de isenção do ENEM por falta de clareza nas datas e documentos.",
    beneficiary: "Estudantes secundaristas de escolas públicas de Belém",
    scope: "Calendário oficial do ENEM, lista de documentos para isenção, passos no portal do Inep"
  },
  {
    theme: "Saúde Comunitária",
    problem: "Moradores que trabalham cedo perdem o dia de serviço indo à UBS apenas para descobrir que o posto fecha ao meio-dia ou não tem médico naquele turno.",
    beneficiary: "Famílias e trabalhadores dos bairros Guamá e Terra Firme",
    scope: "Horários de atendimento, calendário de vacina infantil, documentos exigidos"
  },
  {
    theme: "Mobilidade Urbana",
    problem: "Estudantes e trabalhadores têm dificuldade de descobrir quais linhas de ônibus municipais passam na sua rua e como cadastrar a meia-passagem estudantil.",
    beneficiary: "Usuários de transporte público da Região Metropolitana de Belém",
    scope: "Itinerários de linhas principais, postos do Passe Fácil, documentos para 2ª via"
  },
  {
    theme: "Meio Ambiente & Resíduos",
    problem: "Descarte irregular de entulho e óleo de cozinha nos canais e igarapés por falta de conhecimento dos ecopontos e dias da coleta seletiva.",
    beneficiary: "Comunidades vizinhas a canais fluviais e bacias urbanas",
    scope: "Endereços dos Ecopontos municipais, cronograma da coleta seletiva, canais de denúncia"
  },
  {
    theme: "Cultura & Identidade Paraense",
    problem: "Visitantes e novos moradores desconhecem o funcionamento das feiras livres históricas, o significado dos ritos do Círio e a gastronomia ancestral.",
    beneficiary: "Turistas, estudantes e novos habitantes da capital paraense",
    scope: "Guia da Feira do Ver-o-Peso, glossário de termos caboclos e paraenses, roteiros culturais"
  },
  {
    theme: "Primeiro Emprego & Renda",
    problem: "Jovens de 16 a 24 anos encontram dificuldades para formatar seu primeiro currículo e entender os direitos do programa Jovem Aprendiz.",
    beneficiary: "Juventude em busca de qualificação e inserção profissional",
    scope: "Estrutura básica de currículo sem experiência, documentos necessários (CTPS Digital), direitos do estagiário"
  }
];
