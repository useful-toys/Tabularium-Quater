# AGENTS.md

Esta pasta é uma especificação de produto no formato Tabularium. Ela é a fonte única da verdade sobre o produto: descreve só o que foi comprometido, e marca em cada afirmação se o produto já a cumpre (`[x]`) ou não (`[ ]`). O que não está escrito aqui não é requisito, e o que está escrito vale exatamente como está.

Este arquivo é igual em todos os projetos. Ele descreve como trabalhar; as regras do formato estão na especificação do formato, que prevalece em caso de conflito.

## Antes de qualquer tarefa

1. Leia `_convencoes.md`: é a legenda de tudo o que segue.
2. Leia `_produto.md`: propósito, áreas, atores, tipos comuns, jornadas, externos e regras globais.
3. Leia só as áreas que a tarefa toca. O Índice no topo de cada área lista o que ela usa de outras, as reações de outras áreas aos eventos dela e as perguntas abertas que a tocam; abra essas outras só se precisar.
4. Se a tarefa toca uma linha que termina em `⟵ [Pnn]`, ou uma área com perguntas no Índice, leia a pergunta em `_perguntas.md`. A linha é provisória.
5. Não leia `decisoes/` por rotina. Abra uma decisão só quando precisar do porquê de um item que termina em `⟸ [Dnn]`, ou antes de alterá-lo.

Para achar onde algo mora, procure pelo termo em negrito ou pelo identificador. Todo termo tem um único lugar de definição e todo identificador é único na especificação.

## Ao responder perguntas

- Responda a partir do texto e cite a origem de tudo o que afirmar: o identificador (`[PED-R1]`) ou o termo e o arquivo.
- Se a resposta não está escrita, diga que é uma lacuna da especificação. Não deduza regras de exemplos, de nomes ou do que "costuma ser". Se a lacuna já tem pergunta aberta, cite-a.
- Ao citar uma linha que termina em `⟵ [Pnn]`, avise que ela é provisória.
- O estado de implementação está na marca de cada afirmação: `[x]` cumprida por inteiro, `[ ]` não cumprida. Não há estado parcial. Jornadas estão implementadas quando todas as afirmações que citam estão.
- A especificação não contém histórico, justificativas nem ideias. Justificativas estão em `decisoes/`, uma decisão por arquivo, à parte das áreas e de `_produto.md`. O item que tem justificativa termina com `⟸ [Dnn]`; abra a decisão só quando precisar do porquê. Ideias ficam no rastreador.

## Ao alterar

### Regras que nunca se quebram

1. Nunca renumere um identificador e nunca reutilize um número. O próximo número é o que `_contadores.md` guarda para aquela sigla e papel, mais um. Na mesma mudança, atualize o item do contador: o número e o nome curto, que são duas ou três palavras da linha nova. É o nome curto que faz duas alocações do mesmo número, feitas em paralelo, conflitarem; nunca o omita nem repita o anterior. Siglas de células extintas ou fundidas também não voltam, e continuam em `_contadores.md`. Um número que você alocou e que ainda não entrou na linha principal é provisório: se outra mudança entrou antes com o mesmo número, renumere o seu, junto com os testes e as citações que o usam.
2. Para retirar uma afirmação, troque-a por uma lápide no mesmo lugar: `- [ ] PED-R7  removida`. Para mudá-la de célula, crie a afirmação na nova dona e deixe `- [x] PED-C3  movida → [ENT-C1]` no lugar antigo. Nunca apague o identificador ao retirar ou mover. A lápide não leva `⟸ [Dnn]`: a citação sai com a afirmação retirada e acompanha a afirmação movida. Lápides só saem pela poda, que o usuário pede quando acha oportuno: sai a lápide `[x]` que nenhuma linha cita, e o número dela continua sem voltar.
3. Nunca edite seções marcadas `<!-- gerado; não editar -->`, como o Índice das áreas e o glossário. Elas são refeitas por programa.
4. Defina cada termo uma única vez, sem negrito, no lugar que o tipo de termo pede. Em cada item de lista, frase de definição ou fileira de tabela, escreva em negrito a primeira menção de cada termo; as seguintes, no mesmo item, ficam sem negrito. Não contam como menção: títulos, cabeçalhos de tabela, código, marcas de ator, qualificadores no modelo e a própria célula dentro do seu bloco. Nunca use um sinônimo que aparece tachado no fim de uma definição, como em `(~~valor, montante~~)`.
5. Cada afirmação diz uma só coisa. A única prosa é a frase de definição de cada célula.
6. Não escreva histórico, justificativas, ideias, exemplos didáticos nem explicações. Se a mudança precisa de um porquê, registre uma decisão em `decisoes/` e cite-a no item com `⟸ [Dnn]`; o texto da decisão nunca entra em área nem em `_produto.md`. Uma ideia ainda não comprometida vai para o rastreador, nunca para a especificação nem para `_perguntas.md`.
7. Não acrescente nada que não foi pedido: nem regras "óbvias", nem critérios extras, nem eventos sem reação.
8. Toda afirmação nova nasce `[ ]`. Só marque `[x]` quando o produto cumpre a afirmação por inteiro, com evidência (um teste que passa ou uma verificação feita). Se a afirmação só pode ser cumprida em parte, ela está agregada demais: proponha dividi-la.
9. Antes de alterar, retirar ou mover um item que termina com `⟸ [Dnn]`, leia todas as decisões que ele cita, porque a mudança pode contrariar qualquer uma delas. Uma decisão pode ser citada por vários itens: procure o código dela na especificação para ver o que mais ela fundamenta.
10. Antes de escrever ou alterar uma decisão, leia `decisoes/AGENTS.md` e `decisoes/_convencoes.md`. Uma decisão responde a uma só questão: questão nova cria decisão nova.
11. Escreva só o que o produto faz, nunca como ele é construído. Tecnologia, armazenamento, estrutura do código, formato de arquivo interno e forma de implantação são escolhas técnicas e não entram, nem como R nem como Q. Antes de escrever uma linha assim, reescreva-a como o que um ator ou o negócio observa: `O catálogo é embutido no código` vira `Nenhum ator altera o catálogo`, se é isso que se quer garantir. Se nada sobra depois de reescrever, a linha inteira pertence à arquitetura.

