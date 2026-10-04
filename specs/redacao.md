# Redação
As **Linhas** de um bloco: o que cada uma afirma, quem age, a que **Eventos** reage e como são identificadas, citadas e retiradas.

## Linguagem
- reação: **Regra** iniciada por `Ao **Evento**:`; mora no bloco da **Célula** que reage

## Linha  `LIN`
Item da **lista única** de um bloco; com **Identificador**, é uma afirmação citável.
- 0..1 **Identificador**
- afirmação: texto
- implementada: sim | não
- evento: Linha retirada
- [x] LIN-R1  Uma **afirmação** por linha com **Identificador**
- [x] LIN-R2  Cada linha pertence a uma só **Célula**, mesmo quando envolve várias
- [x] LIN-R3  Correção de redação mantém o **Identificador**; mudança de significado retira a linha e cria outra
- [ ] LIN-R4  Linha R, Q, C, V ou T começa com `[x]` se o produto a cumpre por inteiro, ou `[ ]` se não · erro
- [x] LIN-R5  Não há estado parcial; linha cumprida em parte é agregada demais e deve ser dividida
- [x] LIN-R6  removida
- [x] LIN-R7  Linha de **modelo** não tem marca de implementação
- [ ] LIN-R8  Linha que cita outra **Célula** mais do que a própria é candidata a mudar de dono · alerta
- [x] LIN-R9  Linha nova nasce `[ ]`, exceto a movida, que herda a marca
- [x] LIN-C1  Acrescentar uma linha com **Identificador**
  - no bloco da **Célula** dona, na posição do seu papel
  - com o próximo número livre, conforme [IDT-R2]
- [x] LIN-C2  Retirar uma linha
- [x] LIN-C3  Corrigir a redação de uma linha

## Identificador  `IDT`
Código que torna uma **Linha** citável.
- código: **Código de identificador**; identidade; único; imutável
- sigla: **Sigla de célula**
- papel: **Letra de papel**
- número: inteiro sequencial por sigla e papel
- [ ] IDT-R1  Código válido e **único** na **Especificação** · erro
- [ ] IDT-R2  Nunca é renumerado; número já usado não volta · erro
- [x] IDT-R3  A sigla é a da **Célula** dona da **Linha**, ou `PRD` no **Arquivo de produto**

## Lápide  `LAP`
**Linha** que ocupa o lugar de uma linha que foi retirada, para que as **Referências** antigas continuem resolvendo.
- especializa **Linha**
- forma: `- [ ] CÓDIGO  removida`, para **Linha** retirada, ou `- [x] CÓDIGO  movida → [NOVO]`, para linha que mudou de dono
- [x] LAP-R1  Ao **Linha retirada**: o **Identificador** vira lápide no mesmo lugar
- [x] LAP-R2  Lápide nunca volta a ser **Linha**
- [ ] LAP-R3  **Referência** a lápide continua válida, mas indica texto a revisar · alerta
- [x] LAP-R4  removida
- [x] LAP-R5  **Linha** que muda de **Célula** dona ganha **Identificador** da nova dona e deixa no lugar antigo a lápide `movida → [NOVO]`
- [x] LAP-R6  Lápide `removida` nasce `[ ]` e passa a `[x]` quando o produto deixa de ter o comportamento retirado
- [x] LAP-R7  Lápide `movida` tem a mesma marca da **Linha** para onde aponta
- [x] LAP-R8  **Referência** a lápide `movida` resolve para o novo **Identificador**

## Referência  `REF`
Citação, em um lugar, de algo definido em outro.
- forma: `[CÓDIGO]` para **Linha**, `**Nome**` para **Termo**, `⟵ [Pnn]` para **Pergunta**
- [ ] REF-R1  Toda referência resolve para algo definido · erro
- [x] REF-R2  Ao **Termo renomeado**: toda referência ao **Termo** passa a usar o novo nome
- [x] REF-R3  removida
- [ ] REF-R4  Referência a **Linha** não leva link no texto; as definições de link são geradas
- [x] REF-R5  Ao **Pergunta respondida**: as referências a ela saem das **Linhas** na mesma mudança
- [x] REF-R6  A **Especificação** não cita **Decisões**; cada decisão cita os **Identificadores** das **Linhas** que governa
- [ ] REF-R7  **Identificador** citado por uma **Decisão** existe na **Especificação**, como **Linha** ou **Lápide** · erro
- [x] REF-R8  Uma **Linha** pode ser citada por várias **Decisões**, e uma decisão pode citar várias linhas

## Pergunta  `PER`
Lacuna conhecida da **Especificação**, ainda sem resposta.
- código: **Código de pergunta**; identidade; único; imutável
- enunciado: texto em forma de pergunta
- opções: sub-itens `opção:`; opcional
- sobre: 0..1 **Célula**
- evento: Pergunta respondida
- [ ] PER-R1  Código já usado não volta · erro
- [x] PER-R2  **Linha** provisória termina com `⟵ [Pnn]`
- [x] PER-R3  A pergunta não lista as **Linhas** que a citam
- [x] PER-R4  **sobre** só existe quando nenhuma **Linha** cita a pergunta
- [ ] PER-R5  Pergunta sem **sobre** e sem **Linha** que a cite · erro
- [x] PER-R6  Estar no **Arquivo de perguntas** é estar aberta; não há estado de respondida
- [x] PER-R7  Responde o **Dono de área** da **Área** afetada
- [x] PER-R8  Pergunta é dúvida sobre algo já comprometido; ideia não é pergunta
- [x] PER-C1  Abrir uma pergunta
  - no **Arquivo de perguntas**, com o próximo número livre
