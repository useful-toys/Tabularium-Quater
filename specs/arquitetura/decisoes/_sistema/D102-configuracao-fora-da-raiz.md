# Onde ficam o manifesto e a configuração?  `D102`
Na pasta da especificação, e os de instalação na pasta do instalador, nunca soltos na raiz do repositório.
- Contexto: a raiz do repositório de quem adota pertence ao projeto dele, e a regra vale também para o repositório do formato
- Alternativas descartadas
  - Um arquivo de configuração na raiz, como fazem muitas ferramentas: mais um arquivo disputando a raiz, com o risco de colidir com um nome que o projeto já usa
- Consequências
  - Ganha: tudo o que é do Tabularium fica sob pastas dele, e fica claro o que o instalador pode sobrescrever
  - Aceita: a configuração fica menos visível para quem a procura na raiz por costume

## Histórico
- 2026-10-10: decisão criada
