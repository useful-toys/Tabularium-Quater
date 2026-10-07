// Checagens de forma sobre a especificação já lida.
// Cada violação cita a regra do formato que a linha contraria e traz uma frase
// que se entende sem ter a especificação do formato à mão.

import { COLUNAS_AREAS, ROTULOS_DECISAO, SECOES_AREA, SECOES_PRODUTO, mascarar } from './leitura.mjs';
import { checarTermos } from './termos.mjs';

const QUALIFICADORES = ['identidade', 'único', 'imutável', 'opcional', 'pessoal'];
const CARD = /^(?:1|0\.\.1|0\.\.N|1\.\.N)$/;
const PAPEIS = 'RQCVT';
const lista = (itens) => itens.join(', ');

export function checar(e) {
  const violacoes = [];
  const produto = e.arquivos.find((a) => a.tipo === 'produto');
  const areas = e.arquivos.filter((a) => a.tipo === 'area');
  const dicionario = {
    celulas: new Set(areas.flatMap((a) => a.linhas.filter((l) => l.forma === 'titulo-celula').map((l) => l.nome.toLowerCase()))),
    atores: new Set((produto?.linhas ?? []).filter((l) => l.forma === 'ator').map((l) => l.nome.toLowerCase())),
  };

  const acusarEm = (caminho, linha, regra, frase) => violacoes.push({ arquivo: caminho, linha, regra, frase });
  checarPasta(e, acusarEm);
  checarCodigos(e, acusarEm);
  checarTermos(e, acusarEm);
  for (const arquivo of e.arquivos) {
    const acusar = (linha, regra, frase) => violacoes.push({ arquivo: arquivo.caminho, linha, regra, frase });
    for (const l of arquivo.linhas) {
      if (l.forma === 'desconhecida') acusar(l.n, l.regra, `linha não reconhecida; aqui cabe ${l.esperado}`);
      if (l.caudaInvalida) acusar(l.n, 'REF-R14', 'marcas de fim de item fora da forma ou da ordem; primeiro vem "⟸ [D07]" e depois "⟵ [P04]", sempre no fim');
      if (l.forma === 'afirmacao' || l.forma === 'lapide') checarAfirmacao(l, dicionario, acusar);
    }
    if (arquivo.tipo === 'produto') checarProduto(arquivo, acusar);
    if (arquivo.tipo === 'area') checarArea(arquivo, dicionario, acusar);
    if (arquivo.tipo === 'contadores') checarContadores(arquivo, acusar);
    if (arquivo.tipo === 'decisao') checarDecisao(arquivo, acusar);
  }
  return violacoes.sort((a, b) => (a.arquivo < b.arquivo ? -1 : a.arquivo > b.arquivo ? 1 : (a.linha ?? 0) - (b.linha ?? 0)));
}

function checarPasta(e, acusar) {
  for (const { caminho, regra } of e.faltam) {
    acusar(caminho, null, regra, regra === 'ARE-R1' ? 'falta este arquivo, que toda área em pasta tem' : 'falta este arquivo, que toda especificação tem');
  }
  for (const caminho of e.soltos) {
    if (caminho.startsWith('decisoes/')) acusar(caminho, null, 'VRF-R8', 'arquivo que não é decisão; o nome de uma decisão é o código, "-", um nome curto e ".md", como "D07-quem-ve-pedido.md"');
    else acusar(caminho, null, 'ARE-R1', 'arquivo que não é fixo nem consta da tabela de áreas de _produto.md');
  }
  for (const pasta of e.pastasForaDaTabela) acusar(`${pasta}/_area.md`, null, 'ARE-R1', 'pasta de área que não consta da tabela de áreas de _produto.md');
  for (const area of e.areasSemArquivo) acusar('_produto.md', area.n, 'ARE-R1', `a área "${area.nome}" aponta para "${area.arquivo}", que não existe na pasta da especificação`);
}

