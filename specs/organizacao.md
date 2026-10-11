# Organização
Como a **Especificação** se divide em arquivos e **Áreas**, o que o **Validador** checa e o **Indexador** produz a partir dela, e como se guardam as **Decisões** e os **Arquivos de dados**.
- célula central: **Especificação**
- prioridade: apoio
- dono: mantenedor do formato

## Linguagem
- **externo**: sistema ou organização fora do produto que alguma **Regra** pressupõe; declarado em `Externos` do **Arquivo de produto** ⟸ [D43]

## **Especificação**  `ESP`
Conjunto de arquivos Markdown, com os **Arquivos de dados** que eles citam, que descreve um produto inteiro e é a fonte única da verdade sobre ele.
- 1 **Instruções para agentes**
- 1 **Arquivo de convenções**
- 1 **Arquivo de produto**
- 0..1 **Arquivo de perguntas**
- 1..N **Área** ⟸ [D31]
- 0..N **Arquivo de dados**
- evento: **Especificação alterada**
- [x] ESP-R1  removida
- [x] ESP-R2  A única prosa é a **definição** de cada **Célula**
- [x] ESP-R3  removida
- [x] ESP-R4  Ordem de leitura: **Arquivo de convenções**, **Arquivo de produto**, qualquer **Área**
- [x] ESP-R5  Histórico, justificativas e explicações didáticas ficam fora do texto ⟸ [D72]
- [x] ESP-R6  O texto descreve só o que foi comprometido; ideias ficam no **Rastreador** até amadurecerem ⟸ [D59]
- [ ] ESP-R7  Títulos organizam os blocos em hierarquia, com profundidade livre; dentro do bloco não há subtítulos, e a profundidade dos sub-itens é livre
- [ ] ESP-R8  Uma especificação descreve um só produto, com uma só linguagem; significados de um **Termo** que não se conciliam indicam dois produtos, cada um com a sua especificação ⟸ [D06]
- [x] ESP-R9  Abaixo do título do arquivo, todo título é de **Célula** ou de seção prevista
- [ ] ESP-V1 · leitor  Ler uma **Área** sem abrir as outras
  - o **Índice** da **Área** diz o que ela usa de fora

## **Instruções para agentes**  `AGT`
Arquivo que ensina agentes de IA a trabalhar no formato, igual em todos os projetos.
- **arquivo**: `AGENTS.md`; imutável
- [x] AGT-R1  Não contém nada específico do produto ⟸ [D75]
- [x] AGT-R2  Descreve procedimentos; em conflito, prevalece a **Especificação** do formato

## **Arquivo de convenções**  `CNV`
Legenda que ensina a ler e escrever no formato, igual em todos os projetos.
- **arquivo**: `_convencoes.md`; imutável
- [x] CNV-R1  Não contém nada específico do produto
- [x] CNV-R2  Resume o formato; em conflito, prevalece a **Especificação** do formato

## **Arquivo de produto**  `APR`
Arquivo com o que vale para o produto inteiro e não pertence a nenhuma **Célula**.
- **arquivo**: `_produto.md`; imutável
- **seções**: `Propósito`, `Atores`, `Tipos comuns`, `Jornadas`, `Externos`, `Regras globais`, `Fora de escopo`, nesta ordem, omitidas as vazias
- [ ] APR-R1  Sigla das **afirmações**: `PRD`
- [x] APR-R2  Tudo o que um **Documento derivado** precisaria afirmar sobre o conjunto, e não se deduz das **Áreas**, mora aqui
- [x] APR-R3  **Regra** global que cita uma **Célula** pertence ao bloco dessa célula
- [ ] APR-R4  **Externo** visível ao usuário leva nome; o invisível, só o papel
- [x] APR-R5  Item fora de escopo diz o horizonte: permanente ou nesta versão
- [x] APR-R6  A relação entre **Áreas** não é escrita aqui; é o **Mapa entre áreas** gerado
- [x] APR-R7  `Propósito` começa pelo problema que o produto resolve ⟸ [D44]
- [x] APR-R8  Cada **externo** diz, em sub-itens, o que guarda, fornece, recebe ou impõe
- [x] APR-R9  Não tem seção fora das previstas, nem fora da ordem
- [x] APR-R10  Forma dos itens de cada seção:

