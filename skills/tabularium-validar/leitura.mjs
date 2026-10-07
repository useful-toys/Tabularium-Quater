// Lê uma especificação Tabularium e classifica cada linha pela forma que ela tem.
// Não julga: a linha que não casa com nenhuma forma sai como 'desconhecida',
// com o que cabia ali e a regra que descreve essa forma.

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

export const MARCADOR_GERADO = '<!-- gerado; não editar -->';
export const SECOES_PRODUTO = ['Propósito', 'Áreas', 'Atores', 'Tipos comuns', 'Jornadas', 'Externos', 'Regras globais', 'Fora de escopo'];
export const SECOES_AREA = ['Índice', 'Linguagem', 'Tipos'];
export const SECOES_CONTADORES = ['Identificadores', 'Perguntas', 'Decisões'];
export const ROTULOS_DECISAO = ['Contexto', 'Alternativas descartadas', 'Consequências'];
export const COLUNAS_AREAS = ['Área', 'Célula central', 'Prioridade', 'Dono', 'Arquivo'];

const CARD = '(?:1|0\\.\\.1|0\\.\\.N|1\\.\\.N)';
const CODIGO = '[A-Z]{2,5}-[A-Z]\\d+';

const linhasDe = (caminho) => readFileSync(caminho, 'utf8').replace(/^﻿/, '').split(/\r?\n/);
const ehProsa = (l) => l.trim() !== '' && !/^[-#|<\s]/.test(l);
const branco = (n, bruto) => ({ n, bruto, forma: 'branco' });
const estranha = (n, bruto, esperado, regra = 'VRF-R8') => ({ n, bruto, forma: 'desconhecida', esperado, regra });
const celulasDe = (bruto) => (/^\|.*\|$/.test(bruto) ? bruto.slice(1, -1).split('|').map((c) => c.trim()) : null);

// Dentro de código nada é marca: o miolo vira enchimento, com o mesmo comprimento.
export const mascarar = (t) => t.replace(/`[^`]*`/g, (c) => '`' + '¤'.repeat(c.length - 2) + '`');

// Separa do texto as marcas de fim de item: decisões, pergunta e, numa regra, o ':' que anuncia a tabela.
function separarCauda(texto, comTabela = false) {
  let resto = mascarar(texto);
  const cauda = { decisoes: [], pergunta: null, tabela: false, caudaInvalida: false };
  if (comTabela && resto.endsWith(':')) { cauda.tabela = true; resto = resto.slice(0, -1); }
  let m = resto.match(/ ⟵ \[(P\d+)\]$/);
  if (m) { cauda.pergunta = m[1]; resto = resto.slice(0, m.index); }
  m = resto.match(/ ⟸ \[(D\d+(?:, D\d+)*)\]$/);
  if (m) { cauda.decisoes = m[1].split(', '); resto = resto.slice(0, m.index); }
  if (/[⟸⟵]/.test(resto)) cauda.caudaInvalida = true;
  return { texto: texto.slice(0, resto.length), ...cauda };
}

// Item que começa por marca ou por identificador: afirmação ou lápide.
function lerAfirmacao(n, bruto, corpo) {
  let marca = null, id, resto;
  let m = corpo.match(/^\[([^\]]*)\] (\S+)(.*)$/);
  if (m) [, marca, id, resto] = m;
  else {
    m = corpo.match(new RegExp(`^(${CODIGO})(.*)$`));
    if (!m) return null;
    [, id, resto] = m;
  }
  let espacos = true;
  let t = resto.match(/^(?: · (.+?))? {2}(\S.*)$/);
  if (!t) { espacos = false; t = resto.match(/^(?: · (\S+))? +(\S.*)$/); }
  if (!t) return null;
  const partes = id.match(/^([A-Z]{2,5})-([A-Z])(\d+)$/);
  const linha = { n, bruto, forma: 'afirmacao', marca, id, sigla: partes?.[1] ?? null, papel: partes?.[2] ?? null, numero: partes ? Number(partes[3]) : null, ator: t[1] ?? null, espacos };
  if (t[2] === 'removida') return { ...linha, forma: 'lapide', tipo: 'removida' };
  const movida = t[2].match(new RegExp(`^movida → \\[(${CODIGO})\\]$`));
  if (movida) return { ...linha, forma: 'lapide', tipo: 'movida', destino: movida[1] };
  return { ...linha, ...separarCauda(t[2], true) };
}

function lerSubitem(n, bruto, pai) {
  const m = bruto.match(/^( +)- (.*)$/);
  if (!m || m[1].length % 2) return null;
  return { n, bruto, forma: 'subitem', nivel: m[1].length / 2, pai, ...separarCauda(m[2]) };
}

function lerArea(brutas) {
  const linhas = [];
  let secao = null, pai = null, esperaDefinicao = false, tabela = null, gerado = false;
  brutas.forEach((bruto, i) => {
    const n = i + 1;
    if (bruto.trim() === '') {
      // A linha em branco separa a regra da tabela e, depois das fileiras, encerra a tabela.
      if (tabela?.fileiras) tabela = null;
      return linhas.push(branco(n, bruto));
    }
    if (i === 0) return linhas.push(/^# \S/.test(bruto) ? { n, bruto, forma: 'titulo-arquivo' } : estranha(n, bruto, 'o título do arquivo, como "# Nome da área"'));
    if (i === 1 && ehProsa(bruto)) return linhas.push({ n, bruto, forma: 'frase-arquivo' });
    if (bruto.startsWith('#')) {
      pai = null; tabela = null; gerado = false; esperaDefinicao = false;
      const celula = bruto.match(/^(#{2,}) (.+?) {2}`([^`]*)`$/);
      if (celula) { secao = 'célula'; esperaDefinicao = true; return linhas.push({ n, bruto, forma: 'titulo-celula', nivel: celula[1].length, nome: celula[2], sigla: celula[3] }); }
      const nome = bruto.match(/^## (.+)$/)?.[1];
      if (SECOES_AREA.includes(nome)) { secao = nome; gerado = nome === 'Índice'; return linhas.push({ n, bruto, forma: 'titulo-secao', nome }); }
      // O conteúdo sob um título estranho não é julgado: basta acusar o título.
      secao = 'desconhecida';
      return linhas.push(estranha(n, bruto, 'um título de célula, como "## Pedido  `PED`", ou de seção: Índice, Linguagem ou Tipos', 'ESP-R9'));
    }
    if (bruto === MARCADOR_GERADO) { gerado = true; return linhas.push({ n, bruto, forma: 'marcador-gerado' }); }
    if (gerado) return linhas.push({ n, bruto, forma: 'gerado' });
    if (esperaDefinicao) {
      esperaDefinicao = false;
      if (ehProsa(bruto)) return linhas.push({ n, bruto, forma: 'definicao' });
    }
    if (secao === 'desconhecida') return linhas.push({ n, bruto, forma: 'ignorada' });
    if (secao === null) return linhas.push(estranha(n, bruto, 'um título de seção ou de célula antes desta linha'));
    if (bruto.startsWith('|')) {
      const celulas = celulasDe(bruto);
      if (tabela === null || !celulas) return linhas.push(estranha(n, bruto, 'uma tabela só depois de uma regra terminada em ":", com cada fileira entre "|"', 'LIN-R11'));
      const forma = tabela.fileiras === 0 ? 'tabela-cabecalho' : tabela.fileiras === 1 ? 'tabela-separador' : 'tabela-fileira';
      tabela.fileiras++;
      return linhas.push({ n, bruto, forma, celulas, regra: tabela.regra });
    }
    tabela = null;
    const sub = bruto.startsWith(' ') ? lerSubitem(n, bruto, pai) : null;
    if (sub && pai?.forma === 'desconhecida') return linhas.push({ n, bruto, forma: 'ignorada' });
    if (sub) return linhas.push(pai ? sub : estranha(n, bruto, 'um item antes deste sub-item'));
    if (bruto.startsWith(' ')) return linhas.push(estranha(n, bruto, 'um sub-item com dois espaços de recuo por nível, antes de "- "'));
    if (!bruto.startsWith('- ')) return linhas.push(estranha(n, bruto, 'um item de lista, começado por "- "'));
    const corpo = bruto.slice(2);
    let linha;
    if (secao === 'Linguagem' || secao === 'Tipos') {
      const item = separarCauda(corpo);
      const m = item.texto.match(/^([^:]+): (\S.*)$/);
      linha = m
        ? { n, bruto, forma: secao === 'Tipos' ? 'tipo-valor' : 'termo-linguagem', nome: m[1], ...item, texto: m[2] }
        : secao === 'Tipos'
          ? estranha(n, bruto, 'um tipo de valor, como "- Quantidade: inteiro; de 1 a 99"', 'TIP-R2')
          : estranha(n, bruto, 'um termo da linguagem, como "- termo: definição"', 'TRM-R9');
    } else linha = lerLinhaDeCelula(n, bruto, corpo);
    if (linha.forma === 'afirmacao' && linha.tabela) tabela = { regra: linha, fileiras: 0 };
    pai = linha;
    linhas.push(linha);
  });
  return linhas;
}

