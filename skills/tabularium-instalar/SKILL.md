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

- `criado  specs/_produto.md`: é um modelo com textos de exemplo, a preencher antes de a especificação valer.
- algum `atualizado`: o formato mudou. Leia `git diff -- specs/` e liste, para cada mudança nas instruções ou na legenda, os arquivos da especificação existente que ela afeta. Proponha os ajustes e espere o aceite antes de alterar a especificação.
- só `igual` e `mantido`: o repositório já estava na versão mais recente.
