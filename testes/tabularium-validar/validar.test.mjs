// Cada regra que o validador checa e acusa tem ao menos um exemplo que viola só ela;
// a que só descreve o comportamento de outra checagem tem um teste desse comportamento.
// Rode com: node --test testes/

import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { validar } from '../../skills/tabularium-validar/validar.mjs';
import { exemplo, regrasDe, troca, violacoesCom } from './exemplo.mjs';

const exemploDeDecisao = (codigo) => exemplo['decisoes/pedidos/D1-pedido-pago-fixo.md'].replace('`D1`', '`' + codigo + '`');

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
  ['ESP-R9', 'título que não é de célula nem de seção', troca('pedidos.md', '## Tipos\n', '## Notas\n')],
  ['VRF-R8', 'recuo de sub-item com número ímpar de espaços', troca('pedidos.md', '  - exige:', '   - exige:')],
  ['VRF-R8', 'sub-item num termo da linguagem', troca('pedidos.md', 'que ainda não foi fechado\n', 'que ainda não foi fechado\n  - também dito cesta\n')],
  ['VRF-R8', 'arquivo estranho numa pasta de decisões', { 'decisoes/pedidos/notas.md': '# Notas\n' }],
  ['VRF-R12', 'falta AGENTS.md', { 'AGENTS.md': null }],
  ['VRF-R12', 'falta a legenda das decisões', { 'decisoes/_convencoes.md': null }],

  ['ARE-R23.2', 'arquivo começado por "_" que a especificação não tem', { '_notas.md': '# Notas\n' }],
  ['ARE-R23.4', 'área sem a frase', troca('pedidos.md', 'Os **Pedidos** e os **Itens de pedido** que os compõem.\n', '')],
  ['ARE-R23.4', 'área em pasta com o _area.md sem a frase', { 'estoque/_area.md': '# Estoque\n- célula central: **Pedido**\n- dono: vendas\n' }],
  ['ARE-R23.5', 'área sem a célula central', troca('pedidos.md', '- célula central: **Pedido**\n', '')],
  ['ARE-R23.5', 'área sem o dono', troca('pedidos.md', '- dono: vendas\n', '')],
  ['ARE-R23.5', 'dados da área fora de ordem', troca('pedidos.md', '- prioridade: núcleo\n- dono: vendas\n', '- dono: vendas\n- prioridade: núcleo\n')],
  ['ARE-R23.5', 'dado da área repetido', troca('pedidos.md', '- dono: vendas\n', '- dono: vendas\n- dono: compras\n')],
  ['ARE-R23.5', 'linha que não é dado da área, antes das seções', troca('pedidos.md', '- dono: vendas\n', '- dono: vendas\n- responsável: vendas\n')],
  ['ARE-R11', 'seções da área fora de ordem', troca('pedidos.md', '## Linguagem\n- **carrinho**: **Pedido** que ainda não foi fechado\n\n## Tipos\n- **Quantidade**: inteiro; de 1 a 99\n', '## Tipos\n- **Quantidade**: inteiro; de 1 a 99\n\n## Linguagem\n- **carrinho**: **Pedido** que ainda não foi fechado\n')],
  ['APR-R9', 'seção que não existe em _produto.md', troca('_produto.md', '## Fora de escopo', '## Futuro')],
  ['APR-R9', 'seções de _produto.md fora de ordem', troca('_produto.md', '## Regras globais\n- [ ] PRD-Q1  Toda tela responde em até 3 s\n\n## Fora de escopo\n- Entrega dos produtos · nesta versão\n', '## Fora de escopo\n- Entrega dos produtos · nesta versão\n\n## Regras globais\n- [ ] PRD-Q1  Toda tela responde em até 3 s\n')],
  ['CEL-R2', 'célula sem frase de definição', troca('pedidos.md', 'Produto e **Quantidade** dentro de um **Pedido**.\n', '')],
  ['CEL-R2', 'linha em branco entre o título e a definição', troca('pedidos.md', '## **Item de pedido**  `ITE`\n', '## **Item de pedido**  `ITE`\n\n')],
  ['CEL-R3', 'visão antes de capacidade', troca('pedidos.md', '- [ ] PED-C1  Fechar o pedido\n  - exige: ao menos um **Item de pedido**\n  - o pedido passa a esperar o pagamento\n- [ ] PED-V1 · atendente  Ver os pedidos do dia\n', '- [ ] PED-V1 · atendente  Ver os pedidos do dia\n- [ ] PED-C1  Fechar o pedido\n  - exige: ao menos um **Item de pedido**\n  - o pedido passa a esperar o pagamento\n')],
  ['CEL-R3', 'linha de modelo depois de afirmação', troca('pedidos.md', '- [x] PED-R2  removida\n', '- [x] PED-R2  removida\n- **observação**: texto\n')],
  ['CEL-R3', 'papel que não cabe em bloco de célula', troca('pedidos.md', '- [ ] ITE-R1', '- [ ] ITE-J1')],
  ['CRT-R6', 'sub-item numa regra', troca('pedidos.md', 'o pedido não muda ⟸ [D1]\n', 'o pedido não muda ⟸ [D1]\n  - nem a pedido do cliente\n')],
  ['IND-R2', 'Fronteira escrita à mão', troca('pedidos.md', '## Linguagem\n', '## Fronteira\n- usa **Cliente**, de fora\n\n## Linguagem\n')],
  ['DEC-R1', 'código do título difere do arquivo', troca('decisoes/pedidos/D1-pedido-pago-fixo.md', '`D1`', '`D2`')],
  ['DEC-R1', 'título sem interrogação', troca('decisoes/pedidos/D1-pedido-pago-fixo.md', 'pode mudar?', 'pode mudar')],
  ['DEC-R1', 'decisão sem resolução', troca('decisoes/pedidos/D1-pedido-pago-fixo.md', 'Não, fica como está.\n', '')],
  ['DEC-R2', 'itens do corpo fora de ordem', troca('decisoes/pedidos/D1-pedido-pago-fixo.md', '- Contexto: o pagamento já foi feito sobre aquele total\n- Alternativas descartadas\n  - Permitir a mudança e cobrar a diferença: exige uma segunda cobrança\n', '- Alternativas descartadas\n  - Permitir a mudança e cobrar a diferença: exige uma segunda cobrança\n- Contexto: o pagamento já foi feito sobre aquele total\n')],
  ['DEC-R2', 'decisão sem Histórico', troca('decisoes/pedidos/D1-pedido-pago-fixo.md', '\n## Histórico\n- 2026-01-10: decisão criada\n', '')],

  ['LIN-R4', 'marca que não é [x] nem [ ]', troca('pedidos.md', '- [ ] PED-Q1', '- [ok] PED-Q1')],
  ['LIN-R4', 'afirmação sem marca', troca('pedidos.md', '- [ ] PED-Q1', '- PED-Q1')],
  ['LIN-R11', 'um só espaço antes do texto', troca('pedidos.md', 'PED-Q1  A lista', 'PED-Q1 A lista')],
  ['LIN-R11', 'linha de modelo sem forma', troca('pedidos.md', '- evento: **Pedido pago**\n', '- guarda os itens da compra\n- evento: **Pedido pago**\n')],
  ['LIN-R11', 'regra terminada em ":" sem tabela', troca('pedidos.md', 'o pedido não muda ⟸ [D1]\n', 'o pedido não muda ⟸ [D1]:\n')],
  ['LIN-R11', 'tabela colada na regra', troca('pedidos.md', 'Frete por região:\n\n', 'Frete por região:\n')],
  ['LIN-R11', 'tabela sem separador', troca('pedidos.md', '| --- | --- |\n| capital', '| capital')],
  ['LIN-R11', 'fileira com coluna a mais', troca('pedidos.md', '| interior | cobrado |', '| interior | cobrado | sempre |')],
  ['LIN-R11', 'tabela sem regra antes', troca('pedidos.md', '- [ ] PED-Q1  A lista', '| solta | aqui |\n- [ ] PED-Q1  A lista')],
  ['CRT-R1', 'critério com marca e identificador', troca('pedidos.md', '  - exige: ao menos', '  - [ ] PED-C2  exige: ao menos')],
  ['REF-R14', 'pergunta antes da decisão', troca('pedidos.md', 'é cancelado ⟵ [P1]', 'é cancelado ⟵ [P1] ⟸ [D1]')],
  ['REF-R14', 'citação de decisão fora da forma', troca('pedidos.md', '⟸ [D1]\n', '⟸ D1\n')],
  ['ATR-R6', 'atributo cujo tipo é uma célula, sem cardinalidade', troca('pedidos.md', '- **quantidade**: **Quantidade**\n', '- **quantidade**: **Quantidade**\n- **origem**: **Pedido**\n')],
  ['ATR-R7', 'qualificador fora do vocabulário', troca('pedidos.md', 'único; imutável', 'único; obrigatório')],
  ['ATR-R7', 'derivado sem fórmula', troca('pedidos.md', 'derivado: soma dos **Itens de pedido**', 'derivado')],
  ['ATR-R7', 'inverso sem cardinalidade', troca('pedidos.md', '- **quantidade**: **Quantidade**\n', '- **quantidade**: **Quantidade**; inverso: vários\n')],
  ['ATR-R7', 'relação com trecho que não é qualificador', troca('pedidos.md', '- pertence a 1 **Pedido**\n', '- pertence a 1 **Pedido**; sempre\n')],
  ['CEL-R18', 'duas especializações no mesmo bloco', troca('pedidos.md', '- pertence a 1 **Pedido**\n', '- especializa **Pedido**\n- especializa **Pedido**\n')],
  ['TIP-R2', 'tipo de valor sem forma', troca('pedidos.md', '- **Quantidade**: inteiro; de 1 a 99', '- Quantidade inteira')],
  ['TIP-R2', 'tipo comum sem forma', troca('_produto.md', '- **Situação**: aberto | pago', '- Situação')],
  ['TRM-R9', 'termo da linguagem sem definição', troca('pedidos.md', '- **carrinho**: **Pedido** que ainda não foi fechado', '- carrinho')],
  ['ATO-R2', 'marca de ator com maiúscula', troca('pedidos.md', '· atendente', '· Atendente')],
  ['ATO-R2', 'ator não declarado', troca('pedidos.md', '· atendente', '· gerente')],
  ['ATO-R5', 'regra de tempo sem prazo', troca('pedidos.md', 'aberto há 30 dias', 'aberto há muito tempo')],
  ['ATO-R6', 'dois atores padrão', troca('_produto.md', 'acompanha os **Pedidos**', 'acompanha os **Pedidos**; padrão')],
  ['ATO-R6', 'nenhum ator padrão', troca('_produto.md', 'compra na loja; padrão', 'compra na loja')],
  ['ATO-R7', 'ator sem acesso', troca('_produto.md', '- **Tempo**: dispara os prazos', '- **Tempo**: dispara os prazos\n- Visitante')],
  ['JOR-R2', 'jornada sem as setas', troca('_produto.md', '[PED-C1] → [PED-V1]', '[PED-C1], [PED-V1]')],
  ['APR-R10', 'Propósito não começa pelo problema', troca('_produto.md', '- Problema: ', '- Motivo: ')],
  ['APR-R10', 'externo sem papel', troca('_produto.md', '- **Banco** · pagamentos', '- Banco')],
  ['APR-R10', 'sub-item de externo com verbo desconhecido', troca('_produto.md', '  - fornece:', '  - devolve:')],
  ['APR-R10', 'fora de escopo sem horizonte', troca('_produto.md', ' · nesta versão', '')],
  ['APR-R10', 'regra global que não é afirmação', troca('_produto.md', '- [ ] PRD-Q1  Toda tela', '- Toda tela')],
  ['APG-R5', 'pergunta sem interrogação', troca('_perguntas.md', 'é de 30 dias?', 'é de 30 dias')],
  ['APG-R5', 'sub-item de pergunta com prefixo desconhecido', troca('_perguntas.md', '  - opção: 60 dias', '  - talvez: 60 dias')],
  ['DEC-R19', 'contexto em sub-item', troca('decisoes/pedidos/D1-pedido-pago-fixo.md', '- Contexto: o pagamento já foi feito sobre aquele total\n', '- Contexto\n  - o pagamento já foi feito sobre aquele total\n')],
  ['DEC-R19', 'nenhuma alternativa descartada', troca('decisoes/pedidos/D1-pedido-pago-fixo.md', '  - Permitir a mudança e cobrar a diferença: exige uma segunda cobrança\n', '')],
  ['DEC-R19', 'alternativa sem motivo', troca('decisoes/pedidos/D1-pedido-pago-fixo.md', ': exige uma segunda cobrança', '')],
  ['DEC-R19', 'consequência sem Ganha nem Aceita', troca('decisoes/pedidos/D1-pedido-pago-fixo.md', '  - Ganha: o total', '  - o total')],
  ['DEC-R19', 'alteração sem data', troca('decisoes/pedidos/D1-pedido-pago-fixo.md', '- 2026-01-10: decisão criada', '- decisão criada')],

  ['IDT-R1', 'identificador fora da forma', troca('pedidos.md', '- [ ] PED-Q1', '- [ ] PED-q1')],
  ['IDT-R1', 'identificador de número 0', troca('pedidos.md', '- [ ] PED-Q1', '- [ ] PED-Q0')],
  ['IDT-R1', 'letra que não é papel', troca('pedidos.md', '- [ ] PED-Q1', '- [ ] PED-X1')],
  ['IDT-R1', 'identificador repetido', troca('pedidos.md', '- [ ] PED-Q1', '- [ ] PED-R1')],
  ['IDT-R3', 'sigla de outra célula', troca('pedidos.md', '- [ ] ITE-R1', '- [ ] PED-R5')],
  ['IDT-R3', 'sigla que não é PRD em _produto.md', troca('_produto.md', '- [ ] PRD-Q1', '- [ ] PED-R5')],
  ['REF-R1', 'referência a identificador que não existe', troca('pedidos.md', 'ao menos um **Item de pedido**', 'ao menos um **Item de pedido**, conforme [ITE-R7]')],
  ['REF-R1', 'jornada com passo que não existe', troca('_produto.md', '[PED-C1] → [PED-V1]', '[PED-C1] → [PED-V9]')],
  ['REF-R1', 'lápide movida para identificador que não existe', troca('pedidos.md', '- [x] PED-R2  removida', '- [x] PED-R2  movida → [ITE-R7]')],
  ['REF-R1', 'decisão citada sem arquivo', troca('pedidos.md', '⟸ [D1]', '⟸ [D1, D9]')],
  ['REF-R1', 'decisão citada por outra decisão sem arquivo', troca('decisoes/pedidos/D1-pedido-pago-fixo.md', 'sobre aquele total', 'sobre aquele total ⟸ [D9]')],
  ['REF-R1', 'pergunta citada que não está aberta', { ...troca('pedidos.md', '⟵ [P1]', '⟵ [P9]'), ...troca('_perguntas.md', '  - opção: 60 dias\n', '  - opção: 60 dias\n  - sobre: **Pedido**\n') }],
  ['JOR-R3', 'jornada que cita uma regra', troca('_produto.md', '[PED-C1] → [PED-V1]', '[PED-C1] → [PED-R1]')],
  ['EVT-R2', 'evento sem reação', troca('pedidos.md', 'Ao **Pedido pago**: a quantidade', 'A quantidade')],
  ['PER-R5', 'pergunta sem linha que a cite e sem sobre', troca('pedidos.md', ' ⟵ [P1]', '')],
  ['DEC-R22.1', 'código de decisão repetido em outra pasta', { 'decisoes/_produto/D1-outra.md': (t) => exemploDeDecisao('D1') }],
  ['DEC-R22.1', 'código de decisão repetido, com prefixo de mudança', { 'decisoes/pedidos/D9.1-outra.md': exemploDeDecisao('D9.1'), 'decisoes/_produto/D9.1-mais-uma.md': exemploDeDecisao('D9.1') }],
  ['DEC-R22.2', 'código de decisão com zero à esquerda no prefixo', { 'decisoes/pedidos/D09.1-outra.md': exemploDeDecisao('D09.1') }],
  ['DEC-R22.2', 'código de decisão sorteado com vogal', { 'decisoes/pedidos/Dkaq2.1-outra.md': exemploDeDecisao('Dkaq2.1') }],
  ['IDT-R1', 'prefixo de issue com zero à esquerda', troca('pedidos.md', '- [ ] PED-Q1', '- [ ] PED-Q09.1')],
  ['IDT-R1', 'número de ordem 0', troca('pedidos.md', '- [ ] PED-Q1', '- [ ] PED-Q9.0')],
  ['IDT-R1', 'número de ordem com zero à esquerda', troca('pedidos.md', '- [ ] PED-Q1', '- [ ] PED-Q9.01')],
  ['IDT-R1', 'código sorteado começado por dígito', troca('pedidos.md', '- [ ] PED-Q1', '- [ ] PED-Q2k7q.1')],
  ['IDT-R1', 'código sorteado com vogal', troca('pedidos.md', '- [ ] PED-Q1', '- [ ] PED-Qkaq2.1')],
  ['IDT-R1', 'código sorteado com 5 caracteres', troca('pedidos.md', '- [ ] PED-Q1', '- [ ] PED-Qk7q2b.1')],
  ['IDT-R1', 'código sorteado sem número de ordem', troca('pedidos.md', '- [ ] PED-Q1', '- [ ] PED-Qk7q2')],
  ['IDT-R1', 'identificador com prefixo de mudança repetido', troca('pedidos.md', '- [ ] PED-Q1  A lista', '- [ ] PED-Q9.1  A lista de pedidos cabe numa tela\n- [ ] PED-Q9.1  A lista')],
  ['REF-R1', 'referência a identificador com prefixo de mudança que não existe', troca('pedidos.md', 'ao menos um **Item de pedido**', 'ao menos um **Item de pedido**, conforme [ITE-R9.1]')],
  ['PER-R22.1', 'código de pergunta com zero à esquerda no prefixo', troca('_perguntas.md', '  - opção: 60 dias\n', '  - opção: 60 dias\n- P09.1  O frete do interior muda?\n  - sobre: **Pedido**\n')],
  ['PER-R22.2', 'código de pergunta repetido', troca('_perguntas.md', '  - opção: 60 dias\n', '  - opção: 60 dias\n- P1  O frete do interior muda?\n  - sobre: **Pedido**\n')],
  ['ARE-R23.2', '_contadores.md que sobrou de antes do prefixo de mudança', { '_contadores.md': '# Contadores\n' }],

  ['TRM-R22', 'termo definido duas vezes', troca('pedidos.md', 'que ainda não foi fechado\n', 'que ainda não foi fechado\n- **carrinho**: outra coisa\n')],
  ['TRM-R22', 'termo da linguagem com o nome de um ator', troca('pedidos.md', '- **carrinho**:', '- **Cliente**: quem compra\n- **carrinho**:')],
  ['TRM-R22', 'atributo repetido no mesmo bloco', troca('pedidos.md', '- **quantidade**: **Quantidade**\n', '- **quantidade**: **Quantidade**\n- **quantidade**: inteiro\n')],
  ['TRM-R23', 'termo da linguagem definido sem negrito', troca('pedidos.md', '- **carrinho**: ', '- carrinho: ')],
  ['TRM-R23', 'tipo de valor definido sem negrito', troca('pedidos.md', '- **Quantidade**: inteiro', '- Quantidade: inteiro')],
  ['TRM-R23', 'tipo comum definido sem negrito', troca('_produto.md', '- **Dinheiro**: decimal', '- Dinheiro: decimal')],
  ['TRM-R23', 'atributo definido sem negrito', troca('pedidos.md', '- **prazo**: inteiro', '- prazo: inteiro')],
  ['TRM-R23', 'evento definido sem negrito', troca('pedidos.md', '- evento: **Pedido pago**', '- evento: Pedido pago')],
  ['TRM-R23', 'ator definido sem negrito', troca('_produto.md', '- **Atendente**: acompanha', '- Atendente: acompanha')],
  ['TRM-R23', 'externo definido sem negrito', troca('_produto.md', '- **Banco** · pagamentos', '- Banco · pagamentos')],
  ['TRM-R23', 'célula com o título sem negrito', troca('pedidos.md', '## **Modalidade**  `MOD`', '## Modalidade  `MOD`')],
  ['TRM-R23', 'negrito só numa parte do nome', troca('pedidos.md', '## **Item de pedido**  `ITE`', '## **Item** de pedido  `ITE`')],
  ['TRM-R4', 'atributo homônimo citado sem a célula', { 'pedidos.md': (t) => t.replace('- **quantidade**: **Quantidade**\n', '- **quantidade**: **Quantidade**\n- **número**: inteiro\n').replace('que ainda não foi fechado', 'que ainda não foi fechado e já tem **número**') }],
  ['TRM-R14', 'negrito que não é termo', troca('pedidos.md', 'Fechar o pedido', 'Fechar o **carrinho de compras**')],
  ['TRM-R14', 'plural que as terminações não explicam', troca('pedidos.md', 'ao menos um **Item de pedido**', 'ao menos dois **Itenz de pedido**')],
  ['REF-R1', 'atributo que a célula não tem', troca('pedidos.md', 'Fechar o pedido', 'Fechar o pedido pela **Pedido.cor**')],
  ['TRM-R20', 'termo em negrito escrito com sublinhados', troca('pedidos.md', 'ao menos um **Item de pedido**', 'ao menos um __Item de pedido__')],
  ['TRM-R20', 'ênfase escrita com sublinhados', troca('pedidos.md', 'Fechar o pedido', 'Fechar o pedido __sempre__')],
  ['TRM-R20', 'negrito escrito com marca de HTML', troca('pedidos.md', 'ao menos um **Item de pedido**', 'ao menos um <strong>Item de pedido</strong>')],
  ['TRM-R20', 'negrito com sublinhados no título do arquivo', troca('pedidos.md', '# Pedidos\n', '# __Pedidos__\n')],
  ['TRM-R25', 'negrito no título do arquivo', troca('pedidos.md', '# Pedidos\n', '# **Pedidos**\n')],
  ['TRM-R25', 'termo em negrito no cabeçalho de tabela', troca('pedidos.md', '| Região | Frete |', '| Região do **Cliente** | Frete |')],
  ['DEC-R11', 'termo em negrito numa decisão', troca('decisoes/pedidos/D1-pedido-pago-fixo.md', 'sobre aquele total', 'sobre o total do **Pedido**')],
  ['DEC-R11', 'ênfase em negrito no título de uma decisão', troca('decisoes/pedidos/D1-pedido-pago-fixo.md', 'Um pedido pago', 'Um pedido **pago**')],
  ['DEC-R11', 'negrito com sublinhados numa decisão', troca('decisoes/pedidos/D1-pedido-pago-fixo.md', 'exige uma segunda cobrança', 'exige __outra__ cobrança')],
  ['TRM-R24', 'sinônimo proibido em negrito', { 'pedidos.md': (t) => t.replace('soma dos **Itens de pedido**', 'soma dos **Itens de pedido** (~~valor, montante~~)').replace('A lista de pedidos abre', 'A lista de pedidos mostra o **valor** e abre') }],
  ['TRM-R24', 'sinônimo proibido da célula, em negrito', { 'pedidos.md': (t) => t.replace('Compra que um **Cliente** faz na loja.', 'Compra que um **Cliente** faz na loja. (~~encomenda~~)').replace('A lista de pedidos abre', 'A lista de **encomendas** abre') }],
  ['TRM-R13', 'sinônimos proibidos no meio da linha', troca('pedidos.md', 'soma dos **Itens de pedido**', 'soma (~~valor, montante~~) dos **Itens de pedido**')],
  ['TRM-R18', 'declaração de sinônimos no fim de uma regra', troca('pedidos.md', 'o pedido não muda ⟸ [D1]', 'o pedido não muda (~~encomenda~~) ⟸ [D1]')],
  ['TRM-R18', 'declaração de sinônimos no meio de uma regra', troca('pedidos.md', 'Depois de pago, o pedido', 'Depois de pago (~~quitado~~), o pedido')],
  ['TRM-R18', 'declaração de sinônimos num sub-item', troca('pedidos.md', 'o pedido passa a esperar o pagamento', 'o pedido passa a esperar o pagamento (~~quitação~~)')],
  ['TRM-R18', 'declaração de sinônimos numa célula de tabela', troca('pedidos.md', '| capital | grátis |', '| capital (~~metrópole~~) | grátis |')],
  ['TRM-R18', 'declaração de sinônimos numa pergunta', troca('_perguntas.md', 'é de 30 dias?', 'é de 30 dias (~~validade~~)?')],
  ['TRM-R18', 'declaração de sinônimos numa decisão', troca('decisoes/pedidos/D1-pedido-pago-fixo.md', 'sobre aquele total', 'sobre aquele total (~~soma~~)')],
  ['TRM-R19', 'sinônimo proibido que é um termo definido', troca('pedidos.md', 'soma dos **Itens de pedido**', 'soma dos **Itens de pedido** (~~cliente~~)')],
  ['TRM-R19', 'sinônimo proibido que é o plural de um termo', troca('pedidos.md', 'soma dos **Itens de pedido**', 'soma dos **Itens de pedido** (~~Clientes~~)')],
  ['TRM-R19', 'sinônimo proibido que é atributo de outra célula', troca('pedidos.md', 'soma dos **Itens de pedido**', 'soma dos **Itens de pedido** (~~prazo~~)')],

  ['DRF-R4', 'arquivo de dados citado por uma qualidade', { ...troca('pedidos.md', '- [ ] TAR-R1  As tarifas', '- [ ] TAR-Q1  As tarifas') }],
  ['DRF-R8', 'arquivo de dados em célula sem identidade', troca('pedidos.md', '- **código**: texto; identidade\n- [ ] EMB-R1', '- **código**: texto\n- [ ] EMB-R1')],
  ['DRF-R8', 'arquivo de dados citado numa regra global', troca('_produto.md', 'responde em até 3 s', 'responde em até 3 s: [PRD-telas.csv]')],
  ['DRF-R9', 'duas regras de dados na mesma célula', { ...troca('pedidos.md', '| EXP | Expressa | |\n', '| EXP | Expressa | |\n\n- [ ] MOD-R2  Outras modalidades, por **código**: [MOD-outras.csv]\n'), 'dados/MOD-outras.csv': 'código\nRET\n' }],
  ['DRF-R10', 'coluna que não é atributo da célula', troca('pedidos.md', '| Código | Nome | Prazo |', '| Código | Nome | Dias |')],
  ['DRF-R11', 'identidade repetida na tabela', troca('pedidos.md', '| EXP | Expressa | |', '| ECO | Expressa | |')],
  ['DRF-R11', 'identidade repetida no CSV', troca('dados/TAR-tarifas.csv', '"Expressa leve, até 1 kg",EXP,21', 'Econômica leve,EXP,21')],
  ['DRF-R11', 'identidade repetida no JSON', troca('dados/EMB-embalagens.json', '"código": "G"', '"código": "P"')],
  ['DRF-R14', 'regra que não nomeia a identidade primeiro', troca('pedidos.md', 'por **nome**, com a **Modalidade** e o **preço**', 'com a **Modalidade**, o **preço** e o **nome**')],
  ['DRF-R15', 'citação com caminho', troca('pedidos.md', '[TAR-tarifas.csv]', '[dados/TAR-tarifas.csv]')],
  ['ADA-R1', 'subpasta em dados/', { 'dados/antigos/TAR-velhas.csv': 'nome\n' }],
  ['ADA-R2', 'arquivo com a sigla de outra célula', { ...troca('pedidos.md', '[TAR-tarifas.csv]', '[MOD-tarifas.csv]'), 'dados/TAR-tarifas.csv': null, 'dados/MOD-tarifas.csv': exemplo['dados/TAR-tarifas.csv'] }],
  ['ADA-R2', 'nome de arquivo com maiúscula', { ...troca('pedidos.md', '[TAR-tarifas.csv]', '[TAR-Tarifas.csv]'), 'dados/TAR-tarifas.csv': null, 'dados/TAR-Tarifas.csv': exemplo['dados/TAR-tarifas.csv'] }],
  ['ADA-R3', 'arquivo de dados em outro formato', { ...troca('pedidos.md', '[TAR-tarifas.csv]', '[TAR-tarifas.yaml]'), 'dados/TAR-tarifas.csv': null, 'dados/TAR-tarifas.yaml': 'nome: Econômica leve\n' }],
  ['ADA-R4', 'arquivo que nenhuma regra cita', { 'dados/TAR-antigas.csv': 'nome\n' }],
  ['ADA-R9', 'JSON mal formado', troca('dados/EMB-embalagens.json', '\n]\n', '\n')],
  ['ADA-R9', 'JSON que não é uma lista', { 'dados/EMB-embalagens.json': '{ "código": "P" }\n' }],
  ['ADA-R13', 'identidade fora da primeira coluna do CSV', { 'dados/TAR-tarifas.csv': 'Modalidade,nome,preço\nECO,Econômica leve,12\n' }],
  ['ADA-R15', 'coluna do CSV que a regra não nomeia', troca('dados/TAR-tarifas.csv', 'nome,Modalidade,preço', 'nome,Modalidade,preço,peso')],
  ['ADA-R15', 'atributo nomeado que o CSV não traz', troca('dados/TAR-tarifas.csv', 'nome,Modalidade,preço', 'nome,Modalidade')],
  ['ADA-R16', 'chave do JSON que a regra não nomeia', troca('dados/EMB-embalagens.json', '{ "código": "P",', '{ "código": "P", "peso": 2,')],
  ['REF-R1', 'arquivo de dados citado que não existe', { 'dados/TAR-tarifas.csv': null }],
];

