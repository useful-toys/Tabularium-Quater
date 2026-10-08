---
name: tabularium-entrevistar
description: Entrevista o autor sobre uma ideia até o consenso sobre o que muda na especificação Tabularium.
disable-model-invocation: true
---

# Entrevistar o autor sobre uma ideia

Você conduz uma **entrevista**: amadurece uma ideia com o autor até o **consenso** sobre o que muda em `specs/`. O resultado é um **plano**, mostrado na conversa. Você só lê e conversa. Quem grava na issue é `/tabularium-registrar`, e quem escreve em `specs/` é `/tabularium-aplicar`: sugira cada uma na hora dela e deixe o autor acioná-la.

As regras do formato estão em `specs/AGENTS.md` e `specs/_convencoes.md`; as de arquitetura e de interface, nos mesmos dois arquivos de `specs/arquitetura/` e de `specs/interface/`. Esta skill aponta para elas pelo título da seção, e são elas que valem.

## 1. Receber a ideia

O que o autor passou junto com o comando decide o começo:

- **Número ou link de uma issue:** leia com `gh issue view <número ou link> --json number,title,body,labels,state`. Se o comando falhar, diga ao autor que a issue não foi encontrada e encerre. Se o corpo tem as seções de um plano (`## Resumo` e `## Mudanças`), é uma **retomada**: o corpo é o estado da entrevista, e os comentários ficam sem ler. Senão, o corpo é a descrição da ideia.
- **Uma frase ou um texto:** é a descrição da ideia.
- **Nada:** pergunte qual ideia o autor quer discutir.

Feito quando você tem a descrição da ideia, ou o plano de uma retomada.

## 2. Ler a especificação

Siga "Antes de qualquer tarefa" de `specs/AGENTS.md`, lendo por inteiro cada área que a ideia toca. Quando a ideia trouxer uma escolha de arquitetura ou de interface, faça o mesmo com o `AGENTS.md` daquela pasta.

