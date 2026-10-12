// Lê uma especificação Tabularium e classifica cada linha pela forma que ela tem.
// Não julga: a linha que não casa com nenhuma forma sai como 'desconhecida',
// com o que cabia ali e a regra que descreve essa forma.

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

export const MARCADOR_GERADO = '<!-- gerado; não editar -->';
export const SECOES_PRODUTO = ['Propósito', 'Diferenciais', 'Atores', 'Tipos comuns', 'Jornadas', 'Externos', 'Regras globais', 'Fora de escopo'];
export const SECOES_AREA = ['Fronteira', 'Linguagem', 'Tipos'];
export const ROTULOS_DECISAO = ['Contexto', 'Alternativas descartadas', 'Consequências'];
// As linhas que a área traz abaixo da frase, na ordem em que vêm.
export const DADOS_DA_AREA = ['célula central', 'prioridade', 'responsável'];
// O índice de cada pasta, que o indexador produz e o validador não lê.
export const INDICE = 'README.md';
// As pastas de arquitetura e de interface: de cada uma só se leem as decisões e as citações de decisão.
export const CAMADAS = ['arquitetura', 'interface'];
export const FORA_DA_CAMADA = ['AGENTS.md', '_convencoes.md', 'ideia.md', 'decisoes.md', '_achados.md', INDICE];
const FIXOS = ['AGENTS.md', '_convencoes.md', '_produto.md', '_perguntas.md'];

const CARD = '(?:1|0\\.\\.1|0\\.\\.N|1\\.\\.N)';
// O número de um código: prefixo de mudança, ponto e número de ordem, ou só dígitos no código anterior ao prefixo.
// Aqui a forma é frouxa, para a linha ser reconhecida; quem julga o número é `numeroDe`.
export const NUMERO = '(?:[a-z0-9]+\\.\\d+|\\d+)';
export const CODIGO = `[A-Z]{2,5}-[A-Z]${NUMERO}`;
const DECISAO = `D${NUMERO}`;
const PERGUNTA = `P${NUMERO}`;
export const ALFABETO_DO_SORTEIO = 'bcdfghjklmnpqrstvwxz23456789';
const LETRAS_DO_SORTEIO = ALFABETO_DO_SORTEIO.replace(/\d/g, '');
const SORTEADO = new RegExp(`^[${LETRAS_DO_SORTEIO}][${ALFABETO_DO_SORTEIO}]{3}$`);
const SEM_ZERO = /^[1-9]\d*$/;

// Devolve o número de um código na forma que o identifica, ou null se ele é inválido.
// O prefixo é um número de issue ou um código sorteado, e nenhum número começa por zero;
// o código anterior ao prefixo traz só dígitos, e nele "07" e "7" são o mesmo.
export function numeroDe(escrito) {
  if (/^\d+$/.test(escrito)) return Number(escrito) > 0 ? String(Number(escrito)) : null;
  const m = escrito.match(/^([a-z0-9]+)\.(\d+)$/);
  if (!m) return null;
  return (SEM_ZERO.test(m[1]) || SORTEADO.test(m[1])) && SEM_ZERO.test(m[2]) ? escrito : null;
}

