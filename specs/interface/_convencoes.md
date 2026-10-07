# Convenções da interface
Legenda para ler e escrever a interface neste formato, que é experimental. Ela só acrescenta à legenda da especificação, `../_convencoes.md`: o que não está aqui vale como lá.

## Arquivos
- `AGENTS.md`: instruções para agentes de IA sobre a interface
- `_convencoes.md`: esta legenda
- `_interface.md`: o que vale para a interface inteira; lido antes das áreas
- `_contadores.md`: o maior número já usado em cada sequência de identificadores da interface, como na especificação
- `_perguntas.md`: dúvidas sobre a interface já comprometida; opcional; os códigos `Pnn` saem da sequência do produto, em `../_contadores.md`
- `decisoes/`: decisões que só a interface cita, uma por arquivo, na forma de `../decisoes/_convencoes.md`; os códigos `Dnn` saem da sequência do produto, em `../_contadores.md`
- `<area>.md`: uma área; lida em qualquer ordem
- `ideia.md` e `decisoes.md`: memória informal da discussão que deu origem a este formato; fora do formato; só no repositório do formato

## Formato experimental
- o que não se encaixa bem nos papéis, nas linhas de modelo, no vocabulário ou no teste do que entra não é escrito à força: é levado ao usuário, que decide se o formato evolui
- esta legenda só muda por decisão do usuário

## O que entra
- só o que impede dois lugares do produto de resolverem a mesma coisa de dois jeitos
- teste, parando no primeiro sim:
  - vale em mais de um lugar do produto? entra
  - o ator teria de reaprender algo se isso mudasse? entra
  - é compromisso com alguém de fora, como a identidade da marca ou a acessibilidade? entra
  - nenhum: é detalhe de uma tela e fica no código
- fronteira com a especificação: a afirmação continuaria verdadeira se o produto trocasse de meio? se sim, é da especificação, e aqui só se cita; se não, é da interface
- o que a especificação já afirma não se repete: cita-se
- não entram telas, a composição das telas nem wireframes
- valor de máquina, como código de cor ou nome de variável, fica no código

## Vocabulário
Palavras desta legenda, iguais em todos os projetos; não são termos do produto e não levam negrito.
- meio: onde a interface aparece, como terminal, desktop ou web; cada produto declara os seus
- tela: tudo o que o ator tem diante de si num momento; não é unidade e não tem bloco
- componente: conjunto de controles coordenados para um objetivo; é a unidade, com bloco e sigla
- tipo: a espécie de um componente; ou é uma palavra deste vocabulário, ou é definido pela aplicação num bloco próprio
- padrão: comportamento recorrente que vários componentes seguem; tem bloco e sigla, sem partes
- diretriz: afirmação que vale para a interface inteira
- controle: um item da tela, que o ator vê ou opera; parte de um componente, sem bloco
- campo: controle que recebe um valor do ator; apresenta um atributo
- rótulo: texto que nomeia um controle
- ação: controle que dispara algo, como botão, item de menu ou atalho
- indicador: controle que só mostra, como situação, progresso ou contagem
- listagem: controle que mostra vários itens do mesmo tipo, como lista, tabela ou árvore
- tipos de componente, iguais em todos os projetos:
  - região: parte fixa da tela, que se repete entre telas
  - grupo: reúne outros componentes sob um título
  - painel: reúne controles num bloco delimitado da tela
  - formulário: os campos de uma capacidade, com as ações de concluir e de desistir
  - consulta: uma listagem, com a busca, o filtro e a ordenação dela
  - detalhe: os dados de um só item, sem edição
  - seletor: opções à vista, das quais o ator escolhe uma
  - diálogo: interrompe o ator até ele responder
  - menu: ações reunidas para escolha
  - navegação: leva o ator de um lugar a outro
  - notificação: resposta do produto que não pede resposta do ator