function checarAfirmacao(l, dicionario, acusar) {
  if (l.marca === null) acusar(l.n, 'LIN-R4', 'falta a marca antes do identificador; use "[x]" se o produto cumpre a afirmação por inteiro, ou "[ ]" se não');
  else if (l.marca !== 'x' && l.marca !== ' ') acusar(l.n, 'LIN-R4', `marca "[${l.marca}]" inválida; use "[x]" se o produto cumpre a afirmação por inteiro, ou "[ ]" se não`);
  if (!l.espacos) acusar(l.n, 'LIN-R11', 'faltam os dois espaços entre o identificador e o texto');
  if (l.ator === null) return;
  if (l.ator !== l.ator.toLowerCase()) acusar(l.n, 'ATO-R2', `a marca de ator vai em minúsculas: "· ${l.ator.toLowerCase()}"`);
  else if (!dicionario.atores.has(l.ator)) acusar(l.n, 'ATO-R2', `"${l.ator}" não é um ator declarado na seção Atores de _produto.md`);
  if (l.ator === 'tempo' && l.papel === 'R' && l.forma === 'afirmacao' && !/\d+(?:[.,]\d+)?\s*\p{L}+/u.test(mascarar(l.texto))) {
    acusar(l.n, 'ATO-R5', 'regra marcada "· tempo" traz o prazo com número e unidade, como "em 30 dias"');
  }
}

function checarProduto(arquivo, acusar) {
  const { linhas } = arquivo;
  let ultima = -1;
  for (const l of linhas.filter((x) => x.forma === 'titulo-secao')) {
    const posicao = SECOES_PRODUTO.indexOf(l.nome);
    if (posicao < 0) acusar(l.n, 'APR-R9', `a seção "${l.nome}" não existe em _produto.md; as seções são ${lista(SECOES_PRODUTO)}`);
    else if (posicao <= ultima) acusar(l.n, 'APR-R9', `a seção "${l.nome}" está repetida ou fora da ordem; a ordem é ${lista(SECOES_PRODUTO)}`);
    else ultima = posicao;
  }
  const primeiro = linhas.find((l) => l.forma === 'proposito');
  if (primeiro && primeiro.rotulo !== 'Problema') acusar(primeiro.n, 'APR-R10', 'o primeiro item do Propósito é o problema que o produto resolve, como "- Problema: texto"');
  const cabecalho = linhas.find((l) => l.forma === 'tabela-cabecalho');
  if (cabecalho && cabecalho.celulas.join('|') !== COLUNAS_AREAS.join('|')) acusar(cabecalho.n, 'APR-R10', `as colunas da tabela de áreas são ${lista(COLUNAS_AREAS)}, nesta ordem`);
  const separador = linhas.find((l) => l.forma === 'tabela-separador');
  if (separador && !ehSeparador(separador, COLUNAS_AREAS.length)) acusar(separador.n, 'APR-R10', 'a segunda linha da tabela de áreas é o separador, como "| --- | --- | --- | --- | --- |"');
  const padroes = linhas.filter((l) => l.forma === 'ator' && l.padrao).length;
  if (padroes !== 1) {
    const atores = linhas.find((l) => l.forma === 'titulo-secao' && l.nome === 'Atores');
    acusar(atores?.n ?? null, 'ATO-R6', `há ${padroes} atores terminados em "; padrão"; a especificação tem exatamente um ator padrão`);
  }
}

const ehSeparador = (l, colunas) => l.celulas.length === colunas && l.celulas.every((c) => /^:?-+:?$/.test(c));

function checarArea(arquivo, dicionario, acusar) {
  const { linhas } = arquivo;
  let ultimaSecao = -1, haCelula = false, bloco = null;
  const comSubitemAcusado = new Set();
  linhas.forEach((l, i) => {
    const seguinte = linhas[i + 1];
    if (l.forma === 'titulo-secao') {
      bloco = null;
      const posicao = SECOES_AREA.indexOf(l.nome);
      if (haCelula || posicao <= ultimaSecao) acusar(l.n, 'ARE-R11', `a seção "${l.nome}" está repetida ou fora da ordem; ${lista(SECOES_AREA)} vêm nesta ordem, antes das células`);
      else ultimaSecao = posicao;
      if (l.nome === 'Índice' && seguinte?.forma !== 'marcador-gerado') acusar(l.n, 'IND-R2', 'o Índice é gerado por programa e começa com a linha "<!-- gerado; não editar -->"; não o escreva à mão');
    }
    if (l.forma === 'titulo-celula') {
      haCelula = true;
      bloco = { maior: 0, especializacoes: 0 };
      if (seguinte?.forma !== 'definicao') acusar(l.n, 'CEL-R2', 'a frase de definição da célula vem na linha seguinte ao título');
    }
    if (l.forma === 'subitem') checarSubitem(l, bloco, comSubitemAcusado, acusar);
    if (l.forma === 'afirmacao' && l.tabela) checarTabela(linhas, i, acusar);
    if (!bloco) return;
    if (l.forma === 'especializacao' && ++bloco.especializacoes > 1) acusar(l.n, 'CEL-R18', 'uma célula especializa no máximo uma outra; este bloco já tem uma linha "especializa"');
    if (l.forma === 'atributo') checarAtributo(l, dicionario, acusar);
    const ordem = ordemNoBloco(l);
    if (ordem === null) return;
    if (ordem === 'papel') return acusar(l.n, 'CEL-R3', `o papel "${l.papel}" não cabe num bloco de célula; os papéis são R, Q, C, V e T`);
    if (ordem < bloco.maior) acusar(l.n, 'CEL-R3', 'linha fora da ordem do bloco, que é: linhas de modelo, linhas "evento:", e então as afirmações R, Q, C, V e T');
    else bloco.maior = ordem;
  });
}

