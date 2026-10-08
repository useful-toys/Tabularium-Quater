---
name: tabularium-registrar
description: Grava numa issue do GitHub o estado de uma entrevista do Tabularium.
disable-model-invocation: true
---

# Registrar a entrevista na issue

Você grava numa issue do GitHub o estado de uma ideia: o **plano** que `/tabularium-entrevistar` produziu nesta conversa, ou o resultado de `/tabularium-aplicar`. Cada vez que você grava é um **registro**. A issue fica assim:

- o corpo é o plano no estado mais recente;
- o primeiro comentário é a ideia como chegou, com o título `## Ideia original`;
- cada registro acrescenta um comentário;
- um rótulo diz o estado: `em discussão`, `consenso`, `defeito` ou `rejeitada`.

A forma do plano está em `plano.md`, na pasta da skill `tabularium-entrevistar`, ao lado da pasta desta. O rastreador é o GitHub, pelo comando `gh`.

## 1. Reunir o que gravar

Tire da conversa:

- o plano, com tudo o que foi respondido até agora; se as últimas respostas ainda não estão nele, atualize-o antes;
- o rótulo que a entrevista disse valer;
- os números das rodadas feitas desde o último registro;
- a issue de onde a conversa partiu, se partiu de uma.

Se a conversa não tem entrevista nem aplicação, diga isso ao autor e encerre.

Feito quando você tem o plano atualizado, o rótulo, as rodadas e a issue de origem, ou a certeza de que não há uma.

## 2. Gravar o corpo

Escreva cada texto num arquivo temporário e passe-o com `--body-file`: os acentos chegam inteiros.

- **A conversa partiu de uma issue que já tinha um plano:** releia a issue. Se o corpo mudou desde que a entrevista o leu, pare e mostre a diferença ao autor. Senão, troque o corpo pelo plano.
- **A conversa partiu de uma issue de texto livre:** crie o comentário `## Ideia original` com o corpo atual, sem alterar uma palavra, e só então troque o corpo pelo plano.
- **A conversa não partiu de uma issue:** crie a issue com o plano no corpo e um título curto tirado de `Proposto`. Crie o comentário `## Ideia original` com o que o autor disse sobre a ideia ao começar.

Feito quando o corpo da issue é o plano, e a issue tem o comentário `## Ideia original`.

## 3. Comentar o registro

Acrescente um comentário com o que aconteceu desde o registro anterior:

```markdown
## Registro de 2026-10-08 · rodadas 3 a 5

### Discutido
- Rodada 3 · Cancelamento de pedido

### Estabelecido
- A capacidade "Cancelar um pedido" (`PED-C4`) não dizia até quando vale

### Decidido
- O cliente cancela até o envio
```

`Estabelecido` traz os fatos encontrados na especificação; `Decidido`, o que o autor escolheu ou confirmou. No registro do consenso, da rejeição ou da aplicação, o título troca as rodadas pelo acontecimento: `## Registro de 2026-10-08 · consenso`.

Feito quando o comentário está na issue.

## 4. Ajustar o estado

Crie no repositório o rótulo que faltar, e deixe na issue só um dos quatro.

| Estado | O que fazer |
| --- | --- |
| Em discussão | Rótulo `em discussão`. Se a issue estava fechada, reabra |
| Consenso | Rótulo `consenso`. Na linha `Estado` do Resumo, ponha a data e o commit mais recente da linha principal: `consenso em 2026-10-08 · linha principal em a1b2c3d` |
| Aplicada | Mantém `consenso`. O comentário do registro lista o que a aplicação criou, alterou e retirou. Feche a issue |
| Rejeitada | Rótulo `rejeitada`. A linha `Estado` guarda o motivo. Feche a issue como não planejada |
| Defeito, a ideia inteira | Rótulo `defeito` |

Feito quando a issue tem um só rótulo de estado, e está aberta ou fechada conforme a tabela.

## 5. Separar partes

Uma parte sai para uma issue própria em dois casos:

- **A parte é defeito, e o resto da ideia segue:** crie uma issue com o rótulo `defeito`. O corpo traz a afirmação que o produto não cumpre, com o texto e o código, e o que o autor relatou.
- **A parte fica para depois, e o autor quer o consenso do resto:** crie uma issue com o rótulo `em discussão`. O corpo é um plano só com essa parte, e o comentário `## Ideia original` traz o que já foi dito sobre ela.

Nos dois casos, a issue nova cita a original, e o plano da original passa a listar a parte em `Fora do plano`, com o número da issue nova.

Feito quando cada parte separada tem a sua issue, e as duas se citam.

## 6. Relatar

Diga ao autor o link de cada issue gravada, o rótulo de cada uma e o que foi escrito. Depois de um consenso, sugira `/tabularium-aplicar` com o número da issue, e deixe o autor acioná-la.