for (const [regra, erro, mudanca] of casos) {
  test(`${regra}: ${erro}`, () => {
    assert.deepEqual(regrasDe(violacoesCom(mudanca)), [regra]);
  });
}

test('IDT-R1: o código com prefixo de mudança, de issue ou sorteado, convive com o anterior a ele', () => {
  assert.deepEqual(violacoesCom({
    'pedidos.md': (t) => t
      .replace('- [ ] PED-Q1  A lista', '- [ ] PED-R9.1  O pedido fechado não volta a aberto ⟸ [D1, D9.1]\n- [ ] PED-Rk7q2.1  O pedido cancelado não é pago, conforme: [PED-R9.1] ⟵ [Pk7q2.1]\n- [ ] PED-Q1  A lista')
      .replace('ao menos um **Item de pedido**', 'ao menos um **Item de pedido**, conforme [PED-Rk7q2.1]'),
    ...troca('_produto.md', '[PED-C1] → [PED-V1]', '[PED-C1] → [PED-V1]\n- PRD-J9.1  Conferir: [PED-V1]'),
    ...troca('_perguntas.md', '  - opção: 60 dias\n', '  - opção: 60 dias\n- Pk7q2.1  O pedido cancelado pode ser reaberto?\n- P9.1  O frete do interior muda?\n  - sobre: **Pedido**\n'),
    'decisoes/pedidos/D9.1-fechado-nao-reabre.md': exemploDeDecisao('D9.1'),
    'decisoes/pedidos/Dk7q2.1-outra.md': exemploDeDecisao('Dk7q2.1').replace('sobre aquele total', 'sobre aquele total ⟸ [D9.1]'),
  }), []);
});

