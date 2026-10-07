# A geração das partes derivadas fica no mesmo programa que a checagem?  `D78`
Não, fica num programa à parte, o gerador.
- Contexto: o validador só lê a especificação e acusa as violações, e o gerador escreve arquivos
- Alternativas descartadas
  - Um só programa, que checa e gera: checar passaria a alterar a especificação, o programa teria duas responsabilidades, e uma não poderia existir nem mudar sem a outra
- Consequências
  - Ganha: checar nunca altera nada, e cada programa faz uma só coisa e evolui no seu ritmo
  - Aceita: dois programas para manter e para executar a cada mudança

## Histórico
- 2026-10-06: decisão criada
