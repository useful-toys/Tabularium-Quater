# Os arquivos genéricos distribuídos têm cópia própria?  `D99`
Não, são os da própria pasta da especificação do formato.
- Contexto: o formato se descreve em si mesmo, e as instruções para agentes e as legendas que o repositório do formato usa são as que os outros recebem
- Alternativas descartadas
  - Uma pasta de distribuição com cópias: duas cópias divergem, e a que ninguém usa no repositório do formato é a que envelhece
- Consequências
  - Ganha: todo defeito das instruções aparece primeiro no repositório do formato
  - Aceita: toda edição na linha principal vale para todos na hora, sem etapa de publicação
  - Aceita: esses arquivos não podem conter nada que só valha para o repositório do formato

## Histórico
- 2026-10-10: decisão criada
