# Como se testa o validador?  `D106`
Com ao menos um teste por regra checada: um exemplo que viola só ela, se a regra acusa, ou o comportamento descrito, se a regra só orienta outra checagem.
- Contexto: o validador só serve se acusa o que deve e se a regra citada na violação é a que foi quebrada; regras como TRM-R15 a TRM-R17 nunca acusam com o próprio identificador, e não têm exemplo que as viole
- Alternativas descartadas
  - Alguns arquivos grandes com muitas violações, conferindo a saída inteira: quando o teste falha não se sabe qual checagem quebrou, e uma violação esconde a falta de outra
  - Exigir exemplo que viola de toda regra checada: regra que só orienta o comportamento de outra checagem não tem violação própria para exemplificar
- Consequências
  - Ganha: o teste mostra quando uma checagem nova acusa onde não devia
  - Aceita: muitos testes pequenos, e um teste novo a cada regra que entra na lista do validador

## Histórico
- 2026-10-10: resolução ampliada para a regra que só orienta, com teste de comportamento
- 2026-10-10: decisão criada
