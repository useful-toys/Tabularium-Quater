# Indexação
Como os índices de áreas e de decisões de uma especificação são produzidos no repositório que adota o formato.
- componente central: **Script de indexação**

## Script de indexação  `IDX`
Script que lê a pasta da especificação e grava o `README.md` de índice de cada pasta.
- tecnologia: Node.js 18 ou mais recente; sem dependências ⟸ [D104]
- local: `skills/tabularium-indexar/indexar.mjs`
- realiza: [GER-R2], [GER-R23.1], [GER-R23.2], [GER-R23.3], [GER-R23.4], [GER-R23.5], [GER-R23.6], [GER-R23.7], [GER-R23.8], [GER-R23.9], [GER-R23.10], [GER-C23.1]
- usa 1 **Script de validação**
- usa 1 **Node.js**
- [x] IDX-R23.1  Importa a **leitura** do **Script de validação**, da pasta da **Skill de validação** instalada ao lado da sua ⟸ [D23.5]
- [x] IDX-R23.2  Grava os índices com fim de linha LF, em qualquer sistema
- [x] IDX-R23.3  Os testes ficam em `testes/`, fora da pasta da **Skill de indexação**, e não são distribuídos ⟸ [D107]
- [x] IDX-R23.4  Cada regra realizada tem ao menos um teste, com o identificador dela no nome ⟸ [D106]
- [x] IDX-I23.1  Execução por linha de comando, na raiz do repositório que adota o formato
  - argumento opcional: a pasta da especificação; sem ele, `specs/`
  - uma linha por índice gravado ou apagado
  - uma linha por arquivo que ficou sem indexar, com o motivo
  - uma linha final com o total
  - código de saída 0 quando indexa tudo, e 1 quando algo fica sem indexar
  - código de saída 2 quando o argumento não é uma pasta existente, ou quando a **leitura** não é encontrada

## Skill de indexação  `SKX`
Instruções que levam um agente de IA a executar o **Script de indexação** e a relatar o que ficou sem indexar.
- tecnologia: skill de agente, em Markdown
- local: `skills/tabularium-indexar/`
- usa 1 **Script de indexação**
- usa 1 **Skill de validação**
- usa 1 **npx skills**
- [x] SKX-R23.1  Leva o **Script de indexação** consigo ⟸ [D108]
- [x] SKX-I23.1  Comando `/tabularium-indexar`, digitado por quem usa o agente ou acionado pelo agente depois de validar a especificação ⟸ [D95]