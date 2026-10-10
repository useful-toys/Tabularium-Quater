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
  ['VRF-R10', 'falta _contadores.md', { '_contadores.md': null }],
  ['VRF-R12', 'falta AGENTS.md', { 'AGENTS.md': null }],
  ['VRF-R12', 'falta a legenda das decisões', { 'decisoes/_convencoes.md': null }],

  ['ARE-R1', 'arquivo fora da tabela de áreas', { 'estoque.md': '# Estoque\n' }],
  ['ARE-R1', 'área da tabela sem arquivo', troca('_produto.md', '| pedidos.md |\n', '| pedidos.md |\n| Estoque | **Pedido** | apoio | vendas | estoque.md |\n')],
  ['ARE-R1', 'pasta de área fora da tabela', { 'estoque/_area.md': '# Estoque\n' }],
  ['ARE-R11', 'seções da área fora de ordem', troca('pedidos.md', '## Linguagem\n- carrinho: **Pedido** que ainda não foi fechado\n\n## Tipos\n- Quantidade: inteiro; de 1 a 99\n', '## Tipos\n- Quantidade: inteiro; de 1 a 99\n\n## Linguagem\n- carrinho: **Pedido** que ainda não foi fechado\n')],
  ['APR-R9', 'seção que não existe em _produto.md', troca('_produto.md', '## Fora de escopo', '## Futuro')],
  ['APR-R9', 'seções de _produto.md fora de ordem', troca('_produto.md', '## Regras globais\n- [ ] PRD-Q1  Toda tela responde em até 3 s\n\n## Fora de escopo\n- Entrega dos produtos · nesta versão\n', '## Fora de escopo\n- Entrega dos produtos · nesta versão\n\n## Regras globais\n- [ ] PRD-Q1  Toda tela responde em até 3 s\n')],
  ['CEL-R2', 'célula sem frase de definição', troca('pedidos.md', 'Produto e **Quantidade** dentro de um **Pedido**.\n', '')],
  ['CEL-R2', 'linha em branco entre o título e a definição', troca('pedidos.md', '## Item de pedido  `ITE`\n', '## Item de pedido  `ITE`\n\n')],
  ['CEL-R3', 'visão antes de capacidade', troca('pedidos.md', '- [ ] PED-C1  Fechar o pedido\n  - exige: ao menos um **Item de pedido**\n  - o pedido passa a esperar o pagamento\n- [ ] PED-V1 · atendente  Ver os pedidos do dia\n', '- [ ] PED-V1 · atendente  Ver os pedidos do dia\n- [ ] PED-C1  Fechar o pedido\n  - exige: ao menos um **Item de pedido**\n  - o pedido passa a esperar o pagamento\n')],
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
  ['ATR-R7', 'relação com trecho que não é qualificador', troca('pedidos.md', '- pertence a 1 **Pedido**\n', '- pertence a 1 **Pedido**; sempre\n')],
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
  ['CTD-R8', 'contador com um só espaço', troca('_contadores.md', '- PED-R  5  frete-por-regiao', '- PED-R 5 frete-por-regiao')],
  ['CTD-R8', 'contador sem nome curto', troca('_contadores.md', '- PED-R  5  frete-por-regiao', '- PED-R  5')],
  ['CTD-R8', 'contador em 0 com nome curto', troca('_contadores.md', '- ITE-R  1', '- ITE-C  0  nada-ainda\n- ITE-R  1')],
  ['CTD-R8', 'sequência que não é da seção', troca('_contadores.md', '- D  1  pedido-pago-fixo', '- D  1  pedido-pago-fixo\n- DEC-R  1  outra-coisa')],
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
  ['CTD-R1', 'sequência em uso sem contador', troca('_contadores.md', '- PED-V  1  ver-pedidos-dia\n', '')],
  ['CTD-R1', 'contadores fora da ordem alfabética', troca('_contadores.md', '- PED-C  1  fechar-pedido\n- PED-Q  1  lista-abre-rapido\n', '- PED-Q  1  lista-abre-rapido\n- PED-C  1  fechar-pedido\n')],
  ['CTD-R1', 'sequência com dois contadores', troca('_contadores.md', '- PED-C  1  fechar-pedido\n', '- PED-C  1  fechar-pedido\n- PED-C  1  fechar-pedido\n')],
  ['CTD-R2', 'seção Perguntas sem item', troca('_contadores.md', '- P  1  prazo-cancelamento\n', '')],
  ['CTD-R2', 'seções dos contadores fora de ordem', troca('_contadores.md', '## Perguntas\n- P  1  prazo-cancelamento\n\n## Decisões\n- D  1  pedido-pago-fixo\n', '## Decisões\n- D  1  pedido-pago-fixo\n\n## Perguntas\n- P  1  prazo-cancelamento\n')],
  ['CTD-R4', 'identificador acima do contador', troca('_contadores.md', '- PED-R  5  frete-por-regiao', '- PED-R  3  frete-por-regiao')],
  ['CTD-R4', 'pergunta acima do contador', troca('_perguntas.md', '  - opção: 60 dias\n', '  - opção: 60 dias\n- P2  O frete do interior muda?\n  - sobre: **Pedido**\n')],
  ['CTD-R4', 'decisão acima do contador', { 'decisoes/pedidos/D2-outra.md': (t) => exemploDeDecisao('D2') }],
  ['DEC-R8', 'código de decisão repetido em outra pasta', { 'decisoes/_produto/D1-outra.md': (t) => exemploDeDecisao('D1') }],

  ['TRM-R2', 'termo definido duas vezes', troca('pedidos.md', 'que ainda não foi fechado\n', 'que ainda não foi fechado\n- carrinho: outra coisa\n')],
  ['TRM-R2', 'termo da linguagem com o nome de um ator', troca('pedidos.md', '- carrinho:', '- Cliente: quem compra\n- carrinho:')],
  ['TRM-R2', 'atributo repetido no mesmo bloco', troca('pedidos.md', '- quantidade: **Quantidade**\n', '- quantidade: **Quantidade**\n- quantidade: inteiro\n')],
  ['TRM-R2', 'termo definido em negrito', troca('pedidos.md', '- carrinho: ', '- **carrinho**: ')],
  ['TRM-R4', 'atributo homônimo citado sem a célula', { 'pedidos.md': (t) => t.replace('- quantidade: **Quantidade**\n', '- quantidade: **Quantidade**\n- número: inteiro\n').replace('que ainda não foi fechado', 'que ainda não foi fechado e já tem **número**') }],
  ['REF-R1', 'negrito que não é termo', troca('pedidos.md', 'Fechar o pedido', 'Fechar o **carrinho de compras**')],
  ['REF-R1', 'plural que as terminações não explicam', troca('pedidos.md', 'ao menos um **Item de pedido**', 'ao menos dois **Itenz de pedido**')],
  ['REF-R1', 'atributo que a célula não tem', troca('pedidos.md', 'Fechar o pedido', 'Fechar o pedido pela **Pedido.cor**')],
  ['TRM-R6', 'sinônimo proibido em uso', { 'pedidos.md': (t) => t.replace('soma dos **Itens de pedido**', 'soma dos **Itens de pedido** (~~valor, montante~~)').replace('A lista de pedidos abre', 'A lista de pedidos mostra o Valor e abre') }],
  ['TRM-R6', 'sinônimo proibido numa decisão', { ...troca('pedidos.md', 'Compra que um **Cliente** faz na loja.', 'Compra que um **Cliente** faz na loja. (~~encomenda~~)'), ...troca('decisoes/pedidos/D1-pedido-pago-fixo.md', 'sobre aquele total', 'sobre o total da encomenda') }],
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
  ['TRM-R10', 'termo com o nome exato, sem negrito', troca('pedidos.md', 'a quantidade não muda mais', 'a quantidade não muda mais no Pedido')],
  ['TRM-R10', 'negrito só na segunda menção', troca('pedidos.md', 'Produto e **Quantidade** dentro de um **Pedido**.', 'Produto de um Pedido, com a **Quantidade**, dentro do **Pedido**.')],
  ['TRM-R10', 'termo da linguagem sem negrito', troca('_produto.md', 'Entrega dos produtos', 'Entrega do carrinho')],

  ['DRF-R4', 'arquivo de dados citado por uma qualidade', { ...troca('pedidos.md', '- [ ] TAR-R1  As tarifas', '- [ ] TAR-Q1  As tarifas'), ...troca('_contadores.md', '- TAR-R  1  tarifas', '- TAR-Q  1  tarifas') }],
  ['DRF-R8', 'arquivo de dados em célula sem identidade', troca('pedidos.md', '- código: texto; identidade\n- [ ] EMB-R1', '- código: texto\n- [ ] EMB-R1')],
  ['DRF-R8', 'arquivo de dados citado numa regra global', troca('_produto.md', 'responde em até 3 s', 'responde em até 3 s: [PRD-telas.csv]')],
  ['DRF-R9', 'duas regras de dados na mesma célula', { ...troca('pedidos.md', '| EXP | Expressa | |\n', '| EXP | Expressa | |\n\n- [ ] MOD-R2  Outras modalidades, por **código**: [MOD-outras.csv]\n'), ...troca('_contadores.md', '- MOD-R  1  modalidades', '- MOD-R  2  outras-modalidades'), 'dados/MOD-outras.csv': 'código\nRET\n' }],
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