test('IDT-R1: no código anterior ao prefixo de mudança, o zero à esquerda não faz outro código', () => {
  assert.deepEqual(violacoesCom(troca('pedidos.md', 'o pedido não muda ⟸ [D1]', 'o pedido não muda ⟸ [D01]')), []);
  assert.deepEqual(regrasDe(violacoesCom(troca('pedidos.md', '- [ ] PED-Q1', '- [ ] PED-R01'))), ['IDT-R1']);
});

const estoque = '# Estoque\nO que a loja tem para vender.\n- célula central: **Produto**\n- dono: compras\n\n## **Produto**  `PRO`\nCoisa que a loja vende.\n- **nome**: texto; identidade\n';

test('ARE-R23.1: todo arquivo .md da pasta que não é fixo é área, e toda subpasta com _area.md', () => {
  assert.deepEqual(violacoesCom({ 'estoque.md': estoque }), []);
  const [cabecalho, bloco] = estoque.split('\n\n');
  assert.deepEqual(violacoesCom({ 'estoque/_area.md': `${cabecalho}\n`, 'estoque/produto.md': `# Produto\n\n${bloco}` }), []);
  assert.deepEqual(violacoesCom({ 'estoque/produto.md': 'qualquer coisa\n- [ok] sem forma\n' }), []);
});

