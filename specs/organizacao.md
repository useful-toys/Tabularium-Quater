# Organização
Como a **Especificação** se divide em arquivos e **Áreas**, o que o **Verificador** checa e gera a partir dela, e como se guardam as **Decisões**.

## Linguagem
- externo: sistema ou organização fora do produto que alguma **Regra** pressupõe; declarado em `Externos` do **Arquivo de produto** ⟸ [D43]

## Especificação  `ESP`
Conjunto de arquivos Markdown que descreve um produto inteiro e é a fonte única da verdade sobre ele.
- 1 **Instruções para agentes**
- 1 **Arquivo de convenções**
- 1 **Arquivo de produto**
- 0..1 **Arquivo de perguntas**
- 1 **Arquivo de contadores**
- 1..N **Área** ⟸ [D31]
- evento: Especificação alterada
- [x] ESP-R1  removida
- [x] ESP-R2  A única prosa é a **definição** de cada **Célula**
- [x] ESP-R3  removida
- [x] ESP-R4  Ordem de leitura: **Arquivo de convenções**, **Arquivo de produto**, qualquer **Área**
- [x] ESP-R5  Histórico, justificativas e explicações didáticas ficam fora do texto ⟸ [D72]
- [x] ESP-R6  O texto descreve só o que foi comprometido; ideias ficam no **Rastreador** até amadurecerem ⟸ [D59]
- [ ] ESP-R7  Títulos organizam os blocos em hierarquia, com profundidade livre; dentro do bloco não há subtítulos, e a profundidade dos sub-itens é livre
- [ ] ESP-R8  Uma especificação descreve um só produto, com uma só linguagem; significados de um **Termo** que não se conciliam indicam dois produtos, cada um com a sua especificação ⟸ [D06]
- [ ] ESP-V1 · leitor  Ler uma **Área** sem abrir as outras
  - o **Índice** da **Área** diz o que ela usa de fora

## Instruções para agentes  `AGT`
Arquivo que ensina agentes de IA a trabalhar no formato, igual em todos os projetos.
- arquivo: `AGENTS.md`; imutável
- [x] AGT-R1  Não contém nada específico do produto ⟸ [D75]
- [x] AGT-R2  Descreve procedimentos; em conflito, prevalece a **Especificação** do formato

## Arquivo de convenções  `CNV`
Legenda que ensina a ler e escrever no formato, igual em todos os projetos.
- arquivo: `_convencoes.md`; imutável
- [x] CNV-R1  Não contém nada específico do produto
- [x] CNV-R2  Resume o formato; em conflito, prevalece a **Especificação** do formato

## Arquivo de produto  `APR`
Arquivo com o que vale para o produto inteiro e não pertence a nenhuma **Célula**.
- arquivo: `_produto.md`; imutável
- seções: `Propósito`, `Áreas`, `Atores`, `Tipos comuns`, `Jornadas`, `Externos`, `Regras globais`, `Fora de escopo`, nesta ordem, omitidas as vazias
- [x] APR-R1  Sigla das **afirmações**: `PRD`
- [x] APR-R2  Tudo o que um **Documento derivado** precisaria afirmar sobre o conjunto, e não se deduz das **Áreas**, mora aqui
- [x] APR-R3  **Regra** global que cita uma **Célula** pertence ao bloco dessa célula
- [x] APR-R4  **Externo** visível ao usuário leva nome; o invisível, só o papel
- [x] APR-R5  Item fora de escopo diz o horizonte: permanente ou nesta versão
- [x] APR-R6  A relação entre **Áreas** não é escrita aqui; é o **Mapa entre áreas** gerado
- [x] APR-R7  `Propósito` começa pelo problema que o produto resolve ⟸ [D44]
- [x] APR-R8  Cada **externo** diz, em sub-itens, o que guarda, fornece, recebe ou impõe

## Arquivo de contadores  `CTD`
Arquivo que guarda o maior número já usado em cada sequência da **Especificação**, para que nenhum volte.
- arquivo: `_contadores.md`; imutável
- seções: `Identificadores`, `Perguntas`, `Decisões`, nesta ordem
- [ ] CTD-R1  `Identificadores` tem um item por **Sigla de célula** e **Letra de papel** já usadas, em ordem alfabética, com o maior número já usado e um nome curto da última alocação
- [ ] CTD-R2  `Perguntas` e `Decisões` têm um item cada, com o maior **Código de pergunta** e o maior **Código de decisão** já usados e um nome curto da última alocação
- [ ] CTD-R3  Um número guardado só cresce, e uma **Sigla de célula** nunca sai, mesmo extinta · erro
- [ ] CTD-R4  Nenhum **Identificador**, **Código de pergunta** ou **Código de decisão** da **Especificação** passa do número guardado · erro
- [ ] CTD-R5  Alocar é usar o número guardado mais um e, na mesma mudança, atualizar o número e o nome curto ⟸ [D22]
- [ ] CTD-R6  Código alocado fora da linha principal do **Controle de versão** é provisório, e quem entra depois renumera o que colidir; depois de entrar, nunca é renumerado ⟸ [D23]
- [ ] CTD-R7  O nome curto serve só para que duas alocações do mesmo número, feitas em paralelo, escrevam itens diferentes e conflitem ⟸ [D22]

