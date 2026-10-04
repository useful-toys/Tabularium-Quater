# Convenções
Legenda para ler e escrever uma especificação neste formato. Este arquivo é igual em todos os projetos. A definição completa é a especificação do formato, que prevalece sobre esta legenda.

## Arquivos
- `AGENTS.md`: instruções para agentes de IA
- `_convencoes.md`: esta legenda
- `_produto.md`: o que vale para o produto inteiro; lido antes das áreas; inclui os externos, sistemas ou organizações que alguma regra pressupõe
- `_perguntas.md`: dúvidas sobre o que já foi comprometido; ideias não entram; opcional
- `decisoes/_produto/` e `decisoes/<area>/`, fora desta pasta: pequenas decisões, uma por arquivo, lidas só sob demanda; os itens da especificação as citam, e elas não citam de volta
- `<area>.md`: uma área; lida em qualquer ordem
- `<area>/`: área dividida; `_area.md` traz as seções anteriores às células

## Estrutura
- `#` arquivo · título de bloco · item de lista · critério (sub-item)
- títulos organizam os blocos em hierarquia, com profundidade livre; dentro do bloco não há subtítulos; a profundidade dos sub-itens é livre
- célula de conceitos, ou só célula: coisa do domínio, com tudo o que se afirma sobre ela e que não pertence a nenhuma outra
- bloco de célula: título com nome e sigla (`` ## Pedido  `PED` ``), frase de definição, lista única
- ordem da lista: modelo (linhas sem identificador), linhas `evento:`, R, Q, C, V, T
- seções de uma área, antes das células: Índice (gerado), Linguagem, Tipos

## Papéis
- R  regra: sempre verdadeira; independe de ação de um ator
- Q  qualidade: como o produto se comporta
- C  capacidade: um ator faz; altera estado; sub-itens são critérios
- V  visão: um ator vê; não altera nada; sub-itens são critérios
- T  declaração: o que um texto afirma, sem implicar comportamento
- J  jornada: sequência de C e V; só em `_produto.md`

## Modelo
- forma: `nome: tipo; qualificadores`; depois do `;`, só qualificadores
- qualificadores: identidade · único · imutável · opcional · inicial: X · derivado, seguido da fórmula · pessoal · inverso: CARD
- cardinalidades: 1 · 0..1 · 0..N · 1..N
- pertencimento: `pertence a 1 **Célula**`; a parte não existe sem o dono
- associação: `papel: CARD **Célula**`, ou só `CARD **Célula**` quando o papel tem o nome da célula
- especialização: `especializa **Célula**`; caso particular, que herda o modelo e as linhas do geral
- cada relação é declarada numa só das duas células; o outro lado, quando importa, vai em `inverso:`
- relações são conceituais: como o negócio vê o domínio, não como os dados são guardados

## Marcas
- `- [x] SIGLA-PN` ou `- [ ] SIGLA-PN`: linha R, Q, C, V ou T, implementada por inteiro ou não; não há estado parcial; J e linhas de modelo não levam marca
- `SIGLA-PN`: identificador; P é o papel, N o número; números e siglas nunca voltam
- `[PED-R1]`: referência a identificador
- `**Termo**`: referência a termo, na primeira menção de cada item, frase de definição ou fileira de tabela; definições não levam negrito
- não são menções: títulos, cabeçalhos de tabela, código, marcas de ator, qualificadores no modelo e a própria célula no seu bloco
- `(~~valor, montante~~)` no fim da linha que define um termo: sinônimos que não devem ser usados
- `**Célula.atributo**`: referência a atributo cujo nome se repete em outra célula
- `· ator` logo após o identificador: ator da linha, quando não é o padrão
- `Ao **Evento**:` no início de uma R: reação a um evento
- R terminada em `:` seguida de tabela: tabela de decisão
- critério iniciado por `exige:`: pré-condição; por `se …:`: fluxo alternativo ou exceção; sem prefixo: resultado
- `· erro` ou `· alerta` no fim de uma R: regra checada por programa, com a severidade
- afirmação: linha que pode ser verificada no produto; papéis R, Q, C, V, T e J
- `⟵ [P04]` no fim da linha: linha provisória, à espera da pergunta P04; respondida a pergunta, a marca sai
- `⟸ [D07]` ou `⟸ [D07, D12]` no fim de um item de lista: decisões que o fundamentam; a frase de definição e as lápides não citam
- ordem das marcas no fim de um item: `· erro` ou `· alerta`, depois `⟸ [Dnn]`, depois `⟵ [Pnn]`
- `- [ ] PED-R7  removida`: lápide de uma linha retirada; passa a `[x]` quando o produto deixa de ter o comportamento
- `- [x] PED-C3  movida → [ENT-C1]`: lápide de uma linha que mudou de célula; tem a marca da linha nova, que herda a da antiga
- lápide `[x]` que nada mais cita pode ser podada; o número dela continua sem voltar
- `<!-- gerado; não editar -->`: seção gerada por programa; documentos derivados, como visão, casos de uso e manual, são redigidos por agente e ficam fora desta pasta

## Decisões
- arquivo: `D07-nome-curto.md`; o código `Dnn` é único no produto e nunca volta
- título: a questão, terminada em `?`, e o código, como `` # Quem vê um pedido?  `D07` ``
- logo abaixo: a resolução, em uma frase
- lista: `Contexto`, `Alternativas descartadas`, `Consequências`, nesta ordem; depois a seção `Histórico`, com data e uma linha por alteração
- uma decisão responde a uma só questão; as alternativas descartadas são outras respostas a ela
- um item do corpo pode citar outra decisão com `⟸ [Dnn]`
- usa os termos da especificação, sem negrito
- `README.md` de cada pasta de decisões: índice gerado por programa
