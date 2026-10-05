# Como se percebe que dois autores alocaram o mesmo número?  `D22`
Por um arquivo de contadores em que cada item leva um nome curto da última alocação, de modo que a alocação repetida vira conflito no controle de versão.
- Contexto: todo número é o maior já usado mais um, e duas mudanças feitas em paralelo chegam ao mesmo número, o que no caso das decisões nem conflito gera, porque cada uma cria um arquivo diferente
- Alternativas descartadas
  - Um contador só com o número: as duas mudanças escrevem a mesma linha, e o controle de versão as aceita sem conflito
  - Um item por alocação, em vez de um por sequência: acusa a colisão, mas o arquivo cresce a cada número alocado
  - Só o verificador, depois de juntar as mudanças: sem ele nada acusa, e a duplicata entra em silêncio
  - Número atribuído só na entrada, com marcador provisório até lá: depende do verificador e de testes que citem o marcador
  - Códigos não sequenciais, sem contador: longos e sem ordem, contra a densidade
- Consequências
  - Ganha: o maior número já usado fica escrito, e sobrevive à poda de lápides e à limpeza de decisões ⟸ [D07]
  - Aceita: um arquivo mantido à mão, em que mudanças em itens vizinhos podem conflitar sem que haja colisão

## Histórico
- 2026-10-05: o item passa a levar o nome curto da última alocação, porque um teste mostrou que o contador só com o número não gera conflito
- 2026-10-04: decisão criada
