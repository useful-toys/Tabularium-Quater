# Como se testa o validador?  `D106`
Com ao menos um exemplo por regra checada, que viola só ela.
- Contexto: o validador só serve se acusa o que deve e se a regra citada na violação é a que foi quebrada
- Alternativas descartadas
  - Alguns arquivos grandes com muitas violações, conferindo a saída inteira: quando o teste falha não se sabe qual checagem quebrou, e uma violação esconde a falta de outra
- Consequências
  - Ganha: o teste mostra quando uma checagem nova acusa onde não devia
  - Aceita: muitos testes pequenos, e um teste novo a cada regra que entra na lista do validador

## Histórico
- 2026-10-10: decisão criada
