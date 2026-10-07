// Cada regra que o validador checa tem ao menos um exemplo que viola só ela.
// Rode com: node --test testes/

import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { validar } from '../../skills/tabularium-validar/validar.mjs';
import { regrasDe, troca, violacoesCom } from './exemplo.mjs';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const script = join(raiz, 'skills', 'tabularium-validar', 'validar.mjs');

test('o exemplo de partida é válido', () => {
  assert.deepEqual(violacoesCom(), []);
});

test('o fim de linha do Windows não muda o resultado', () => {
  assert.deepEqual(violacoesCom({}, { fimDeLinha: '\r\n' }), []);
});

test('a especificação do próprio formato é válida', () => {
  assert.deepEqual(validar(join(raiz, 'specs')), []);
});

// [regra, o que o exemplo faz de errado, mudança]
const casos = [
  ['VRF-R8', 'prosa solta no meio de um bloco', troca('pedidos.md', '- [x] PED-R2  removida\n', '- [x] PED-R2  removida\nTexto solto.\n')],
  ['VRF-R8', 'título que não é de célula nem de seção', troca('pedidos.md', '## Tipos\n', '## Notas\n')],
  ['VRF-R8', 'recuo de sub-item com número ímpar de espaços', troca('pedidos.md', '  - exige:', '   - exige:')],
  ['VRF-R8', 'sub-item num termo da linguagem', troca('pedidos.md', 'que ainda não foi fechado\n', 'que ainda não foi fechado\n  - também dito cesta\n')],
  ['VRF-R8', 'arquivo estranho numa pasta de decisões', { 'decisoes/pedidos/notas.md': '# Notas\n' }],
  ['VRF-R10', 'falta _contadores.md', { '_contadores.md': null }],
  ['VRF-R12', 'falta AGENTS.md', { 'AGENTS.md': null }],
  ['VRF-R12', 'falta a legenda das decisões', { 'decisoes/_convencoes.md': null }],

  ['ARE-R1', 'arquivo fora da tabela de áreas', { 'estoque.md': '# Estoque\n' }],
  ['ARE-R1', 'área da tabela sem arquivo', troca('_produto.md', 'pedidos.md |', 'vendas.md |')],
  ['ARE-R1', 'pasta de área fora da tabela', { 'estoque/_area.md': '# Estoque\n' }],
  ['ARE-R11', 'seções da área fora de ordem', troca('pedidos.md', '## Linguagem\n- carrinho: **Pedido** que ainda não foi fechado\n\n## Tipos\n- Quantidade: inteiro; de 1 a 99\n', '## Tipos\n- Quantidade: inteiro; de 1 a 99\n\n## Linguagem\n- carrinho: **Pedido** que ainda não foi fechado\n')],
  ['APR-R9', 'seção que não existe em _produto.md', troca('_produto.md', '## Fora de escopo', '## Futuro')],
  ['APR-R9', 'seções de _produto.md fora de ordem', troca('_produto.md', '## Regras globais\n- [ ] PRD-Q1  Toda tela responde em até 3 s\n\n## Fora de escopo\n- Entrega dos produtos · nesta versão\n', '## Fora de escopo\n- Entrega dos produtos · nesta versão\n\n## Regras globais\n- [ ] PRD-Q1  Toda tela responde em até 3 s\n')],
  ['CEL-R2', 'célula sem frase de definição', troca('pedidos.md', 'Produto e **Quantidade** dentro de um **Pedido**.\n', '')],
  ['CEL-R2', 'linha em branco entre o título e a definição', troca('pedidos.md', '## Item de pedido  `ITE`\n', '## Item de pedido  `ITE`\n\n')],
  ['CEL-R3', 'visão antes de capacidade', troca('pedidos.md', '- [ ] PED-Q1  A lista de pedidos abre em até 2 s\n', '- [ ] PED-Q1  A lista de pedidos abre em até 2 s\n- [ ] PED-V2  Ver um pedido\n')],
  ['CEL-R3', 'linha de modelo depois de afirmação', troca('pedidos.md', '- [x] PED-R2  removida\n', '- [x] PED-R2  removida\n- observação: texto\n')],
  ['CEL-R3', 'papel que não cabe em bloco de célula', troca('pedidos.md', '- [ ] ITE-R1', '- [ ] ITE-J1')],
  ['CRT-R6', 'sub-item numa regra', troca('pedidos.md', 'o pedido não muda ⟸ [D1]\n', 'o pedido não muda ⟸ [D1]\n  - nem a pedido do cliente\n')],
  ['IND-R2', 'Índice escrito à mão', troca('pedidos.md', '## Linguagem\n', '## Índice\n- usa **Cliente**, de fora\n\n## Linguagem\n')],
  ['DEC-R1', 'código do título difere do arquivo', troca('decisoes/pedidos/D1-pedido-pago-fixo.md', '`D1`', '`D2`')],
  ['DEC-R1', 'título sem interrogação', troca('decisoes/pedidos/D1-pedido-pago-fixo.md', 'pode mudar?', 'pode mudar')],
  ['DEC-R1', 'decisão sem resolução', troca('decisoes/pedidos/D1-pedido-pago-fixo.md', 'Não, fica como está.\n', '')],
  ['DEC-R2', 'itens do corpo fora de ordem', troca('decisoes/pedidos/D1-pedido-pago-fixo.md', '- Contexto: o pagamento já foi feito sobre aquele total\n- Alternativas descartadas\n  - Permitir a mudança e cobrar a diferença: exige uma segunda cobrança\n', '- Alternativas descartadas\n  - Permitir a mudança e cobrar a diferença: exige uma segunda cobrança\n- Contexto: o pagamento já foi feito sobre aquele total\n')],
  ['DEC-R2', 'decisão sem Histórico', troca('decisoes/pedidos/D1-pedido-pago-fixo.md', '\n## Histórico\n- 2026-01-10: decisão criada\n', '')],

  ['LIN-R4', 'marca que não é [x] nem [ ]', troca('pedidos.md', '- [ ] PED-Q1', '- [ok] PED-Q1')],
  ['LIN-R4', 'afirmação sem marca', troca('pedidos.md', '- [ ] PED-Q1', '- PED-Q1')],
  ['LIN-R11', 'um só espaço antes do texto', troca('pedidos.md', 'PED-Q1  A lista', 'PED-Q1 A lista')],
  ['LIN-R11', 'linha de modelo sem forma', troca('pedidos.md', '- evento: Pedido pago\n', '- guarda os itens da compra\n- evento: Pedido pago\n')],
  ['LIN-R11', 'regra terminada em ":" sem tabela', troca('pedidos.md', 'o pedido não muda ⟸ [D1]\n', 'o pedido não muda ⟸ [D1]:\n')],
  ['LIN-R11', 'tabela colada na regra', troca('pedidos.md', 'Frete por região:\n\n', 'Frete por região:\n')],
  ['LIN-R11', 'tabela sem separador', troca('pedidos.md', '| --- | --- |\n| capital', '| capital')],
  ['LIN-R11', 'fileira com coluna a mais', troca('pedidos.md', '| interior | cobrado |', '| interior | cobrado | sempre |')],
  ['LIN-R11', 'tabela sem regra antes', troca('pedidos.md', '- [ ] PED-Q1  A lista', '| solta | aqui |\n- [ ] PED-Q1  A lista')],
  ['CRT-R1', 'critério com marca e identificador', troca('pedidos.md', '  - exige: ao menos', '  - [ ] PED-C2  exige: ao menos')],
  ['REF-R14', 'pergunta antes da decisão', troca('pedidos.md', 'é cancelado ⟵ [P1]', 'é cancelado ⟵ [P1] ⟸ [D1]')],
  ['REF-R14', 'citação de decisão fora da forma', troca('pedidos.md', '⟸ [D1]\n', '⟸ D1\n')],
  ['ATR-R6', 'atributo cujo tipo é uma célula, sem cardinalidade', troca('pedidos.md', '- quantidade: **Quantidade**\n', '- quantidade: **Quantidade**\n- origem: **Pedido**\n')],
  ['ATR-R7', 'qualificador fora do vocabulário', troca('pedidos.md', 'único; imutável', 'único; obrigatório')],
  ['ATR-R7', 'derivado sem fórmula', troca('pedidos.md', 'derivado: soma dos **Itens de pedido**', 'derivado')],
  ['ATR-R7', 'inverso sem cardinalidade', troca('pedidos.md', '- quantidade: **Quantidade**\n', '- quantidade: **Quantidade**; inverso: vários\n')],
  ['CEL-R18', 'duas especializações no mesmo bloco', troca('pedidos.md', '- pertence a 1 **Pedido**\n', '- especializa **Pedido**\n- especializa **Pedido**\n')],
  ['TIP-R2', 'tipo de valor sem forma', troca('pedidos.md', '- Quantidade: inteiro; de 1 a 99', '- Quantidade inteira')],
  ['TIP-R2', 'tipo comum sem forma', troca('_produto.md', '- Situação: aberto | pago', '- Situação')],
  ['TRM-R9', 'termo da linguagem sem definição', troca('pedidos.md', '- carrinho: **Pedido** que ainda não foi fechado', '- carrinho')],
  ['ATO-R2', 'marca de ator com maiúscula', troca('pedidos.md', '· atendente', '· Atendente')],
  ['ATO-R2', 'ator não declarado', troca('pedidos.md', '· atendente', '· gerente')],
  ['ATO-R5', 'regra de tempo sem prazo', troca('pedidos.md', 'aberto há 30 dias', 'aberto há muito tempo')],
  ['ATO-R6', 'dois atores padrão', troca('_produto.md', 'acompanha os **Pedidos**', 'acompanha os **Pedidos**; padrão')],
  ['ATO-R6', 'nenhum ator padrão', troca('_produto.md', 'compra na loja; padrão', 'compra na loja')],
  ['ATO-R7', 'ator sem acesso', troca('_produto.md', '- Tempo: dispara os prazos', '- Tempo: dispara os prazos\n- Visitante')],
  ['JOR-R2', 'jornada sem as setas', troca('_produto.md', '[PED-C1] → [PED-V1]', '[PED-C1], [PED-V1]')],
  ['APR-R10', 'Propósito não começa pelo problema', troca('_produto.md', '- Problema: ', '- Motivo: ')],
  ['APR-R10', 'colunas da tabela de áreas trocadas', troca('_produto.md', '| Área | Célula central |', '| Nome | Célula central |')],
  ['APR-R10', 'externo sem papel', troca('_produto.md', '- Banco · pagamentos', '- Banco')],
  ['APR-R10', 'sub-item de externo com verbo desconhecido', troca('_produto.md', '  - fornece:', '  - devolve:')],
  ['APR-R10', 'fora de escopo sem horizonte', troca('_produto.md', ' · nesta versão', '')],
  ['APR-R10', 'regra global que não é afirmação', troca('_produto.md', '- [ ] PRD-Q1  Toda tela', '- Toda tela')],
  ['CTD-R8', 'contador com um só espaço', troca('_contadores.md', '- PED-R  4  frete-por-regiao', '- PED-R 4 frete-por-regiao')],
  ['CTD-R8', 'contador sem nome curto', troca('_contadores.md', '- PED-R  4  frete-por-regiao', '- PED-R  4')],
  ['CTD-R8', 'contador em 0 com nome curto', troca('_contadores.md', '- P  1  prazo-cancelamento', '- P  0  prazo-cancelamento')],
  ['CTD-R8', 'sequência que não é da seção', troca('_contadores.md', '- D  1  pedido-pago-fixo', '- PED-R  1  pedido-pago-fixo')],
  ['APG-R5', 'pergunta sem interrogação', troca('_perguntas.md', 'é de 30 dias?', 'é de 30 dias')],
  ['APG-R5', 'sub-item de pergunta com prefixo desconhecido', troca('_perguntas.md', '  - opção: 60 dias', '  - talvez: 60 dias')],
  ['DEC-R19', 'contexto em sub-item', troca('decisoes/pedidos/D1-pedido-pago-fixo.md', '- Contexto: o pagamento já foi feito sobre aquele total\n', '- Contexto\n  - o pagamento já foi feito sobre aquele total\n')],
  ['DEC-R19', 'nenhuma alternativa descartada', troca('decisoes/pedidos/D1-pedido-pago-fixo.md', '  - Permitir a mudança e cobrar a diferença: exige uma segunda cobrança\n', '')],
  ['DEC-R19', 'alternativa sem motivo', troca('decisoes/pedidos/D1-pedido-pago-fixo.md', ': exige uma segunda cobrança', '')],
  ['DEC-R19', 'consequência sem Ganha nem Aceita', troca('decisoes/pedidos/D1-pedido-pago-fixo.md', '  - Ganha: o total', '  - o total')],
  ['DEC-R19', 'alteração sem data', troca('decisoes/pedidos/D1-pedido-pago-fixo.md', '- 2026-01-10: decisão criada', '- decisão criada')],
];

