/**
 * Plano de aula do Módulo 1 — Roteiro do Professor, em 3 encontros.
 *
 * Base: roteiro do Notion "Módulo 1 — Fundamentos (Roteiro do Professor)"
 * (workspace profbrunopereira, 2 encontros) reorganizado em 3 encontros de
 * 150 minutos, e a apostila oficial do Módulo 1.
 *
 * O site NÃO coleta respostas (não há banco de dados). Toda atividade que gera
 * resposta de aluno acontece em uma ferramenta da conta do professor, e o campo
 * `coleta` diz onde o professor encontra essas respostas depois.
 * Para trocar um link, edite só este arquivo.
 */

export const SITE_URL = 'https://abner-lucas.github.io/letramento-digital-em-ia';
export const NOTION_URL =
  'https://app.notion.com/p/profbrunopereira/M-dulo-1-Fundamentos-Roteiro-do-Professor-3f2dde8b8c80819b8686d7c7183ad651';

export type Ferramenta = 'Mentimeter' | 'Padlet' | 'Kahoot' | 'Site' | 'IA' | 'Tokenizador';

export interface Recurso {
  nome: string;
  ferramenta: Ferramenta;
  /** Link que o aluno abre (participação). */
  url?: string;
  /** Link de edição/apresentação do professor. */
  urlProfessor?: string;
  /** Âncora da atividade na página da turma (atividades que rodam no site). */
  ancora?: string;
  /** Onde o professor encontra as respostas dos alunos. */
  coleta?: string;
  /** Como o aluno entra (ex.: código na tela). */
  acesso?: string;
}

export interface Bloco {
  inicio: number;
  fim: number;
  titulo: string;
  ferramenta?: string;
  descricao: string[];
  recursos?: Recurso[];
}

export interface Encontro {
  id: 'encontro-1' | 'encontro-2' | 'encontro-3';
  numero: 1 | 2 | 3;
  titulo: string;
  topicos: string;
  objetivo: string;
  duracao: number;
  selo: string;
  corSelo: string;
  ferramentas: string[];
  blocos: Bloco[];
  /** Como a participação de cada aluno fica registrada para o professor. */
  registro: string[];
  recompensa: string;
}

export const PLANO = {
  titulo: 'Módulo 1 — Fundamentos (Roteiro do Professor)',
  resumo:
    'Roteiro do professor para 3 encontros presenciais de 150 minutos, cobrindo os Tópicos 3 a 8 do Módulo 1 — "Como a Inteligência Artificial Pensa?" (os Tópicos 1 e 2 já foram vistos em encontro anterior).',
  logica:
    'O Encontro 1 apresenta os tipos de IA e como ela lê o texto em tokens. O Encontro 2 abre a máquina por dentro: embeddings e o caminho completo da pergunta até a resposta. O Encontro 3 trata de como usar a IA com critério: alucinações, limites e as regras de ouro. Todos seguem o mesmo formato: abertura no Mentimeter, oficinas com celular registradas no Padlet, avaliação gamificada no Kahoot, bilhete de saída no Mentimeter e selo digital ao final.',
  coleta:
    'O site não guarda respostas. Tudo o que os alunos produzem fica na sua conta: postagens no Padlet (com nome do autor), respostas no Mentimeter (aba "Resultados" de cada apresentação) e notas no Kahoot (relatório ao final de cada jogo, exportável em planilha).',
};

/* Ferramentas criadas na conta do professor em 16/11/2026 ------------------- */

