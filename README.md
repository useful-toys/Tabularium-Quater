# Tabularium

O Tabularium é um formato para documentar produtos de software em Markdown, numa única fonte da verdade organizada em células de conceitos, escrita numa gramática simples o bastante para ser verificada deterministicamente por programa e mantida por pessoas e por agentes de IA. Os documentos que outras abordagens pedem, como a visão e os casos de uso do RUP, as histórias de usuário dos métodos ágeis, os cenários do BDD e o diagrama de contexto do C4, entre muitos outros, deixam de ser escritos à mão e passam a ser derivados dela: as partes mecânicas, por programa; os documentos redigidos, por um agente de IA.

O formato é para equipes de desenvolvimento e sustentação de software, da análise à implementação, em uso pessoal ou numa organização. Qualquer um pode adotá-lo.

> **Estado: experimental.** O formato está em aprendizado e, por ora, visa produtos pequenos. O que existe hoje é a definição do formato, em [`specs/`](specs/), e as instruções para agentes. O verificador, as skills de geração e a pasta `decisoes/` ainda não existem: onde este README os descreve, descreve o que o formato pretende. Duas aplicações reais, Iconula e Abditum, serão especificadas no formato, cada uma em repositório próprio de exemplo, para pôr a ideia à prova.

Este README é uma explicação derivada da própria definição normativa do formato, que está em [`specs/`](specs/), escrita no próprio formato. Em caso de divergência, vale o que está lá. Os identificadores entre parênteses, como (TRM-R7), apontam para a regra de origem.

## A ideia central: a célula de conceitos

As metodologias tradicionais organizam a documentação por tipo de informação: um documento para o glossário, outro para as regras de negócio, outro para os casos de uso, outro para o modelo de dados. Quem quer saber tudo sobre o Pedido precisa percorrer todos eles, e cada mudança num documento precisa ser sincronizada em vários lugares e outros documentos.

O Tabularium faz o contrário. Tudo no formato gira em torno da **célula de conceitos**, ou só **célula**: uma coisa do domínio, nomeada por um substantivo do negócio, com tudo o que a especificação afirma sobre ela e que não pertence a nenhuma outra. Pedido, Cliente, Produto, etc.

Cada célula tem um único bloco e é praticamente autocontida. Tudo o que se sabe sobre ela mora ali: o que é, de que é feita, as regras que valem sobre ela, o que acontece com ela, o que os atores fazem com ela e o que veem dela. O que a liga ao resto são apenas as referências a outras células e as reações aos eventos que elas produzem. Não há uma seção de regras, outra de casos de uso e outra de glossário: há células, cada uma completa no seu lugar.

Este é o ganho principal: quem lê uma célula encontra ali tudo o que a especificação afirma sobre ela, sem precisar reunir pedaços espalhados por outros documentos. Só ficam fora as definições dos termos de outras células que ela cita. Para a pessoa que quer aprender o sistema, isso é didático, porque cada assunto se aprende num lugar só. Para o agente de IA, é econômico: ele obtém o que precisa lendo a célula, em vez de abrir vários documentos, e usa melhor o seu contexto.

Disso decorre quase todo o resto:

- **A célula é dona das suas afirmações.** Uma célula é composta por afirmações, e cada afirmação pertence a uma única célula. Quando algo numa célula afeta outra, o efeito é escrito na afetada, e quem lê um bloco vê tudo o que pode acontecer com ela. O custo fica do outro lado: quem lê a célula que produz o fato não vê ali quem reage a ele, e encontra essa lista no Índice gerado da área.
- **As células se agrupam por relação, não por tipo.** Células fortemente relacionadas ficam juntas num mesmo arquivo, chamado **área**: uma célula central e as que dependem dela. Essa proximidade é medida, não apenas declarada.
- **As células evoluem.** Uma célula pode se dividir, se fundir, virar atributo ou nascer de um; as afirmações e seus identificadores sobrevivem a qualquer reagrupamento.
- **Os documentos tradicionais são vistas sobre as células.** Glossário, regras de negócio e casos de uso são derivados das células, e não escritos à parte.

## Valores

