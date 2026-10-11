# A partir de quando um código é definitivo?  `Dknnk.1`
A partir da entrada na linha principal do controle de versão.
- Contexto: a discussão de uma ideia grava na ramificação dela o que já tem consenso, o autor muda de rumo ao longo da conversa, e nenhuma outra mudança aloca um código com o mesmo prefixo ⟸ [D22.1]
- Alternativas descartadas
  - Desde que é alocado, mesmo fora da linha principal: cada mudança de rumo durante a discussão deixaria uma lápide
  - A partir do consenso sobre a ideia: a ramificação da discussão não traz implementação, e nada depende do código antes da linha principal
- Consequências
  - Ganha: a discussão reescreve ou apaga só o que ela mesma acrescentou, sem lápide
  - Aceita: o que foi registrado no rastreador durante a discussão pode citar um código depois reescrito ou apagado
  - Aceita: o código apagado antes da linha principal pode ser alocado de novo pela mesma mudança

## Histórico
- 2026-10-11: decisão criada
