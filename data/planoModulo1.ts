/**
 * Plano de aula do Módulo 1 — Roteiro do Professor.
 *
 * Fonte: página pública do Notion "Módulo 1 — Fundamentos (Roteiro do
 * Professor)" (workspace profbrunopereira), lida em 16/11/2026, e a apostila
 * oficial do Módulo 1. Para trocar um link, edite só este arquivo.
 *
 * Status de cada ferramenta:
 * - "pronto": já existe e o link funciona (conferido);
 * - "no-site": substituída por uma atividade interativa da página da turma;
 * - "criar": precisa ser criada na conta do professor (instruções na página).
 */

import type { QuizQuestion } from './courseData';

export const SITE_URL = 'https://abner-lucas.github.io/letramento-digital-em-ia';
export const NOTION_URL =
  'https://app.notion.com/p/profbrunopereira/M-dulo-1-Fundamentos-Roteiro-do-Professor-3f2dde8b8c80819b8686d7c7183ad651';

export type Status = 'pronto' | 'no-site' | 'criar';

export interface Recurso {
  nome: string;
  status: Status;
  /** Link externo (quando existe). */
  url?: string;
  /** Âncora da atividade equivalente na página da turma. */
  ancora?: string;
  /** Passo a passo para criar na própria conta. */
  comoCriar?: string[];
}

export interface Bloco {
  inicio: number;
  fim: number;
  titulo: string;
  ferramenta?: string;
  descricao: string[];
  recursos?: Recurso[];
  /** Bloco proposto aqui para completar o roteiro (não está no Notion). */
  sugestao?: boolean;
}

export interface Encontro {
  id: 'encontro-1' | 'encontro-2';
  numero: 1 | 2;
  titulo: string;
  topicos: string;
  objetivo: string;
  duracao: number;
  selo: string;
  ferramentas: string[];
  blocos: Bloco[];
}

export const PLANO = {
  titulo: 'Módulo 1 — Fundamentos (Roteiro do Professor)',
  resumo:
    'Roteiro do professor para 2 encontros presenciais de 150 minutos, cobrindo os Tópicos 3 a 8 do Módulo 1 — "Como a Inteligência Artificial Pensa?" (os Tópicos 1 e 2 já foram vistos em encontro anterior).',
  logica:
    'O Encontro 1 foca em como a IA funciona por dentro (tipos, tokens, embeddings, pipeline completo). O Encontro 2 foca em como usar a IA com critério (alucinações, limites, ética). Ambos seguem o mesmo formato já testado nos módulos anteriores: blocos curtos, oficinas práticas com celular, ferramentas digitais no lugar de material físico e uma avaliação gamificada com selo digital ao final.',
};

const KAHOOT_PASSOS = [
  'Entre em kahoot.com (ou quizizz.com) com a sua conta e clique em "Criar" → "Kahoot".',
  'Use as perguntas desta página (estão na página da turma) — copie enunciado, alternativas e marque a correta.',
  'Salve, clique em "Iniciar" → "Modo clássico" e cole o link de compartilhamento aqui no arquivo data/planoModulo1.ts.',
  'Se preferir não criar: projete a página da turma — o quiz dela funciona no celular de cada aluno, sem cadastro.',
];