1. **Organizada por células de conceitos.** Cada célula reúne, num único bloco, os conceitos que um elemento do produto governa: suas definições, regras e políticas. As células se agrupam em áreas por relação forte, medida, e nunca por tipo de informação.
2. **Densa.** Evita-se ao máximo a formatação e a separação em seções: o significado vem da posição no texto. A redação é objetiva e sucinta, pode usar símbolos e notações convencionadas, e não diz o que não precisa ser dito. Cada linha traz uma afirmação, e a única prosa é a frase que define cada célula; explicações e exemplos ficam nos documentos derivados.
3. **Hierárquica.** A estrutura vem de títulos, que organizam os blocos, e de sub-itens, que detalham as linhas. A profundidade de ambos é livre: usa-se a que o conteúdo pedir.
4. **Fonte única da verdade.** Descreve só o que foi comprometido, e cada afirmação verificável diz se está implementada ou não. Ideias, histórico e justificativas ficam fora.
5. **Sem redundância.** Cada termo e cada regra são escritos uma vez. Índices, mapas, glossários e tudo o mais que se deriva mecanicamente são gerados por programa, de forma determinística, e nunca mantidos manualmente, nem por pessoas nem por agentes de IA.
6. **Linguagem ubíqua.** Um termo, um significado, em todo o produto. Sinônimos proibidos são declarados e verificáveis.
7. **Base para extrair outros documentos.** Visão, casos de uso, regras de negócio, cenários de teste e manuais são derivados: redigidos por um agente de IA a partir da fonte, por um prompt especializado, e com a origem de cada afirmação.
8. **Verificável por programa.** A gramática é fixa para que um programa cheque a especificação sem interpretar o texto.
9. **Rastreável.** Cada afirmação tem um identificador estável, que nunca é renumerado nem reaproveitado.
10. **Fundamentada em decisões.** As pequenas decisões por trás das afirmações ficam em anotações densas à parte, por área, e citam as linhas que governam.
11. **Explícita sobre lacunas.** Dúvidas sobre o que foi comprometido viram perguntas abertas, versionadas junto do texto, em vez de serem preenchidas por suposição.
12. **Não técnica.** Descreve o que o sistema é e o que ele faz para o negócio, sem entrar em questões técnicas, que começam no documento de arquitetura. Também não documenta o negócio em si, isto é, como ele funciona sem o sistema.
13. **Acessível para humanos e eficiente para agentes de IA.** Markdown simples, legível sem renderização por quem conhece a legenda; agentes leem só a área de que precisam e seguem regras explícitas.

## Diferenciais em relação a RUP, ágil, BDD e DDD

RUP, os métodos ágeis, BDD e DDD são abordagens amplas de processo, de prática e de modelagem. A comparação abaixo trata só de como cada uma documenta o produto. O Tabularium é compatível com as quatro e aproveita ideias de todas.

Usar o formato Tabularium para guardar a especificação não impede que a equipe adote a metodologia de sua preferência para amadurecer o entendimento do problema de negócio que a aplicação vai atender. O formato também não define, por ora, como uma mudança na especificação é proposta, revisada e aceita: isso fica com o processo da equipe.

Na tabela, a coluna do Tabularium descreve o que o formato pretende; o que já existe está no aviso do início.

| Aspecto | RUP | Ágil | BDD | DDD | Tabularium |
| --- | --- | --- | --- | --- | --- |
| Unidade de organização | Artefato por tipo: visão, casos de uso, regras, especificação suplementar | História de usuário, num backlog | Funcionalidade e cenário | Contexto delimitado, ligado a modelo e equipe | Célula de conceitos, agrupada em áreas por relação medida |
| Onde está tudo sobre uma coisa do domínio | Espalhado por vários artefatos | Espalhado por histórias de várias iterações; o estado atual do produto não está escrito | Espalhado por cenários de várias funcionalidades | No modelo e no código; a documentação é informal | Num único bloco |
| Redundância | Alta: casos de uso remetem a regras, glossário repete o modelo | Alta: histórias novas se sobrepõem às antigas | Alta: contexto repetido a cada cenário | Baixa no código, sem controle na documentação | Proibida, e verificável por programa |
| Forma do texto | Modelos de documento em prosa | "Como…, quero…, para…" e critérios de aceite | Dado/Quando/Então | Diagramas e conversa | Lista densa com gramática fixa |
| Verificação automática | Não há | Não há | Do sistema, pelos cenários executáveis; não da documentação | Não há | Da própria especificação |
| Outros documentos | Cada artefato escrito à mão | Escritos à mão, quando existem | Relatórios de execução | Não há | Derivados da fonte: índices e glossário por programa, os demais redigidos por agente de IA |
| Justificativas | Diluídas nos documentos, quando existem | Ficam na conversa | Raramente registradas | Ficam na conversa | Pequenas decisões em anotações densas à parte, que citam as linhas que governam |
| Lacunas | Implícitas | Tratadas na conversa, durante o refinamento | Cartões vermelhos do Example Mapping, fora do texto | Ficam na conversa | Perguntas abertas versionadas e linhas provisórias marcadas |
| Agentes de IA | Não trata | Não trata | Não trata | Não trata | Instruções próprias e gramática que um agente consegue seguir |

