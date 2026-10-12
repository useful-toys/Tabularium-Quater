#!/usr/bin/env node
// Sorteia o código que serve de prefixo aos códigos alocados por uma mudança sem issue.
// Uso: node sortear.mjs [pasta-da-especificação]
// Sem argumento, confere specs/ a partir da pasta atual.
// Imprime um código que ainda não aparece na pasta.
// Sai com 0 se sorteou e 2 se a pasta não existe.

import { randomInt } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

// Sem vogais, o código nunca forma palavra; o validador traz o mesmo alfabeto.
export const ALFABETO = 'bcdfghjklmnpqrstvwxz23456789';
const LETRAS = ALFABETO.replace(/\d/g, '');
const TAMANHO = 4;

// O primeiro caractere é letra, para o código nunca passar por número de issue.
export function sortear(inteiroAte = randomInt) {
  let codigo = LETRAS[inteiroAte(LETRAS.length)];
  while (codigo.length < TAMANHO) codigo += ALFABETO[inteiroAte(ALFABETO.length)];
  return codigo;
}

// O texto de todos os arquivos da pasta e os nomes deles: é nos dois que um código aparece.
export function textoDe(pasta) {
  let texto = '';
  for (const nome of readdirSync(pasta).sort()) {
    const caminho = join(pasta, nome);
    texto += `${nome}\n`;
    texto += statSync(caminho).isDirectory() ? textoDe(caminho) : `${readFileSync(caminho, 'utf8')}\n`;
  }
  return texto;
}

// Um prefixo em uso vem sempre seguido do ponto e do número de ordem.
export function sortearLivre(pasta, inteiroAte = randomInt) {
  const texto = textoDe(pasta);
  let codigo;
  do codigo = sortear(inteiroAte); while (texto.includes(`${codigo}.`));
  return codigo;
}

// A pasta da especificação dada na linha de comando, ou specs/; sai com 2 se ela não existe.
export function pastaDada(argumento) {
  const pasta = (argumento ?? 'specs').replace(/\\/g, '/').replace(/\/+$/, '');
  if (!existsSync(pasta) || !statSync(pasta).isDirectory()) {
    console.error(`${pasta}: pasta não encontrada`);
    process.exit(2);
  }
  return pasta;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log(sortearLivre(pastaDada(process.argv[2])));
}