test('ARE-R12: a área em pasta é lida, com _area.md e um arquivo por célula', () => {
  const [inicio, itens] = exemplo['pedidos.md'].split('## Item de pedido');
  const mudancas = {
    'pedidos.md': null,
    'pedidos/_area.md': inicio.slice(0, inicio.indexOf('## Pedido')),
    'pedidos/pedido.md': `# Pedido\n\n${inicio.slice(inicio.indexOf('## Pedido'))}`,
    'pedidos/item.md': `# Item de pedido\n\n## Item de pedido${itens}`,
    ...troca('_produto.md', '| pedidos.md |', '| pedidos |'),
  };
  assert.deepEqual(violacoesCom(mudancas), []);
  assert.deepEqual(regrasDe(violacoesCom({ ...mudancas, 'pedidos/_area.md': null })), ['ARE-R1']);
});

test('ATR-R7: a relação leva qualificadores, como o inverso', () => {
  assert.deepEqual(violacoesCom({
    'pedidos.md': (t) => t
      .replace('- pertence a 1 **Pedido**\n', '- pertence a 1 **Pedido**; inverso: 1..N\n')
      .replace('- 1..N **Item de pedido**\n', '- 1..N **Item de pedido**; inverso: 1\n'),
  }), []);
});

test('TRM-R6: declarar sinônimos proibidos não é usá-los', () => {
  assert.deepEqual(violacoesCom(troca('pedidos.md', 'soma dos **Itens de pedido**', 'soma dos **Itens de pedido** (~~valor, montante~~) ⟸ [D1]')), []);
});

