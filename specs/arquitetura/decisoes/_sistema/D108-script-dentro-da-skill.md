# Como o script chega a quem usa a skill?  `D108`
Dentro da pasta da skill.
- Contexto: a validação roda depois de cada alteração da especificação e tem de funcionar sem rede, e o npx skills já entrega a pasta inteira da skill
- Alternativas descartadas
  - A skill baixa o script da linha principal a cada execução: validar exigiria rede, e uma mudança do validador invalidaria a especificação no meio de um trabalho
  - Publicar o script como pacote no npm: exigiria publicar e versionar um pacote
- Consequências
  - Ganha: basta o Node.js para executar
  - Aceita: o validador de um repositório pode ficar atrás da legenda dele, porque atualizar o formato não atualiza a skill

## Histórico
- 2026-10-10: decisão criada
