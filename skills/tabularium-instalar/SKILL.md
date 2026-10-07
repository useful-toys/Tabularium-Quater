---
name: tabularium-instalar
description: Instala ou atualiza o formato Tabularium na pasta specs/ do repositório.
disable-model-invocation: true
---

# Instalar ou atualizar o Tabularium

Instalar e atualizar são a mesma operação: trazer a pasta `specs/` do repositório para a versão mais recente do formato. A versão é sempre a da linha principal do Tabularium; não há como escolher outra.

## 1. Copiar os arquivos

Na raiz do repositório, rode o script que está na pasta desta skill:

```bash
node <pasta desta skill>/instalar.mjs
```

Ele baixa da linha principal do Tabularium os arquivos genéricos do formato, que sobrescreve, e os modelos dos arquivos que o repositório ainda não tem. A cópia é sempre do script: escreva ou emende esses arquivos só por ele.

Feito quando a saída traz uma linha por arquivo, com o estado: `criado`, `atualizado`, `igual` ou `mantido`. Se o script falhar, nada foi escrito: mostre o erro ao usuário e pare.

## 2. Relatar

Mostre ao usuário a saída do script e, conforme o estado:

- `criado  specs/_produto.md`: é um modelo com textos de exemplo, a preencher antes de a especificação valer. Ofereça abrir o arquivo e conduzir o preenchimento com o usuário. Se ele aceitar, peça em texto corrido, sem exigir formato:
  1. o produto: nome e uma frase do que ele é;
  2. o problema que resolve, o problema em si e não a solução;
  3. o público que usa.

  Com isso preencha o título, a frase de abertura e o Propósito. Depois siga para os atores (os papéis que agem no produto e o acesso de cada um, indicando o padrão) e para as áreas. Áreas só entram quando houver células o bastante para agrupar: numa especificação que está nascendo, a tabela vazia é normal e a primeira área aparece junto com as primeiras células. Em seguida peça que o usuário apresente o que a aplicação vai organizar: os conceitos, as capacidades, as regras e o que mais for central ao produto. Ajude a separar o que vale para o produto inteiro, que vai para as seções do arquivo de produto (`Tipos comuns`, `Jornadas`, `Externos`, `Regras globais`, `Fora de escopo`), do que pertence a uma célula, que vai para a área dela. Se o usuário preferir contar o produto de uma vez, extraia o que cabe em cada seção e mostre para conferir antes de gravar.
- algum `atualizado`: o formato mudou. Leia `git diff -- specs/` e liste, para cada mudança nas instruções ou na legenda, os arquivos da especificação existente que ela afeta. Proponha os ajustes e espere o aceite antes de alterar a especificação.
- só `igual` e `mantido`: o repositório já estava na versão mais recente.
