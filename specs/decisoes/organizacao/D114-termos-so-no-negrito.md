# O validador checa termos em texto sem negrito?  `D114`
Não, quanto a termos ele checa só o negrito e as definições.
- Contexto: dizer se uma palavra sem marca é um termo ou um sinônimo proibido depende de contexto que o programa não tem, e o validador só faz checagem sintática ⟸ [D68]
- Alternativas descartadas
  - Acusar o sinônimo proibido em todo o texto, menos dentro do nome de um termo mais longo: a checagem passa a depender do reconhecimento de nomes, e cada caso abria outra dúvida
  - Proibir que o sinônimo proibido faça parte do nome de um termo: impede de proibir uma palavra comum, que entra em vários nomes
  - Manter a checagem do texto sem negrito: a palavra proibida era acusada dentro do nome de um termo definido
- Consequências
  - Ganha: checagem que não adivinha o que o texto sem marca quer dizer
  - Aceita: termo sem negrito e sinônimo proibido em texto comum passam sem aviso, até a falta dessa checagem aparecer na prática

## Histórico
- 2026-10-10: decisão criada