Numa retomada, a especificação pode ter mudado enquanto a ideia esperava. Passe cada linha de `Mudanças` e de `Decisões` do plano pelo [confronto](#confronto-com-o-existente); a que deixou de valer vira pergunta da primeira rodada. Depois dela, siga por `Para retomar` e pelos itens de `Em aberto`.

Feito quando cada área tocada foi lida por inteiro e, na retomada, cada linha do plano foi confrontada.

## 3. Quebrar a ideia em partes

Uma **parte** é o que caberia numa linha da especificação: uma capacidade, uma regra, um atributo, um termo, uma escolha de arquitetura. Para cada parte, nesta ordem:

1. Diga em qual registro ela mora:

   | Registro | O que é | O que você faz |
   | --- | --- | --- |
   | Produto | O que o produto faz, como o negócio o vê | Trata por inteiro; é o foco |
   | Arquitetura | O que passa no teste "O que entra" de `specs/arquitetura/_convencoes.md` | Trata por inteiro, quando o autor a traz |
   | Interface | O que passa no teste "O que entra" de `specs/interface/_convencoes.md` | Trata por inteiro, quando o autor a traz |
   | Codificação | O que não passa em nenhum dos dois testes | Diz que fica para quem programar, e segue |

2. Classifique-a pelo que ela é, e não pela palavra que o autor usou, com "Onde colocar cada coisa" e a receita "Decidir se algo é célula" do `AGENTS.md` do registro.
3. Passe-a pelo [confronto](#confronto-com-o-existente) e pelos [termos novos](#termos-novos).

Tratar por inteiro é discutir a parte, confrontá-la e chegar à redação final da linha, como ela será escrita.

O produto se discute sozinho: arquitetura e interface entram na conversa quando o autor as traz. Elas só entram para algo que o produto descreve, já escrito ou no mesmo plano; faltando, proponha tratar primeiro a parte de produto. A escolha que vale para o sistema inteiro entra sem essa condição; na dúvida, pergunte ao autor se ela vale para o sistema todo ou para uma parte.

Feito quando cada parte tem registro, classificação e resultado do confronto, e as decisões que faltam estão arrumadas numa árvore, cada uma abrindo as que dependem dela.

## 4. Perguntar em rodadas

Uma **rodada** é o grupo de perguntas que já podem ser feitas sem depender de uma resposta pendente. Monte a rodada, conte as perguntas e envie **uma por vez**, esperando a resposta de cada uma. O total da rodada é fixo: a pergunta que uma resposta abre vai para a rodada seguinte. As rodadas são numeradas em sequência; na retomada, continue a partir da última guardada no plano.

Cada pergunta tem esta forma:

```markdown
## Rodada 3 · Cancelamento de pedido
### Pergunta 2/4 · Até quando o cliente cancela

**O problema.** A capacidade "Cancelar um pedido" (`PED-C4`) não diz até quando vale.

**Exemplo.** Um pedido entregue há um mês ainda poderia ser cancelado.

**Sugestão.** Até o envio; depois dele, vale a devolução.

**Pergunta.** Até quando o cliente pode cancelar?
```

Uma ideia que chega madura passa pelos mesmos passos, em menos rodadas.

- Os fatos, você busca lendo a especificação. As decisões são do autor.
- Toda pergunta leva a sua sugestão, também quando é de produto: um valor, um prazo, uma permissão. Ela aparece como sugestão sua, e o autor decide.
- O exemplo sai da especificação do projeto.
- Ao citar algo da especificação, escreva o nome e o código entre parênteses: "Pedido (`PED`)", "Um pedido pago pode ser editado? (`D12`)". A afirmação não tem nome: cite o texto da linha, encurtado se for longo.
- Uma escolha com alternativa plausível vira uma decisão no plano, com tudo o que a legenda de `specs/decisoes/` pede: o contexto, as alternativas descartadas com o motivo, e o que se ganha e o que se aceita. Para o motivo, sugira mais de um; o autor escolhe vários, corrige ou dá os próprios.

### Sem objeção

Para não pedir um sim a cada detalhe, você pode adotar uma proposta dizendo "vou adotar, salvo objeção" e mostrando o texto dela. A linha entra no plano marcada `· sem objeção`. Isso vale para qualquer proposta sua, menos a que muda algo já existente, que segue o [confronto](#confronto-com-o-existente).

Ao final de cada rodada, liste os itens sem objeção daquela rodada e peça ao autor que os confirme, todos de uma vez:

```markdown
## Rodada 3 · Cancelamento de pedido
### Validação · 2 itens sem objeção

1. A capacidade de cancelar passa a exigir pedido ainda não enviado.
2. "Estorno" vira sinônimo proibido de reembolso.

Valida todos, ou quer discutir algum?
```

O item confirmado perde a marca. O que o autor quer discutir vira pergunta da rodada seguinte.

Feito quando a árvore foi toda percorrida: nenhuma pergunta por fazer e nenhum item sem objeção.

## 5. Encerrar

Com a árvore percorrida, mostre o [plano](plano.md) inteiro e, antes de pedir a confirmação, diga:

- que o consenso é uma proposta do autor, e que o aceite fica com o processo da equipe;
- quais áreas a mudança toca e quem é o dono de cada uma, lido da tabela de áreas de `specs/_produto.md`;
- se o plano só tem produto, que a mudança não tratou de arquitetura nem de interface.

Peça então a confirmação do consenso, numa pergunta só para isso. Há **consenso** quando `Em aberto` está vazio, nenhuma linha está sem objeção e o autor confirmou.

Uma parte que não amadureceu impede o consenso. O autor escolhe: esperar por ela nesta ideia, ou separá-la numa ideia própria, para aplicar o resto.

Feito quando o autor confirmou o consenso e você disse o rótulo `consenso` e sugeriu `/tabularium-registrar` e `/tabularium-aplicar`.

## Pausa e rejeição

O autor pode parar a qualquer momento. Mostre o [plano](plano.md) como está, com o que falta em `Em aberto`, diga o rótulo `em discussão` e sugira `/tabularium-registrar`.

Só o autor rejeita uma ideia. Quando a discussão ficar inviável, sugira a rejeição. Se ele rejeitar, o plano guarda o motivo, e o rótulo é `rejeitada`.

## Confronto com o existente

O que é novo concorda com o que existe: afirmações, linhas de modelo, definições, decisões, `Propósito` e `Fora de escopo`, no produto, na arquitetura e na interface. Procure cada parte no que está escrito, inclusive nos outros registros: uma escolha de arquitetura pode contrariar uma afirmação do produto.

| Encontrou | O que fazer |
| --- | --- |
| Afirmação implementada que já diz o que o autor quer | Pergunte se o produto faz aquilo. Faz, ou ele não sabia: veredito **já existe**. Não faz: veredito **defeito**, e sugira registrá-lo |
| Afirmação ainda não implementada que já diz o que o autor quer | Veredito **pendente**: diga que falta implementar |
| Algo que diz diferente do que o autor quer | Conflito |
| Lápide de afirmação removida | Reintroduzir é mudança, com número novo |
| Linha provisória ou pergunta aberta sobre o assunto | A parte responde a pergunta aberta |
| Nada | A parte é nova |

No conflito, mostre os dois lados e deixe a escolha com o autor. As saídas são retirar a parte, ajustá-la ou mudar o existente. Na interface há mais uma: declarar a parte como exceção a um padrão, com `ao contrário de`.

Mudar o existente pede a confirmação do autor para cada item, um por vez. Antes de perguntar, leia as decisões que o item cita. Depois do sim, traduza a mudança pelas receitas de `specs/AGENTS.md`, e procure quem mais cita o item alterado: cada um é uma parte nova a confrontar.

Quando a mudança produz um dos sinais de "Ao revisar", proponha reagrupar: dividir ou fundir células, criar, juntar ou separar áreas.

## Termos novos

A presunção é que o termo já existe. Procure na especificação toda, e não só nas áreas lidas, cada palavra do autor que você não reconhece. Achando um termo parecido, pergunte se há algo que vale para um e não vale para o outro. A resposta leva a uma de três saídas:

- **É a mesma coisa:** use o termo existente e sugira a palavra do autor como sinônimo proibido.
- **É a mesma coisa, e o autor prefere o nome novo:** renomear o termo em toda a especificação é uma mudança; o nome antigo vira sinônimo proibido.
- **É outra coisa:** termo novo, com o diferencial escrito na definição e o termo vizinho citado, como em "recebedor: pessoa que recebe a entrega no endereço, e que pode não ser o **Destinatário**". Releia a definição do vizinho e proponha ajustá-la se ela cobrir os dois.

Siga a conversa com o termo que ficou valendo.

## Vereditos

Cada parte termina com um veredito:

| Veredito | Quando | Onde fica no plano |
| --- | --- | --- |
| Mudança | A parte tem redação final | `Mudanças` |
| Pergunta aberta | A parte principal é compromisso e falta um detalhe; pergunte ao autor se é o caso | `Mudanças`, como pergunta a abrir na especificação |
| Já existe | Escrito, implementado, e o produto faz | `Fora do plano` |
| Defeito | Escrito, implementado, e o produto não faz | `Fora do plano` |
| Pendente | Escrito e ainda não implementado | `Fora do plano` |
| Codificação | Não passa nos testes de arquitetura nem de interface | `Fora do plano` |
| Não amadureceu | O autor ainda não decidiu | `Em aberto` |

Em `Fora do plano`, aponte a afirmação quando houver.
