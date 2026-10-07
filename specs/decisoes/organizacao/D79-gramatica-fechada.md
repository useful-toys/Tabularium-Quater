# O que o validador faz com uma linha que não reconhece?  `D79`
Acusa a linha como violação.
- Contexto: o validador checa a forma, e uma marca escrita errada, como `[ok]` no lugar de `[x]`, faz a linha deixar de parecer afirmação
- Alternativas descartadas
  - Ignorar a linha e checar só as que reconhece: a linha com erro de forma passaria por linha de modelo, sem acusação
- Consequências
  - Ganha: todo erro de forma aparece
  - Aceita: o formato precisa descrever todas as formas de linha, e a lista cresce com ele

## Histórico
- 2026-10-06: decisão criada
