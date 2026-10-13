# Distribuição
Como o formato chega ao repositório que o adota e é mantido em dia.
- componente central: **Instalador**

## Instalador  `INS`
Script que copia da linha principal, para o repositório que adota o formato, as **Instruções para agentes**, o **Arquivo de convenções** e os modelos dos arquivos que faltam.
- tecnologia: Node.js 18 ou mais recente; sem dependências ⟸ [D104]
- local: `skills/tabularium-instalar/instalar.mjs`
- usa 1 **Manifesto de instalação**
- usa 1 **GitHub**
- usa 1 **Node.js**
- [x] INS-R1  Baixa cada arquivo da linha principal por URL, sem clonar o repositório ⟸ [D97]
- [x] INS-R2  Só escreve os caminhos que o **Manifesto de instalação** lista
- [x] INS-Rp7zm.1  Baixa tudo antes de escrever qualquer arquivo, para uma falha de rede não deixar a instalação pela metade
- [x] INS-Rp7zm.2  Recusa o **Manifesto de instalação** que traz um caminho fora da raiz do repositório, porque ele vem da rede
- [x] INS-Rp7zm.3  Sobrescreve o arquivo genérico que mudou, e não toca no que está igual
- [x] INS-Rp7zm.4  Compara os arquivos sem contar o fim de linha, que o controle de versão pode trocar na cópia de trabalho
- [x] INS-Rp7zm.5  Cria o modelo só onde o arquivo ainda não existe, e nunca altera o que o repositório já preencheu ⟸ [D100]
- [x] INS-Rp7zm.6  A origem dos arquivos pode ser trocada por outra URL ou por uma pasta local, pela variável de ambiente `TABULARIUM_ORIGEM`
- [x] INS-I1  Execução por linha de comando, na raiz do repositório que adota o formato
  - argumento opcional: a raiz do repositório; sem ele, a pasta atual
  - uma linha por arquivo, com o que foi feito dele: `criado`, `atualizado`, `igual` ou `mantido`
  - se algo falha: nenhum arquivo é escrito

## Manifesto de instalação  `MAN`
Lista do que o **Instalador** copia, separando o que ele sobrescreve do que só cria.
- tecnologia: JSON
- local: `instalador/manifesto.json`
- genericos: caminhos que o **Instalador** sobrescreve
- modelos: caminhos que o **Instalador** cria só onde faltam, a partir de `instalador/modelos/`
- [x] MAN-R1  Mora na linha principal, e não na **Skill de instalação**; o **Instalador** o baixa a cada execução ⟸ [D98]

## Skill de instalação  `SKI`
Instruções que levam um agente de IA a executar o **Instalador** e a relatar o resultado.
- tecnologia: skill de agente, em Markdown
- local: `skills/tabularium-instalar/`
- usa 1 **Instalador**
- usa 1 **npx skills**
- [x] SKI-R1  Leva o **Instalador** consigo, e não os arquivos que ele copia ⟸ [D108]
- [x] SKI-R2  A cópia é sempre do **Instalador**; a skill não escreve esses arquivos ⟸ [D96]
- [x] SKI-Rp7zm.1  A instalação tem dois passos: o **npx skills** traz as skills, e a skill traz os arquivos da pasta da especificação ⟸ [D94]
- [x] SKI-Rp7zm.2  Atualizar o formato não atualiza as skills, que o **npx skills** atualiza à parte ⟸ [D108]
- [x] SKI-Rp7zm.3  Não conduz o preenchimento dos modelos: recomenda a **Skill de entrevista**
- [x] SKI-Rp7zm.4  Quando um arquivo genérico foi atualizado, lê a diferença, propõe os ajustes que a especificação existente pede e espera o aceite antes de alterá-la
- [x] SKI-I1  Comando `/tabularium-instalar`, digitado por quem usa o agente ⟸ [D94, D95]
  - o agente não a aciona por conta própria
