---
name: tabularium-sortear
description: Gera o código sorteado que serve de prefixo de mudança aos códigos de uma especificação Tabularium. Use antes de alocar um código em specs/ quando a mudança não vem de uma issue, ou quando o número da issue já serviu de prefixo de mudança.
---

# Gerar o código sorteado

O **prefixo de mudança** é o mesmo em todo **código de identificador**, **código de pergunta** e **código de decisão** que uma mudança aloca: o `9` de `PED-R9.1`, o `k7q2` de `Dk7q2.1`. A forma deles está na regra 1 de `specs/AGENTS.md`.

## 1. Achar o prefixo de mudança

Pare no primeiro caso que vale:

1. A mudança já alocou um desses códigos, nesta conversa ou no que a ramificação acrescenta em `specs/` à linha principal: é o prefixo de mudança dele.
2. O trabalho foi pedido para uma issue do rastreador, de número conhecido, que não é prefixo de mudança de nenhum desses códigos na linha principal: é o número da issue.
3. Qualquer outro caso, incluída a dúvida sobre haver issue: é um **código sorteado**. Siga para o passo 2 sem perguntar.

Feito quando você sabe qual caso vale; nos casos 1 e 2, a skill termina aqui.

## 2. Gerar o código sorteado

Na raiz do repositório, rode o script que está na pasta desta skill:

```bash
node <pasta desta skill>/sortear.mjs
```

Ele confere `specs/`, ou a pasta passada como argumento, e imprime o código sorteado. Se falha, mostre o erro ao usuário e pare: o código sorteado só sai do script.

Feito quando você tem o código sorteado impresso.
