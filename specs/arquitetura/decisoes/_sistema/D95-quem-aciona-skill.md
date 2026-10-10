# Quem pode acionar cada skill?  `D95`
A skill que altera arquivos ou acessa a rede só é acionada por uma pessoa, e a que só lê também pode ser acionada pelo agente.
- Contexto: a skill de instalação sobrescreve as instruções para agentes e a legenda e busca arquivos na internet, e a de validação só lê a especificação
- Alternativas descartadas
  - O agente aciona a instalação quando julga o formato desatualizado: trocaria as regras no meio de uma tarefa, e a mudança do formato entraria misturada com outro trabalho
  - A validação só por comando de uma pessoa: o agente concluiria alterações sem conferi-las
  - Um gancho que valida a cada arquivo gravado ou a cada commit: exigiria configurar cada agente e cada repositório, e impedir que a mudança entre é escolha de quem adota
- Consequências
  - Ganha: quem adota escolhe o momento de atualizar o formato, e a alteração da especificação é conferida sem depender de lembrança
  - Aceita: o repositório fica com a versão antiga do formato até alguém atualizar
  - Aceita: nada garante que o agente rode o validador

## Histórico
- 2026-10-10: decisão criada
