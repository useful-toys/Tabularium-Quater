# Em que formato ficam os arquivos de dados?  `D85`
Em JSON, os estruturados, e em CSV, os tabulares.
- Contexto: os dados acompanham a especificação em arquivos de texto, que se leem e se comparam entre versões sem ferramenta ⟸ [D73]
- Alternativas descartadas
  - Aceitar também YAML e XML: não expressam nada que o JSON não expresse, e cada formato a mais é outro jeito de escrever a mesma coisa
  - Guardar o arquivo original ao lado do convertido: duas cópias dos mesmos dados divergem na primeira alteração
- Consequências
  - Ganha: um só formato para cada forma de dado, lido por programa sem dependência
  - Aceita: dado que chega em outro formato é convertido antes de entrar

## Histórico
- 2026-10-07: decisão criada