test('TRM-R13: a declaração fora do fim é acusada, mas os sinônimos continuam proibidos', () => {
  const usado = { 'pedidos.md': (t) => t.replace('soma dos **Itens de pedido**', 'soma (~~valor, montante~~) dos **Itens de pedido**').replace('A lista de pedidos abre', 'A lista de pedidos mostra o Valor e abre') };
  assert.deepEqual(regrasDe(violacoesCom(usado)), ['TRM-R13', 'TRM-R6']);
});

test('TRM-R18: no título a declaração fora do lugar é acusada, além de REF-R1', () => {
  const regras = regrasDe(violacoesCom(troca('pedidos.md', '## Pedido  `PED`', '## Pedido (~~encomenda~~)  `PED`')));
  assert.ok(regras.includes('TRM-R18'));
  assert.ok(!regras.includes('TRM-R13'));
});

test('TRM-R18: o sinônimo declarado fora da definição não vira proibido', () => {
  const usado = { 'pedidos.md': (t) => t.replace('o pedido não muda ⟸ [D1]', 'o pedido não muda (~~encomenda~~) ⟸ [D1]').replace('A lista de pedidos abre', 'A lista de encomendas e a encomenda abre') };
  assert.deepEqual(regrasDe(violacoesCom(usado)), ['TRM-R18']);
});

