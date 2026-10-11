---
name: tabularium-indexar
description: Regenera os índices README.md das pastas de uma especificação Tabularium, com as áreas de cada pasta e as decisões de cada pasta de decisões.
disable-model-invocation: true
---

# Indexar as pastas da especificação

O indexador é um script determinístico que grava um `README.md` em cada pasta da especificação: o índice de áreas em `specs/`, `specs/arquitetura/` e `specs/interface/`, e o índice de decisões em cada subpasta de `decisoes/`. Execute-o e leia a saída; não escreva nem corrija um índice à mão.

Ele não roda as checagens do validador: indexa o que consegue ler, mesmo numa especificação com violações.

## 1. Rodar

Na raiz do repositório, rode o script que está na pasta desta skill:

```bash
node <pasta desta skill>/indexar.mjs
```

Ele indexa `specs/`; para outra pasta, passe o caminho como argumento. O script lê a especificação com a leitura da skill `tabularium-validar`, que precisa estar instalada ao lado desta: se ela faltar, ele para e avisa.

Feito quando a última linha da saída é `nenhum índice mudou`, ou traz o total de índices gravados, apagados e de arquivos sem indexar.

## 2. Tratar o que ficou sem indexar

Cada linha `sem indexar` traz o arquivo e o motivo. O mesmo arquivo aparece no fim do índice da pasta dele, numa linha `não indexado:`.

- Título, frase ou data fora da forma: corrija na especificação o que o motivo aponta e rode de novo. A skill `tabularium-validar` acusa as mesmas linhas, com a regra do formato.
- `README.md` que não começa com `<!-- gerado; não editar -->`: foi escrito por alguém, e o script não o sobrescreve. Mostre o arquivo ao usuário, que decide se ele sai dali.
- Se a correção muda o significado de uma afirmação, e não só a forma dela, pare e pergunte ao usuário.

Feito quando a saída não traz nenhuma linha `sem indexar`, ou quando o usuário decidiu sobre as que restam.

## 3. Relatar

Diga ao usuário quais índices foram gravados e apagados. Eles entram no controle de versão junto com a mudança que os alterou.