const linhasDe = (caminho) => readFileSync(caminho, 'utf8').replace(/^﻿/, '').split(/\r?\n/);
const ehProsa = (l) => l.trim() !== '' && !/^[-#|<\s]/.test(l);
const branco = (n, bruto) => ({ n, bruto, forma: 'branco' });
const estranha = (n, bruto, esperado, regra = 'VRF-R8') => ({ n, bruto, forma: 'desconhecida', esperado, regra });
// O nome de um termo na linha que o define: vem em negrito, e sai daqui sem as marcas.
const nomear = (escrito) => ({ nome: escrito.replaceAll('**', ''), nomeEmNegrito: /^\*\*[^*]+\*\*$/.test(escrito) });
const celulasDe = (bruto) => (/^\|.*\|$/.test(bruto) ? bruto.slice(1, -1).split('|').map((c) => c.trim()) : null);

// Dentro de código nada é marca: o miolo vira enchimento, com o mesmo comprimento.
// O código abre e fecha com o mesmo número de crases, e assim pode trazer crases dentro.
export const mascarar = (t) => t.replace(/(?<!`)(`+)(?!`)(.*?)(?<!`)\1(?!`)/g, (c, crases, miolo) => crases + '¤'.repeat(miolo.length) + crases);

// Separa do texto as marcas de fim de item: decisões, pergunta e, numa regra, o ':' que anuncia a tabela
// ou o arquivo de dados, como ": [PED-tarifas.json]". É o ponto no nome que distingue o arquivo de um identificador,
// e a extensão que o distingue do identificador com prefixo de mudança, que termina em dígitos.
// Os sinônimos proibidos, como "(~~valor, montante~~)", fecham o texto e vêm antes dessas marcas;
// os que aparecem fora do fim também são lidos, e `declaracaoNoFim` diz se houve um no lugar certo.
function separarCauda(texto, comTabela = false) {
  let resto = mascarar(texto);
  const cauda = { decisoes: [], pergunta: null, tabela: false, arquivo: null, caudaInvalida: false, sinonimos: [], declaracaoNoFim: false };
  let m = comTabela ? resto.match(/: \[([^[\]]*\.[^[\]]*)\]$/) : null;
  if (m && /\.\d+$/.test(m[1])) m = null;
  if (m) { cauda.arquivo = m[1]; resto = resto.slice(0, m.index); }
  else if (comTabela && resto.endsWith(':')) { cauda.tabela = true; resto = resto.slice(0, -1); }
  m = resto.match(new RegExp(` ⟵ \\[(${PERGUNTA})\\]$`));
  if (m) { cauda.pergunta = m[1]; resto = resto.slice(0, m.index); }
  m = resto.match(new RegExp(` ⟸ \\[(${DECISAO}(?:, ${DECISAO})*)\\]$`));
  if (m) { cauda.decisoes = m[1].split(', '); resto = resto.slice(0, m.index); }
  if (/[⟸⟵]/.test(resto)) cauda.caudaInvalida = true;
  m = resto.match(/ \(~~([^~]+)~~\)$/);
  if (m) { cauda.sinonimos = m[1].split(/,\s*/); cauda.declaracaoNoFim = true; resto = resto.slice(0, m.index); }
  // Declaração fora do fim: TRM-R13 acusa o lugar, mas os sinônimos continuam proibidos.
  for (const fora of resto.matchAll(/\(~~([^~]+)~~\)/g)) cauda.sinonimos.push(...fora[1].split(/,\s*/));
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
  const partes = id.match(new RegExp(`^([A-Z]{2,5})-([A-Z])(${NUMERO})$`));
  const linha = { n, bruto, forma: 'afirmacao', marca, id, sigla: partes?.[1] ?? null, papel: partes?.[2] ?? null, numero: partes?.[3] ?? null, ator: t[1] ?? null, espacos };
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
      if (celula) { secao = 'célula'; esperaDefinicao = true; return linhas.push({ n, bruto, forma: 'titulo-celula', nivel: celula[1].length, ...nomear(celula[2]), sigla: celula[3] }); }
      const nome = bruto.match(/^## (.+)$/)?.[1];
      if (SECOES_AREA.includes(nome)) { secao = nome; gerado = nome === 'Fronteira'; return linhas.push({ n, bruto, forma: 'titulo-secao', nome }); }
      // O conteúdo sob um título estranho não é julgado: basta acusar o título.
      secao = 'desconhecida';
      return linhas.push(estranha(n, bruto, 'um título de célula, como "## **Pedido**  `PED`", ou de seção: Fronteira, Linguagem ou Tipos', 'ESP-R9'));
    }
    if (bruto === MARCADOR_GERADO) { gerado = true; return linhas.push({ n, bruto, forma: 'marcador-gerado' }); }
    if (gerado) return linhas.push({ n, bruto, forma: 'gerado' });
    if (esperaDefinicao) {
      esperaDefinicao = false;
      if (ehProsa(bruto)) return linhas.push({ n, bruto, forma: 'definicao', ...separarCauda(bruto) });
    }
    if (secao === 'desconhecida') return linhas.push({ n, bruto, forma: 'ignorada' });
    if (secao === null) {
      const m = bruto.match(new RegExp(`^- (${DADOS_DA_AREA.join('|')}): (\\S.*)$`));
      return linhas.push(m
        ? { n, bruto, forma: 'dado-area', dado: m[1], valor: m[2] }
        : estranha(n, bruto, 'uma linha da área, como "- célula central: **Pedido**", "- prioridade: núcleo" ou "- responsável: nome", ou um título de seção ou de célula', 'ARE-R23.5'));
    }
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
        ? { n, bruto, forma: secao === 'Tipos' ? 'tipo-valor' : 'termo-linguagem', ...nomear(m[1]), ...item, texto: m[2] }
        : secao === 'Tipos'
          ? estranha(n, bruto, 'um tipo de valor, como "- **Quantidade**: inteiro; de 1 a 99"', 'TIP-R2')
          : estranha(n, bruto, 'um termo da linguagem, como "- **termo**: definição"', 'TRM-R9');
    } else linha = lerLinhaDeCelula(n, bruto, corpo);
    if (linha.forma === 'afirmacao' && linha.tabela) tabela = { regra: linha, fileiras: 0 };
    pai = linha;
    linhas.push(linha);
  });
  return linhas;
}

// Parte o texto nos '; ' que estão fora de código.
function partir(texto) {
  const trechos = [];
  let de = 0;
  for (const corte of mascarar(texto).matchAll(/; /g)) { trechos.push(texto.slice(de, corte.index)); de = corte.index + 2; }
  trechos.push(texto.slice(de));
  return trechos;
}

function lerLinhaDeCelula(n, bruto, corpo) {
  if (/^\[/.test(corpo) || new RegExp(`^${CODIGO}`).test(corpo)) {
    return lerAfirmacao(n, bruto, corpo)
      ?? estranha(n, bruto, 'uma afirmação, como "- [ ] PED-R1.1  texto", com dois espaços antes do texto', 'LIN-R11');
  }
  const item = separarCauda(corpo);
  const t = item.texto;
  let m = t.match(/^evento: (\S.*)$/);
  if (m) return { n, bruto, forma: 'evento', ...nomear(m[1]), ...item };
  m = t.match(/^especializa \*\*([^*]+)\*\*$/);
  if (m) return { n, bruto, forma: 'especializacao', celula: m[1], ...item };
  // A relação também leva qualificadores, como em "pertence a 1 **Cliente**; inverso: 0..N".
  const [relacao, ...qualificadores] = partir(t);
  m = relacao.match(/^pertence a 1 \*\*([^*]+)\*\*$/);
  if (m) return { n, bruto, forma: 'pertencimento', celula: m[1], qualificadores, ...item };
  m = relacao.match(new RegExp(`^(${CARD}) \\*\\*([^*]+)\\*\\*$`));
  if (m) return { n, bruto, forma: 'associacao', cardinalidade: m[1], celula: m[2], qualificadores, ...item };
  m = t.match(/^(\*\*\p{L}[\p{L}\p{N} ]*\*\*|\p{L}[\p{L}\p{N} ]*): (\S.*)$/u);
  if (m && !/^(pertence a|especializa) /.test(t)) {
    const trechos = partir(m[2]);
    return { n, bruto, forma: 'atributo', ...nomear(m[1]), tipo: trechos[0], qualificadores: trechos.slice(1), ...item };
  }
  return estranha(n, bruto, 'uma linha de bloco de célula: atributo ("- **nome**: tipo"), relação, evento, afirmação ou lápide', 'LIN-R11');
}

function lerProduto(brutas) {
  const linhas = [];
  let secao = null, pai = null;
  brutas.forEach((bruto, i) => {
    const n = i + 1;
    if (bruto.trim() === '') return linhas.push(branco(n, bruto));
    if (i === 0) return linhas.push(/^# \S/.test(bruto) ? { n, bruto, forma: 'titulo-arquivo' } : estranha(n, bruto, 'o título do arquivo, como "# Nome do produto"'));
    if (i === 1 && ehProsa(bruto)) return linhas.push({ n, bruto, forma: 'frase-arquivo' });
    if (bruto.startsWith('#')) {
      pai = null;
      secao = bruto.match(/^## (.+)$/)?.[1] ?? null;
      return linhas.push(secao ? { n, bruto, forma: 'titulo-secao', nome: secao } : estranha(n, bruto, 'um título de seção, como "## Propósito"'));
    }
    if (secao === null) return linhas.push(estranha(n, bruto, 'um título de seção antes desta linha'));
    // O conteúdo de uma seção que não existe não é julgado: basta acusar o título.
    if (!SECOES_PRODUTO.includes(secao)) return linhas.push({ n, bruto, forma: 'ignorada' });

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
    } else if (secao === 'Diferenciais') {
      linha = { n, bruto, forma: 'diferencial', ...item };
    } else if (secao === 'Atores') {
      m = t.match(/^([^:]+): (\S.*)$/);
      linha = m ? { n, bruto, forma: 'ator', ...nomear(m[1]), padrao: /; padrão$/.test(m[2]), ...item } : estranha(n, bruto, 'um ator, como "- **Nome**: acesso"', 'ATO-R7');
    } else if (secao === 'Tipos comuns') {
      m = t.match(/^([^:]+): (\S.*)$/);
      linha = m ? { n, bruto, forma: 'tipo-valor', ...nomear(m[1]), ...item, texto: m[2] } : estranha(n, bruto, 'um tipo de valor, como "- **Quantidade**: inteiro; de 1 a 99"', 'TIP-R2');
    } else if (secao === 'Jornadas') {
      m = corpo.match(new RegExp(`^(PRD-J${NUMERO}) {2}([^:]+): (\\[${CODIGO}\\](?: → \\[${CODIGO}\\])*)$`));
      linha = m ? { n, bruto, forma: 'jornada', id: m[1], nome: m[2], passos: m[3].split(' → ').map((p) => p.slice(1, -1)) } : estranha(n, bruto, 'uma jornada, como "- PRD-J1.1  Nome: [PED-C1.1] → [PED-V1.1]"', 'JOR-R2');
    } else if (secao === 'Externos') {
      m = t.match(/^([^·]+?) · (\S.*)$/);
      linha = m ? { n, bruto, forma: 'externo', ...nomear(m[1]), papelExterno: m[2], ...item } : estranha(n, bruto, 'um externo, como "- **Nome** · papel"', 'APR-R10');
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

function lerPerguntas(brutas) {
  const linhas = [];
  let pai = null;
  brutas.forEach((bruto, i) => {
    const n = i + 1;
    if (bruto.trim() === '') return linhas.push(branco(n, bruto));
    if (i === 0 && /^# \S/.test(bruto)) return linhas.push({ n, bruto, forma: 'titulo-arquivo' });
    if (i === 1 && ehProsa(bruto)) return linhas.push({ n, bruto, forma: 'frase-arquivo' });
    let m = bruto.match(new RegExp(`^- (${PERGUNTA}) {2}(\\S.*\\?)$`));
    if (m) { pai = { n, bruto, forma: 'pergunta', codigo: m[1], enunciado: m[2] }; return linhas.push(pai); }
    if (bruto.startsWith(' ') && pai?.forma === 'desconhecida') return linhas.push({ n, bruto, forma: 'ignorada' });
    m = pai ? bruto.match(/^ {2}- (opção|sobre): (\S.*)$/) : null;
    if (m) return linhas.push({ n, bruto, forma: 'subitem-pergunta', prefixo: m[1], texto: m[2], pai });
    if (!bruto.startsWith(' ')) pai = { forma: 'desconhecida' };
    linhas.push(estranha(n, bruto, 'uma pergunta, como "- P9.1  enunciado?", ou um sub-item dela, iniciado por "opção:" ou "sobre:"', 'APG-R5'));
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
      const m = bruto.match(new RegExp(`^# (.+\\?) {2}\`(${DECISAO})\`$`));
      return linhas.push(m ? { n, bruto, forma: 'titulo-decisao', questao: m[1], codigo: m[2] } : estranha(n, bruto, 'o título da decisão: a questão, terminada em "?", dois espaços e o código, como "# Quem vê um pedido?  `D7.1`"', 'DEC-R1'));
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
const mds = (pasta) => readdirSync(pasta).filter((nome) => nome.endsWith('.md') && nome !== INDICE && ehArquivo(join(pasta, nome))).sort();

// Devolve os arquivos lidos, com as linhas classificadas, e o que falta ou sobra na pasta.
export function lerEspecificacao(pasta) {
  const e = { arquivos: [], livres: [], dados: [], faltam: [], soltos: [], decisoesSoltas: [] };
  const ler = (caminho, tipo, leitor, extra = {}) => e.arquivos.push({ caminho, tipo, linhas: leitor(linhasDe(join(pasta, caminho))), ...extra });
  // As decisões de uma pasta de decisões, uma subpasta por área; a camada é null na especificação.
  // Só na especificação a pasta guarda arquivos soltos: a legenda e as instruções das decisões.
  const lerDecisoes = (raiz, camada) => {
    if (!ehPasta(join(pasta, raiz))) return;
    for (const sub of readdirSync(join(pasta, raiz)).sort()) {
      if (!ehPasta(join(pasta, raiz, sub))) {
        if (camada && sub.endsWith('.md')) e.decisoesSoltas.push(`${raiz}/${sub}`);
        continue;
      }
      for (const arquivo of mds(join(pasta, raiz, sub))) {
        const codigo = arquivo.match(new RegExp(`^(${DECISAO})-[a-z0-9-]+\\.md$`))?.[1];
        if (codigo) ler(`${raiz}/${sub}/${arquivo}`, 'decisao', lerDecisao, { codigo, camada });
        else e.soltos.push(`${raiz}/${sub}/${arquivo}`);
      }
    }
  };

  for (const fixo of ['AGENTS.md', '_convencoes.md']) if (!ehArquivo(join(pasta, fixo))) e.faltam.push({ caminho: fixo, regra: 'VRF-R12' });
  if (!ehArquivo(join(pasta, '_produto.md'))) e.faltam.push({ caminho: '_produto.md', regra: 'VRF-R10' });
  if (ehArquivo(join(pasta, '_produto.md'))) ler('_produto.md', 'produto', lerProduto);
  if (ehArquivo(join(pasta, '_perguntas.md'))) ler('_perguntas.md', 'perguntas', lerPerguntas);

  // É área todo arquivo .md da pasta que não é fixo, índice nem parte gerada, e toda subpasta com _area.md.
  // O arquivo que traz a frase e os dados da área é o principal: o da área, ou o _area.md da pasta.
  const pastasDeArea = new Set();
  for (const nome of readdirSync(pasta).sort()) {
    const caminho = join(pasta, nome);
    if (ehPasta(caminho)) {
      if (nome === 'decisoes' || nome === 'dados' || !ehArquivo(join(caminho, '_area.md'))) continue;
      pastasDeArea.add(nome);
      for (const arquivo of mds(caminho)) ler(`${nome}/${arquivo}`, 'area', lerArea, { area: nome, principal: arquivo === '_area.md' });
    } else if (nome.endsWith('.md') && !FIXOS.includes(nome) && nome !== INDICE && linhasDe(caminho)[0] !== MARCADOR_GERADO) {
      if (nome.startsWith('_')) e.soltos.push(nome);
      else ler(nome, 'area', lerArea, { area: nome.slice(0, -3), principal: true });
    }
  }

  if (ehPasta(join(pasta, 'decisoes'))) {
    for (const fixo of ['AGENTS.md', '_convencoes.md']) if (!ehArquivo(join(pasta, 'decisoes', fixo))) e.faltam.push({ caminho: `decisoes/${fixo}`, regra: 'VRF-R12' });
  }
  lerDecisoes('decisoes', null);

  // Da arquitetura e da interface, as decisões são lidas como decisões; os outros arquivos vêm
  // com as linhas sem classificar, só para a citação de decisão. A área com esse nome é área.
  for (const camada of CAMADAS) {
    if (pastasDeArea.has(camada) || !ehPasta(join(pasta, camada))) continue;
    lerDecisoes(`${camada}/decisoes`, camada);
    const percorrer = (rel) => {
      for (const nome of readdirSync(join(pasta, rel)).sort()) {
        const caminho = `${rel}/${nome}`;
        if (ehPasta(join(pasta, caminho))) { if (caminho !== `${camada}/decisoes`) percorrer(caminho); }
        else if (nome.endsWith('.md') && !(rel === camada && FORA_DA_CAMADA.includes(nome))) {
          e.livres.push({ caminho, camada, linhas: linhasDe(join(pasta, caminho)).map((bruto, i) => ({ n: i + 1, bruto })) });
        }
      }
    };
    percorrer(camada);
  }

  // Os arquivos de dados vêm com o texto inteiro: não têm linhas a classificar.
  if (ehPasta(join(pasta, 'dados'))) {
    for (const nome of readdirSync(join(pasta, 'dados')).sort()) {
      const caminho = join(pasta, 'dados', nome);
      if (ehPasta(caminho)) e.dados.push({ nome, pasta: true });
      else e.dados.push({ nome, texto: /\.(json|csv)$/.test(nome) ? readFileSync(caminho, 'utf8').replace(/^﻿/, '') : null });
    }
  }
  return e;
}
