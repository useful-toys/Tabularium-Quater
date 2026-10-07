# Tabularium

O Tabularium é um formato inovador para especificar produtos de software em Markdown.

Em vez de espalhar o mesmo assunto por glossário, regras de negócio e casos de uso, você escreve tudo sobre cada coisa do domínio num único bloco, a **célula**. Os documentos tradicionais deixam de ser escritos à mão: são derivados dela.

A gramática é simples o bastante para um programa verificar e para pessoas e agentes de IA manterem. Serve a equipes de desenvolvimento e sustentação, da análise à implementação, e qualquer um pode adotá-lo.

> **Estado: experimental.** Hoje existem a definição do formato, as instruções para agentes, as decisões do próprio formato e a skill de instalação. O verificador e as skills de geração ainda não existem: onde este README os menciona, descreve o que o formato pretende. Por ora, o alvo são produtos pequenos.

## A ideia

As metodologias tradicionais organizam a documentação por tipo de informação: um documento para o glossário, outro para as regras, outro para os casos de uso. Quem quer saber tudo sobre o Pedido percorre todos eles, e cada mudança precisa ser repetida em vários lugares.

O Tabularium organiza por coisa do domínio. Quem lê uma célula encontra ali tudo o que a especificação afirma sobre ela. Para a pessoa, cada assunto se aprende num lugar só. Para o agente de IA, basta ler a célula, o que poupa contexto.

Disso decorre o resto:

- **Cada afirmação tem uma única dona.** Quando algo numa célula afeta outra, o efeito é escrito na afetada.
- **As células se agrupam por relação, não por tipo.** As fortemente relacionadas ficam num mesmo arquivo, a **área**, e essa proximidade é medida.
- **As células evoluem.** Podem se dividir, se fundir ou mudar de área; os identificadores das afirmações sobrevivem.
- **Os documentos tradicionais são vistas.** Glossário, regras de negócio e casos de uso são derivados das células.

Para ver uma célula escrita, abra o [exemplo do Pedido](exemplos/pedido.md).

## Valores

Estes treze valores guiaram a criação do formato. Cada regra dele existe para servir a algum.

1. **Organizada por células de conceitos.** Um bloco por coisa do domínio; as áreas se formam por relação medida, nunca por tipo de informação.
2. **Densa.** Cada linha diz uma só coisa, e o significado vem da posição no texto.
3. **Hierárquica.** Títulos organizam os blocos e sub-itens detalham as linhas, na profundidade que o conteúdo pedir.
4. **Fonte única da verdade.** Só o que foi comprometido, com cada afirmação dizendo se está implementada.
5. **Sem redundância.** Cada termo e cada regra são escritos uma vez; o que se deriva mecanicamente é gerado por programa.
6. **Linguagem ubíqua.** Um termo, um significado, em todo o produto.
7. **Base para extrair outros documentos.** Visão, casos de uso, cenários de teste e manuais são redigidos por um agente de IA a partir da fonte.
8. **Verificável por programa.** A gramática é fixa, e a especificação é checada sem interpretar o texto.
9. **Rastreável.** Cada afirmação tem um identificador estável, que nunca é renumerado nem reaproveitado.
10. **Fundamentada em decisões.** Cada decisão relevante é registrada à parte, com as alternativas descartadas, e o item que ela fundamenta aponta para ela.
11. **Explícita sobre lacunas.** Dúvidas viram perguntas abertas, versionadas com o texto, em vez de suposições.
12. **Não técnica.** Descreve o que o sistema faz para o negócio; as questões técnicas começam na arquitetura.
13. **Acessível para humanos e eficiente para agentes de IA.** Markdown simples, legível sem renderização; o agente lê só a área de que precisa.

Os valores por extenso estão no [guia](GUIA.md#valores).

## E o RUP, o ágil, o BDD, o DDD?

O Tabularium trata só de como a especificação é guardada. Ele é compatível com as quatro abordagens, aproveita ideias de todas e não impõe um processo à equipe.

| Abordagem | O que o Tabularium aproveita | O que faz diferente |
| --- | --- | --- |
| RUP | Partir do problema; pré-condições e exceções em cada ação | Não há um documento por tipo de informação |
| Ágil | Quem faz e o que quer alcançar; critérios de aceite | Descreve o produto como ele é hoje, não a pilha de histórias |
| BDD | Exemplos para descobrir regras; dúvidas por escrito | Os cenários são derivados, não a forma da especificação |
| DDD | Linguagem ubíqua; eventos do domínio | Um vocabulário só para o produto inteiro |

A comparação completa está no [guia](GUIA.md#diferenciais-em-relação-a-rup-ágil-bdd-e-ddd).

## Instalar e atualizar

É preciso ter o Node.js, na versão 18 ou mais recente, e um agente de IA que rode skills.

Para instalar:

1. Na raiz do seu repositório, instale a skill de instalação:

   ```bash
   npx skills add useful-toys/Tabularium-Quater
   ```

2. No agente, digite `/tabularium-instalar`. A skill cria `specs/` e `specs/decisoes/`, copia para lá as instruções para agentes e a legenda do formato, e cria `specs/_produto.md` e `specs/_contadores.md` a partir de modelos.
3. Preencha `specs/_produto.md`, que nasce com textos de exemplo, e siga pelos [primeiros passos](#primeiros-passos).

Para atualizar:

1. No agente, digite `/tabularium-instalar` de novo. A skill sobrescreve as instruções para agentes e a legenda com a versão mais recente e mantém os arquivos que são seus.
2. Se o formato mudou, a skill lista o que a sua especificação precisa ajustar e espera o seu aceite antes de alterá-la.

A versão instalada é sempre a mais recente da linha principal deste repositório; não há como escolher outra.

## Primeiros passos

1. Escreva `_produto.md`: o problema, os atores e as primeiras áreas.
2. Para cada célula central, crie a área e escreva os blocos: definição, modelo, regras, capacidades e visões.
3. Marque cada afirmação com `[x]` ou `[ ]` e atualize `_contadores.md` a cada número alocado.
4. Registre as dúvidas em `_perguntas.md`, em vez de chutar. Ideias vão para o rastreador.
5. Confira cada mudança pela lista de `specs/AGENTS.md`.

## Limites

- **Ainda é hipótese.** Duas aplicações reais, Iconula e Abditum, serão especificadas no formato para pôr a ideia à prova.
- **Falta o verificador.** Até ele existir, unicidade, referências e coesão dependem de disciplina.
- **O trabalho em equipe não está resolvido.** O formato ainda não diz quem aprova uma mudança, nem sobre qual texto.
- **A marca `[x]` vale o cuidado de quem a mantém.** Nada prova, por ora, que ela continua verdadeira.
- **A densidade cobra de quem chega.** A resposta são os documentos derivados, que devem ser gerados, nunca editados.

Os limites por extenso estão no [guia](GUIA.md#limites-e-cuidados).

## Para saber mais

- [`exemplos/pedido.md`](exemplos/pedido.md): uma célula de exemplo, comentada.
- [`GUIA.md`](GUIA.md): o formato explicado em detalhe, com exemplos.
- [`specs/_convencoes.md`](specs/_convencoes.md): a legenda do formato.
- [`specs/`](specs/): a definição normativa, escrita no próprio formato. Em caso de divergência, vale o que está lá.
- [`specs/decisoes/`](specs/decisoes/): o porquê de cada escolha.
