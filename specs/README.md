<!-- gerado; não editar -->
# Tabularium
Formato para especificar produtos de software em Markdown, em três camadas: coeso, denso, hierárquico, normativo e com linguagem ubíqua.

## [Elaboração](elaboracao.md)
Como uma Ideia amadurece numa Entrevista, ganha Sugestões, é registrada no Rastreador e chega à linha principal por uma Entrega.
- Ideia `IDE`: Mudança pretendida numa das três especificações, desde que é proposta até ser entregue ou rejeitada.
- Entrevista `ETV`: Conversa em rodadas em que uma Ideia amadurece com o Autor e em que só o consenso é gravado.
- Andamento `AND`: Estado do que a ramificação da ideia não guarda: o objetivo da Ideia, o que falta decidir e o que ficou de fora.
- Sugestão `SUG`: Ideia proposta pelo produto, e não pelo Autor, que complementa uma funcionalidade já discutida ou já escrita.
- Entrega `ETG`: Passagem para a linha principal do que a Entrevista gravou na ramificação da ideia, depois de conferido.
- Achado `ACH`: Problema de significado de uma das três especificações, que a forma dela não mostra, registrado para ser resolvido.

## [Modelagem](modelagem.md)
As Células do produto, seus Atributos e os Termos que os nomeiam.
- Célula `CEL`: Célula de conceitos: coisa do domínio, nomeada por um substantivo do negócio, com tudo o que a Especificação do produto afirma sobre ela e que não pertence a nenhuma outra.
- Atributo `ATR`: Característica de uma Célula como o negócio a vê, escrita como Linha de modelo.
- Tipo de valor `TIP`: Valor sem identidade usado por Atributos, como uma contagem ou um código.
- Termo `TRM`: Palavra ou expressão com significado definido uma única vez na Especificação do produto.
- Glossário `GLO`: Lista gerada de todos os Termos, cada um com o tipo de termo, a definição e o lugar de origem.

## [Organização](organizacao.md)
Como a Especificação do produto se divide em arquivos e Áreas, o que o Validador checa e o Indexador produz a partir dela, e como se guardam as Decisões e os Arquivos de dados.
- Especificação `ESP`: Conjunto de arquivos Markdown que descreve um produto numa camada e é a fonte única da verdade sobre ele nessa camada.
- Especificação do produto `EPD`: Especificação da primeira camada, que diz o que o produto é e o que ele faz para o negócio.
- Especificação de arquitetura `EAQ`: Especificação da segunda camada, que diz em que o produto é feito, onde cada peça fica e como ele é construído.
- Especificação de interface `EIF`: Especificação da terceira camada, que diz como o produto se apresenta e como a pessoa interage com ele.
- Instruções para agentes `AGT`: Arquivo que ensina agentes de IA a trabalhar no formato, igual em todos os projetos.
- Arquivo de convenções `CNV`: Legenda que ensina a ler e escrever no formato, igual em todos os projetos.
- Arquivo de produto `APR`: Arquivo com o que vale para o produto inteiro e não pertence a nenhuma Célula.
- Arquivo de contadores `CTD`: Arquivo extinto, que guardava o maior número já usado em cada sequência da Especificação do produto.
- Arquivo de dados `ADA`: Arquivo de texto com as instâncias que os Dados de referência de uma Célula citam, guardado à parte das Áreas e lido só sob demanda.
- Área `ARE`: Agrupamento de Células fortemente relacionadas entre si, guardado em um arquivo ou em uma pasta.
- Validador `VRF`: Programa que checa a forma da Especificação do produto, sem interpretar o texto.
- Indexador `GER`: Programa que produz as partes geradas da Especificação do produto, sem interpretar o texto.
- Fronteira da área `IND`: Seção gerada no topo de uma Área com o que ela usa de outras áreas e quem reage a ela.
- Mapa entre áreas `MAP`: Lista gerada de quais Áreas usam Termos e reagem a Eventos de quais outras.
- Documento derivado `DER`: Documento produzido a partir da Especificação do produto para um público ou uma finalidade, como um manual ou um plano de testes.
- Decisão `DEC`: Justificativa de um ponto não óbvio do produto, guardada à parte das Áreas e do Arquivo de produto e lida só sob demanda.

## [Redação](redacao.md)
As Linhas de um bloco: o que cada uma afirma, quem age, a que Eventos reage e como são identificadas, citadas e retiradas.
- Linha `LIN`: Item da lista única de um bloco; com Identificador, é citável.
- Identificador `IDT`: Código que torna uma Linha citável.
- Lápide `LAP`: Linha que ocupa o lugar de uma afirmação que foi retirada, para que as Referências antigas continuem resolvendo.
- Referência `REF`: Citação, em um lugar, de algo definido em outro.
- Pergunta `PER`: Lacuna conhecida da Especificação do produto, ainda sem resposta.
- Arquivo de perguntas `APG`: Arquivo com as Perguntas abertas da Especificação do produto, uma por item.
- Evento `EVT`: Fato do produto, no particípio, ao qual alguma Regra reage.
- Regra `REG`: Afirmação sempre verdadeira sobre uma Célula, independente de ação de um Ator; papel R.
- Tabela de decisão `TDD`: Regra escrita como tabela que dá um resultado para cada combinação de condições.
- Dados de referência `DRF`: Regra que enumera as instâncias de uma Célula que já vêm com o produto e só mudam por uma nova versão dele.
- Qualidade `QUA`: Como o produto se comporta, sem depender de uma ação específica; papel Q.
- Capacidade `CAP`: Algo que um Ator pode fazer e que altera estado; papel C.
- Visão `VIS`: Algo que um Ator pode ver, sem alterar nada; papel V.
- Critério `CRT`: Condição para considerar atendida uma Capacidade ou uma Visão, escrita como sub-item dela.
- Declaração `DCL`: O que um texto do produto afirma, sem implicar comportamento; papel T.
- Jornada `JOR`: Sequência de Capacidades e Visões cuja ordem é escolha de produto; papel J.
- Ator `ATO`: Quem age sobre o produto, definido pelo acesso que tem, e não pelo estado em que está.
