# Redação
As **Linhas** de um bloco: o que cada uma afirma, quem age, a que **Eventos** reage e como são identificadas, citadas e retiradas.

## Linguagem
- reação: **Regra** iniciada por `Ao **Evento**:`; mora no bloco da **Célula** que reage
- afirmação: **Linha** que pode ser verificada no produto; de papel R, Q, C, V, T ou J ⟸ [D18]

## Linha  `LIN`
Item da **lista única** de um bloco; com **Identificador**, é citável.
- 0..1 **Identificador**
- implementada: sim | não
- evento: Afirmação retirada
- [x] LIN-R1  Uma **afirmação** diz uma só coisa
- [x] LIN-R2  Cada linha pertence a uma só **Célula**, mesmo quando envolve várias
- [x] LIN-R3  Correção de redação mantém o **Identificador**; mudança de significado retira a **afirmação** e cria outra ⟸ [D58]
- [x] LIN-R4  **Afirmação** de papel R, Q, C, V ou T começa com `[x]` se o produto a cumpre por inteiro, ou `[ ]` se não ⟸ [D61, D64]
- [x] LIN-R5  Não há estado parcial; **afirmação** cumprida em parte é agregada demais e deve ser dividida ⟸ [D62]
- [x] LIN-R6  removida
- [x] LIN-R7  Linha de **modelo** não tem marca de implementação
- [x] LIN-R8  **Afirmação** que cita outra **Célula** mais do que a própria é candidata a mudar de dono
- [x] LIN-R9  **Afirmação** nova nasce `[ ]`, exceto a movida, que herda a marca
- [x] LIN-R10  **Afirmação** descreve o que o produto faz, nunca como ele é construído ⟸ [D74]
- [x] LIN-R11  Num bloco de **Célula**, toda linha tem uma destas formas:

| Linha | Forma | Regra |
| --- | --- | --- |
| **definição** | prosa, logo após o título | [CEL-R2] |
| **Atributo** | `- nome: tipo; qualificadores` | [ATR-R1] |
| associação sem papel | `- CARD **Célula**`, com qualificadores depois de `;` | [ATR-R8] |
| pertencimento | `- pertence a 1 **Célula**`, com qualificadores depois de `;` | [CEL-R15] |
| especialização | `- especializa **Célula**` | [CEL-R16] |
| **Evento** | `- evento: Nome` | [TRM-R1] |
| **afirmação** | `- [x] CÓDIGO  texto` ou `- [ ] CÓDIGO  texto`, com dois espaços antes do texto | [LIN-R4] |
| **afirmação** com **Ator** | `- [x] CÓDIGO · ator  texto` | [ATO-R2] |
| **Lápide** | `- [ ] CÓDIGO  removida` ou `- [x] CÓDIGO  movida → [NOVO]` | [LAP-R1], [LAP-R5] |
| **Critério** | sub-item de uma **Capacidade** ou de uma **Visão** | [CRT-R6] |
| fileira de **Tabela de decisão** | depois da R terminada em `:` e de uma linha em branco | [TDD-R1] |
| fileira de **Dados de referência** | como a de **Tabela de decisão** | [DRF-R4] |
| **Dados de referência** em arquivo | `- [ ] CÓDIGO  texto: [SIGLA-nome-curto.json]`, ou com `.csv` | [DRF-R15] |

- [x] LIN-C1  Acrescentar uma **afirmação**
  - no bloco da **Célula** dona, na posição do seu papel
  - com o próximo número livre, conforme [IDT-R2]
- [x] LIN-C2  Retirar uma **afirmação**
- [x] LIN-C3  Corrigir a redação de uma **afirmação**

## Identificador  `IDT`
Código que torna uma **Linha** citável.
- código: **Código de identificador**; identidade; único; imutável ⟸ [D55]
- sigla: **Sigla de célula**
- papel: **Letra de papel**
- número: inteiro sequencial por sigla e papel
- [x] IDT-R1  Código válido e **único** na **Especificação**
- [x] IDT-R2  Nunca é renumerado; número já usado não volta ⟸ [D56]
- [x] IDT-R3  A sigla é a da **Célula** dona da **Linha**, ou `PRD` no **Arquivo de produto**

