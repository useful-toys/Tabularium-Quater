#!/usr/bin/env node
// Devolve o próximo código de um tipo e de um prefixo de mudança.
// Uso: node proximo.mjs <tipo> <prefixo> [pasta-da-especificação]
// O tipo é SIGLA-P para identificador, como PED-R, P para pergunta ou D para decisão.
// O prefixo é o número da issue ou o código sorteado.
// Sem a pasta, confere specs/ a partir da pasta atual.
// Imprime o código inteiro, com o número de ordem seguinte ao maior que aparece na pasta.
// Sai com 0 se devolveu o código e 2 se um argumento é inválido ou a pasta não existe.

import { pathToFileURL } from 'node:url';
import { ALFABETO, pastaDada, textoDe } from './sortear.mjs';

const LETRAS = ALFABETO.replace(/\d/g, '');
const TIPO = /^(?:[A-Z]{2,5}-[A-Z]|P|D)$/;
const PREFIXO = new RegExp(`^(?:[1-9]\\d*|[${LETRAS}][${ALFABETO}]{3})$`);

// Conta toda aparição do código, e não só a linha que o define: a citação de um código já apagado também o gasta.
// O que vem antes não é letra, dígito nem hífen, para `D9.1` não ser lido dentro de `PED-D9.1`.
export function proximo(pasta, tipo, prefixo) {
  const usados = new RegExp(`(?<![A-Za-z0-9-])${tipo}${prefixo}\\.(\\d+)`, 'g');
  let maior = 0;
  for (const m of textoDe(pasta).matchAll(usados)) maior = Math.max(maior, Number(m[1]));
  return `${tipo}${prefixo}.${maior + 1}`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [tipo, prefixo, pasta] = process.argv.slice(2);
  if (!TIPO.test(tipo ?? '')) {
    console.error(`${tipo}: tipo inválido; cabe SIGLA-P, como PED-R, P ou D`);
    process.exit(2);
  }
  if (!PREFIXO.test(prefixo ?? '')) {
    console.error(`${prefixo}: prefixo inválido; cabe o número da issue, sem zero à esquerda, ou o código sorteado`);
    process.exit(2);
  }
  console.log(proximo(pastaDada(pasta), tipo, prefixo));
}