- [x] PER-C2  Responder uma pergunta
  - a pergunta sai do **Arquivo de perguntas**
  - resposta que precisa de justificativa vira **Decisão**

## Arquivo de perguntas  `APG`
Arquivo com as **Perguntas** abertas da **Especificação**, uma por item, em ordem de número.
- arquivo: `_perguntas.md`; opcional
- [x] APG-R1  Lista plana, sem agrupamento; a **Área** de cada **Pergunta** é derivável
- [x] APG-R2  Guarda só a **Pergunta** e as opções; a discussão fica fora
- [x] APG-R3  As **Perguntas** ficam neste arquivo ou num **Rastreador**, nunca nos dois

## Evento  `EVT`
Fato do produto, no particípio, ao qual alguma **Regra** reage.
- nome: texto no particípio; único
- produtora: 1 **Célula**
- [x] EVT-R1  Não é uma mensagem do sistema; a arquitetura decide como realizá-lo
- [ ] EVT-R2  Só existe se ao menos uma **reação** o cita · erro
- [x] EVT-R3  Transição de estado cita o evento que a dispara, como `aguardando pagamento → pago: ao **Pagamento confirmado**`

## Regra  `REG`
Afirmação sempre verdadeira sobre uma **Célula**, independente de ação de um **Ator**; papel R.
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
| outra | R sem marca |

- [x] REG-R2  Regra não leva rótulo de tipo; o tipo vem do lugar e da forma

## Tabela de decisão  `TDD`
**Regra** escrita como tabela que dá um resultado para cada combinação de condições.
- especializa **Regra**
- [x] TDD-R1  É uma R terminada em `:` e seguida da tabela; a tabela inteira responde pelo **Identificador**
- [x] TDD-R2  Colunas de condição à esquerda; de resultado, à direita
- [ ] TDD-R3  Cada combinação de condições aparece exatamente uma vez · erro
- [x] TDD-R4  `qualquer` vale para todos os valores de uma condição

## Qualidade  `QUA`
Como o produto se comporta, sem depender de uma ação específica; papel Q.
- especializa **Linha**
- [x] QUA-R1  Limite de qualidade tem número e unidade, como `em até 3 s`
- [x] QUA-R2  Qualidade sobre uma **Célula** fica no bloco dela; as demais, em `Regras globais` do **Arquivo de produto**

## Capacidade  `CAP`
Algo que um **Ator** pode fazer e que altera estado; papel C.
- especializa **Linha**
- 0..N **Critério**
- [x] CAP-R1  Pertence à **Célula** que altera

## Visão  `VIS`
Algo que um **Ator** pode ver, sem alterar nada; papel V.
- especializa **Linha**
- 0..N **Critério**
- [x] VIS-R1  Exibir, copiar, exportar ou compartilhar sem alterar estado é visão

## Critério  `CRT`
Condição para considerar atendida uma **Capacidade** ou uma **Visão**, escrita como sub-item dela.
- [x] CRT-R1  Não tem **Identificador**
- [x] CRT-R2  Critério que precisa ser citado sozinho vira **Regra**
- [x] CRT-R3  Critério iniciado por `exige:` é pré-condição
- [x] CRT-R4  Critério iniciado por `se …:` é fluxo alternativo ou exceção
- [x] CRT-R5  Critério sem prefixo é resultado

## Declaração  `DCL`
O que um texto do produto afirma, sem implicar comportamento; papel T.
- especializa **Linha**
- [x] DCL-R1  Só em **Células** que são textos, como políticas, contratos e condições de uso
- [x] DCL-R2  Declaração sobre um comportamento cita a **Regra** em vez de repeti-la

## Jornada  `JOR`
Sequência de **Capacidades** e **Visões** cuja ordem é escolha de produto; papel J.
- especializa **Linha**
- [x] JOR-R1  Só no **Arquivo de produto**
- [x] JOR-R2  Forma: `PRD-Jn  Nome: [ID] → [ID] → …`
- [ ] JOR-R3  Só cita **Linhas** C e V · erro
- [x] JOR-R4  Jornada não tem marca; está implementada quando todas as **Linhas** que cita estão

## Ator  `ATO`
Quem age sobre o produto, definido pelo acesso que tem, e não pelo estado em que está.
- nome: texto; único
- acesso: o que pode ver e fazer
- padrão: sim | não
- [x] ATO-R1  **Linha** C ou V sem marca de ator é do ator **padrão**
- [ ] ATO-R2  Marca de ator logo após o **Identificador**: `·` e o nome de um ator declarado, em minúsculas · erro
- [x] ATO-R3  Estado de quem age não cria ator; fica no **modelo** da **Célula**
- [x] ATO-R4  O tempo, quando dispara **Regras** por prazo, é declarado como ator
- [ ] ATO-R5  **Regra** marcada `· tempo` contém um prazo com número e unidade · erro
- [ ] ATO-R6  Há exatamente um **Ator** padrão na **Especificação** · erro