for (const [regra, erro, mudanca] of casos) {
  test(`${regra}: ${erro}`, () => {
    assert.deepEqual(regrasDe(violacoesCom(mudanca)), [regra]);
  });
}

test('VRF-R11: pasta que não é de área nem de decisões é ignorada', () => {
  assert.deepEqual(violacoesCom({ 'arquitetura/sistema.md': 'qualquer coisa\n- [ok] sem forma\n' }), []);
});

test('VRF-R13: o conteúdo gerado não é lido', () => {
  const gerado = '<!-- gerado; não editar -->';
  assert.deepEqual(violacoesCom({
    ...troca('pedidos.md', '## Linguagem\n', `## Índice\n${gerado}\nqualquer coisa\n- [ok] sem forma\n\n## Linguagem\n`),
    'glossario.md': `${gerado}\nqualquer coisa\n`,
    'decisoes/pedidos/README.md': `${gerado}\nqualquer coisa\n`,
  }), []);
});

test('VRF-V1: a violação traz arquivo, linha, regra e frase, e sai uma só por linha estranha', () => {
  const violacoes = violacoesCom(troca('pedidos.md', '- [ ] PED-C1  Fechar o pedido', '- [ok PED-C1 Fechar o pedido'));
  assert.equal(violacoes.length, 1);
  assert.deepEqual({ ...violacoes[0], frase: undefined }, { arquivo: 'pedidos.md', linha: 28, regra: 'LIN-R11', frase: undefined });
  assert.match(violacoes[0].frase, /não reconhecida/);
});

