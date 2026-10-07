// Especificação mínima e válida, usada como ponto de partida de cada teste:
// o teste troca um trecho dela e confere a regra que o validador acusa.

import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { validar } from '../../skills/tabularium-validar/validar.mjs';

export const exemplo = {
  'AGENTS.md': '# AGENTS.md\n',
  '_convencoes.md': '# Convenções\n',
  'decisoes/AGENTS.md': '# AGENTS.md\n',
  'decisoes/_convencoes.md': '# Convenções das decisões\n',
  '_produto.md': `# Loja
Loja virtual pequena, para vender pela internet.

## Propósito
- Problema: quem vende pouco não tem onde registrar os **Pedidos**
- Público: pequenos vendedores

## Áreas
| Área | Célula central | Prioridade | Dono | Arquivo |
| --- | --- | --- | --- | --- |
| Pedidos | **Pedido** | núcleo | vendas | pedidos.md |

## Atores
- Cliente: compra na loja; padrão
- Atendente: acompanha os **Pedidos**
- Tempo: dispara os prazos

## Tipos comuns
- Dinheiro: decimal; de 0 em diante
- Situação: aberto | pago

## Jornadas
- PRD-J1  Comprar: [PED-C1] → [PED-V1]

## Externos
- Banco · pagamentos
  - fornece: a confirmação de cada pagamento

## Regras globais
- [ ] PRD-Q1  Toda tela responde em até 3 s

## Fora de escopo
- Entrega dos produtos · nesta versão
`,
  'pedidos.md': `# Pedidos
Os **Pedidos** e os **Itens de pedido** que os compõem.

## Linguagem
- carrinho: **Pedido** que ainda não foi fechado

## Tipos
- Quantidade: inteiro; de 1 a 99

## Pedido  \`PED\`
Compra que um **Cliente** faz na loja.
- número: inteiro; identidade; único; imutável
- situação: **Situação**; inicial: aberto
- total: **Dinheiro**; derivado: soma dos **Itens de pedido**
- 1..N **Item de pedido**
- evento: Pedido pago
- [ ] PED-R1  Depois de pago, o pedido não muda ⟸ [D1]
- [x] PED-R2  removida
- [ ] PED-R3 · tempo  O pedido aberto há 30 dias é cancelado ⟵ [P1]
- [ ] PED-R4  Frete por região:

| Região | Frete |
| --- | --- |
| capital | grátis |
| interior | cobrado |

- [ ] PED-Q1  A lista de pedidos abre em até 2 s
- [ ] PED-C1  Fechar o pedido
  - exige: ao menos um **Item de pedido**
  - o pedido passa a esperar o pagamento
- [ ] PED-V1 · atendente  Ver os pedidos do dia

## Item de pedido  \`ITE\`
Produto e **Quantidade** dentro de um **Pedido**.
- pertence a 1 **Pedido**
- quantidade: **Quantidade**
- [ ] ITE-R1  Ao **Pedido pago**: a quantidade não muda mais
`,
  '_perguntas.md': `# Perguntas
- P1  O prazo de cancelamento é de 30 dias?
  - opção: 30 dias
  - opção: 60 dias
`,
  '_contadores.md': `# Contadores
Maior número já usado em cada sequência.

## Identificadores
- ITE-R  1  quantidade-nao-muda
- PED-C  1  fechar-pedido
- PED-Q  1  lista-abre-rapido
- PED-R  5  frete-por-regiao
- PED-V  1  ver-pedidos-dia
- PRD-J  1  comprar
- PRD-Q  1  tela-responde

## Perguntas
- P  1  prazo-cancelamento

## Decisões
- D  1  pedido-pago-fixo
`,
  'decisoes/pedidos/D1-pedido-pago-fixo.md': `# Um pedido pago pode mudar?  \`D1\`
Não, fica como está.
- Contexto: o pagamento já foi feito sobre aquele total
- Alternativas descartadas
  - Permitir a mudança e cobrar a diferença: exige uma segunda cobrança
- Consequências
  - Ganha: o total pago bate com o pedido
  - Aceita: corrigir um pedido pago exige outro pedido

## Histórico
- 2026-01-10: decisão criada
`,
};

// Troca um trecho de um arquivo do exemplo; falha se o trecho não está lá,
// para o teste não passar por engano quando o exemplo mudar.
export const troca = (arquivo, de, para) => ({
  [arquivo]: (texto) => {
    if (!texto.includes(de)) throw new Error(`trecho não encontrado em ${arquivo}: ${de}`);
    return texto.replace(de, para);
  },
});

// Grava o exemplo com as mudanças numa pasta temporária e devolve as violações.
// Em mudancas, texto substitui o arquivo, função o transforma e null o apaga.
export function violacoesCom(mudancas = {}, { fimDeLinha = '\n' } = {}) {
  const pasta = mkdtempSync(join(tmpdir(), 'tabularium-'));
  try {
    const arquivos = { ...exemplo };
    for (const [caminho, mudanca] of Object.entries(mudancas)) {
      arquivos[caminho] = typeof mudanca === 'function' ? mudanca(arquivos[caminho]) : mudanca;
    }
    for (const [caminho, texto] of Object.entries(arquivos)) {
      if (texto === null) continue;
      mkdirSync(dirname(join(pasta, caminho)), { recursive: true });
      writeFileSync(join(pasta, caminho), texto.replace(/\n/g, fimDeLinha));
    }
    return validar(pasta);
  } finally {
    rmSync(pasta, { recursive: true, force: true });
  }
}

export const regrasDe = (violacoes) => [...new Set(violacoes.map((v) => v.regra))].sort();
