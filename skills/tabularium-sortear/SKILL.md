---
name: tabularium-sortear
description: Sorteia o código que serve de prefixo aos identificadores, decisões e perguntas de uma mudança sem issue, numa especificação Tabularium. Use antes de alocar um código em specs/ quando a mudança não vem de uma issue, ou quando o número da issue já serviu de prefixo.
---

# Sortear o prefixo de uma mudança

Todo código novo da especificação leva o prefixo da mudança que o aloca, como em `PED-R9.1` e `Dk7q2.1`. O prefixo é o número da issue que pede a mudança, ou um **código sorteado**. Quem sorteia é um script: não escolha o código você, nem peça ao usuário que escolha.

## 1. Decidir se é caso de sorteio

Use o número da issue, sem sortear, quando as duas coisas valem:

- o trabalho foi pedido para uma issue do rastreador, e você sabe o número dela;
- nenhum código com esse prefixo existe na linha principal do controle de versão.

Em qualquer outro caso, sorteie. Na dúvida sobre haver issue, sorteie sem perguntar.

Se a mudança já alocou algum código com prefixo sorteado e ele está à vista, reaproveite esse prefixo em vez de sortear outro.

Feito quando você sabe se o prefixo é o número da issue, um código já sorteado nesta mudança ou um a sortear.

## 2. Sortear

Na raiz do repositório, rode o script que está na pasta desta skill:

```bash
node <pasta desta skill>/sortear.mjs
```

Ele confere `specs/`; para outra pasta, passe o caminho como argumento. A saída é uma linha com o código, de 4 caracteres, que ainda não aparece na pasta.

Feito quando você tem o código impresso pelo script.

## 3. Usar

Escreva o código como prefixo de todos os códigos que a mudança aloca, seguido de `.` e do número de ordem, que começa em 1 em cada sequência: `PED-Rk7q2.1`, `PED-Rk7q2.2`, `PED-Ck7q2.1`, `Dk7q2.1`.
