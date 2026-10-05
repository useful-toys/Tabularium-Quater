# AGENTS.md

Esta pasta guarda as decisões de uma especificação no formato Tabularium: o porquê dos itens que tinham alternativa. O que vale como requisito é a especificação; a decisão só explica. As decisões são lidas sob demanda, nunca por rotina.

Este arquivo é igual em todos os projetos. Ele descreve como trabalhar; as regras do formato estão na especificação do formato, que prevalece em caso de conflito.

## Quando ler uma decisão

- Quando precisar do porquê de um item que termina com `⟸ [Dnn]`.
- Antes de alterar, retirar ou mover um item que termina com `⟸ [Dnn]`: leia todas as decisões que ele cita.
- Para achar a decisão, procure o arquivo `Dnn-*.md` nas pastas. Sem partir de um item, use o `README.md` de cada pasta, se existir.
- Antes de escrever ou alterar uma decisão, leia `_convencoes.md` desta pasta.

## Ao responder perguntas

- Cite a decisão pelo código. A resolução vigente é a frase sob o título; as alternativas descartadas não valem.
- Se a resolução diverge do item que a cita, não escolha um lado: aponte os dois.
- Se o item não cita decisão, diga que o porquê não está registrado. Não deduza a justificativa.

## Regras que nunca se quebram

1. Uma decisão responde a uma só questão. Questão nova cria decisão nova; nunca acrescente uma segunda resolução a uma decisão existente.
2. Só edite a resolução quando a mesma questão ganha outra resposta.
3. Nunca reutilize um código. O próximo é o que `_contadores.md`, na pasta da especificação, guarda em `Decisões`, mais um. Na mesma mudança, atualize ali o número e o nome curto, que é o nome do arquivo da decisão sem o código. Um código que ainda não entrou na linha principal é provisório: se outra mudança entrou antes com o mesmo código, renumere o seu, no arquivo e nos itens que o citam.
4. Só registre uma decisão quando havia ao menos uma alternativa plausível. Não invente alternativas nem motivos: se o porquê não foi dito, pergunte.
5. A ligação é de mão única. Na especificação entra só a marca `⟸ [Dnn]` no fim do item; o texto da decisão nunca entra em área nem em `_produto.md`, e a decisão não cita os itens que a citam.
6. Use os termos da especificação, sem negrito. Nunca use um sinônimo proibido.
7. Nunca edite o `README.md` de uma pasta de decisões: é gerado por programa.

## Receitas

- **Registrar uma decisão:** na mesma mudança que o item que ela fundamenta. Crie `Dnn-nome-curto.md` na pasta da área do item, ou em `_produto/` se o item está em `_produto.md`. Escreva o título com a questão e o código, a resolução em uma frase sem ponto e vírgula, a lista `Contexto`, `Alternativas descartadas` e `Consequências`, e a seção `Histórico` com a data e `decisão criada`. Termine o item fundamentado com `⟸ [Dnn]`.
- **Citar outra decisão:** se o contexto é a resolução de outra decisão, termine o item do corpo com `⟸ [Dnn]`, em vez de repetir.
- **Rever uma decisão:** troque a resolução, mova a anterior para as alternativas descartadas, com o motivo, e acrescente uma entrada no topo do `Histórico`. Confira todos os itens que citam a decisão: algum pode deixar de valer.
- **Dividir uma decisão:** se a resolução precisa de duas frases, se uma alternativa responde a outra questão ou se dá para reverter só uma parte, são duas decisões. Crie a segunda com novo código e ajuste a marca de cada item que citava a primeira.
- **Resposta a uma pergunta aberta:** o enunciado da pergunta vira a questão, e as opções não escolhidas viram as alternativas descartadas.
- **Mover de pasta:** quando os itens de outra área passam a citar mais a decisão, mova o arquivo. O código e as citações não mudam.
- **Limpar decisões órfãs:** só a pedido, junto com a poda de lápides. Apague a decisão que nenhum item da especificação e nenhuma outra decisão cita; se ela era a única a citar outra, apague essa também.

## Depois de alterar

- Rode o verificador, se o projeto tiver um.
- Sem verificador, confira ao menos: título terminado em `?` e com o código do nome do arquivo; resolução em uma só frase; ao menos uma alternativa descartada, com motivo; seções na ordem; toda marca `⟸ [Dnn]` com arquivo correspondente; nenhuma decisão nova sem item que a cite.
- Resuma a mudança listando os códigos criados, revistos e apagados, e os itens que passaram a citar ou deixaram de citar cada um.

## Ao revisar

Proponha, sem fazer por conta própria: dividir a decisão cuja resolução tem mais de uma frase, que passa de 25 linhas ou que tem mais de 5 entradas no `Histórico`; mover a decisão que está na pasta de uma área que já não é a que mais a cita; limpar a decisão que nada cita.

## Quando parar e perguntar

- A mudança num item contraria uma decisão que ele cita.
- Não está claro se a questão é nova ou se é a mesma de uma decisão existente.
- O porquê de uma escolha não foi dito, e registrá-lo exigiria supor.
