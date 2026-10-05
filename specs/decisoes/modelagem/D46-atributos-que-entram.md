# Quais atributos entram na especificação?  `D46`
Só o que o usuário vê ou do qual alguma linha com identificador depende.
- Contexto: a especificação descreve o domínio como o negócio o vê ⟸ [D74]
- Alternativas descartadas
  - O modelo de dados completo: códigos internos, auditoria e chaves técnicas pertencem à arquitetura
- Consequências
  - Ganha: modelo enxuto e não técnico
  - Aceita: um atributo novo só entra junto de uma linha que o use

## Histórico
- 2026-10-05: decisão criada
