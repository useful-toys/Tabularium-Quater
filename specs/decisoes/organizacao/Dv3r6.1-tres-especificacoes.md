# A arquitetura e a interface de um produto fazem parte do formato?  `Dv3r6.1`
Sim, como especificações próprias, uma por camada, ao lado da especificação do produto.
- Contexto: a arquitetura e a interface já têm pasta, legenda e instruções para agentes, e o validador, o indexador e as skills já as tratam ⟸ [D82, D93]
- Alternativas descartadas
  - Ficam fora do formato, como experimentos à parte: a existência das duas já é comprometida e em parte implementada, e a definição do formato dizia o contrário
  - Uma só especificação, com o produto, a arquitetura e a interface: quem decide o produto deixa de conseguir lê-la ⟸ [D74]
- Consequências
  - Ganha: cada camada tem a sua fonte, e as regras que tratam das outras duas passam a citar algo definido
  - Aceita: a forma das linhas da especificação de arquitetura e da de interface ainda não está madura, e fica na legenda de cada pasta

## Histórico
- 2026-10-12: decisão criada
