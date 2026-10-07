# Decisões sobre como representar a arquitetura

Este arquivo é informal e não faz parte do formato. Ele guarda a memória das decisões tomadas na conversa de 5 e 6 de outubro de 2026 entre Daniel e o Claude. Não segue o formato das decisões de `specs/decisoes/`, não tem código `Dnn` e não é citado por nenhum item.

Cada entrada diz quem decidiu. "Daniel" é decisão dele; "proposta do Claude, aceita" é algo que o Claude sugeriu e o Daniel aprovou em conjunto, ao dizer "concordo" e pedir que fosse escrito; "proposta do Claude" ainda não foi avaliada ponto a ponto.

## Sobre o formato

### 1. A arquitetura usa a mesma gramática da especificação

Proposta do Claude, aceita. Bloco com título e sigla, frase de definição, lista única, linhas de modelo e afirmações identificadas.

- Descartado: documento em prosa por seções, como arc42. Repete o problema que a especificação resolve: o mesmo assunto espalhado por tipo de informação.
- Descartado: só registros de decisão, um por arquivo. Guarda o porquê de cada escolha, mas não mostra como o sistema é hoje.
- Motivo: os valores do README valem para a arquitetura quase sem mudança, e uma gramática só evita duas legendas para aprender.

### 2. A unidade é o componente

Proposta do Claude, aceita. Componente é uma peça da solução com responsabilidade própria.

- Descartado: organizar por camada ou por visão (lógica, física, de implantação). É organização por tipo de informação.
- Descartado: a decisão como unidade. Ver a decisão 1.

### 3. Só entram decisões técnicas estratégicas

Daniel. A arquitetura são decisões técnicas de alto nível, de longo prazo, difíceis de alterar ou reverter, que guiam a implementação. Escolha de tecnologia entra; decisão sobre uma tela ou um trecho de código, não.

- Motivo, nas palavras dele: a arquitetura não deveria envelhecer rápido.
- Consequência: saiu do primeiro rascunho tudo o que muda dentro de um componente sem que outro perceba.

### 4. O teste que separa estratégico de tático

Proposta do Claude, por validar. O Daniel pediu uma regra; esta é a primeira tentativa. Quatro perguntas, parando no primeiro sim: quem usa de fora perceberia a troca; dados guardados teriam de ser migrados; mais de um componente teria de mudar junto; quem implementa precisa saber antes de começar.

- Motivo: "difícil de reverter" precisa de uma medida que duas pessoas apliquem do mesmo jeito. As perguntas medem quem mais paga pela troca.

### 5. A ligação com a especificação é de mão única

Proposta do Claude, aceita. A arquitetura cita a especificação, com `realiza:` ou com o identificador no texto. A especificação nunca cita a arquitetura.

- Motivo: é o padrão que as decisões já usam, e preserva o valor "não técnica" da especificação.

### 6. Não se repete nem a especificação nem o código

Proposta do Claude, aceita. O que o produto faz é da especificação. O que o código diz sem esforço fica no código.

- Motivo: é o valor "sem redundância", com duas fontes vizinhas em vez de uma.

### 7. Mora em `specs/arquitetura/`

Proposta do Claude, aceita. Pasta própria dentro de `specs/`, lida sob demanda, com `_convencoes.md` e `AGENTS.md` próprios.

- Descartado: pasta `arquitetura/` na raiz do repositório. O Daniel prefere não espalhar coisas pela raiz.
- Descartado: áreas técnicas misturadas às áreas da especificação. Quem decide o produto deixaria de conseguir ler a especificação, que é o argumento da D74.
- Motivo: `specs/decisoes/` já é uma pasta à parte dentro de `specs/`, com legenda e instruções próprias.

### 8. Quatro papéis: R, Q, I e F

Proposta do Claude. Restrição, qualidade, interface e fluxo. As linhas de modelo usam `tecnologia:`, `local:`, `realiza:` e `usa`.

- Motivo: R e Q têm o mesmo sentido da especificação. Capacidade e visão não fazem sentido para um componente, e interface ocupa o lugar delas. Fluxo é o análogo da jornada.

### 9. Contadores próprios, siglas num espaço só

Proposta do Claude. A arquitetura tem o seu `_contadores.md`. Uma sigla de componente não pode repetir uma sigla de célula.

- Motivo: I e F não são letras de papel válidas no contador da especificação. As siglas precisam ser únicas porque a arquitetura cita identificadores da especificação.

### 10. Primeiro o experimento, depois o formato