| Seção | Forma |
| --- | --- |
| `Propósito` | `- Rótulo: texto`, com rótulo livre; o primeiro é `Problema`, conforme [APR-R7] |
| `Atores` | conforme [ATO-R7] |
| `Tipos comuns` | conforme [TIP-R2] |
| `Jornadas` | conforme [JOR-R2] |
| `Externos` | `- **Nome** · papel`, com sub-itens iniciados por `guarda:`, `fornece:`, `recebe:` ou `impõe:` |
| `Regras globais` | **afirmações** de sigla `PRD` |
| `Fora de escopo` | `- texto · permanente` ou `- texto · nesta versão` |

- [x] APR-R23.1  Não lista as **Áreas**; a lista delas é o índice de áreas, que o **Indexador** produz ⟸ [D23.1]

## **Arquivo de contadores**  `CTD`
Arquivo extinto, que guardava o maior número já usado em cada sequência da **Especificação**.
- [x] CTD-R1  removida
- [x] CTD-R2  removida
- [x] CTD-R3  removida
- [x] CTD-R4  removida
- [x] CTD-R5  removida
- [x] CTD-R6  removida
- [x] CTD-R7  removida
- [x] CTD-R8  removida

## **Arquivo de dados**  `ADA`
Arquivo de texto com as instâncias que os **Dados de referência** de uma **Célula** citam, guardado à parte das **Áreas** e lido só sob demanda.
- **formato**: JSON | CSV
- [x] ADA-R1  Mora na pasta `dados/`, junto dos arquivos da **Especificação**; a pasta não tem subpastas
- [x] ADA-R2  O nome é a **Sigla de célula** da **Célula** que o cita, `-`, um nome curto em minúsculas e sem acento, e a extensão, como `PED-tarifas.json`
- [x] ADA-R3  Só há dois **formatos**: JSON, para dado estruturado, e CSV, para dado tabular ⟸ [D85]
- [x] ADA-R4  É citado por exatamente uma regra de **Dados de referência**
- [x] ADA-R5  Traz só instâncias da **Célula** que o cita e das partes dela
- [x] ADA-R6  Dado que chega em outro **formato** é convertido, e o original não fica na **Especificação**
- [x] ADA-R7  Entra por cópia ou por conversão feita por programa, nunca por transcrição ⟸ [D89]
- [x] ADA-R8  É texto em UTF-8
- [x] ADA-R9  Em JSON, é uma lista de objetos, um por instância
- [x] ADA-R10  Em JSON, cada chave é o nome de um **Atributo**, escrito como no **modelo**
- [x] ADA-R11  Em JSON, a parte fica numa lista sob o nome da **Célula** dela
- [x] ADA-R12  Em JSON, **Atributo** **opcional** ausente é chave omitida
- [x] ADA-R13  Em CSV, a primeira linha traz os nomes dos **Atributos**, com o de **identidade** primeiro
- [x] ADA-R14  Em CSV, o separador é a vírgula, e campo vazio é **Atributo** **opcional** ausente
- [x] ADA-R15  As colunas do CSV são exatamente os **Atributos** que a regra nomeia, conforme [DRF-R14]
- [x] ADA-R16  As chaves do primeiro nível do JSON estão entre os **Atributos** e as partes que a regra nomeia, conforme [DRF-R14]

