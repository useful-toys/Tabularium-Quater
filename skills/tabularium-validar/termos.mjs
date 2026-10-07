// Checagens sobre os termos: definição única, negrito que resolve,
// menção exata sem negrito e sinônimos proibidos.

import { mascarar } from './leitura.mjs';

// Plural reconhecido pelas terminações regulares, palavra por palavra.
const TERMINACOES = [[/ões$/, 'ão'], [/ães$/, 'ão'], [/ais$/, 'al'], [/éis$/, 'el'], [/eis$/, 'el'], [/eis$/, 'il'], [/óis$/, 'ol'], [/ns$/, 'm'], [/es$/, ''], [/s$/, '']];
const singulares = (palavra) => [palavra, ...TERMINACOES.filter(([fim]) => fim.test(palavra)).map(([fim, por]) => palavra.replace(fim, por))];
export const leituras = (nome) => nome.toLowerCase().split(' ').map(singulares)
  .reduce((feitas, opcoes) => feitas.flatMap((f) => opcoes.map((o) => (f ? `${f} ${o}` : o))), ['']);

const SEM_TEXTO = ['branco', 'gerado', 'ignorada', 'marcador-gerado', 'desconhecida'];
const SEM_MENCAO = ['titulo-arquivo', 'titulo-secao', 'titulo-celula', 'tabela-cabecalho', 'tabela-separador'];
const PALAVRA = /[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*/gu;

export function checarTermos(e, acusar) {
  const arquivos = e.arquivos.filter((a) => ['area', 'produto', 'perguntas'].includes(a.tipo));
  const { termos, atributos, daCelula, proibidos } = definicoes(arquivos, acusar);
  const ordenados = [...termos.entries()]
    .map(([chave, t]) => ({ chave, nome: t.nome, palavras: chave.split(' ') }))
    .sort((a, b) => b.palavras.length - a.palavras.length || b.chave.length - a.chave.length);

  // A que termo um negrito se refere, dentro do bloco de uma célula ou fora de todos.
  const resolver = (nome, celula) => {
    if (nome.includes('.')) {
      const [dona, atributo] = nome.toLowerCase().split('.');
      return daCelula.get(dona)?.has(atributo) ? { chave: nome.toLowerCase() } : { erro: 'REF-R1', frase: `**${nome}** cita um atributo que não existe nessa célula` };
    }
    const lidas = leituras(nome);
    const termo = lidas.find((l) => termos.has(l));
    if (termo) return { chave: termo };
    const atributo = lidas.find((l) => atributos.has(l));
    if (!atributo) return { erro: 'REF-R1', frase: `**${nome}** não é um termo definido na especificação; o negrito só marca referência a termo` };
    const donas = atributos.get(atributo);
    if (donas.size === 1 || (celula && donas.has(celula))) return { chave: `.${atributo}` };
    return { erro: 'TRM-R4', frase: `o atributo "${atributo}" existe em mais de uma célula; fora do bloco dele, cite-o com a célula, como **Célula.${atributo}**` };
  };

  for (const a of arquivos) {
    let celula = null;
    for (const l of a.linhas) {
      if (l.forma === 'titulo-celula') celula = l.nome.toLowerCase();
      if (l.forma === 'titulo-secao' && a.tipo === 'area') celula = null;
      if (SEM_TEXTO.includes(l.forma) || SEM_MENCAO.includes(l.forma)) continue;

      const negritos = new Map();
      for (const m of mascarar(l.bruto).matchAll(/\*\*([^*]+)\*\*/g)) {
        const r = resolver(m[1], celula);
        if (r.erro) acusar(a.caminho, l.n, r.erro, r.frase);
        else negritos.set(m[1], r.chave);
      }
      const trecho = trechoDe(l);
      if (trecho === null) continue;
      const definido = l.nome?.toLowerCase();
      const primeiras = new Map();
      for (const o of mencoes(trecho, ordenados, negritos)) {
        if (!o.negrito && !o.exata) continue;
        if (!primeiras.has(o.chave) || o.pos < primeiras.get(o.chave).pos) primeiras.set(o.chave, o);
      }
      for (const [chave, o] of primeiras) {
        if (o.negrito || chave === celula || chave === definido) continue;
        const nome = termos.get(chave).nome;
        acusar(a.caminho, l.n, 'TRM-R10', `"${nome}" é um termo e aparece aqui sem negrito; escreva **${nome}** na primeira menção dentro de cada item`);
      }
    }
  }

  for (const a of e.arquivos) {
    for (const l of a.linhas) {
      if (SEM_TEXTO.includes(l.forma)) continue;
      const texto = mascarar(l.bruto).replace(/\(~~[^~]+~~\)/g, '');
      for (const p of proibidos) {
        const palavra = p.palavra.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        if (new RegExp(`(?<![\\p{L}\\p{N}])${palavra}(?![\\p{L}\\p{N}])`, 'iu').test(texto)) {
          acusar(a.caminho, l.n, 'TRM-R6', `"${p.palavra}" é sinônimo proibido de "${p.termo}"; use o termo`);
        }
      }
    }
  }
}

// Recolhe os termos, os atributos de cada célula e os sinônimos proibidos, e acusa a definição repetida.
function definicoes(arquivos, acusar) {
  const termos = new Map(), atributos = new Map(), daCelula = new Map(), proibidos = [];
  for (const a of arquivos) {
    let celula = null;
    const proibir = (l, termo) => { for (const palavra of l.sinonimos ?? []) proibidos.push({ palavra, termo }); };
    const definir = (l, tipo) => {
      if (l.nome.includes('**')) acusar(a.caminho, l.n, 'TRM-R2', 'o termo é definido sem negrito; o negrito fica para as referências a ele');
      const chave = l.nome.replaceAll('**', '').toLowerCase();
      const anterior = termos.get(chave);
      if (anterior) acusar(a.caminho, l.n, 'TRM-R2', `o termo "${l.nome}" já está definido em ${anterior.arquivo}, linha ${anterior.linha}; cada termo tem um só lugar de definição`);
      else termos.set(chave, { nome: l.nome.replaceAll('**', ''), tipo, arquivo: a.caminho, linha: l.n });
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
      const nome = l.nome.toLowerCase();
      if (daCelula.get(celula).has(nome)) acusar(a.caminho, l.n, 'TRM-R2', `o atributo "${l.nome}" já está definido neste bloco`);
      daCelula.get(celula).add(nome);
      if (!atributos.has(nome)) atributos.set(nome, new Set());
      atributos.get(nome).add(celula);
      proibir(l, l.nome);
    }
  }
  return { termos, atributos, daCelula, proibidos };
}

// O trecho da linha em que uma menção sem negrito conta; null onde não conta nenhuma.
function trechoDe(l) {
  switch (l.forma) {
    case 'definicao': case 'afirmacao': case 'subitem': case 'termo-linguagem': case 'tipo-valor': case 'fora-de-escopo': case 'subitem-pergunta':
      return l.texto;
    case 'atributo': return l.tipo;
    case 'tabela-fileira': return l.bruto;
    case 'proposito': return l.texto.slice(l.rotulo.length + 2);
    case 'ator': return l.texto.slice(l.nome.length + 2);
    case 'externo': return l.papelExterno;
    case 'subitem-externo': return l.bruto.replace(/^ +- \p{L}+: /u, '');
    case 'jornada': return l.nome;
    case 'area': return `${l.central} | ${l.prioridade} | ${l.dono}`;
    case 'pergunta': return l.enunciado;
    default: return null;
  }
}

// As menções de termos num trecho: as em negrito e as sem negrito, em qualquer grafia.
// Onde cabem dois termos, vale o de nome mais longo.
function mencoes(trecho, ordenados, negritos) {
  const achadas = [];
  const plano = mascarar(trecho).replace(/\*\*([^*]+)\*\*/g, (tudo, nome, pos) => {
    if (negritos.has(nome)) achadas.push({ negrito: true, chave: negritos.get(nome), pos });
    return ' '.repeat(tudo.length);
  });
  const palavras = [...plano.matchAll(PALAVRA)].map((p) => ({ pos: p.index, fim: p.index + p[0].length, lidas: singulares(p[0].toLowerCase()), tomada: false }));
  for (const termo of ordenados) {
    for (let i = 0; i + termo.palavras.length <= palavras.length; i++) {
      const janela = palavras.slice(i, i + termo.palavras.length);
      const casa = janela.every((p, k) => !p.tomada && p.lidas.includes(termo.palavras[k]) && (k === 0 || plano.slice(janela[k - 1].fim, p.pos) === ' '));
      if (!casa) continue;
      for (const p of janela) p.tomada = true;
      achadas.push({ negrito: false, chave: termo.chave, pos: janela[0].pos, exata: plano.slice(janela[0].pos, janela.at(-1).fim) === termo.nome });
    }
  }
  return achadas;
}
