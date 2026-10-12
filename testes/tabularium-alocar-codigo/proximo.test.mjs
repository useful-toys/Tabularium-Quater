// O próximo código de um tipo e de um prefixo de mudança.
// Rode com: node --test testes/

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { proximo } from '../../skills/tabularium-alocar-codigo/proximo.mjs';
import { numeroDe } from '../../skills/tabularium-validar/leitura.mjs';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const script = join(raiz, 'skills', 'tabularium-alocar-codigo', 'proximo.mjs');

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

const rodar = (...argumentos) => spawnSync(process.execPath, [script, ...argumentos], { encoding: 'utf8' });

test('IDT-Rbvc2.2: o primeiro código de um prefixo tem ordem 1', () => {
  comPasta({ 'pedidos.md': '- [ ] PED-R9.1  Texto\n' }, (pasta) => {
    assert.equal(proximo(pasta, 'PED-R', '23'), 'PED-R23.1');
    assert.equal(proximo(pasta, 'D', 'k7q2'), 'Dk7q2.1');
  });
});

test('IDT-Rbvc2.2: a ordem é a seguinte à maior já usada, e não a primeira vaga', () => {
  comPasta({ 'pedidos.md': '- [ ] PED-R23.1  Texto\n- [ ] PED-R23.4  Texto\n- [ ] PED-R23.10  Texto\n' }, (pasta) => {
    assert.equal(proximo(pasta, 'PED-R', '23'), 'PED-R23.11');
  });
});

test('IDT-Rbvc2.2: cada sigla, cada papel e cada prefixo têm a sua contagem', () => {
  const texto = '- [ ] PED-R23.3  Texto\n- [ ] PED-C23.1  Texto\n- [ ] ENT-R23.5  Texto\n- [ ] PED-R2.7  Texto\n- [ ] PED-R230.8  Texto\n';
  comPasta({ 'pedidos.md': texto }, (pasta) => {
    assert.equal(proximo(pasta, 'PED-R', '23'), 'PED-R23.4');
    assert.equal(proximo(pasta, 'PED-C', '23'), 'PED-C23.2');
    assert.equal(proximo(pasta, 'PED-V', '23'), 'PED-V23.1');
  });
});

test('IDT-Rbvc2.2: pergunta e decisão não se confundem com o papel de um identificador', () => {
  comPasta({ 'pedidos.md': '- [ ] PED-D23.6  Texto\n- [ ] PED-P23.6  Texto ⟸ [D23.2] ⟵ [P23.1]\n' }, (pasta) => {
    assert.equal(proximo(pasta, 'D', '23'), 'D23.3');
    assert.equal(proximo(pasta, 'P', '23'), 'P23.2');
  });
});

test('IDT-Rbvc2.2: o código que só aparece no nome de uma decisão ou numa citação conta', () => {
  comPasta({ 'decisoes/pedidos/D23.2-outra.md': '# Outra?\n', 'pedidos.md': 'movida → [PED-R23.9]\n' }, (pasta) => {
    assert.equal(proximo(pasta, 'D', '23'), 'D23.3');
    assert.equal(proximo(pasta, 'PED-R', '23'), 'PED-R23.10');
  });
});

test('IDT-Rbvc2.2: o código devolvido é aceito pelo validador', () => {
  comPasta({ 'pedidos.md': '# Pedidos\n' }, (pasta) => {
    for (const prefixo of ['23', 'k7q2']) {
      const codigo = proximo(pasta, 'PED-R', prefixo);
      assert.equal(numeroDe(codigo.slice('PED-R'.length)), `${prefixo}.1`);
    }
  });
});

test('IDT-Rbvc2.3: a linha de comando imprime o código e sai com 0', () => {
  comPasta({ 'pedidos.md': '- [ ] PED-R23.1  Texto\n' }, (pasta) => {
    const saida = rodar('PED-R', '23', pasta);
    assert.equal(saida.status, 0);
    assert.equal(saida.stdout, 'PED-R23.2\n');
  });
});

test('a linha de comando sai com 2 quando o tipo ou o prefixo é inválido', () => {
  comPasta({ 'pedidos.md': '# Pedidos\n' }, (pasta) => {
    for (const argumentos of [[], ['PED'], ['ped-r', '23'], ['PED-R'], ['PED-R', '07'], ['PED-R', 'a7q2'], ['PED-R', '23.1']]) {
      assert.equal(rodar(...argumentos, pasta).status, 2, argumentos.join(' '));
    }
  });
});

test('a linha de comando sai com 2 quando a pasta não existe', () => {
  assert.equal(rodar('PED-R', '23', join(raiz, 'testes', 'nao-existe')).status, 2);
});
