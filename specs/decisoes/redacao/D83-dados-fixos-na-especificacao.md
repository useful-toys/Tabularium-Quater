# Dados fixos do produto entram na especificação?  `D83`
Sim, os que só mudam por uma nova versão do produto.
- Contexto: muitos produtos trazem conteúdo pronto, como um catálogo, uma tabela de tarifas ou uma convenção de cores, e um teste só confere esse conteúdo contra algo escrito
- Alternativas descartadas
  - Deixá-los só no código: a especificação deixa de ser a fonte única, e o conteúdo fica sem identificador que um teste cite
  - Um anexo com os dados: organiza por tipo de documento e tira da célula o que se afirma sobre ela ⟸ [D24]
  - Incluir também o que um ator altera: é estado do produto, que muda sem decisão de quem especifica
  - Incluir também o que um externo fornece e atualiza: a lista escrita ficaria errada a cada atualização de fora
- Consequências
  - Ganha: o conteúdo fixo tem um só lugar, citável e com marca de implementação
  - Aceita: quem especifica passa a manter dados, além de regras

## Histórico
- 2026-10-07: decisão criada
