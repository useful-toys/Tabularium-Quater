# Organização
Como a **Especificação** se divide em arquivos e **Áreas**, e o que o **Verificador** checa e gera a partir dela.

## Linguagem
- externo: sistema ou organização fora do produto que alguma **Regra** pressupõe; declarado em `Externos` do **Arquivo de produto**

## Especificação  `ESP`
Conjunto de arquivos Markdown que descreve um produto inteiro e é a fonte única da verdade sobre ele.
- 1 **Instruções para agentes**
- 1 **Arquivo de convenções**
- 1 **Arquivo de produto**
- 0..1 **Arquivo de perguntas**
- 1..N **Área**
- evento: Especificação alterada
- [x] ESP-R1  removida
- [x] ESP-R2  A única prosa é a **definição** de cada **Célula**
- [x] ESP-R3  removida
- [x] ESP-R4  Ordem de leitura: **Arquivo de convenções**, **Arquivo de produto**, qualquer **Área**
- [x] ESP-R5  Histórico, justificativas e explicações didáticas ficam fora do texto
- [x] ESP-R6  O texto descreve só o que foi comprometido; ideias ficam no **Rastreador** até amadurecerem
- [ ] ESP-R7  Títulos organizam os blocos em hierarquia, com profundidade livre; dentro do bloco não há subtítulos, e a profundidade dos sub-itens é livre
- [ ] ESP-R8  Uma especificação descreve um só produto, com uma só linguagem; significados de um **Termo** que não se conciliam indicam dois produtos, cada um com a sua especificação
- [ ] ESP-V1 · leitor  Ler uma **Área** sem abrir as outras
  - o **Índice** da **Área** diz o que ela usa de fora

## Instruções para agentes  `AGT`
Arquivo que ensina agentes de IA a trabalhar no formato, igual em todos os projetos.
- arquivo: `AGENTS.md`; imutável
- [x] AGT-R1  Não contém nada específico do produto
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
- [x] APR-R1  Sigla das **Linhas** com **Identificador**: `PRD`
- [x] APR-R2  Tudo o que um **Documento derivado** precisaria afirmar sobre o conjunto, e não se deduz das **Áreas**, mora aqui
- [x] APR-R3  **Regra** global que cita uma **Célula** pertence ao bloco dessa célula
- [x] APR-R4  **Externo** visível ao usuário leva nome; o invisível, só o papel
- [x] APR-R5  Item fora de escopo diz o horizonte: permanente ou nesta versão
- [x] APR-R6  A relação entre **Áreas** não é escrita aqui; é o **Mapa entre áreas** gerado
- [x] APR-R7  `Propósito` começa pelo problema que o produto resolve
- [x] APR-R8  Cada **externo** diz, em sub-itens, o que guarda, fornece, recebe ou impõe

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
- [x] ARE-R4  A área não redefine **Termos**; a linguagem é a da **Especificação**
- [x] ARE-R5  removida
- [x] ARE-R6  Pasta de área: `_area.md` com as seções anteriores às **Células**, e um arquivo por célula ou grupo de células
- [x] ARE-R7  Não há pasta dentro de pasta
- [x] ARE-R8  A área reúne uma **célula central** e as **Células** que dependem principalmente dela
- [ ] ARE-R9  **Célula** que troca mais **Referências**, feitas e recebidas, com outra área do que com a sua é candidata a mudar de área · alerta
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
- [ ] VRF-R3  Toda checagem é sintática
- [ ] VRF-R4  Checa toda **Regra** terminada em `· erro` ou `· alerta`; a marca é a **severidade**
- [ ] VRF-R5  É determinístico: a mesma **Especificação** dá sempre o mesmo resultado; um agente de IA o executa, e não o substitui
- [ ] VRF-V1  Ver as violações da **Especificação**
  - cada violação cita o **Identificador** da **Regra** violada e a **severidade**
- [ ] VRF-C1  Gerar as partes derivadas
  - **Índice** de cada **Área**
  - **Mapa entre áreas**
  - **Glossário**
  - lista de dados que identificam pessoas, a partir dos **Atributos** marcados **pessoal**
  - definições de link das **Referências** a **Linhas** [REF-R4]

## Índice  `IND`
Seção gerada no topo de uma **Área** com o que ela usa de outras áreas.
- conteúdo: lista de **Termos** e **Eventos** de outras **Áreas** usados aqui, de **reações** de outras áreas a eventos daqui, de **Perguntas** que tocam a área e de **Linhas** da área citadas por **Decisões**, com os nomes de todas as que citam cada uma
- [ ] IND-R1  Nunca é editado à mão · erro
- [ ] IND-R2  Começa com `<!-- gerado; não editar -->`

## Mapa entre áreas  `MAP`
Lista gerada de quais **Áreas** usam **Termos** e reagem a **Eventos** de quais outras.
- conteúdo: lista que dá, para cada par de **Áreas**, quantas **Referências** uma faz à outra
- [ ] MAP-R1  Nunca é escrito à mão

## Documento derivado  `DER`
Documento produzido a partir da **Especificação** para um público ou uma finalidade, como um manual ou um plano de testes.
- [x] DER-R1  É descartável: nunca é editado nem citado como fonte
- [x] DER-R2  Cada afirmação cita o **Identificador** ou o **Termo** de origem
- [x] DER-R3  Afirmação sem origem é invenção de quem gerou ou lacuna da **Especificação**
- [ ] DER-R4  É redigido por um agente de IA a partir da **Especificação**; não é parte gerada pelo **Verificador**
- [ ] DER-R5  Guardá-lo sob **Controle de versão** é escolha de quem adota, que assume a divergência; mantê-lo em dia não cabe ao formato
- [ ] DER-V1 · leitor  Ler um documento derivado
  - cada afirmação leva a sua origem