## Lápide  `LAP`
**Linha** que ocupa o lugar de uma **afirmação** que foi retirada, para que as **Referências** antigas continuem resolvendo.
- especializa **Linha**
- forma: `- [ ] CÓDIGO  removida`, para **afirmação** retirada, ou `- [x] CÓDIGO  movida → [NOVO]`, para a que mudou de dono
- [x] LAP-R1  Ao **Afirmação retirada**: o **Identificador** vira lápide no mesmo lugar ⟸ [D57]
- [x] LAP-R2  Lápide nunca volta a ser **afirmação**
- [ ] LAP-R3  **Referência** a lápide continua válida, mas indica texto a revisar
- [x] LAP-R4  removida
- [x] LAP-R5  **Afirmação** que muda de **Célula** dona ganha **Identificador** da nova dona e deixa no lugar antigo a lápide `movida → [NOVO]` ⟸ [D28]
- [x] LAP-R6  Lápide `removida` nasce `[ ]` e passa a `[x]` quando o produto deixa de ter o comportamento retirado
- [x] LAP-R7  Lápide `movida` tem a mesma marca da **afirmação** para onde aponta
- [ ] LAP-R8  **Referência** a lápide `movida` resolve para o novo **Identificador**
- [x] LAP-R9  Lápide `[x]` que nenhuma **Referência** cita pode ser podada; o **Identificador** dela continua sem voltar ⟸ [D07]
- [x] LAP-C1  Podar as lápides
  - exige: lápide marcada `[x]`
  - exige: nenhuma **Referência** a cita
  - a lápide sai do bloco
  - o **Arquivo de contadores** impede que o número volte

## Referência  `REF`
Citação, em um lugar, de algo definido em outro.
- forma: `[CÓDIGO]` para **Linha**, `**Nome**` para **Termo**, `⟵ [Pnn]` para **Pergunta**, `⟸ [Dnn]` para **Decisão**, `[arquivo]` para **Arquivo de dados**
- [x] REF-R1  Toda referência resolve para algo definido
- [x] REF-R2  Ao **Termo renomeado**: toda referência ao **Termo** passa a usar o novo nome
- [x] REF-R3  removida
- [ ] REF-R4  Referência a **Linha** não leva link no texto; as definições de link são geradas
- [x] REF-R5  Ao **Pergunta respondida**: as referências a ela saem das **Linhas** na mesma mudança
- [x] REF-R6  removida
- [x] REF-R7  removida
- [x] REF-R8  removida
- [x] REF-R9  Qualquer item de lista cita **Decisões** com `⟸ [Dnn]` no fim, várias separadas por vírgula; uma decisão pode ser citada por vários itens ⟸ [D09, D16, D67]
- [x] REF-R10  A **Decisão** não cita os itens que a citam ⟸ [D09]
- [x] REF-R11  **Definição** de **Célula** e **Lápide** não citam **Decisão**
- [x] REF-R12  removida
- [x] REF-R13  **Afirmação** que muda de **Célula** leva consigo as suas citações de **Decisão**
- [x] REF-R14  Ordem das marcas no fim de um item: `⟸ [Dnn]`, `⟵ [Pnn]`; em **Tabela de decisão** e em **Dados de referência**, antes do `:`

## Pergunta  `PER`
Lacuna conhecida da **Especificação**, ainda sem resposta.
- código: **Código de pergunta**; identidade; único; imutável
- enunciado: texto em forma de pergunta
- opções: sub-itens `opção:`; opcional
- sobre: 0..1 **Célula**
- evento: Pergunta respondida
- [x] PER-R1  Código já usado não volta
- [x] PER-R2  **Linha** provisória termina com `⟵ [Pnn]` ⟸ [D65]
- [x] PER-R3  A pergunta não lista as **Linhas** que a citam ⟸ [D65]
- [x] PER-R4  **sobre** só existe quando nenhuma **Linha** cita a pergunta
- [x] PER-R5  Pergunta sem **sobre** e sem **Linha** que a cite
- [x] PER-R6  Estar no **Arquivo de perguntas** é estar aberta; não há estado de respondida ⟸ [D66]
- [x] PER-R7  Responde o **Dono de área** da **Área** afetada
- [x] PER-R8  Pergunta é dúvida sobre algo já comprometido; ideia não é pergunta ⟸ [D60]
- [x] PER-C1  Abrir uma pergunta
  - no **Arquivo de perguntas**, com o próximo número livre
- [x] PER-C2  Responder uma pergunta
  - a pergunta sai do **Arquivo de perguntas**
  - resposta que precisa de justificativa vira **Decisão**: o **enunciado** vira a **questão**, e as **opções** não escolhidas, as **alternativas descartadas**

