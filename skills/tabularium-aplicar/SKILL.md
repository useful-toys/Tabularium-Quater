---
name: tabularium-aplicar
description: Confere a ramificação de uma ideia do Tabularium que chegou ao consenso e a entrega na linha principal.
disable-model-invocation: true
---

# Conferir e entregar a ramificação da ideia

Você entrega na linha principal o que `/tabularium-entrevistar` gravou na **ramificação da ideia**. O conteúdo foi todo decidido na entrevista: aqui você **confere** e **entrega**, sem decidir nada. Diante de qualquer dúvida de conteúdo, você **devolve**: para, diz o que encontrou e manda a parte de volta a `/tabularium-entrevistar`.

A forma do andamento está em `andamento.md`, na pasta da skill `tabularium-entrevistar`, ao lado da pasta desta. Quando a ideia tem issue, você grava nela a entrega e a devolução, pelas receitas de `issue.md`, na pasta da skill `tabularium-registrar`: leia-o assim que souber que a ideia tem issue.

## 1. Receber a ramificação

- **Com o número ou o link de uma issue:** leia com `gh issue view <número ou link> --json number,body,labels,state`. Se o comando falhar, diga ao autor que a issue não foi encontrada e encerre. Se o rótulo não é `consenso`, diga qual é e encerre. Passe para a ramificação que a linha `Ramificação` do andamento nomeia.
- **Sem número:** a ramificação é a atual. Se ela é a linha principal, diga que não há ramificação de ideia a entregar e encerre.

Só se entrega a ideia sem nada por decidir. Devolva se o andamento tem item em `Em aberto`, ou se a entrevista desta conversa ainda tem item sem objeção. Sem andamento e sem entrevista nesta conversa, pergunte ao autor se algo ficou por decidir.

Feito quando você está na ramificação da ideia, e nada dela está por decidir.

## 2. Trazer a linha principal

A linha principal pode ter mudado desde que a ideia começou. Atualize-a e mescle-a na ramificação. Se nada mudou em `specs/`, siga para o passo 3.

Confronte com o que a ramificação gravou cada mudança que veio da linha principal, e devolva se:

- uma linha que a ramificação alterou ou retirou mudou também na linha principal;
- algo que entrou contraria o que a ramificação gravou: uma regra nova, um termo com o mesmo nome, uma decisão revista.

O conflito de mesclagem que é só de posição, como duas linhas acrescentadas no fim do mesmo papel, você resolve mantendo as duas. O que pede escolher entre dois textos, você devolve.

Se a linha principal passou a ter um código que a ramificação também criou, o da ramificação ainda não é definitivo e é ele que muda: peça um código novo à skill `tabularium-alocar-codigo`, com o mesmo prefixo, e troque-o na linha e em cada citação que a ramificação fez dele. A troca é de forma: faça um commit com ela e siga.

Feito quando a ramificação contém a linha principal, e cada mudança que veio dela foi confrontada.

## 3. Conferir

Compare a ramificação com a linha principal, com `git diff <linha principal> -- specs/`, e passe por todas as conferências antes de corrigir qualquer coisa:

1. **Forma:** rode o validador, pela skill `tabularium-validar`, até `nenhuma violação`.
2. **Códigos definitivos:** todo código que está na linha principal continua na ramificação, com o mesmo significado ou como lápide, conforme as regras 1 e 2 de `specs/AGENTS.md`.
3. **Códigos novos:** cada um leva o prefixo da ramificação, e nenhum foi alocado só com um número.
4. **Lápides:** nenhuma aponta para um código que a própria ramificação criou e apagou.
5. **Decisões:** cada decisão nova é citada por algum item, e tem contexto, alternativa descartada com motivo e consequências.
6. **O que o validador não vê:** siga "Depois de alterar" do `AGENTS.md` de cada registro que a ramificação tocou.
7. **Índices:** rode o indexador, pela skill `tabularium-indexar`, até `nenhum índice mudou`, e faça um commit com os índices que ele gravou.

Corrija o que é só de forma, e faça um commit com as correções. Se a correção muda o texto ou o significado de uma linha, devolva.

Feito quando as sete conferências passam.

## 4. Entregar

Mostre ao autor o que a ramificação muda ao todo, cada item com o nome e o código entre parênteses: afirmações criadas, alteradas e retiradas, termos, decisões e perguntas. Peça a confirmação da entrega, numa pergunta só para isso.

Depois do sim, entregue pelo fluxo do repositório: se o `AGENTS.md` da raiz diz como uma mudança entra na linha principal, siga-o e pare onde ele manda. Sem fluxo escrito, mescle a ramificação na linha principal. O envio ao servidor continua a pedido.

Se a ideia tem issue, feche-a quando a entrega estiver na linha principal do servidor, pela linha "A entrega chega à linha principal do servidor" de `issue.md`. Enquanto o envio não foi pedido, ela fica aberta: diga isso ao autor.

Feito quando a ramificação está na linha principal, ou parada no ponto que o fluxo do repositório manda, e a issue, se há uma, está fechada ou o autor sabe o que falta para fechá-la.

## 5. Relatar

Diga o que foi entregue e onde, e se a issue foi fechada.

## Devolver

Você devolve quando a entrega pede uma decisão que não foi tomada:

- algo da ideia ainda está por decidir;
- a linha principal mudou o que a ramificação alterou, ou algo novo a contraria;
- uma conferência só passa mudando o significado de uma linha;
- falta um valor, um motivo, o contexto ou as consequências de uma decisão.

Ao devolver, diga ao autor qual item parou e o que você encontrou. A ramificação fica como está. Se a ideia tem issue, acrescente em `Em aberto` do andamento o item que parou, com o que você encontrou, grave-o por "Gravar o andamento" de `issue.md`, e ajuste o estado para `em-entrevista`: a sessão que retoma lê ali por que a ideia voltou. Sugira `/tabularium-entrevistar`, com o número da issue se houver uma.