test('ARE-R23.3: a área em pasta é lida, com _area.md e um arquivo por célula', () => {
  const [inicio, itens] = exemplo['pedidos.md'].split('## **Item de pedido**');
  const mudancas = {
    'pedidos.md': null,
    'pedidos/_area.md': inicio.slice(0, inicio.indexOf('## **Pedido**')),
    'pedidos/pedido.md': `# Pedido\n\n${inicio.slice(inicio.indexOf('## **Pedido**'))}`,
    'pedidos/item.md': `# Item de pedido\n\n## **Item de pedido**${itens}`,
  };
  assert.deepEqual(violacoesCom(mudancas), []);
  assert.deepEqual(regrasDe(violacoesCom({ ...mudancas, 'pedidos/item.md': `# Item de pedido\n- dono: vendas\n\n## **Item de pedido**${itens}` })), ['ARE-R23.5']);
});

test('VRF-R23.2: a tabela de áreas que sobrou em _produto.md é acusada, com o que fazer dela', () => {
  const violacoes = violacoesCom(troca('_produto.md', '## Atores\n', '## Áreas\n| Área | Célula central | Prioridade | Dono | Arquivo |\n| --- | --- | --- | --- | --- |\n| Pedidos | **Pedido** | núcleo | vendas | pedidos.md |\n\n## Atores\n'));
  assert.deepEqual(violacoes.map((v) => `${v.arquivo}:${v.linha} ${v.regra}`), ['_produto.md:9 APR-R9']);
  assert.match(violacoes[0].frase, /leve a célula central, a prioridade e o dono de cada área para o arquivo dela/);
});

