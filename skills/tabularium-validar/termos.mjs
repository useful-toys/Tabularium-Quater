// Checagens sobre os termos: definição única e em negrito, negrito que resolve e só marca termo,
// e sinônimos proibidos. O texto sem negrito não é conferido.

import { mascarar } from './leitura.mjs';

// Plural reconhecido pelas terminações regulares, palavra por palavra.
const TERMINACOES = [[/ões$/, 'ão'], [/ães$/, 'ão'], [/ais$/, 'al'], [/éis$/, 'el'], [/eis$/, 'el'], [/eis$/, 'il'], [/óis$/, 'ol'], [/ns$/, 'm'], [/es$/, ''], [/s$/, '']];
const singulares = (palavra) => [palavra, ...TERMINACOES.filter(([fim]) => fim.test(palavra)).map(([fim, por]) => palavra.replace(fim, por))];
export const leituras = (nome) => nome.toLowerCase().split(' ').map(singulares)
  .reduce((feitas, opcoes) => feitas.flatMap((f) => opcoes.map((o) => (f ? `${f} ${o}` : o))), ['']);

const SEM_TEXTO = ['branco', 'gerado', 'ignorada', 'marcador-gerado', 'desconhecida'];
const SEM_NEGRITO = ['titulo-arquivo', 'titulo-secao', 'tabela-cabecalho', 'tabela-separador'];
// As grafias de negrito que não são a do formato: "__texto__", "<b>" e "<strong>", até a marca que fecha.
// No meio de uma palavra, como em "data__entrega", os sublinhados não são negrito.
const OUTRO_NEGRITO = /(?<![\p{L}\p{N}_])__[^\s_](?:.*?[^\s_])?__(?![\p{L}\p{N}_])|<(b|strong)(?:\s[^>]*)?>.*?(?:<\/\1>|$)/giu;
const temNegrito = (texto) => /\*\*[^*]+\*\*/.test(texto);
const temOutroNegrito = (texto) => texto.search(OUTRO_NEGRITO) >= 0;