export const ENCONTROS: Encontro[] = [
  {
    id: 'encontro-1',
    numero: 1,
    titulo: 'Por Dentro da Máquina: Tokens e o Caminho da Resposta',
    topicos: 'Tópicos 3 (Os diferentes tipos de IA), 4 (Como a IA "lê" o que você escreve: os tokens) e 5 (O passo a passo: o que acontece quando você digita)',
    objetivo:
      'O aluno distingue os diferentes tipos de IA do dia a dia, explica o que é um token e um embedding, e descreve o caminho completo que a IA percorre entre a pergunta e a resposta.',
    duracao: 150,
    selo: 'Explorador de Tokens — Nível 1',
    ferramentas: [
      'Mentimeter — nuvem de palavras da abertura',
      'Padlet — mural de classificação dos tipos de IA',
      'Tiktokenizer ou OpenAI Tokenizer — oficina de tokens, direto no celular',
      'tldraw — agrupamento de embeddings + desenho do pipeline',
      'Kahoot ou Quizizz — quiz gamificado',
      'Canva — selo digital "Explorador de Tokens — Nível 1"',
      'Google Forms — ficha da oficina de tokens',
      'Celulares/notebooks liberados nas oficinas',
    ],
    blocos: [
      {
        inicio: 0,
        fim: 10,
        titulo: 'Abertura — "Qual IA você já usou hoje sem perceber?"',
        ferramenta: 'Mentimeter',
        descricao: [
          'Abra uma nuvem de palavras no Mentimeter perguntando: "Qual app de IA você usou nas últimas 24h?". Colete as respostas ao vivo (Spotify, Instagram, Google Maps, Face ID etc.) e conecte: "muita gente nem percebe quantas IAs diferentes já usa todos os dias".',
        ],
        recursos: [{ nome: 'Mentimeter — "Qual app de IA você usou nas últimas 24h?"', status: 'pronto', url: 'https://www.menti.com/alb7kv6n4ejp' }],
      },
      {
        inicio: 10,
        fim: 30,
        titulo: 'Os diferentes tipos de IA',
        ferramenta: 'Padlet classificatório',
        descricao: [
          'Monte um Padlet com 6 colunas: IA de linguagem, de imagem, de recomendação, de rotas, de voz, de busca. Cada grupo pensa em 2 apps que usa no dia a dia e posta na coluna certa, pelo próprio celular.',
          'Puxe 2 ou 3 exemplos em plenária, reforçando que o curso foca na "IA de linguagem".',
        ],
        recursos: [{ nome: 'Padlet "Tipos de IA"', status: 'pronto', url: 'https://padlet.com/eubrunodiego/tipos-de-ia-s023palb78lp1l9cmohr' }],
      },
      {
        inicio: 30,
        fim: 70,
        titulo: 'Oficina dos tokens',
        ferramenta: 'Duplas, com celular',
        descricao: [
          'Cada dupla acessa um tokenizador online e testa 3 palavras regionais (ex.: açaí, igarapé, Guamá, cupuaçu) e 3 palavras comuns (ex.: computador, felicidade, inteligência).',
          'Anotam quantos tokens cada palavra virou e se alguma palavra regional "quebrou" em mais pedaços que o esperado. Os tokenizadores rodam no navegador do celular, sem instalar nada.',
          'Cada dupla preenche a "Ficha Encontro 1".',
        ],
        recursos: [
          { nome: 'Tiktokenizer', status: 'pronto', url: 'https://tiktokenizer.vercel.app/' },
          { nome: 'OpenAI Tokenizer', status: 'pronto', url: 'https://platform.openai.com/tokenizer' },
          {
            nome: 'Ficha Encontro 1 (oficina de tokens)',
            status: 'no-site',
            ancora: 'ficha-tokens',
            comoCriar: [
              'Em forms.google.com, crie o formulário "Ficha Encontro 1 — Oficina de tokens".',
              'Perguntas: nomes da dupla; para cada uma das 6 palavras, "palavra" e "nº de tokens"; "Alguma palavra regional quebrou em mais pedaços que o esperado? Qual?".',
              'Clique em "Enviar" → ícone de link → copie e cole o link em data/planoModulo1.ts.',
              'Enquanto isso, use a ficha da página da turma: ela gera um texto pronto para a dupla enviar.',
            ],
          },
        ],
      },
      {
        inicio: 70,
        fim: 90,
        titulo: 'Embeddings — o mapa das palavras',
        ferramenta: 'tldraw',
        descricao: [
          'Em grupos, abrem um quadro com estas 12 palavras soltas: rio, igarapé, furo, açaí, cupuaçu, bacuri, carro, ônibus, bicicleta, escola, professor, aluno. Agrupam visualmente as que "têm a ver" umas com as outras — antes de qualquer explicação técnica.',
          'Depois, revele o conceito de embedding ("mapa de coordenadas da floresta", do material) e compare com o agrupamento que os grupos fizeram sozinhos.',
        ],
        recursos: [
          {
            nome: 'Mapa de embeddings',
            status: 'no-site',
            ancora: 'embeddings',
            comoCriar: [
              'Em tldraw.com, crie um quadro e escreva as 12 palavras soltas, cada uma numa nota.',
              'Clique em "Share" → "Copy link" (modo de edição para os grupos).',
              'Cole o link em data/planoModulo1.ts. A atividade da página da turma faz o mesmo agrupamento sem precisar do tldraw.',
            ],
          },
        ],
      },
      {
        inicio: 90,
        fim: 120,
        titulo: 'O caminho completo: do seu texto à resposta',
        ferramenta: 'tldraw',
        descricao: [
          'Cada grupo recebe a mesma frase — "Escreva um poema sobre o rio Guamá" — e desenha os 5 passos do pipeline do material: (1) quebra em tokens, (2) vira números (embeddings), (3) cálculo de padrões, (4) palavra por palavra, (5) resposta pronta.',
        ],
        recursos: [
          {
            nome: 'Pipeline em 5 passos',
            status: 'no-site',
            ancora: 'pipeline',
            comoCriar: ['Em tldraw.com, crie um quadro com a frase no topo e 5 caixas vazias ligadas por setas; compartilhe o link como no bloco anterior.'],
          },
        ],
      },
      {
        inicio: 120,
        fim: 145,
        titulo: 'Avaliação gamificada — Quiz',
        ferramenta: 'Kahoot ou Quizizz',
        descricao: [
          'Quiz de 7 a 8 perguntas misturando a pergunta oficial 1 do "Teste seu conhecimento" do material (a primeira coisa que a IA faz com o texto é quebrá-lo em tokens) com perguntas novas sobre tipos de IA, embeddings e as etapas do pipeline. Cada aluno joga pelo próprio celular.',
        ],
        recursos: [{ nome: 'Quiz do Encontro 1 (8 perguntas)', status: 'no-site', ancora: 'quiz-1', comoCriar: KAHOOT_PASSOS }],
      },
      {
        inicio: 145,
        fim: 150,
        titulo: 'Selo digital + gancho para o Encontro 2',
        ferramenta: 'Canva',
        descricao: [
          'Gere o emblema digital "Explorador de Tokens — Nível 1" e envie para quem conquistou.',
          'Anuncie: "no próximo encontro vamos descobrir por que a IA às vezes erra com toda a confiança do mundo — e o que fazer sobre isso".',
        ],
        recursos: [{ nome: 'Gerador do selo "Explorador de Tokens — Nível 1"', status: 'no-site', ancora: 'selo-1' }],
      },
    ],
  },
  {
    id: 'encontro-2',
    numero: 2,
    titulo: 'Limites, Pensamento Crítico e Uso Ético',
    topicos: 'Tópicos 6 (Por que a IA erra? Alucinações e limites), 7 (A IA não pensa como gente — e tudo bem) e 8 (Uso ético e responsável: as regras de ouro)',
    objetivo:
      'O aluno reconhece quando uma IA pode alucinar, entende por que ela não "pensa" como um ser humano e aplica as 4 regras de ouro do uso responsável em situações reais.',
    duracao: 150,
    selo: 'Pensador Crítico de IA — Nível 2',
    ferramentas: [
      'Mentimeter — retomada ativa',
      'Padlet — mural "arriscado x seguro" + casos do dia a dia',
      'ChatGPT, Claude, Gemini ou DeepSeek — oficina da caça às alucinações',
      'Kahoot ou Quizizz — quiz gamificado',
      'Canva — selo digital "Pensador Crítico de IA — Nível 2"',
      'Google Forms — ficha da oficina',
      'Celulares/notebooks liberados nas oficinas',
    ],
    blocos: [
      {
        inicio: 0,
        fim: 10,
        titulo: 'Retomada ativa — Quiz relâmpago de recall',
        ferramenta: 'Mentimeter',
        descricao: ['Abra uma pergunta rápida no Mentimeter: "O que é um token?" (nuvem de palavras ou múltipla escolha). Use as respostas para reativar o que foi visto no Encontro 1 antes de seguir.'],
        recursos: [{ nome: 'Mentimeter — "Em uma palavra: o que é um token?"', status: 'pronto', url: 'https://www.menti.com/alo5t7nsmjck' }],
      },
      {
        inicio: 10,
        fim: 40,
        titulo: 'Caça às alucinações',
        ferramenta: 'Duplas, com celular',
        descricao: [
          'Cada dupla testa na IA: uma "pergunta arriscada" do material (ex.: "quantos habitantes tem o bairro X exatamente?"), a versão "pergunta segura" equivalente e uma pergunta hiperlocal própria, tentando provocar uma alucinação de propósito.',
          'Verificam se a resposta é real com uma busca rápida.',
        ],
        recursos: [
          { nome: 'ChatGPT', status: 'pronto', url: 'https://chat.openai.com' },
          { nome: 'Gemini', status: 'pronto', url: 'https://gemini.google.com' },
          { nome: 'Claude', status: 'pronto', url: 'https://claude.ai' },
          { nome: 'DeepSeek', status: 'pronto', url: 'https://chat.deepseek.com' },
          {
            nome: 'Ficha da oficina (caça às alucinações)',
            status: 'no-site',
            ancora: 'ficha-alucinacoes',
            comoCriar: [
              'Em forms.google.com, crie "Ficha Encontro 2 — Caça às alucinações".',
              'Perguntas: nomes da dupla; IA usada; pergunta arriscada + resposta + "era verdade?"; pergunta segura + resposta; pergunta hiperlocal + "a IA alucinou? Como você descobriu?".',
              'Copie o link de envio e cole em data/planoModulo1.ts.',
            ],
          },
        ],
      },
      {
        inicio: 40,
        fim: 55,
        titulo: 'Quando desconfiar mais',
        ferramenta: 'Padlet classificatório',
        descricao: [
          'Padlet com 2 colunas: "Pergunta arriscada" × "Pergunta segura". Cada dupla posta 1 exemplo novo (além do que já testou) em cada coluna, usando as 4 categorias do material como guia: números específicos, fatos recentes, assuntos muito locais, citações/referências.',
        ],
        recursos: [
          {
            nome: 'Padlet "Arriscado x Seguro"',
            status: 'criar',
            ancora: 'arriscado-seguro',
            comoCriar: [
              'Em padlet.com, clique em "Criar" → "Colunas". Título: "Arriscado x Seguro".',
              'Crie as colunas "Pergunta arriscada" e "Pergunta segura".',
              'Em "Compartilhar", libere "Pode escrever" para quem tem o link e copie o link.',
              'Cole o link em data/planoModulo1.ts. Enquanto isso, a página da turma tem um classificador com as 4 categorias.',
            ],
          },
        ],
      },
      {
        inicio: 55,
        fim: 70,
        titulo: 'A IA não pensa como gente',
        ferramenta: 'Discussão coletiva',
        descricao: [
          'Leia em voz alta: "A IA não é mais inteligente que você. Ela é mais rápida. A inteligência crítica continua sendo sua."',
          'Abra a discussão com a "pergunta para levar para casa" do material: se a IA repete os padrões da internet, que tem tanto conteúdo bom quanto ruim, o que pode aparecer nas respostas dela?',
        ],
      },
      {
        inicio: 70,
        fim: 100,
        titulo: 'As regras de ouro + casos do dia a dia',
        ferramenta: 'Quiz ao vivo',
        descricao: [
          'Apresente rapidamente as 4 regras de ouro do material (confira sempre, assuma a autoria, proteja seus dados, respeite as pessoas).',
          'Em seguida, rode um quiz com os 5 "casos do dia a dia" da tabela do material como perguntas de certo ou errado, mais 2 ou 3 novas.',
        ],
        recursos: [{ nome: 'Quiz "Casos do dia a dia" (8 casos)', status: 'no-site', ancora: 'quiz-2', comoCriar: KAHOOT_PASSOS }],
      },
      {
        inicio: 100,
        fim: 125,
        titulo: 'Fechamento da oficina — ficha e socialização',
        ferramenta: 'Google Forms',
        sugestao: true,
        descricao: [
          'As duplas registram a ficha da caça às alucinações e 2 ou 3 duplas contam a alucinação mais convincente que encontraram e como descobriram que era falsa.',
        ],
        recursos: [{ nome: 'Ficha da oficina (caça às alucinações)', status: 'no-site', ancora: 'ficha-alucinacoes' }],
      },
      {
        inicio: 125,
        fim: 145,
        titulo: 'Desafio final — o módulo inteiro',
        ferramenta: 'Quiz',
        sugestao: true,
        descricao: [
          'Rodada final com as duas perguntas oficiais do "Teste seu conhecimento" da apostila (tokens e a alucinação do "rio Guamá com 1.247 km"), para fechar o Módulo 1.',
        ],
        recursos: [{ nome: 'Quiz final do Módulo 1', status: 'no-site', ancora: 'quiz-final' }],
      },
      {
        inicio: 145,
        fim: 150,
        titulo: 'Selo digital + gancho para o Módulo 2',
        ferramenta: 'Canva',
        sugestao: true,
        descricao: [
          'Entregue o selo "Pensador Crítico de IA — Nível 2" e anuncie o próximo tema: a matriz PACIF — "agora que vocês sabem como a IA pensa, vão aprender a comandá-la".',
        ],
        recursos: [{ nome: 'Gerador do selo "Pensador Crítico de IA — Nível 2"', status: 'no-site', ancora: 'selo-2' }],
      },
    ],
  },
];

