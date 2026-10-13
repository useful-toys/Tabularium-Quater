# O que o agente faz quando o formato da arquitetura ou da interface encaixa mal?  `D109`
Avisa o usuário uma vez por tipo de problema, e o usuário decide entre forçar o encaixe e anotá-lo em achados, com ou sem issue.
- Contexto: os dois formatos nasceram das situações vividas até agora e não estão fechados, e devem servir aos valores da especificação de produto
- Alternativas descartadas
  - Encaixar no formato atual o que não cabe bem: o texto passa a repetir, a juntar duas coisas numa linha ou a dizer o que ninguém verifica, e o formato nunca é questionado
  - O agente alterar a legenda por conta própria: o formato mudaria sem o usuário decidir, e o que for escrito antes ficaria fora do formato novo
  - Avisar e esperar, sem registro: a decisão se perde entre conversas, e a sessão seguinte tropeça e avisa do mesmo problema de novo
  - Omitir o que encaixa mal, sem o usuário decidir: o bloco parece completo e não está, e o problema nunca chega ao usuário
- Consequências
  - Ganha: o formato evolui por experiência real, com o problema, o exemplo e as ocorrências à vista, e uma issue no repositório do Tabularium quando o usuário quiser
  - Aceita: o que encaixa mal fica por escrever até o usuário decidir, e o arquivo de achados vira uma convenção local do projeto quando o encaixe é forçado

## Histórico
- 2026-10-10: resolução trocada: o usuário passa a decidir entre forçar e anotar, com ou sem issue, e o estado fica em achados; a anterior só mandava avisar
- 2026-10-10: decisão criada