function ordemNoBloco(l) {
  if (['atributo', 'associacao', 'pertencimento', 'especializacao'].includes(l.forma)) return 0;
  if (l.forma === 'evento') return 1;
  if (l.forma !== 'afirmacao' && l.forma !== 'lapide') return null;
  if (PAPEIS.includes(l.papel)) return 2 + PAPEIS.indexOf(l.papel);
  // J é papel válido, mas só de jornada; outra letra já sai como identificador inválido.
  return l.papel === 'J' ? 'papel' : null;
}

const chaveDe = (sigla, papel, numero) => `${sigla}-${papel}${Number(numero)}`;
const SEM_TEXTO = ['branco', 'gerado', 'ignorada', 'marcador-gerado'];

// Identificadores, referências e numeração: o que só se confere olhando a especificação inteira.
// O código que aparece numa linha não reconhecida conta como talvez definido,
// para o erro daquela linha não se repetir em cada lugar que a cita.
function checarCodigos(e, acusar) {
  const ids = new Map();
  const talvez = new Set();
  for (const a of e.arquivos.filter((x) => x.tipo === 'area' || x.tipo === 'produto')) {
    let dona = a.tipo === 'produto' ? 'PRD' : null;
    for (const l of a.linhas) {
      if (l.forma === 'titulo-celula') dona = l.sigla;
      if (l.forma === 'desconhecida') for (const m of l.bruto.matchAll(/([A-Z]{2,5})-([A-Z])(\d+)/g)) talvez.add(chaveDe(m[1], m[2], m[3]));
      if (!['afirmacao', 'lapide', 'jornada'].includes(l.forma)) continue;
      const p = l.id.match(/^([A-Z]{2,5})-([RQCVTJ])(\d+)$/);
      if (!p || Number(p[3]) === 0) {
        acusar(a.caminho, l.n, 'IDT-R1', `"${l.id}" não é um identificador válido; a forma é a sigla da célula, "-", a letra do papel (R, Q, C, V, T ou J) e um número a partir de 1, como "PED-R1"`);
        continue;
      }
      const chave = chaveDe(p[1], p[2], p[3]);
      const anterior = ids.get(chave);
      if (anterior) acusar(a.caminho, l.n, 'IDT-R1', `o identificador ${l.id} já existe em ${anterior.arquivo}, linha ${anterior.linha}; cada identificador é único na especificação`);
      else ids.set(chave, { arquivo: a.caminho, linha: l.n, id: l.id, sequencia: `${p[1]}-${p[2]}`, papel: p[2], numero: Number(p[3]), noLugar: a.tipo === 'produto' || p[2] !== 'J' });
      if (p[1] === dona) continue;
      acusar(a.caminho, l.n, 'IDT-R3', a.tipo === 'produto'
        ? `em _produto.md a sigla dos identificadores é PRD, e não ${p[1]}`
        : `a sigla de ${l.id} é ${p[1]}, mas a linha está no bloco da célula de sigla ${dona}`);
    }
  }

  const decisoes = new Map();
  for (const a of e.arquivos.filter((x) => x.tipo === 'decisao')) {
    const numero = Number(a.codigo.slice(1));
    if (decisoes.has(numero)) acusar(a.caminho, null, 'DEC-R8', `o código ${a.codigo} já é o de ${decisoes.get(numero)}; o código de uma decisão é único no produto`);
    else decisoes.set(numero, a.caminho);
  }
  const perguntas = new Map();
  const talvezPergunta = new Set();
  const arquivoDePerguntas = e.arquivos.find((x) => x.tipo === 'perguntas');
  for (const l of arquivoDePerguntas?.linhas ?? []) {
    if (l.forma === 'pergunta') perguntas.set(Number(l.codigo.slice(1)), l);
    if (l.forma === 'subitem-pergunta' && l.prefixo === 'sobre') l.pai.temSobre = true;
    const m = l.forma === 'desconhecida' ? l.bruto.match(/^- P(\d+)/) : null;
    if (m) talvezPergunta.add(Number(m[1]));
  }

  const citadas = new Set();
  const reacoes = new Set();
  for (const a of e.arquivos) {
    for (const l of a.linhas) {
      if (SEM_TEXTO.includes(l.forma)) continue;
      const texto = mascarar(l.bruto);
      for (const m of texto.matchAll(/Ao \*\*([^*]+)\*\*:/g)) reacoes.add(m[1].toLowerCase());
      for (const m of texto.matchAll(/⟵ \[P(\d+)\]/g)) citadas.add(Number(m[1]));
      if (l.forma === 'desconhecida') continue;
      for (const m of texto.matchAll(/⟸ \[([^\]]*)\]/g)) {
        for (const codigo of m[1].split(/,\s*/)) {
          const d = codigo.match(/^D(\d+)$/);
          if (d && !decisoes.has(Number(d[1]))) acusar(a.caminho, l.n, 'REF-R1', `a decisão ${codigo} não tem arquivo em decisoes/`);
        }
      }
      if (a.tipo === 'decisao') continue;
      for (const m of texto.matchAll(/⟵ \[P(\d+)\]/g)) {
        const numero = Number(m[1]);
        if (!perguntas.has(numero) && !talvezPergunta.has(numero)) acusar(a.caminho, l.n, 'REF-R1', `a pergunta P${m[1]} não está em _perguntas.md`);
      }
      for (const m of texto.matchAll(/\[([A-Z]{2,5})-([A-Z])(\d+)\]/g)) {
        const chave = chaveDe(m[1], m[2], m[3]);
        if (!ids.has(chave) && !talvez.has(chave)) acusar(a.caminho, l.n, 'REF-R1', `${m[0]} cita um identificador que não existe na especificação`);
      }
      if (l.forma === 'jornada') {
        for (const passo of l.passos) {
          const p = passo.match(/^([A-Z]{2,5})-([A-Z])(\d+)$/);
          const alvo = ids.get(chaveDe(p[1], p[2], p[3]));
          if (alvo && alvo.papel !== 'C' && alvo.papel !== 'V') acusar(a.caminho, l.n, 'JOR-R3', `a jornada cita [${passo}], de papel ${alvo.papel}; jornada só cita capacidades (C) e visões (V)`);
        }
      }
    }
  }
  for (const a of e.arquivos.filter((x) => x.tipo === 'area')) {
    for (const l of a.linhas) {
      if (l.forma === 'evento' && !reacoes.has(l.nome.toLowerCase())) acusar(a.caminho, l.n, 'EVT-R2', `nenhuma regra reage ao evento "${l.nome}"; um evento só existe se alguma regra começa com "Ao **${l.nome}**:"`);
    }
  }
  for (const [numero, l] of perguntas) {
    if (!l.temSobre && !citadas.has(numero)) acusar(arquivoDePerguntas.caminho, l.n, 'PER-R5', `nenhuma linha termina com "⟵ [${l.codigo}]"; a pergunta que não tem linha provisória diz a célula num sub-item "sobre:"`);
  }

  const contadores = e.arquivos.find((x) => x.tipo === 'contadores');
  if (contadores) checarNumeracao(contadores, { ids, decisoes, perguntas, arquivoDePerguntas }, acusar);
}