/** Quiz do Encontro 1: pergunta oficial da apostila + perguntas novas sobre tipos, tokens, embeddings e pipeline. */
export const QUIZ_ENCONTRO_1: QuizQuestion[] = [
  {
    id: 'e1-q1',
    question: 'Quando você digita uma pergunta, qual é a PRIMEIRA coisa que a IA faz com o seu texto?',
    options: [
      { label: 'A', text: 'Procura a resposta pronta em um banco de dados' },
      { label: 'B', text: 'Quebra o texto em pedacinhos chamados tokens' },
      { label: 'C', text: 'Liga para um atendente humano' },
      { label: 'D', text: 'Copia a resposta de um site da internet' },
    ],
    correctAnswer: 'B',
    explanation: 'Pergunta oficial da apostila. Antes de tudo, a IA "rala" o texto em tokens — como a mandioca vira farinha.',
  },
  {
    id: 'e1-q2',
    question: 'O app de mapas que calcula o caminho com menos trânsito é um exemplo de qual tipo de IA?',
    options: [
      { label: 'A', text: 'IA de linguagem' },
      { label: 'B', text: 'IA de imagem' },
      { label: 'C', text: 'IA de rotas' },
      { label: 'D', text: 'IA de voz' },
    ],
    correctAnswer: 'C',
    explanation: 'A IA de rotas calcula o melhor caminho no aplicativo de mapas, evitando o trânsito.',
  },
  {
    id: 'e1-q3',
    question: 'O app de música que sugere a próxima faixa usa principalmente…',
    options: [
      { label: 'A', text: 'IA de recomendação' },
      { label: 'B', text: 'IA de busca' },
      { label: 'C', text: 'IA de rotas' },
      { label: 'D', text: 'Nenhuma IA' },
    ],
    correctAnswer: 'A',
    explanation: 'A IA de recomendação sugere a próxima música, o próximo vídeo, o próximo produto.',
  },
  {
    id: 'e1-q4',
    question: 'Na apostila, por que a palavra "açaízeiro" pode ser montada pela IA mesmo que ela nunca a tenha visto?',
    options: [
      { label: 'A', text: 'Porque a IA consulta um dicionário paraense' },
      { label: 'B', text: 'Porque ela junta pedaços que já conhece, como "açaí" + "zeiro"' },
      { label: 'C', text: 'Porque toda palavra vira exatamente um token' },
      { label: 'D', text: 'Porque a IA entende o significado de cada letra' },
    ],
    correctAnswer: 'B',
    explanation: 'É a flexibilidade dos tokens: palavras novas são montadas com pedaços conhecidos.',
  },
  {
    id: 'e1-q5',
    question: 'O que é um embedding?',
    options: [
      { label: 'A', text: 'Um tipo de aplicativo de celular' },
      { label: 'B', text: 'A senha que protege a IA' },
      { label: 'C', text: 'Uma lista de números que funciona como o "endereço" de um token no mapa da linguagem' },
      { label: 'D', text: 'Um erro da IA quando inventa informação' },
    ],
    correctAnswer: 'C',
    explanation: 'Computador só entende número: cada token vira uma lista de números que guarda o seu significado.',
  },
  {
    id: 'e1-q6',
    question: 'No "mapa de coordenadas da floresta", quais palavras ficariam na mesma vizinhança?',
    options: [
      { label: 'A', text: 'rio, igarapé e furo' },
      { label: 'B', text: 'rio, ônibus e professor' },
      { label: 'C', text: 'açaí, carro e escola' },
      { label: 'D', text: 'Nenhuma: todas ficam à mesma distância' },
    ],
    correctAnswer: 'A',
    explanation: 'Palavras de significado parecido ficam perto umas das outras no mapa dos embeddings.',
  },
  {
    id: 'e1-q7',
    question: 'Qual é a ordem certa do caminho da IA, do seu texto até a resposta?',
    options: [
      { label: 'A', text: 'Resposta pronta → tokens → embeddings → cálculo de padrões' },
      { label: 'B', text: 'Tokens → embeddings → cálculo de padrões → palavra por palavra → resposta pronta' },
      { label: 'C', text: 'Embeddings → resposta pronta → tokens' },
      { label: 'D', text: 'Busca na internet → cópia → resposta pronta' },
    ],
    correctAnswer: 'B',
    explanation: 'São os 5 passos da apostila: quebra em tokens, vira números, cálculo de padrões, palavra por palavra, resposta pronta.',
  },
  {
    id: 'e1-q8',
    question: 'A IA escreveu "O açaí é uma fruta típica da… Amazônia". Por que ela escolheu "Amazônia"?',
    options: [
      { label: 'A', text: 'Porque ela sabe geografia como uma pessoa' },
      { label: 'B', text: 'Porque é o próximo token mais provável, de acordo com os padrões que aprendeu' },
      { label: 'C', text: 'Porque alguém digitou a resposta por ela' },
      { label: 'D', text: 'Porque ela conferiu num livro' },
    ],
    correctAnswer: 'B',
    explanation: 'A IA calcula a palavra mais provável — "Amazônia" muito provável, "Europa" muito improvável.',
  },
];