O Tabularium adota ideias de cada uma dessas abordagens e deixa outras de fora, de propósito:

| Abordagem | O que o Tabularium adota | O que não adota, e por quê |
| --- | --- | --- |
| RUP | Começar a descrição do produto pelo problema que ele resolve. Registrar as organizações e os sistemas de fora que influenciam as regras. Descrever cada ação do usuário com suas pré-condições e exceções. Usar a lista FURPS+ para revisar se falta algum requisito de qualidade. | Um documento para cada tipo de informação, porque isso espalha o mesmo assunto por vários lugares. Casos de uso escritos como passos numerados, porque ficam longos e repetem as regras. |
| Ágil | Descrever cada ação dizendo quem a faz e o que quer alcançar, com critérios de aceite. Manter as ideias ainda não aprovadas fora da especificação, num backlog. | Guardar as histórias como documentação do produto. Cada história descreve uma mudança pedida num certo momento; juntas, elas não mostram como o produto é hoje. |
| BDD | Usar exemplos concretos para descobrir regras. Registrar por escrito as dúvidas que aparecem. Fazer cada teste citar a regra que ele verifica. | Escrever a especificação em Dado/Quando/Então. A notação é longa e repete o contexto a cada cenário; no Tabularium, os cenários são derivados da especificação. |
| DDD | Um vocabulário único, usado por todos, com um só significado por termo. Registrar os fatos importantes do domínio e o que acontece em consequência de cada um. Separar o que o usuário faz do que ele apenas consulta. | Dividir o produto em contextos, cada um com vocabulário próprio. Essa divisão é uma decisão de arquitetura, e o Tabularium mantém um vocabulário só para o produto inteiro. |

## Organização dos arquivos

```
README.md            esta explicação (fora da especificação)
specs/
  AGENTS.md          instruções para agentes de IA
  _convencoes.md     legenda do formato; igual em todo projeto
  _produto.md        o que vale para o produto inteiro
  _perguntas.md      perguntas abertas (opcional)
  <area>.md          uma área: coleção de células de conceitos fortemente relacionadas; um arquivo por área
decisoes/
  <area>/            pequenas decisões em anotações densas, uma por arquivo (fora da especificação)
```

Lê-se primeiro `_convencoes.md`, depois `_produto.md`, depois qualquer área (ESP-R4). Cada área pode ser lida sozinha, porque o Índice gerado no seu topo lista o que ela usa de outras, as perguntas abertas que a tocam e quais linhas têm decisões.

`_produto.md` guarda só o que vale para o conjunto e não pertence a nenhuma célula: o propósito (começando pelo problema que o produto resolve), a tabela de áreas, os atores, os tipos comuns, as jornadas, os externos, as regras globais e o que está fora de escopo.

## Como reconhecer uma célula

O que faz de algo uma célula é ser **dona** de afirmações; agrupar informações relacionadas é consequência, não critério.

Para classificar um item, para-se no primeiro teste com resposta sim (CEL-R9):

