# Como se distingue a tabela de dados da tabela de decisão?  `D86`
Pela primeira coluna, que na tabela de dados é o atributo de identidade da célula.
- Contexto: as duas são uma regra terminada em dois-pontos e seguida de uma tabela, e o tipo de uma regra vem do lugar e da forma ⟸ [D37]
- Alternativas descartadas
  - Um rótulo fixo no texto da regra: rótulo de tipo, que o formato não usa
- Consequências
  - Ganha: nenhuma marca nova na gramática
  - Aceita: célula sem atributo de identidade não tem dados de referência
  - Aceita: erro de grafia na primeira coluna faz a tabela passar por tabela de decisão

## Histórico
- 2026-10-07: decisão criada
