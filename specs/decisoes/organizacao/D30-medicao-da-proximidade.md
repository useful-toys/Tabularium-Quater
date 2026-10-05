# Como se verifica a proximidade lógica?  `D30`
Pela contagem de referências, que aponta como candidata a mudar de área a célula que troca mais referências com outra área do que com a sua.
- Contexto: a proximidade lógica era só uma intenção, e a medição revelou uma área sem coesão e uma redundância escondida
- Alternativas descartadas
  - Medir a coesão da área inteira: acusava uma área só por conter uma célula que usa todas as outras
  - Não medir: a proximidade fica só como intenção
- Consequências
  - Ganha: proximidade verificável por programa
  - Aceita: alertas legítimos que, revisados, continuam disparando

## Histórico
- 2026-10-05: decisão criada