function checarNumeracao(contadores, { ids, decisoes, perguntas, arquivoDePerguntas }, acusar) {
  const { caminho, linhas } = contadores;
  const titulos = linhas.filter((l) => l.forma === 'titulo-secao');
  const nomes = ['Identificadores', 'Perguntas', 'Decisões'];
  const errado = nomes.findIndex((nome, i) => titulos[i]?.nome !== nome);
  if (errado >= 0 || titulos.length !== nomes.length) {
    acusar(caminho, (titulos[errado] ?? titulos.at(-1))?.n ?? null, 'CTD-R2', `as seções de _contadores.md são ${lista(nomes)}, cada uma uma vez e nesta ordem`);
  }
  // A sequência de um contador mal escrito conta como talvez guardada.
  const talvez = new Set(linhas.filter((l) => l.forma === 'desconhecida').map((l) => l.bruto.match(/^- (\S+)/)?.[1]));
  const guardado = new Map();
  let anterior = '';
  for (const l of linhas.filter((x) => x.forma === 'contador')) {
    if (guardado.has(l.sequencia)) acusar(caminho, l.n, 'CTD-R1', `a sequência ${l.sequencia} já tem contador; cada sequência tem um item só`);
    else guardado.set(l.sequencia, l.numero);
    if (l.secao !== 'Identificadores') continue;
    if (l.sequencia < anterior) acusar(caminho, l.n, 'CTD-R1', `${l.sequencia} está fora da ordem alfabética: vem depois de ${anterior}`);
    else anterior = l.sequencia;
  }
  const secao = (nome) => titulos.find((l) => l.nome === nome);

  const semContador = new Set();
  for (const id of ids.values()) {
    if (!id.noLugar || talvez.has(id.sequencia)) continue;
    if (!guardado.has(id.sequencia)) semContador.add(id.sequencia);
    else if (id.numero > guardado.get(id.sequencia)) acusar(id.arquivo, id.linha, 'CTD-R4', `${id.id} passa do maior número guardado em _contadores.md para ${id.sequencia}, que é ${guardado.get(id.sequencia)}; quem aloca um número atualiza o contador`);
  }
  for (const sequencia of [...semContador].sort()) acusar(caminho, secao('Identificadores')?.n ?? null, 'CTD-R1', `falta o contador de ${sequencia}, que já tem identificador na especificação`);

  for (const [letra, nome, emUso] of [['P', 'Perguntas', perguntas], ['D', 'Decisões', decisoes]]) {
    if (talvez.has(letra) || !secao(nome)) continue;
    if (!guardado.has(letra)) { acusar(caminho, secao(nome).n, 'CTD-R2', `a seção ${nome} tem um item, como "- ${letra}  0", com o maior código já usado`); continue; }
    for (const [numero, onde] of emUso) {
      if (numero <= guardado.get(letra)) continue;
      const [arquivo, linha] = letra === 'P' ? [arquivoDePerguntas.caminho, onde.n] : [onde, null];
      acusar(arquivo, linha, 'CTD-R4', `${letra}${numero} passa do maior código guardado em _contadores.md, que é ${guardado.get(letra)}; quem aloca um código atualiza o contador`);
    }
  }
}

