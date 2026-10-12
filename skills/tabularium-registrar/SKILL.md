---
name: tabularium-registrar
description: Cria no GitHub a issue de uma sugestão ou de uma entrevista do Tabularium, separa partes de uma ideia em issues próprias e cria os rótulos da especificação.
disable-model-invocation: true
---

# Registrar uma ideia numa issue

Você cria **issues de especificação**. A forma delas, os rótulos e o estado estão em [issue.md](issue.md): leia-o antes de começar. A issue é opcional: a ideia que começa e termina numa conversa só não precisa dela.

Quem grava o andamento na issue, a cada rodada, é `/tabularium-entrevistar`. Você entra onde ela não alcança: a issue que ainda não existe e a parte que sai da ideia.

## 1. Garantir os rótulos

Crie no repositório cada rótulo de [issue.md](issue.md) que faltar: `especificação`, `em-entrevista`, `consenso`, `rejeitada` e `defeito`.

Feito quando `gh label list` mostra os cinco.

## 2. Escolher o que fazer

Pare no primeiro caso que servir:

| O que há | O que fazer |
| --- | --- |
| Uma parte a separar, que a entrevista ou `/tabularium-sugerir` apontou | Passo 5; antes dele, o passo 4, se a entrevista ainda não tem issue |
| Uma entrevista nesta conversa, sem issue | Passo 4 |
| Um texto junto com o comando, sem entrevista nesta conversa | Passo 3 |
| Uma entrevista com issue, e nada a separar | Diga ao autor que a entrevista já grava o andamento nela, e encerre |
| Nada | Pergunte ao autor qual ideia ele quer sugerir |

## 3. Criar uma sugestão

Crie a issue com o texto do autor no corpo, sem reescrevê-lo, e um título curto tirado dele. Ajuste os rótulos pela linha "Uma sugestão é criada" de [issue.md](issue.md).

Feito quando a sugestão existe, com `especificação` e sem rótulo de estado. Siga para o passo 6.

## 4. Criar a issue da entrevista

A entrevista desta conversa começou sem issue, e passa a ter uma:

1. Atualize o andamento com tudo o que foi respondido até agora. Se há consenso gravado sem commit, pare e diga ao autor: quem grava e faz o commit é a entrevista.
2. Envie a ramificação da ideia ao servidor: acionar esta skill é o pedido desse envio.
3. Crie a issue com o andamento no corpo e um título curto tirado de `Objetivo`.
4. Crie o comentário `## Ideia original` com o que o autor disse sobre a ideia ao começar.
5. Crie um comentário para cada rodada já feita, em ordem, na forma de "Comentar a rodada" de [issue.md](issue.md).
6. Ponha `especificação` e o rótulo de estado: `em-entrevista` enquanto há item em `Em aberto`, `consenso` depois que o autor confirmou o encerramento.

A ramificação e o prefixo continuam os mesmos: os códigos já gravados não passam a usar o número da issue nova. Daqui em diante, a entrevista grava nela sozinha.

Feito quando a issue existe com o andamento no corpo, o comentário `## Ideia original`, um comentário por rodada feita e os dois rótulos, e a ramificação que o andamento nomeia está no servidor.

## 5. Separar partes

Uma parte sai para uma issue própria em dois casos:

- **A parte fica para depois:** o autor quer entregar o resto, ou guardou uma sugestão de `/tabularium-sugerir`. Crie uma sugestão, como no passo 3: o corpo conta, em texto livre, o que já foi dito sobre a parte.
- **A parte é defeito, e o resto da ideia segue:** crie uma issue só com o rótulo `defeito`. O corpo traz a afirmação que o produto não cumpre, com o texto e o código, e o que o autor relatou.

A issue nova cita a original. No andamento da original, a parte passa a `Fora da ideia`, com o número da issue nova: grave-o por "Gravar o andamento" de [issue.md](issue.md).

Feito quando cada parte separada tem a sua issue, as duas se citam, e o corpo da original traz a parte em `Fora da ideia`.

## 6. Relatar

Diga ao autor o link de cada issue criada, os rótulos de cada uma e o que foi escrito. Para a sugestão, diga que `/tabularium-entrevistar` a recebe pelo número.
