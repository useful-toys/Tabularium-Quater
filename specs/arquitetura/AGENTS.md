# AGENTS.md

Esta pasta é a especificação de arquitetura do produto: as escolhas técnicas estratégicas, que guiam a implementação e são caras de trocar depois. O formato é experimental e ainda não faz parte da definição do Tabularium. A arquitetura é lida sob demanda, e quem decide o produto não precisa abri-la.

A gramática é a da especificação. As instruções de `../AGENTS.md` valem aqui, salvo o que este arquivo muda: identificadores que nunca voltam, lápides, termos em negrito na primeira menção, uma coisa por afirmação, e nada de histórico, justificativa ou explicação no texto.

## O formato é uma proposta

Este formato nasceu das situações vividas até agora e não está fechado. Ele existe para servir aos valores da especificação do produto, em `README.md` na raiz, seção `Valores`, lendo componente onde se lê célula, e sem o valor `Não técnica`, porque as questões técnicas começam aqui. Se o formato e um valor divergem, vale o valor.

Seja cético quanto ao formato, e também quanto a este arquivo e a `_convencoes.md`:

- Não pergunte só se o que você quer registrar cabe. Pergunte se o formato o escreve bem: numa linha, uma coisa só; sem repetir o que está em outro lugar; com cada termo uma vez; verificável; num lugar onde um agente o ache.
- Caber com esforço é mau encaixe. Se, para escrever, você repetiria algo, juntaria duas coisas numa linha, usaria um papel por aproximação ou deixaria a afirmação sem como verificar, o formato é que deve ser questionado.
- Não force. Não escreva o que encaixa mal, e não troque a escolha por outra que encaixe melhor: o formato é que serve à arquitetura, e não o contrário.
- Se o formato poderia evoluir para encaixar melhor, avise o usuário antes de escrever, conforme `Quando o formato não serve`.

## Quando ler a arquitetura

- Antes de implementar algo que cruza componentes, troca uma tecnologia ou muda um contrato entre componentes.
- Antes de criar um componente novo, para ver se ele já existe com outro nome.
- Quando a pergunta é como o produto é construído, e não o que ele faz.

## Antes de qualquer tarefa

1. Leia `../_convencoes.md` e depois `_convencoes.md` desta pasta, que só acrescenta à primeira.
2. Leia `_sistema.md`: externos, restrições globais e fluxos.
3. Leia só a área que a tarefa toca. Para escolher, leia `README.md`, o índice gerado das áreas, que traz a frase de cada uma e os componentes dela; se ele não existe, as áreas são os arquivos `.md` desta pasta que a legenda não lista pelo nome.

`ideia.md` e `decisoes.md`, quando existem, são memória informal de como este formato nasceu. Abra-os para entender por que o formato é assim; o que vale como arquitetura são os outros arquivos.

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
6. Todo código novo leva o prefixo da mudança e o número de ordem, como manda a regra 1 de `../AGENTS.md`. Antes de criar uma sigla, confira que nenhum componente, nenhuma célula e nenhum item da interface a tem: procure-a em toda a pasta `specs/`.
7. Toda afirmação nova nasce `[ ]` e passa a `[x]` quando está construída por inteiro.
8. O formato é uma proposta e não previu tudo. Quando algo não se encaixa bem, ou se encaixa só ferindo um valor da especificação, pare e avise o usuário, conforme `Quando o formato não serve`. Escreva só o que cabe sem esforço.

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
| O porquê de uma escolha que tinha alternativa | Decisão em `decisoes/` desta pasta, na subpasta da área, citada com `⟸ [Dnn]` |

## Receitas

- **Decidir se algo é componente:** é componente o que tem responsabilidade própria e poderia ser trocado inteiro. Uma função, uma tela ou um arquivo de apoio são parte de um componente e ficam no código.
- **Criar um componente:** escolha a sigla, conforme a regra 6, e escreva título, frase de definição compreensível fora do bloco, e as linhas na ordem: modelo, R, Q, I.
- **Acrescentar uma afirmação:** aplique o teste, ache o componente dono e componha o identificador conforme a regra 6.
- **Criar uma área:** só quando um componente central e os que dependem dele se relacionam mais entre si do que com o resto. Crie o arquivo com o título, a frase que diz o que a área reúne e a linha `- componente central: **Componente**`.
- **Mudar um componente de lugar no repositório:** atualize `local:` na mesma mudança.
- **Registrar uma decisão:** siga `../decisoes/AGENTS.md`, com três diferenças: o arquivo mora em `decisoes/` desta pasta, na subpasta da área do item, ou em `_sistema/` se o item está em `_sistema.md`; o item que a cita é desta pasta; e o código é único entre as decisões das três pastas.
- **Citar uma decisão:** um item desta pasta cita decisão desta pasta ou da especificação, nunca da interface. A decisão que a interface também cita mora aqui.
- **Retirar ou mover uma afirmação:** lápide no lugar, como na especificação.

## Depois de alterar

