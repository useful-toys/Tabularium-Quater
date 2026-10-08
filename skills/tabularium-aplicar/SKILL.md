---
name: tabularium-aplicar
description: Aplica em specs/ as mudanças de uma ideia do Tabularium que chegou ao consenso.
disable-model-invocation: true
---

# Aplicar o plano na especificação

Você escreve em `specs/` as mudanças de um **plano** com consenso. O trabalho é **mecânico**: o conteúdo foi todo decidido na entrevista, e você escreve o texto do plano como ele está. Diante de qualquer dúvida de conteúdo, você **devolve**: para, diz o que encontrou e manda a parte de volta a `/tabularium-entrevistar`.

A forma do plano está em `plano.md`, na pasta da skill `tabularium-entrevistar`, ao lado da pasta desta.

## 1. Receber o plano

- **Com o número ou o link de uma issue:** leia com `gh issue view <número ou link> --json number,body,labels,state`. Se o comando falhar, diga ao autor que a issue não foi encontrada e encerre. Se o rótulo não é `consenso`, diga qual é e encerre. O plano é o corpo.
- **Sem número:** o plano é o desta conversa, se o autor confirmou o consenso nela. Sem consenso confirmado, diga isso e encerre.

Um plano com alguma linha `· sem objeção`, ou com item em `Em aberto`, ainda não tem consenso: devolva.

Feito quando você tem um plano com consenso, sem linha sem objeção e com `Em aberto` vazio.

## 2. Confrontar com a linha principal

A especificação pode ter mudado desde o consenso. Atualize a cópia de trabalho com a linha principal e veja o que mudou em `specs/` desde o commit que a linha `Estado` do Resumo guarda. Se nada mudou, siga para o passo 3.

Confronte cada mudança encontrada com o plano, e devolva se:

- uma linha que o plano altera ou retira já não tem o texto que tinha no consenso;
- algo que entrou depois contraria uma linha do plano: uma regra nova, um termo com o mesmo nome, uma decisão revista.

No plano que vem desta conversa, sem issue, a especificação lida pela entrevista é a de agora: siga direto para o passo 3.

Feito quando cada mudança em `specs/` desde o consenso foi confrontada com o plano.

## 3. Escrever

Aplique cada item de `Mudanças` e de `Decisões`, na ordem do plano, pela receita que o item pede:

- produto: "Receitas" de `specs/AGENTS.md`;
- arquitetura e interface: "Receitas" do `AGENTS.md` de cada pasta;
- decisões: "Receitas" de `specs/decisoes/AGENTS.md`.

O que é seu, e só isto: trocar cada `?` pelo próximo número dos contadores, levar o código alocado de cada decisão a todos os itens que a citam, pôr cada linha na posição do seu papel, deixar as lápides e atualizar os contadores.

Só `Mudanças` e `Decisões` são aplicadas. O que está em `Fora do plano` fica como está na especificação, inclusive a marca de uma afirmação com defeito.

Feito quando cada item de `Mudanças` e de `Decisões` está escrito.

## 4. Validar

Siga "Depois de alterar" de `specs/AGENTS.md`. Corrija a violação que é só de forma. Se a correção muda o texto ou o significado de uma linha do plano, devolva.

Feito quando o validador responde `nenhuma violação`.

## 5. Relatar

Liste o que foi criado, alterado e retirado, cada item com o nome e o código entre parênteses: afirmações, termos, decisões e perguntas. Sugira `/tabularium-registrar`, e deixe o autor acioná-la.

## Devolver

Você devolve quando o plano pede uma decisão que não está nele:

- falta um valor, um motivo, o contexto ou as consequências de uma decisão;
- não está claro em qual célula uma linha entra;
- o texto existente mudou, ou algo novo contraria o plano;
- o validador pede uma mudança de significado.

Ao devolver, diga ao autor qual item do plano parou, o que você encontrou e o que já foi escrito. Se já escreveu parte do plano, pergunte se ele quer desfazer. A ideia volta para `em discussão` e precisa de novo consenso: sugira `/tabularium-entrevistar` com o número da issue, e `/tabularium-registrar` para gravar a volta.
