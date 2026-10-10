# De onde o instalador tira os arquivos?  `D97`
Da linha principal do repositório do formato, por URL, um arquivo de cada vez.
- Contexto: o instalador já roda em Node.js, que baixa um arquivo por URL sem outra ferramenta
- Alternativas descartadas
  - Embutir os arquivos na skill: criava uma segunda cópia, que envelhecia
  - Clone raso do repositório: exigia git e uma pasta temporária
- Consequências
  - Ganha: toda instalação traz a versão mais recente, sem cópia guardada em outro lugar
  - Aceita: o repositório do formato tem de ser público
  - Aceita: a instalação exige acesso à internet e ao GitHub
  - Aceita: mudar o endereço do repositório quebra os instaladores já distribuídos

## Histórico
- 2026-10-10: decisão criada