## **Área**  `ARE`
Agrupamento de **Células** fortemente relacionadas entre si, guardado em um arquivo.
- **nome**: texto; único
- **frase**: uma frase que diz o que a área reúne
- **arquivo**: nome da área em minúsculas, sem acento, com `.md`; único
- **célula central**: 1 **Célula**
- **prioridade**: núcleo | apoio | genérico; opcional
- **dono**: 1 **Dono de área**
- **seções**: `Índice`, `Linguagem`, `Tipos` e as **Células**, nesta ordem, sendo opcionais as três primeiras
- [x] ARE-R1  removida
- [ ] ARE-R2  Área não tem sigla
- [x] ARE-R3  Mover uma **Célula** de área não muda nenhum **Identificador**
- [x] ARE-R4  A área não redefine **Termos**; a linguagem é a da **Especificação** ⟸ [D06]
- [x] ARE-R5  removida
- [x] ARE-R6  Pasta de área: `_area.md` com as seções anteriores às **Células**, e um arquivo por célula ou grupo de células
- [ ] ARE-R7  Não há pasta dentro de pasta
- [x] ARE-R8  A área reúne uma **célula central** e as **Células** que dependem principalmente dela ⟸ [D29]
- [x] ARE-R9  **Célula** que troca mais **Referências**, feitas e recebidas, com outra área do que com a sua é candidata a mudar de área ⟸ [D30]
- [x] ARE-R10  Área com mais de 300 **Linhas**, ou com mais de um **dono**, vira pasta
- [x] ARE-R11  Não tem seção fora das previstas, nem fora da ordem
- [x] ARE-R12  removida
- [x] ARE-R23.1  É área todo arquivo `.md` da pasta da **Especificação** cujo nome não começa por `_` e que não é as **Instruções para agentes** nem parte gerada, e toda subpasta com `_area.md` ⟸ [D23.1]
- [x] ARE-R23.2  Na pasta da **Especificação**, o arquivo `.md` de nome começado por `_` é o **Arquivo de convenções**, o **Arquivo de produto** ou o **Arquivo de perguntas**
- [x] ARE-R23.3  Cada arquivo de uma área em pasta começa pelo título e traz as **Células** em blocos
- [x] ARE-R23.4  A **frase** vem na linha seguinte ao título do arquivo da área, ou do `_area.md` da pasta
- [x] ARE-R23.5  Depois da **frase** e antes das **seções** vêm as linhas `- célula central: **Célula**`, `- prioridade: valor` e `- dono: nome`, nesta ordem; só a **prioridade** pode faltar
- [x] ARE-C1  Criar uma área
  - o arquivo nasce com a **frase**, a **célula central** e o **dono**, conforme [ARE-R23.5]
- [ ] ARE-C2  Dividir uma área em duas
  - indicado quando partes da área mal se referenciam
  - as **Células** mudam de arquivo; os **Identificadores**, não