test('VRF-R23.1: o README.md não é lido, em nenhuma pasta', () => {
  const solto = 'qualquer coisa ⟸ D9\n- [ok] sem forma\n';
  assert.deepEqual(violacoesCom({ 'README.md': solto, 'decisoes/pedidos/README.md': solto, 'arquitetura/README.md': solto, 'interface/README.md': solto }), []);
});

test('ATR-R7: a relação leva qualificadores, como o inverso', () => {
  assert.deepEqual(violacoesCom({
    'pedidos.md': (t) => t
      .replace('- pertence a 1 **Pedido**\n', '- pertence a 1 **Pedido**; inverso: 1..N\n')
      .replace('- 1..N **Item de pedido**\n', '- 1..N **Item de pedido**; inverso: 1\n'),
  }), []);
});

test('TRM-R24: declarar sinônimos proibidos não é usá-los', () => {
  assert.deepEqual(violacoesCom(troca('pedidos.md', 'soma dos **Itens de pedido**', 'soma dos **Itens de pedido** (~~valor, montante~~) ⟸ [D1]')), []);
});

test('TRM-R13: a declaração fora do fim é acusada, mas os sinônimos continuam proibidos', () => {
  const usado = { 'pedidos.md': (t) => t.replace('soma dos **Itens de pedido**', 'soma (~~valor, montante~~) dos **Itens de pedido**').replace('A lista de pedidos abre', 'A lista de pedidos mostra o **Valor** e abre') };
  assert.deepEqual(regrasDe(violacoesCom(usado)), ['TRM-R13', 'TRM-R24']);
});

