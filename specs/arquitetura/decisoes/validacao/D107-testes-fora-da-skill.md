# Onde ficam os testes do validador?  `D107`
Fora da pasta da skill, numa pasta que não é distribuída.
- Contexto: o npx skills copia a pasta inteira da skill para o repositório de quem adota
- Alternativas descartadas
  - Ao lado do script, dentro da pasta da skill: seriam distribuídos a todos, com exemplos de especificação inválida que o agente poderia ler por engano
- Consequências
  - Ganha: quem adota recebe só o que usa
  - Aceita: o teste fica longe do código que testa

## Histórico
- 2026-10-10: decisão criada
