# Onde ficam os dados de referência?  `D84`
No bloco da célula, em tabela, os que é preciso ver para entender as linhas dela, e os demais num arquivo de dados.
- Contexto: tudo o que se afirma sobre uma célula mora no bloco dela, mas dados volumosos pesam em toda leitura da área ⟸ [D24]
- Alternativas descartadas
  - Sempre no bloco: uma tabela longa esconde as linhas e gasta o contexto do agente em toda leitura
  - Sempre em arquivo: obriga a abrir outro arquivo para entender uma regra que depende de poucos valores
  - Bloco cercado de JSON ou CSV dentro do bloco: uma forma a mais na gramática, e formato de dados no meio das afirmações ⟸ [D73]
  - Só o número de fileiras como critério: uma tabela curta que ninguém precisa ver continuaria pesando
- Consequências
  - Ganha: a área continua barata de ler, e os valores são lidos sob demanda
  - Aceita: dado que não é tabular vai sempre para arquivo, por menor que seja

## Histórico
- 2026-10-07: decisão criada