## Área  `ARE`
Agrupamento de **Células** fortemente relacionadas entre si, guardado em um arquivo.
- nome: texto; único
- arquivo: nome da área em minúsculas, sem acento, com `.md`; único
- célula central: 1 **Célula**
- prioridade: núcleo | apoio | genérico; opcional
- dono: 1 **Dono de área**
- seções: `Índice`, `Linguagem`, `Tipos` e as **Células**, nesta ordem, sendo opcionais as três primeiras
- [ ] ARE-R1  Toda área consta da tabela de áreas do **Arquivo de produto**, e vice-versa · erro
- [x] ARE-R2  Área não tem sigla
- [x] ARE-R3  Mover uma **Célula** de área não muda nenhum **Identificador**
- [x] ARE-R4  A área não redefine **Termos**; a linguagem é a da **Especificação** ⟸ [D06]
- [x] ARE-R5  removida
- [x] ARE-R6  Pasta de área: `_area.md` com as seções anteriores às **Células**, e um arquivo por célula ou grupo de células
- [x] ARE-R7  Não há pasta dentro de pasta
- [x] ARE-R8  A área reúne uma **célula central** e as **Células** que dependem principalmente dela ⟸ [D29]
- [ ] ARE-R9  **Célula** que troca mais **Referências**, feitas e recebidas, com outra área do que com a sua é candidata a mudar de área · alerta ⟸ [D30]
- [ ] ARE-R10  Área com mais de 300 **Linhas**, ou com mais de um **dono**, vira pasta · alerta
- [x] ARE-C1  Criar uma área
  - entra na tabela de áreas do **Arquivo de produto**
- [x] ARE-C2  Dividir uma área em duas
  - indicado quando partes da área mal se referenciam
  - as **Células** mudam de arquivo; os **Identificadores**, não

## Verificador  `VRF`
Programa que checa a **Especificação** e produz as partes geradas, sem interpretar o texto.
- severidade: erro | alerta
- [ ] VRF-R1  Ao **Especificação alterada**: verifica e regenera as partes geradas
- [ ] VRF-R2  **Severidade** erro bloqueia a mudança; alerta pede revisão
- [ ] VRF-R3  Toda checagem é sintática ⟸ [D68]
- [ ] VRF-R4  Checa toda **Regra** terminada em `· erro` ou `· alerta`; a marca é a **severidade** ⟸ [D69]
- [ ] VRF-R5  É determinístico: a mesma **Especificação** dá sempre o mesmo resultado; um agente de IA o executa, e não o substitui ⟸ [D01]
- [ ] VRF-V1  Ver as violações da **Especificação**
  - cada violação cita o **Identificador** da **Regra** violada e a **severidade**
- [ ] VRF-C1  Gerar as partes derivadas
  - **Índice** de cada **Área**
  - **Mapa entre áreas**
  - **Glossário**
  - lista de dados que identificam pessoas, a partir dos **Atributos** marcados **pessoal**
  - definições de link das **Referências** a **Linhas** [REF-R4]
  - índice de cada pasta de **Decisões**, com **Decisão.código**, **questão**, **resolução** e os itens que citam cada uma ⟸ [D19]

## Índice  `IND`
Seção gerada no topo de uma **Área** com o que ela usa de outras áreas.
- conteúdo: lista de **Termos** e **Eventos** de outras **Áreas** usados aqui, de **reações** de outras áreas a eventos daqui e de **Perguntas** que tocam a área
- [ ] IND-R1  Nunca é editado à mão · erro ⟸ [D70]
- [ ] IND-R2  Começa com `<!-- gerado; não editar -->`

## Mapa entre áreas  `MAP`
Lista gerada de quais **Áreas** usam **Termos** e reagem a **Eventos** de quais outras.
- conteúdo: lista que dá, para cada par de **Áreas**, quantas **Referências** uma faz à outra
- [ ] MAP-R1  Nunca é escrito à mão ⟸ [D70]

