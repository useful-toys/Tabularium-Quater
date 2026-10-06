# A ideia: arquitetura no formato denso

Este arquivo é informal e não faz parte do formato. Ele guarda a memória da conversa de 5 e 6 de outubro de 2026 entre Daniel e o Claude, em que a ideia surgiu. O que vale como arquitetura do Tabularium está em `_sistema.md` e nas áreas; o que vale como regra do formato experimental está em `_convencoes.md` e `AGENTS.md`.

## De onde veio

A especificação do Tabularium é não técnica por decisão (D74): descreve o que o produto é e faz, e manda os assuntos técnicos para "o documento de arquitetura". Esse documento nunca foi definido. `_produto.md` lista "Arquitetura e detalhes técnicos" como fora de escopo permanente, e várias decisões (D06, D29, D40, D46, D48) empurram coisas para a arquitetura sem dizer onde ela mora.

A lacuna apareceu quando criamos a skill de instalação. Três coisas ficaram sem casa:

- o mecanismo de instalação: skill, script, manifesto, download da linha principal;
- a decisão de não deixar manifesto nem configuração soltos na raiz do repositório;
- o fato de uma skill implementar uma afirmação da especificação, que a D75 não previa.

Nenhuma delas cabe na especificação, e sem um item que as cite elas também não podem virar decisões registradas.

## A ideia em uma frase

Escrever a arquitetura na mesma gramática da especificação, trocando só a unidade: em vez de célula de conceitos, componente.

Um componente é uma peça da solução (programa, script, skill, arquivo de dados, serviço). Ele tem um único bloco, com título e sigla, uma frase de definição e uma lista única, em que as linhas de modelo dizem em que ele é feito, onde mora, do que depende e o que cumpre da especificação, e as afirmações identificadas dizem o que vale sobre ele.

## O que é arquitetura, e o que não é

Este foi o ponto que o Daniel acrescentou, e ele muda o tamanho do documento. A arquitetura não é a descrição técnica de tudo. Ela é o conjunto das decisões técnicas que:

- são estratégicas, e não táticas: guiam a implementação, em vez de descrevê-la;
- são de alto nível: escolha de tecnologia, e não o código de uma tela;
- são difíceis de alterar ou de reverter depois de tomadas;
- valem por muito tempo.

A consequência é que a arquitetura envelhece devagar. O código muda todo dia, mas a escolha de baixar os arquivos por URL em vez de clonar o repositório só muda numa decisão deliberada.

Faltava uma regra para separar o estratégico do tático. A proposta do Claude, ainda por validar, é um teste em que se para no primeiro sim, como o que a especificação usa para reconhecer uma célula:

1. Quem usa o sistema de fora perceberia a troca?
2. Dados ou arquivos já guardados teriam de ser migrados?
3. Mais de um componente teria de mudar junto?
4. Quem implementa precisa saber disso antes de começar qualquer parte?

Com um sim, a escolha é estratégica e entra. Sem nenhum, é tática e fica no código. As quatro perguntas são formas de medir o custo de reverter: o primeiro sim diz quem mais paga por ele.

O primeiro rascunho do exemplo do instalador, feito antes dessa regra, tinha linhas que ela elimina: a variável de ambiente que troca a origem, o tratamento do fim de linha, o texto exato da saída. Todas mudam dentro do script sem que ninguém mais perceba.

## As escolhas centrais

**O componente é dono das suas afirmações.** Tudo o que a arquitetura afirma sobre uma peça está no bloco dela. Componentes se agrupam em áreas, um central e os que dependem dele, como as células.

**A ligação com a especificação é de mão única.** O componente declara `realiza: [ESP-C1]`, e qualquer item pode citar um identificador da especificação. A especificação nunca cita a arquitetura. É o mesmo padrão das decisões, e é o que mantém a especificação legível por quem decide o produto.

**Só se escreve o que nem a especificação nem o código dizem.** O que o produto faz é da especificação, e a arquitetura cita. O que o código já diz sem esforço (versão exata de dependência, lista de arquivos, assinatura de função) fica no código. Sobram a responsabilidade de cada peça, as fronteiras, as restrições e os contratos entre peças.

**Mora em `specs/arquitetura/` e é lida sob demanda.** Segue o precedente de `specs/decisoes/`: pasta própria dentro de `specs/`, com legenda e instruções para agentes próprias.

## Os papéis das linhas

A especificação tem seis papéis (R, Q, C, V, T, J). A arquitetura ficou com quatro:

- **R, restrição:** sempre verdadeira sobre o componente, ou sobre o sistema inteiro.
- **Q, qualidade:** limite técnico, com número e unidade.
- **I, interface:** o que o componente oferece a outros ou a quem usa o sistema, com o contrato em sub-itens. Ocupa o lugar que capacidade e visão têm na especificação.
- **F, fluxo:** sequência de interfaces que realiza uma capacidade. É o análogo da jornada e, como ela, só aparece no arquivo do conjunto.