test('TRM-R18: no título a declaração fora do lugar é acusada, além de TRM-R23', () => {
  const regras = regrasDe(violacoesCom(troca('pedidos.md', '## **Pedido**  `PED`', '## **Pedido** (~~encomenda~~)  `PED`')));
  assert.ok(regras.includes('TRM-R18'));
  assert.ok(!regras.includes('TRM-R13'));
});

test('TRM-R18: o sinônimo declarado fora da definição não vira proibido', () => {
  const usado = { 'pedidos.md': (t) => t.replace('o pedido não muda ⟸ [D1]', 'o pedido não muda (~~encomenda~~) ⟸ [D1]').replace('A lista de pedidos abre', 'A lista de **encomendas** abre') };
  assert.deepEqual(regrasDe(violacoesCom(usado)), ['TRM-R14', 'TRM-R18']);
});

test('TRM-R18: a violação diz onde a declaração cabe, na especificação e na decisão', () => {
  const [naRegra] = violacoesCom(troca('pedidos.md', 'o pedido não muda ⟸ [D1]', 'o pedido não muda (~~encomenda~~) ⟸ [D1]'));
  assert.match(naRegra.frase, /^esta linha não define termo/);
  const [naDecisao] = violacoesCom(troca('decisoes/pedidos/D1-pedido-pago-fixo.md', 'sobre aquele total', 'sobre aquele total (~~soma~~)'));
  assert.match(naDecisao.frase, /^só a especificação declara/);
});

test('TRM-R19: uma só violação, na declaração, que diz onde o termo está definido', () => {
  const doTermo = violacoesCom(troca('pedidos.md', 'soma dos **Itens de pedido**', 'soma dos **Itens de pedido** (~~cliente~~)'));
  assert.deepEqual(doTermo.map((v) => `${v.arquivo}:${v.linha} ${v.frase}`), ['pedidos.md:17 "cliente" está em não usar, mas é termo definido em _produto.md, linha 10; tire-o da declaração ou renomeie o termo']);
  const doAtributo = violacoesCom(troca('pedidos.md', 'soma dos **Itens de pedido**', 'soma dos **Itens de pedido** (~~prazo~~)'));
  assert.deepEqual(doAtributo.map((v) => `${v.arquivo}:${v.linha} ${v.frase}`), ['pedidos.md:17 "prazo" está em não usar, mas é atributo de Modalidade, em pedidos.md, linha 46; tire-o da declaração ou renomeie o termo']);
});

test('VRF-R28: o termo sem negrito não é acusado, nem na primeira menção', () => {
  assert.deepEqual(violacoesCom({
    'pedidos.md': (t) => t
      .replace('Fechar o pedido', 'Fechar o Pedido e os pedidos, com o Item de pedido')
      .replace('Produto e **Quantidade** dentro de um **Pedido**.', 'Produto de um Pedido, com a Quantidade, dentro do **Pedido**.')
      .replace('a quantidade não muda mais', 'a quantidade não muda mais no Pedido pago nem para o Cliente'),
    ...troca('_produto.md', 'Entrega dos produtos', 'Entrega do carrinho'),
  }), []);
});

test('VRF-R28: o sinônimo proibido em texto sem negrito não é acusado, nem numa decisão', () => {
  assert.deepEqual(violacoesCom({
    'pedidos.md': (t) => t
      .replace('soma dos **Itens de pedido**', 'soma dos **Itens de pedido** (~~valor, montante~~)')
      .replace('Compra que um **Cliente** faz na loja.', 'Compra que um **Cliente** faz na loja. (~~encomenda~~)')
      .replace('A lista de pedidos abre', 'A lista de encomendas mostra o Valor, o montante e abre'),
    ...troca('decisoes/pedidos/D1-pedido-pago-fixo.md', 'sobre aquele total', 'sobre o valor da encomenda'),
  }), []);
});

test('TRM-R24: a palavra proibida dentro do nome de um termo mais longo não é acusada', () => {
  assert.deepEqual(violacoesCom({
    'pedidos.md': (t) => t
      .replace('soma dos **Itens de pedido**', 'soma dos **Itens de pedido** (~~valor~~)')
      .replace('- **quantidade**: **Quantidade**\n', '- **quantidade**: **Quantidade**\n- **valor unitário**: **Dinheiro**\n')
      .replace('- **carrinho**:', '- **valor de face**: quantia impressa\n- **carrinho**:')
      .replace('a quantidade não muda mais', 'o **valor unitário** e os **valores de face** não mudam mais, nem o Valor unitário'),
  }), []);
});

test('TRM-R24: o sinônimo proibido é acusado em maiúsculas e no plural, e não dentro de código', () => {
  const frase = (texto) => violacoesCom({
    'pedidos.md': (t) => t
      .replace('soma dos **Itens de pedido**', 'soma dos **Itens de pedido** (~~valor, montante~~)')
      .replace('A lista de pedidos abre', texto),
  });
  assert.deepEqual(regrasDe(frase('A lista de pedidos mostra o **VALOR** e abre')), ['TRM-R24']);
  assert.deepEqual(regrasDe(frase('A lista de pedidos mostra os **Montantes** e abre')), ['TRM-R24']);
  assert.deepEqual(regrasDe(frase('A lista de pedidos mostra a **valorizada** e abre')), ['TRM-R14']);
  assert.deepEqual(frase('A lista de pedidos mostra o `**valor**` e abre'), []);
});

test('TRM-R24: a violação diz o termo que se escreve no lugar do sinônimo', () => {
  const doAtributo = violacoesCom({ 'pedidos.md': (t) => t.replace('soma dos **Itens de pedido**', 'soma dos **Itens de pedido** (~~valor~~)').replace('A lista de pedidos abre', 'A lista de pedidos mostra os **Valores** e abre') });
  assert.deepEqual(doAtributo.map((v) => v.frase), ['"Valores" é sinônimo proibido de "total"; escreva **total**']);
  const daCelula = violacoesCom({ 'pedidos.md': (t) => t.replace('Compra que um **Cliente** faz na loja.', 'Compra que um **Cliente** faz na loja. (~~encomenda~~)').replace('A lista de pedidos abre', 'A lista de **encomendas** abre') });
  assert.deepEqual(daCelula.map((v) => v.frase), ['"encomendas" é sinônimo proibido de "Pedido"; escreva **Pedido**']);
});

test('TRM-R23: a violação diz o nome a pôr em negrito, e o negrito da definição não é lido como referência', () => {
  const violacoes = violacoesCom(troca('pedidos.md', '- **prazo**: inteiro', '- prazo: inteiro'));
  assert.deepEqual(violacoes.map((v) => `${v.arquivo}:${v.linha} ${v.frase}`), ['pedidos.md:46 na definição, o nome do termo vai em negrito: escreva **prazo**']);
  assert.deepEqual(violacoesCom({ 'pedidos.md': (t) => t.replace('- **prazo**: inteiro; opcional\n', '- **prazo**: inteiro; opcional\n- **número**: inteiro\n') }), []);
});

test('TRM-R11: o plural regular em negrito resolve para o termo', () => {
  const termos = ['visão', 'pão', 'jornal', 'papel', 'réptil', 'farol', 'homem', 'flor'];
  const plurais = ['visões', 'pães', 'jornais', 'papéis', 'répteis', 'faróis', 'homens', 'flores'];
  assert.deepEqual(violacoesCom({
    'pedidos.md': (t) => t
      .replace('- **carrinho**:', `${termos.map((x) => `- **${x}**: coisa`).join('\n')}\n- **carrinho**:`)
      .replace('Fechar o pedido', `Fechar o pedido com ${plurais.map((x) => `**${x}**`).join(', ')}`),
  }), []);
});

