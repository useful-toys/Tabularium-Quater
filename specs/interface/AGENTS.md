# AGENTS.md

Esta pasta descreve a interface do produto: os componentes, os padrões, os estilos e as diretrizes que valem em mais de um lugar. O formato é experimental e ainda não faz parte da definição do Tabularium. A interface é lida sob demanda, e quem decide o produto não precisa abri-la.

A gramática é a da especificação. As instruções de `../AGENTS.md` valem aqui, salvo o que este arquivo muda: identificadores que nunca voltam, lápides, termos em negrito na primeira menção, uma coisa por afirmação, e nada de histórico, justificativa ou explicação no texto.

## Quando ler a interface

- Antes de implementar ou alterar qualquer coisa que o ator vê ou opera.
- Antes de criar um componente, para ver se ele já existe, e antes de escolher uma cor, uma fonte ou uma medida, para ver se já há um estilo.
- Quando a pergunta é como o produto se apresenta, e não o que ele faz.

## Antes de qualquer tarefa

1. Leia `../_convencoes.md` e depois `_convencoes.md` desta pasta, que só acrescenta à primeira.
2. Leia `_interface.md`: áreas, meios, estilos e diretrizes.
3. Leia só a área que a tarefa toca.
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
4. A unidade é o componente, não a tela. Não escreva blocos de tela, a lista de componentes de uma tela, nem wireframes.
5. Um controle não ganha bloco: aparece em `partes:` do componente. O que só faz sentido dentro de um componente é parte dele.
6. Use as palavras do vocabulário da legenda com o sentido que ela dá, sem negrito. Não invente sinônimo para uma delas.
7. Cor, fonte e medida que valem em mais de um lugar são estilos, com nome e papel. Cite o estilo em negrito, e não o valor. O valor de máquina fica no código.
8. Cada afirmação é verificável no produto. Uma intenção, como "a interface é agradável", não entra.
9. Todo `local:` aponta para um caminho que existe no repositório.
10. Números de identificador saem de `_contadores.md` desta pasta; códigos `Dnn` e `Pnn`, de `../_contadores.md`, que você atualiza na mesma mudança. Antes de criar uma sigla, confira que ela não aparece em nenhum arquivo de contadores de `specs/`.
11. Toda afirmação nova nasce `[ ]` e passa a `[x]` quando o produto a cumpre por inteiro, com evidência.
12. O formato é experimental e não previu tudo. Quando algo não se encaixa bem, pare e avise o usuário, conforme `Quando o formato não serve`. Escreva só o que cabe sem esforço.

## Onde colocar cada coisa

| O que | Onde |
| --- | --- |
| De que tipo é o componente | Linha de modelo `tipo:`, com um tipo do vocabulário ou, em negrito, um tipo da aplicação; omitida se nenhum serve |
| O que vários componentes da mesma espécie têm em comum | Bloco de tipo da aplicação, citado por eles em `tipo:` |
| Os controles de um componente, na ordem | Linha de modelo `partes:` |
| Como o componente pode estar | Linha de modelo `situações:` |
| Componente dentro de componente | Linha de modelo `usa CARD **Componente**`, só em quem contém |
| Solução recorrente a que o componente obedece | Linha de modelo `segue **Padrão**` |
| O que o componente apresenta da especificação | Linha de modelo `realiza:`, com os identificadores |
| Onde ele mora no código | Linha de modelo `local:` |
| Posição, aparência ou comportamento sempre verdadeiro de um componente | R no bloco dele |
| O mesmo, valendo para a interface inteira | R em `Diretrizes` de `_interface.md`, sigla `IFC` |
| Limite que se mede: tempo, tamanho, contraste | Q, com número e unidade |
| O que o ator faz com o componente e o que o produto responde | I no bloco dele; a resposta, em sub-itens |
| O que muda de um meio para outro | Sub-item iniciado pelo nome do meio |
| Solução que atravessa componentes | Bloco de padrão, com `tipo: padrão` e sem `partes:` |
| Cor, tipografia ou medida com nome | `Estilos` de `_interface.md` |
| Onde a interface aparece | `Meios` de `_interface.md` |
| O porquê de uma escolha que tinha alternativa | Decisão em `decisoes/` desta pasta, citada com `⟸ [Dnn]` |
| Dúvida sobre algo já comprometido | Pergunta em `_perguntas.md` desta pasta |

## Receitas

