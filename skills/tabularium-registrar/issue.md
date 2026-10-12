# A issue de especificação

A issue de especificação guarda uma ideia sobre o que está em `specs/`. O corpo dela tem uma de duas formas:

- **sugestão:** texto em qualquer forma, escrito por uma pessoa, por `/tabularium-registrar` ou por `/tabularium-sugerir`;
- **andamento:** o corpo na forma de `andamento.md`, na pasta da skill `tabularium-entrevistar`. É a linha `Ramificação` que o distingue da sugestão.

A sugestão vira andamento na primeira vez que uma entrevista grava nela. O rastreador é o GitHub, pelo comando `gh`. Escreva cada texto num arquivo temporário e passe-o com `--body-file`: os acentos chegam inteiros.

## Rótulos

| Situação da ideia | Rótulos |
| --- | --- |
| Sugestão, sem entrevista | `especificação` |
| Entrevista começada | `especificação`, `em-entrevista` |
| Consenso confirmado | `especificação`, `consenso` |
| Rejeitada | `especificação`, `rejeitada` |
| Defeito | `defeito` |

`em-entrevista`, `consenso` e `rejeitada` são os rótulos de estado, e a issue leva no máximo um. O defeito não é issue de especificação: a especificação está certa, e quem o trata é o processo da equipe.

Crie no repositório o rótulo que faltar, com `gh label create`.

## Estado

Cada skill ajusta o estado no acontecimento que é dela:

| Acontecimento | Skill | Rótulos | Issue |
| --- | --- | --- | --- |
| A entrevista começa numa sugestão | `/tabularium-entrevistar` | `especificação`, `em-entrevista` | Aberta |
| O autor confirma o consenso | `/tabularium-entrevistar` | Troca o estado por `consenso` | Aberta |
| O autor rejeita a ideia | `/tabularium-entrevistar` | Troca o estado por `rejeitada` | Fecha como não planejada, com o motivo no comentário de fechamento |
| A ideia inteira é defeito | `/tabularium-entrevistar` | Segue [Virar defeito](#virar-defeito) | Aberta |
| A entrega devolve a ideia | `/tabularium-aplicar` | Troca o estado por `em-entrevista` | Aberta |
| A entrega chega à linha principal do servidor | `/tabularium-aplicar` | Mantém `consenso` | Fecha |
| Uma sugestão é criada | `/tabularium-registrar`, `/tabularium-sugerir` | `especificação` | Nova, aberta |
| Um defeito é separado | `/tabularium-registrar` | `defeito` | Nova, aberta |

A issue fechada fica fechada: nenhuma skill a reabre. A ideia que volta é uma sugestão nova, que cita a antiga.

Feito quando a issue tem os rótulos da linha, e está aberta ou fechada conforme ela.

## Gravar o andamento

Toda mudança de estado numa issue com andamento grava também o corpo: os dois mudam juntos.

1. Releia o corpo da issue. Se ele não é o que esta sessão leu ou gravou por último, outra sessão escreveu nela: pare e mostre a diferença ao autor.
2. Envie a ramificação da ideia ao servidor: a sessão que retoma precisa achá-la lá.
3. Se o corpo ainda é uma sugestão e a issue não tem o comentário `## Ideia original`, crie-o com o corpo, sem alterar uma palavra.
4. Troque o corpo pelo andamento.

Feito quando o corpo da issue é o andamento desta conversa, a ramificação que ele nomeia está no servidor, e a issue tem o comentário `## Ideia original`.

## Comentar a rodada

Cada rodada gravada ganha um comentário, com o que o autor decidiu nela:

```markdown
## Rodada 3 · Cancelamento de pedido · 2026-10-08

- decisão: "Um pedido enviado pode ser cancelado?" (`D31.1`): não; depois do envio, vale a devolução
- escolha: só o cliente cancela; o vendedor ficou fora da ideia
```

- `decisão:` aponta para a decisão que a rodada gravou em `specs/`: a questão, o código e a resolução numa frase. O contexto e as alternativas ficam no arquivo dela.
- `escolha:` conta por extenso o que o autor escolheu e não virou decisão: o comentário é o único lugar dela.

O comentário conta a discussão a quem lê a issue, e fica como foi escrito, mesmo que uma rodada posterior reescreva ou apague um código que ele cita. A retomada lê só o corpo.

## Virar defeito

A ideia inteira é defeito quando nenhuma parte dela pede mudança em `specs/` e alguma tem o veredito defeito. A própria issue passa a ser a do defeito:

1. Tire `especificação` e o rótulo de estado, e ponha `defeito`.
2. Acrescente um comentário com cada afirmação que o produto não cumpre, com o texto e o código, e o que o autor relatou.

A issue fica aberta.
