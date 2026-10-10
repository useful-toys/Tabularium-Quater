# O negrito de termo aceita outra grafia além dos dois asteriscos?  `D112`
Não, toda outra grafia de negrito é violação, mesmo em volta de um termo.
- Contexto: `__texto__`, `<b>` e `<strong>` aparecem na tela como negrito, e por eles a ênfase escaparia do validador ⟸ [D111]
- Alternativas descartadas
  - Aceitar a outra grafia quando o conteúdo é um termo: o validador teria de resolver termos em mais de uma sintaxe, e o negrito deixaria de ter uma só grafia
- Consequências
  - Ganha: uma só grafia de negrito a ler e a ensinar
  - Aceita: palavra entre dois pares de sublinhados, como `__init__`, só passa dentro de código

## Histórico
- 2026-10-10: decisão criada