## Arquivo de perguntas  `APG`
Arquivo com as **Perguntas** abertas da **Especificação**, uma por item, em ordem de número.
- arquivo: `_perguntas.md`; opcional
- [ ] APG-R1  Lista plana, sem agrupamento; a **Área** de cada **Pergunta** é derivável
- [ ] APG-R2  Guarda só a **Pergunta** e as opções; a discussão fica fora
- [x] APG-R3  removida
- [ ] APG-R4  As **Perguntas** ficam só neste arquivo, nunca num **Rastreador** ⟸ [D76]
- [x] APG-R5  Forma do item: `- Pnn  enunciado?`, com dois espaços antes do **enunciado**; **opções** e **sobre** vêm em sub-itens `opção:` e `sobre:`
- [x] APG-R6  O título e a frase de abertura do arquivo são opcionais

## Evento  `EVT`
Fato do produto, no particípio, ao qual alguma **Regra** reage.
- nome: texto no particípio; único
- produtora: 1 **Célula**
- [ ] EVT-R1  Não é uma mensagem do sistema; a arquitetura decide como realizá-lo
- [x] EVT-R2  Só existe se ao menos uma **reação** o cita ⟸ [D40]
- [ ] EVT-R3  Transição de estado cita o evento que a dispara, como `aguardando pagamento → pago: ao **Pagamento confirmado**`

## Regra  `REG`
**Afirmação** sempre verdadeira sobre uma **Célula**, independente de ação de um **Ator**; papel R.
- especializa **Linha**
- [x] REG-R1  Lugar de cada tipo de regra:

| Tipo de regra | Lugar |
| --- | --- |
| invariante de dado | **modelo**: tipo e **Cardinalidade** |
| cálculo | **modelo**: **Atributo** **derivado** com a fórmula |
| **reação** a **Evento** | R iniciada por `Ao **Evento**:` |
| prazo | R marcada `· tempo` |
| validação de entrada | **Critério** de uma **Capacidade** |
| permissão | marca de **Ator** em C e V |
| comportamento do produto | **Qualidade** |
| combinação de condições | **Tabela de decisão** |
| conteúdo que já vem com o produto | **Dados de referência** |
| outra | R sem marca |

- [ ] REG-R2  Regra não leva rótulo de tipo; o tipo vem do lugar e da forma ⟸ [D37]

## Tabela de decisão  `TDD`
**Regra** escrita como tabela que dá um resultado para cada combinação de condições.
- especializa **Regra**
- [x] TDD-R1  É uma R terminada em `:` e seguida da tabela; a tabela inteira responde pelo **Identificador** ⟸ [D38]
- [ ] TDD-R2  Colunas de condição à esquerda; de resultado, à direita
- [ ] TDD-R3  Cada combinação de condições aparece exatamente uma vez
- [ ] TDD-R4  `qualquer` vale para todos os valores de uma condição

## Dados de referência  `DRF`
**Regra** que enumera as instâncias de uma **Célula** que já vêm com o produto e só mudam por uma nova versão dele.
- especializa **Regra**
- 0..1 **Arquivo de dados**; inverso: 1
- [x] DRF-R1  Enumera só o que muda apenas por uma nova versão do produto ⟸ [D83]
- [x] DRF-R2  O que um **Ator** altera é estado do produto e não é enumerado
- [x] DRF-R3  O que um **externo** fornece e atualiza não é enumerado; consta só do que ele fornece
- [x] DRF-R4  É uma R terminada em `:` e seguida dos dados: uma tabela, depois de uma linha em branco, ou a citação de um **Arquivo de dados**, na mesma linha
- [x] DRF-R5  Ficam em tabela, no bloco, os dados que é preciso ver para entender as **Linhas** da **Célula**; os demais, e todo dado que não é tabular, ficam em **Arquivo de dados** ⟸ [D84]
- [x] DRF-R6  Tabela de dados com mais de 30 fileiras é candidata a **Arquivo de dados**
- [x] DRF-R7  A tabela é de dados quando a primeira coluna é o **Atributo** marcado **identidade** na **Célula**; senão, é **Tabela de decisão** ⟸ [D86]
- [x] DRF-R8  Só a **Célula** com um **Atributo** marcado **identidade** tem dados de referência
- [x] DRF-R9  Uma **Célula** tem no máximo uma regra de dados
- [x] DRF-R10  Cada coluna da tabela é um **Atributo** da **Célula**, com o nome escrito como no **modelo**; maiúsculas não o alteram
- [x] DRF-R11  Nenhuma **identidade** se repete nos dados
- [x] DRF-R12  Na tabela, **Atributo** **opcional** ausente é célula vazia
- [x] DRF-R13  **Atributo** que é associação traz a **identidade** da instância citada
- [x] DRF-R14  A regra que cita um **Arquivo de dados** nomeia em negrito os **Atributos** que ele traz, com o de **identidade** primeiro, e a **Célula** de cada parte que ele traz ⟸ [D91]
- [x] DRF-R15  A citação é o nome do arquivo entre colchetes, sem caminho, depois do `:`, como `[PED-tarifas.json]` ⟸ [D87]
- [x] DRF-R16  Mudar os dados mantém o **Identificador**; a marca volta a `[ ]` até o produto trazer os dados novos ⟸ [D88]
- [x] DRF-R17  Outra **Linha** cita uma instância pela **identidade**, em código e sem negrito
- [x] DRF-R18  A **Célula** com dados de referência pode ter **Atributos** que um **Ator** altera; os dados trazem só os demais

