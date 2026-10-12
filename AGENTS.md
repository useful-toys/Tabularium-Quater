# AGENTS.md

Este repositório define o formato Tabularium. Este arquivo vale para quem trabalha no formato; as instruções para quem escreve uma especificação estão em `specs/AGENTS.md`.

## Ao elaborar o formato

- Toda elaboração do formato da especificação leva em conta os valores abaixo.
- Antes de propor ou alterar uma regra, uma notação ou uma forma de linha, pese cada alternativa contra os valores e diga a quais ela serve e quais contraria.
- Se uma proposta contraria um valor, aponte o conflito em vez de escolher em silêncio.

## Fluxo de git

- A branch principal é `main`.
- Não se usa pull request.
- Cada issue é trabalhada numa branch dedicada, vinculada à issue com `gh issue develop <número>` ou chamada similar.
- A issue é considerada entregue quando a branch é mesclada na `main`.
- Depois do push da `main`, a issue é fechada à mão, com `gh issue close <número>`.
- Todo commit menciona o número da issue na mensagem, na forma `(#7)`, conforme a skill `git-commit-message`.
- Commit e push só são feitos a pedido.

## Valores

Os valores são os de `GUIA.md`, seção `Valores`, copiados por extenso. Ao mudar um valor, mude nos dois arquivos e no resumo de `README.md`.

1. **Organizada por células de conceitos.** Cada célula reúne, num único bloco, os conceitos que um elemento do produto governa: suas definições, regras e políticas. As células se agrupam em áreas por relação forte, medida, e nunca por tipo de informação.
2. **Densa.** Evita-se ao máximo a formatação e a separação em seções: o significado vem da posição no texto e das marcas, as do Markdown e as próprias do formato, cada uma com um sentido fixo e nunca usada como ênfase ou enfeite. A redação é objetiva e sucinta, pode usar símbolos e notações convencionadas, e não diz o que não precisa ser dito. Cada linha diz uma só coisa, e a única prosa é uma frase logo abaixo de um título, a que define cada célula e a que abre cada arquivo; explicações e exemplos ficam nos documentos derivados.
3. **Hierárquica.** A estrutura vem de títulos, que organizam os blocos, e de sub-itens, que detalham as linhas. A profundidade de ambos é livre: usa-se a que o conteúdo pedir.
4. **Fonte única da verdade.** Descreve só o que foi comprometido, e cada afirmação diz se está implementada ou não. Ideias, histórico e justificativas ficam fora.
5. **Sem redundância.** Cada termo e cada regra são escritos uma vez. Índices, mapas, glossários e tudo o mais que se deriva mecanicamente são gerados por programa, de forma determinística, e nunca mantidos manualmente, nem por pessoas nem por agentes de IA.
6. **Linguagem ubíqua.** Um termo, um significado, em todo o produto. Sinônimos proibidos são declarados e verificáveis.
7. **Base para extrair outros documentos.** Visão, casos de uso, regras de negócio, cenários de teste e manuais são derivados: redigidos por um agente de IA a partir da fonte, por um prompt especializado, e com a origem de cada frase.
8. **Verificável por programa.** A gramática é fixa para que um programa cheque a especificação sem interpretar o texto.
9. **Rastreável.** Cada afirmação tem um identificador estável, que nunca é renumerado nem reaproveitado.
10. **Fundamentada em decisões.** As decisões relevantes por trás das afirmações ficam em anotações densas à parte, lidas só sob demanda. O item fundamentado leva apenas uma marca curta que aponta para a decisão.
11. **Explícita sobre lacunas.** Dúvidas sobre o que foi comprometido viram perguntas abertas, versionadas junto do texto, em vez de serem preenchidas por suposição.
12. **Não técnica.** Descreve o que o sistema é e o que ele faz para o negócio, sem entrar em questões técnicas, que começam no documento de arquitetura. Uma afirmação diz o que o produto faz, nunca como ele é construído (LIN-R10). Também não documenta o negócio em si, isto é, como ele funciona sem o sistema.
13. **Acessível para humanos e eficiente para agentes de IA.** Markdown simples, legível sem renderização por quem conhece a legenda; agentes leem só a área de que precisam e seguem regras explícitas.
