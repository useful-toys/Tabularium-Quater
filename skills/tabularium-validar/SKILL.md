---
name: tabularium-validar
description: Valida a forma da especificação Tabularium na pasta specs/. Use depois de alterar qualquer arquivo de specs/, e quando pedirem para validar ou conferir a especificação.
---

# Validar a especificação

O validador é um script determinístico que checa a forma da especificação, sem interpretar o texto. Execute-o e leia a saída; não refaça as checagens dele por leitura.

Ele checa a hierarquia dos arquivos e dos blocos, a forma das linhas, os identificadores, as referências, os termos e a numeração. O histórico ele não vê: o que depende dele está em `specs/AGENTS.md`, em "Depois de alterar".

## 1. Rodar

Na raiz do repositório, rode o script que está na pasta desta skill:

```bash
node <pasta desta skill>/validar.mjs
```

Ele valida `specs/`; para outra pasta, passe o caminho como argumento. A pasta de arquitetura e as seções geradas não são lidas.

Feito quando a última linha da saída traz o total: `nenhuma violação`, ou o número de violações.

## 2. Corrigir

Cada violação sai numa linha, com o arquivo e a linha, a regra do formato e uma frase que diz o que cabia ali.

- Corrija na especificação o que a frase aponta e rode de novo, até a saída ser `nenhuma violação`.
- Se a correção muda o significado de uma afirmação, e não só a forma dela, pare e pergunte ao usuário.
- Se a linha acusada parece certa, deixe-a como está e mostre ao usuário a linha e a violação. O formato é experimental: pode ser a gramática que precisa crescer, e isso quem decide é ele.
