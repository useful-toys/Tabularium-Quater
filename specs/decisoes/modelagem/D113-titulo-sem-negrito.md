# Título e cabeçalho de tabela aceitam negrito em volta de um termo?  `D113`
Só o título do bloco da célula, no nome que ele define.
- Contexto: título e cabeçalho de tabela não são menção, e o validador pulava essas linhas sem olhar o negrito ⟸ [D111]
- Alternativas descartadas
  - Nenhum, nem o título do bloco da célula: a definição passa a levar negrito ⟸ [D115]
  - Aceitar o negrito que resolve para um termo: a mesma linha teria dois comportamentos, e contraria o título não ser menção
- Consequências
  - Ganha: regra simples de dizer e de testar
  - Aceita: o termo citado num cabeçalho de tabela, ou num título que não o define, fica sem destaque

## Histórico
- 2026-10-10: o título do bloco da célula passa a levar negrito no nome
- 2026-10-10: decisão criada
