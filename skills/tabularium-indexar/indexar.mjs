#!/usr/bin/env node
// Produz os índices de pasta de uma especificação Tabularium: um README.md com as áreas de cada pasta
// e um com as decisões de cada pasta de decisões. Não interpreta o texto nem roda as checagens do validador.
// Uso: node indexar.mjs [pasta-da-especificação]
// Sem argumento, indexa specs/ a partir da pasta atual.
// Imprime uma linha por índice gravado ou apagado, uma por arquivo que ficou sem indexar, e o total no fim.
// Sai com 0 se indexou tudo, 1 se algo ficou sem indexar e 2 se a pasta não existe ou falta a leitura.

import { existsSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

// A leitura é a do validador, que mora na pasta da skill de validação, ao lado desta.
const leitura = await import(new URL('../tabularium-validar/leitura.mjs', import.meta.url)).catch((erro) => {
  if (erro.code === 'ERR_MODULE_NOT_FOUND') return null;
  throw erro;
});

// O arquivo que abre cada pasta de arquitetura e de interface, como o _produto.md abre a da especificação.
const CAPAS = { arquitetura: '_sistema.md', interface: '_interface.md' };
const PASTAS_GERAIS = { _produto: 'do produto', _sistema: 'do sistema', _interface: 'da interface' };
const TITULO_DE_BLOCO = /^(#{2,}) (.+?) {2}`([^`]*)`$/;

const ordem = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
const semNegrito = (texto) => texto.replaceAll('**', '');
const ehProsa = (bruto) => bruto !== undefined && bruto.trim() !== '' && !/^[-#|<\s]/.test(bruto);
const ehPasta = (caminho) => existsSync(caminho) && statSync(caminho).isDirectory();
const nomeDe = (caminho) => caminho.slice(caminho.lastIndexOf('/') + 1);

// O título e a frase que abrem um arquivo, ou o motivo de não terem sido lidos.
function aberturaDe(linhas) {
  const titulo = linhas[0]?.bruto.match(/^# (\S.*)$/)?.[1];
  if (!titulo) return { motivo: 'falta o título do arquivo, na primeira linha' };
  if (!ehProsa(linhas[1]?.bruto)) return { motivo: 'falta a frase, na linha seguinte ao título' };
  return { titulo: semNegrito(titulo), frase: semNegrito(linhas[1].bruto) };
}

// Os blocos de um arquivo: de célula, pela forma que a leitura deu às linhas, ou de componente, pelo texto delas.
function blocosDe(linhas, classificadas) {
  const blocos = [];
  linhas.forEach((l, i) => {
    const titulo = classificadas ? (l.forma === 'titulo-celula' ? [null, '#'.repeat(l.nivel), l.nome, l.sigla] : null) : l.bruto.match(TITULO_DE_BLOCO);
    if (!titulo) return;
    const seguinte = linhas[i + 1];
    const definicao = classificadas ? (seguinte?.forma === 'definicao' ? seguinte.texto : null) : (ehProsa(seguinte?.bruto) ? seguinte.bruto : null);
    blocos.push({ n: l.n, nivel: titulo[1].length, nome: semNegrito(titulo[2]), sigla: titulo[3], definicao: definicao === null ? null : semNegrito(definicao) });
  });
  return blocos;
}

// O índice de áreas de uma pasta: a abertura dela e, de cada área, a frase e os blocos.
// Cada área chega com o arquivo principal, que traz a frase, e os arquivos em que estão os blocos.
function indiceDeAreas(marcador, capa, areas, pular) {
  const texto = [marcador];
  if (capa) {
    const abertura = aberturaDe(capa.linhas);
    if (abertura.motivo) pular(capa.caminho, abertura.motivo);
    else texto.push(`# ${abertura.titulo}`, abertura.frase);
  }
  for (const area of areas) {
    const abertura = aberturaDe(area.principal.linhas);
    if (abertura.motivo) { pular(area.principal.caminho, abertura.motivo); continue; }
    texto.push('', `## [${abertura.titulo}](${area.principal.caminho})`, abertura.frase);
    for (const arquivo of area.arquivos) {
      for (const bloco of blocosDe(arquivo.linhas, area.classificadas)) {
        if (bloco.definicao === null) { pular(arquivo.caminho, `linha ${bloco.n}: falta a frase de definição de "${bloco.nome}", na linha seguinte ao título`); continue; }
        const nome = area.arquivos.length > 1 ? `[${bloco.nome}](${arquivo.caminho})` : bloco.nome;
        texto.push(`${'  '.repeat(bloco.nivel - 2)}- ${nome} \`${bloco.sigla}\`: ${bloco.definicao}`);
      }
    }
  }
  return texto;
}

// A chave que põe os códigos em ordem: o número de issue antes do código sorteado, e os números como números.
function chaveDeOrdem(codigo) {
  const m = codigo.slice(1).match(/^([a-z0-9]+)\.(\d+)$/);
  if (!m) return [0, Number(codigo.slice(1)), '', 0];
  return /^\d+$/.test(m[1]) ? [0, Number(m[1]), '', Number(m[2])] : [1, 0, m[1], Number(m[2])];
}
const ordemDeCodigo = (a, b) => {
  const [ka, kb] = [chaveDeOrdem(a), chaveDeOrdem(b)];
  for (let i = 0; i < ka.length; i++) if (ordem(ka[i], kb[i])) return ordem(ka[i], kb[i]);
  return 0;
};

// Quem cita cada decisão: os itens da especificação, da arquitetura e da interface, e as outras decisões.
// O item sem identificador é citado pelo que ele define, pelo bloco em que está ou, na falta dos dois, pelo arquivo.
function citacoes(e, { CODIGO, mascarar, numeroDe }) {
  const itens = new Map(), decisoes = new Map();
  const chave = (codigo) => numeroDe(codigo.slice(1)) ?? codigo.slice(1);
  const anotar = (mapa, bruto, quem) => {
    for (const m of mascarar(bruto).matchAll(/⟸ \[([^\]]*)\]/g)) {
      for (const codigo of m[1].split(/,\s*/)) {
        if (!codigo.startsWith('D')) continue;
        if (!mapa.has(chave(codigo))) mapa.set(chave(codigo), new Set());
        mapa.get(chave(codigo)).add(quem);
      }
    }
  };
  const SEM_TEXTO = ['branco', 'gerado', 'marcador-gerado'];
  const COM_NOME = ['evento', 'termo-linguagem', 'tipo-valor', 'ator', 'externo'];
  for (const a of e.arquivos) {
    let bloco = null, item = null;
    for (const l of a.linhas) {
      if (SEM_TEXTO.includes(l.forma)) continue;
      if (a.tipo === 'decisao') { anotar(decisoes, l.bruto, a.codigo); continue; }
      if (l.forma === 'titulo-celula') bloco = l.nome;
      if (l.forma === 'titulo-secao') bloco = null;
      if (!l.bruto.startsWith(' ')) item = l;
      const quem = item?.id ?? (item?.forma === 'atributo' && bloco ? `${bloco}.${item.nome}` : COM_NOME.includes(item?.forma) ? item.nome : bloco) ?? a.caminho;
      anotar(itens, l.bruto, quem);
    }
  }
  const identificador = new RegExp(`^- (?:\\[[^\\]]*\\] )?(${CODIGO})`);
  for (const a of e.livres) {
    let bloco = null, item = null;
    for (const l of a.linhas) {
      if (l.bruto.startsWith('#')) bloco = l.bruto.match(TITULO_DE_BLOCO)?.[2] ?? null;
      if (l.bruto.startsWith('#') || l.bruto.startsWith('- ')) item = l.bruto.match(identificador)?.[1] ?? null;
      anotar(itens, l.bruto, item ?? (bloco ? semNegrito(bloco) : a.caminho));
    }
  }
  return (codigo) => [...(itens.get(chave(codigo)) ?? []), ...[...(decisoes.get(chave(codigo)) ?? [])].sort(ordemDeCodigo)];
}

// O índice de uma pasta de decisões, em ordem da data de criação e, na mesma data, do código.
function indiceDeDecisoes(marcador, titulo, arquivos, citadaPor, pular) {
  const entradas = [];
  for (const a of arquivos) {
    const [cabecalho, resolucao] = a.linhas;
    const datas = a.linhas.filter((l) => l.forma === 'alteracao');
    const criada = datas.find((l) => /: decisão criada$/.test(l.bruto)) ?? [...datas].sort((x, y) => ordem(x.data, y.data))[0];
    if (cabecalho?.forma !== 'titulo-decisao') pular(a.caminho, 'o título não traz a questão, terminada em "?", e o código');
    else if (resolucao?.forma !== 'resolucao') pular(a.caminho, 'falta a resolução, na linha seguinte ao título');
    else if (!criada) pular(a.caminho, 'falta a data de criação, na seção Histórico');
    else entradas.push({ codigo: a.codigo, arquivo: nomeDe(a.caminho), questao: cabecalho.questao, resolucao: resolucao.bruto, data: criada.data });
  }
  entradas.sort((x, y) => ordem(x.data, y.data) || ordemDeCodigo(x.codigo, y.codigo));
  const texto = [marcador, `# ${titulo}`, ''];
  for (const d of entradas) {
    const quem = citadaPor(d.codigo);
    texto.push(`- [${d.codigo}](${d.arquivo}) ${d.questao} ${d.resolucao}`, quem.length ? `  - citada por: ${quem.join(', ')}` : '  - órfã');
  }
  return texto;
}

// Devolve o texto de cada índice, pelo caminho dele dentro da pasta, e o que ficou sem indexar.
// O índice da pasta que não tem o que indexar vem como null.
export function indexar(pasta) {
  if (!leitura) throw new Error('falta a leitura da skill de validação');
  const { CAMADAS, INDICE, MARCADOR_GERADO, lerEspecificacao } = leitura;
  const e = lerEspecificacao(pasta);
  const indices = new Map(), semIndexar = [];
  const citadaPor = citacoes(e, leitura);
  const nomesDeArea = new Map();

  // Os caminhos de dentro do índice partem da pasta dele; os que saem para o terminal, da pasta da especificação.
  const montar = (raiz, texto, faltas) => {
    const relativo = (caminho) => (raiz ? caminho.slice(raiz.length + 1) : caminho);
    const proprio = raiz ? `${raiz}/${INDICE}` : INDICE;
    if (texto.length <= 1 && !faltas.length) return indices.set(proprio, null);
    if (faltas.length) texto.push('', ...faltas.map((f) => `- não indexado: ${relativo(f.arquivo)}: ${f.motivo}`));
    semIndexar.push(...faltas);
    indices.set(proprio, `${texto.join('\n').replace(/\n{3,}/g, '\n\n')}\n`);
  };
  const noIndice = (raiz, arquivo) => ({ ...arquivo, caminho: raiz ? arquivo.caminho.slice(raiz.length + 1) : arquivo.caminho });

  // As áreas da especificação saem das linhas que a leitura classificou.
  {
    const faltas = [];
    const pular = (arquivo, motivo) => faltas.push({ arquivo, motivo });
    const chaves = [...new Set(e.arquivos.filter((a) => a.tipo === 'area').map((a) => a.area))].sort(ordem);
    const areas = chaves.map((chave) => {
      const arquivos = e.arquivos.filter((a) => a.tipo === 'area' && a.area === chave);
      const principal = arquivos.find((a) => a.principal);
      nomesDeArea.set(`decisoes/${chave}`, aberturaDe(principal.linhas).titulo);
      return { principal, arquivos, classificadas: true };
    });
    const capa = e.arquivos.find((a) => a.tipo === 'produto');
    montar('', indiceDeAreas(MARCADOR_GERADO, capa, areas, pular), faltas);
  }

  // As da arquitetura e as da interface, do texto das linhas: a leitura não classifica essas pastas.
  const camadas = CAMADAS.filter((camada) => ehPasta(join(pasta, camada)) && !e.arquivos.some((a) => a.caminho === `${camada}/_area.md`));
  for (const camada of camadas) {
    const faltas = [];
    const pular = (arquivo, motivo) => faltas.push({ arquivo: `${camada}/${arquivo}`, motivo });
    const daPasta = e.livres.filter((a) => a.camada === camada && a.caminho.lastIndexOf('/') === camada.length).map((a) => noIndice(camada, a));
    const areas = daPasta.filter((a) => !a.caminho.startsWith('_')).sort((x, y) => ordem(x.caminho, y.caminho)).map((a) => {
      nomesDeArea.set(`${camada}/decisoes/${a.caminho.slice(0, -3)}`, aberturaDe(a.linhas).titulo);
      return { principal: a, arquivos: [a], classificadas: false };
    });
    montar(camada, indiceDeAreas(MARCADOR_GERADO, daPasta.find((a) => a.caminho === CAPAS[camada]), areas, pular), faltas);
  }

  // As decisões, uma pasta por vez; o arquivo que não é decisão fica sem indexar.
  for (const raiz of ['decisoes', ...camadas.map((camada) => `${camada}/decisoes`)]) {
    if (!ehPasta(join(pasta, raiz))) continue;
    for (const sub of readdirSync(join(pasta, raiz)).sort()) {
      const caminho = `${raiz}/${sub}`;
      if (!ehPasta(join(pasta, caminho))) continue;
      const faltas = [];
      const pular = (arquivo, motivo) => faltas.push({ arquivo, motivo });
      for (const solto of e.soltos.filter((s) => s.startsWith(`${caminho}/`))) pular(solto, 'o nome não é o de uma decisão: o código, "-", um nome curto e ".md"');
      const arquivos = e.arquivos.filter((a) => a.tipo === 'decisao' && a.caminho.startsWith(`${caminho}/`));
      const de = PASTAS_GERAIS[sub] ?? `de ${nomesDeArea.get(caminho) ?? sub}`;
      const texto = arquivos.length ? indiceDeDecisoes(MARCADOR_GERADO, `Decisões ${de}`, arquivos, citadaPor, pular) : [MARCADOR_GERADO];
      montar(caminho, texto, faltas);
    }
  }
  return { indices, semIndexar };
}

// Grava só o índice cujo conteúdo mudou, e apaga o que ficou sem o que indexar.
// O README.md que não começa com a linha de gerado foi escrito por alguém: não é tocado.
export function gravar(pasta, indices) {
  const { MARCADOR_GERADO } = leitura;
  const feito = { gravados: [], apagados: [], recusados: [] };
  for (const caminho of [...indices.keys()].sort(ordem)) {
    const destino = join(pasta, caminho);
    const atual = existsSync(destino) ? readFileSync(destino, 'utf8').replace(/^﻿/, '').replace(/\r\n/g, '\n') : null;
    const gerado = atual?.split('\n')[0] === MARCADOR_GERADO;
    const texto = indices.get(caminho);
    if (texto === null) {
      if (gerado) { rmSync(destino); feito.apagados.push(caminho); }
    } else if (atual !== null && !gerado) feito.recusados.push(caminho);
    else if (atual !== texto) { writeFileSync(destino, texto); feito.gravados.push(caminho); }
  }
  return feito;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const pasta = (process.argv[2] ?? 'specs').replace(/\\/g, '/').replace(/\/+$/, '');
  if (!leitura) {
    console.error('falta a skill tabularium-validar, que traz a leitura da especificação; instale-a ao lado desta e rode de novo');
    process.exit(2);
  }
  if (!ehPasta(pasta)) {
    console.error(`${pasta}: pasta não encontrada`);
    process.exit(2);
  }
  const { indices, semIndexar } = indexar(pasta);
  const { gravados, apagados, recusados } = gravar(pasta, indices);
  for (const caminho of recusados) semIndexar.push({ arquivo: caminho, motivo: 'não começa com a linha "<!-- gerado; não editar -->" e não foi sobrescrito' });
  for (const caminho of gravados) console.log(`gravado  ${pasta}/${caminho}`);
  for (const caminho of apagados) console.log(`apagado  ${pasta}/${caminho}`);
  for (const { arquivo, motivo } of semIndexar) console.log(`sem indexar  ${pasta}/${arquivo}  ${motivo}`);
  console.log(gravados.length + apagados.length + semIndexar.length === 0 ? 'nenhum índice mudou' : `gravados: ${gravados.length}; apagados: ${apagados.length}; sem indexar: ${semIndexar.length}`);
  process.exit(semIndexar.length ? 1 : 0);
}
