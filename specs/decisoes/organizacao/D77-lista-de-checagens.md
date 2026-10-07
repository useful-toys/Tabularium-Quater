# Como a especificação diz o que o validador checa?  `D77`
Por uma lista fechada no bloco do validador, que cita cada regra pelo identificador.
- Contexto: toda checagem é sintática, e cada uma é escrita no programa para uma regra determinada ⟸ [D68]
- Alternativas descartadas
  - Uma marca de severidade no fim de cada regra checada: a marca não diz como checar, e as marcas espalhadas e as checagens do programa são duas listas que podem divergir
  - Uma lista que repete o sentido das regras: redundância, que a medição de referências revelou ⟸ [D30]
- Consequências
  - Ganha: um só lugar diz o que é checado, e as regras ficam sem marca
  - Aceita: os sinais de reagrupamento deixam de ser alertas do programa e ficam com a revisão

## Histórico
- 2026-10-06: decisão criada