test('TRM-R14: não há negrito de ênfase; a violação diz que o negrito só marca termo', () => {
  const violacoes = violacoesCom(troca('pedidos.md', 'Fechar o pedido', 'Fechar o pedido **sempre**'));
  assert.deepEqual(regrasDe(violacoes), ['TRM-R14']);
  assert.match(violacoes[0].frase, /o negrito só marca termo/);
});

test('TRM-R20: dentro de código e no meio de uma palavra, os sublinhados não são negrito', () => {
  assert.deepEqual(violacoesCom(troca('pedidos.md', 'Fechar o pedido', 'Fechar o pedido com `__init__`, `<b>` e data__entrega__nova')), []);
});

test('TRM-R14: o código entre crases duplas, com crase dentro, não é lido', () => {
  assert.deepEqual(violacoesCom(troca('pedidos.md', 'Fechar o pedido', 'Fechar o pedido, como em `` ## **Nada**  `NAD` ``')), []);
});

test('TRM-R17: o negrito que casa com um termo e com um atributo é do termo', () => {
  assert.deepEqual(violacoesCom({
    'pedidos.md': (t) => t
      .replace('- **prazo**: inteiro; opcional\n', '- **prazo**: inteiro; opcional\n- **quantidade**: inteiro\n')
      .replace('Fechar o pedido', 'Fechar o pedido com a **Quantidade**'),
  }), []);
});

test('DRF-R7: a tabela cuja primeira coluna não é a identidade é tabela de decisão', () => {
  assert.deepEqual(violacoesCom(troca('pedidos.md', '| Código | Nome | Prazo |', '| Nome | Código | Dias |')), []);
});

test('VRF-V1: a violação num arquivo de dados cita o arquivo e a linha', () => {
  const violacoes = violacoesCom(troca('dados/TAR-tarifas.csv', '"Expressa leve, até 1 kg",EXP,21', 'Econômica leve,EXP,21'));
  assert.deepEqual(violacoes.map((v) => `${v.arquivo}:${v.linha} ${v.regra}`), ['dados/TAR-tarifas.csv:3 DRF-R11']);
});

test('VRF-R22: pasta que não é de área, de decisões nem de dados é ignorada', () => {
  assert.deepEqual(violacoesCom({ 'rascunhos/notas.md': 'qualquer coisa\n- [ok] sem forma ⟸ D9\n' }), []);
  assert.deepEqual(violacoesCom({ 'arquitetura/sistema.md': 'qualquer coisa\n- [ok] sem forma\n' }), []);
  assert.deepEqual(violacoesCom({ 'interface/_interface.md': 'qualquer coisa\n- [ok] sem forma\n' }), []);
});

test('VRF-R13: o conteúdo gerado não é lido', () => {
  const gerado = '<!-- gerado; não editar -->';
  assert.deepEqual(violacoesCom({
    ...troca('pedidos.md', '## Linguagem\n', `## Fronteira\n${gerado}\nqualquer coisa\n- [ok] sem forma\n\n## Linguagem\n`),
    'glossario.md': `${gerado}\nqualquer coisa\n`,
    'decisoes/pedidos/README.md': `${gerado}\nqualquer coisa\n`,
  }), []);
});

test('VRF-V1: a violação traz arquivo, linha, regra e frase, e sai uma só por linha estranha', () => {
  const violacoes = violacoesCom(troca('pedidos.md', '- [ ] PED-C1  Fechar o pedido', '- [ok PED-C1 Fechar o pedido'));
  assert.equal(violacoes.length, 1);
  assert.deepEqual({ ...violacoes[0], frase: undefined }, { arquivo: 'pedidos.md', linha: 31, regra: 'LIN-R11', frase: undefined });
  assert.match(violacoes[0].frase, /não reconhecida/);
});

test('VRF-V1: as violações saem em ordem de arquivo e de linha', () => {
  const violacoes = violacoesCom({
    ...troca('pedidos.md', '- [ ] PED-Q1', '- [ok] PED-Q1'),
    ...troca('_produto.md', '- **Banco** · pagamentos', '- Banco'),
    'pedidos.md': (texto) => texto.replace('- [ ] PED-Q1', '- [ok] PED-Q1').replace('único; imutável', 'único; fixo'),
  });
  assert.deepEqual(violacoes.map((v) => `${v.arquivo}:${v.linha} ${v.regra}`), ['_produto.md:22 APR-R10', 'pedidos.md:15 ATR-R7', 'pedidos.md:30 LIN-R4']);
});

test('VRF-R7: a linha de comando imprime as violações, o total e sai com 1', () => {
  const saida = spawnSync(process.execPath, [script, join(raiz, 'testes', 'tabularium-validar', 'invalida')], { encoding: 'utf8' });
  assert.equal(saida.status, 1);
  assert.match(saida.stdout, /invalida\/_produto\.md {2}VRF-R10 {2}falta este arquivo/);
  assert.match(saida.stdout, /\n3 violações\n$/);
});

test('VRF-R7: a linha de comando sai com 0 numa especificação válida', () => {
  const saida = execFileSync(process.execPath, [script, 'specs'], { cwd: raiz, encoding: 'utf8' });
  assert.equal(saida, 'nenhuma violação\n');
});

test('VAL-I1: a linha de comando sai com 2 quando o argumento é uma pasta que não existe', () => {
  const saida = spawnSync(process.execPath, [script, join(raiz, 'testes', 'tabularium-validar', 'nao-existe')], { encoding: 'utf8' });
  assert.equal(saida.status, 2);
});

test('VAL-I1: a linha de comando sai com 2 quando o argumento é um arquivo, não uma pasta', () => {
  const saida = spawnSync(process.execPath, [script, script], { encoding: 'utf8' });
  assert.equal(saida.status, 2);
});

// Uma decisão na arquitetura e outra na interface, com os arquivos que as citam.
// A interface cita as três pastas; o resto das linhas dela e da arquitetura não é julgado.
const camadas = {
  'arquitetura/_sistema.md': '# Sistema\nqualquer coisa\n- [ok] ARQ-R1  Nenhum componente tem dependências ⟸ [D2]\n',
  'arquitetura/validacao.md': '# Validação\n- usa 1 **Node.js** ⟸ [D2, D1]\n',
  'arquitetura/decisoes/_sistema/D2-sem-dependencias.md': exemploDeDecisao('D2'),
  'interface/_interface.md': '# Interface\n- [x] IFC-R1  As cores são fixas ⟸ [D3, D2] ⟵ [P7]\n- [x] IFC-R2  O total aparece em destaque ⟸ [D1]\n',
  'interface/decisoes/_interface/D3-cores-fixas.md': exemploDeDecisao('D3'),
  'interface/decisoes/_interface/README.md': 'qualquer coisa ⟸ D9\n',
};

// Aplica as mudanças sobre o exemplo já com as duas pastas.
const violacoesNasCamadas = (mudancas = {}) => {
  const arquivos = { ...camadas };
  for (const [caminho, mudanca] of Object.entries(mudancas)) {
    const antes = arquivos[caminho];
    arquivos[caminho] = typeof mudanca !== 'function' ? mudanca
      : (texto) => mudanca(typeof antes === 'function' ? antes(texto) : antes ?? texto);
  }
  return violacoesCom(arquivos);
};

