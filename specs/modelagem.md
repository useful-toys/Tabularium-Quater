# Modelagem
As **Células** do produto, seus **Atributos** e os **Termos** que os nomeiam.

## Linguagem
- modelo: **Linhas** sem **Identificador** no início do bloco de uma **Célula**; descrevem o que ela é
- lista única: a lista de **Linhas** de um bloco, sem subtítulos
- identidade: qualificador; distingue uma instância das outras e torna a **Célula** uma **entidade**
- único: qualificador; o valor não se repete entre instâncias
- imutável: qualificador; o valor não muda depois de criado
- opcional: qualificador; o valor pode faltar; sem ele, é obrigatório
- inicial: qualificador; valor ao nascer, na forma `inicial: X`
- derivado: qualificador; calculado a partir de outros **Atributos**, com a fórmula em seguida
- inverso: qualificador; **Cardinalidade** da relação vista da **Célula** citada, na forma `inverso: 0..N`
- pessoal: qualificador; dado que identifica ou torna identificável uma pessoa, conforme a **LGPD**

## Célula  `CEL`
Célula de conceitos: coisa do domínio, nomeada por um substantivo do negócio, com tudo o que a **Especificação** afirma sobre ela e que não pertence a nenhuma outra.
- sigla: **Sigla de célula**; identidade; único
- nome: texto; único
- definição: uma frase compreensível fora do bloco
- entidade: sim | não; derivado; tem um **Atributo** marcado **identidade**
- [x] CEL-R1  Título do bloco: nome e sigla em código, como `` ## Pedido  `PED` ``
- [ ] CEL-R2  A **definição** vem logo após o título · erro
- [ ] CEL-R3  Depois da **definição**, uma **lista única** nesta ordem: **modelo**, **Linhas** `evento:`, R, Q, C, V, T · erro
- [x] CEL-R4  removida
- [x] CEL-R5  Efeito sobre outra célula é uma **reação** no bloco dessa outra célula
- [x] CEL-R6  removida
- [ ] CEL-R7  Célula com mais de 40 **Linhas** indica que são duas células · alerta
- [x] CEL-R8  Célula não tem estado de implementação; quem o tem são as suas **Linhas** com **Identificador**
- [x] CEL-R9  O que é cada item, pelo primeiro teste com resposta sim:

| Primeiro teste com sim | É |
| --- | --- |
| É algo que um **Ator** faz ou vê? | **Capacidade** ou **Visão** da célula que altera ou exibe |
| É uma sequência de ações? | **Jornada** |
| É um fato que acontece e provoca **reação**? | **Evento** |
| É quem age? | **Ator** |
| É algo fora do produto que uma **Regra** pressupõe? | **externo** |
| É um valor sem **identidade**, como número, código, data ou faixa? | **Tipo de valor** |
| É característica, estado ou cálculo de outra coisa? | **Atributo** ou **derivado** no **modelo** dela |
| É um agrupamento de coisas que já são células? | **Área** |
| Há algo a afirmar sobre ela que não pertence a nenhuma outra? | célula |
| nenhuma | **Termo** na linguagem da **Área** |

- [x] CEL-R10  **Capacidade** ou **Visão** sem dono natural indica uma célula que falta
- [ ] CEL-R11  Célula sem **Linha** com **Identificador** e com no máximo uma linha de **modelo** é candidata a **Atributo** ou **Termo** · alerta
- [x] CEL-R12  **Atributo** que ganha atributos ou **Regras** próprias vira célula
- [ ] CEL-R13  Duas células citadas quase sempre juntas, uma delas só pela outra, são candidatas a fusão · alerta
- [ ] CEL-R14  **Sigla de célula** extinta ou fundida nunca volta · erro
- [x] CEL-R15  Pertencimento: **Linha** de **modelo** `pertence a 1 **Célula**`; a parte tem um só dono e não existe sem ele
- [x] CEL-R16  Especialização: **Linha** de **modelo** `especializa **Célula**`; a célula é um caso particular da outra
- [x] CEL-R17  A célula especializada herda o **modelo** e as **Linhas** do geral e só declara o que acrescenta
- [ ] CEL-R18  Uma célula especializa no máximo uma outra · erro
- [x] CEL-R19  Caso particular sem **Linhas** próprias não é especialização; é valor de um **Atributo**
- [x] CEL-R20  Pertencimento, associação e especialização descrevem como o negócio vê o domínio, não como os dados são guardados
- [x] CEL-C1  Dividir uma célula
  - as **Linhas** que passam à célula nova são movidas, conforme [LAP-R5]
  - a célula nova ganha **Sigla de célula** e **definição** próprias