## Qualidade  `QUA`
Como o produto se comporta, sem depender de uma ação específica; papel Q.
- especializa **Linha**
- [ ] QUA-R1  Limite de qualidade tem número e unidade, como `em até 3 s`
- [x] QUA-R2  Qualidade sobre uma **Célula** fica no bloco dela; as demais, em `Regras globais` do **Arquivo de produto**

## Capacidade  `CAP`
Algo que um **Ator** pode fazer e que altera estado; papel C.
- especializa **Linha**
- 0..N **Critério**
- [x] CAP-R1  Pertence à **Célula** que altera
- [x] CAP-R2  Capacidade que altera mais de uma **Célula** mora numa só; as outras reagem a um **Evento** dela ⟸ [D05]

## Visão  `VIS`
Algo que um **Ator** pode ver, sem alterar nada; papel V.
- especializa **Linha**
- 0..N **Critério**
- [x] VIS-R1  Exibir, copiar, exportar ou compartilhar sem alterar estado é visão

## Critério  `CRT`
Condição para considerar atendida uma **Capacidade** ou uma **Visão**, escrita como sub-item dela.
- [x] CRT-R1  Não tem **Identificador**
- [ ] CRT-R2  Critério que precisa ser citado sozinho vira **Regra**
- [x] CRT-R3  Critério iniciado por `exige:` é pré-condição ⟸ [D39]
- [x] CRT-R4  Critério iniciado por `se …:` é fluxo alternativo ou exceção ⟸ [D39]
- [x] CRT-R5  Critério sem prefixo é resultado ⟸ [D39]
- [x] CRT-R6  Num bloco de **Célula**, só **Capacidade** e **Visão** têm sub-itens

## Declaração  `DCL`
O que um texto do produto afirma, sem implicar comportamento; papel T.
- especializa **Linha**
- [x] DCL-R1  Só em **Células** que são textos, como políticas, contratos e condições de uso
- [ ] DCL-R2  Declaração sobre um comportamento cita a **Regra** em vez de repeti-la

## Jornada  `JOR`
Sequência de **Capacidades** e **Visões** cuja ordem é escolha de produto; papel J.
- especializa **Linha**
- [x] JOR-R1  Só no **Arquivo de produto**
- [x] JOR-R2  Forma: `PRD-Jn  Nome: [ID] → [ID] → …`
- [x] JOR-R3  Só cita **afirmações** de papel C e V
- [x] JOR-R4  Jornada não tem marca; está implementada quando todas as **afirmações** que cita estão

## Ator  `ATO`
Quem age sobre o produto, definido pelo acesso que tem, e não pelo estado em que está.
- nome: texto; único
- acesso: o que pode ver e fazer
- padrão: sim | não
- [x] ATO-R1  **Afirmação** de papel C ou V sem marca de ator é do ator **padrão** ⟸ [D42]
- [x] ATO-R2  Marca de ator logo após o **Identificador**: `·` e o nome de um ator declarado, em minúsculas
- [ ] ATO-R3  Estado de quem age não cria ator; fica no **modelo** da **Célula** ⟸ [D41]
- [ ] ATO-R4  O tempo, quando dispara **Regras** por prazo, é declarado como ator
- [x] ATO-R5  **Regra** marcada `· tempo` contém um prazo com número e unidade
- [x] ATO-R6  Há exatamente um **Ator** padrão na **Especificação**
- [x] ATO-R7  Declarado em `Atores` como `- Nome: acesso`; o **padrão** termina com `; padrão`