test('TRM-R18: a violação diz onde a declaração cabe, na especificação e na decisão', () => {
  const [naRegra] = violacoesCom(troca('pedidos.md', 'o pedido não muda ⟸ [D1]', 'o pedido não muda (~~encomenda~~) ⟸ [D1]'));
  assert.match(naRegra.frase, /^esta linha não define termo/);
  const [naDecisao] = violacoesCom(troca('decisoes/pedidos/D1-pedido-pago-fixo.md', 'sobre aquele total', 'sobre aquele total (~~soma~~)'));
  assert.match(naDecisao.frase, /^só a especificação declara/);
});

test('TRM-R19: uma só violação, na declaração, que diz onde o termo está definido', () => {
  const doTermo = violacoesCom(troca('pedidos.md', 'soma dos **Itens de pedido**', 'soma dos **Itens de pedido** (~~cliente~~)'));
  assert.deepEqual(doTermo.map((v) => `${v.arquivo}:${v.linha} ${v.frase}`), ['pedidos.md:14 "cliente" está em não usar, mas é termo definido em _produto.md, linha 14; tire-o da declaração ou renomeie o termo']);
  const doAtributo = violacoesCom(troca('pedidos.md', 'soma dos **Itens de pedido**', 'soma dos **Itens de pedido** (~~prazo~~)'));
  assert.deepEqual(doAtributo.map((v) => `${v.arquivo}:${v.linha} ${v.frase}`), ['pedidos.md:14 "prazo" está em não usar, mas é atributo de Modalidade, em pedidos.md, linha 43; tire-o da declaração ou renomeie o termo']);
});

test('TRM-R10: a própria célula, o atributo e a grafia diferente não são acusados', () => {
  assert.deepEqual(violacoesCom({
    'pedidos.md': (t) => t
      .replace('Fechar o pedido', 'Fechar o Pedido e os pedidos')
      .replace('Ver os pedidos do dia', 'Ver a situação e o total do dia')
      .replace('a quantidade não muda mais', 'a quantidade não muda mais nos Pedidos nem para o cliente'),
  }), []);
});

test('TRM-R11: o plural regular em negrito resolve para o termo', () => {
  const termos = ['visão', 'pão', 'jornal', 'papel', 'réptil', 'farol', 'homem', 'flor'];
  const plurais = ['visões', 'pães', 'jornais', 'papéis', 'répteis', 'faróis', 'homens', 'flores'];
  assert.deepEqual(violacoesCom({
    'pedidos.md': (t) => t
      .replace('- carrinho:', `${termos.map((x) => `- ${x}: coisa`).join('\n')}\n- carrinho:`)
      .replace('Fechar o pedido', `Fechar o pedido com ${plurais.map((x) => `**${x}**`).join(', ')}`),
  }), []);
});

test('TRM-R12: onde cabem dois termos, vale o de nome mais longo', () => {
  assert.deepEqual(violacoesCom(troca('pedidos.md', 'a quantidade não muda mais', 'a quantidade de cada item de Pedido não muda mais')), []);
  const violacoes = violacoesCom(troca('pedidos.md', 'Produto e **Quantidade** dentro de um **Pedido**.', 'Produto e **Quantidade** de um **Pedido**, até o Pedido pago.'));
  assert.equal(violacoes.length, 1);
  assert.match(violacoes[0].frase, /^"Pedido pago" é um termo/);
});

