# Quem verifica a especificação?  `D01`
Um script determinístico, que o agente de IA executa sem substituir.
- Contexto: a gramática é fixa para que a checagem não dependa de interpretar o texto, e o formato promete o mesmo resultado para a mesma especificação
- Alternativas descartadas
  - O agente confere lendo o texto: o resultado varia entre execuções, custa tokens e não serve de bloqueio antes de aceitar uma mudança
  - O agente confere agora e o script vem depois: o formato passaria a chamar de verificado o que só é conferido por leitura
- Consequências
  - Ganha: verificação repetível, e o agente fica só com o que exige julgamento, como propor reagrupamentos
  - Aceita: enquanto o script não existe, as regras dependem de disciplina

## Histórico
- 2026-10-04: decisão criada