Daniel e Claude. A arquitetura do próprio Tabularium é escrita à mão, sem mexer na definição do formato em `specs/`. `ideia.md` e este arquivo são informais e não fazem parte do formato.

- Motivo, do Daniel: ele ainda não sabe avaliar se o formato é bom, apesar de interessante.

### 11. O arquivo de instruções se chama `AGENTS.md`

Escolha do Claude. O Daniel pediu "um agente.md". O Claude usou `AGENTS.md`, que é o nome dos outros dois arquivos de instruções do repositório e o que as ferramentas de agente carregam sozinhas. Fica registrado para o Daniel confirmar ou trocar.

### 12. `_sistema.md` e `_contadores.md` entraram sem pedido explícito

Escolha do Claude. O Daniel pediu a descrição, a legenda, as instruções e os dois arquivos informais. Os externos e as restrições que valem para o sistema inteiro não pertencem a nenhum componente e precisavam de um lugar, e as instruções mandam alocar números por um contador.

### 13. As decisões da arquitetura moram na própria pasta

Proposta do Claude, aceita em 7 de outubro de 2026, junto com a mesma escolha para a interface. As decisões que só a arquitetura cita ficam em `specs/arquitetura/decisoes/`, no formato das decisões da especificação e com os códigos `Dnn` da sequência do produto.

- Descartado: `specs/decisoes/arquitetura/`. Uma decisão que só a arquitetura cita é órfã pelas regras de hoje, e a limpeza a apagaria; evitar isso exigiria mudar a definição do formato.
- Aceita-se: o validador não lê essas decisões, e quem procura um `Dnn` olha em dois lugares.
- As escolhas listadas no fim deste arquivo ainda não foram convertidas: várias estão sem o porquê dito.

## Em aberto

- Onde ficam as perguntas abertas da arquitetura.
- Se o formato entra na definição do Tabularium, o que exige rever "Arquitetura e detalhes técnicos · permanente" em `_produto.md`.

## Decisões técnicas do Tabularium ainda sem registro formal

Estas são as escolhas que a arquitetura escrita em `_sistema.md` e `distribuicao.md` afirma. Ficam aqui, com o porquê que foi dito na conversa, até haver onde registrá-las.

- **A instalação é uma skill, distribuída com `npx skills`.** Daniel: para não reinventar a roda. Realizada em `SKI-I1`.
- **A skill só roda por comando de quem usa o agente, `/tabularium-instalar`.** Daniel, em 6 de outubro de 2026. O porquê não foi dito; o Claude tinha sugerido essa opção por a skill sobrescrever arquivos. Realizada em `SKI-I1`.
- **A skill executa um script, e a cópia é sempre do script.** Claude: os arquivos são iguais em todos os projetos e a cópia tem de ser exata; um agente que reescreve o texto pode alterá-lo. É o raciocínio da D01 aplicado à instalação. Realizada em `SKI-R2`.
- **O script baixa os arquivos direto da linha principal, por URL.** Daniel perguntou se era preciso clonar o repositório inteiro e tornou o repositório público para permitir o download direto. Descartados: embutir os arquivos na skill, que criava uma segunda cópia e envelhecia; e o clone raso, que exigia `git` e uma pasta temporária. Realizada em `INS-R1` e `ARQ-R1`.
- **A lista do que copiar fica num manifesto na linha principal.** Claude: um arquivo novo no formato entra na lista sem depender de atualizar a skill de quem já instalou. Realizada em `MAN-R1`.
- **Os arquivos genéricos distribuídos são os da própria `specs/`.** Claude: o formato se descreve em si mesmo, então não há cópia a manter em dia. Realizada em `ARQ-R2`, que em 6 de outubro de 2026 passou a falar só dos genéricos, porque os modelos não vêm de `specs/`.
- **Há também arquivos de modelo, guardados em `instalador/modelos/`.** Daniel propôs registrar; redação e porquê do Claude: `_produto.md` e `_contadores.md` deste repositório descrevem o próprio Tabularium e não servem a quem adota, então o que se distribui é um ponto de partida em branco. A pasta entra na arquitetura porque o script, que viaja dentro das skills já instaladas, busca os modelos nesse caminho: mudá-la quebra quem já instalou. Realizada em `ARQ-R4`.
- **Manifesto e configuração não ficam soltos na raiz; vão em `specs/`, e os de instalação, em `instalador/`.** Daniel. O porquê não foi dito. Realizada em `ARQ-R3`.
- **Não há escolha de versão; vale sempre a linha principal.** Daniel: por ora, nesta fase experimental. É decisão de produto, e a proposta de registrá-la na especificação está pendente.
