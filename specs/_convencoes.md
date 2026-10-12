# Convenções
Legenda para ler e escrever uma especificação neste formato. Este arquivo é igual em todos os projetos. A definição completa é a especificação do formato, que prevalece sobre esta legenda.

## Arquivos
- `AGENTS.md`: instruções para agentes de IA
- `_convencoes.md`: esta legenda
- `_produto.md`: o que vale para o produto inteiro; lido antes das áreas; inclui os externos, sistemas ou organizações que alguma regra pressupõe
- `_perguntas.md`: dúvidas sobre o que já foi comprometido; ideias não entram; opcional; um item por pergunta, como `- P4.1  enunciado?`, com sub-itens `opção:` e `sobre:`; título e frase de abertura são opcionais
- `decisoes/`: decisões relevantes, uma por arquivo, lidas só sob demanda; tem a sua própria legenda e as suas instruções para agentes; os itens da especificação as citam, e elas não citam de volta
- `dados/`: arquivos de dados de referência, em JSON ou CSV, lidos só sob demanda; cada um é citado por exatamente uma regra; o nome é a sigla da célula que o cita, `-`, um nome curto em minúsculas e sem acento, e a extensão, como `PED-tarifas.json`; a pasta não tem subpastas nem outros arquivos
- `<area>.md`: uma área; lida em qualquer ordem; é área todo arquivo `.md` desta pasta cujo nome não começa por `_` e que não é `AGENTS.md` nem `README.md`
- `<area>/`: área dividida; é área toda subpasta com `_area.md`, que traz a frase, as linhas da área e as seções anteriores às células; cada outro arquivo começa pelo título e traz as células em blocos
- `README.md`: índice de áreas, com a frase de cada uma e as células dela; gerado por programa e nunca editado