- **Decidir se algo é componente:** é componente o conjunto de controles que se coordenam para um objetivo e que pode aparecer em mais de um lugar. Um controle sozinho é parte. Uma solução sem controles próprios, que vários componentes seguem, é padrão. Uma frase que vale para tudo é diretriz.
- **Criar um componente ou um padrão:** escolha a sigla, acrescente um item em `_contadores.md` para cada papel que ele usar, e escreva título, frase de definição compreensível fora do bloco, e as linhas na ordem: modelo, R, Q, I.
- **Escolher o tipo:** use um tipo do vocabulário, se algum serve. Não invente palavra: se nenhum serve, omita a linha. Um componente tem no máximo um tipo.
- **Criar um tipo da aplicação:** só quando dois ou mais componentes são a mesma espécie de coisa e têm afirmações em comum. Escreva o bloco do tipo como o de um componente, com as afirmações comuns, e faça cada componente citá-lo com `tipo: **Nome**`. O componente herda as linhas do tipo e não as repete.
- **Tipo ou padrão:** o tipo diz o que o componente é, e ele só tem um. O padrão diz um comportamento que ele segue, e ele pode seguir vários.
- **Componente que foge do padrão ou do tipo num ponto:** escreva no componente a afirmação que vale para ele e termine-a com `ao contrário de [ID]`, citando a afirmação do padrão ou do tipo. Não altere o padrão para acomodar o caso. Se vários componentes fogem do mesmo ponto, o padrão é que está errado: proponha revê-lo.
- **Componente que apresenta uma célula:** pode ter o nome da célula; a sigla é outra. Cite com `realiza:` as afirmações dela que ele apresenta.
- **Acrescentar uma afirmação:** aplique os dois testes, ache o dono, use o próximo número e atualize o contador.
- **Criar um estilo:** confira antes se já existe um com o mesmo papel. Dê um nome que diga o papel, e não o valor. Escreva o valor só quando ele é compromisso.
- **Criar uma área:** só quando um componente central e os que dependem dele se relacionam mais entre si do que com o resto. Acrescente-a na tabela de áreas de `_interface.md`.
- **Registrar uma decisão:** siga `../decisoes/AGENTS.md`, com duas diferenças: o arquivo mora em `decisoes/` desta pasta, e o item que a cita é desta pasta.
- **Retirar ou mover uma afirmação:** lápide no lugar, como na especificação.

## Depois de alterar

O validador não lê esta pasta. Confira ao menos: cada linha nova passa nos dois testes; toda referência `[ID]` resolve, aqui ou na especificação; todo estilo, componente e padrão citado em negrito existe; todo `local:` existe; nenhuma sigla repetida; os contadores com o número e o nome curto de cada alocação nova; linhas na ordem fixa.

Resuma a mudança listando os identificadores criados, alterados e retirados, e os estilos criados ou renomeados.

## Ao revisar

Proponha, sem fazer por conta própria: retirar a afirmação que deixou de passar no teste do que entra; levar para a especificação a afirmação que sobrevive à troca de meio; trazer da especificação a que não sobrevive; transformar em estilo o valor que se repete em mais de um componente; transformar em padrão o comportamento que se repete em mais de um componente.

## Quando o formato não serve

Algo não se encaixa bem quando, para escrevê-lo, seria preciso:

- usar um papel com um sentido que a legenda não dá a ele, ou escolher entre dois papéis sem que nenhum sirva;
- usar uma linha de modelo fora das previstas, ou torcer uma delas;
- usar uma palavra do vocabulário com outro sentido, ou precisar de uma que ele não tem;
- dividir em vários componentes o que é uma coisa só, ou juntar num componente o que são várias;
- deixar de fora, por causa do teste do que entra, algo que claramente evita inconsistência; ou aceitar algo que claramente é detalhe de uma tela;
- escrever prosa, um desenho, uma tabela ou uma seção que o formato não tem.

Nesses casos, deixe a interface como está e diga ao usuário:

1. o que precisava ser registrado, em uma ou duas frases;
2. os lugares que você tentou e por que cada um não serviu;
3. uma sugestão de como o formato poderia evoluir para cobrir o caso, e o que mais ela afetaria.

Quem decide se o formato evolui é o usuário. Só altere `_convencoes.md` ou este arquivo depois que ele decidir.

## Quando parar e perguntar

- Algo não se encaixa bem no formato: siga a seção acima.
- Não está claro se a afirmação é da interface ou da especificação.
- A afirmação é sobre o que o produto faz, e a especificação não a tem.
- A mudança contraria uma diretriz ou um padrão escrito.
- A escolha precisa de um porquê, e ele não foi dito.
