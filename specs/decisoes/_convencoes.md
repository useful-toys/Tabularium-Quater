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
- título: a questão, terminada em `?`, e o código, como `` # Quem vê um pedido?  `D7.1` ``
- resolução: uma frase, logo abaixo do título; é escrita só ali
- lista, nesta ordem: `Contexto`, `Alternativas descartadas`, `Consequências`
- `Contexto`: na própria linha, como `- Contexto: texto`; os outros dois vão sozinhos na linha, com sub-itens
- `Alternativas descartadas`: um sub-item por alternativa, com `:` e o motivo; ao menos uma
- `Consequências`: sub-itens `Ganha:` e `Aceita:`
- `## Histórico`: por último; uma entrada por alteração, da mais recente para a mais antiga, como `- 2026-10-04: decisão criada`

## Marcas
- `Dnn`: código da decisão; `D`, o prefixo de mudança, `.` e o número de ordem, como `D9.1` ou `Dk7q2.1`, conforme a legenda da especificação; único no produto; nunca volta, nem depois de apagada a decisão
- `D07`, só com um número: código anterior ao prefixo de mudança; continua válido, e nenhum outro é alocado assim
- `⟸ [D3.1]` no fim de um item do corpo: outra decisão, cuja resolução é contexto desta
- termos da especificação: usados sem negrito
- a decisão não leva negrito nenhum, em nenhuma grafia; o validador acusa

## Fronteira
- uma decisão responde a uma só questão
- as alternativas descartadas são outras respostas à mesma questão
- resolução com mais de uma frase, ou com ponto e vírgula: são duas decisões
- resolução que se pode reverter em parte: são duas decisões
- mais de 25 linhas, ou mais de 5 entradas no `Histórico`: sinal de decisão agregada demais

## Ligação com a especificação
- o item da especificação cita a decisão com `⟸ [Dnn]` no fim; a decisão não cita o item
- o texto da decisão nunca é escrito em área nem em `_produto.md`
- decisão que nenhum item da especificação, da arquitetura ou da interface e nenhuma outra decisão cita é órfã; permanece até a limpeza
- a decisão mora na pasta da área que mais a cita; mudar de pasta não muda o código

## Arquitetura e interface
- as decisões da arquitetura e da interface moram em `arquitetura/decisoes/` e em `interface/decisoes/`, com a forma desta legenda e códigos únicos entre as três pastas
- subpastas: `<area>/`, como aqui; `_sistema/` na arquitetura e `_interface/` na interface fazem o papel de `_produto/`
- item da especificação cita só decisão desta pasta; item da arquitetura, também as da arquitetura; item da interface, também as da arquitetura e as da interface
