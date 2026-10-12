# AGENTS.md

Esta pasta é a especificação de interface do produto: os componentes, os padrões, os estilos e as diretrizes que valem em mais de um lugar. O formato é experimental e ainda não faz parte da definição do Tabularium. A interface é lida sob demanda, e quem decide o produto não precisa abri-la.

A gramática é a da especificação. As instruções de `../AGENTS.md` valem aqui, salvo o que este arquivo muda: identificadores que nunca voltam, lápides, termos em negrito na primeira menção, uma coisa por afirmação, e nada de histórico, justificativa ou explicação no texto.

## O formato é uma proposta

Este formato nasceu das situações vividas até agora e não está fechado. Ele existe para servir aos valores da especificação do produto, em `README.md` na raiz, seção `Valores`, lendo componente onde se lê célula. Se o formato e um valor divergem, vale o valor.

Seja cético quanto ao formato, e também quanto a este arquivo e a `_convencoes.md`:

- Não pergunte só se o que você quer registrar cabe. Pergunte se o formato o escreve bem: numa linha, uma coisa só; sem repetir o que está em outro lugar; com cada termo uma vez; verificável; num lugar onde um agente o ache.
- Caber com esforço é mau encaixe. Se, para escrever, você repetiria algo, juntaria duas coisas numa linha, usaria um papel, um tipo ou uma palavra do vocabulário por aproximação ou deixaria a afirmação sem como verificar, o formato é que deve ser questionado.
- Não force. Não escreva o que encaixa mal, e não troque a escolha por outra que encaixe melhor: o formato é que serve à interface, e não o contrário.
- Se o formato poderia evoluir para encaixar melhor, avise o usuário antes de escrever, conforme `Quando o formato não serve`.

## Quando ler a interface

- Antes de implementar ou alterar qualquer coisa que o ator vê ou opera.
- Antes de criar um componente, para ver se ele já existe, e antes de escolher uma cor, uma fonte ou uma medida, para ver se já há um estilo.
- Quando a pergunta é como o produto se apresenta, e não o que ele faz.

## Antes de qualquer tarefa

1. Leia `../_convencoes.md` e depois `_convencoes.md` desta pasta, que só acrescenta à primeira.
2. Leia `_interface.md`: meios, estilos e diretrizes.
3. Leia só a área que a tarefa toca. Para escolher, leia `README.md`, o índice gerado das áreas, que traz a frase de cada uma e os componentes dela; se ele não existe, as áreas são os arquivos `.md` desta pasta que a legenda não lista pelo nome.
4. Abra uma decisão de `decisoes/` só quando precisar do porquê de um item que termina em `⟸ [Dnn]`, ou antes de alterá-lo.

`ideia.md` e `decisoes.md`, quando existem, são memória informal de como este formato nasceu. O que vale como interface são os outros arquivos.

## Ao responder perguntas

- Responda a partir do texto e cite o identificador de origem.
- Se a resposta não está escrita, diga que é uma lacuna da interface ou um detalhe de uma tela, que está no código. Não deduza a interface do código.
- O que o produto faz está na especificação: responda por ela e cite-a.

## Regras que nunca se quebram

1. Só entra o que passa no teste de `_convencoes.md`, seção `O que entra`. Aplique-o antes de escrever qualquer linha e pare no primeiro sim. Sem nenhum sim, é detalhe de uma tela: deixe-o no código.
2. A fronteira com a especificação é o teste da troca de meio. Se a afirmação continuaria verdadeira num outro meio, ela é da especificação: se falta lá, proponha acrescentá-la lá e cite-a aqui com `realiza:`.
3. A ligação com a especificação é de mão única. A interface cita identificadores e termos da especificação; nos arquivos de `specs/` fora desta pasta, escreva só especificação.
4. A tela é um componente do tipo `tela`, feito de outros componentes. O bloco dela diz quais componentes ela usa, na ordem em que aparecem, e o que vale para a tela inteira. Não escreva nele o que é de um componente, nem wireframes, nem posição em pixels.
5. Um controle não ganha bloco: aparece em `partes:` do componente. O que só faz sentido dentro de um componente é parte dele.
6. Use as palavras do vocabulário da legenda com o sentido que ela dá, sem negrito. Não invente sinônimo para uma delas.
7. Cor, fonte e medida que valem em mais de um lugar são estilos, com nome e papel. Cite o estilo em negrito, e não o valor. O valor de máquina fica no código.
8. Cada afirmação é verificável no produto. Uma intenção, como "a interface é agradável", não entra.
9. Todo `local:` aponta para um caminho que existe no repositório.
10. Todo código novo, de identificador, de decisão ou de pergunta, leva o prefixo da mudança e o número de ordem, como manda a regra 1 de `../AGENTS.md`. Antes de criar uma sigla, confira que nenhum componente, nenhuma célula e nenhum item da interface a tem: procure-a em toda a pasta `specs/`.
11. Toda afirmação nova nasce `[ ]` e passa a `[x]` quando o produto a cumpre por inteiro, com evidência.
12. O formato é uma proposta e não previu tudo. Quando algo não se encaixa bem, ou se encaixa só ferindo um valor da especificação, pare e avise o usuário, conforme `Quando o formato não serve`. Escreva só o que cabe sem esforço.