### Onde colocar cada coisa

| O que | Onde |
| --- | --- |
| Atributo, estado, cardinalidade, derivado | Linha sem identificador no topo do bloco da célula: `nome: tipo; qualificadores` |
| Algo que um ator faz e que altera estado | C no bloco da célula que ela altera; se altera mais de uma, mora numa só e as outras reagem a um evento dela |
| Algo que um ator vê, sem alterar nada (inclui exportar e copiar) | V no bloco da célula exibida |
| Condição de aceite de uma C ou V | Sub-item dela, sem identificador: `exige:` para pré-condição, `se …:` para alternativa ou exceção, sem prefixo para resultado |
| Regra que vale sempre | R no bloco da célula sobre a qual ela fala |
| Efeito de algo que aconteceu em outra célula | Linha `evento:` na célula que produz o fato, e R `Ao **Evento**:` na célula que reage |
| Regra com várias condições combinadas | R terminada em `:` seguida de uma tabela de decisão |
| Limite de desempenho ou comportamento geral | Q na célula, ou em regras globais se não houver célula |
| O que um texto legal afirma | T, só em células que são textos |
| Relação com outra célula | Linha de modelo, numa só das duas células: `pertence a 1 **X**`, `CARD **X**` ou `especializa **X**`; o outro lado, quando importa, em `inverso:` |
| Termo do domínio que não é célula nem atributo | Linguagem da área |
| Sistema ou organização fora do produto que alguma regra pressupõe | `Externos` em `_produto.md`, com sub-itens do que guarda, fornece, recebe ou impõe |
| O porquê de uma escolha não óbvia, que tinha alternativa | Decisão em `decisoes/_produto/` ou `decisoes/<area>/`, na pasta da área cujos itens mais a citam; no item, só a marca `⟸ [Dnn]` no fim |
| Problema que o produto resolve | Primeira linha de `Propósito` em `_produto.md` |
| Escolha técnica: como o produto é construído | Fora da especificação, no documento de arquitetura; aqui, só a consequência que um ator ou o negócio observa, se houver |

A ordem das linhas num bloco é fixa: modelo, `evento:`, R, Q, C, V, T. Insira cada linha na posição do seu papel.

### Receitas