Rode o validador, pela skill `tabularium-validar`: desta pasta ele confere só as decisões e as citações de decisão. Confira você ao menos: cada linha nova passa no teste do que entra; todo `local:` existe; toda referência `[ID]` resolve, aqui ou na especificação; nenhuma sigla repetida entre componentes e células; cada código novo com o prefixo da mudança, e nenhum código antigo trocado; linhas na ordem fixa; primeira menção de cada termo em negrito.

Nunca edite o `README.md` desta pasta nem os das pastas de decisões: são índices. Refaça-os depois de validar, pela skill `tabularium-indexar`.

Resuma a mudança listando os identificadores criados, alterados e retirados.

## Ao revisar

Proponha, sem fazer por conta própria: retirar a afirmação que deixou de passar no teste do que entra; levar para a especificação a afirmação que descreve o que o produto faz; acrescentar `realiza:` ao componente que não cita nenhuma afirmação da especificação, ou apontar que a especificação tem uma lacuna.

Aponte também onde o formato forçou o texto: a repetição, a linha com duas coisas, o papel usado por aproximação, a afirmação que não se verifica. Cada um é um aviso ao usuário, conforme `Quando o formato não serve`.

## Quando o formato não serve

Algo não se encaixa bem quando, para escrevê-lo, seria preciso:

- usar um papel com um sentido que a legenda não dá a ele, ou escolher entre dois papéis sem que nenhum sirva;
- usar uma linha de modelo fora das previstas, ou torcer uma delas;
- dividir em vários componentes o que é uma coisa só, ou juntar num componente o que são várias;
- deixar de fora, por causa do teste do que entra, algo que claramente guia a implementação; ou aceitar algo que claramente é detalhe;
- escrever prosa, uma tabela ou uma seção que o formato não tem;
- repetir o que já está escrito em outro lugar, ou escrever numa linha duas coisas que mudariam por motivos diferentes;
- escrever uma afirmação que ninguém consegue verificar.

Nesses casos, não escreva o que não encaixa; o que cabe sem esforço pode ser escrito. Antes de escrever, leia `_achados.md`: se o tipo de problema já está lá, aplique o estado dele. Senão, avise o usuário:

1. o problema: o que precisava ser registrado e qual valor da especificação o formato fere, em uma ou duas frases;
2. um exemplo concreto: a linha que você escreveria, ou o conteúdo real, e os lugares que você tentou, com o porquê de cada um não servir;
3. uma proposta de como o formato poderia evoluir para cobrir o caso, e o que mais ela afetaria.

Avise uma vez por tipo de problema em cada conversa e junte as ocorrências, em vez de parar a cada uma. Se houver mais de um tipo, comece pelo que mais pesa. Não proponha a mudança como decidida e não a aplique.

O usuário decide, por tipo de problema:

- **forçar**, porque o encaixe procede: escreva como o exemplo, e registre em `_achados.md` o estado `forçado`, a forma escrita e os componentes onde a usou;
- **anotar sem issue**: registre em `_achados.md` o estado `anotado`, e não escreva o item;
- **anotar com issue**: registre como acima e, só com o sim do usuário, abra a issue conforme `Achados do formato`; o estado é `issue` e o link.

Enquanto o usuário não decide, não escreva o item e siga com o resto.

Quem decide se o formato evolui é o usuário, e a evolução se faz no repositório do Tabularium. `_convencoes.md` e este arquivo são iguais em todos os projetos, e a instalação os sobrescreve: só os altere lá, depois que ele decidir, e registre a mudança no `decisoes.md` de lá. A entrada `forçado` vale só no projeto: não altera a legenda.

## Achados do formato

`_achados.md`, nesta pasta, é opcional e não faz parte do formato. Cada entrada é um tipo de problema, escrita como o corpo de uma issue:

- `## Título`, uma frase que diz o problema, e a linha `estado:` (`anotado`, `forçado` ou `issue: <link>`);
- `### Resumo`, `### Problema`, `### Exemplo`, `### Proposta`, `### Em aberto` e `### Contexto`, em listas, uma coisa por linha;
- `Contexto` traz a data, o repositório e as ocorrências: os componentes e os itens que pararam ali.

Para abrir a issue, use `gh issue create --repo useful-toys/Tabularium-Quater`: título `Ideia: …`, rótulos `enhancement` e `em discussão`, e as seções da entrada como corpo, sem a linha `estado:`. Escreva o corpo num arquivo temporário e passe-o com `--body-file`. Cada entrada que o usuário leva ao Tabularium e decide, ou descarta, ele manda apagar.

Leia `_achados.md` também antes de implementar ou responder sobre um componente que ele cita: o que ficou de fora não está no bloco.

## Quando parar e perguntar

- Algo não se encaixa bem no formato: siga a seção acima.
- Não está claro se a escolha é estratégica ou tática.
- A afirmação parece ser sobre o que o produto faz, e a especificação não a tem.
- A mudança contraria uma restrição escrita.
- A escolha precisa de um porquê, e ele não foi dito.