const MENTI = {
  e1: { edit: 'https://www.mentimeter.com/app/presentation/alm4wsfh13tyf7ktbk835te6nvonfunf/edit', present: 'https://www.mentimeter.com/app/presentation/alm4wsfh13tyf7ktbk835te6nvonfunf/present' },
  e2: { edit: 'https://www.mentimeter.com/app/presentation/al1i1nac6gv59fkza2ya5pcqea6hthqu/edit', present: 'https://www.mentimeter.com/app/presentation/al1i1nac6gv59fkza2ya5pcqea6hthqu/present' },
  e3: { edit: 'https://www.mentimeter.com/app/presentation/alyfswf2a8z9c18ff5jdkn2ntbpgtmde/edit', present: 'https://www.mentimeter.com/app/presentation/alyfswf2a8z9c18ff5jdkn2ntbpgtmde/present' },
};
const PADLET = {
  e1: 'https://padlet.com/prof_abner_ti/m1-e1-tipos-de-ia-no-dia-a-dia-s025iwmcfka1t1h8a8bg',
  e23: 'https://padlet.com/prof_abner_ti/m1-e2-e-e3-murais-da-turma-s025iwmnuhdk3fkw11z6',
};
const KAHOOT = {
  e1: 'https://create.kahoot.it/creator/d388367e-eb31-4f91-bcb9-aefc6554f0e2',
  e2: 'https://create.kahoot.it/creator/1da16fc2-236c-40c6-8309-d9b127f4d898',
  e3casos: 'https://create.kahoot.it/creator/e2425d6a-c2da-4c1e-bfe0-57fe6632af24',
  e3final: 'https://create.kahoot.it/creator/fa53f8bc-ea9f-43a1-895d-15d25aab4f00',
};

const ACESSO_MENTI = 'Aluno entra em menti.com e digita o código que aparece no topo da tela projetada.';
const ACESSO_KAHOOT = 'Abra o quiz, clique em "Iniciar" → "Clássico"; o aluno entra em kahoot.it com o PIN que aparece na tela.';
const COLETA_MENTI = 'Mentimeter → abra a apresentação → aba "Resultados" (respostas da sessão; anônimas por padrão).';
const COLETA_KAHOOT = 'Kahoot → "Relatórios" → escolha o jogo: nota e acertos por aluno, com opção de baixar planilha.';
const COLETA_PADLET = 'Padlet → as postagens ficam no mural com o nome de quem postou; use "Compartilhar" → "Exportar" para salvar em PDF ou planilha.';

const mentiRecurso = (nome: string, k: keyof typeof MENTI): Recurso => ({
  nome,
  ferramenta: 'Mentimeter',
  urlProfessor: MENTI[k].present,
  acesso: ACESSO_MENTI,
  coleta: COLETA_MENTI,
});
const kahootRecurso = (nome: string, url: string): Recurso => ({
  nome,
  ferramenta: 'Kahoot',
  urlProfessor: url,
  acesso: ACESSO_KAHOOT,
  coleta: COLETA_KAHOOT,
});

export const LINKS_PROFESSOR = [
  { nome: 'Mentimeter — Encontro 1 (editar)', url: MENTI.e1.edit },
  { nome: 'Mentimeter — Encontro 2 (editar)', url: MENTI.e2.edit },
  { nome: 'Mentimeter — Encontro 3 (editar)', url: MENTI.e3.edit },
  { nome: 'Padlet — Encontro 1', url: PADLET.e1 },
  { nome: 'Padlet — Encontros 2 e 3', url: PADLET.e23 },
  { nome: 'Kahoot — Encontro 1', url: KAHOOT.e1 },
  { nome: 'Kahoot — Encontro 2', url: KAHOOT.e2 },
  { nome: 'Kahoot — Encontro 3: casos do dia a dia', url: KAHOOT.e3casos },
  { nome: 'Kahoot — Encontro 3: quiz final', url: KAHOOT.e3final },
];

