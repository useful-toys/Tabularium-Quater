# O validador consulta o histórico da especificação?  `D80`
Não, lê só os arquivos como estão.
- Contexto: as regras de número que não volta só se checam por inteiro contra a versão anterior
- Alternativas descartadas
  - Consultar o controle de versão: amarra o validador a uma ferramenta, exige saber qual é a linha principal e falha em cópias sem histórico
- Consequências
  - Ganha: o validador roda em qualquer cópia dos arquivos
  - Aceita: número reaproveitado só é barrado pelo arquivo de contadores e pelo conflito que o nome curto provoca ⟸ [D22]

## Histórico
- 2026-10-06: decisão criada