- **Acrescentar uma afirmação:** ache a célula dona; use o próximo número da sigla e do papel, conforme `_contadores.md`, e atualize o contador; insira na posição do papel; cite em negrito todo termo que já existe.
- **Corrigir a redação:** se o significado não muda, edite e mantenha o identificador e a marca. Se o significado muda, retire a afirmação (lápide `[ ]`) e crie outra com novo número, marcada `[ ]`: as duas ficam pendentes até o produto acompanhar.
- **Criar um termo:** confira antes se ele não é sinônimo de um termo existente. Se for, use o existente. Se for um nome novo para algo existente, pergunte.
- **Renomear um termo:** troque a definição e todas as referências em negrito, em todos os arquivos, na mesma mudança.
- **Decidir se algo é célula:** pare no primeiro teste com resposta sim. É algo que um ator faz ou vê: capacidade ou visão. Uma sequência de ações: jornada. Um fato que provoca reação: evento. Quem age: ator. Algo fora do produto que uma regra pressupõe: externo. Um valor sem identidade: tipo de valor. Característica, estado ou cálculo de outra coisa: atributo. Um agrupamento de células: área. Algo sobre o qual há o que afirmar e que não pertence a nenhuma outra coisa: célula. Nenhum desses: termo na linguagem da área.
- **Criar uma célula:** escolha uma sigla de 2 a 5 letras que não apareça em `_contadores.md`, e acrescente lá um item para cada papel que ela usar, em ordem alfabética; escreva título, frase de definição compreensível fora do bloco, e as linhas na ordem fixa.
- **Mover uma afirmação para outra célula:** crie a afirmação na nova dona, com o próximo número da sigla dela e a mesma marca; no lugar antigo, deixe a lápide `movida → [NOVO]`. O comportamento não mudou, então nada fica pendente.
- **Podar lápides:** só a pedido. Para cada lápide `[x]`, procure o identificador na especificação; se nada o cita, apague a lápide. Lápides `[ ]` e lápides citadas ficam.
- **Registrar, rever, dividir ou limpar uma decisão:** siga `decisoes/AGENTS.md`, que traz as receitas e a legenda das decisões.
- **Dividir uma célula:** crie a célula nova e mova para ela as linhas que lhe pertencem.
- **Fundir duas células:** mova as linhas da célula absorvida; se o nome dela for sinônimo, acrescente-o, tachado e entre parênteses, ao fim da definição da que a absorveu; a sigla da absorvida não volta.
- **Rebaixar ou promover:** uma célula sem afirmações vira atributo ou termo; um atributo que ganha atributos ou regras próprias vira célula, e o modelo de origem passa a citá-la.
- **Criar uma área:** só quando uma célula central e as células que dependem dela se relacionam mais entre si do que com o resto. Crie o arquivo e acrescente a área na tabela de áreas de `_produto.md`, com a célula central.
- **Mover uma célula de área:** mova o bloco inteiro; os identificadores não mudam.
- **Abrir uma pergunta:** só para uma dúvida que surgiu sobre algo já comprometido; ideia não é pergunta. Acrescente em `_perguntas.md` um item `- Pnn  enunciado?` com o próximo número, conforme `_contadores.md`, atualizando o contador; opções, se houver, como sub-itens `opção:`. Se existe uma linha provisória, ela termina com `⟵ [Pnn]`; se a lacuna é a falta de uma linha, a pergunta leva o sub-item `sobre: **Célula**`. Nunca as duas coisas.
- **Responder uma pergunta:** na mesma mudança, apague a pergunta de `_perguntas.md`, tire `⟵ [Pnn]` de todas as linhas que a citam e deixe o texto definitivo. Se a resposta precisa de justificativa, registre uma decisão: o enunciado da pergunta vira a questão, as opções não escolhidas viram as alternativas descartadas, e as linhas passam a terminar com `⟸ [Dnn]`. Não marque a pergunta como respondida: apagar é responder.
- **Atributo com nome repetido em outra célula:** fora do próprio bloco, cite como `**Célula.atributo**`.

### Depois de alterar

- Rode o validador, se o projeto tiver um, e corrija os erros antes de concluir. Ele é um script determinístico: execute-o e leia a saída, sem refazer as checagens por leitura.
- Sem validador, confira ao menos: identificadores novos únicos e na sequência; `_contadores.md` com o número e o nome curto de cada alocação nova, e sem nenhum número diminuído; nenhuma referência `[ID]` ou `⟵ [Pnn]` quebrada; nenhuma citação `⟸ [Dnn]` sem o arquivo da decisão; marcas no fim do item na ordem `⟸`, `⟵`; nenhuma pergunta sem linha que a cite e sem `sobre:`; nenhum termo definido duas vezes; nenhum termo em negrito sem definição; primeira menção de cada termo em negrito; linhas na ordem fixa; nenhuma seção gerada editada.
- Resuma a mudança listando os identificadores criados, alterados e retirados, e os termos criados ou renomeados.

