---
name: tabularium-sugerir
description: Sugere ao autor ideias que complementam uma ideia do Tabularium já discutida, ou uma área da especificação.
disable-model-invocation: true
---

# Sugerir o que complementa a ideia

Você traz **sugestões**: ideias suas que complementam uma funcionalidade, a de uma ideia que o autor já discutiu ou a de uma área que já está escrita. A sugestão é **vizinha** da funcionalidade: o que mais o produto poderia ter por causa dela. Você só lê e sugere: esta skill não grava em `specs/`. Quem decide é o autor: cada sugestão é incorporada à discussão, por `/tabularium-entrevistar`, descartada, ou guardada numa issue.

## 1. Receber o alvo

O **alvo** é aquilo que as sugestões complementam. Pare no primeiro caso que servir:

- **O autor nomeou uma área ou uma célula:** o alvo é ela, como está escrita.
- **Há uma entrevista nesta conversa:** o alvo é a ideia dela, com o que a ramificação gravou e o que está no andamento.
- **Nenhum dos dois:** pergunte ao autor o que ele quer complementar.

Feito quando você sabe o alvo.

## 2. Ler em volta do alvo

Siga "Antes de qualquer tarefa" de `specs/AGENTS.md`, com a área do alvo como a área tocada. Depois leia por inteiro o alvo e cada **vizinho** dele:

- as outras células da área;
- o que a Fronteira da área diz que ela usa de fora, e as reações de outras áreas aos eventos dela;
- em `specs/_produto.md`, os atores, as jornadas que passam pelo alvo e o `Fora de escopo`.

Se o alvo é a ideia de uma entrevista, veja o que a ramificação gravou com `git diff <linha principal>...HEAD -- specs/`.

Feito quando você leu por inteiro o alvo e cada vizinho.

## 3. Procurar as sugestões

Reflita sobre o que mais o produto poderia ter por causa do alvo. As **direções** abaixo são o ponto de partida: passe por todas, e siga além delas quando o alvo provocar.

- o passo antes e o passo depois: o que o ator faz logo antes e logo depois do que o alvo descreve;
- o outro lado: quem mais participa ou é afetado, e o que ele precisaria ver ou fazer;
- a visão que falta: o que quem age precisa ver para decidir, e o que ele vê depois de agir;
- a reação que falta: o fato do alvo que outra célula deveria perceber;
- o caminho de volta: como se desfaz ou se corrige o que o alvo permite;
- o acumulado: o que alguém quer ver depois que o alvo aconteceu muitas vezes;
- a repetição: fazer o mesmo para vários de uma vez, ou de novo a partir do que já foi feito;
- a variação: outro ator que faria o mesmo, ou o mesmo ator fazendo só uma parte;
- o tempo parado: o que o produto faz quando ninguém age.

A sugestão que não veio de nenhuma direção vale como as outras, se tem motivo. Cada sugestão tem um **motivo**: a linha da especificação que a provoca, ou a ausência que você procurou e confirmou. Para confirmar a ausência, procure em toda a pasta `specs/` os termos da sugestão, como manda "Antes de qualquer tarefa". Descarte a que não tem motivo, e também:

- o que a especificação já diz, implementado ou pendente;
- o que `Fora de escopo` exclui, e o que o andamento já traz em `Fora da ideia`;
- o que falta dentro da própria funcionalidade, como um limite ou uma exceção: é condição de contorno, e pertence à entrevista;
- qualidade geral, como auditoria, desempenho ou acessibilidade: pertence a "Ao revisar" de `specs/AGENTS.md`;
- escolha de arquitetura, de interface ou de código.

Fique com as cinco de motivo mais forte, no máximo. Menos de cinco é resultado normal, e nenhuma também: diga ao autor quantas sobraram.

Feito quando você passou por todas as direções, e cada sugestão que sobrou tem um motivo que você pode citar.

## 4. Mostrar

Mostre as sugestões de uma vez, da mais ligada ao alvo para a menos, cada uma nesta forma:

```markdown
### Sugestão 1/3 · Avisar o vendedor do cancelamento

**Motivo.** "Cancelar um pedido" (`PED-C31.1`) muda o pedido, e nada em Vendas diz como o vendedor fica sabendo.

**O que acrescentaria.** O vendedor é avisado quando um pedido dele é cancelado.
```

Pergunte ao autor o destino de cada uma: incorporar à discussão, descartar ou criar uma issue.

Feito quando cada sugestão tem um destino dado pelo autor.

## 5. Encaminhar

| Destino | Com entrevista nesta conversa | Sem entrevista |
| --- | --- | --- |
| Incorporar | É uma parte nova da ideia: entra na fronteira, pelo passo "Quebrar a ideia em partes" de `/tabularium-entrevistar` | Sugira acionar `/tabularium-entrevistar` com ela |
| Descartar | Entra em `Fora da ideia`, como `Recusado: …`, para não voltar numa retomada | Nada a fazer |
| Criar issue | Crie a [issue de sugestão](#issue-de-sugestão). Ela entra em `Fora da ideia`, com o número da issue | Crie a [issue de sugestão](#issue-de-sugestão) |

Feito quando cada sugestão foi encaminhada, e você disse ao autor quais voltaram para a entrevista e o link de cada issue criada.

## Issue de sugestão

A issue guarda uma sugestão como ideia própria, ainda não discutida; `/tabularium-entrevistar` a recebe depois pelo número. Escolher o destino "criar issue" é o pedido de criação. O rastreador é o GitHub, pelo comando `gh`.

Crie uma issue por sugestão:

- o título é `Ideia: ` e o título da sugestão;
- o rótulo é `especificação`, sem rótulo de estado, pela linha "Uma sugestão é criada" de `issue.md`, na pasta da skill `tabularium-registrar`, ao lado da pasta desta; crie-o no repositório se faltar;
- o corpo tem a forma abaixo. Escreva-o num arquivo temporário e passe-o com `--body-file`: os acentos chegam inteiros.

```markdown
## Resumo
- Proposto: o vendedor é avisado quando um pedido dele é cancelado

## Problema
- "Cancelar um pedido" (`PED-C31.1`) muda o pedido, e nada em Vendas diz como o vendedor fica sabendo

## Proposta
- o vendedor é avisado quando um pedido dele é cancelado

## Em aberto
- o aviso vale também para o pedido cancelado pelo próprio vendedor?

## Contexto
- sugestão do agente, em 2026-10-08, a partir de "Cancelar um pedido" (`PED-C31.1`); ainda não discutida com o autor
- nasceu da entrevista de #31
```

- `Problema` é o motivo da sugestão, e `Proposta`, o que ela acrescentaria: uma coisa por linha, sem prosa.
- `Em aberto` traz as dúvidas que a sugestão já levanta; sem nenhuma, a seção fica vazia.
- A última linha de `Contexto` só existe quando a entrevista desta conversa tem issue.

Depois acrescente à issue o comentário `## Ideia original`, com a sugestão como foi mostrada no passo 4: a entrevista troca o corpo pelo andamento, e o comentário guarda o que foi sugerido.

Feito quando a issue tem o corpo, o rótulo e o comentário.