function checarSubitem(l, bloco, acusado, acusar) {
  if (/^\[[^\]]*\] /.test(l.texto) || /^[A-Z]{2,5}-[A-Z]\d+/.test(l.texto)) acusar(l.n, 'CRT-R1', 'sub-item não leva marca nem identificador; se precisa ser citado sozinho, vira uma regra');
  const cabe = l.pai.forma === 'afirmacao' && (l.pai.papel === 'C' || l.pai.papel === 'V');
  if (cabe || acusado.has(l.pai)) return;
  acusado.add(l.pai);
  if (bloco) acusar(l.n, 'CRT-R6', 'num bloco de célula, só capacidade (C) e visão (V) têm sub-itens');
  else acusar(l.n, 'VRF-R8', 'linha não reconhecida; os itens desta seção não têm sub-itens');
}

function checarAtributo(l, dicionario, acusar) {
  const celula = l.tipo.match(/^\*\*([^*]+)\*\*$/)?.[1];
  if (celula && dicionario.celulas.has(celula.toLowerCase())) acusar(l.n, 'ATR-R6', `atributo cujo tipo é uma célula é uma associação e leva a cardinalidade antes dela, como "${l.nome}: 1 **${celula}**"`);
  for (const q of l.qualificadores) {
    const valor = q.match(/^(inicial|derivado|inverso): (\S.*)$/);
    if (QUALIFICADORES.includes(q) || (valor && (valor[1] !== 'inverso' || CARD.test(valor[2])))) continue;
    acusar(l.n, 'ATR-R7', `"${q}" não é qualificador; depois de ";" só cabem identidade, único, imutável, opcional, pessoal, "inicial: valor", "derivado: fórmula" e "inverso: cardinalidade"`);
  }
}

