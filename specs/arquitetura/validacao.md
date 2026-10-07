# Validação
Como a forma de uma especificação é conferida no repositório que adota o formato.

## Script de validação  `VAL`
Script que lê a pasta da especificação e acusa as violações de forma.
- tecnologia: Node.js 18 ou mais recente; sem dependências
- local: `skills/tabularium-validar/validar.mjs`
- realiza: [VRF-R3], [VRF-R5], [VRF-R7], [VRF-R8], [VRF-R9], [VRF-R10], [VRF-R11], [VRF-R12], [VRF-R13], [VRF-R14], [VRF-V1]
- leitura: módulo que classifica cada linha da especificação pela forma
- checagens: módulos que acusam as violações sobre o que a leitura devolve
- usa 1 **Node.js**
- [x] VAL-R1  A **leitura** não depende das **checagens**, para servir a outro programa que leia a especificação
- [x] VAL-R2  Cada regra checada tem ao menos um teste com um exemplo que viola só ela
- [x] VAL-R3  Os testes ficam em `testes/`, fora da pasta da **Skill de validação**, e não são distribuídos
- [x] VAL-I1  Execução por linha de comando, na raiz do repositório que adota o formato
  - argumento opcional: a pasta da especificação; sem ele, `specs/`
  - uma linha por violação, com arquivo, linha, identificador da regra e frase
  - uma linha final com o total
  - código de saída 0 sem violação e 1 com alguma

## Skill de validação  `SKV`
Instruções que levam um agente de IA a executar o **Script de validação** e a corrigir o que ele acusa.
- tecnologia: skill de agente, em Markdown
- local: `skills/tabularium-validar/`
- realiza: [VRF-R6]
- usa 1 **Script de validação**
- usa 1 **npx skills**
- [x] SKV-R1  Leva o **Script de validação** consigo
- [x] SKV-I1  Comando `/tabularium-validar`, digitado por quem usa o agente ou acionado pelo agente depois de alterar a especificação