## Onde colocar cada coisa

| O que | Onde |
| --- | --- |
| De que tipo é o componente | Linha de modelo `tipo:`, com um tipo do vocabulário ou, em negrito, um tipo da aplicação; omitida se nenhum serve |
| O que vários componentes da mesma espécie têm em comum | Bloco de tipo da aplicação, citado por eles em `tipo:` |
| Os controles de um componente, na ordem | Linha de modelo `partes:` |
| Como o componente pode estar | Linha de modelo `situações:` |
| Componente dentro de componente | Linha de modelo `usa CARD **Componente**`, só em quem contém |
| Quais componentes uma tela tem | Linhas `usa` no bloco da tela, na ordem em que aparecem |
| O que vale para uma tela inteira | R no bloco da tela |
| Solução recorrente a que o componente obedece | Linha de modelo `segue **Padrão**` |
| O que o componente apresenta da especificação | Linha de modelo `realiza:`, com os identificadores |
| Onde ele mora no código | Linha de modelo `local:` |
| Posição, aparência ou comportamento sempre verdadeiro de um componente | R no bloco dele |
| O mesmo, valendo para a interface inteira | R em `Diretrizes` de `_interface.md`, sigla `IFC` |
| Limite que se mede: tempo, tamanho, contraste | Q, com número e unidade |
| O que o ator faz com o componente e o que o produto responde | I no bloco dele; a resposta, em sub-itens |
| O que muda de um meio para outro | Sub-item iniciado pelo nome do meio |
| Solução que atravessa componentes | Bloco de padrão, com `tipo: padrão` e sem `partes:` |
| Texto exato que é compromisso | Entre crases, na afirmação do componente que o mostra; o texto que não é compromisso fica no código |
| Cor, tipografia ou medida com nome | `Estilos` de `_interface.md` |
| Onde a interface aparece | `Meios` de `_interface.md` |
| O porquê de uma escolha que tinha alternativa | Decisão em `decisoes/` desta pasta, na subpasta da área, citada com `⟸ [Dnn]` |
| Dúvida sobre algo já comprometido | Pergunta em `_perguntas.md` desta pasta |

## Receitas