// A tabela vem depois da regra terminada em ':' e de uma linha em branco.
function checarTabela(linhas, i, acusar) {
  const regra = linhas[i];
  let j = i + 1;
  while (linhas[j]?.forma === 'branco') j++;
  const cabecalho = linhas[j];
  if (cabecalho?.forma !== 'tabela-cabecalho') return acusar(regra.n, 'LIN-R11', 'regra terminada em ":" anuncia uma tabela, que vem logo depois dela');
  if (j === i + 1) acusar(cabecalho.n, 'LIN-R11', 'falta a linha em branco entre a regra e a tabela');
  const separador = linhas[j + 1];
  if (separador?.forma !== 'tabela-separador' || !ehSeparador(separador, cabecalho.celulas.length)) {
    return acusar((separador ?? cabecalho).n, 'LIN-R11', 'a segunda linha da tabela é o separador, com um "---" por coluna, como "| --- | --- |"');
  }
  for (let k = j + 2; linhas[k]?.forma === 'tabela-fileira'; k++) {
    if (linhas[k].celulas.length !== cabecalho.celulas.length) acusar(linhas[k].n, 'LIN-R11', `fileira com ${linhas[k].celulas.length} colunas; o cabeçalho da tabela tem ${cabecalho.celulas.length}`);
  }
}

function checarContadores(arquivo, acusar) {
  const forma = { Identificadores: /^[A-Z]{2,5}-[A-Z]$/, Perguntas: /^P$/, Decisões: /^D$/ };
  for (const l of arquivo.linhas.filter((x) => x.forma === 'contador')) {
    if (!forma[l.secao].test(l.sequencia)) acusar(l.n, 'CTD-R8', `"${l.sequencia}" não é uma sequência da seção ${l.secao}; em Identificadores vai sigla e papel, como "PED-R", em Perguntas vai "P" e em Decisões vai "D"`);
    else if (l.numero > 0 && !l.nomeCurto) acusar(l.n, 'CTD-R8', 'falta o nome curto da última alocação, depois do número e de dois espaços');
    else if (l.numero === 0 && l.nomeCurto) acusar(l.n, 'CTD-R8', 'contador em 0 ainda não teve alocação e não leva nome curto');
  }
}

function checarDecisao(arquivo, acusar) {
  const { linhas } = arquivo;
  const titulo = linhas[0];
  if (titulo?.forma === 'titulo-decisao' && titulo.codigo !== arquivo.codigo) acusar(1, 'DEC-R1', `o código do título, ${titulo.codigo}, difere do código do nome do arquivo, ${arquivo.codigo}`);
  if (linhas[1]?.forma !== 'resolucao') acusar(2, 'DEC-R1', 'a resolução vem na linha seguinte ao título, numa frase');

  const rotulos = linhas.filter((l) => l.forma === 'rotulo');
  const foraDeOrdem = rotulos.find((l, i) => l.nome !== ROTULOS_DECISAO[i]);
  if (foraDeOrdem || rotulos.length !== ROTULOS_DECISAO.length) {
    acusar((foraDeOrdem ?? rotulos.at(-1) ?? linhas[1] ?? titulo).n, 'DEC-R2', `depois da resolução vem uma lista com ${lista(ROTULOS_DECISAO)}, cada um uma vez e nesta ordem`);
  }
  if (!linhas.some((l) => l.forma === 'titulo-historico')) acusar(linhas.at(-1).n, 'DEC-R2', 'falta a seção "## Histórico", que fecha a decisão');

  for (const r of rotulos) {
    const filhos = [];
    for (let i = linhas.indexOf(r) + 1; linhas[i]?.forma === 'subitem-decisao'; i++) filhos.push(linhas[i]);
    if (r.nome === 'Contexto') {
      if (!r.texto) acusar(r.n, 'DEC-R19', 'o contexto vem na própria linha, como "- Contexto: texto"');
      if (filhos.length) acusar(filhos[0].n, 'DEC-R19', 'o contexto não tem sub-itens; ele vem na própria linha, como "- Contexto: texto"');
      continue;
    }
    if (r.texto) acusar(r.n, 'DEC-R19', `"- ${r.nome}" vai sozinho na linha, e cada item vem num sub-item`);
    if (r.nome === 'Alternativas descartadas') {
      if (!filhos.length) acusar(r.n, 'DEC-R19', 'uma decisão tem ao menos uma alternativa descartada, num sub-item como "- alternativa: motivo"');
      for (const f of filhos) if (!/^[^:]+: \S/.test(mascarar(f.texto))) acusar(f.n, 'DEC-R19', 'a alternativa descartada leva ":" e o motivo, como "- alternativa: motivo"');
    } else {
      for (const f of filhos) if (!/^(Ganha|Aceita): \S/.test(f.texto)) acusar(f.n, 'DEC-R19', 'cada consequência começa com "Ganha:" ou "Aceita:"');
    }
  }
}
