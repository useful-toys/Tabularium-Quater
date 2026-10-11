---
name: tabularium-sugerir
description: Sugere ao autor ideias que complementam uma ideia do Tabularium já discutida, ou uma área da especificação.
disable-model-invocation: true
---

# Sugerir o que complementa a ideia

Você traz **sugestões**: ideias suas, vizinhas de uma ideia que o autor já discutiu ou de uma área que já está escrita. Você só lê e sugere. Quem decide é o autor, e a sugestão que ele aceita volta para `/tabularium-entrevistar`, onde é interrogada como qualquer outra parte da ideia. Nada do que você sugere é gravado em `specs/` por esta skill.

## 1. Receber o alvo

O **alvo** é aquilo que as sugestões complementam:

- **Há uma entrevista nesta conversa:** o alvo é a ideia dela, com o que a ramificação gravou e o que está no plano.
- **O autor nomeou uma área ou uma célula:** o alvo é ela, como está escrita.
- **Nenhum dos dois:** pergunte ao autor o que ele quer complementar.

Feito quando você sabe o alvo.

## 2. Ler em volta do alvo

Leia o alvo por inteiro, e o que fica ao lado dele: as outras células da área, o que o Índice da área diz que ela usa de fora, as reações de outras áreas aos eventos dela, os atores, as jornadas e o `Fora de escopo` de `specs/_produto.md`. Se o alvo é uma ideia em discussão, veja o que a ramificação gravou com `git diff <linha principal> -- specs/`.

Feito quando você leu o alvo e cada vizinho dele.

## 3. Procurar as sugestões

Procure o que está **ao lado** do alvo, e não dentro dele:

- o passo antes e o passo depois: o que o ator faz logo antes e logo depois do que o alvo descreve;
- o outro lado: quem mais participa ou é afetado, e o que ele precisaria ver ou fazer;
- a visão que falta: o que quem age precisa ver para decidir, e o que ele vê depois de agir;
- a reação que falta: o fato do alvo que outra célula deveria perceber;
- o caminho de volta: como se desfaz ou se corrige o que o alvo permite.

Cada sugestão tem um **motivo**: a linha da especificação que a provoca, ou a ausência que você procurou e confirmou. Descarte a que não tem um, e também:

- o que a especificação já diz, escrito ou pendente: procure antes de sugerir;
- o que `Fora de escopo` exclui, e o que o plano já traz em `Fora do plano`;
- o que falta dentro da própria ideia, como um limite ou uma exceção: é condição de contorno, e pertence à entrevista;
- qualidade geral, como auditoria, desempenho ou acessibilidade: pertence a "Ao revisar" de `specs/AGENTS.md`;
- escolha de arquitetura, de interface ou de código.

Fique com as cinco de motivo mais forte, no máximo. Menos de cinco é resultado normal, e nenhuma também: diga isso ao autor em vez de completar a lista.

Feito quando cada sugestão que sobrou tem um motivo que você pode citar.

## 4. Mostrar

Mostre as sugestões de uma vez, da mais ligada ao alvo para a menos, cada uma nesta forma:

```markdown
### Sugestão 1/3 · Avisar o vendedor do cancelamento

**Motivo.** "Cancelar um pedido" (`PED-C31.1`) muda o pedido, e nada em Vendas diz como o vendedor fica sabendo.

**O que acrescentaria.** O vendedor é avisado quando um pedido dele é cancelado.
```

Pergunte ao autor o destino de cada uma: aceitar, recusar ou guardar para depois.

Feito quando cada sugestão tem um destino dado pelo autor.

## 5. Encaminhar

| Destino | O que fazer |
| --- | --- |
| Aceita | É uma parte nova da ideia. Havendo entrevista nesta conversa, ela entra na fronteira, pelo passo "Quebrar a ideia em partes" de `/tabularium-entrevistar`. Sem entrevista, sugira acionar `/tabularium-entrevistar` com ela |
| Recusada | Entra em `Fora do plano`, como `Sugestão recusada`, para não voltar numa retomada. Sem plano, é só descartada |
| Guardada | É uma ideia própria: sugira `/tabularium-registrar`, que a separa numa issue |

Feito quando cada sugestão foi encaminhada, e você disse ao autor quais voltaram para a entrevista.
