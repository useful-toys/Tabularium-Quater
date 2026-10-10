# Título e cabeçalho de tabela aceitam negrito em volta de um termo?  `D113`
Não, ali todo negrito é violação.
- Contexto: título e cabeçalho de tabela não são menção, e o validador pulava essas linhas sem olhar o negrito ⟸ [D111]
- Alternativas descartadas
  - Aceitar o negrito que resolve para um termo: a mesma linha teria dois comportamentos, e contraria o título não ser menção
- Consequências
  - Ganha: regra simples de dizer e de testar
  - Aceita: o termo citado num título ou num cabeçalho de tabela fica sem destaque

## Histórico
- 2026-10-10: decisão criada
