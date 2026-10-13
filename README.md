# Tabularium

O **Tabularium** é um formato inovador para especificar produtos de software.

Em vez de espalhar o mesmo assunto vários documentos, **Tabularium** escreve uma especificação na qual tudo de um domínio reside num único bloco. Os documentos tradicionais deixam de ser escritos à mão, passam a ser extraídos da especificação no formato **Tabularium**.

A gramática da documentação é simples o bastante para um programa verificar e para pessoas e agentes de IA manterem. Serve a equipes de desenvolvimento e sustentação, da análise à implementação, e qualquer um pode adotá-lo.

> **Estado: experimental.** Hoje, o **Tabularium** apresenta uma especificação para documentar o produto e das decisões associadas. Ainda há arestas para tratar na especificação. A especificação de arquitetura e a de interface (UI/UX) já fazem parte do formato, com a uma gramática ainda em experimentação. Também tem skills para entrevistar requisitos, amadurecer idéias e documentar o compromisso, todas funcionando, mas ainda com ajustes pendentes.

## A ideia

As metodologias tradicionais organizam a documentação por tipo de informação. Por exemplo, no RUP temos um documento para a visão do produto, outro para os requisitos, outro para o glossário, outro para as regras, outro para os casos de uso, etc. Para entender uma funcionalidade, o leitor precisa percorrer todos os documentos, e cada mudança precisa ser replicada em vários lugares.

O **Tabularium** organiza a especificação por conceito do domínio, como o pedido ou o cliente. Cada conceito tem uma célula, e **a célula contém todas as afirmações que compõem o conceito**:

- as **regras**, que valem sempre;
- as **qualidades**, como um limite de tempo;
- as **capacidades**, o que alguém faz com ele;
- as **visões**, o que alguém vê dele;
- as **declarações**, o que um texto do produto afirma sobre ele.

A célula traz também o **modelo**, que diz do que o conceito é feito e a que ele se liga, e os **eventos**, os fatos que ele produz e aos quais outras células reagem.

Quem lê a célula encontra ali tudo o que a especificação afirma sobre o conceito. Para a pessoa, cada assunto se aprende num lugar só. Para o agente de IA, basta ler a célula, o que poupa contexto.

Na prática:

- **Cada afirmação é escrita uma vez só**, na célula a que pertence.
- **Células relacionadas ficam juntas** num mesmo arquivo, a área.
- **As células mudam com o produto**: podem se dividir, se fundir ou mudar de área sem quebrar as referências.
- **Glossário, regras de negócio e casos de uso** são extraídos das células, e não escritos à mão.

Para ver uma célula escrita, abra o [exemplo do Pedido](exemplos/pedido.md).

## Valores

Estes catorze valores guiaram a criação do formato.

1. **Coesa.** Informações relacionadas ficam próximas: um bloco por conceito do domínio, nunca por tipo de informação.
2. **Densa.** Redação concisa, que diz com poucas palavras; o significado vem da posição no texto e de símbolos e marcas de sentido fixo.
3. **Hierárquica.** Títulos organizam os blocos e sub-itens detalham as linhas, na profundidade que o conteúdo pedir.
4. **Normativa.** A especificação é a fonte da verdade, e não o código. Informa o que foi comprometido ou implementado.
5. **Sem redundância.** Cada termo e cada regra são escritos uma vez; o que se deriva mecanicamente é gerado por programa.
6. **Linguagem ubíqua.** Um termo, um significado, em todo o produto.
7. **Derivável.** A especificação basta para um agente de IA redigir visão, casos de uso, cenários de teste e manuais, sem acrescentar fatos.
8. **Verificável.** A forma é validada por programa, e uma violação torna a especificação inválida. O significado é revisado por um agente de IA, que registra achados com criticidade; o de criticidade alta segura a entrega.
9. **Rastreável.** Cada afirmação tem um identificador estável, que nunca é renumerado nem reaproveitado.
10. **Fundamentada.** O porquê de cada escolha relevante pode ser recuperado, com as alternativas descartadas; as decisões ficam à parte, e o item aponta para elas.
11. **Explícita sobre lacunas.** O que ainda não foi decidido aparece como não decidido: dúvidas viram perguntas abertas, versionadas com o texto, e nunca suposições.
12. **Em camadas.** São três especificações, uma por camada. A de produto diz o que ele faz para o negócio, sem nada técnico; a de arquitetura, em que ele é feito, onde fica e como é construído; a de interface, como ele se apresenta e como se interage com ele.
13. **Acessível.** Pessoas e agentes de IA chegam ao que precisam com pouco esforço: formato simples, legível sem renderização.
14. **Atômica.** Cada afirmação diz uma só coisa, e pode ser marcada, verificada, citada e movida sozinha.