/** Quiz "Casos do dia a dia": os 5 casos da tabela da apostila + 3 novos. */
export const QUIZ_CASOS: QuizQuestion[] = [
  ['Pedir à IA que explique um conteúdo de biologia que você não entendeu.', true, 'Você está aprendendo. (Caso da apostila)'],
  ['Copiar uma redação inteira da IA e entregar como sua.', false, 'É desonesto e você não aprende. (Caso da apostila)'],
  ['Usar a IA para revisar a gramática do texto que VOCÊ escreveu.', true, 'A autoria continua sua. (Caso da apostila)'],
  ['Colocar o CPF de um parente para "testar" a IA.', false, 'Nunca exponha dados pessoais. (Caso da apostila)'],
  ['Pedir ideias de projeto e depois desenvolvê-las com suas palavras.', true, 'A IA foi um ponto de partida. (Caso da apostila)'],
  ['Usar a IA para criar um áudio falso de um colega dizendo algo que ele não disse.', false, 'Regra de ouro 4: não use a IA para enganar ou prejudicar ninguém.'],
  ['A IA citou um livro na resposta; você procura o livro numa biblioteca ou site confiável antes de usar no trabalho.', true, 'Regra de ouro 1: confira sempre — a IA às vezes inventa livros e autores.'],
  ['Mandar a foto do boletim com nome e matrícula para a IA "calcular a média".', false, 'Regra de ouro 3: proteja seus dados. Digite só as notas, sem identificação.'],
].map(([texto, certo, explicacao], i) => ({
  id: `casos-${i + 1}`,
  question: `É uso responsável? ${texto}`,
  options: [
    { label: 'A', text: 'Sim, é uso responsável' },
    { label: 'B', text: 'Não, não é uso responsável' },
  ],
  correctAnswer: certo ? 'A' : 'B',
  explanation: explicacao as string,
}));