test('VRF-V1: as violações saem em ordem de arquivo e de linha', () => {
  const violacoes = violacoesCom({
    ...troca('pedidos.md', '- [ ] PED-Q1', '- [ok] PED-Q1'),
    ...troca('_produto.md', '- Banco · pagamentos', '- Banco'),
    'pedidos.md': (texto) => texto.replace('- [ ] PED-Q1', '- [ok] PED-Q1').replace('único; imutável', 'único; fixo'),
  });
  assert.deepEqual(violacoes.map((v) => `${v.arquivo}:${v.linha} ${v.regra}`), ['_produto.md:26 APR-R10', 'pedidos.md:12 ATR-R7', 'pedidos.md:27 LIN-R4']);
});

test('VRF-R7: a linha de comando imprime as violações, o total e sai com 1', () => {
  const saida = spawnSync(process.execPath, [script, join(raiz, 'testes', 'tabularium-validar', 'invalida')], { encoding: 'utf8' });
  assert.equal(saida.status, 1);
  assert.match(saida.stdout, /invalida\/_produto\.md {2}VRF-R10 {2}falta este arquivo/);
  assert.match(saida.stdout, /\n4 violações\n$/);
});

test('VRF-R7: a linha de comando sai com 0 numa especificação válida', () => {
  const saida = execFileSync(process.execPath, [script, 'specs'], { cwd: raiz, encoding: 'utf8' });
  assert.equal(saida, 'nenhuma violação\n');
});