## Documento derivado  `DER`
Documento produzido a partir da **Especificação** para um público ou uma finalidade, como um manual ou um plano de testes.
- [x] DER-R1  É descartável: nunca é editado nem citado como fonte ⟸ [D71]
- [x] DER-R2  Cada frase cita o **Identificador** ou o **Termo** de origem
- [x] DER-R3  Frase sem origem é invenção de quem gerou ou lacuna da **Especificação**
- [ ] DER-R4  É redigido por um agente de IA a partir da **Especificação**; não é parte gerada pelo **Verificador** ⟸ [D02]
- [ ] DER-R5  Guardá-lo sob **Controle de versão** cabe a quem adota, que assume a divergência; mantê-lo em dia não cabe ao formato ⟸ [D03]
- [ ] DER-V1 · leitor  Ler um documento derivado
  - cada frase leva a sua origem

## Decisão  `DEC`
Justificativa de um ponto não óbvio do produto, guardada à parte das **Áreas** e do **Arquivo de produto** e lida só sob demanda.
- código: **Código de decisão**; identidade; único; imutável
- questão: texto terminado em `?`
- resolução: uma frase, que responde à **questão**
- contexto: texto
- alternativas descartadas: outras respostas à **questão**, cada uma com o motivo
- consequências: o que se ganha e o que se aceita
- alterações: entradas com data e uma linha, da mais recente para a mais antiga, na seção `Histórico` ⟸ [D14]
- arquivo: em `decisoes/_produto/` ou em `decisoes/` seguido do nome de uma **Área**; o nome é o **código**, `-`, um nome curto e `.md`
- [ ] DEC-R1  Título: a **questão** e o **código**, como `` # Quem vê um pedido?  `D07` ``; a **resolução** vem logo abaixo · erro ⟸ [D13]
- [ ] DEC-R2  Depois da **resolução**, uma lista com `Contexto`, `Alternativas descartadas` e `Consequências`, nesta ordem, e a seção `Histórico` por último · erro
- [ ] DEC-R3  Responde a uma só **questão**; as **alternativas descartadas** são outras respostas a ela ⟸ [D12]
- [ ] DEC-R4  **Resolução** que se pode reverter em parte são duas decisões
- [ ] DEC-R5  Registra-se quando havia ao menos uma alternativa plausível; nasce na mesma mudança que o item que a cita ⟸ [D21]
- [ ] DEC-R6  **Questão** nova cria decisão nova; só se edita uma decisão quando a mesma questão ganha outra **resolução**
- [ ] DEC-R7  Ao mudar a **resolução**, a anterior vai para as **alternativas descartadas** e as **alterações** ganham uma entrada
- [ ] DEC-R8  **Código** em sequência única para o produto; código já usado não volta · erro ⟸ [D10]
- [ ] DEC-R9  Mora na pasta da **Área** cujos itens mais a citam; citada só pelo **Arquivo de produto**, em `_produto` · alerta ⟸ [D11]
- [ ] DEC-R10  Mudar de pasta não muda o **código**
- [ ] DEC-R11  Usa os **Termos** da **Especificação**, sem negrito ⟸ [D17]
- [ ] DEC-R12  Um item do corpo pode citar outra decisão, com a mesma **Referência** `⟸ [Dnn]` ⟸ [D20]
- [ ] DEC-R13  Decisão que nenhum item da **Especificação** e nenhuma outra decisão cita é órfã, e permanece até a limpeza · alerta ⟸ [D15]
- [ ] DEC-R14  **Resolução** com mais de uma frase, ou com ponto e vírgula, indica mais de uma decisão · alerta
- [ ] DEC-R15  Decisão com mais de 25 linhas indica mais de uma decisão · alerta
- [ ] DEC-R16  Mais de 5 **alterações** indicam **resoluções** acumuladas · alerta
- [ ] DEC-R17  O texto da decisão nunca é escrito em **Área** nem no **Arquivo de produto**
- [ ] DEC-R18  A pasta `decisoes/` fica junto dos arquivos da **Especificação** e tem legenda e instruções para agentes próprias, `_convencoes.md` e `AGENTS.md`, iguais em todos os projetos
- [ ] DEC-C1  Registrar uma decisão
  - com o próximo **código** livre
  - ao menos um item passa a citá-la
- [ ] DEC-C2  Rever a **resolução** de uma decisão
  - conforme [DEC-R7]
- [ ] DEC-C3  Limpar as decisões órfãs
  - exige: decisão órfã, conforme [DEC-R13]
  - o arquivo é apagado
  - decisão que só a apagada citava também é apagada
  - o **Arquivo de contadores** impede que o **código** volte