function lerLinhaDeCelula(n, bruto, corpo) {
  if (/^\[/.test(corpo) || new RegExp(`^${CODIGO}`).test(corpo)) {
    return lerAfirmacao(n, bruto, corpo)
      ?? estranha(n, bruto, 'uma afirmação, como "- [ ] PED-R1  texto", com dois espaços antes do texto', 'LIN-R11');
  }
  const item = separarCauda(corpo);
  const t = item.texto;
  let m = t.match(/^evento: (\S.*)$/);
  if (m) return { n, bruto, forma: 'evento', nome: m[1], ...item };
  m = t.match(/^pertence a 1 \*\*([^*]+)\*\*$/);
  if (m) return { n, bruto, forma: 'pertencimento', celula: m[1], ...item };
  m = t.match(/^especializa \*\*([^*]+)\*\*$/);
  if (m) return { n, bruto, forma: 'especializacao', celula: m[1], ...item };
  m = t.match(new RegExp(`^(${CARD}) \\*\\*([^*]+)\\*\\*$`));
  if (m) return { n, bruto, forma: 'associacao', cardinalidade: m[1], celula: m[2], ...item };
  m = t.match(/^(\p{L}[\p{L}\p{N} ]*): (\S.*)$/u);
  if (m && !/^(pertence a|especializa) /.test(t)) {
    // O ';' só separa trechos fora de código.
    const cortes = [...mascarar(m[2]).matchAll(/; /g)].map((c) => c.index);
    const trechos = [];
    let de = 0;
    for (const c of cortes) { trechos.push(m[2].slice(de, c)); de = c + 2; }
    trechos.push(m[2].slice(de));
    return { n, bruto, forma: 'atributo', nome: m[1], tipo: trechos[0], qualificadores: trechos.slice(1), ...item };
  }
  return estranha(n, bruto, 'uma linha de bloco de célula: atributo ("- nome: tipo"), relação, evento, afirmação ou lápide', 'LIN-R11');
}

function lerProduto(brutas) {
  const linhas = [];
  let secao = null, pai = null, fileiras = 0;
  brutas.forEach((bruto, i) => {
    const n = i + 1;
    if (bruto.trim() === '') return linhas.push(branco(n, bruto));
    if (i === 0) return linhas.push(/^# \S/.test(bruto) ? { n, bruto, forma: 'titulo-arquivo' } : estranha(n, bruto, 'o título do arquivo, como "# Nome do produto"'));
    if (i === 1 && ehProsa(bruto)) return linhas.push({ n, bruto, forma: 'frase-arquivo' });
    if (bruto.startsWith('#')) {
      pai = null; fileiras = 0;
      secao = bruto.match(/^## (.+)$/)?.[1] ?? null;
      return linhas.push(secao ? { n, bruto, forma: 'titulo-secao', nome: secao } : estranha(n, bruto, 'um título de seção, como "## Propósito"'));
    }
    if (secao === null) return linhas.push(estranha(n, bruto, 'um título de seção antes desta linha'));
    // O conteúdo de uma seção que não existe não é julgado: basta acusar o título.
    if (!SECOES_PRODUTO.includes(secao)) return linhas.push({ n, bruto, forma: 'ignorada' });
    if (secao === 'Áreas') {
      const celulas = celulasDe(bruto);
      if (!celulas) return linhas.push(estranha(n, bruto, 'a tabela de áreas, com cada fileira entre "|"', 'APR-R10'));
      fileiras++;
      if (fileiras === 1) return linhas.push({ n, bruto, forma: 'tabela-cabecalho', celulas });
      if (fileiras === 2) return linhas.push({ n, bruto, forma: 'tabela-separador', celulas });
      if (celulas.length !== COLUNAS_AREAS.length) return linhas.push(estranha(n, bruto, `uma fileira com as ${COLUNAS_AREAS.length} colunas da tabela de áreas`, 'APR-R10'));
      return linhas.push({ n, bruto, forma: 'area', nome: celulas[0], central: celulas[1], prioridade: celulas[2], dono: celulas[3], arquivo: celulas[4] });
    }
    if (bruto.startsWith(' ')) {
      if (pai?.forma === 'desconhecida') return linhas.push({ n, bruto, forma: 'ignorada' });
      const m = secao === 'Externos' && pai?.forma === 'externo' ? bruto.match(/^ {2}- (guarda|fornece|recebe|impõe): \S/) : null;
      return linhas.push(m
        ? { n, bruto, forma: 'subitem-externo', verbo: m[1] }
        : estranha(n, bruto, secao === 'Externos' ? 'um sub-item de externo, iniciado por "guarda:", "fornece:", "recebe:" ou "impõe:"' : 'um item sem recuo: esta seção não tem sub-itens', 'APR-R10'));
    }
    if (!bruto.startsWith('- ')) return linhas.push(estranha(n, bruto, 'um item de lista, começado por "- "'));
    const corpo = bruto.slice(2);
    const item = separarCauda(corpo);
    const t = item.texto;
    let linha, m;
    if (secao === 'Propósito') {
      m = t.match(/^([^:]+): (\S.*)$/);
      linha = m ? { n, bruto, forma: 'proposito', rotulo: m[1], ...item } : estranha(n, bruto, 'um item de propósito, como "- Problema: texto"', 'APR-R10');
    } else if (secao === 'Atores') {
      m = t.match(/^([^:]+): (\S.*)$/);
      linha = m ? { n, bruto, forma: 'ator', nome: m[1], padrao: /; padrão$/.test(m[2]), ...item } : estranha(n, bruto, 'um ator, como "- Nome: acesso"', 'ATO-R7');
    } else if (secao === 'Tipos comuns') {
      m = t.match(/^([^:]+): (\S.*)$/);
      linha = m ? { n, bruto, forma: 'tipo-valor', nome: m[1], ...item, texto: m[2] } : estranha(n, bruto, 'um tipo de valor, como "- Quantidade: inteiro; de 1 a 99"', 'TIP-R2');
    } else if (secao === 'Jornadas') {
      m = corpo.match(new RegExp(`^(PRD-J\\d+) {2}([^:]+): (\\[${CODIGO}\\](?: → \\[${CODIGO}\\])*)$`));
      linha = m ? { n, bruto, forma: 'jornada', id: m[1], nome: m[2], passos: m[3].split(' → ').map((p) => p.slice(1, -1)) } : estranha(n, bruto, 'uma jornada, como "- PRD-J1  Nome: [PED-C1] → [PED-V1]"', 'JOR-R2');
    } else if (secao === 'Externos') {
      m = t.match(/^([^·]+?) · (\S.*)$/);
      linha = m ? { n, bruto, forma: 'externo', nome: m[1], papelExterno: m[2], ...item } : estranha(n, bruto, 'um externo, como "- Nome · papel"', 'APR-R10');
    } else if (secao === 'Regras globais') {
      linha = lerAfirmacao(n, bruto, corpo) ?? estranha(n, bruto, 'uma afirmação de sigla PRD, como "- [ ] PRD-Q1  texto"', 'APR-R10');
    } else {
      m = t.match(/^(.+) · (permanente|nesta versão)$/);
      linha = m ? { n, bruto, forma: 'fora-de-escopo', horizonte: m[2], ...item } : estranha(n, bruto, 'um item fora de escopo, como "- texto · permanente" ou "- texto · nesta versão"', 'APR-R10');
    }
    pai = linha;
    linhas.push(linha);
  });
  return linhas;
}

function lerContadores(brutas) {
  const linhas = [];
  let secao = null;
  brutas.forEach((bruto, i) => {
    const n = i + 1;
    if (bruto.trim() === '') return linhas.push(branco(n, bruto));
    if (i === 0) return linhas.push(/^# \S/.test(bruto) ? { n, bruto, forma: 'titulo-arquivo' } : estranha(n, bruto, 'o título do arquivo, como "# Contadores"'));
    if (i === 1 && ehProsa(bruto)) return linhas.push({ n, bruto, forma: 'frase-arquivo' });
    if (bruto.startsWith('#')) {
      secao = bruto.match(/^## (.+)$/)?.[1] ?? null;
      return linhas.push(SECOES_CONTADORES.includes(secao)
        ? { n, bruto, forma: 'titulo-secao', nome: secao }
        : estranha(n, bruto, 'um título de seção: Identificadores, Perguntas ou Decisões'));
    }
    const m = bruto.match(/^- (\S+) {2}(\d+)(?: {2}(\S+))?$/);
    linhas.push(m && secao
      ? { n, bruto, forma: 'contador', secao, sequencia: m[1], numero: Number(m[2]), nomeCurto: m[3] ?? null }
      : estranha(n, bruto, 'um contador, como "- PED-R  8  nome-curto", com dois espaços entre as partes', 'CTD-R8'));
  });
  return linhas;
}

function lerPerguntas(brutas) {
  const linhas = [];
  let pai = null;
  brutas.forEach((bruto, i) => {
    const n = i + 1;
    if (bruto.trim() === '') return linhas.push(branco(n, bruto));
    if (i === 0 && /^# \S/.test(bruto)) return linhas.push({ n, bruto, forma: 'titulo-arquivo' });
    if (i === 1 && ehProsa(bruto)) return linhas.push({ n, bruto, forma: 'frase-arquivo' });
    let m = bruto.match(/^- (P\d+) {2}(\S.*\?)$/);
    if (m) { pai = { n, bruto, forma: 'pergunta', codigo: m[1], enunciado: m[2] }; return linhas.push(pai); }
    if (bruto.startsWith(' ') && pai?.forma === 'desconhecida') return linhas.push({ n, bruto, forma: 'ignorada' });
    m = pai ? bruto.match(/^ {2}- (opção|sobre): (\S.*)$/) : null;
    if (m) return linhas.push({ n, bruto, forma: 'subitem-pergunta', prefixo: m[1], texto: m[2], pai });
    if (!bruto.startsWith(' ')) pai = { forma: 'desconhecida' };
    linhas.push(estranha(n, bruto, 'uma pergunta, como "- P1  enunciado?", ou um sub-item dela, iniciado por "opção:" ou "sobre:"', 'APG-R5'));
  });
  return linhas;
}

function lerDecisao(brutas) {
  const linhas = [];
  let rotulo = null, historico = false;
  brutas.forEach((bruto, i) => {
    const n = i + 1;
    if (bruto.trim() === '') return linhas.push(branco(n, bruto));
    if (i === 0) {
      const m = bruto.match(/^# (.+\?) {2}`(D\d+)`$/);
      return linhas.push(m ? { n, bruto, forma: 'titulo-decisao', questao: m[1], codigo: m[2] } : estranha(n, bruto, 'o título da decisão: a questão, terminada em "?", dois espaços e o código, como "# Quem vê um pedido?  `D07`"', 'DEC-R1'));
    }
    if (i === 1 && ehProsa(bruto)) return linhas.push({ n, bruto, forma: 'resolucao' });
    if (bruto.startsWith('#')) {
      rotulo = null;
      if (bruto !== '## Histórico') return linhas.push(estranha(n, bruto, 'a seção "## Histórico", a única de uma decisão', 'DEC-R2'));
      historico = true;
      return linhas.push({ n, bruto, forma: 'titulo-historico' });
    }
    if (historico) {
      const m = bruto.match(/^- (\d{4}-\d{2}-\d{2}): \S/);
      return linhas.push(m ? { n, bruto, forma: 'alteracao', data: m[1] } : estranha(n, bruto, 'uma alteração, como "- 2026-10-04: decisão criada"', 'DEC-R19'));
    }
    let m = bruto.match(/^- ([^:]+?)(?:: (\S.*))?$/);
    if (m && ROTULOS_DECISAO.includes(m[1])) { rotulo = m[1]; return linhas.push({ n, bruto, forma: 'rotulo', nome: m[1], texto: m[2] ?? null }); }
    if (bruto.startsWith(' ') && rotulo === undefined) return linhas.push({ n, bruto, forma: 'ignorada' });
    m = rotulo ? bruto.match(/^ {2}- (\S.*)$/) : null;
    if (m) return linhas.push({ n, bruto, forma: 'subitem-decisao', de: rotulo, texto: m[1] });
    if (!bruto.startsWith(' ')) rotulo = undefined;
    linhas.push(estranha(n, bruto, 'um dos itens "- Contexto: texto", "- Alternativas descartadas" ou "- Consequências", ou um sub-item deles', 'DEC-R19'));
  });
  return linhas;
}

const ehPasta = (caminho) => existsSync(caminho) && statSync(caminho).isDirectory();
const ehArquivo = (caminho) => existsSync(caminho) && statSync(caminho).isFile();
const mds = (pasta) => readdirSync(pasta).filter((nome) => nome.endsWith('.md') && ehArquivo(join(pasta, nome))).sort();

// Devolve os arquivos lidos, com as linhas classificadas, e o que falta ou sobra na pasta.
export function lerEspecificacao(pasta) {
  const e = { arquivos: [], faltam: [], soltos: [], pastasForaDaTabela: [], areasSemArquivo: [] };
  const ler = (caminho, tipo, leitor, extra = {}) => e.arquivos.push({ caminho, tipo, linhas: leitor(linhasDe(join(pasta, caminho))), ...extra });

  for (const fixo of ['AGENTS.md', '_convencoes.md']) if (!ehArquivo(join(pasta, fixo))) e.faltam.push({ caminho: fixo, regra: 'VRF-R12' });
  for (const fixo of ['_produto.md', '_contadores.md']) if (!ehArquivo(join(pasta, fixo))) e.faltam.push({ caminho: fixo, regra: 'VRF-R10' });
  if (ehArquivo(join(pasta, '_produto.md'))) ler('_produto.md', 'produto', lerProduto);
  if (ehArquivo(join(pasta, '_contadores.md'))) ler('_contadores.md', 'contadores', lerContadores);
  if (ehArquivo(join(pasta, '_perguntas.md'))) ler('_perguntas.md', 'perguntas', lerPerguntas);

  const conhecidos = new Set(['AGENTS.md', '_convencoes.md', '_produto.md', '_contadores.md', '_perguntas.md', 'decisoes']);
  const areas = e.arquivos.find((a) => a.tipo === 'produto')?.linhas.filter((l) => l.forma === 'area') ?? [];
  for (const area of areas) {
    const nome = area.arquivo.replace(/\/$/, '');
    conhecidos.add(nome);
    if (/[\\/]/.test(nome) || nome.startsWith('.')) e.areasSemArquivo.push(area);
    else if (ehArquivo(join(pasta, nome))) ler(nome, 'area', lerArea, { area: area.nome });
    else if (ehPasta(join(pasta, nome))) {
      if (!ehArquivo(join(pasta, nome, '_area.md'))) e.faltam.push({ caminho: `${nome}/_area.md`, regra: 'ARE-R1' });
      for (const arquivo of mds(join(pasta, nome))) ler(`${nome}/${arquivo}`, 'area', lerArea, { area: area.nome });
    } else e.areasSemArquivo.push(area);
  }
  for (const nome of readdirSync(pasta).sort()) {
    if (conhecidos.has(nome)) continue;
    const caminho = join(pasta, nome);
    if (ehPasta(caminho)) { if (ehArquivo(join(caminho, '_area.md'))) e.pastasForaDaTabela.push(nome); }
    else if (nome.endsWith('.md') && linhasDe(caminho)[0] !== MARCADOR_GERADO) e.soltos.push(nome);
  }

  if (ehPasta(join(pasta, 'decisoes'))) {
    for (const fixo of ['AGENTS.md', '_convencoes.md']) if (!ehArquivo(join(pasta, 'decisoes', fixo))) e.faltam.push({ caminho: `decisoes/${fixo}`, regra: 'VRF-R12' });
    for (const sub of readdirSync(join(pasta, 'decisoes')).sort()) {
      if (!ehPasta(join(pasta, 'decisoes', sub))) continue;
      for (const arquivo of mds(join(pasta, 'decisoes', sub))) {
        if (arquivo === 'README.md') continue;
        const codigo = arquivo.match(/^(D\d+)-[a-z0-9-]+\.md$/)?.[1];
        if (codigo) ler(`decisoes/${sub}/${arquivo}`, 'decisao', lerDecisao, { codigo });
        else e.soltos.push(`decisoes/${sub}/${arquivo}`);
      }
    }
  }
  return e;
}