- [x] CEL-C2  Fundir duas células
  - as **Linhas** da célula absorvida são movidas, conforme [LAP-R5]
  - o nome da absorvida vira **não usar** na que a absorveu, se for sinônimo
- [x] CEL-C3  Rebaixar uma célula a **Atributo** ou **Termo**
  - exige: nenhuma **Linha** com **Identificador** no bloco
- [x] CEL-C4  Promover um **Atributo** a célula
  - o **Atributo** sai do **modelo** de origem, que passa a citar a célula nova
- [x] CEL-V1 · leitor  Ver tudo o que se sabe de uma célula no seu bloco

## Atributo  `ATR`
Característica de uma **Célula** como o negócio a vê, escrita como **Linha** de **modelo**.
- nome: texto que não se repete na mesma **Célula**
- tipo: um **Tipo de valor**, valores separados por `|`, ou **Cardinalidade** seguida de uma **Célula**
- qualificadores: zero ou mais, separados por `;`; opcional
- [x] ATR-R1  Forma: `nome: tipo; qualificadores`
- [x] ATR-R2  removida
- [ ] ATR-R3  Entra só se o usuário o vê, ou se alguma **Linha** com **Identificador** depende dele · alerta
- [x] ATR-R4  Códigos internos, datas de auditoria e chaves técnicas não entram
- [x] ATR-R5  Formato, máscara e tamanho máximo não entram
- [ ] ATR-R6  **Atributo** cujo tipo é uma **Célula** é uma associação e leva a **Cardinalidade** antes da célula · erro
- [ ] ATR-R7  Qualificadores só do vocabulário fechado: **identidade**, **único**, **imutável**, **opcional**, **inicial**, **derivado**, **pessoal**, **inverso** · erro
- [x] ATR-R8  Associação cujo papel tem o nome da própria **Célula** omite o nome, como em `- 1..N **Produto**`
- [x] ATR-R9  Uma relação é declarada em uma só das duas **Células**; o outro lado, quando importa, vai em **inverso**
- [x] ATR-R10  Em associação, a **Cardinalidade** substitui o qualificador **opcional**

## Tipo de valor  `TIP`
Valor sem **identidade** usado por **Atributos**, como uma contagem ou um código.
- nome: texto; único
- forma: tipo de base e restrições, como `inteiro; de 0 a 99`
- [x] TIP-R1  Usado por uma só **Área**, fica nos tipos da área; por mais de uma, nos tipos comuns do **Arquivo de produto**

## Termo  `TRM`
Palavra ou expressão com significado definido uma única vez na **Especificação**.
- nome: texto que não se repete na **Especificação**, exceto nome de **Atributo**, que não se repete na sua **Célula**
- não usar: sinônimos proibidos, como sub-item da **definição**; opcional
- evento: Termo renomeado
- [x] TRM-R1  Lugar de definição por tipo de termo:

| Tipo de termo | Lugar |
| --- | --- |
| **Célula** | título do bloco e **definição** |
| **Atributo**, estado ou **derivado** | **modelo** da **Célula**; o nome antes de `:` |
| **Tipo de valor** | tipos da **Área**, ou tipos comuns do **Arquivo de produto** |
| **Evento** | **Linha** `evento:` da **Célula** que o produz |
| **Ator** | atores do **Arquivo de produto** |
| **externo** | `Externos` do **Arquivo de produto**; o nome antes de `·` |
| outro | linguagem da **Área** |

- [ ] TRM-R2  Definido uma única vez, sem negrito · erro
- [x] TRM-R3  removida
- [ ] TRM-R4  **Atributo** cujo nome se repete em outra **Célula** é referenciado como `**Célula.atributo**`, exceto no próprio bloco · erro
- [x] TRM-R5  Homônimo se resolve renomeando um dos lados
- [ ] TRM-R6  Termo listado em **não usar** não aparece em nenhum arquivo · erro
- [ ] TRM-R7  Referenciado em negrito na primeira menção dentro de cada item de lista, frase de definição ou fileira de tabela; maiúsculas e plural não alteram o termo · alerta
- [x] TRM-R8  Não são menções: títulos, cabeçalhos de tabela, código, marcas de **Ator**, qualificadores no **modelo** e a própria **Célula** dentro do seu bloco
- [x] TRM-C1  Renomear um termo

## Glossário  `GLO`
Lista gerada de todos os **Termos**, cada um com o tipo de termo, a **definição** e o lugar de origem.
- entrada: texto no formato nome · tipo de **Termo** — **definição** → lugar, mais **não usar** quando houver
- [ ] GLO-R1  Em ordem alfabética
- [ ] GLO-R2  Nunca é escrito à mão