| Teste | É |
| --- | --- |
| É algo que um ator faz ou vê? | Capacidade ou visão da célula que altera ou exibe |
| É uma sequência de ações? | Jornada |
| É um fato que acontece e provoca reação? | Evento |
| É quem age? | Ator |
| É algo fora do produto que uma regra pressupõe? | Externo |
| É um valor sem identidade, como número, código, data ou faixa? | Tipo de valor |
| É característica, estado ou cálculo de outra coisa? | Atributo ou derivado no modelo dela |
| É um agrupamento de coisas que já são células? | Área |
| Há algo a afirmar sobre ela que não pertence a nenhuma outra? | Célula |
| Nenhum dos anteriores | Termo na linguagem da área |

Uma tela não é célula: é um conjunto de visões. Uma capacidade ou visão sem dono natural revela uma célula que falta (CEL-R10). Uma capacidade que altera mais de uma célula mora numa só, e as outras reagem a um evento dela (CAP-R2).

## O bloco de célula

O bloco de célula é o centro do formato. Ele reúne num só lugar o que a célula é, como é composta, o que acontece com ela, as regras que valem sobre ela, o que os atores fazem com ela e o que veem dela. Um exemplo, de um sistema de pedidos:

```markdown
## Pedido  `PED`
Solicitação de compra de um **Cliente**, com os **Produtos** e as quantidades escolhidas.
- pertence a 1 **Cliente**; inverso: 0..N
- número: texto; identidade; único; imutável
- situação: aberto | aguardando pagamento | pago | enviado | cancelado; inicial: aberto
- total: dinheiro; derivado; soma de preço × quantidade dos **Itens de pedido** (~~valor, montante~~)
- evento: Pedido pago
- [x] PED-R1  Visível só ao **Cliente** dono e ao **Atendente**
- [x] PED-R2  Ao **Cliente excluído**: pedidos em aberto são cancelados
- [x] PED-C1  Fechar o pedido
  - exige: ao menos um item
  - se algum **Produto** está sem estoque: o fechamento é recusado com aviso ⟵ [P03]
  - a situação passa a aguardando pagamento
- [ ] PED-C2  Cancelar o pedido
  - exige: situação aberto, aguardando pagamento ou pago
  - se já foi pago: o pagamento é estornado
  - a situação passa a cancelado
- [x] PED-V1 · atendente  Ver os pedidos de qualquer cliente
```

O título traz o nome e a sigla da célula. Logo abaixo vem a frase de definição, que precisa ser compreensível fora do bloco, porque é ela que aparece no glossário gerado (CEL-R2). Depois vem uma lista única, sempre na mesma ordem (CEL-R3):

1. **Modelo:** as linhas sem identificador. Descrevem atributos, pertencimentos, estados e valores derivados.
2. **Eventos:** linhas `evento:`, com os fatos que a célula produz e aos quais alguma outra célula reage.
3. **Linhas com identificador,** na ordem dos papéis: R, Q, C, V, T.

Não há subtítulos dentro do bloco. A letra do identificador já diz o papel da linha, e um subtítulo repetiria essa informação. Títulos de vários níveis servem só para organizar os blocos em hierarquia.

Cada linha R, Q, C, V ou T começa com `[x]` se o produto a cumpre por inteiro, ou `[ ]` se não (LIN-R4). Não há estado parcial: uma linha cumprida em parte está agregada demais e deve ser dividida (LIN-R5). Só fatos verificáveis levam marca. A célula não tem estado (CEL-R8), e as jornadas estão implementadas quando todas as linhas que citam estão (JOR-R4). Para um agente que vai implementar, o trabalho pendente é simplesmente o conjunto das linhas `[ ]`.

## Papéis de linha

| Papel | Significa |
| --- | --- |
| R | Regra: sempre verdadeira, independe de ação de um ator |
| Q | Qualidade: como o produto se comporta, como um limite de tempo |
| C | Capacidade: algo que um ator faz e que altera estado |
| V | Visão: algo que um ator vê, sem alterar nada (inclui exportar e copiar) |
| T | Declaração: o que um texto do produto afirma, como uma política de privacidade |
| J | Jornada: sequência de capacidades e visões que é escolha de produto; só em `_produto.md` |

Os sub-itens de uma capacidade ou visão são **critérios**, e a forma diz o tipo de cada um (CRT-R3 a CRT-R5):

