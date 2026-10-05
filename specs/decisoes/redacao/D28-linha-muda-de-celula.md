# O que acontece com uma linha que muda de célula?  `D28`
Ganha o identificador da nova dona, herda a marca de implementação e deixa no lugar antigo uma lápide que aponta para o novo.
- Contexto: a sigla do identificador indica a célula dona, e dividir ou fundir células move linhas entre blocos ⟸ [D27]
- Alternativas descartadas
  - Manter o identificador antigo no novo bloco: a sigla deixa de indicar a dona
  - Retirar e criar como linha nova: a linha nasceria pendente e geraria trabalho falso de implementação
- Consequências
  - Ganha: referências antigas que continuam resolvendo, e nada falsamente pendente
  - Aceita: lápides no texto até a poda ⟸ [D07]

## Histórico
- 2026-10-05: decisão criada
