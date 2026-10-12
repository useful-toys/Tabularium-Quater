# Convenções da arquitetura
Legenda para ler e escrever a especificação de arquitetura neste formato, que é experimental. Ela só acrescenta à legenda da especificação do produto, `../_convencoes.md`: o que não está aqui vale como lá.

## Arquivos
- `AGENTS.md`: instruções para agentes de IA sobre a arquitetura
- `_convencoes.md`: esta legenda
- `_sistema.md`: o que vale para o sistema inteiro; lido antes das áreas
- `decisoes/`: decisões da arquitetura, uma por arquivo, em subpastas por área e em `_sistema/` para o que não é de área, na forma de `../decisoes/_convencoes.md`; os códigos `Dnn` levam o prefixo de mudança, como na especificação
- `_achados.md`: o que o formato não serviu a escrever, por tipo de problema, com o estado; opcional; fora do formato, e o validador não o lê
- `<area>.md`: uma área; lida em qualquer ordem; é área todo arquivo `.md` desta pasta que não é um dos outros desta lista
- `README.md`: índice de áreas, com a frase de cada uma e os componentes dela; gerado por programa e nunca editado
- `ideia.md` e `decisoes.md`: memória informal da discussão que deu origem a este formato; fora do formato; só no repositório do formato

## Formato experimental
- o formato é uma proposta, nascida de situações vividas e ainda não fechada; serve aos valores da especificação do produto (`README.md` da raiz), com componente no lugar de célula e sem o valor `Não técnica`
- o que não se encaixa bem nos papéis, nas linhas de modelo ou no teste do que entra não é escrito à força: é levado ao usuário, que decide se o formato evolui
- o que cabe só ferindo um valor, como repetir, juntar duas coisas numa linha ou não poder ser verificado, também é levado ao usuário
- o aviso traz o problema, um exemplo concreto e uma proposta, e vale uma vez por tipo de problema
- o usuário decide: forçar o encaixe, ou anotá-lo em `_achados.md`, com ou sem issue no repositório do Tabularium
- esta legenda só muda por decisão do usuário, no repositório do Tabularium

## O que entra
- só a escolha técnica estratégica: a que guia a implementação e é cara de trocar depois
- teste, parando no primeiro sim:
  - quem usa o sistema de fora perceberia a troca? entra
  - dados ou arquivos já guardados teriam de ser migrados? entra
  - mais de um componente teria de mudar junto? entra
  - quem implementa precisa saber disso antes de começar qualquer parte? entra
  - nenhum: é escolha tática e fica no código
- o que a especificação já afirma não se repete: cita-se
- o que o código já diz sem esforço não se escreve: versões exatas, listas de arquivos, assinaturas

## Estrutura
- componente: peça da solução, como programa, script, skill, arquivo de dados ou serviço, com tudo o que a arquitetura afirma sobre ela e que não pertence a nenhuma outra
- bloco de componente: título com nome e sigla (`` ## Instalador  `INS` ``), frase de definição, lista única
- ordem da lista: modelo (linhas sem identificador), R, Q, I
- área: um componente central e os que dependem dele, num arquivo; abaixo do título vêm a frase que diz o que ela reúne e a linha `- componente central: **Componente**`
- siglas de componentes e de células formam um só conjunto: nenhuma se repete
- seções de `_sistema.md`: `Externos`, `Restrições globais`, `Fluxos`, `Fora de escopo`, nesta ordem, omitidas as vazias; sigla das afirmações: `ARQ`

## Papéis
- R  restrição: sempre verdadeira sobre o componente, ou sobre o sistema inteiro em `Restrições globais`
- Q  qualidade: limite técnico, com número e unidade
- I  interface: o que o componente oferece a outros componentes ou a quem usa o sistema; sub-itens são o contrato
- F  fluxo: sequência de I que realiza uma capacidade da especificação; só em `_sistema.md`

## Modelo
- `tecnologia: …`: em que o componente é feito
- `local: caminho`: onde o componente mora no repositório; tem de existir
- `realiza: [ID], [ID]`: afirmações da especificação que o componente cumpre
- `usa CARD **Componente**` ou `usa CARD **Externo**`: dependência; declarada só em quem depende
- `nome: descrição`: parte de um componente que é dado ou arquivo

## Marcas
- `- [x] SIGLA-PN` ou `- [ ] SIGLA-PN`: afirmação R, Q ou I, construída por inteiro ou não; F e linhas de modelo não levam marca
- `[ESP-R4]` em qualquer item: referência a uma afirmação da especificação; a especificação nunca cita a arquitetura
- `**Termo**`: componente, externo ou termo da especificação, na primeira menção de cada item
- `⟸ [Dnn]` no fim de um item: decisão que o fundamenta, em `decisoes/` desta pasta ou na da especificação
- identificadores, lápides e negrito seguem a legenda da especificação