- `exige:` indica uma pré-condição.
- `se …:` indica um fluxo alternativo ou uma exceção.
- Sem prefixo, o critério é um resultado.

Isso é tudo o que é preciso para gerar um caso de uso completo, sem a prolixidade dos passos numerados.

## Identificadores, lápides e citação

Toda linha com papel tem um identificador no formato `SIGLA-PN`: a sigla da célula, a letra do papel e um número sequencial. `PED-C2` é a segunda capacidade do Pedido. Os identificadores nunca são renumerados, e um número usado nunca volta (IDT-R2).

Uma linha retirada vira **lápide** no mesmo lugar, para que as referências antigas continuem resolvendo (LAP-R1):

```markdown
- [ ] PED-R7  removida
```

A lápide nasce `[ ]` e passa a `[x]` quando o produto deixa de ter o comportamento retirado (LAP-R4).

Uma correção de redação mantém o identificador e a marca. Uma mudança de significado retira a linha e cria outra (LIN-R3), que nasce `[ ]`: a lápide e a linha nova ficam pendentes até o produto acompanhar, e o agente enxerga a mudança sem precisar comparar versões. Mover uma célula de uma área para outra não muda nenhum identificador (ARE-R3).

Lápides acumuladas viram ruído e pesam contra a densidade. Por isso podem ser podadas, quando quem mantém a especificação achar oportuno: sai a lápide `[x]` que nenhuma linha e nenhuma decisão ainda cita (LAP-R9). O número dela continua sem voltar, e quem o lembra é o controle de versão.

## Linguagem ubíqua

Cada termo é definido uma única vez, sem negrito, no lugar mais específico que o comporta (TRM-R1):

| Tipo de termo | Onde é definido |
| --- | --- |
| Célula | Título do bloco e frase de definição |
| Atributo, estado ou derivado | Linha de modelo da célula |
| Tipo de valor | Seção `Tipos` da área, ou `Tipos comuns` em `_produto.md` |
| Evento | Linha `evento:` da célula que o produz |
| Ator ou externo | `Atores` ou `Externos` em `_produto.md` |
| Qualquer outro termo | Seção `Linguagem` da área |

Fora do lugar de definição, o termo aparece em negrito na primeira menção dentro de cada item (TRM-R7). Assim, um programa sabe exatamente quais termos cada linha usa, sem interpretar o texto. Sinônimos que não devem ser usados vêm tachados e entre parênteses, no fim da linha que define o termo, como em `(~~valor, montante~~)`, e o verificador acusa quem os usar.

Não existe glossário escrito à mão. Ele é gerado por programa, juntando todas as definições, cada uma com o tipo de termo e o lugar de origem.

## Atributos

As linhas de modelo descrevem os atributos como o negócio os vê: `nome: tipo; qualificadores`. Depois do `;` só entram qualificadores, de um vocabulário fechado (ATR-R7):

| Qualificador | Significa |
| --- | --- |
| identidade | Distingue uma instância das outras; torna a célula uma entidade |
| único | O valor não se repete entre instâncias |
| imutável | O valor não muda depois de criado |
| opcional | O valor pode faltar; sem o qualificador, é obrigatório |
| inicial: X | Valor ao nascer |
| derivado | Calculado a partir de outros atributos; a fórmula vem em seguida |
| pessoal | Dado pessoal; a lista de dados tratados de uma política de privacidade é gerada destes |
| inverso: N | Cardinalidade da relação vista da outra célula |

Só entra o atributo que o usuário vê ou do qual alguma linha depende. Códigos internos, datas de auditoria, formato, máscara e tamanho máximo pertencem à arquitetura (ATR-R3 a ATR-R5).

## Relações entre células

Três relações ligam as células, todas escritas como linhas de modelo e todas conceituais: dizem como o negócio vê o domínio, não como os dados são guardados (CEL-R20).

| Relação | Forma | Significa |
| --- | --- | --- |
| Pertencimento | `pertence a 1 **Pedido**` | A parte tem um só dono e não existe sem ele |
| Associação | `1 **Produto**` ou `comprador: 1 **Cliente**` | Uma coisa se refere a outra, que existe por si; o nome do papel só aparece quando difere do nome da célula |
| Especialização | `especializa **Pagamento**` | Caso particular, que herda o modelo e as linhas do geral e só declara o que acrescenta |

