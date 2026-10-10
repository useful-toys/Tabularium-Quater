# Onde fica a lista do que o instalador copia?  `D98`
Num manifesto na linha principal, que o instalador baixa a cada execução.
- Contexto: o instalador viaja dentro da skill já instalada em cada repositório, e a skill é atualizada com pouca frequência
- Alternativas descartadas
  - A lista escrita dentro do próprio script: cada arquivo novo do formato exigiria que todos reinstalassem a skill
- Consequências
  - Ganha: um arquivo novo do formato chega a quem já instalou sem atualizar a skill
  - Aceita: o script antigo tem de entender o manifesto novo, e a forma do manifesto fica cara de mudar

## Histórico
- 2026-10-10: decisão criada
