// Cada regra que o indexador realiza tem ao menos um teste, com o identificador dela no nome.
// Rode com: node --test testes/

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { gravar, indexar } from '../../skills/tabularium-indexar/indexar.mjs';
import { exemplo, troca } from '../tabularium-validar/exemplo.mjs';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const script = join(raiz, 'skills', 'tabularium-indexar', 'indexar.mjs');
const GERADO = '<!-- gerado; não editar -->';
const D1 = 'decisoes/pedidos/D1-pedido-pago-fixo.md';

// Uma decisão do exemplo com outro código, outra data de criação e, se vier, uma citação a outra decisão.
const decisao = (codigo, data, cita) => exemplo[D1]
  .replace('`D1`', '`' + codigo + '`')
  .replace('2026-01-10', data)
  .replace('sobre aquele total', cita ? `sobre aquele total ⟸ [${cita}]` : 'sobre aquele total');

// Grava o exemplo com as mudanças numa pasta temporária e entrega a pasta a quem testa.
// Em mudancas, texto substitui o arquivo, função o transforma e null o apaga.
function naPasta(mudancas, teste, { fimDeLinha = '\n' } = {}) {
  const pasta = mkdtempSync(join(tmpdir(), 'tabularium-'));
  try {
    const arquivos = { ...exemplo };
    for (const [caminho, mudanca] of Object.entries(mudancas)) {
      arquivos[caminho] = typeof mudanca === 'function' ? mudanca(arquivos[caminho]) : mudanca;
    }
    for (const [caminho, texto] of Object.entries(arquivos)) {
      if (texto === null) continue;
      mkdirSync(dirname(join(pasta, caminho)), { recursive: true });
      writeFileSync(join(pasta, caminho), texto.replace(/\n/g, fimDeLinha));
    }
    return teste(pasta);
  } finally {
    rmSync(pasta, { recursive: true, force: true });
  }
}

const indicesDe = (mudancas = {}) => naPasta(mudancas, (pasta) => indexar(pasta));
const ler = (pasta, caminho) => readFileSync(join(pasta, caminho), 'utf8');
const rodar = (pasta) => spawnSync(process.execPath, [script, pasta], { encoding: 'utf8' });

const AREAS_DO_EXEMPLO = `${GERADO}
# Loja
Loja virtual pequena, para vender pela internet.

## [Pedidos](pedidos.md)
Os Pedidos e os Itens de pedido que os compõem.
- Pedido \`PED\`: Compra que um Cliente faz na loja.
- Item de pedido \`ITE\`: Produto e Quantidade dentro de um Pedido.
- Modalidade \`MOD\`: Forma de envio de um Pedido.
- Tarifa \`TAR\`: Preço de um envio numa Modalidade.
- Embalagem \`EMB\`: Caixa em que um Pedido é enviado.
- Medida \`MED\`: Dimensão de uma Embalagem.
`;

const DECISOES_DO_EXEMPLO = `${GERADO}
# Decisões de Pedidos

- [D1](D1-pedido-pago-fixo.md) Um pedido pago pode mudar? Não, fica como está.
  - citada por: PED-R1, TAR-R1
`;

const estoque = '# Estoque\nO que a loja tem para vender.\n- célula central: **Produto**\n- dono: compras\n\n## **Produto**  `PRO`\nCoisa que a loja **vende**. (~~mercadoria~~)\n- **nome**: texto; identidade\n';

test('GER-R23.7: o índice de áreas traz o produto e, de cada área, a frase e as células com sigla e definição', () => {
  const { indices, semIndexar } = indicesDe();
  assert.equal(indices.get('README.md'), AREAS_DO_EXEMPLO);
  assert.deepEqual(semIndexar, []);
});

