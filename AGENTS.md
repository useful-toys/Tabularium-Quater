# AGENTS.md

Este repositório define o formato **Tabularium**. Este arquivo vale para quem trabalha no formato; as instruções para quem escreve uma especificação estão em `specs/AGENTS.md`.

## Ao elaborar o formato

- Toda elaboração do formato da especificação leva em conta os valores abaixo.
- Antes de propor ou alterar uma regra, uma notação ou uma forma de linha, faça à proposta a pergunta de cada valor, e diga a quais ela serve e quais contraria.
- Se uma proposta contraria um valor, aponte o conflito em vez de escolher em silêncio.
- Dois valores podem puxar em sentidos opostos, como **Densa** e **Atômica**. Nesse caso, diga o que cada alternativa ganha e perde em cada um, e recomende uma.

## Fluxo de git

- A branch principal é `main`.
- Não se usa pull request.
- Cada issue é trabalhada numa branch dedicada, vinculada à issue com `gh issue develop <número>` ou chamada similar.
- A issue é considerada entregue quando a branch é mesclada na `main`.
- Depois do push da `main`, a issue é fechada à mão, com `gh issue close <número>`.
- Todo commit menciona o número da issue na mensagem, na forma `(#7)`, conforme a skill `git-commit-message`.
- Commit e push só são feitos a pedido.

## Valores

Cada valor traz a pergunta que ele faz a uma proposta. O que cada um quer, e o que já produziu no formato, está em `GUIA.md`, seção `Valores`: leia-a antes de propor uma mudança no formato.

1. **Coesa.** O que a proposta acrescenta fica ao lado do que mais se relaciona com ele? Agrupe por relação, e desconfie de todo agrupamento por tipo de informação.
2. **Densa.** Dá para dizer o mesmo com menos texto, pela posição da linha ou por uma marca que já existe? Uma marca nova precisa de um sentido fixo e de uma linha na legenda.
3. **Hierárquica.** A estrutura nova se escreve só com títulos e sub-itens?
4. **Normativa.** A especificação continua trazendo só o que foi comprometido, com cada afirmação dizendo se o produto já a cumpre?
5. **Sem redundância.** O que a proposta manda escrever já está escrito em outro lugar, ou pode ser derivado dele? Se pode, a proposta é gerar por programa.
6. **Linguagem ubíqua.** O nome novo dá um segundo sentido a um termo que já existe, ou um segundo nome a algo que já tem termo? Procure o nome no repositório antes de propô-lo.
7. **Derivável.** Com o que a proposta deixa escrito, um agente redige a visão, os casos de uso, os cenários de teste e os manuais sem acrescentar fatos?
8. **Verificável.** Um programa confere a forma nova sem interpretar o texto? Diga o que o validador confere, e bloqueia, e o que fica para a revisão de significado por agente, que registra achados com criticidade.
9. **Rastreável.** Todo item novo que pode ser citado ganha um código estável? Nenhum código já alocado muda nem volta a ser usado.
10. **Fundamentada.** Quem ler a regra nova consegue recuperar por que ela é assim e o que foi descartado?
11. **Explícita sobre lacunas.** O que a proposta deixa sem decidir aparece como pergunta aberta? Pergunte ao usuário o que você estaria supondo.
12. **Em camadas.** Cada coisa nova está na especificação do seu assunto: o que o produto faz na do produto, em que é feito, onde fica e como é construído na de arquitetura, como se apresenta e como se interage com ele na de interface? Uma camada só cita as anteriores.
13. **Acessível.** Uma pessoa lê a forma nova num editor de texto, só com a legenda? Um agente resolve a tarefa lendo só a área que ela toca?
14. **Atômica.** Cada linha da forma nova diz uma só coisa, que pode ser marcada, citada e movida sozinha?

### Ao mudar um valor

- Um valor diz o que se quer da especificação; a regra, a notação ou a forma de linha que o atende é solução, e vai nos sub-itens do guia.
- Um valor novo precisa pesar contra algum dos existentes. Se nunca pesa, ele é consequência de outro, e não entra.
- Um valor novo entra no fim da lista: os números são citados fora daqui e nunca mudam.
- Mude o valor em `GUIA.md`, a pergunta dele aqui e o resumo em `README.md`, na mesma mudança.