## **Validador**  `VRF`
Programa que checa a forma da **Especificação**, sem interpretar o texto.
- [x] VRF-R1  removida
- [x] VRF-R2  removida
- [x] VRF-R3  Toda checagem é sintática ⟸ [D68]
- [x] VRF-R4  removida
- [x] VRF-R5  É determinístico: a mesma **Especificação** dá sempre o mesmo resultado; um agente de IA o executa, e não o substitui ⟸ [D01]
- [x] VRF-R6  Ao **Especificação alterada**: valida
- [x] VRF-R7  **Especificação** com ao menos uma violação é inválida; não há resultado intermediário
- [x] VRF-R8  **Linha** que não casa com nenhuma forma prevista é violação ⟸ [D79]
- [x] VRF-R9  Lê só os arquivos como estão, sem consultar o **Controle de versão** ⟸ [D80]
- [x] VRF-R10  Lê sempre a **Especificação** inteira, com as **Decisões**
- [x] VRF-R11  removida
- [x] VRF-R12  Das **Instruções para agentes** e do **Arquivo de convenções**, confere só que existem
- [x] VRF-R13  Não lê o conteúdo das seções geradas
- [x] VRF-R14  Checa só as **Regras** citadas de [VRF-R15] a [VRF-R21] ⟸ [D77]
- [x] VRF-R15  Checa a hierarquia dos arquivos e dos blocos: [ESP-R9], [ARE-R23.2], [ARE-R23.4], [ARE-R11], [APR-R9], [CEL-R2], [CEL-R3], [CRT-R6], [IND-R2], [DEC-R1], [DEC-R2], [DEC-R21]
- [x] VRF-R16  Checa a forma das **Linhas**: [LIN-R4], [LIN-R11], [CRT-R1], [REF-R14], [ATR-R6], [ATR-R7], [CEL-R18], [TIP-R2], [TRM-R9], [ATO-R2], [ATO-R5], [ATO-R6], [ATO-R7], [JOR-R2], [APR-R10], [ARE-R23.5], [APG-R5], [DEC-R19]
- [x] VRF-R17  Checa os **Identificadores**, os **Códigos de decisão** e os **Códigos de pergunta**: [IDT-R1], [IDT-R3], [DEC-R22.1], [DEC-R22.2], [PER-R22.1], [PER-R22.2]
- [x] VRF-R18  Checa as **Referências**: [REF-R1], [REF-R9], [JOR-R3], [EVT-R2], [PER-R5], [DEC-R22]
- [x] VRF-R19  Checa os **Termos**: [TRM-R4], [TRM-R11], [TRM-R13], [TRM-R14], [TRM-R17], [TRM-R18], [TRM-R19], [TRM-R20], [TRM-R22], [TRM-R23], [TRM-R24], [TRM-R25], [DEC-R11]
- [x] VRF-R20  removida
- [x] VRF-R21  Checa os **Dados de referência**: [DRF-R4], [DRF-R8], [DRF-R9], [DRF-R10], [DRF-R11], [DRF-R14], [DRF-R15], [ADA-R1], [ADA-R2], [ADA-R3], [ADA-R4], [ADA-R9], [ADA-R13], [ADA-R15], [ADA-R16] ⟸ [D90]
- [x] VRF-R22  Ignora as pastas que não são de **Área**, de **Decisões**, de **Arquivos de dados**, de arquitetura nem de interface
- [x] VRF-R23  Das pastas de arquitetura e de interface, checa só as **Decisões** e as **Referências** a elas ⟸ [D82]
- [x] VRF-R24  Nas pastas de arquitetura e de interface, não lê `AGENTS.md`, `_convencoes.md`, `ideia.md` nem `decisoes.md`
- [x] VRF-R25  Nas pastas de arquitetura e de interface, confere da **Referência** a uma **Decisão** a forma da marca e a existência da decisão, e não o lugar da marca na **Linha**
- [x] VRF-R26  removida
- [x] VRF-R27  Nas pastas de arquitetura e de interface, não lê `_achados.md`
- [x] VRF-R28  Quanto aos **Termos**, checa só o negrito e as definições; o texto sem negrito não é checado ⟸ [D114]
- [x] VRF-R22.1  movida → [ARE-R23.2]
- [x] VRF-R23.1  Não lê os arquivos `README.md`, que são índices produzidos pelo **Indexador**
- [x] VRF-R23.2  Acusa a seção `Áreas` que sobrou no **Arquivo de produto**, com uma frase que diz para onde vão a **célula central**, a **prioridade** e o **dono**
- [ ] VRF-C1  movida → [GER-C1]
- [x] VRF-V1  Ver as violações da **Especificação**
  - todas, em ordem de arquivo e de **Linha**
  - cada uma cita o arquivo, a **Linha**, o **Identificador** da **Regra** violada e uma frase que se entende sem a **Especificação** do formato
  - **Linha** que não casa com nenhuma forma gera uma só violação

## **Indexador**  `GER`
Programa que produz as partes geradas da **Especificação**, sem interpretar o texto. (~~gerador~~)
- [ ] GER-R1  Ao **Especificação alterada**: regenera as partes geradas
- [x] GER-R2  É determinístico: a mesma **Especificação** dá sempre as mesmas partes geradas
- [x] GER-R23.1  Cada índice de pasta é um arquivo `README.md`, que começa com `<!-- gerado; não editar -->` ⟸ [D23.2]
- [x] GER-R23.2  Indexa o que consegue ler, mesmo de uma **Especificação** com violações ⟸ [D23.3]
- [x] GER-R23.3  O arquivo que não consegue ler consta do índice da pasta dele como não indexado
- [x] GER-R23.4  Regenera sempre todos os índices de pasta, e grava só o arquivo cujo conteúdo mudou ⟸ [D23.4]
- [x] GER-R23.5  Não sobrescreve o `README.md` que não começa com `<!-- gerado; não editar -->`
- [x] GER-R23.6  Apaga o índice da pasta que ficou sem o que indexar
- [x] GER-R23.7  O índice de áreas traz o nome e a frase do produto e, de cada **Área**, em ordem de **Área.arquivo**, o **Área.nome**, a **frase** e cada **Célula** com a **Célula.sigla** e a **definição** ⟸ [D23.1]
- [x] GER-R23.8  No índice de áreas da arquitetura e no da interface, os componentes fazem o papel das **Células**
- [x] GER-R23.9  O índice de uma pasta de **Decisões** traz, de cada uma, **Decisão.código**, **questão**, **resolução** e os itens e as decisões que a citam, em ordem da data de criação escrita nas **alterações** e, na mesma data, de **Decisão.código** ⟸ [D19]
- [x] GER-R23.10  No índice, a **Decisão** que nada cita consta como órfã
- [x] GER-C1  removida
- [x] GER-C23.1  Indexar as pastas ⟸ [D78]
  - índice de áreas na pasta da **Especificação**, na de arquitetura e na de interface, conforme [GER-R23.7]
  - índice em cada pasta de **Decisões**, conforme [GER-R23.9]
  - se algum arquivo não pôde ser lido: os demais são indexados, conforme [GER-R23.2]
