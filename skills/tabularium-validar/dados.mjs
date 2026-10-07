// Checagens sobre os dados de referência: a regra que os traz, a tabela no bloco
// e o arquivo de dados/ que ela cita. Dos valores, só se confere a identidade repetida.

import { mascarar } from './leitura.mjs';
import { leituras } from './termos.mjs';

const FORMATOS = ['json', 'csv'];
const NOME = /^([A-Z]{2,5})-[a-z0-9]+(?:-[a-z0-9]+)*\.(?:json|csv)$/;
const extensaoDe = (nome) => nome.match(/\.([^.]+)$/)?.[1] ?? '';
const lista = (itens) => itens.map((i) => `"${i}"`).join(', ');

export function checarDados(e, acusar) {
  const blocos = blocosDe(e);
  const celulas = new Set(blocos.map((b) => b.nome));
  const arquivos = new Map(e.dados.map((d) => [d.nome, d]));
  const citados = new Map();

  for (const a of e.arquivos.filter((x) => x.tipo === 'produto')) {
    for (const l of a.linhas) {
      if (l.forma === 'afirmacao' && l.arquivo) acusar(a.caminho, l.n, 'DRF-R8', 'dados de referência são de uma célula; a regra que cita um arquivo de dados fica no bloco dela');
    }
  }

  for (const b of blocos) {
    const acusarAqui = (linha, regra, frase) => acusar(b.caminho, linha, regra, frase);
    regrasDeDados(b).forEach((r, i, todas) => {
      const { l } = r;
      if (l.papel !== 'R') acusarAqui(l.n, 'DRF-R4', `dados de referência entram por uma regra (R), e ${l.id} tem papel ${l.papel}`);
      if (i > 0) acusarAqui(l.n, 'DRF-R9', `a célula já tem dados de referência em ${todas[0].l.id}; cada célula tem no máximo uma regra de dados`);
      if (r.cabecalho) checarTabelaDeDados(b, r, acusarAqui);
      else checarCitacao(b, l, { celulas, arquivos, citados }, acusar);
    });
  }

  for (const d of e.dados) {
    const caminho = `dados/${d.nome}`;
    if (d.pasta) acusar(caminho, null, 'ADA-R1', 'a pasta dados/ não tem subpastas; os arquivos de dados ficam todos nela');
    else if (!FORMATOS.includes(extensaoDe(d.nome))) acusar(caminho, null, 'ADA-R3', 'em dados/ só cabem arquivos .json e .csv; dado em outro formato é convertido antes de entrar');
    else if (!citados.has(d.nome)) acusar(caminho, null, 'ADA-R4', `nenhuma regra cita este arquivo; a regra de dados termina com ": [${d.nome}]"`);
  }
}

// Cada bloco de célula, com as colunas que os dados dela podem trazer: os atributos e as células das relações.
function blocosDe(e) {
  const blocos = [];
  for (const a of e.arquivos.filter((x) => x.tipo === 'area')) {
    let b = null;
    for (const l of a.linhas) {
      if (l.forma === 'titulo-secao') b = null;
      if (l.forma === 'titulo-celula') blocos.push(b = { caminho: a.caminho, nome: l.nome.toLowerCase(), sigla: l.sigla, colunas: new Map(), linhas: [] });
      if (!b) continue;
      b.linhas.push(l);
      const coluna = l.forma === 'atributo' ? l.nome : ['associacao', 'pertencimento'].includes(l.forma) ? l.celula : null;
      if (coluna) b.colunas.set(coluna.toLowerCase(), l.qualificadores.includes('identidade'));
    }
  }
  for (const b of blocos) b.identidade = [...b.colunas].find(([, identidade]) => identidade)?.[0] ?? null;
  return blocos;
}

// As regras de dados de um bloco: a que cita um arquivo e a seguida de uma tabela
// cuja primeira coluna é o atributo de identidade; a outra tabela é de decisão.
function regrasDeDados(b) {
  const regras = [];
  b.linhas.forEach((l, i) => {
    if (l.forma !== 'afirmacao') return;
    if (l.arquivo) return regras.push({ l });
    if (!l.tabela || !b.identidade) return;
    let j = i + 1;
    while (b.linhas[j]?.forma === 'branco') j++;
    const cabecalho = b.linhas[j];
    if (cabecalho?.forma !== 'tabela-cabecalho' || cabecalho.celulas[0].toLowerCase() !== b.identidade) return;
    const fileiras = [];
    for (let k = j + 1; ['tabela-separador', 'tabela-fileira'].includes(b.linhas[k]?.forma); k++) if (b.linhas[k].forma === 'tabela-fileira') fileiras.push(b.linhas[k]);
    regras.push({ l, cabecalho, fileiras });
  });
  return regras;
}

function checarTabelaDeDados(b, { cabecalho, fileiras }, acusar) {
  const estranhas = cabecalho.celulas.filter((c) => !b.colunas.has(c.toLowerCase()));
  if (estranhas.length) acusar(cabecalho.n, 'DRF-R10', `${lista(estranhas)} não é atributo desta célula; cada coluna da tabela de dados é um atributo dela, com o nome escrito como no modelo`);
  acusarRepetidas(fileiras.map((f) => ({ valor: f.celulas[0], linha: f.n })), acusar);
}

function acusarRepetidas(identidades, acusar) {
  const vistas = new Set();
  for (const { valor, linha } of identidades) {
    if (vistas.has(valor)) acusar(linha, 'DRF-R11', `a identidade "${valor}" já apareceu nestes dados; cada instância aparece uma só vez`);
    vistas.add(valor);
  }
}

