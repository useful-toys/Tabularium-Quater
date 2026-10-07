# Mudar os dados de referência cria outra afirmação?  `D88`
Não, o identificador fica e a marca volta a não implementada até o produto trazer os dados novos.
- Contexto: mudança de significado retira a afirmação e cria outra, mas o que a regra de dados afirma é que o produto traz aqueles dados, e isso não muda quando um valor muda ⟸ [D58]
- Alternativas descartadas
  - Lápide e identificador novo a cada alteração: cada revisão de valores gastaria um número e quebraria os testes que citam a regra
  - Manter também a marca: a regra continuaria marcada como cumprida com o produto trazendo os dados antigos
- Consequências
  - Ganha: os testes citam sempre o mesmo identificador, e a marca diz se o produto já acompanhou
  - Aceita: é o único caso em que uma marca de implementada volta atrás

## Histórico
- 2026-10-07: decisão criada
