# Sorteio
Como se obtém o código sorteado que serve de prefixo aos códigos de uma mudança sem issue.

## Script de sorteio  `SOR`
Script que sorteia um código que ainda não aparece na pasta da especificação.
- tecnologia: Node.js 18 ou mais recente; sem dependências ⟸ [D104]
- local: `skills/tabularium-sortear/sortear.mjs`
- realiza: [IDT-R22.6]
- usa 1 **Node.js**
- [x] SOR-R22.1  O alfabeto do sorteio é escrito aqui e no **Script de validação**, e um teste confere que os dois são iguais
- [x] SOR-I22.1  Execução por linha de comando, na raiz do repositório que adota o formato
  - argumento opcional: a pasta da especificação; sem ele, `specs/`
  - uma linha com o código sorteado
  - código de saída 0 quando sorteia
  - código de saída 2 quando o argumento não é uma pasta existente

## Skill de sorteio  `SKS`
Instruções que levam um agente de IA a decidir se a mudança pede um código sorteado e a executar o **Script de sorteio**.
- tecnologia: skill de agente, em Markdown
- local: `skills/tabularium-sortear/`
- realiza: [IDT-R22.2]
- usa 1 **Script de sorteio**
- usa 1 **npx skills**
- [x] SKS-R22.1  Leva o **Script de sorteio** consigo ⟸ [D108]
- [x] SKS-I22.1  Comando `/tabularium-sortear`, digitado por quem usa o agente ou acionado pelo agente antes de alocar um código ⟸ [D95]
