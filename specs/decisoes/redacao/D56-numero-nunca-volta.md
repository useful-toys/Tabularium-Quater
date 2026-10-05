# Um identificador pode ser renumerado ou reaproveitado?  `D56`
Não, números e siglas nunca são renumerados nem voltam a ser usados.
- Contexto: uma referência antiga não pode passar a apontar para outra afirmação, e a única exceção é o código que ainda não entrou na linha principal ⟸ [D23]
- Alternativas descartadas
  - Renumerar para manter a sequência: as referências passariam a apontar para outra coisa
- Consequências
  - Ganha: referências estáveis por toda a vida da especificação
  - Aceita: lacunas na numeração

## Histórico
- 2026-10-05: decisão criada
