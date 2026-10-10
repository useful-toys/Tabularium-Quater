# Em que os scripts são escritos?  `D104`
Em Node.js, só com o que vem com ele.
- Contexto: quem instala as skills pelo npx skills já tem o Node.js na máquina, e cada script é executado direto da pasta da skill
- Alternativas descartadas
  - Python: mais um ambiente a exigir de quem adota
  - Script de terminal: não roda igual em Windows, macOS e Linux, e ler a gramática do formato nele seria penoso
  - Node.js com bibliotecas: exigiria instalar pacotes em cada repositório, e uma biblioteca pode mudar de comportamento
- Consequências
  - Ganha: os scripts não pedem nada além do que a instalação das skills já exigiu
  - Aceita: o que uma biblioteca faria é escrito à mão, como a leitura de CSV

## Histórico
- 2026-10-10: decisão criada