O [guia](GUIA.md#valores) mostra o que cada valor produziu no formato.

## E o RUP, o ágil, o BDD, o DDD?

O **Tabularium** trata só de como a especificação é guardada. Ele é compatível com as quatro abordagens, aproveita ideias de todas e não impõe um processo à equipe.

| Abordagem | O que o **Tabularium** aproveita | O que faz diferente |
| --- | --- | --- |
| RUP | Partir do problema; pré-condições e exceções em cada ação | Não há um documento por tipo de informação |
| Ágil | Quem faz e o que quer alcançar; critérios de aceite | Descreve o produto como ele é hoje, não a pilha de histórias |
| BDD | Exemplos para descobrir regras; dúvidas por escrito | Os cenários são derivados, não a forma da especificação |
| DDD | Linguagem ubíqua; eventos do domínio | Um vocabulário só para o produto inteiro |

A comparação completa está no [guia](GUIA.md#diferenciais-em-relação-a-rup-ágil-bdd-e-ddd).

## Instalar e atualizar

É preciso ter o Node.js, na versão 18 ou mais recente, e um agente de IA que rode skills.

1. Na raiz do seu repositório, instale as skills do **Tabularium**:

   ```bash
   npx skills add useful-toys/Tabularium-Quater
   ```

2. No agente, digite `/tabularium-instalar`. A skill cria a pasta `specs/`, com a legenda, as instruções para agentes e os modelos dos arquivos que são seus.

Para atualizar, digite `/tabularium-instalar` de novo. A skill traz a versão mais recente do formato, mantém os seus arquivos e pede o seu aceite antes de ajustar a sua especificação.

## Primeiros passos

O caminho recomendado é a entrevista: você conversa com o agente, e ele escreve. Editar à mão não é proibido, mas a entrevista confronta cada ideia com o que já está escrito, e o [guia](GUIA.md#a-entrevista) explica como.

1. Digite `/tabularium-entrevistar` e conte a ideia: o produto, na primeira vez, ou uma mudança nele, depois.
2. Responda às perguntas do agente, rodada a rodada. Ele grava em `specs/` o que chega ao consenso, na ramificação da ideia.
3. Digite `/tabularium-aplicar` para conferir a ramificação e entregá-la na linha principal.

O agente valida a especificação, aloca os códigos e refaz os índices por conta própria. Duas skills opcionais completam o ciclo: `/tabularium-sugerir` propõe ideias que complementam a discutida, e `/tabularium-registrar` cria no GitHub a issue de uma ideia que fica para depois.

## Arquitetura, em experimento

A arquitetura diz em que o produto é feito, onde cada peça fica e como ele é construído. Fica em [`specs/arquitetura/`](specs/arquitetura/), num formato experimental que usa a mesma gramática da especificação.

Para ver um exemplo real, abra a [arquitetura do próprio **Tabularium**](specs/arquitetura/distribuicao.md).

## Interface, em experimento

A interface diz como o produto se apresenta e como se interage com ele. Fica em [`specs/interface/`](specs/interface/), num formato experimental que usa a mesma gramática da especificação.

Para ver um trecho escrito, abra o [exemplo da interface do Pedido](exemplos/interface-pedido.md).

## Limites

- **Ainda é hipótese.** Estamos usando o formato para especificar aplicações reais e pôr a ideia à prova.
- **Parte do que os valores prometem ainda não existe.** Faltam a redação dos documentos derivados e a verificação de significado por agente; a arquitetura e a interface são experimentais.
- **O validador não vê tudo.** Ele checa a forma, a unicidade e as referências, mas não o histórico dos números nem a coesão das áreas, que continuam dependendo de disciplina.
- **O processo de mudança não está definido.** O formato diz quem aceita uma mudança, o responsável de área, mas não como ela é proposta, revisada e aceita.
- **A marca `[x]` vale o cuidado de quem a mantém.** Nada prova, por ora, que ela continua verdadeira.
- **A densidade cobra de quem chega.** A resposta serão os documentos derivados, redigidos de novo e nunca editados.

Os limites por extenso estão no [guia](GUIA.md#limites-e-cuidados).

## Para saber mais

- [`GUIA.md`](GUIA.md): o formato explicado em detalhe, com exemplos.
- [`specs/`](specs/): a definição normativa, escrita no próprio formato. Em caso de divergência, vale o que está lá.
- [`specs/_produto.md`](specs/_produto.md): o que vale para o **Tabularium** inteiro, como o propósito, os atores e o que está fora de escopo.

As legendas, uma por formato:

- [`specs/_convencoes.md`](specs/_convencoes.md): a da especificação.
- [`specs/decisoes/_convencoes.md`](specs/decisoes/_convencoes.md): a das decisões.
- [`specs/arquitetura/_convencoes.md`](specs/arquitetura/_convencoes.md): a da arquitetura, experimental.
- [`specs/interface/_convencoes.md`](specs/interface/_convencoes.md): a da interface, experimental.

Como os dois formatos experimentais nasceram:

- [`specs/arquitetura/ideia.md`](specs/arquitetura/ideia.md): a ideia do formato de arquitetura.
- [`specs/interface/ideia.md`](specs/interface/ideia.md): a ideia do formato de interface.

O porquê de cada escolha, nos índices de decisões:

- Da especificação: [produto](specs/decisoes/_produto/README.md), [modelagem](specs/decisoes/modelagem/README.md), [organização](specs/decisoes/organizacao/README.md) e [redação](specs/decisoes/redacao/README.md).
- Da arquitetura: [sistema](specs/arquitetura/decisoes/_sistema/README.md), [distribuição](specs/arquitetura/decisoes/distribuicao/README.md), [indexação](specs/arquitetura/decisoes/indexacao/README.md) e [validação](specs/arquitetura/decisoes/validacao/README.md).