```markdown
## Item de pedido  `ITP`
Um **Produto** e a quantidade dele dentro de um **Pedido**.
- pertence a 1 **Pedido**; inverso: 1..N
- 1 **Produto**; inverso: 0..N
- quantidade: inteiro maior que zero

## Pagamento por cartão  `PGC`
**Pagamento** feito com cartão de crédito, que pode ser parcelado.
- especializa **Pagamento**
- parcelas: inteiro de 1 a 12
- [x] PGC-R1  Parcelamento só acima do valor mínimo da loja
```

As cardinalidades são `1`, `0..1`, `0..N` e `1..N`, e em associações substituem o qualificador `opcional`. Cada relação é declarada numa só das duas células; o outro lado, quando importa, vai em `inverso:` (ATR-R9). Um caso particular sem linhas próprias não é especialização, e sim o valor de um atributo (CEL-R19). Com as relações declaradas assim, o diagrama de domínio é derivado, nunca desenhado à mão.

## Eventos e reações

Quando algo que acontece numa célula afeta outra, o efeito é escrito na célula afetada, nunca na que produz o fato (CEL-R5). A célula que produz declara o evento, e a que é afetada escreve uma reação:

```markdown
## Cliente  `CLI`
- evento: Cliente excluído

## Pedido  `PED`
- [x] PED-R2  Ao **Cliente excluído**: pedidos em aberto são cancelados
```

Quem lê o bloco do Pedido vê tudo o que pode acontecer com ele, inclusive o que vem de fora. Quem lê o bloco do Cliente não vê o que a exclusão provoca: essa visão inversa, de quem reage a cada evento, está no Índice gerado. Um evento só existe se alguma regra reage a ele (EVT-R2), o que evita listar toda mudança de estado. Eventos são fatos do domínio, não mensagens do sistema: a arquitetura decide como realizá-los.

## Onde mora cada regra

As regras não recebem rótulo de tipo. O tipo é dado pelo lugar e pela forma (REG-R1):

| Tipo de regra | Onde mora |
| --- | --- |
| Invariante de dado | Modelo: tipo e cardinalidade |
| Cálculo | Modelo: atributo derivado com a fórmula |
| Reação a evento | R iniciada por `Ao **Evento**:` |
| Prazo | R marcada `· tempo` |
| Validação de entrada | Critério de uma capacidade |
| Permissão | Marca de ator em C e V |
| Comportamento geral | Q |
| Combinação de condições | Tabela de decisão |

A **tabela de decisão** é uma R terminada em `:` e seguida de uma tabela, com as condições à esquerda e os resultados à direita. Cada combinação aparece exatamente uma vez, e o verificador acusa combinações faltando ou repetidas (TDD-R3).

## Células evoluem

As células são a forma de organizar o conhecimento, e o conhecimento muda. À medida que a especificação cresce, uma célula pode se dividir, se fundir com outra, ser rebaixada a atributo, ser promovida a partir de um atributo ou mudar de área. O que precisa ser estável não é o agrupamento, e sim as afirmações e suas identidades.

Quando uma linha muda de dono, ela ganha o identificador da nova célula e herda a marca de implementação, porque o comportamento não mudou. No lugar antigo fica uma lápide que redireciona as referências (LAP-R5, LAP-R7):

```markdown
- [x] PED-C3  movida → [ENT-C1]
```

Siglas de células extintas ou fundidas, como os números, nunca voltam (CEL-R14). O verificador deve sinalizar, como alerta, quando reagrupar: célula grande demais, célula sem linhas próprias, linha que cita mais outra célula do que a sua, duas células que só aparecem juntas. A decisão continua sendo de quem escreve.

## Atores, externos e jornadas

**Atores** são definidos pelo acesso que têm, não pelo estado em que estão. Um deles é o padrão; as linhas dos demais levam uma marca logo após o identificador, como `· atendente` (ATO-R1, ATO-R2).

**Externos** são sistemas ou organizações fora do produto que alguma regra pressupõe: um provedor de identidade, um órgão regulador, o titular de direitos sobre um conteúdo. Cada um diz o que guarda, fornece, recebe ou impõe (APR-R8).