export function checarTermos(e, acusar) {
  const arquivos = e.arquivos.filter((a) => ['area', 'produto', 'perguntas'].includes(a.tipo));
  const { termos, atributos, daCelula, proibidos, lugares } = definicoes(arquivos, acusar);

  // O que há de errado num negrito que não é o da definição, dentro do bloco de uma célula ou fora de todos.
  const defeito = (nome, celula) => {
    if (nome.includes('.')) {
      const [dona, atributo] = nome.toLowerCase().split('.');
      return daCelula.get(dona)?.has(atributo) ? null : ['REF-R1', `**${nome}** cita um atributo que não existe nessa célula`];
    }
    const lidas = leituras(nome);
    if (lidas.some((l) => termos.has(l))) return null;
    const atributo = lidas.find((l) => atributos.has(l));
    if (atributo) {
      const donas = atributos.get(atributo);
      if (donas.size === 1 || (celula && donas.has(celula))) return null;
      return ['TRM-R4', `o atributo "${atributo}" existe em mais de uma célula; fora do bloco dele, cite-o com a célula, como **Célula.${atributo}**`];
    }
    // A palavra declarada é lida como o negrito: maiúsculas e plural não a alteram.
    const proibido = proibidos.find((p) => leituras(p.palavra).some((l) => lidas.includes(l)));
    if (proibido) return ['TRM-R24', `"${nome}" é sinônimo proibido de "${proibido.termo}"; escreva **${proibido.termo}**`];
    return ['TRM-R14', `**${nome}** não é um termo definido na especificação; o negrito só marca termo`];
  };

  // Só o negrito é conferido: o texto sem negrito não é checado quanto a termos.
  for (const a of arquivos) {
    let celula = null;
    for (const l of a.linhas) {
      if (l.forma === 'titulo-celula') celula = l.nome.toLowerCase();
      if (l.forma === 'titulo-secao' && a.tipo === 'area') celula = null;
      if (SEM_TEXTO.includes(l.forma)) continue;
      const bruto = mascarar(l.bruto);
      if (temOutroNegrito(bruto)) acusar(a.caminho, l.n, 'TRM-R20', 'negrito se escreve só com dois asteriscos, como **Termo**, e só marca termo; "__texto__", "<b>" e "<strong>" não valem, nem em volta de um termo');
      if (SEM_NEGRITO.includes(l.forma)) {
        if (temNegrito(bruto)) acusar(a.caminho, l.n, 'TRM-R25', 'só o título de célula leva negrito, no nome que ele define; os outros títulos e o cabeçalho de tabela não levam, nem em volta de um termo');
        continue;
      }
      // No título de célula só cabe o negrito do nome, que a definição já confere.
      if (l.forma === 'titulo-celula') continue;
      const referencias = l.nomeEmNegrito ? bruto.replace(`**${l.nome}**`, '') : bruto;
      for (const m of referencias.matchAll(/\*\*([^*]+)\*\*/g)) {
        const erro = defeito(m[1], celula);
        if (erro) acusar(a.caminho, l.n, ...erro);
      }
    }
  }

  // Na decisão o termo vai sem negrito, e outro negrito não existe: todo negrito ali é violação,
  // também nas decisões de arquitetura e de interface.
  for (const a of e.arquivos.filter((x) => x.tipo === 'decisao')) {
    for (const l of a.linhas) {
      if (SEM_TEXTO.includes(l.forma)) continue;
      const bruto = mascarar(l.bruto);
      if (temNegrito(bruto) || temOutroNegrito(bruto)) acusar(a.caminho, l.n, 'DEC-R11', 'a decisão não leva negrito; os termos da especificação entram nela sem negrito');
    }
  }

  // O lugar da declaração é forma, não vocabulário: vale em todo arquivo e em toda forma de linha,
  // inclusive as decisões de arquitetura e de interface. Fora da linha que define o termo só o lugar
  // é acusado; nela, só a declaração lida no fim está na posição certa.
  for (const a of e.arquivos) {
    for (const l of a.linhas ?? []) {
      if (SEM_TEXTO.includes(l.forma)) continue;
      const declaracoes = [...mascarar(l.bruto).matchAll(/\(~~[^~]+~~\)/g)].length;
      if (declaracoes === 0) continue;
      if (!lugares.has(l)) {
        acusar(a.caminho, l.n, 'TRM-R18', a.tipo === 'decisao'
          ? 'só a especificação declara sinônimos de não usar; declare-os no fim da linha que define o termo'
          : 'esta linha não define termo, e os sinônimos de não usar só cabem na linha que define o termo; declare-os no fim da definição');
      } else if (declaracoes > (l.declaracaoNoFim ? 1 : 0)) {
        acusar(a.caminho, l.n, 'TRM-R13', 'os sinônimos de não usar fecham o texto da linha, antes das marcas de fim de item; mova a declaração para o fim');
      }
    }
  }
}
// Recolhe os termos, os atributos de cada célula, os sinônimos proibidos e as linhas em que a declaração
// deles cabe, e acusa a definição repetida, a que vem sem negrito e o sinônimo proibido que é nome de termo.
function definicoes(arquivos, acusar) {
  const termos = new Map(), atributos = new Map(), daCelula = new Map(), declarados = [], lugares = new Set();
  for (const a of arquivos) {
    let celula = null;
    const proibir = (l, termo) => {
      lugares.add(l);
      for (const palavra of l.sinonimos ?? []) declarados.push({ palavra, termo, arquivo: a.caminho, linha: l.n });
    };
    const emNegrito = (l) => {
      if (!l.nomeEmNegrito) acusar(a.caminho, l.n, 'TRM-R23', `na definição, o nome do termo vai em negrito: escreva **${l.nome}**`);
    };
    const definir = (l, tipo) => {
      emNegrito(l);
      const chave = l.nome.toLowerCase();
      const anterior = termos.get(chave);
      if (anterior) acusar(a.caminho, l.n, 'TRM-R22', `o termo "${l.nome}" já está definido em ${anterior.arquivo}, linha ${anterior.linha}; cada termo tem um só lugar de definição`);
      else termos.set(chave, { nome: l.nome, tipo, arquivo: a.caminho, linha: l.n });
      if (tipo !== 'célula') proibir(l, l.nome);
    };
    for (const l of a.linhas) {
      if (l.forma === 'titulo-secao' && a.tipo === 'area') celula = null;
      if (l.forma === 'titulo-celula') {
        definir(l, 'célula');
        celula = l.nome.toLowerCase();
        if (!daCelula.has(celula)) daCelula.set(celula, new Set());
      }
      if (l.forma === 'definicao' && celula) proibir(l, termos.get(celula)?.nome ?? celula);
      if (l.forma === 'evento') definir(l, 'evento');
      if (l.forma === 'termo-linguagem') definir(l, 'linguagem');
      if (l.forma === 'tipo-valor') definir(l, 'tipo de valor');
      if (l.forma === 'ator') definir(l, 'ator');
      if (l.forma === 'externo') definir(l, 'externo');
      if (l.forma !== 'atributo' || !celula) continue;
      emNegrito(l);
      const nome = l.nome.toLowerCase();
      if (daCelula.get(celula).has(nome)) acusar(a.caminho, l.n, 'TRM-R22', `o atributo "${l.nome}" já está definido neste bloco`);
      daCelula.get(celula).add(nome);
      if (!atributos.has(nome)) atributos.set(nome, new Map());
      if (!atributos.get(nome).has(celula)) atributos.get(nome).set(celula, { arquivo: a.caminho, linha: l.n });
      proibir(l, l.nome);
    }
  }
  // A palavra declarada é lida como o negrito: maiúsculas e plural não alteram o termo.
  // A que é nome de termo não vira proibida: o defeito está na declaração, não nos usos.
  const proibidos = declarados.filter((p) => {
    const lidas = leituras(p.palavra);
    const termo = termos.get(lidas.find((l) => termos.has(l)));
    const atributo = lidas.find((l) => atributos.has(l));
    if (!termo && !atributo) return true;
    let onde = termo;
    let oQue = 'termo definido';
    if (!termo) {
      const [dona, lugar] = [...atributos.get(atributo)][0];
      onde = lugar;
      oQue = `atributo de ${termos.get(dona)?.nome ?? dona},`;
    }
    acusar(p.arquivo, p.linha, 'TRM-R19', `"${p.palavra}" está em não usar, mas é ${oQue} em ${onde.arquivo}, linha ${onde.linha}; tire-o da declaração ou renomeie o termo`);
    return false;
  });
  return { termos, atributos, daCelula, proibidos, lugares };
}
