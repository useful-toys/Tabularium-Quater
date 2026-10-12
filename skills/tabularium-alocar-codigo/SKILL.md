---
name: tabularium-alocar-codigo
description: Dá cada código novo de uma especificação Tabularium, com o prefixo de mudança, sorteado quando a mudança não vem de uma issue, e o próximo número de ordem. Use antes de alocar qualquer código em specs/.
---

# Obter um código novo

Todo **código de identificador**, **código de pergunta** e **código de decisão** novo sai dos scripts desta skill, rodados na raiz do repositório. A forma dos códigos está na regra 1 de `specs/AGENTS.md`.

## 1. Achar o prefixo de mudança

A mudança usa um só **prefixo de mudança** em todos os códigos que aloca: o `9` de `PED-R9.1`, o `k7q2` de `Dk7q2.1`. Responda na ordem e pare no primeiro sim:

1. A mudança já criou algum código em `specs/`, nesta conversa ou em commits anteriores da branch de trabalho? Repita o prefixo dele.
2. O trabalho foi pedido para uma issue do rastreador, e você sabe o número dela? O prefixo é o número.
3. Em qualquer outro caso, e na dúvida sobre haver issue, o prefixo é um **código sorteado**. Sorteie sem perguntar:

   ```bash
   node <pasta desta skill>/sortear.mjs
   ```

## 2. Obter o código

Para cada código novo, passe o tipo e o prefixo:

```bash
node <pasta desta skill>/proximo.mjs PED-R 23
```

O tipo é `SIGLA-P` para identificador, como `PED-R`, `P` para pergunta e `D` para decisão. O script imprime o código inteiro, como `PED-R23.3`: o número de ordem é o seguinte ao maior que `specs/` já traz. Grave o código em `specs/` antes de pedir outro do mesmo tipo, porque o script só vê o que está gravado.

Os dois scripts conferem `specs/`, ou a pasta passada como último argumento. Se um deles falha, mostre o erro ao usuário e pare: o código sorteado e o número de ordem só saem dos scripts.
