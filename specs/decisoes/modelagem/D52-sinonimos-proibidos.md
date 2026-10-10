# Como se tratam os sinônimos?  `D52`
Os sinônimos proibidos são declarados na linha que define o termo, e o validador os acusa em negrito e como nome de termo.
- Contexto: a linguagem única precisa dizer também quais palavras evitar ⟸ [D06]
- Alternativas descartadas
  - Confiar na disciplina dos autores: sinônimos entram sem que ninguém perceba
  - Acusar o sinônimo proibido em todo o texto: o validador não checa termos em texto sem negrito ⟸ [D114]
  - Declarar num sub-item `não usar:`: é mais verboso e afasta os sinônimos proibidos da definição
- Consequências
  - Ganha: sinônimo citado como termo detectado por programa
  - Aceita: listas de palavras proibidas a manter
  - Aceita: sinônimo proibido em texto sem negrito passa sem aviso

## Histórico
- 2026-10-10: o validador deixa de acusar o sinônimo proibido em texto sem negrito
- 2026-10-10: alternativa do sub-item descartada
- 2026-10-05: decisão criada
