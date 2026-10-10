# Quem copia os arquivos do formato na instalação?  `D96`
Um script, que o agente executa sem substituir.
- Contexto: os arquivos copiados são iguais em todos os projetos, e uma palavra trocada na cópia muda a regra naquele repositório sem ninguém perceber ⟸ [D01]
- Alternativas descartadas
  - A skill traz o texto dos arquivos e o agente os grava: o agente pode resumir, corrigir ou reformatar ao escrever, e o resultado varia de uma execução para outra
- Consequências
  - Ganha: a cópia é exata e igual em toda execução
  - Aceita: a instalação exige Node.js, e o agente precisa de permissão para executar um script

## Histórico
- 2026-10-10: decisão criada