/** Rodada final: as duas perguntas oficiais do "Teste seu conhecimento" do Módulo 1. */
export const QUIZ_FINAL: QuizQuestion[] = [
  QUIZ_ENCONTRO_1[0],
  {
    id: 'final-q2',
    question: 'Uma IA respondeu com total confiança que o rio Guamá tem "exatamente 1.247 km". O que você deve fazer?',
    options: [
      { label: 'A', text: 'Confiar, porque a IA parecia muito segura' },
      { label: 'B', text: 'Conferir a informação em uma fonte confiável antes de usar' },
      { label: 'C', text: 'Copiar direto para o trabalho da escola' },
      { label: 'D', text: 'Nunca mais usar a IA' },
    ],
    correctAnswer: 'B',
    explanation: 'Pergunta oficial da apostila. A IA pode alucinar — números específicos sempre precisam ser conferidos.',
  },
];

/** Palavras do mapa de embeddings (Encontro 1, 70–90 min) e o agrupamento de referência. */
export const PALAVRAS_EMBEDDING = ['rio', 'igarapé', 'furo', 'açaí', 'cupuaçu', 'bacuri', 'carro', 'ônibus', 'bicicleta', 'escola', 'professor', 'aluno'];
export const GRUPOS_REFERENCIA: Record<string, string[]> = {
  'Água': ['rio', 'igarapé', 'furo'],
  'Frutas': ['açaí', 'cupuaçu', 'bacuri'],
  'Transporte': ['carro', 'ônibus', 'bicicleta'],
  'Escola': ['escola', 'professor', 'aluno'],
};

