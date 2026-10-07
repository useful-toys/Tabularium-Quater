# O que o validador confere nos dados de referência?  `D90`
A forma, as colunas, a identidade repetida e as chaves do primeiro nível do JSON.
- Contexto: toda checagem é sintática, e o validador é um programa sem dependências ⟸ [D68]
- Alternativas descartadas
  - Conferir também as chaves dentro das partes: exige casar a estrutura aninhada com o modelo de outras células, um passo maior
  - Conferir também o tipo dos valores: a base de um tipo de valor é texto livre
  - Conferir também se a instância citada numa relação existe: exige ler os dados da outra célula
  - Não conferir o conteúdo: o que a regra diz que o arquivo traz e o que ele traz poderiam divergir ⟸ [D91]
- Consequências
  - Ganha: o que a regra adianta sobre os dados é confiável sem abrir o arquivo
  - Aceita: chave errada dentro de uma parte e valor fora do tipo passam sem acusação

## Histórico
- 2026-10-07: decisão criada
