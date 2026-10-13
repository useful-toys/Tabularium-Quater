# Quem confere o significado de uma especificação?  `Dtcwx.1`
Um agente de IA, numa revisão que registra achados com criticidade, sem tornar a especificação inválida.
- Contexto: o validador confere só a forma, e duas afirmações bem formadas podem se contradizer ⟸ [D01, D68]
- Alternativas descartadas
  - Ninguém, e o significado fica com a leitura de quem escreve: a contradição entre duas linhas bem formadas passa despercebida
  - O agente decide se a especificação é válida: o resultado dele varia, e a mesma especificação seria válida numa execução e inválida em outra
- Consequências
  - Ganha: o que só o sentido mostra passa a ser apontado, e o resultado do validador continua repetível
  - Aceita: duas revisões da mesma especificação podem registrar achados diferentes

## Histórico
- 2026-10-12: decisão criada
