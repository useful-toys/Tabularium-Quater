---
name: tabularium-entrevistar
description: Entrevista o autor sobre uma ideia e grava em specs/, a cada rodada, o que chegou ao consenso, na ramificação da ideia.
disable-model-invocation: true
---

# Entrevistar o autor sobre uma ideia

Você conduz uma **entrevista**: amadurece uma ideia com o autor, em rodadas de perguntas, e ao fim de cada rodada grava em `specs/` o que chegou ao **consenso**. Tudo é gravado na **ramificação da ideia**, nunca na linha principal. O que ainda não tem consenso fica na conversa, no [plano](plano.md). Quem guarda a ideia numa issue é `/tabularium-registrar`, e quem a entrega na linha principal é `/tabularium-aplicar`: sugira cada uma na hora dela e deixe o autor acioná-la.

Quatro coisas fazem a entrevista, e valem em todos os passos:

- **Implacável.** O seu trabalho é achar o furo da ideia: o que ela não previu, onde ela se contradiz, onde ela quebra. Classificar e gravar vêm depois disso. Uma resposta vaga não fecha a pergunta: insista até ela caber numa linha da especificação.
- **Fronteira.** As decisões da ideia formam uma árvore, e cada resposta do autor desbloqueia as perguntas que dependiam dela. Você pergunta só o que está na fronteira: o que as respostas dadas já desbloquearam. A resposta que falta você espera, em vez de supor.
- **Sugestão.** Toda pergunta leva a resposta que você recomenda, redigida para o autor poder responder só "sim".
- **Busca.** O autor responde decisões. O fato que está escrito em algum lugar você [busca antes de perguntar](#buscar-antes-de-perguntar).

As regras do formato estão em `specs/AGENTS.md` e `specs/_convencoes.md`; as de arquitetura e de interface, nos mesmos dois arquivos de `specs/arquitetura/` e de `specs/interface/`. Esta skill aponta para elas pelo título da seção, e são elas que valem.

## 1. Receber a ideia

O que o autor passou junto com o comando decide o começo:

- **Número ou link de uma issue:** leia com `gh issue view <número ou link> --json number,title,body,labels,state`. Se o comando falhar, diga ao autor que a issue não foi encontrada e encerre. Se o corpo tem as seções de um plano (`## Resumo` e `## Em aberto`), é uma **retomada**: o corpo é o estado da entrevista, e os comentários ficam sem ler. Senão, o corpo é a descrição da ideia.
- **Uma frase ou um texto:** é a descrição da ideia. A entrevista corre sem issue.
- **Nada:** se a ramificação atual já é a de uma ideia, pergunte se o autor quer continuá-la. Senão, pergunte qual ideia ele quer discutir.

Feito quando você tem a descrição da ideia, ou o plano de uma retomada.

## 2. Preparar a ramificação

A entrevista grava numa ramificação só dela. Veja a atual com `git branch --show-current` e pare no primeiro caso que servir:

| Situação | O que fazer |
| --- | --- |
| Retomada | Passe para a ramificação que a linha `Ramificação` do plano nomeia |
| A atual não é a linha principal | Continue nela: é a ramificação da ideia |
| A ideia veio de uma issue | Crie a ramificação ligada a ela, com `gh issue develop <número> --checkout` |
| A ideia veio sem issue | Crie uma ramificação local a partir da linha principal, com um nome curto tirado da ideia |

Se a cópia de trabalho tem alterações sem commit em `specs/`, mostre-as ao autor e pare: elas não são desta entrevista.

Depois ache o **prefixo** da mudança, que entra em todo código que a entrevista alocar:

1. Se a ramificação já acrescentou códigos, o prefixo é o deles: veja com `git diff <linha principal>...HEAD -- specs/`.
2. Senão, siga a regra 1 de `specs/AGENTS.md`: o número da issue, quando a ideia veio de uma e nenhum código com esse prefixo existe na linha principal; em qualquer outro caso, um código da skill `tabularium-sortear`.

Feito quando você está numa ramificação que não é a linha principal, sem alteração pendente em `specs/`, e sabe o prefixo.

## 3. Ler a especificação

Siga "Antes de qualquer tarefa" de `specs/AGENTS.md`, lendo por inteiro cada área que a ideia toca. Quando a ideia trouxer arquitetura ou interface, faça o mesmo com o `AGENTS.md` daquela pasta.

A especificação sempre existe, nem que seja só com os arquivos que a instalação criou. Se `specs/_produto.md` ainda traz os textos de exemplo do modelo, a primeira rodada trata do que ele pede: o produto, o problema que resolve, o público e os atores.

Numa retomada, a linha principal pode ter mudado enquanto a ideia esperava. Passe pelo [confronto](#confronto-com-o-existente) o que a ramificação já gravou; o que deixou de valer vira pergunta da primeira rodada. Depois dela, siga por `Para retomar` e pelos itens de `Em aberto`.

Feito quando cada área tocada foi lida por inteiro e, na retomada, o que a ramificação gravou foi confrontado.

## 4. Quebrar a ideia em partes

O autor conta a ideia na ordem em que ela lhe vem, misturando produto, arquitetura e interface. Receba tudo nessa ordem, e separe você.

Uma **parte** é o que caberia numa linha da especificação: uma capacidade, uma regra, um atributo, um termo, uma escolha de arquitetura, um padrão de interface. Para cada parte, nesta ordem:

1. Diga em qual registro ela mora:

   | Registro | O que é | Quando você a trata |
   | --- | --- | --- |
   | Produto | O que o produto faz, como o negócio o vê | Sempre |
   | Arquitetura | O que passa no teste "O que entra" de `specs/arquitetura/_convencoes.md` | Sempre, mesmo que o produto ainda não descreva o assunto |
   | Interface genérica | O que passa no teste "O que entra" de `specs/interface/_convencoes.md` e vale para a interface inteira ou para um assunto dela: meios, estilos, diretrizes, padrões | Sempre, mesmo que o produto ainda não descreva o assunto |
   | Interface de uma capacidade | O componente ou a tela que apresenta algo que o produto faz | Depois que o produto descreve aquilo, já escrito ou nesta entrevista; faltando, trate primeiro a parte de produto |
   | Codificação | O que não passa em nenhum dos dois testes | Diz que fica para quem programar, e segue |

2. Classifique-a pelo que ela é, e não pela palavra que o autor usou, com "Onde colocar cada coisa" e a receita "Decidir se algo é célula" do `AGENTS.md` do registro. A afirmação sobre o que o produto faz é de produto, mesmo quando o autor a traz falando de arquitetura ou de interface.
3. Passe-a pelo [confronto](#confronto-com-o-existente) e pelos [termos novos](#termos-novos).
4. Leve-a às **condições de contorno**, e anote como pergunta cada uma que a ideia não responde:
   - o limite: o maior, o menor, o primeiro, o último, o prazo que vence;
   - o vazio: nenhum item, valor ausente, quem ainda não tem o que a parte pressupõe;
   - o simultâneo: dois atores ao mesmo tempo, a mesma ação feita duas vezes;
   - o caminho que falha: a ação interrompida, o externo que não responde, quem desiste no meio;
   - o depois: como se desfaz, o que acontece com o que já existia;
   - os outros: quem mais é afetado, e quem não pode fazer aquilo.

Tratar uma parte é discuti-la, confrontá-la e chegar à redação final da linha, como ela será escrita.

Feito quando cada parte tem registro, classificação, resultado do confronto e as condições de contorno percorridas, e as decisões que faltam estão arrumadas numa árvore, cada uma abrindo as que dependem dela.

## 5. Perguntar em rodadas

Uma **rodada** reúne as perguntas da fronteira sobre um mesmo assunto: as que já podem ser feitas sem depender de uma resposta pendente. Antes de montá-la, passe cada pergunta pela [busca](#buscar-antes-de-perguntar): a que a busca responde sai da rodada, e o achado entra como fato. Monte-a, conte as perguntas e envie **uma por vez**, esperando a resposta de cada uma. As rodadas são numeradas em sequência; na retomada, continue a partir da última guardada no plano.

A rodada **vai fundo**. Quando uma resposta abre uma dúvida sobre o mesmo assunto, a próxima pergunta é sobre ela, antes das que já esperavam: siga o fio até ele fechar. O total da rodada cresce com isso, e o título da pergunta mostra o total novo. A dúvida que abre outro assunto, e a parte nova que o autor traz no meio da rodada, vão para a fronteira, depois de passar pelo passo 4.

Confronte cada resposta com as anteriores, desta rodada e das outras, e com o que a ramificação já gravou. Quando duas se contradizem, mostre as duas, com a rodada de cada uma, e pergunte qual vale: essa é a próxima pergunta. A resposta que cai é desfeita conforme "Quando o autor muda de rumo".

Cada pergunta tem esta forma:

```markdown
## Rodada 3 · Cancelamento de pedido
### Pergunta 2/4 · Até quando o cliente cancela

**Contexto.** A capacidade "Cancelar um pedido" (`PED-C4.1`) não diz até quando vale.

**Exemplo.** Um pedido entregue há um mês ainda poderia ser cancelado.

**Sugestão.** Até o envio; depois dele, vale a devolução.

**Pergunta.** Até quando o cliente pode cancelar?
```

- O contexto diz por que a pergunta existe: um problema, uma contradição, uma condição de contorno sem resposta, ou algo que precisa ser esclarecido.
- O exemplo ilustra o contexto com um caso concreto, tirado da especificação do projeto.
- A sugestão vale também quando a pergunta é de produto: um valor, um prazo, uma permissão. Ela aparece como sugestão sua, e o autor decide.
- Ao citar algo da especificação, escreva o nome e o código entre parênteses: "Pedido (`PED`)", "Um pedido pago pode ser editado? (`D12.1`)". A afirmação não tem nome: cite o texto da linha, encurtado se for longo.
- Uma escolha com alternativa plausível vira uma decisão, com tudo o que a legenda de `specs/decisoes/` pede: o contexto, as alternativas descartadas com o motivo, e o que se ganha e o que se aceita. Para o motivo, sugira mais de um; o autor escolhe vários, corrige ou dá os próprios.

### Sem objeção

Para não pedir um sim a cada detalhe, você pode adotar uma proposta dizendo "vou adotar, salvo objeção" e mostrando o texto dela. Isso vale para qualquer proposta sua, menos a que muda algo que já está na linha principal, que segue o [confronto](#confronto-com-o-existente).

Ao final de cada rodada, liste os itens sem objeção daquela rodada e peça ao autor que os confirme, todos de uma vez:

```markdown
## Rodada 3 · Cancelamento de pedido
### Validação · 2 itens sem objeção

1. A capacidade de cancelar passa a exigir pedido ainda não enviado.
2. "Estorno" vira sinônimo proibido de reembolso.

Valida todos, ou quer discutir algum?
```

O que o autor quer discutir vira pergunta da rodada seguinte.

Feito quando cada pergunta da rodada foi respondida, inclusive as que as respostas abriram, nenhuma resposta contradiz outra, e cada item sem objeção foi confirmado ou devolvido à discussão.

## 6. Gravar a rodada

Tem **consenso** a parte com redação final que o autor respondeu ou confirmou. Só ela é gravada. O resto fica no [plano](plano.md), em `Em aberto`.

1. Escreva cada parte com consenso pela receita que ela pede: "Receitas" de `specs/AGENTS.md` para o produto, as do `AGENTS.md` da pasta para arquitetura e interface, e as de `specs/decisoes/AGENTS.md` para as decisões. Todo código leva o prefixo do passo 2.
2. Rode o validador, pela skill `tabularium-validar`, e siga "Depois de alterar" do `AGENTS.md` de cada registro tocado. Corrija o que for só de forma. Se a correção muda o significado de uma linha, ela volta a ser pergunta.
3. Faça um commit com o que a rodada gravou. Acionar esta skill é o pedido desse commit; o envio ao servidor continua a pedido. A mensagem diz a rodada e o assunto, na convenção do repositório.
4. Mostre o resumo da rodada:

```markdown
## Rodada 3 · Gravado

- Criado: "Pedido enviado não pode ser cancelado" (`PED-R31.1`)
- Reescrito: "Cancelar um pedido" (`PED-C31.1`), que passa a exigir pedido ainda não enviado
- Retirado: "O cliente cancela a qualquer momento" (`PED-R4`), com lápide
- Termo: reembolso, na linguagem de Vendas
- Decisão: "Um pedido enviado pode ser cancelado?" (`D31.1`)
- Em aberto: o cliente cancela um pedido já pago?
```

### Quando o autor muda de rumo

O autor pode voltar atrás em algo que uma rodada anterior gravou. O que fazer depende de o código já estar na linha principal, conforme a regra 1 de `specs/AGENTS.md`:

| O que muda | O que fazer |
| --- | --- |
| Linha ou decisão que esta ramificação criou | Reescreva-a no lugar, com o mesmo código, ou apague-a. Sem lápide, e sem entrada no `Histórico` da decisão |
| Linha da linha principal que esta ramificação alterou ou retirou | Devolva-a ao texto da linha principal, e apague a lápide e a linha nova que a substituía |
| Linha da linha principal, ainda intacta | É mudança do existente: siga o [confronto](#confronto-com-o-existente) |

Para saber de que lado um código está, procure-o na linha principal, com `git grep -F "<código>" <linha principal> -- specs/`.

Feito quando o validador responde `nenhuma violação`, o commit da rodada existe e o resumo foi mostrado. Havendo pergunta por fazer, volte ao passo 5.

## 7. Encerrar

A entrevista termina quando a fronteira está vazia: cada ramo da árvore foi visitado, e nada ficou suposto em silêncio. Antes de dar a fronteira por vazia, confira as três coisas:

- nenhuma pergunta por fazer, e `Em aberto` vazio;
- cada parte do passo 4 tem veredito, e cada condição de contorno dela tem resposta ou foi dada pelo autor como fora da ideia;
- nada do que a ramificação gravou saiu de suposição sua: releia o que foi gravado, e o que o autor não respondeu nem confirmou volta como pergunta.

Diga então:

- que o consenso é uma proposta do autor, e que o aceite fica com o processo da equipe;
- quais áreas a mudança toca e quem é o dono de cada uma, lido da tabela de áreas de `specs/_produto.md`;
- o que a ramificação gravou ao todo, registro por registro.

Antes da confirmação, diga ao autor que `/tabularium-sugerir` traz ideias que complementam esta, se ele quiser. A sugestão que ele aceitar é uma parte nova: passa pelo passo 4, entra na fronteira, e a entrevista volta ao passo 5.

Peça a confirmação do consenso sobre a ideia inteira, numa pergunta só para isso. Enquanto o autor não confirma, a ideia segue em discussão: nada é entregue, e o rótulo não passa a `consenso`.

Uma parte que não amadureceu impede o encerramento. O autor escolhe: esperar por ela nesta ideia, ou separá-la numa ideia própria, para entregar o resto.

Feito quando o autor confirmou e você sugeriu `/tabularium-aplicar`, para entregar a ramificação, e `/tabularium-registrar`, se ele quiser a ideia numa issue.

## Pausa e rejeição

O autor pode parar a qualquer momento. Grave a rodada em curso até onde há consenso, mostre o [plano](plano.md) com o que falta em `Em aberto` e sugira `/tabularium-registrar`: sem ele, o que está em aberto vive só nesta conversa.

Só o autor rejeita uma ideia. Quando a discussão ficar inviável, sugira a rejeição. Se ele rejeitar, o plano guarda o motivo, nada é entregue, e apagar a ramificação fica com o autor.

## Buscar antes de perguntar

Antes de perguntar algo ao autor, veja se a resposta é um fato que já está escrito. Pare na primeira fonte que responder:

1. **O que você já leu nesta conversa:** as áreas do passo 3 e o que a ramificação gravou.
2. **O resto da especificação, por um subagente:** entregue a busca a um subagente, para os arquivos lidos não ocuparem a conversa. Diga a ele o que procura, e peça de volta só o achado, com o código ou o arquivo de origem de cada um. O subagente parte dos índices: os `README.md` de `specs/` e das pastas dentro dela, achados recursivamente, e abre só os arquivos que eles apontam. Na pasta sem `README.md`, ele procura pelo termo em negrito ou pelo identificador.
3. **Fora da especificação:** o fato que não depende do produto, como um prazo legal ou o que um externo oferece, busque na web, e diga a fonte ao autor.

No ambiente sem subagentes, faça você a busca do item 2, pelos mesmos índices.

O que a busca acha é fato: use-o na pergunta, em `Contexto`, com a origem. O que ela não acha é lacuna, e só então vira pergunta ao autor.

## Confronto com o existente

O que é novo concorda com o que existe: afirmações, linhas de modelo, definições, decisões, `Propósito` e `Fora de escopo`, no produto, na arquitetura e na interface. Procure cada parte no que está escrito, pela [busca](#buscar-antes-de-perguntar), inclusive nos outros registros e no que esta ramificação já gravou: uma escolha de arquitetura pode contrariar uma afirmação do produto.

| Encontrou | O que fazer |
| --- | --- |
| Afirmação implementada que já diz o que o autor quer | Pergunte se o produto faz aquilo. Faz, ou ele não sabia: veredito **já existe**. Não faz: veredito **defeito**, e sugira registrá-lo |
| Afirmação ainda não implementada que já diz o que o autor quer | Veredito **pendente**: diga que falta implementar |
| Algo que diz diferente do que o autor quer | Conflito |
| Lápide de afirmação removida | Reintroduzir é mudança, com código novo |
| Linha provisória ou pergunta aberta sobre o assunto | A parte responde a pergunta aberta |
| Nada | A parte é nova |

No conflito, mostre os dois lados e deixe a escolha com o autor. As saídas são retirar a parte, ajustá-la ou mudar o existente. Na interface há mais uma: declarar a parte como exceção a um padrão, com `ao contrário de`.

Mudar o que está na linha principal pede a confirmação do autor para cada item, um por vez. Antes de perguntar, leia as decisões que o item cita. Depois do sim, traduza a mudança pelas receitas de `specs/AGENTS.md`, e procure quem mais cita o item alterado: cada um é uma parte nova a confrontar.

Quando a mudança produz um dos sinais de "Ao revisar", proponha reagrupar: dividir ou fundir células, criar, juntar ou separar áreas.

## Termos novos

A presunção é que o termo já existe. Procure na especificação toda, pela [busca](#buscar-antes-de-perguntar), e não só nas áreas lidas, cada palavra do autor que você não reconhece. Achando um termo parecido, pergunte se há algo que vale para um e não vale para o outro. A resposta leva a uma de três saídas:

- **É a mesma coisa:** use o termo existente e sugira a palavra do autor como sinônimo proibido.
- **É a mesma coisa, e o autor prefere o nome novo:** renomear o termo em toda a especificação é uma mudança; o nome antigo vira sinônimo proibido.
- **É outra coisa:** termo novo, com o diferencial escrito na definição e o termo vizinho citado, como em "recebedor: pessoa que recebe a entrega no endereço, e que pode não ser o **Destinatário**". Releia a definição do vizinho e proponha ajustá-la se ela cobrir os dois.

Siga a conversa com o termo que ficou valendo.

## Vereditos

Cada parte termina com um veredito:

| Veredito | Quando | Onde fica |
| --- | --- | --- |
| Mudança | A parte tem redação final e consenso | Gravada na rodada |
| Pergunta aberta | A parte principal é compromisso e falta um detalhe; pergunte ao autor se é o caso | Gravada na rodada, em `_perguntas.md` |
| Já existe | Escrito, implementado, e o produto faz | `Fora do plano` |
| Defeito | Escrito, implementado, e o produto não faz | `Fora do plano` |
| Pendente | Escrito e ainda não implementado | `Fora do plano` |
| Codificação | Não passa nos testes de arquitetura nem de interface | `Fora do plano` |
| Não amadureceu | O autor ainda não decidiu | `Em aberto` |

Em `Fora do plano`, aponte a afirmação quando houver.