export const ENCONTROS: Encontro[] = [
  {
    id: 'encontro-1',
    numero: 1,
    titulo: 'Que IA é essa? Tipos de IA e tokens',
    topicos: 'Tópicos 3 (Os diferentes tipos de IA) e 4 (Como a IA "lê" o que você escreve: os tokens)',
    objetivo: 'O aluno distingue os diferentes tipos de IA do dia a dia e explica, com as próprias palavras, o que é um token e por que algumas palavras viram mais pedaços que outras.',
    duracao: 150,
    selo: 'Explorador de Tokens — Nível 1',
    corSelo: '#34d399',
    ferramentas: [
      'Mentimeter — nuvem de palavras da abertura e bilhete de saída',
      'Padlet — mural dos tipos de IA + ficha da oficina de tokens',
      'Tiktokenizer ou OpenAI Tokenizer — oficina de tokens no celular',
      'Kahoot — quiz gamificado (10 itens)',
      'Selo digital "Explorador de Tokens — Nível 1" (gerado no site)',
      'Celulares/notebooks liberados nas oficinas',
    ],
    blocos: [
      {
        inicio: 0, fim: 10, titulo: 'Abertura — "Qual IA você já usou hoje sem perceber?"', ferramenta: 'Mentimeter',
        descricao: ['Nuvem de palavras: "Qual app de IA você usou nas últimas 24h?". Colete ao vivo (Spotify, Instagram, Google Maps, Face ID…) e conecte: "muita gente nem percebe quantas IAs diferentes já usa todos os dias".'],
        recursos: [mentiRecurso('Mentimeter do Encontro 1 (slides 1–3)', 'e1')],
      },
      {
        inicio: 10, fim: 35, titulo: 'Os diferentes tipos de IA', ferramenta: 'Padlet classificatório',
        descricao: [
          'Padlet com 6 colunas: IA de linguagem, de imagem, de recomendação, de rotas, de voz e de busca. Cada grupo posta 2 apps que usa no dia a dia na coluna certa, pelo celular.',
          'Puxe 2 ou 3 exemplos em plenária, reforçando que o curso foca na "IA de linguagem". No Menti, a pergunta do app de mapas confere o entendimento.',
        ],
        recursos: [{ nome: 'Padlet "Tipos de IA no dia a dia"', ferramenta: 'Padlet', url: PADLET.e1, coleta: COLETA_PADLET }],
      },
      {
        inicio: 35, fim: 80, titulo: 'Oficina dos tokens', ferramenta: 'Duplas, com celular',
        descricao: [
          'Apresente a metáfora da farinha de mandioca: a IA rala a frase em tokens antes de trabalhar com ela.',
          'Cada dupla abre um tokenizador e testa 3 palavras regionais (açaí, igarapé, Guamá ou cupuaçu) e 3 comuns (computador, felicidade, inteligência). Anotam quantos tokens cada uma virou.',
          'A ficha da dupla é um post no Padlet, na coluna "Ficha · Oficina dos tokens", seguindo o modelo fixado lá: nomes, turma, palavras e tokens, e o que mais surpreendeu.',
        ],
        recursos: [
          { nome: 'Tiktokenizer', ferramenta: 'Tokenizador', url: 'https://tiktokenizer.vercel.app/' },
          { nome: 'OpenAI Tokenizer', ferramenta: 'Tokenizador', url: 'https://platform.openai.com/tokenizer' },
          { nome: 'Ficha da oficina (coluna do Padlet)', ferramenta: 'Padlet', url: PADLET.e1, coleta: COLETA_PADLET },
        ],
      },
      {
        inicio: 80, fim: 100, titulo: 'Socialização — por que as palavras regionais quebram mais?', ferramenta: 'Mentimeter + discussão',
        descricao: [
          'No Menti, cada dupla responde qual palavra regional quebrou em mais tokens. Discuta: a IA foi treinada com muito mais texto em outros idiomas e regiões, por isso nossas palavras viram mais pedaços — um primeiro sinal do que veremos no Encontro 3.',
        ],
        recursos: [mentiRecurso('Mentimeter do Encontro 1 (slides 4–5)', 'e1')],
      },
      {
        inicio: 100, fim: 130, titulo: 'Avaliação gamificada — Quiz', ferramenta: 'Kahoot',
        descricao: ['Quiz de 10 itens com a pergunta oficial 1 do "Teste seu conhecimento" (a primeira coisa que a IA faz é quebrar o texto em tokens) e perguntas sobre tipos de IA e tokens. Cada aluno joga pelo celular.'],
        recursos: [kahootRecurso('Kahoot "Tipos de IA e tokens"', KAHOOT.e1)],
      },
      {
        inicio: 130, fim: 145, titulo: 'Bilhete de saída', ferramenta: 'Mentimeter',
        descricao: ['Autoavaliação de 1 a 5 ("sei citar 3 tipos de IA", "sei explicar o que é um token") e uma frase sobre o que cada um leva da aula.'],
        recursos: [mentiRecurso('Mentimeter do Encontro 1 (slides 6–7)', 'e1')],
      },
      {
        inicio: 145, fim: 150, titulo: 'Selo digital + gancho para o Encontro 2', ferramenta: 'Site',
        descricao: [
          'Os alunos geram o selo "Explorador de Tokens — Nível 1" na página da turma e salvam a imagem. Reconheça a dupla com a ficha mais caprichada no Padlet.',
          'Anuncie: "no próximo encontro vamos abrir a máquina e seguir o caminho da sua pergunta até a resposta".',
        ],
        recursos: [{ nome: 'Gerador do selo — Nível 1', ferramenta: 'Site', ancora: 'selo-1' }],
      },
    ],
    registro: [
      'Padlet: posts dos grupos nas 6 colunas + ficha de cada dupla (com nome e turma).',
      'Kahoot: nota e acertos de cada aluno no relatório do jogo.',
      'Mentimeter: nuvem de palavras, respostas abertas e autoavaliação da turma.',
    ],
    recompensa: 'Selo digital "Explorador de Tokens — Nível 1" + reconhecimento da dupla com a ficha mais completa no Padlet.',
  },
  {
    id: 'encontro-2',
    numero: 2,
    titulo: 'Por dentro da máquina: embeddings e o caminho da resposta',
    topicos: 'Tópico 5 (O passo a passo: o que acontece quando você digita), com embeddings e a previsão da próxima palavra',
    objetivo: 'O aluno explica o que é um embedding, reconhece que palavras parecidas ficam "perto" no mapa da linguagem e descreve os 5 passos que a IA percorre entre a pergunta e a resposta.',
    duracao: 150,
    selo: 'Navegador do Pipeline — Nível 2',
    corSelo: '#60a5fa',
    ferramentas: [
      'Mentimeter — retomada, conferências rápidas, ranking dos 5 passos e bilhete de saída',
      'Site (página da turma) — mapa das palavras e caminho da resposta animado',
      'Padlet — 5 colunas do caminho da resposta',
      'Kahoot — quiz gamificado (10 itens)',
      'Selo digital "Navegador do Pipeline — Nível 2" (gerado no site)',
      'Celulares/notebooks liberados nas oficinas',
    ],
    blocos: [
      {
        inicio: 0, fim: 10, titulo: 'Retomada ativa — "O que é um token?"', ferramenta: 'Mentimeter',
        descricao: ['Nuvem de palavras "Em uma palavra: o que é um token?". Use as respostas para reativar o Encontro 1.'],
        recursos: [mentiRecurso('Mentimeter do Encontro 2 (slides 1–2)', 'e2')],
      },
      {
        inicio: 10, fim: 40, titulo: 'Embeddings — o mapa das palavras', ferramenta: 'Site, em grupos',
        descricao: [
          'Em grupos, na página da turma, agrupam 12 palavras soltas (rio, igarapé, furo, açaí, cupuaçu, bacuri, carro, ônibus, bicicleta, escola, professor, aluno) pelo que "têm a ver" — antes de qualquer explicação técnica.',
          'Revele o conceito de embedding ("mapa de coordenadas da floresta", do material) e compare com o agrupamento dos grupos. Confira no Menti: "Qual trio ficaria na mesma vizinhança?".',
        ],
        recursos: [
          { nome: 'Mapa das palavras (página da turma)', ferramenta: 'Site', ancora: 'embeddings' },
          mentiRecurso('Mentimeter do Encontro 2 (slides 3–4)', 'e2'),
        ],
      },
      {
        inicio: 40, fim: 55, titulo: 'A próxima palavra mais provável', ferramenta: 'Mentimeter',
        descricao: ['"O açaí é uma fruta típica da…": a turma vota e você mostra que a IA faz o mesmo — escolhe o token mais provável ("Amazônia" muito provável, "Europa" muito improvável), sem saber se é verdade.'],
        recursos: [mentiRecurso('Mentimeter do Encontro 2 (slide 5)', 'e2')],
      },
      {
        inicio: 55, fim: 95, titulo: 'O caminho completo: do seu texto à resposta', ferramenta: 'Site + Padlet, em grupos',
        descricao: [
          'Todos acompanham na página da turma a frase "Escreva um poema sobre o rio Guamá" passando pelos 5 passos do material: (1) quebra em tokens, (2) vira números, (3) cálculo de padrões, (4) palavra por palavra, (5) resposta pronta.',
          'Cada grupo recebe um passo e posta no Padlet, na coluna dele, uma explicação com as próprias palavras e um exemplo da Amazônia. Em plenária, a turma lê o caminho completo da esquerda para a direita.',
        ],
        recursos: [
          { nome: 'Caminho da resposta animado (página da turma)', ferramenta: 'Site', ancora: 'pipeline' },
          { nome: 'Padlet — colunas "E2 · 1 a 5"', ferramenta: 'Padlet', url: PADLET.e23, coleta: COLETA_PADLET },
        ],
      },
      {
        inicio: 95, fim: 125, titulo: 'Avaliação gamificada — Quiz', ferramenta: 'Kahoot',
        descricao: ['Quiz de 10 itens sobre embeddings, o mapa das palavras e a ordem do caminho da resposta.'],
        recursos: [kahootRecurso('Kahoot "Embeddings e o caminho da resposta"', KAHOOT.e2)],
      },
      {
        inicio: 125, fim: 145, titulo: 'Ordem dos passos + bilhete de saída', ferramenta: 'Mentimeter',
        descricao: ['Ranking: cada aluno ordena os 5 passos. Depois, autoavaliação de 1 a 5 e "qual passo mais te surpreendeu?".'],
        recursos: [mentiRecurso('Mentimeter do Encontro 2 (slides 6–8)', 'e2')],
      },
      {
        inicio: 145, fim: 150, titulo: 'Selo digital + gancho para o Encontro 3', ferramenta: 'Site',
        descricao: [
          'Os alunos geram o selo "Navegador do Pipeline — Nível 2". Reconheça o grupo com a explicação mais clara no Padlet.',
          'Anuncie: "no próximo encontro vamos descobrir por que a IA às vezes erra com toda a confiança do mundo — e o que fazer sobre isso".',
        ],
        recursos: [{ nome: 'Gerador do selo — Nível 2', ferramenta: 'Site', ancora: 'selo-2' }],
      },
    ],
    registro: [
      'Padlet: explicação de cada grupo para os 5 passos (colunas "E2 · 1 a 5").',
      'Kahoot: nota e acertos de cada aluno no relatório do jogo.',
      'Mentimeter: votações, ranking e autoavaliação da turma.',
    ],
    recompensa: 'Selo digital "Navegador do Pipeline — Nível 2" + reconhecimento do grupo com a explicação mais clara do caminho da resposta.',
  },
  {
    id: 'encontro-3',
    numero: 3,
    titulo: 'Limites, pensamento crítico e uso ético',
    topicos: 'Tópicos 6 (Por que a IA erra? Alucinações e limites), 7 (A IA não pensa como gente — e tudo bem) e 8 (Uso ético e responsável: as regras de ouro)',
    objetivo: 'O aluno reconhece quando uma IA pode alucinar, entende por que ela não "pensa" como um ser humano e aplica as 4 regras de ouro do uso responsável em situações reais.',
    duracao: 150,
    selo: 'Pensador Crítico de IA — Nível 3',
    corSelo: '#a78bfa',
    ferramentas: [
      'Mentimeter — retomada, discussão e bilhete de saída',
      'ChatGPT, Claude, Gemini ou DeepSeek — oficina da caça às alucinações',
      'Padlet — ficha da oficina, "arriscado x seguro" e "crie seu caso"',
      'Kahoot — "Casos do dia a dia" e quiz final',
      'Selo digital "Pensador Crítico de IA — Nível 3" (gerado no site)',
      'Celulares/notebooks liberados nas oficinas',
    ],
    blocos: [
      {
        inicio: 0, fim: 10, titulo: 'Retomada ativa — o caminho da IA', ferramenta: 'Mentimeter',
        descricao: ['Pergunta rápida sobre a ordem do caminho da IA, para reativar o Encontro 2 antes de seguir.'],
        recursos: [mentiRecurso('Mentimeter do Encontro 3 (slides 1–2)', 'e3')],
      },
      {
        inicio: 10, fim: 40, titulo: 'Caça às alucinações', ferramenta: 'Duplas, com celular',
        descricao: [
          'Cada dupla testa na IA: (1) uma "pergunta arriscada" do material (ex.: "quantos habitantes tem o bairro X exatamente?"); (2) a versão "pergunta segura" equivalente; (3) uma pergunta hiperlocal própria, tentando provocar uma alucinação de propósito. Verificam se a resposta é real com uma busca rápida.',
          'A ficha da dupla é um post no Padlet, na coluna "E3 · Ficha: caça às alucinações", seguindo o modelo fixado lá. Fechamento no Menti: "qual alucinação a sua dupla flagrou?".',
        ],
        recursos: [
          { nome: 'ChatGPT', ferramenta: 'IA', url: 'https://chat.openai.com' },
          { nome: 'Gemini', ferramenta: 'IA', url: 'https://gemini.google.com' },
          { nome: 'Claude', ferramenta: 'IA', url: 'https://claude.ai' },
          { nome: 'DeepSeek', ferramenta: 'IA', url: 'https://chat.deepseek.com' },
          { nome: 'Ficha da oficina (coluna do Padlet)', ferramenta: 'Padlet', url: PADLET.e23, coleta: COLETA_PADLET },
          mentiRecurso('Mentimeter do Encontro 3 (slides 3–4)', 'e3'),
        ],
      },
      {
        inicio: 40, fim: 55, titulo: 'Quando desconfiar mais', ferramenta: 'Padlet classificatório',
        descricao: [
          'No Padlet, colunas "Pergunta arriscada" e "Pergunta segura": cada dupla posta 1 exemplo novo (além do que já testou) em cada coluna, usando as 4 categorias do material: números específicos, fatos recentes, assuntos muito locais, citações/referências.',
          'Quem quiser treinar antes usa o classificador da página da turma.',
        ],
        recursos: [
          { nome: 'Padlet — colunas "Arriscada" e "Segura"', ferramenta: 'Padlet', url: PADLET.e23, coleta: COLETA_PADLET },
          { nome: 'Classificador arriscado × seguro (página da turma)', ferramenta: 'Site', ancora: 'arriscado-seguro' },
        ],
      },
      {
        inicio: 55, fim: 70, titulo: 'A IA não pensa como gente', ferramenta: 'Discussão coletiva + Mentimeter',
        descricao: [
          'Leia em voz alta: "A IA não é mais inteligente que você. Ela é mais rápida. A inteligência crítica continua sendo sua."',
          'Abra a discussão com a "pergunta para levar para casa" do material: se a IA repete os padrões da internet, que tem tanto conteúdo bom quanto ruim, o que pode aparecer nas respostas dela? As respostas vão para o Menti.',
        ],
        recursos: [mentiRecurso('Mentimeter do Encontro 3 (slides 5–6)', 'e3')],
      },
      {
        inicio: 70, fim: 100, titulo: 'As regras de ouro + casos do dia a dia', ferramenta: 'Kahoot',
        descricao: ['Apresente as 4 regras de ouro (confira sempre, assuma a autoria, proteja seus dados, respeite as pessoas). Rode o Kahoot com os 5 "casos do dia a dia" da tabela do material como certo ou errado, mais 3 novos.'],
        recursos: [kahootRecurso('Kahoot "Casos do dia a dia"', KAHOOT.e3casos)],
      },
      {
        inicio: 100, fim: 130, titulo: 'Oficina de síntese — crie seu próprio caso', ferramenta: 'Padlet',
        descricao: ['Cada dupla inventa 1 situação nova de uso da IA (certa ou errada) e posta no Padlet sem revelar a resposta. Trocam de posição com outra dupla, que comenta o post classificando como certo/errado e justificando por escrito com a regra de ouro.'],
        recursos: [{ nome: 'Padlet — coluna "E3 · Crie seu caso" (comentários ligados)', ferramenta: 'Padlet', url: PADLET.e23, coleta: COLETA_PADLET }],
      },
      {
        inicio: 130, fim: 145, titulo: 'Quiz final', ferramenta: 'Kahoot + Mentimeter',
        descricao: [
          'Quiz cobrindo os Tópicos 6 a 8, incluindo a pergunta oficial 2 do "Teste seu conhecimento" (o rio Guamá com "1.247 km" inventados).',
          'Bilhete de saída no Menti: ranking da regra de ouro mais difícil, autoavaliação e "qual descoberta você vai contar em casa?".',
        ],
        recursos: [kahootRecurso('Kahoot "Quiz final"', KAHOOT.e3final), mentiRecurso('Mentimeter do Encontro 3 (slides 7–9)', 'e3')],
      },
      {
        inicio: 145, fim: 150, titulo: 'Selo digital + missão para a próxima aula', ferramenta: 'Site',
        descricao: [
          'Os alunos geram o selo "Pensador Crítico de IA — Nível 3".',
          'Repasse a "Sua missão para a próxima aula" do material: abrir um assistente de IA, pedir para explicar o que é um token para um estudante do ensino médio, testar uma alucinação sobre o próprio bairro e trazer uma descoberta para compartilhar.',
        ],
        recursos: [{ nome: 'Gerador do selo — Nível 3', ferramenta: 'Site', ancora: 'selo-3' }],
      },
    ],
    registro: [
      'Padlet: ficha da caça às alucinações, exemplos arriscados/seguros e o caso criado por dupla, com os comentários de quem julgou.',
      'Kahoot: notas dos dois jogos (casos do dia a dia e quiz final).',
      'Mentimeter: nuvem das alucinações, discussão, ranking e autoavaliação.',
    ],
    recompensa: 'Selo digital "Pensador Crítico de IA — Nível 3" + reconhecimento da dupla que melhor flagrou uma alucinação real.',
  },
];

