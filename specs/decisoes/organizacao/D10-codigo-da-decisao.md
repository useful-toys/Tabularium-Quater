# Como se identifica uma decisão?  `D10`
Por um código curto, com o prefixo da mudança que a criou, que nunca volta.
- Contexto: o item cita a decisão no fim da linha, onde cada caractere pesa ⟸ [D09]
- Alternativas descartadas
  - Só o nome do arquivo: fica longo no fim de uma linha, e renomear a decisão obriga a editar todo item que a cita
  - Uma sequência por pasta: mudar a decisão de pasta obrigaria a renumerar
  - Uma sequência única para o produto: duas mudanças feitas em paralelo alocam o mesmo código ⟸ [D22.1]
- Consequências
  - Ganha: citação curta, que sobrevive a mudança de nome e de pasta
  - Aceita: códigos sem ordem entre uma mudança e outra

## Histórico
- 2026-10-10: o código passa a levar o prefixo de mudança, no lugar da sequência única para o produto
- 2026-10-04: decisão criada