**Jornadas** registram as sequências de capacidades e visões cuja ordem é escolha de produto, como uma lista de identificadores: `PRD-J1  Primeira compra: [CLI-C1] → [PED-C1] → [PAG-C1]`.

## Áreas

Uma área é um arquivo que agrupa células fortemente relacionadas. Ela se forma em torno de uma **célula central** e das células que dependem principalmente dela (ARE-R8). Área é só organização: não tem sigla, não redefine termos, e mover uma célula entre áreas não muda nenhum identificador.

A proximidade lógica é medida, não apenas declarada. Para cada célula, contam-se as referências feitas e recebidas, por área. Uma célula que troca mais referências com outra área do que com a sua é candidata a mudar de lugar (ARE-R9). Ao escrever a especificação do próprio formato, essa medição, feita ainda sem o verificador, revelou uma área inteira que existia por afinidade temática, sem relação real entre suas células, e uma redundância escondida na lista de checagens do verificador.

## Perguntas abertas

Dúvidas que surgem sobre o que já foi comprometido ficam em `_perguntas.md`, uma por item, com opções quando houver. Ideias não são perguntas: ficam no rastreador até amadurecerem (PER-R8).

```markdown
- P03  Fechar pedido com produto sem estoque: recusar o fechamento ou fechar sem o item?
  - opção: recusar com aviso
  - opção: fechar sem o item e avisar o cliente
```

Uma linha provisória aponta para a pergunta com `⟵ [P03]`. Se a lacuna é justamente a falta de uma linha, a pergunta diz sobre qual célula é (`sobre: **Entrega**`), e nunca as duas coisas (PER-R4). Não existe estado "respondida": responder é apagar a pergunta e, na mesma mudança, tirar a marca das linhas que a citavam (REF-R5). Se a resposta precisar de justificativa, vira uma decisão.

## O que fica fora da especificação

| O quê | Onde fica | Como se liga |
| --- | --- | --- |
| Justificativas | `decisoes/<area>/`, em anotações densas, uma por arquivo; só se abre quando se quer o porquê | A decisão cita os identificadores das linhas que embasa; uma linha pode ter várias decisões, e a especificação não cita nenhuma |
| Ideias e pedidos não comprometidos | Rastreador | Viram linhas `[ ]` quando comprometidos |
| Histórico de mudanças | Controle de versão | Lápides e identificadores estáveis |
| Explicações e exemplos | Documentos derivados | Cada afirmação cita sua origem |

Cada decisão é um arquivo com um cabeçalho curto, que diz o tema, a escolha numa frase, quando vale a pena abri-la e os identificadores das linhas que governa, e um corpo em lista com o contexto, as alternativas descartadas e as consequências. A pasta só guarda decisões vigentes: a que deixa de valer é apagada, e o controle de versão guarda o passado.

## Verificação e geração

A gramática é fixa para que um programa, o **Verificador**, consiga checar a especificação sem interpretar o texto (VRF-R3). Ele ainda não existe. Será um script determinístico, em Node e só com módulos nativos, entregue neste repositório dentro de uma skill: o agente o executa e lê a saída, mas não o substitui (VRF-R5). As regras que ele vai checar terminam com a severidade, `· erro` ou `· alerta` (VRF-R4): identificadores únicos e nunca reaproveitados, referências que resolvem, termos definidos uma única vez, primeira menção em negrito, eventos com reação, tabelas de decisão completas, linhas na ordem certa, perguntas citadas ou com `sobre:`, áreas coesas e blocos dentro do tamanho.

O mesmo programa vai gerar o que se deriva mecanicamente: o Índice de cada área, o mapa entre áreas, o glossário, a lista de dados pessoais e as definições de link. Essas partes são sempre iguais para a mesma especificação.

## Documentos derivados

Os documentos tradicionais são outra classe: são redigidos por um agente de IA a partir da especificação, com um prompt especializado para cada documento (DER-R4). Nunca são editados à mão, e cada afirmação cita o identificador ou o termo de origem (DER-R1, DER-R2). Uma afirmação sem origem é invenção de quem gerou ou lacuna da especificação, e as duas descobertas são úteis.