/** Palavras do mapa de embeddings (Encontro 2) e o agrupamento de referência. */
export const PALAVRAS_EMBEDDING = ['rio', 'igarapé', 'furo', 'açaí', 'cupuaçu', 'bacuri', 'carro', 'ônibus', 'bicicleta', 'escola', 'professor', 'aluno'];
export const GRUPOS_REFERENCIA: Record<string, string[]> = {
  'Água': ['rio', 'igarapé', 'furo'],
  'Frutas': ['açaí', 'cupuaçu', 'bacuri'],
  'Transporte': ['carro', 'ônibus', 'bicicleta'],
  'Escola': ['escola', 'professor', 'aluno'],
};

/** Pipeline do material (Encontro 2). */
export const PIPELINE = [
  { titulo: 'Quebra em tokens', texto: 'A frase é ralada em pedacinhos, como a mandioca.' },
  { titulo: 'Vira números (embeddings)', texto: 'Cada token recebe seu "endereço" numérico no mapa da linguagem.' },
  { titulo: 'Cálculo de padrões', texto: 'A IA compara com os padrões que aprendeu e calcula o token mais provável.' },
  { titulo: 'Palavra por palavra', texto: 'Escolhe o próximo token, depois o próximo, montando a resposta aos poucos.' },
  { titulo: 'Resposta pronta', texto: 'Os tokens viram texto de novo e aparecem na sua tela.' },
];

/** Classificador "Arriscado x Seguro" (Encontro 3). */
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
