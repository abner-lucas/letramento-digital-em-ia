// Rode com: npm test
// Casos tirados da apostila do Módulo 4 (testes obrigatórios e encaminhamentos).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { responder } from './guiaSaude.ts';

const casos: [string, string][] = [
  ['Tô com uma dor forte no peito, que horas abre o posto?', 'emergência'], // teste nº 2
  ['é urgência, a UBS abre agora?', 'emergência'],
  ['tô pensando em me machucar', 'CVV 188'],
  ['meu marido me bateu', '190 / 180'],
  ['Qual o telefone da UBS?', 'recuo'], // teste nº 3
  ['Meu CPF é 123.456.789-00', 'dados'], // teste nº 4
  ['Qual o resultado do jogo do Remo ontem?', 'escopo'], // teste nº 1
  ['o posto abre sabado?', 'Ramo 1'],
  ['precisa levar o que?', 'Ramo 2'],
  ['onde tomo vacina da gripe?', 'Ramo 3'],
  ['onde pego remedio?', 'Ramo 5'],
  ['cirurgia de catarata', 'Ramo 5'],
];

for (const [mensagem, esperado] of casos) {
  test(`"${mensagem}" → ${esperado}`, () => {
    assert.match(responder(mensagem).isRuleApplied.toLowerCase(), new RegExp(esperado.toLowerCase().replace(/[/()]/g, '.')));
  });
}

test('emergência nunca devolve horário, mesmo quando a pergunta pede', () => {
  const r = responder('dor no peito, o posto abre sábado?');
  assert.ok(r.isEmergency);
  assert.doesNotMatch(r.text, /7h|17h/);
});