- foco: o controle que recebe o teclado
- marcação: os itens de uma listagem escolhidos para a próxima ação
- atalho: tecla ou combinação que dispara uma ação
- situação: como um componente ou controle está, como disponível, indisponível ou inválido
- validação: conferência do valor de um campo, com a mensagem quando falha
- retorno: o que o produto mostra em resposta a uma ação
- estilo: convenção visual com nome, como uma cor, uma tipografia ou uma medida

## Estrutura
- bloco de componente, de tipo ou de padrão: título com nome e sigla (`` ## Diálogo de confirmação  `DCF` ``), frase de definição, lista única
- bloco de tipo: escrito como o de componente; é tipo porque outros blocos o citam em `tipo:`
- o componente herda as linhas do tipo da aplicação que ele cita, sem repeti-las
- ordem da lista: modelo (linhas sem identificador), R, Q, I
- área: um componente central e os componentes e padrões que dependem dele, num arquivo
- siglas de componentes, de padrões, de células e de componentes da arquitetura formam um só conjunto: nenhuma se repete
- componente que apresenta uma célula pode ter o nome dela; a sigla é sempre outra
- seções de `_interface.md`: `Áreas`, `Meios`, `Estilos`, `Diretrizes`, `Fora de escopo`, nesta ordem, omitidas as vazias; sigla das afirmações: `IFC`
- `Áreas`: tabela com as colunas `Área`, `Componente central` e `Arquivo`
- `Meios`: `- nome: descrição`
- `Estilos`: `- nome: tipo; papel`, com tipo `cor`, `tipografia` ou `medida`; sub-item `valor: …` quando o valor é compromisso e é o mesmo em todos os meios, ou um sub-item por meio, como `terminal: …`
- `Diretrizes`: afirmações R e Q de sigla `IFC`

## Papéis
- R  diretriz: sempre verdadeira sobre o componente ou o padrão, ou sobre a interface inteira em `Diretrizes`
- Q  qualidade: limite que se mede, com número e unidade
- I  interação: o que o ator faz com o componente; sub-itens são a resposta do produto

## Modelo
- `tipo: padrão`: num bloco de padrão; obrigatória
- `tipo: menu`: num bloco de componente, um tipo do vocabulário; opcional
- `tipo: **Vista interna**`: num bloco de componente, um tipo da aplicação, em negrito; opcional
- um componente tem no máximo um tipo; se nenhum serve, a linha é omitida
- `partes: …`: os controles do componente, na ordem em que aparecem
- `situações: a | b`: as situações em que o componente pode estar
- `usa CARD **Componente**`: composição; declarada só em quem contém
- `segue **Padrão**`: padrão a que o componente obedece
- `realiza: [ID], [ID]`: afirmações da especificação que o componente apresenta
- `local: caminho`: onde o componente mora no código; opcional; tem de existir

## Marcas
- `- [x] SIGLA-PN` ou `- [ ] SIGLA-PN`: afirmação R, Q ou I, cumprida por inteiro pelo produto ou não; linhas de modelo não levam marca
- `[PED-V1]` em qualquer item: referência a uma afirmação da especificação; a especificação nunca cita a interface
- `**Termo**`: componente, tipo da aplicação, padrão, estilo ou termo da especificação, na primeira menção de cada item
- sub-item iniciado pelo nome de um meio e `:`, em R, Q ou I: o que vale só naquele meio
- texto entre crases numa afirmação, como `` `Li e concordo` ``: o texto exato que o produto mostra; só quando a redação é compromisso, como um texto com peso legal ou o rótulo de uma ação; fica na afirmação do componente que o mostra, e não há seção de textos
- `ao contrário de [POP-I2]` no fim de uma afirmação ou de um sub-item de I: exceção a uma afirmação do padrão que o componente segue ou do tipo que ele cita; a exceção é escrita no componente, nunca no padrão nem no tipo
- `⟸ [Dnn]` no fim de um item: decisão que o fundamenta, em `decisoes/` desta pasta ou na da especificação
- `⟵ [Pnn]` no fim de um item: linha provisória, à espera de uma pergunta de `_perguntas.md` desta pasta
- identificadores, lápides, tabelas de decisão e negrito seguem a legenda da especificação
