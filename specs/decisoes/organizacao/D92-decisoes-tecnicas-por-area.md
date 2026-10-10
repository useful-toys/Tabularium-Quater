# As decisões de arquitetura e de interface ficam em subpastas por área?  `D92`
Sim, como as da especificação.
- Contexto: a interface pode ter muitas áreas, quando a aplicação é grande e tem muitos componentes visuais, e a arquitetura deve ter algumas
- Alternativas descartadas
  - Uma pasta só, sem subpastas: serve a poucas decisões, e a interface pode ter muitas
- Consequências
  - Ganha: as três pastas de decisões têm a mesma forma
  - Aceita: a decisão muda de subpasta quando outra área passa a citá-la mais

## Histórico
- 2026-10-10: decisão criada