test('TRM-R14: não há negrito de ênfase; o negrito que não é termo sai como REF-R1', () => {
  const violacoes = violacoesCom(troca('pedidos.md', 'Fechar o pedido', 'Fechar o pedido **sempre**'));
  assert.deepEqual(regrasDe(violacoes), ['REF-R1']);
  assert.match(violacoes[0].frase, /o negrito só marca referência a termo/);
});

test('TRM-R15: o nome da área, na tabela de áreas, não é menção', () => {
  const area = troca('_produto.md', '| Pedidos | **Pedido** |', '| Pedido pago | **Pedido** |');
  assert.deepEqual(violacoesCom(area), []);
  const tambemNoTexto = { '_produto.md': (t) => area['_produto.md'](t).replace('Público: pequenos vendedores', 'Público: quem vende Pedido pago') };
  assert.deepEqual(regrasDe(violacoesCom(tambemNoTexto)), ['TRM-R10']);
});

test('TRM-R16: o sinônimo de não usar é acusado inteiro, em qualquer caixa e fora de código', () => {
  const frase = (texto) => violacoesCom({
    'pedidos.md': (t) => t
      .replace('soma dos **Itens de pedido**', 'soma dos **Itens de pedido** (~~valor, montante~~)')
      .replace('A lista de pedidos abre', texto),
  });
  assert.deepEqual(regrasDe(frase('A lista de pedidos mostra o valor e abre')), ['TRM-R6']);
  assert.deepEqual(regrasDe(frase('A lista de pedidos mostra o VALOR e abre')), ['TRM-R6']);
  assert.deepEqual(frase('A lista de pedidos mostra a valorizada e abre'), []);
  assert.deepEqual(frase('A lista de pedidos mostra o `valor` e abre'), []);
});

test('TRM-R17: o negrito que casa com um termo e com um atributo é do termo', () => {
  assert.deepEqual(violacoesCom({
    'pedidos.md': (t) => t
      .replace('- prazo: inteiro; opcional\n', '- prazo: inteiro; opcional\n- quantidade: inteiro\n')
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
  ...troca('_contadores.md', '- D  1  pedido-pago-fixo', '- D  3  cores-fixas'),
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
  ['DEC-R8', 'código de decisão repetido entre a arquitetura e a interface', { 'interface/decisoes/_interface/D2-outra.md': exemploDeDecisao('D2') }],
  ['DEC-R8', 'código de decisão repetido entre a especificação e a arquitetura', { 'arquitetura/decisoes/validacao/D1-outra.md': exemploDeDecisao('D1') }],
  ['CTD-R4', 'decisão de arquitetura acima do contador', { 'arquitetura/decisoes/validacao/D4-nova.md': exemploDeDecisao('D4') }],
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

test('VRF-R26: sinônimo proibido não é acusado nas decisões de arquitetura e de interface', () => {
  const proibe = troca('pedidos.md', 'Compra que um **Cliente** faz na loja.', 'Compra que um **Cliente** faz na loja. (~~encomenda~~)');
  assert.deepEqual(violacoesNasCamadas({ ...proibe, ...troca(D2, 'sobre aquele total', 'sobre o total da encomenda'), ...troca(D3, 'sobre aquele total', 'sobre o total da encomenda') }), []);
});

test('ARE-R12: a área em pasta que se chama interface é lida como área', () => {
  const [inicio, itens] = exemplo['pedidos.md'].split('## Item de pedido');
  const mudancas = {
    'pedidos.md': null,
    'interface/_area.md': inicio.slice(0, inicio.indexOf('## Pedido')),
    'interface/pedido.md': `# Pedido\n\n${inicio.slice(inicio.indexOf('## Pedido'))}`,
    'interface/item.md': `# Item de pedido\n\n## Item de pedido${itens}`,
    ...troca('_produto.md', '| pedidos.md |', '| interface |'),
  };
  assert.deepEqual(violacoesCom(mudancas), []);
  assert.deepEqual(regrasDe(violacoesCom({ ...mudancas, 'interface/item.md': `# Item de pedido\nTexto ⟸ D9\n\n## Item de pedido${itens}` })), []);
});
