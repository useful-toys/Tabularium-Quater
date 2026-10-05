# Como se percebe que dois autores alocaram o mesmo número?  `D22`
Por um arquivo de contadores, em que a alocação repetida vira conflito no controle de versão.
- Contexto: todo número é o maior já usado mais um, e duas mudanças feitas em paralelo chegam ao mesmo número, o que no caso das decisões nem conflito gera, porque cada uma cria um arquivo diferente
- Alternativas descartadas
  - Só o verificador, depois de juntar as mudanças: sem ele nada acusa, e a duplicata entra em silêncio
  - Número atribuído só na entrada, com marcador provisório até lá: depende do verificador e de testes que citem o marcador
  - Códigos não sequenciais, sem contador: longos e sem ordem, contra a densidade
- Consequências
  - Ganha: o maior número já usado fica escrito, e sobrevive à poda de lápides e à limpeza de decisões ⟸ [D07]
  - Aceita: um arquivo mantido à mão, que conflita sempre que dois autores alocam na mesma sequência

## Histórico
- 2026-10-04: decisão criada
