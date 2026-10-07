#!/usr/bin/env node
// Valida a forma de uma especificação Tabularium, sem interpretar o texto.
// Uso: node validar.mjs [pasta-da-especificação]
// Sem argumento, valida specs/ a partir da pasta atual.
// Imprime uma linha por violação, com arquivo, linha, regra e frase, e o total no fim.
// Sai com 0 se a especificação é válida, 1 se há violação e 2 se a pasta não existe.

import { existsSync, statSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { checar } from './checagens.mjs';
import { lerEspecificacao } from './leitura.mjs';

export const validar = (pasta) => checar(lerEspecificacao(pasta));

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const pasta = (process.argv[2] ?? 'specs').replace(/\\/g, '/').replace(/\/+$/, '');
  if (!existsSync(pasta) || !statSync(pasta).isDirectory()) {
    console.error(`${pasta}: pasta não encontrada`);
    process.exit(2);
  }
  const violacoes = validar(pasta);
  for (const { arquivo, linha, regra, frase } of violacoes) {
    console.log(`${pasta}/${arquivo}${linha ? `:${linha}` : ''}  ${regra}  ${frase}`);
  }
  console.log(violacoes.length === 0 ? 'nenhuma violação' : violacoes.length === 1 ? '1 violação' : `${violacoes.length} violações`);
  process.exit(violacoes.length ? 1 : 0);
}