## Ao implementar

1. O que falta são as afirmações marcadas `[ ]`, incluindo as lápides `[ ]`, cujo comportamento deve sair do produto.
2. Para cada uma, leia o bloco inteiro da célula: as regras e reações do bloco também valem para o que você vai implementar.
3. Implemente e, se o projeto tiver testes, escreva ou ajuste testes que citem o identificador da afirmação.
4. Marque `[x]` só quando a afirmação estiver cumprida por inteiro. Não altere o texto da afirmação para que ele caiba no que foi implementado: se a implementação diverge da especificação, pare e pergunte.

## Ao revisar

Para cada categoria abaixo sem nenhuma Q nem regra global que a cubra, abra uma pergunta em `_perguntas.md`. Não escreva o requisito por conta própria: uma categoria vazia pode ser uma lacuna ou uma escolha consciente, e só o dono da área sabe qual.

- Funcionalidade transversal: segurança, permissões, auditoria
- Usabilidade: acessibilidade, idioma, consistência
- Confiabilidade: disponibilidade, recuperação de falhas, perda de dados
- Desempenho: tempo de resposta, volume, uso de recursos
- Suportabilidade: plataformas, navegadores, manutenção, configuração
- Restrições: de projeto, de implementação, de interface, físicas, legais

Proponha reagrupar, sem fazer por conta própria, quando aparecer um destes sinais: célula com mais de 40 linhas (dividir); célula sem afirmação e com no máximo uma linha de modelo (rebaixar); capacidade ou visão sem dono natural (falta uma célula); afirmação que cita outra célula mais do que a própria (mover a afirmação); duas células citadas quase sempre juntas, uma só pela outra (fundir); célula que troca mais referências com outra área do que com a sua (mudar de área); área com mais de 300 linhas ou com mais de um dono (virar pasta); bloco com muitas lápides `[x]` que nada cita (podar). Os sinais sobre decisões estão em `decisoes/AGENTS.md`.

Proponha também, sem fazer por conta própria, reescrever ou retirar a afirmação que cita tecnologia, armazenamento, estrutura do código ou forma de implantação: reescrever, se há uma consequência que um ator ou o negócio observa; retirar, com lápide, se não há. Nas categorias acima, uma restrição de implementação só entra quando é imposta de fora ao produto, como por um externo ou por lei; a escolha feita pela equipe é arquitetura.

Confira também se toda regra motivada por uma organização de fora (um órgão regulador, um parceiro, um titular de direitos) tem essa organização em `Externos`.

## Quando parar e perguntar

- A mudança exige uma decisão de produto que não está escrita: valores, limites, prazos, quem pode fazer o quê. Se a resposta não vier agora, proponha abrir uma pergunta em `_perguntas.md` em vez de inventar.
- A mudança contradiz uma linha existente. Não escolha um lado; aponte as duas.
- O item a mudar cita uma decisão e a mudança a contraria. Isso exige rever a decisão: aponte o conflito e não escolha um lado.
- Não está claro a qual célula a linha pertence, ou se é preciso uma célula nova.
- O pedido usa um termo que não existe na especificação e pode ser sinônimo de um que existe.

## Ao gerar documentos derivados

- Documentos derivados são redigidos por você. O Índice das áreas, o mapa entre áreas, o glossário e o índice de cada pasta de decisões não são: saem do gerador, e você não os escreve à mão.
- Gere a partir da especificação, sem acrescentar fatos. Explicar, ordenar e exemplificar pode; afirmar o que não está escrito, não.
- Cite a origem de cada frase.
- Documentos tradicionais saem assim: visão, de `Propósito`, atores, externos e fora de escopo; catálogo de regras, das R; especificação suplementar, das Q e regras globais; modelo de domínio, das linhas de modelo.
- Caso de uso: ator e objetivo vêm da C; pré-condições, dos critérios `exige:`; fluxos alternativos e exceções, dos critérios `se …:`; pós-condições, dos critérios sem prefixo; efeitos em outras células, das reações; sequência entre capacidades, das jornadas. Não invente passos de interface.
- Liste no fim as frases que precisaram de algo que não está na especificação: são lacunas a levar ao dono da área.
- Nunca grave um documento derivado dentro desta pasta, nem copie dele de volta para a especificação.
- Guardar um documento derivado sob controle de versão é escolha da equipe. Se ele já existe e a especificação mudou, gere-o de novo em vez de emendá-lo.
