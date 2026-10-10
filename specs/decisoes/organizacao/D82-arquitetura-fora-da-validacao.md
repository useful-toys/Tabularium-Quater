# O validador checa as pastas de arquitetura e de interface?  `D82`
Só as decisões e as citações de decisão.
- Contexto: a arquitetura e a interface moram em pastas dentro da especificação e são escritas em formatos experimentais, mas as decisões delas têm a forma das decisões da especificação
- Alternativas descartadas
  - Não checar nada: as decisões dessas pastas tiram o código da sequência do produto, e sem checagem um código repetido passa
  - Checar também a arquitetura e a interface: o formato delas ainda não está fechado
- Consequências
  - Ganha: a arquitetura e a interface evoluem sem quebrar a validação, e as decisões delas deixam de ficar sem conferência
  - Aceita: o resto dessas pastas fica sem checagem até o formato delas fechar

## Histórico
- 2026-10-10: passa a checar as decisões e as citações de decisão, e a questão passa a incluir a interface
- 2026-10-06: decisão criada