const D2 = 'arquitetura/decisoes/_sistema/D2-sem-dependencias.md';
const D3 = 'interface/decisoes/_interface/D3-cores-fixas.md';

test('VRF-R23: as decisões de arquitetura e de interface e as citações delas são válidas', () => {
  assert.deepEqual(violacoesNasCamadas(), []);
});

const casosDasCamadas = [
  ['DEC-R1', 'decisão de interface com o código do título diferente do arquivo', troca(D3, '`D3`', '`D4`')],
  ['DEC-R2', 'decisão de arquitetura sem Histórico', troca(D2, '\n## Histórico\n- 2026-01-10: decisão criada\n', '')],
  ['DEC-R19', 'decisão de arquitetura com alternativa sem motivo', troca(D2, ': exige uma segunda cobrança', '')],
  ['DEC-R22.1', 'código de decisão repetido entre a arquitetura e a interface', { 'interface/decisoes/_interface/D2-outra.md': exemploDeDecisao('D2') }],
  ['DEC-R22.1', 'código de decisão repetido entre a especificação e a arquitetura', { 'arquitetura/decisoes/validacao/D1-outra.md': exemploDeDecisao('D1') }],
  ['REF-R1', 'arquivo de arquitetura cita decisão que não existe', troca('arquitetura/validacao.md', '[D2, D1]', '[D2, D9]')],
  ['REF-R1', 'decisão de interface cita decisão que não existe', troca(D3, 'sobre aquele total', 'sobre aquele total ⟸ [D9]')],
  ['REF-R9', 'citação de decisão sem colchetes', troca('arquitetura/validacao.md', '⟸ [D2, D1]', '⟸ D2')],
  ['REF-R9', 'citação de decisão com outro separador', troca('interface/_interface.md', '[D3, D2]', '[D3; D2]')],
  ['REF-R9', 'citação de decisão sem a letra do código', troca('interface/_interface.md', '⟸ [D1]', '⟸ [1]')],
  ['DEC-R21', 'decisão solta direto na pasta de decisões da arquitetura', { 'arquitetura/decisoes/D4-solta.md': exemploDeDecisao('D4') }],
  ['DEC-R21', 'arquivo solto direto na pasta de decisões da interface', { 'interface/decisoes/notas.md': '# Notas\n' }],
  ['VRF-R8', 'arquivo que não é decisão numa subpasta de decisões da interface', { 'interface/decisoes/_interface/notas.md': '# Notas\n' }],
  ['TRM-R18', 'declaração de sinônimos numa decisão de arquitetura', troca(D2, 'sobre aquele total', 'sobre aquele (~~soma~~) total')],
  ['TRM-R18', 'declaração de sinônimos numa decisão de interface', troca(D3, 'sobre aquele total', 'sobre aquele total (~~soma~~)')],
  ['DEC-R11', 'negrito numa decisão de arquitetura', troca(D2, 'sobre aquele total', 'sobre **aquele** total')],
  ['DEC-R11', 'negrito numa decisão de interface', troca(D3, 'sobre aquele total', 'sobre **aquele** total')],
  ['DEC-R22', 'a especificação cita decisão da arquitetura', troca('pedidos.md', 'o pedido não muda ⟸ [D1]', 'o pedido não muda ⟸ [D1, D2]')],
  ['DEC-R22', 'decisão da especificação cita decisão da interface', troca('decisoes/pedidos/D1-pedido-pago-fixo.md', 'sobre aquele total', 'sobre aquele total ⟸ [D3]')],
  ['DEC-R22', 'a arquitetura cita decisão da interface', troca('arquitetura/validacao.md', '[D2, D1]', '[D2, D3]')],
  ['DEC-R22', 'decisão da arquitetura cita decisão da interface', troca(D2, 'sobre aquele total', 'sobre aquele total ⟸ [D3]')],
];

for (const [regra, erro, mudanca] of casosDasCamadas) {
  test(`${regra}: ${erro}`, () => {
    assert.deepEqual(regrasDe(violacoesNasCamadas(mudanca)), [regra]);
  });
}

test('DEC-R22: decisão da interface cita decisão da arquitetura e da especificação', () => {
  assert.deepEqual(violacoesNasCamadas(troca(D3, 'sobre aquele total', 'sobre aquele total ⟸ [D2, D1]')), []);
});

test('DEC-R22: a violação diz de onde é a decisão e o que dali se pode citar', () => {
  const violacoes = violacoesNasCamadas(troca('arquitetura/validacao.md', '[D2, D1]', '[D2, D3]'));
  assert.deepEqual(violacoes.map((v) => `${v.arquivo}:${v.linha} ${v.frase}`), ['arquitetura/validacao.md:2 a decisão D3 é da interface, e daqui só se citam decisões da arquitetura e da especificação']);
});

test('VRF-R24: as instruções, a legenda e a memória informal das duas pastas não são lidas', () => {
  const solto = 'qualquer coisa ⟸ D9 e ⟸ [D9]\n';
  assert.deepEqual(violacoesNasCamadas({
    'arquitetura/AGENTS.md': solto, 'arquitetura/_convencoes.md': solto, 'arquitetura/ideia.md': solto, 'arquitetura/decisoes.md': solto,
    'interface/AGENTS.md': solto, 'interface/_convencoes.md': solto, 'interface/ideia.md': solto, 'interface/decisoes.md': solto,
  }), []);
  assert.deepEqual(regrasDe(violacoesNasCamadas({ 'arquitetura/validacao/ideia.md': solto })), ['REF-R1', 'REF-R9']);
});

test('VRF-R27: os achados do formato das duas pastas não são lidos', () => {
  const solto = 'qualquer coisa ⟸ D9 e ⟸ [D9]\n';
  assert.deepEqual(violacoesNasCamadas({ 'arquitetura/_achados.md': solto, 'interface/_achados.md': solto }), []);
  assert.deepEqual(regrasDe(violacoesNasCamadas({ 'arquitetura/validacao/_achados.md': solto })), ['REF-R1', 'REF-R9']);
});

test('VRF-R25: a marca de decisão vale em qualquer lugar da linha, e dentro de código não é marca', () => {
  assert.deepEqual(violacoesNasCamadas({
    'arquitetura/validacao.md': '# Validação\nA leitura ⟸ [D2] não depende das checagens; a marca é `⟸ [Dnn]`.\n',
  }), []);
});

test('ARE-R23.1: a área em pasta que se chama interface é lida como área', () => {
  const [inicio, itens] = exemplo['pedidos.md'].split('## **Item de pedido**');
  const mudancas = {
    'pedidos.md': null,
    'interface/_area.md': inicio.slice(0, inicio.indexOf('## **Pedido**')),
    'interface/pedido.md': `# Pedido\n\n${inicio.slice(inicio.indexOf('## **Pedido**'))}`,
    'interface/item.md': `# Item de pedido\n\n## **Item de pedido**${itens}`,
  };
  assert.deepEqual(violacoesCom(mudancas), []);
  assert.deepEqual(regrasDe(violacoesCom({ ...mudancas, 'interface/item.md': `# Item de pedido\nTexto ⟸ D9\n\n## **Item de pedido**${itens}` })), []);
});