- [ ] GER-C23.2  Gerar as demais partes derivadas ⟸ [D78]
  - exige: nenhuma violação da **Especificação**
  - **Índice** de cada **Área**
  - **Mapa entre áreas**
  - **Glossário**
  - lista de dados que identificam pessoas, a partir dos **Atributos** marcados **pessoal**
  - definições de link das **Referências** a **Linhas** [REF-R4]
  - definições de link das citações de **Arquivos de dados** [DRF-R15]

## **Índice**  `IND`
Seção gerada no topo de uma **Área** com o que ela usa de outras áreas.
- **conteúdo**: lista de **Termos** e **Eventos** de outras **Áreas** usados aqui, de **reações** de outras áreas a eventos daqui e de **Perguntas** que tocam a área
- [x] IND-R1  Nunca é editado à mão ⟸ [D70]
- [x] IND-R2  Começa com `<!-- gerado; não editar -->`

## **Mapa entre áreas**  `MAP`
Lista gerada de quais **Áreas** usam **Termos** e reagem a **Eventos** de quais outras.
- **conteúdo**: lista que dá, para cada par de **Áreas**, quantas **Referências** uma faz à outra
- [x] MAP-R1  Nunca é escrito à mão ⟸ [D70]

## **Documento derivado**  `DER`
Documento produzido a partir da **Especificação** para um público ou uma finalidade, como um manual ou um plano de testes.
- [x] DER-R1  É descartável: nunca é editado nem citado como fonte ⟸ [D71]
- [x] DER-R2  Cada frase cita o **Identificador** ou o **Termo** de origem
- [x] DER-R3  Frase sem origem é invenção de quem gerou ou lacuna da **Especificação**
- [x] DER-R4  É redigido por um agente de IA a partir da **Especificação**; não é parte gerada pelo **Indexador** ⟸ [D02]
- [x] DER-R5  Guardá-lo sob **Controle de versão** cabe a quem adota, que assume a divergência; mantê-lo em dia não cabe ao formato ⟸ [D03]
- [x] DER-V1 · leitor  Ler um documento derivado
  - cada frase leva a sua origem