Duas gerações do mesmo documento não saem iguais. Guardá-los sob controle de versão é escolha da equipe, que assume o risco de ficarem defasados; ela pode também automatizar a regeração a cada mudança na especificação. Propagar essas atualizações não é responsabilidade do formato (DER-R5).

| Documento | De onde sai |
| --- | --- |
| Visão | `Propósito`, atores, externos e fora de escopo |
| Modelo de domínio | Linhas de modelo e relações entre células |
| Catálogo de regras de negócio | Todas as R |
| Especificação suplementar | As Q e as regras globais |
| Casos de uso | C (ator e objetivo), critérios `exige:`, `se …:` e de resultado, reações e jornadas |
| Cenários de teste | Modelo (dado), C ou evento (quando), critérios e reações (então) |
| Manual do usuário | Capacidades e visões, na ordem das jornadas |

## Trabalhando com agentes de IA

O arquivo `specs/AGENTS.md` ensina um agente a ler, consultar e alterar a especificação: o que ler antes de cada tarefa, onde colocar cada tipo de informação, as regras que nunca se quebram (como não renumerar e não editar seções geradas) e quando parar e perguntar em vez de inventar. A revisão por categorias FURPS+ não gera requisitos: gera perguntas abertas, porque uma categoria vazia pode ser uma lacuna ou uma escolha consciente.

## Como começar

1. Copie `AGENTS.md` e `_convencoes.md` para a pasta `specs/` do seu projeto, sem alterar.
2. Escreva `_produto.md`: o problema, os atores e as primeiras áreas.
3. Para cada célula central, crie a área e escreva os blocos: definição, modelo, regras, capacidades e visões, cada linha verificável marcada `[x]` ou `[ ]`.
4. Registre em `_perguntas.md` as dúvidas sobre o que foi comprometido, em vez de chutar. Ideias vão para o rastreador.
5. Confira cada mudança pela lista de `AGENTS.md`. Quando o verificador existir, rode-o a cada mudança e acompanhe os alertas de coesão.

## Limites e cuidados

- **As afirmações deste README ainda são hipóteses.** As duas aplicações de exemplo vão pôr à prova: se a célula basta ao agente para uma tarefa; se um agente descobre e entende a aplicação com facilidade; se um novato aprende o sistema, pela fonte e pelos derivados; se o formato sem prosa comporta tudo o que um produto real precisa dizer; se a proximidade medida aponta agrupamentos melhores; e se é fácil exportar para outros documentos. Que as linhas `[ ]` conduzem uma implementação é intenção, e não está entre as hipóteses em teste.
- **O verificador é parte do formato, não um acessório.** Sem ele, as regras de unicidade, de referência e de coesão dependem de disciplina, que não sobrevive a muitos autores. Enquanto ele não existir, é assim que o formato funciona.
- **Um produto, uma linguagem.** Uma especificação descreve um só produto, com um significado por termo (ESP-R8). Quando dois significados legítimos do mesmo termo não se conciliam, são dois produtos, cada um com a sua especificação.
- **A marca `[x]` vale o cuidado de quem a mantém.** Ela precisa ser atualizada a cada evolução do código, e o formato ainda não diz o que prova que continua verdadeira. Numa especificação guardada longe do código, como nos repositórios de exemplo, as marcas são um retrato datado.
- **O trabalho em equipe ainda não está resolvido.** O formato não trata, por ora, de dois autores que criam o mesmo identificador em paralelo, nem de quem do negócio aprova uma mudança e sobre qual texto.
- **A densidade favorece quem consulta e cobra de quem chega.** A resposta do formato são os documentos derivados. Se as pessoas passarem a editar os derivados por serem mais fáceis, a fonte apodrece. Por isso os derivados devem ser gerados, nunca copiados.
- **O formato não substitui a conversa.** Ele registra decisões de produto, mas não as toma. As perguntas abertas existem justamente para que a especificação mostre o que ainda não foi decidido.
- **A justificativa de cada escolha deste formato deveria estar em `decisoes/`.** Este README resume algumas delas, mas, pelas regras do próprio formato, esse é o lugar errado para guardá-las.