- **Decidir se algo é componente:** é componente o conjunto de controles que se coordenam para um objetivo e que pode aparecer em mais de um lugar. Um controle sozinho é parte. Uma solução sem controles próprios, que vários componentes seguem, é padrão. Uma frase que vale para tudo é diretriz.
- **Criar um componente ou um padrão:** escolha a sigla, conforme a regra 10, e escreva título, frase de definição compreensível fora do bloco, e as linhas na ordem: modelo, R, Q, I.
- **Criar uma tela:** escreva um bloco de componente com `tipo: tela`, sem `partes:`, e uma linha `usa` por componente, na ordem em que aparecem. O que é de um componente fica no bloco dele, mesmo que ele só apareça nessa tela.
- **Escolher o tipo:** use um tipo do vocabulário, se algum serve. Não invente palavra: se nenhum serve, omita a linha. Um componente tem no máximo um tipo.
- **Criar um tipo da aplicação:** só quando dois ou mais componentes são a mesma espécie de coisa e têm afirmações em comum. Escreva o bloco do tipo como o de um componente, com as afirmações comuns, e faça cada componente citá-lo com `tipo: **Nome**`. O componente herda as linhas do tipo e não as repete.
- **Tipo ou padrão:** o tipo diz o que o componente é, e ele só tem um. O padrão diz um comportamento que ele segue, e ele pode seguir vários.
- **Componente que foge do padrão ou do tipo num ponto:** escreva no componente a afirmação que vale para ele e termine-a com `ao contrário de [ID]`, citando a afirmação do padrão ou do tipo. Não altere o padrão para acomodar o caso. Se vários componentes fogem do mesmo ponto, o padrão é que está errado: proponha revê-lo.
- **Dar nome a um componente ligado a uma célula:** se a célula é do domínio e o componente só a mostra, dê a ele um nome próprio, que diga o que ele é na tela, como `Cartão de pedido` para a célula `Pedido`. Se o componente e a célula são a mesma coisa, como um menu descrito como célula, use o mesmo nome, com outra sigla, e avise o usuário: a célula é candidata a sair da especificação. Nos dois casos, cite com `realiza:` as afirmações dela que ele apresenta.
- **Acrescentar uma afirmação:** aplique os dois testes, ache o dono e componha o identificador conforme a regra 10.
- **Criar um estilo:** confira antes se já existe um com o mesmo papel. Dê um nome que diga o papel, e não o valor. Escreva o valor só quando ele é compromisso.
- **Criar uma área:** só quando um componente central e os que dependem dele se relacionam mais entre si do que com o resto. Crie o arquivo com o título, a frase que diz o que a área reúne e a linha `- componente central: **Componente**`.
- **Registrar uma decisão:** siga `../decisoes/AGENTS.md`, com três diferenças: o arquivo mora em `decisoes/` desta pasta, na subpasta da área do item, ou em `_interface/` se o item está em `_interface.md`; o item que a cita é desta pasta; e o código é único entre as decisões das três pastas.
- **Citar uma decisão:** um item desta pasta cita decisão desta pasta, da arquitetura ou da especificação.
- **Retirar ou mover uma afirmação:** lápide no lugar, como na especificação.

## Depois de alterar

Rode o validador, pela skill `tabularium-validar`: desta pasta ele confere só as decisões e as citações de decisão. Confira você ao menos: cada linha nova passa nos dois testes; toda referência `[ID]` resolve, aqui ou na especificação; todo estilo, componente e padrão citado em negrito existe; todo `local:` existe; nenhuma sigla repetida; cada código novo com o prefixo da mudança, e nenhum código antigo trocado; linhas na ordem fixa.

Nunca edite o `README.md` desta pasta nem os das pastas de decisões: são índices. Refaça-os depois de validar, pela skill `tabularium-indexar`.

Resuma a mudança listando os identificadores criados, alterados e retirados, e os estilos criados ou renomeados.

## Ao revisar

Proponha, sem fazer por conta própria: retirar a afirmação que deixou de passar no teste do que entra; levar para a especificação a afirmação que sobrevive à troca de meio; trazer da especificação a que não sobrevive; transformar em estilo o valor que se repete em mais de um componente; transformar em padrão o comportamento que se repete em mais de um componente.

Aponte também onde o formato forçou o texto: a repetição, a linha com duas coisas, o tipo ou a palavra do vocabulário usados por aproximação, a afirmação que não se verifica. Cada um é um aviso ao usuário, conforme `Quando o formato não serve`.

## Quando o formato não serve

Algo não se encaixa bem quando, para escrevê-lo, seria preciso:

- usar um papel com um sentido que a legenda não dá a ele, ou escolher entre dois papéis sem que nenhum sirva;
- usar uma linha de modelo fora das previstas, ou torcer uma delas;
- usar uma palavra do vocabulário com outro sentido, ou precisar de uma que ele não tem;
- dividir em vários componentes o que é uma coisa só, ou juntar num componente o que são várias;
- deixar de fora, por causa do teste do que entra, algo que claramente evita inconsistência; ou aceitar algo que claramente é detalhe de uma tela;
- escrever prosa, um desenho, uma tabela ou uma seção que o formato não tem;
- repetir o que já está escrito em outro lugar, ou escrever numa linha duas coisas que mudariam por motivos diferentes;
- escrever uma afirmação que ninguém consegue verificar no produto.

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
- Não está claro se a afirmação é da interface ou da especificação.
- A afirmação é sobre o que o produto faz, e a especificação não a tem.
- A mudança contraria uma diretriz ou um padrão escrito.
- A escolha precisa de um porquê, e ele não foi dito.