test('GER-R23.7: as áreas saem em ordem de arquivo, sem o negrito nem os sinônimos de não usar', () => {
  const texto = indicesDe({ 'estoque.md': estoque, 'atendimento.md': estoque.replace('# Estoque', '# Atendimento').replace('`PRO`', '`ATD`').replace('**Produto**  ', '**Chamado**  ') }).indices.get('README.md');
  assert.deepEqual(texto.match(/^## .*$/gm), ['## [Atendimento](atendimento.md)', '## [Estoque](estoque.md)', '## [Pedidos](pedidos.md)']);
  assert.match(texto, /\n- Produto `PRO`: Coisa que a loja vende\.\n/);
});

test('GER-R23.7: a área em pasta aponta para o _area.md, e cada célula para o arquivo dela', () => {
  const [cabecalho, bloco] = estoque.split('\n\n');
  const texto = indicesDe({ 'estoque/_area.md': `${cabecalho}\n`, 'estoque/produto.md': `# Produto\n\n${bloco}` }).indices.get('README.md');
  assert.match(texto, /\n## \[Estoque\]\(estoque\/_area\.md\)\nO que a loja tem para vender\.\n- \[Produto\]\(estoque\/produto\.md\) `PRO`: Coisa que a loja vende\.\n/);
});

const camadas = {
  'arquitetura/_sistema.md': '# Arquitetura da Loja\nUm serviço e um banco de dados.\n\n## Restrições globais\n- [x] ARQ-R1  Nenhum componente tem dependências ⟸ [D2]\n',
  'arquitetura/servico.md': '# Serviço\nComo os pedidos são atendidos.\n- componente central: **Servidor**\n\n## Servidor  `SRV`\nPrograma que atende os **Pedidos**.\n- usa 1 **Node.js** ⟸ [D2, D1]\n- [x] SRV-I1  Recebe os pedidos\n  - responde em JSON ⟸ [D2]\n',
  'arquitetura/ideia.md': '# Ideia\nMemória informal.\n\n## Rascunho  `RAS`\nNão é componente.\n',
  'arquitetura/decisoes/_sistema/D2-sem-dependencias.md': decisao('D2', '2026-01-11'),
  'interface/_interface.md': '# Interface da Loja\nUma tela por pedido.\n\n## Diretrizes\n- [x] IFC-R1  As cores são fixas ⟸ [D3, D2]\n',
  'interface/decisoes/_interface/D3-cores-fixas.md': decisao('D3', '2026-01-12', 'D2'),
};

test('GER-R23.8: na arquitetura e na interface, os componentes fazem o papel das células', () => {
  const { indices, semIndexar } = indicesDe(camadas);
  assert.equal(indices.get('arquitetura/README.md'), `${GERADO}\n# Arquitetura da Loja\nUm serviço e um banco de dados.\n\n## [Serviço](servico.md)\nComo os pedidos são atendidos.\n- Servidor \`SRV\`: Programa que atende os Pedidos.\n`);
  assert.equal(indices.get('interface/README.md'), `${GERADO}\n# Interface da Loja\nUma tela por pedido.\n`);
  assert.deepEqual(semIndexar, []);
});

test('GER-R23.9: o índice de decisões traz o código, a questão, a resolução e quem cita cada uma', () => {
  assert.equal(indicesDe().indices.get('decisoes/pedidos/README.md'), DECISOES_DO_EXEMPLO);
});

test('GER-R23.9: as decisões saem em ordem da data de criação e, na mesma data, do código, com os números como números', () => {
  const texto = indicesDe({
    'decisoes/pedidos/D10-a.md': decisao('D10', '2026-01-10'),
    'decisoes/pedidos/D9.2-b.md': decisao('D9.2', '2026-01-10'),
    'decisoes/pedidos/D9.10-c.md': decisao('D9.10', '2026-01-10'),
    'decisoes/pedidos/Dk7q2.1-d.md': decisao('Dk7q2.1', '2026-01-10'),
    'decisoes/pedidos/D2-e.md': decisao('D2', '2025-12-31'),
    'decisoes/pedidos/D3-f.md': decisao('D3', '2026-01-10').replace('- 2026-01-10: decisão criada', '- 2026-02-01: a resolução mudou\n- 2026-01-09: decisão criada'),
  }).indices.get('decisoes/pedidos/README.md');
  assert.deepEqual(texto.match(/^- \[[^\]]+\]/gm).map((m) => m.slice(3, -1)), ['D2', 'D3', 'D1', 'D9.2', 'D9.10', 'D10', 'Dk7q2.1']);
});

test('GER-R23.9: cita a decisão o item da especificação, o da arquitetura, o da interface e outra decisão', () => {
  const { indices } = indicesDe({
    ...camadas,
    ...troca('_produto.md', '- **Dinheiro**: decimal; de 0 em diante', '- **Dinheiro**: decimal; de 0 em diante ⟸ [D1]'),
    'pedidos.md': (t) => t
      .replace('- **situação**: **Situação**; inicial: aberto', '- **situação**: **Situação**; inicial: aberto ⟸ [D1]')
      .replace('  - o pedido passa a esperar o pagamento', '  - o pedido passa a esperar o pagamento ⟸ [D01]'),
  });
  assert.match(indices.get('decisoes/pedidos/README.md'), /\n {2}- citada por: Dinheiro, Pedido\.situação, PED-R1, PED-C1, TAR-R1, Servidor\n$/);
  assert.match(indices.get('arquitetura/decisoes/_sistema/README.md'), /^.*\n# Decisões do sistema\n\n.*\n {2}- citada por: ARQ-R1, Servidor, SRV-I1, IFC-R1, D3\n$/);
});

test('GER-R23.10: a decisão que nada cita consta como órfã', () => {
  const texto = indicesDe({ 'decisoes/_produto/D4-sozinha.md': decisao('D4', '2026-01-10') }).indices.get('decisoes/_produto/README.md');
  assert.equal(texto, `${GERADO}\n# Decisões do produto\n\n- [D4](D4-sozinha.md) Um pedido pago pode mudar? Não, fica como está.\n  - órfã\n`);
});

test('GER-R23.1: todo índice é um README.md que começa com a linha de gerado', () => {
  const { indices } = indicesDe(camadas);
  assert.deepEqual([...indices.keys()].sort(), ['README.md', 'arquitetura/README.md', 'arquitetura/decisoes/_sistema/README.md', 'decisoes/pedidos/README.md', 'interface/README.md', 'interface/decisoes/_interface/README.md']);
  for (const texto of indices.values()) assert.ok(texto.startsWith(`${GERADO}\n`));
});

test('GER-R23.2: a especificação com violações é indexada', () => {
  const { indices, semIndexar } = indicesDe({
    'pedidos.md': (t) => t.replace('- [ ] PED-Q1', '- [ok] PED-Q1').replace('- evento: **Pedido pago**\n', '- guarda os itens da compra\n- evento: **Pedido pago**\n'),
    ...troca('_produto.md', '## Fora de escopo', '## Futuro'),
    ...troca(D1, '  - Ganha: o total', '  - o total'),
  });
  assert.equal(indices.get('README.md'), AREAS_DO_EXEMPLO);
  assert.equal(indices.get('decisoes/pedidos/README.md'), DECISOES_DO_EXEMPLO);
  assert.deepEqual(semIndexar, []);
});

test('GER-R23.3: o arquivo que não pôde ser lido consta do índice da pasta como não indexado, e os demais são indexados', () => {
  const { indices, semIndexar } = indicesDe({
    ...troca(D1, 'Não, fica como está.\n', ''),
    'decisoes/pedidos/D5-outra.md': decisao('D5', '2026-01-10'),
    'decisoes/pedidos/D6-sem-data.md': decisao('D6', '2026-01-10').replace('- 2026-01-10: decisão criada\n', ''),
    'decisoes/pedidos/D7-sem-pergunta.md': decisao('D7', '2026-01-10').replace('pode mudar?', 'pode mudar'),
    'decisoes/pedidos/notas.md': '# Notas\n',
    'pedidos.md': (t) => t.replace('Forma de envio de um **Pedido**.\n', ''),
  });
  assert.equal(indices.get('decisoes/pedidos/README.md'), `${GERADO}
# Decisões de Pedidos

- [D5](D5-outra.md) Um pedido pago pode mudar? Não, fica como está.
  - órfã

- não indexado: notas.md: o nome não é o de uma decisão: o código, "-", um nome curto e ".md"
- não indexado: D1-pedido-pago-fixo.md: falta a resolução, na linha seguinte ao título
- não indexado: D6-sem-data.md: falta a data de criação, na seção Histórico
- não indexado: D7-sem-pergunta.md: o título não traz a questão, terminada em "?", e o código
`);
  assert.equal(indices.get('README.md'), AREAS_DO_EXEMPLO.replace('- Modalidade `MOD`: Forma de envio de um Pedido.\n', '') + '\n- não indexado: pedidos.md: linha 42: falta a frase de definição de "Modalidade", na linha seguinte ao título\n');
  assert.deepEqual(semIndexar.map((f) => f.arquivo), ['pedidos.md', 'decisoes/pedidos/notas.md', D1, 'decisoes/pedidos/D6-sem-data.md', 'decisoes/pedidos/D7-sem-pergunta.md']);
});

test('GER-R23.3: a área e o produto sem título ou sem frase ficam sem indexar', () => {
  const { indices, semIndexar } = indicesDe({
    ...troca('_produto.md', 'Loja virtual pequena, para vender pela internet.\n', ''),
    'estoque.md': estoque.replace('O que a loja tem para vender.\n', ''),
    'arquitetura/servico.md': '# Serviço\n\n## Servidor  `SRV`\nPrograma que atende os pedidos.\n',
  });
  assert.equal(indices.get('README.md'), AREAS_DO_EXEMPLO.replace('# Loja\nLoja virtual pequena, para vender pela internet.\n', '') + '\n- não indexado: _produto.md: falta a frase, na linha seguinte ao título\n- não indexado: estoque.md: falta a frase, na linha seguinte ao título\n');
  assert.equal(indices.get('arquitetura/README.md'), `${GERADO}\n\n- não indexado: servico.md: falta a frase, na linha seguinte ao título\n`);
  assert.deepEqual(semIndexar.map((f) => f.arquivo), ['_produto.md', 'estoque.md', 'arquitetura/servico.md']);
});

test('GER-R2: a mesma especificação dá sempre os mesmos índices', () => {
  assert.deepEqual(indicesDe(camadas), indicesDe(camadas));
});

test('GER-R23.4: regenera todos os índices e grava só o que mudou', () => {
  naPasta({}, (pasta) => {
    assert.deepEqual(gravar(pasta, indexar(pasta).indices), { gravados: ['README.md', 'decisoes/pedidos/README.md'], apagados: [], recusados: [] });
    assert.equal(ler(pasta, 'README.md'), AREAS_DO_EXEMPLO);
    assert.deepEqual(gravar(pasta, indexar(pasta).indices), { gravados: [], apagados: [], recusados: [] });
    writeFileSync(join(pasta, 'README.md'), AREAS_DO_EXEMPLO.replace(/\n/g, '\r\n'));
    assert.deepEqual(gravar(pasta, indexar(pasta).indices).gravados, []);
    writeFileSync(join(pasta, D1), exemplo[D1].replace('Não, fica como está.', 'Não, nunca.'));
    assert.deepEqual(gravar(pasta, indexar(pasta).indices).gravados, ['decisoes/pedidos/README.md']);
    assert.match(ler(pasta, 'decisoes/pedidos/README.md'), /Um pedido pago pode mudar\? Não, nunca\./);
  });
});

test('GER-R23.5: o README.md que não começa com a linha de gerado não é sobrescrito', () => {
  naPasta({ 'decisoes/pedidos/README.md': '# Minhas notas\n' }, (pasta) => {
    assert.deepEqual(gravar(pasta, indexar(pasta).indices), { gravados: ['README.md'], apagados: [], recusados: ['decisoes/pedidos/README.md'] });
    assert.equal(ler(pasta, 'decisoes/pedidos/README.md'), '# Minhas notas\n');
    const saida = rodar(pasta);
    assert.equal(saida.status, 1);
    assert.match(saida.stdout, /sem indexar {2}.*decisoes\/pedidos\/README\.md {2}não começa com a linha/);
  });
});

test('GER-R23.6: o índice da pasta que ficou sem o que indexar é apagado, se foi gerado', () => {
  naPasta({ 'decisoes/vazia/README.md': `${GERADO}\n# Decisões de vazia\n`, 'decisoes/notas/README.md': '# Minhas notas\n', 'interface/README.md': `${GERADO}\n# Interface\n`, 'interface/AGENTS.md': '# AGENTS.md\n' }, (pasta) => {
    assert.deepEqual(gravar(pasta, indexar(pasta).indices).apagados, ['decisoes/vazia/README.md', 'interface/README.md']);
    assert.ok(!existsSync(join(pasta, 'decisoes/vazia/README.md')));
    assert.equal(ler(pasta, 'decisoes/notas/README.md'), '# Minhas notas\n');
  });
});

test('IDX-R23.2: os índices saem com fim de linha LF, mesmo de uma especificação com CRLF', () => {
  naPasta(camadas, (pasta) => {
    gravar(pasta, indexar(pasta).indices);
    assert.equal(ler(pasta, 'README.md'), AREAS_DO_EXEMPLO);
    assert.ok(!ler(pasta, 'arquitetura/README.md').includes('\r'));
    assert.ok(!ler(pasta, 'decisoes/pedidos/README.md').includes('\r'));
  }, { fimDeLinha: '\r\n' });
});

test('IDX-I23.1: a linha de comando diz o que gravou e o total, e sai com 0', () => {
  naPasta({}, (pasta) => {
    const primeira = rodar(pasta);
    assert.equal(primeira.status, 0);
    const caminho = pasta.replace(/\\/g, '/');
    assert.equal(primeira.stdout, `gravado  ${caminho}/README.md\ngravado  ${caminho}/decisoes/pedidos/README.md\ngravados: 2; apagados: 0; sem indexar: 0\n`);
    const segunda = rodar(pasta);
    assert.equal(segunda.status, 0);
    assert.equal(segunda.stdout, 'nenhum índice mudou\n');
  });
});

test('IDX-I23.1: a linha de comando sai com 1 quando algo fica sem indexar, com o arquivo e o motivo', () => {
  naPasta(troca(D1, 'Não, fica como está.\n', ''), (pasta) => {
    const saida = rodar(pasta);
    assert.equal(saida.status, 1);
    assert.match(saida.stdout, /\nsem indexar {2}.*decisoes\/pedidos\/D1-pedido-pago-fixo\.md {2}falta a resolução, na linha seguinte ao título\ngravados: 2; apagados: 0; sem indexar: 1\n$/);
  });
});

test('IDX-I23.1: a linha de comando sai com 2 quando o argumento não é uma pasta existente', () => {
  assert.equal(rodar(join(raiz, 'testes', 'tabularium-indexar', 'nao-existe')).status, 2);
  assert.equal(rodar(script).status, 2);
});

test('IDX-R23.1: sem a skill de validação ao lado, o script para e manda instalá-la', () => {
  const pasta = mkdtempSync(join(tmpdir(), 'tabularium-'));
  try {
    mkdirSync(join(pasta, 'tabularium-indexar'));
    copyFileSync(script, join(pasta, 'tabularium-indexar', 'indexar.mjs'));
    const saida = spawnSync(process.execPath, [join(pasta, 'tabularium-indexar', 'indexar.mjs'), join(raiz, 'specs')], { encoding: 'utf8' });
    assert.equal(saida.status, 2);
    assert.match(saida.stderr, /falta a skill tabularium-validar/);
  } finally {
    rmSync(pasta, { recursive: true, force: true });
  }
});

test('GER-C23.1: os índices da especificação do próprio formato estão em dia', () => {
  const saida = spawnSync(process.execPath, [script, 'specs'], { cwd: raiz, encoding: 'utf8' });
  assert.equal(saida.stdout, 'nenhum índice mudou\n');
  assert.equal(saida.status, 0);
});
