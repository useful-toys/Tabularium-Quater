# Alocação de códigos
Como se obtêm o código sorteado, que serve de prefixo aos códigos de uma mudança sem issue, e o número de ordem de cada código novo.
- componente central: **Script de sorteio**

## Script de sorteio  `SOR`
Script que sorteia um código que ainda não aparece na pasta da especificação.
- tecnologia: Node.js 18 ou mais recente; sem dependências ⟸ [D104]
- local: `skills/tabularium-alocar-codigo/sortear.mjs`
- realiza: [IDT-R22.6]
- usa 1 **Node.js**
- [x] SOR-R22.1  O alfabeto do sorteio é escrito aqui e no **Script de validação**, e um teste confere que os dois são iguais
- [x] SOR-I22.1  Execução por linha de comando, na raiz do repositório que adota o formato
  - argumento opcional: a pasta da especificação; sem ele, `specs/`
  - uma linha com o código sorteado
  - código de saída 0 quando sorteia
  - código de saída 2 quando o argumento não é uma pasta existente

## Script de próximo código  `PRX`
Script que devolve o código seguinte ao maior já usado na pasta da especificação, para um tipo de código e um prefixo de mudança.
- tecnologia: Node.js 18 ou mais recente; sem dependências ⟸ [D104]
- local: `skills/tabularium-alocar-codigo/proximo.mjs`
- realiza: [IDT-Rbvc2.2], [IDT-Rbvc2.3]
- usa 1 **Node.js**
- usa 1 **Script de sorteio**
- [x] PRX-Ibvc2.1  Execução por linha de comando, na raiz do repositório que adota o formato
  - argumento: o tipo do código, `SIGLA-P` para identificador, `P` para pergunta ou `D` para decisão
  - argumento: o prefixo de mudança
  - argumento opcional: a pasta da especificação; sem ele, `specs/`
  - uma linha com o código inteiro
  - código de saída 0 quando devolve o código
  - código de saída 2 quando um argumento é inválido ou a pasta não existe

## Skill de alocação  `SKS`
Instruções que levam um agente de IA a achar o prefixo de uma mudança, executando o **Script de sorteio** quando ela não tem issue, e a obter cada código novo do **Script de próximo código**.
- tecnologia: skill de agente, em Markdown
- local: `skills/tabularium-alocar-codigo/`
- realiza: [IDT-Rbvc2.1]
- usa 1 **Script de sorteio**
- usa 1 **Script de próximo código**
- usa 1 **npx skills**
- [x] SKS-R22.1  Leva o **Script de sorteio** consigo ⟸ [D108]
- [x] SKS-Rbvc2.1  Leva o **Script de próximo código** consigo ⟸ [D108]
- [x] SKS-I22.1  removida
- [x] SKS-Ibvc2.1  Comando `/tabularium-alocar-codigo`, digitado por quem usa o agente ou acionado pelo agente antes de alocar um código ⟸ [D95]