function checarCitacao(b, l, { celulas, arquivos, citados }, acusar) {
  const nome = l.arquivo.split(/[\\/]/).pop();
  const formato = extensaoDe(nome);
  if (nome !== l.arquivo) acusar(b.caminho, l.n, 'DRF-R15', `a citação traz só o nome do arquivo, sem caminho: "[${nome}]"; ele mora em dados/`);
  else if (!FORMATOS.includes(formato)) acusar(b.caminho, l.n, 'ADA-R3', `"${nome}" não é .json nem .csv; dado em outro formato é convertido antes de entrar`);
  else if (nome.match(NOME)?.[1] !== b.sigla) acusar(b.caminho, l.n, 'ADA-R2', `o nome do arquivo de dados é a sigla da célula, "-", um nome curto em minúsculas e sem acento, e a extensão, como "${b.sigla}-nome-curto.${formato}"`);

  if (citados.has(nome)) acusar(b.caminho, l.n, 'ADA-R4', `${nome} já é citado por ${citados.get(nome)}; cada arquivo de dados é citado por uma só regra`);
  else citados.set(nome, l.id);

  // O que a regra diz que o arquivo traz: os atributos da célula e as células das partes, em negrito.
  const nomeados = [];
  for (const m of mascarar(l.texto).matchAll(/\*\*([^*]+)\*\*/g)) {
    const lidas = leituras(m[1]);
    const coluna = lidas.find((x) => b.colunas.has(x));
    const chave = coluna ?? lidas.find((x) => celulas.has(x));
    if (chave && !nomeados.some((n) => n.chave === chave)) nomeados.push({ chave, coluna: Boolean(coluna) });
  }
  if (!b.identidade) acusar(b.caminho, l.n, 'DRF-R8', 'só a célula com um atributo marcado "identidade" tem dados de referência');
  else if (nomeados.find((n) => n.coluna)?.chave !== b.identidade) {
    acusar(b.caminho, l.n, 'DRF-R14', `a regra nomeia em negrito os atributos que o arquivo traz, com o de identidade primeiro: **${b.identidade}**`);
  }

  const arquivo = arquivos.get(nome);
  if (!FORMATOS.includes(formato)) return;
  if (!arquivo || arquivo.pasta) return acusar(b.caminho, l.n, 'REF-R1', `o arquivo dados/${nome} não existe`);
  const acusarNoArquivo = (linha, regra, frase) => acusar(`dados/${nome}`, linha, regra, frase);
  const esperadas = nomeados.map((n) => n.chave);
  if (formato === 'csv') checarCsv(arquivo.texto, b.identidade, esperadas, l.id, acusarNoArquivo);
  else checarJson(arquivo.texto, b.identidade, esperadas, l.id, acusarNoArquivo);
}

function checarCsv(texto, identidade, esperadas, regra, acusar) {
  const registros = lerCsv(texto);
  const colunas = (registros[0]?.campos ?? []).map((c) => c.trim().toLowerCase());
  if (identidade && colunas[0] !== identidade) acusar(1, 'ADA-R13', `a primeira linha do CSV traz os nomes dos atributos, com o de identidade primeiro: "${identidade}"`);
  const faltam = esperadas.filter((x) => !colunas.includes(x));
  const sobram = colunas.filter((x) => !esperadas.includes(x));
  if (faltam.length || sobram.length) {
    const partes = [faltam.length ? `falta ${lista(faltam)}` : null, sobram.length ? `sobra ${lista(sobram)}` : null].filter(Boolean);
    acusar(1, 'ADA-R15', `as colunas do CSV são exatamente os atributos que ${regra} nomeia em negrito: ${partes.join(' e ')}`);
  }
  acusarRepetidas(registros.slice(1).map((r) => ({ valor: r.campos[0], linha: r.linha })), acusar);
}

function checarJson(texto, identidade, esperadas, regra, acusar) {
  let instancias;
  try { instancias = JSON.parse(texto); } catch { instancias = null; }
  const ehObjeto = (x) => x !== null && typeof x === 'object' && !Array.isArray(x);
  if (!Array.isArray(instancias) || !instancias.every(ehObjeto)) {
    return acusar(null, 'ADA-R9', 'o arquivo de dados em JSON é uma lista de objetos bem formada, com um objeto por instância');
  }
  const chaves = [...new Set(instancias.flatMap(Object.keys))];
  const sobram = chaves.filter((c) => !esperadas.includes(c.toLowerCase()));
  if (sobram.length) acusar(null, 'ADA-R16', `${lista(sobram)} não está entre os atributos e as partes que ${regra} nomeia em negrito`);
  const chave = chaves.find((c) => c.toLowerCase() === identidade);
  if (chave) acusarRepetidas(instancias.filter((o) => chave in o).map((o) => ({ valor: String(o[chave]), linha: null })), acusar);
}

// Lê o CSV com separador vírgula e campos entre aspas, que podem trazer vírgula, aspas dobradas e quebra de linha.
function lerCsv(texto) {
  const registros = [];
  let campos = [], campo = '', aspas = false, linha = 1, inicio = 1;
  const fechar = () => { campos.push(campo); campo = ''; };
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (c === '\n') linha++;
    if (aspas) {
      if (c !== '"') campo += c;
      else if (texto[i + 1] === '"') { campo += '"'; i++; }
      else aspas = false;
    } else if (c === '"') aspas = true;
    else if (c === ',') fechar();
    else if (c === '\n') {
      fechar();
      if (campos.some((x) => x !== '')) registros.push({ campos, linha: inicio });
      campos = []; inicio = linha;
    } else if (c !== '\r') campo += c;
  }
  fechar();
  if (campos.some((x) => x !== '')) registros.push({ campos, linha: inicio });
  return registros;
}
