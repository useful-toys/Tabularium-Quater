// O sorteio do código que serve de prefixo de mudança.
// Rode com: node --test testes/

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { ALFABETO, sortear, sortearLivre } from '../../skills/tabularium-alocar-codigo/sortear.mjs';
import { ALFABETO_DO_SORTEIO, numeroDe } from '../../skills/tabularium-validar/leitura.mjs';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const script = join(raiz, 'skills', 'tabularium-alocar-codigo', 'sortear.mjs');

// Devolve um sorteio que entrega, em ordem, os caracteres dos códigos dados.
const roteiro = (...codigos) => {
  const letras = ALFABETO.replace(/\d/g, '');
  const fila = codigos.flatMap((codigo) => [...codigo].map((c, i) => (i === 0 ? letras : ALFABETO).indexOf(c)));
  return () => fila.shift();
};

const comPasta = (arquivos, fn) => {
  const pasta = mkdtempSync(join(tmpdir(), 'tabularium-'));
  try {
    for (const [caminho, texto] of Object.entries(arquivos)) {
      mkdirSync(dirname(join(pasta, caminho)), { recursive: true });
      writeFileSync(join(pasta, caminho), texto);
    }
    return fn(pasta);
  } finally {
    rmSync(pasta, { recursive: true, force: true });
  }
};

test('D22.3: o alfabeto do sorteio é o que o validador aceita', () => {
  assert.equal(ALFABETO, ALFABETO_DO_SORTEIO);
});

test('IDT-R22.6: o código sorteado tem 4 caracteres do alfabeto, começa por letra e é aceito pelo validador', () => {
  for (let i = 0; i < 2000; i++) {
    const codigo = sortear();
    assert.match(codigo, /^[bcdfghjklmnpqrstvwxz][bcdfghjklmnpqrstvwxz2-9]{3}$/);
    assert.equal(numeroDe(`${codigo}.1`), `${codigo}.1`);
  }
});

test('IDT-R22.6: o código que já aparece na especificação não é devolvido', () => {
  comPasta({ 'pedidos.md': '- [ ] PED-Rk7q2.1  Texto\n' }, (pasta) => {
    assert.equal(sortearLivre(pasta, roteiro('k7q2', 'm3xb')), 'm3xb');
  });
});

test('IDT-R22.6: o código que só aparece no nome de uma decisão não é devolvido', () => {
  comPasta({ 'decisoes/pedidos/Dk7q2.1-outra.md': '# Outra?\n' }, (pasta) => {
    assert.equal(sortearLivre(pasta, roteiro('k7q2', 'm3xb')), 'm3xb');
  });
});

test('IDT-R22.6: a linha de comando imprime um código e sai com 0', () => {
  comPasta({ 'pedidos.md': '# Pedidos\n' }, (pasta) => {
    const saida = spawnSync(process.execPath, [script, pasta], { encoding: 'utf8' });
    assert.equal(saida.status, 0);
    assert.match(saida.stdout, /^[bcdfghjklmnpqrstvwxz][bcdfghjklmnpqrstvwxz2-9]{3}\n$/);
  });
});

test('a linha de comando sai com 2 quando a pasta não existe', () => {
  const saida = spawnSync(process.execPath, [script, join(raiz, 'testes', 'nao-existe')], { encoding: 'utf8' });
  assert.equal(saida.status, 2);
});
