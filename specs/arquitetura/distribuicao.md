# Distribuição
Como o formato chega ao repositório que o adota e é mantido em dia.

## Instalador  `INS`
Script que copia da linha principal, para o repositório que adota o formato, as **Instruções para agentes**, o **Arquivo de convenções** e os modelos dos arquivos que faltam.
- tecnologia: Node.js 18 ou mais recente; sem dependências
- local: `skills/tabularium-instalar/instalar.mjs`
- usa 1 **Manifesto de instalação**
- usa 1 **GitHub**
- [x] INS-R1  Baixa cada arquivo da linha principal por URL, sem clonar o repositório
- [x] INS-R2  Só escreve os caminhos que o **Manifesto de instalação** lista
- [x] INS-I1  Execução por linha de comando, na raiz do repositório que adota o formato
  - uma linha por arquivo, com o que foi feito dele

## Manifesto de instalação  `MAN`
Lista do que o **Instalador** copia, separando o que ele sobrescreve do que só cria.
- tecnologia: JSON
- local: `instalador/manifesto.json`
- genericos: caminhos que o **Instalador** sobrescreve
- modelos: caminhos que o **Instalador** cria só onde faltam, a partir de `instalador/modelos/`
- [x] MAN-R1  Mora na linha principal, e não na **Skill de instalação**; o **Instalador** o baixa a cada execução

## Skill de instalação  `SKI`
Instruções que levam um agente de IA a executar o **Instalador** e a relatar o resultado.
- tecnologia: skill de agente, em Markdown
- local: `skills/tabularium-instalar/`
- usa 1 **Instalador**
- usa 1 **npx skills**
- [x] SKI-R1  Leva o **Instalador** consigo, e não os arquivos que ele copia
- [x] SKI-R2  A cópia é sempre do **Instalador**; a skill não escreve esses arquivos
- [x] SKI-I1  Comando `/tabularium-instalar`, digitado por quem usa o agente
  - o agente não a aciona por conta própria