/** Pipeline do material (Encontro 1, 90–120 min). */
export const PIPELINE = [
  { titulo: 'Quebra em tokens', texto: 'A frase é ralada em pedacinhos, como a mandioca.' },
  { titulo: 'Vira números (embeddings)', texto: 'Cada token recebe seu "endereço" numérico no mapa da linguagem.' },
  { titulo: 'Cálculo de padrões', texto: 'A IA compara com os padrões que aprendeu e calcula o token mais provável.' },
  { titulo: 'Palavra por palavra', texto: 'Escolhe o próximo token, depois o próximo, montando a resposta aos poucos.' },
  { titulo: 'Resposta pronta', texto: 'Os tokens viram texto de novo e aparecem na sua tela.' },
];

/** Classificador "Arriscado x Seguro" (Encontro 2, 40–55 min). */
export const CATEGORIAS_RISCO = ['Números específicos', 'Fatos recentes', 'Assuntos muito locais', 'Citações e referências'];
export const PERGUNTAS_RISCO: { texto: string; arriscada: boolean; porque: string }[] = [
  { texto: 'Quantos habitantes tem o bairro do Guamá exatamente?', arriscada: true, porque: 'Número específico e assunto muito local.' },
  { texto: 'Explique quais fatores influenciam o crescimento de um bairro.', arriscada: false, porque: 'Pede conceitos e explicação, não um dado exato.' },
  { texto: 'Qual livro do autor X fala sobre o Círio? Me dê a página.', arriscada: true, porque: 'Citações e referências: a IA às vezes inventa livros e páginas.' },
  { texto: 'O que é uma alucinação de IA? Explique com um exemplo.', arriscada: false, porque: 'Conceito geral, bem documentado.' },
  { texto: 'Quem ganhou o jogo de ontem à noite?', arriscada: true, porque: 'Fato recente: pode ter acontecido depois do treinamento da IA.' },
  { texto: 'Como funciona a cheia dos rios na Amazônia?', arriscada: false, porque: 'Explicação de um fenômeno conhecido; ainda assim, confira.' },
  { texto: 'Qual é o horário exato do posto de saúde da minha rua?', arriscada: true, porque: 'Assunto muito local e dado específico — confira na fonte oficial.' },
  { texto: 'Me dê dicas para organizar meus estudos para o ENEM.', arriscada: false, porque: 'Pede ideias gerais, não fatos exatos.' },
];
