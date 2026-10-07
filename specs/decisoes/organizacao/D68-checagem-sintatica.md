# Que tipo de checagem o validador faz?  `D68`
Só checagem sintática.
- Contexto: a gramática fixa existe para que um programa confira a especificação sem interpretar o texto ⟸ [D01]
- Alternativas descartadas
  - Checagens de sentido, feitas por IA: não são determinísticas nem se repetem
- Consequências
  - Ganha: verificação determinística e barata
  - Aceita: a regra que não se pode checar pela forma fica fora do validador

## Histórico
- 2026-10-06: a consequência deixa de citar a severidade, que saiu do formato
- 2026-10-05: decisão criada