## Estrutura
- `#` arquivo · título de bloco · item de lista · critério (sub-item)
- títulos organizam os blocos em hierarquia, com profundidade livre; dentro do bloco não há subtítulos; a profundidade dos sub-itens é livre
- abaixo do título do arquivo, todo título é de célula ou de seção prevista
- toda linha tem uma das formas desta legenda; a que não casa com nenhuma é violação, que o validador acusa
- célula de conceitos, ou só célula: coisa do domínio, com tudo o que se afirma sobre ela e que não pertence a nenhuma outra
- bloco de célula: título com nome, em negrito, e sigla (`` ## **Pedido**  `PED` ``), frase de definição, lista única
- ordem da lista: modelo (linhas sem identificador), linhas `evento:`, R, Q, C, V, T
- linhas de um bloco de célula: definição, atributo, relação, `evento: **Nome**`, afirmação, lápide, critério e fileira de tabela; não há outras
- num bloco de célula, só C e V têm sub-itens
- afirmação: linha que pode ser verificada no produto; papéis R, Q, C, V, T e J
- abertura de uma área: o título, a frase que diz o que ela reúne e as linhas `- célula central: **Célula**`, `- prioridade: valor` e `- dono: nome`, nesta ordem; só a prioridade pode faltar
- seções de uma área, depois da abertura e antes das células: Fronteira (gerada), Linguagem, Tipos, nesta ordem, sem outras
- item de Linguagem: `- **termo**: definição`; item de Tipos: `- **Nome**: base; restrições`, ou `- **Nome**:` e os valores separados por `|`

## Papéis
- R  regra: sempre verdadeira; independe de ação de um ator
- Q  qualidade: como o produto se comporta
- C  capacidade: um ator faz; altera estado; sub-itens são critérios
- V  visão: um ator vê; não altera nada; sub-itens são critérios
- T  declaração: o que um texto afirma, sem implicar comportamento
- J  jornada: sequência de C e V; só em `_produto.md`

## Arquivo de produto
- seções: `Propósito`, `Atores`, `Tipos comuns`, `Jornadas`, `Externos`, `Regras globais`, `Fora de escopo`, nesta ordem, omitidas as vazias, sem outras
- `Propósito`: `- Rótulo: texto`, com rótulo livre; o primeiro é `Problema`
- `Atores`: `- **Nome**: acesso`; há exatamente um padrão, que termina com `; padrão`
- `Tipos comuns`: como os itens de Tipos
- `Jornadas`: `- PRD-J1.1  Nome: [ID] → [ID]`
- `Externos`: `- **Nome** · papel`, com sub-itens iniciados por `guarda:`, `fornece:`, `recebe:` ou `impõe:`
- `Regras globais`: afirmações de sigla `PRD`
- `Fora de escopo`: `- texto · permanente` ou `- texto · nesta versão`

## Modelo
- forma: `**nome**: tipo; qualificadores`; depois do `;`, só qualificadores
- qualificadores: identidade · único · imutável · opcional · inicial: X · derivado: fórmula · pessoal · inverso: CARD
- cardinalidades: 1 · 0..1 · 0..N · 1..N
- pertencimento: `pertence a 1 **Célula**`; a parte não existe sem o dono
- associação: `**papel**: CARD **Célula**`, ou só `CARD **Célula**` quando o papel tem o nome da célula
- especialização: `especializa **Célula**`; caso particular, que herda o modelo e as linhas do geral; uma célula especializa no máximo uma outra
- cada relação é declarada numa só das duas células; o outro lado, quando importa, vai em `inverso:`
- relações são conceituais: como o negócio vê o domínio, não como os dados são guardados

## Marcas
- `- [x] SIGLA-PN` ou `- [ ] SIGLA-PN`: afirmação R, Q, C, V ou T, implementada por inteiro ou não; não há estado parcial; dois espaços entre o identificador e o texto; J e linhas de modelo não levam marca
- `SIGLA-PN`: identificador; P é o papel e N o número, formado pelo prefixo de mudança, `.` e o número de ordem, como em `PED-R9.1`; códigos e siglas nunca mudam nem voltam
- prefixo de mudança: o número da issue que pede a mudança, sem zero à esquerda, ou um código sorteado quando ela não tem issue, como em `PED-Rk7q2.1`; é o mesmo em todos os códigos que a mudança aloca
- código sorteado: 4 caracteres de `bcdfghjklmnpqrstvwxz23456789`, o primeiro uma letra; sai de um programa, nunca de pessoa nem de agente
- número de ordem: o seguinte ao maior já usado com a mesma sigla, o mesmo papel e o mesmo prefixo, a partir de 1; sai de um programa, nunca de pessoa nem de agente; perguntas e decisões têm cada uma a sua contagem, como em `P9.1` e `D9.1`
- `PED-R8`, `P04` ou `D07`, só com um número: código anterior ao prefixo de mudança; continua válido, e nenhum outro é alocado assim
- `[PED-R1.1]`: referência a identificador
- `**Termo**`: termo; na definição, o nome vai em negrito, também no título de célula; na referência, vai em negrito a primeira menção de cada item, frase de definição ou fileira de tabela; negrito só marca termo, nunca ênfase
- negrito se escreve só com `**`; `__texto__`, `<b>` e `<strong>` são violação, fora de código, mesmo em volta de um termo
- em maiúsculas ou no plural regular (`s`, `es`, `ões`, `ães`, `ais`, `éis`, `eis`, `óis`, `ns`), é o mesmo termo
- quanto a termos, o validador confere só o negrito e as definições; o texto sem negrito não é checado
- negrito que casa com um termo e com um atributo é do termo
- não são menções: títulos, cabeçalhos de tabela, código, marcas de ator, qualificadores no modelo e a própria célula no seu bloco
- título que não é de célula e cabeçalho de tabela não levam negrito, mesmo em volta de um termo
- `(~~valor, montante~~)` no fim do texto da linha que define um termo, antes das marcas de fim de item: sinônimos de não usar; não aparecem em negrito nem como nome de termo, em maiúsculas ou no plural
- `**Célula.atributo**`: referência a atributo cujo nome se repete em outra célula
- `· ator` logo após o identificador, em minúsculas: ator da afirmação, quando não é o padrão; a regra marcada `· tempo` traz o prazo com número e unidade
- `Ao **Evento**:` no início de uma R: reação a um evento
- R terminada em `:` seguida de uma linha em branco e de uma tabela: tabela de decisão, ou dados de referência quando a primeira coluna é o atributo de identidade da célula
- R terminada em `: [PED-tarifas.json]`: dados de referência num arquivo de `dados/`
- critério iniciado por `exige:`: pré-condição; por `se …:`: fluxo alternativo ou exceção; sem prefixo: resultado
- `⟵ [P4.1]` no fim da linha: linha provisória, à espera da pergunta P4.1; respondida a pergunta, a marca sai
- `⟸ [D7.1]` ou `⟸ [D7.1, D12.1]` no fim de um item de lista: decisões que o fundamentam; a frase de definição e as lápides não citam; a afirmação que muda de célula leva as citações consigo
- ordem das marcas no fim de um item: `⟸ [Dnn]`, depois `⟵ [Pnn]`; na regra seguida de tabela ou de arquivo de dados, antes do `:`
- `- [ ] PED-R7.1  removida`: lápide de uma afirmação retirada; passa a `[x]` quando o produto deixa de ter o comportamento
- `- [x] PED-C3.1  movida → [ENT-C1.1]`: lápide de uma afirmação que mudou de célula; tem a marca da afirmação nova, que herda a da antiga
- lápide `[x]` que nada mais cita pode ser podada; o identificador dela continua sem voltar
- `<!-- gerado; não editar -->`: seção ou arquivo gerado por programa; documentos derivados, como visão, casos de uso e manual, são redigidos por agente e ficam fora desta pasta

## Dados de referência
- instâncias de uma célula que já vêm com o produto e só mudam por uma nova versão dele; o que um ator altera é estado, e o que um externo fornece e atualiza consta só do `fornece:` dele
- uma regra de dados por célula, no máximo: R terminada em `:` e seguida dos dados; só em célula com atributo de identidade
- no bloco: tabela cuja primeira coluna é o atributo de identidade; cada coluna é um atributo da célula, com o nome escrito como no modelo; opcional ausente é célula vazia
- em arquivo: o nome entre colchetes depois do `:`, sem caminho, como em `- [ ] PED-R5.1  As tarifas, por **modalidade**, com as **Faixas de peso** ⟸ [D7.1]: [PED-tarifas.json]`
- a regra que cita um arquivo nomeia em negrito os atributos que ele traz, com o de identidade primeiro, e a célula de cada parte que ele traz; o tipo de cada atributo fica só na linha de modelo
- no bloco fica o que é preciso ver para entender as linhas da célula; o resto, e todo dado que não é tabular, vai para arquivo; tabela com mais de 30 fileiras é candidata a arquivo
- JSON: lista de objetos, um por instância; cada chave é o nome de um atributo; a parte fica numa lista sob o nome da célula dela; opcional ausente é chave omitida
- CSV: primeira linha com os nomes dos atributos, o de identidade primeiro; separador vírgula; campo vazio é opcional ausente
- arquivos em UTF-8; nenhuma identidade se repete; atributo que é associação traz a identidade da instância citada
- a célula pode ter também atributos que um ator altera; os dados trazem só os demais
- outra linha cita uma instância pela identidade, em código e sem negrito
- mudar os dados mantém o identificador da regra; a marca volta a `[ ]` até o produto trazer os dados novos
- o dado entra num arquivo por cópia ou por conversão feita por programa, nunca por transcrição; o original em outro formato não fica na especificação
