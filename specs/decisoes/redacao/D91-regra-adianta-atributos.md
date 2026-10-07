# Como a regra diz o que o arquivo de dados traz?  `D91`
Cita em negrito os atributos e as partes que o arquivo traz.
- Contexto: o arquivo é lido só sob demanda, e a célula pode ter atributos que um ator altera e que os dados não trazem ⟸ [D84]
- Alternativas descartadas
  - Só o modelo, com a regra de que o arquivo traz todos os atributos: não vale para a célula que também tem atributos alteráveis
  - Repetir na regra o tipo de cada atributo: o tipo já está na linha de modelo, no mesmo bloco
- Consequências
  - Ganha: sabe-se o que o arquivo traz sem abri-lo
  - Aceita: os atributos ficam escritos na regra e no arquivo, e é o validador que os mantém iguais ⟸ [D90]

## Histórico
- 2026-10-07: decisão criada
