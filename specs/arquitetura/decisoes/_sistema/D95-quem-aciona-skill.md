# Quem pode acionar cada skill?  `D95`
A skill que altera arquivos escritos à mão ou acessa a rede só é acionada por uma pessoa, e a que só lê ou só grava arquivos gerados também pode ser acionada pelo agente.
- Contexto: a skill de instalação sobrescreve as instruções para agentes e a legenda e busca arquivos na internet, a de validação só lê a especificação, e a de indexação só grava os índices, que ninguém escreve à mão
- Alternativas descartadas
  - O agente aciona a instalação quando julga o formato desatualizado: trocaria as regras no meio de uma tarefa, e a mudança do formato entraria misturada com outro trabalho
  - Toda skill que altera arquivos só por comando de uma pessoa, também a que só grava arquivos gerados: os índices ficariam desatualizados depois de cada alteração feita pelo agente
  - A validação só por comando de uma pessoa: o agente concluiria alterações sem conferi-las
  - Um gancho que valida a cada arquivo gravado ou a cada commit: exigiria configurar cada agente e cada repositório, e impedir que a mudança entre é escolha de quem adota
- Consequências
  - Ganha: quem adota escolhe o momento de atualizar o formato, e a alteração da especificação é conferida e indexada sem depender de lembrança
  - Aceita: o repositório fica com a versão antiga do formato até alguém atualizar
  - Aceita: nada garante que o agente rode o validador nem o indexador

## Histórico
- 2026-10-11: a skill que só grava arquivos gerados passa a poder ser acionada pelo agente
- 2026-10-10: decisão criada
