/**
 * Regras do "Guia Saúde Guamá", o bot de exemplo da apostila do Módulo 4.
 *
 * A ordem das regras segue a apostila: encaminhamentos obrigatórios
 * (emergência, sofrimento, violência) vêm ANTES de qualquer outra resposta,
 * mesmo quando a mensagem também pergunta o horário.
 * Lógica pura, sem React, para poder ser testada isoladamente.
 */

export interface RespostaBot {
  text: string;
  isEmergency: boolean;
  isRuleApplied: string;
}

export const MENSAGEM_INICIAL =
  'Oi! Sou o "Guia Saúde Guamá", um assistente automático feito por estudantes. Posso errar — confirme informações importantes nos canais oficiais.\n\nPosso ajudar com: (1) horários das UBS do Guamá e Terra Firme, (2) documentos para levar na consulta e (3) vacinação.';

/** Minúsculas, sem acento: o usuário real escreve "ta", "sabado", "urgencia". */
export function normalizar(texto: string) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

const contem = (t: string, termos: RegExp[]) => termos.some((r) => r.test(t));

const EMERGENCIA = [
  /\bpeito\b/, /falta de ar/, /nao consigo respirar/, /\bsangr/, /\bdesmai/, /\bconvuls/,
  /\binfarto\b/, /\bavc\b/, /\bdesacordad/, /\burgen/, /\bemergen/,
];
const SOFRIMENTO = [
  /me machucar/, /\bme matar\b/, /\bsuicid/, /quero morrer/, /\bme cortar\b/, /tirar (a )?minha vida/,
];
const VIOLENCIA = [/\bviolen/, /\bagredi/, /\bameac/, /\bapanh/, /\bme bat/, /\bestupr/, /\babus/];
const DADO_PESSOAL = [/\bcpf\b/, /\brg\b/, /\bsenha\b/, /\d{3}\.?\d{3}\.?\d{3}-?\d{2}/, /\bcartao do sus\b.*\d{6,}/];
const FORA_DE_ESCOPO = [/\bremo\b/, /\bpaysandu\b/, /\bfutebol\b/, /\bjogo\b/, /previsao do tempo/, /receita de bolo/];
const SEM_BASE = [/\btelefone\b/, /\bcelular\b/, /\bwhats/, /\bzap\b/, /\bnumero\b/, /\bendereco\b/, /\bsalario\b/];
const HORARIO = [/\bhorario/, /\babre\b/, /\babert/, /\bfunciona/, /\bsabado\b/, /\bdomingo\b/, /\bque horas\b/, /\bfecha/];
const DOCUMENTOS = [/\bdocumento/, /\blevar\b/, /\bprecisa\b/, /\bdocto\b/];
const VACINA = [/\bvacin/, /\bgripe\b/, /\bcampanha/];

export function responder(mensagem: string): RespostaBot {
  const t = normalizar(mensagem);

  // 1. Encaminhamentos obrigatórios — prioridade máxima, nesta ordem.
  if (contem(t, SOFRIMENTO)) {
    return {
      text: 'Sinto muito que você esteja passando por isso. Você não precisa enfrentar isso sozinho(a): ligue agora para o CVV — 188 (gratuito, 24h). Se estiver em perigo imediato, ligue 192 (SAMU).',
      isEmergency: true,
      isRuleApplied: 'Encaminhamento obrigatório: sofrimento emocional (CVV 188)',
    };
  }
  if (contem(t, EMERGENCIA)) {
    return {
      text: 'Isso pode ser uma emergência. Ligue 192 (SAMU) agora ou vá à UPA mais próxima. Não espere resposta por aqui.',
      isEmergency: true,
      isRuleApplied: 'Regra de emergência — prioridade máxima (Ramo 4)',
    };
  }
  if (contem(t, VIOLENCIA)) {
    return {
      text: 'Sua segurança vem primeiro. Em situação de violência ou ameaça, ligue 190 (Polícia). Para violência contra a mulher, ligue 180 (gratuito, 24h).',
      isEmergency: true,
      isRuleApplied: 'Encaminhamento obrigatório: violência (190 / 180)',
    };
  }

  // 2. Proteção de dados pessoais.
  if (contem(t, DADO_PESSOAL)) {
    return {
      text: 'Por segurança, não envie CPF, documentos ou senhas aqui — eu não guardo nem peço dados pessoais. Posso te dizer quais documentos levar pessoalmente na UBS.',
      isEmergency: false,
      isRuleApplied: 'Proteção de dados (regra de ouro nº 3)',
    };
  }

  // 3. Fora do escopo.
  if (contem(t, FORA_DE_ESCOPO)) {
    return {
      text: 'Esse assunto está fora do que eu sei responder. Eu ajudo só com UBS, documentos e vacinação. Para outras dúvidas de saúde pública, ligue 136 (Disque Saúde).',
      isEmergency: false,
      isRuleApplied: 'Escopo fechado: recusa gentil',
    };
  }

  // 4. Informação que não está na base: frase de recuo, nunca inventar.
  if (contem(t, SEM_BASE)) {
    return {
      text: 'Não tenho essa informação confirmada. Ligue 136 (Disque Saúde) para confirmar.',
      isEmergency: false,
      isRuleApplied: 'Frase de recuo contra alucinação',
    };
  }

  // 5. Base de conhecimento conferida (dados da apostila, 03/2026).
  if (contem(t, HORARIO)) {
    return {
      text: 'Horários conferidos em 03/2026:\n• UBS Guamá: seg a sex, 7h às 17h. Sábado fechado.\n• UBS Terra Firme: seg a sex, 7h às 17h. Sábado, 8h às 12h.\n\nEra isso que você precisava? Posso dizer também o que levar na consulta.',
      isEmergency: false,
      isRuleApplied: 'Base de conhecimento conferida (Ramo 1)',
    };
  }
  if (contem(t, DOCUMENTOS)) {
    return {
      text: 'Para o atendimento na UBS, leve:\n1. Cartão SUS\n2. Documento com foto\n3. Comprovante de residência\nSe tiver receita antiga, leve também.',
      isEmergency: false,
      isRuleApplied: 'Base de conhecimento conferida (Ramo 2)',
    };
  }
  if (contem(t, VACINA)) {
    return {
      text: 'A vacina é de criança ou de adulto? Criança: siga o calendário infantil no link oficial do Ministério da Saúde. Adulto: confira as campanhas ativas no link oficial. Para horário da sala de vacina, confirme no 136 (Disque Saúde).',
      isEmergency: false,
      isRuleApplied: 'Ramo 3: vacinação (sem inventar horário)',
    };
  }

  // 6. Não entendi — sempre com saída útil.
  return {
    text: 'Não peguei essa. Posso ajudar com: (1) horários, (2) documentos ou (3) vacinação. Se preferir, ligue 136 (Disque Saúde).',
    isEmergency: false,
    isRuleApplied: 'Ramo de erro com saída útil (Ramo 5)',
  };
}
