# Uma célula tem estado de implementação?  `D63`
Não, só as suas linhas com identificador têm.
- Contexto: todo atributo novo já chega acompanhado de uma linha verificável que o usa ⟸ [D46]
- Alternativas descartadas
  - Estado por célula: agregado demais, e redundante com o estado das linhas
- Consequências
  - Ganha: estado só onde há fato verificável
  - Aceita: o estado de uma célula só se conhece somando o das linhas

## Histórico
- 2026-10-05: decisão criada
