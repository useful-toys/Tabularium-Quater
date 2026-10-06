# AGENTS.md

Esta pasta descreve a arquitetura do produto: as escolhas técnicas estratégicas, que guiam a implementação e são caras de trocar depois. O formato é experimental e ainda não faz parte da definição do Tabularium. A arquitetura é lida sob demanda, e quem decide o produto não precisa abri-la.

A gramática é a da especificação. As instruções de `../AGENTS.md` valem aqui, salvo o que este arquivo muda: identificadores que nunca voltam, lápides, termos em negrito na primeira menção, uma coisa por afirmação, e nada de histórico, justificativa ou explicação no texto.

## Quando ler a arquitetura

- Antes de implementar algo que cruza componentes, troca uma tecnologia ou muda um contrato entre componentes.
- Antes de criar um componente novo, para ver se ele já existe com outro nome.
- Quando a pergunta é como o produto é construído, e não o que ele faz.

## Antes de qualquer tarefa

1. Leia `../_convencoes.md` e depois `_convencoes.md` desta pasta, que só acrescenta à primeira.
2. Leia `_sistema.md`: áreas, externos, restrições globais e fluxos.
3. Leia só a área que a tarefa toca.

`ideia.md` e `decisoes.md` são memória informal de como este formato nasceu. Abra-os para entender por que o formato é assim; o que vale como arquitetura são os outros arquivos.

## Ao responder perguntas

- Responda a partir do texto e cite o identificador de origem.
- Se a resposta não está escrita, diga que é uma lacuna da arquitetura ou uma escolha tática, que está no código. Não deduza a arquitetura do código.
- O que o produto faz está na especificação: responda por ela e cite-a.

## Regras que nunca se quebram

1. Só entra a escolha estratégica. Antes de escrever qualquer linha, aplique o teste de `_convencoes.md`, seção `O que entra`, e pare no primeiro sim. Sem nenhum sim, a escolha é tática: deixe-a no código.
2. A ligação com a especificação é de mão única. A arquitetura cita identificadores da especificação; nos arquivos de `specs/` fora desta pasta, escreva só especificação.
3. Uma afirmação sobre o que o produto faz pertence à especificação. Se ela falta lá, proponha acrescentá-la lá e cite-a aqui com `realiza:`.
4. O código é a fonte do que ele já diz sem esforço. Versões exatas, listas de arquivos e assinaturas ficam nele.
5. Todo `local:` aponta para um caminho que existe no repositório.
6. Números saem de `_contadores.md` desta pasta, como na especificação. Antes de criar uma sigla, confira que ela não aparece nem ali nem em `../_contadores.md`.
7. Toda afirmação nova nasce `[ ]` e passa a `[x]` quando está construída por inteiro.
8. O formato é experimental e não previu tudo. Quando algo não se encaixa bem, pare e avise o usuário, conforme `Quando o formato não serve`. Escreva só o que cabe sem esforço.

## Onde colocar cada coisa

| O que | Onde |
| --- | --- |
| Em que um componente é feito | Linha de modelo `tecnologia:` |
| Onde ele mora no repositório | Linha de modelo `local:` |
| O que ele cumpre da especificação | Linha de modelo `realiza:`, com os identificadores |
| Dependência de outro componente ou de um externo | Linha de modelo `usa CARD **Nome**`, só em quem depende |
| Parte de um componente que é dado ou arquivo | Linha de modelo `nome: descrição` |
| Restrição técnica de um componente | R no bloco dele |
| Restrição técnica do sistema inteiro | R em `Restrições globais` de `_sistema.md`, sigla `ARQ` |
| Limite técnico | Q, com número e unidade |
| O que um componente oferece a outros ou a quem usa o sistema | I no bloco dele; o contrato, em sub-itens |
| Colaboração entre componentes para cumprir uma capacidade | F em `Fluxos` de `_sistema.md`: `ARQ-Fn  Nome: [ID] → [ID]`, citando só I |
| Sistema ou serviço de fora de que a solução depende | `Externos` de `_sistema.md`, com sub-itens do que guarda ou fornece |
| O porquê de uma escolha | Decisão, citada com `⟸ [Dnn]`; o lugar das decisões da arquitetura ainda está em aberto, então pergunte antes de registrar |

## Receitas

- **Decidir se algo é componente:** é componente o que tem responsabilidade própria e poderia ser trocado inteiro. Uma função, uma tela ou um arquivo de apoio são parte de um componente e ficam no código.
- **Criar um componente:** escolha a sigla, acrescente um item em `_contadores.md` para cada papel que ele usar, e escreva título, frase de definição compreensível fora do bloco, e as linhas na ordem: modelo, R, Q, I.
- **Acrescentar uma afirmação:** aplique o teste, ache o componente dono, use o próximo número e atualize o contador.
- **Criar uma área:** só quando um componente central e os que dependem dele se relacionam mais entre si do que com o resto. Acrescente-a na tabela de áreas de `_sistema.md`.
- **Mudar um componente de lugar no repositório:** atualize `local:` na mesma mudança.
- **Retirar ou mover uma afirmação:** lápide no lugar, como na especificação.

## Depois de alterar

Confira ao menos: cada linha nova passa no teste do que entra; todo `local:` existe; toda referência `[ID]` resolve, aqui ou na especificação; nenhuma sigla repetida entre componentes e células; `_contadores.md` com o número e o nome curto de cada alocação nova; linhas na ordem fixa; primeira menção de cada termo em negrito.

Resuma a mudança listando os identificadores criados, alterados e retirados.

## Ao revisar

Proponha, sem fazer por conta própria: retirar a afirmação que deixou de passar no teste do que entra; levar para a especificação a afirmação que descreve o que o produto faz; acrescentar `realiza:` ao componente que não cita nenhuma afirmação da especificação, ou apontar que a especificação tem uma lacuna.

## Quando o formato não serve

Algo não se encaixa bem quando, para escrevê-lo, seria preciso:

- usar um papel com um sentido que a legenda não dá a ele, ou escolher entre dois papéis sem que nenhum sirva;
- usar uma linha de modelo fora das previstas, ou torcer uma delas;
- dividir em vários componentes o que é uma coisa só, ou juntar num componente o que são várias;
- deixar de fora, por causa do teste do que entra, algo que claramente guia a implementação; ou aceitar algo que claramente é detalhe;
- escrever prosa, uma tabela ou uma seção que o formato não tem.

Nesses casos, deixe a especificação da arquitetura como está e diga ao usuário:

1. o que precisava ser registrado, em uma ou duas frases;
2. os lugares que você tentou e por que cada um não serviu;
3. uma sugestão de como o formato poderia evoluir para cobrir o caso, e o que mais ela afetaria.

Quem decide se o formato evolui é o usuário. Só altere `_convencoes.md` ou este arquivo depois que ele decidir, e registre a mudança em `decisoes.md`.

## Quando parar e perguntar

- Algo não se encaixa bem no formato: siga a seção acima.
- Não está claro se a escolha é estratégica ou tática.
- A afirmação parece ser sobre o que o produto faz, e a especificação não a tem.
- A mudança contraria uma restrição escrita.
- A escolha precisa de um porquê, e ele não foi dito.
