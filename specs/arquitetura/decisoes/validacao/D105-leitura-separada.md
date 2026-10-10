# A leitura da especificação fica junto das checagens?  `D105`
Não, é um módulo à parte, que não depende delas.
- Contexto: o gerador vai ler a especificação do mesmo jeito que o validador ⟸ [D78]
- Alternativas descartadas
  - Um módulo só, que lê e acusa: o gerador teria de reescrever a leitura, e as duas divergiriam na primeira mudança da gramática
- Consequências
  - Ganha: os dois programas compartilham uma só interpretação da gramática
  - Aceita: a leitura devolve mais do que o validador usa, e toda linha precisa de uma forma com nome

## Histórico
- 2026-10-10: decisão criada
