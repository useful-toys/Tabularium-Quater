# Convenções das decisões
Legenda para ler e escrever uma decisão neste formato. Este arquivo é igual em todos os projetos. A definição completa é a especificação do formato, que prevalece sobre esta legenda.

## Arquivos
- `AGENTS.md`: instruções para agentes de IA sobre decisões
- `_convencoes.md`: esta legenda
- `_produto/`: decisões citadas só por `_produto.md`
- `<area>/`: decisões que os itens da área mais citam
- `Dnn-nome-curto.md`: uma decisão
- `README.md` de cada pasta: índice gerado por programa

## Estrutura
- título: a questão, terminada em `?`, e o código, como `` # Quem vê um pedido?  `D07` ``
- resolução: uma frase, logo abaixo do título; é escrita só ali
- lista, nesta ordem: `Contexto`, `Alternativas descartadas`, `Consequências`
- `Contexto`: na própria linha, como `- Contexto: texto`; os outros dois vão sozinhos na linha, com sub-itens
- `Alternativas descartadas`: um sub-item por alternativa, com `:` e o motivo; ao menos uma
- `Consequências`: sub-itens `Ganha:` e `Aceita:`
- `## Histórico`: por último; uma entrada por alteração, da mais recente para a mais antiga, como `- 2026-10-04: decisão criada`

## Marcas
- `Dnn`: código da decisão; sequência única para o produto; nunca volta, nem depois de apagada a decisão; o maior já usado está em `_contadores.md`, na pasta da especificação
- `⟸ [D03]` no fim de um item do corpo: outra decisão, cuja resolução é contexto desta
- termos da especificação: usados sem negrito; sinônimos proibidos não aparecem

## Fronteira
- uma decisão responde a uma só questão
- as alternativas descartadas são outras respostas à mesma questão
- resolução com mais de uma frase, ou com ponto e vírgula: são duas decisões
- resolução que se pode reverter em parte: são duas decisões
- mais de 25 linhas, ou mais de 5 entradas no `Histórico`: sinal de decisão agregada demais

## Ligação com a especificação
- o item da especificação cita a decisão com `⟸ [Dnn]` no fim; a decisão não cita o item
- o texto da decisão nunca é escrito em área nem em `_produto.md`
- decisão que nenhum item e nenhuma outra decisão cita é órfã; permanece até a limpeza
- a decisão mora na pasta da área que mais a cita; mudar de pasta não muda o código
