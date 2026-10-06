#!/usr/bin/env node
// Instala ou atualiza o formato Tabularium num repositório.
// Uso: node instalar.mjs [raiz-do-repositório]
// Baixa da linha principal do Tabularium o que instalador/manifesto.json lista:
// os genéricos são copiados por cima do que houver;
// os modelos, de instalador/modelos/, só para onde ainda não há arquivo.
// TABULARIUM_ORIGEM troca a origem por outra URL ou por uma pasta local.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const origem = process.env.TABULARIUM_ORIGEM
  ?? 'https://raw.githubusercontent.com/useful-toys/Tabularium-Quater/main';
const raiz = process.argv[2] ?? process.cwd();

async function baixar(caminho) {
  if (!/^https?:/.test(origem)) return readFileSync(join(origem, caminho), 'utf8');
  const url = `${origem.replace(/\/$/, '')}/${caminho}`;
  const resposta = await fetch(url);
  if (!resposta.ok) throw new Error(`${url}: ${resposta.status} ${resposta.statusText}`);
  return resposta.text();
}

// O git pode trocar o fim de linha na cópia de trabalho; isso não é mudança.
const normalizar = (texto) => texto.replace(/\r\n/g, '\n');

const manifesto = JSON.parse(await baixar('instalador/manifesto.json'));

// Tudo é baixado antes de qualquer escrita, para uma falha de rede não deixar a instalação pela metade.
const plano = [];
for (const nome of manifesto.genericos) {
  const destino = join(raiz, nome);
  const novo = await baixar(nome);
  if (!existsSync(destino)) plano.push({ nome, estado: 'criado', novo });
  else if (normalizar(readFileSync(destino, 'utf8')) === normalizar(novo)) plano.push({ nome, estado: 'igual' });
  else plano.push({ nome, estado: 'atualizado', novo });
}
for (const nome of manifesto.modelos) {
  if (existsSync(join(raiz, nome))) plano.push({ nome, estado: 'mantido' });
  else plano.push({ nome, estado: 'criado', novo: await baixar(`instalador/modelos/${nome}`) });
}

for (const { nome, estado, novo } of plano) {
  if (novo !== undefined) {
    const destino = join(raiz, nome);
    mkdirSync(dirname(destino), { recursive: true });
    writeFileSync(destino, novo);
  }
  console.log(`${estado.padEnd(10)}  ${nome}`);
}