## **Decisão**  `DEC`
Justificativa de um ponto não óbvio do produto, guardada à parte das **Áreas** e do **Arquivo de produto** e lida só sob demanda.
- **código**: **Código de decisão**; identidade; único; imutável
- **questão**: texto terminado em `?`
- **resolução**: uma frase, que responde à **questão**
- **contexto**: texto
- **alternativas descartadas**: outras respostas à **questão**, cada uma com o motivo
- **consequências**: o que se ganha e o que se aceita
- **alterações**: entradas com data e uma linha, da mais recente para a mais antiga, na seção `Histórico` ⟸ [D14]
- **arquivo**: em `decisoes/_produto/` ou em `decisoes/` seguido do nome de uma **Área**, com o nome formado pelo **código**, `-`, um nome curto e `.md`
- [x] DEC-R1  Título: a **questão** e o **código**, como `` # Quem vê um pedido?  `D07` ``; a **resolução** vem logo abaixo ⟸ [D13]
- [x] DEC-R2  Depois da **resolução**, uma lista com `Contexto`, `Alternativas descartadas` e `Consequências`, nesta ordem, e a seção `Histórico` por último
- [x] DEC-R3  Responde a uma só **questão**; as **alternativas descartadas** são outras respostas a ela ⟸ [D12]
- [x] DEC-R4  **Resolução** que se pode reverter em parte são duas decisões
- [x] DEC-R5  Registra-se quando havia ao menos uma alternativa plausível; nasce na mesma mudança que o item que a cita ⟸ [D21]
- [x] DEC-R6  **Questão** nova cria decisão nova; só se edita uma decisão quando a mesma questão ganha outra **resolução**
- [x] DEC-R7  Ao mudar a **resolução**, a anterior vai para as **alternativas descartadas** e as **alterações** ganham uma entrada
- [x] DEC-R8  removida
- [x] DEC-R9  Mora na pasta da **Área** cujos itens mais a citam; citada só pelo **Arquivo de produto**, em `_produto` ⟸ [D11]
- [x] DEC-R10  Mudar de pasta não muda o **código**
- [x] DEC-R11  Usa os **Termos** da **Especificação**, sem negrito ⟸ [D17]
- [x] DEC-R12  Um item do corpo pode citar outra decisão, com a mesma **Referência** `⟸ [Dnn]` ⟸ [D20]
- [x] DEC-R13  removida
- [x] DEC-R14  **Resolução** com mais de uma frase, ou com ponto e vírgula, indica mais de uma decisão
- [x] DEC-R15  Decisão com mais de 25 linhas indica mais de uma decisão
- [x] DEC-R16  Mais de 5 **alterações** indicam **resoluções** acumuladas
- [x] DEC-R17  O texto da decisão nunca é escrito em **Área** nem no **Arquivo de produto**
- [x] DEC-R18  A pasta `decisoes/` fica junto dos arquivos da **Especificação** e tem legenda e instruções para agentes próprias, `_convencoes.md` e `AGENTS.md`, iguais em todos os projetos
- [x] DEC-R19  Forma dos itens do corpo:

| Item | Forma |
| --- | --- |
| `Contexto` | `- Contexto: texto` |
| alternativa descartada | sub-item de `- Alternativas descartadas`, como `- alternativa: motivo`; ao menos uma |
| consequência | sub-item de `- Consequências`, iniciado por `Ganha:` ou `Aceita:` |
| alteração | item de `Histórico`, como `- AAAA-MM-DD: texto` |

- [x] DEC-R20  Decisão que nenhum item da **Especificação**, da arquitetura ou da interface e nenhuma outra decisão cita é órfã, e permanece até a limpeza ⟸ [D15]
- [x] DEC-R21  Decisão de arquitetura ou de interface mora em `decisoes/` da pasta dela, numa subpasta por área; a que não é de área, em `_sistema` ou em `_interface` ⟸ [D92]
- [x] DEC-R22  Item da **Especificação** cita só decisão da **Especificação**; item da arquitetura, também as da arquitetura; item da interface, também as da arquitetura e as da interface ⟸ [D93]
- [x] DEC-R22.1  **Código** único entre as decisões da **Especificação**, da arquitetura e da interface; código já usado não volta ⟸ [D10]
- [x] DEC-R22.2  O **código** leva **Prefixo de mudança** e **Número de ordem**, alocados como os do **Identificador**, de [IDT-R22.1] a [IDT-R22.5] ⟸ [D10]
- [x] DEC-Rknnk.1  O **código** fica definitivo como o do **Identificador**, conforme [IDT-Rknnk.1] e [IDT-Rknnk.2]
- [x] DEC-Rknnk.2  Em [DEC-R22.1], só o **código** definitivo conta como já usado
- [x] DEC-C1  Registrar uma decisão
  - com **código** novo, conforme [DEC-R22.2]
  - ao menos um item passa a citá-la
- [x] DEC-C2  Rever a **resolução** de uma decisão
  - conforme [DEC-R7]
- [x] DEC-C3  Limpar as decisões órfãs
  - exige: decisão órfã, conforme [DEC-R20]
  - o arquivo é apagado
  - decisão que só a apagada citava também é apagada
