# A ideia: interface no formato denso

Este arquivo é informal e não faz parte do formato. Ele guarda a memória da conversa de 7 de outubro de 2026 entre Daniel e o Claude, em que a ideia surgiu. O que vale como regra do formato experimental está em `_convencoes.md` e `AGENTS.md`. Este repositório não guarda nenhuma interface escrita no formato: o experimento é feito na especificação do Iconula, que fica no repositório dele.

## De onde veio

O Daniel sentiu falta de um lugar para as diretrizes de interface e de experiência de uso, e para descrever componentes. A especificação exclui o assunto por decisão: `_produto.md` lista "Detalhe de interface: formato, máscara, leiaute" como fora de escopo permanente, e as instruções mandam não inventar passos de interface. A arquitetura trata só de escolha técnica. A interface ficou sem casa.

Ele já trazia duas restrições:

- não descrever telas nem páginas, porque elas têm componentes em comum, e é o componente que vale a pena descrever;
- não pressupor web: a interface pode ser de desktop ou de terminal.

## A ideia em uma frase

Escrever a interface na mesma gramática da especificação, trocando só a unidade: em vez de célula de conceitos, componente de interface.

Um componente é um conjunto de controles coordenados para um objetivo. Ele tem um único bloco, com título e sigla, uma frase de definição e uma lista única, em que as linhas de modelo dizem de que tipo ele é, de que partes é feito, o que contém, que padrão segue e o que apresenta da especificação, e as afirmações identificadas dizem o que vale sobre ele.

## As escolhas centrais

**Componente e controle são coisas diferentes.** O controle é um item da tela, como um campo ou um botão. O componente é o conjunto. A distinção foi do Daniel, ao recusar "controle" como nome da unidade, e ela resolve onde parar de decompor: o controle não ganha bloco.

**Três coisas se documentam.** O componente, que tem partes. O padrão, que é uma solução recorrente sem partes próprias, seguida por vários componentes. E a diretriz, que é uma afirmação solta, válida para a interface inteira.

**O tipo permite reuso.** Um componente pode dizer de que tipo é. O tipo é uma palavra da legenda, como menu ou painel, ou é definido pela aplicação num bloco próprio; neste caso, os componentes do tipo herdam as afirmações dele.

**Estilo tem nome.** Cor, tipografia e medida entram com nome e papel, e são citados em negrito como um termo. O valor só entra quando é compromisso. O valor de máquina fica no código.

**Dois testes separam o que entra.** O teste do que entra separa a interface do código: vale em mais de um lugar, o ator teria de reaprender, ou é compromisso com alguém de fora. O teste da troca de meio separa a interface da especificação: o que continuaria verdadeiro num terminal é do produto.

**O vocabulário é fixo.** A legenda traz as palavras recorrentes (campo, ação, listagem, formulário, diálogo, foco, situação), iguais em todos os projetos e sem negrito, como "célula" e "afirmação" numa especificação de produto.

**A ligação com a especificação é de mão única**, como na arquitetura e nas decisões.

**A pasta é autocontida.** As decisões e as perguntas da interface moram dentro dela, com os códigos da sequência do produto.

## O que ficou de fora de propósito

Telas, a composição das telas e wireframes não entram. É decisão do Daniel: manter o experimento simples, amadurecer e acrescentar sob necessidade. Se a falta de algum deles doer, o agente leva o caso ao usuário, como manda `Quando o formato não serve`.

## O experimento

A interface do Iconula tem uma descrição completa em prosa, organizada por tela, com wireframes, medidas em pixels, tokens de cor e dezenas de registros de decisão. O Daniel espera muitos conflitos entre ela e o formato, e é esse o teste. A conversão começa por um recorte: cabeçalho, menu de ações, avisos e identidade visual. O que não couber fica de fora e vira uma lista de achados, com a qual ele decide se o formato evolui.

Perguntas que ajudam a avaliar:

- Um agente que vai mexer numa tela reutiliza mais lendo a área do que lendo só o código?
- O teste da troca de meio dá a mesma resposta para duas pessoas?
- Alguma coisa importante não coube em componente, padrão, diretriz nem estilo?
- A falta de telas e de wireframes dói?
- O vocabulário fixo colide com o domínio de outro produto?

## Pontos em aberto

- **É mudança de produto.** Adotar isto no formato exige rever o item "Detalhe de interface" de `_produto.md`.
- **O nome "componente" tem dois sentidos.** Na arquitetura é a peça da solução; aqui, o conjunto de controles. Cada pasta define o seu na própria legenda, e onde uma cita a outra, qualifica. Se o uso mostrar confusão, a saída prevista é renomear a unidade da arquitetura.
- **Células que são interface.** A especificação do Iconula tem células como Menu de ações e Faixa de bandeiras. O experimento cria o componente com o mesmo nome e outra sigla, sem mexer na célula, e registra cada caso como candidato a migrar.
- **As decisões ficam sem checagem.** O validador não lê a pasta. Se o formato for adotado, elas migram para `specs/decisoes/`, o que exige mudar as regras de órfã e de pasta.
- **Os nomes.** Os papéis R, Q e I, as linhas de modelo e a sigla `IFC` são sugestão do Claude.
- **A instalação não distribui esta pasta.** O manifesto não a lista, de propósito, enquanto for experimento.