As linhas de modelo têm palavras fixas: `tecnologia:`, `local:`, `realiza:` e `usa`.

## Como os valores do README se aplicam

| Valor | Na arquitetura |
| --- | --- |
| 1. Organizada por células | Organizada por componentes, agrupados em áreas por relação |
| 2. Densa | Igual: uma coisa por linha, e a única prosa é a definição do componente |
| 3. Hierárquica | Igual |
| 4. Fonte única da verdade | Igual, com a marca `[x]` ou `[ ]`: construído ou não. A fronteira é com o código, que é a fonte do que é tático |
| 5. Sem redundância | Igual, e mais estrita: não repete a especificação nem o código |
| 6. Linguagem ubíqua | A mesma linguagem do produto, acrescida dos nomes dos componentes; siglas num espaço só |
| 7. Base para outros documentos | Diagramas de contexto e de componentes sairiam por programa, das linhas `usa`; visões em prosa, por agente |
| 8. Verificável por programa | Além da gramática, âncoras: todo `local:` existe, toda referência resolve |
| 9. Rastreável | Igual: identificadores que nunca voltam, com contadores próprios |
| 10. Fundamentada em decisões | Igual, e mais importante aqui, porque quase toda afirmação é uma decisão que tinha alternativa |
| 11. Explícita sobre lacunas | Igual em princípio; onde ficam as perguntas da arquitetura ainda não foi definido |
| 12. Não técnica | Inverte: só técnica. Não repete o que o produto faz |
| 13. Acessível e eficiente | Igual: lê-se só a área de que se precisa |

## O que se espera ganhar

- As decisões técnicas passam a ter um item que as cite, e podem ser registradas.
- Para cada afirmação da especificação, dá para listar quem a realiza. Uma afirmação marcada como implementada sem nenhum realizador vira um alerta, o que responde em parte à pergunta "o que é `[x]` quando o produto é um formato".
- A skill deixa de ser um corpo estranho: é um tipo de componente, e a especificação não precisa conhecê-la.

## O experimento

Em vez de mudar a definição do formato, escrevemos à mão a arquitetura do próprio Tabularium, só com o que existe: a área de distribuição, com três componentes (o instalador, o manifesto de instalação e a skill de instalação), mais três externos e três restrições globais. O Verificador ficou de fora porque nenhuma escolha técnica sobre ele foi tomada.

O Daniel disse que ainda não sabe avaliar se o formato é bom, apesar de interessante. O experimento serve para isso. Perguntas que ajudam a avaliar:

- Um agente que vai mexer na instalação acerta mais lendo `distribuicao.md` do que lendo só o código?
- Depois de algumas mudanças no código, alguma afirmação ficou falsa sem ninguém notar?
- O teste do que entra dá a mesma resposta para duas pessoas diferentes?
- Alguma escolha importante não coube em nenhum dos quatro papéis?
- As linhas `realiza:` ajudam, ou só repetem o óbvio?

## O que o experimento já mostrou

- **O instalador não realiza nada.** Nenhum componente tem linha `realiza:`, porque a especificação ainda não tem a capacidade de instalar o formato. A proposta de escrevê-la (`ESP-C1`, com as regras de atualização e de versão) está pendente de três perguntas ao Daniel. O formato de arquitetura acusou uma lacuna da especificação, que é um dos ganhos esperados.
- **Há um contrato difícil de reverter que ninguém tinha notado.** O script viaja dentro da skill instalada, mas lê o manifesto da linha principal. Mudar a forma do manifesto quebra as skills já instaladas. Isso não virou afirmação porque nenhum compromisso de compatibilidade foi assumido.
- **Parte do que parecia arquitetura era produto.** "Atualizar é instalar de novo" e "a versão é sempre a mais recente" descrevem o que o produto faz, e por isso ficaram fora daqui, à espera da especificação.

## Pontos em aberto

- **É mudança de produto.** Adotar isto no formato exige rever o item "Arquitetura e detalhes técnicos · permanente" de `_produto.md`. A D74 continua valendo.
- **Onde ficam as decisões da arquitetura.** A marca `⟸ [Dnn]` está prevista, mas uma decisão citada só pela arquitetura seria órfã pelas regras de hoje, e a sequência `Dnn` é única para o produto. Por isso nenhuma afirmação da arquitetura cita decisão ainda.
- **Onde ficam as perguntas da arquitetura.** O arquivo de perguntas da especificação diz que as perguntas ficam só nele.
- **Os contadores.** A arquitetura tem um `_contadores.md` próprio, porque as letras I e F não são papéis válidos no da especificação. As siglas, porém, precisam ser únicas nos dois.
- **Os nomes.** "Componente", `realiza`, `usa`, e as letras I e F são sugestão do Claude.
- **O teste do que entra** ainda não foi posto à prova fora deste caso.
- **A instalação não distribui esta pasta.** O manifesto não a lista, de propósito, enquanto for experimento.
