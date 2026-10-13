# Elaboração
Como uma **Ideia** amadurece numa **Entrevista**, ganha **Sugestões**, é registrada no **Rastreador** e chega à linha principal por uma **Entrega**.
- célula central: **Ideia**
- prioridade: apoio
- responsável: mantenedor do formato

## Linguagem
- **ramificação da ideia**: linha do **Controle de versão**, separada da linha principal, que guarda o que a **Entrevista** de uma **Ideia** grava
- **parte**: pedaço de uma **Ideia** que caberia numa **Linha**, como uma capacidade, uma regra, um atributo ou um termo
- **consenso**: **parte** com redação final, que o **Autor** respondeu ou confirmou
- **rodada**: conjunto das perguntas de uma **Entrevista** sobre um mesmo assunto
- **issue da ideia**: registro de uma **Ideia** no **Rastreador**
- **defeito**: o que o produto não faz, embora uma **afirmação** implementada o diga

## **Ideia**  `IDE`
Mudança pretendida numa das três especificações, desde que é proposta até ser entregue ou rejeitada.
- **objetivo**: texto
- **estado**: sugestão | em entrevista | consenso | entregue | rejeitada | virou defeito; inicial: sugestão
- **prefixo**: **Prefixo de mudança**; imutável
- [x] IDE-Rp6wh.1  O **objetivo** diz, em palavras do negócio, para que a ideia serve, e não muda durante a **Entrevista**
- [x] IDE-Rp6wh.2  Está no **estado** sugestão a ideia que ainda não passou por **Entrevista**
- [x] IDE-Rp6wh.3  Tudo o que a ideia muda nas especificações fica na **ramificação da ideia**, e nunca na linha principal, até a **Entrega**
- [x] IDE-Rp6wh.4  A **issue da ideia** é opcional: a ideia que começa e termina numa só conversa não precisa dela
- [x] IDE-Rp6wh.5  A ideia que ganha **issue da ideia** depois de começada mantém o **prefixo**
- [x] IDE-Rp6wh.6  A **issue da ideia** fechada não é reaberta
- [x] IDE-Rp6wh.7  A ideia que volta depois de fechada é uma ideia nova, que cita a antiga
- [x] IDE-Rp6wh.8  Só o **Autor** rejeita uma ideia
- [x] IDE-Rp6wh.9  O **defeito** não é ideia: a especificação está certa, e quem o trata é o processo da equipe
- [x] IDE-Rp6wh.10  A ideia em que nenhuma **parte** pede mudança e alguma é **defeito** passa ao **estado** virou defeito, e nada dela é entregue
- [x] IDE-Rp6wh.11  O **estado** muda só assim:

| Estado | Acontecimento | Novo estado |
| --- | --- | --- |
| sugestão | começa a **Entrevista** | em entrevista |
| em entrevista | o **Autor** confirma o **consenso** sobre a ideia inteira | consenso |
| em entrevista | o **Autor** rejeita a ideia | rejeitada |
| em entrevista | nenhuma **parte** pede mudança, e alguma é **defeito** | virou defeito |
| consenso | a **Entrega** devolve a ideia | em entrevista |
| consenso | a **Entrega** chega à linha principal | entregue |

- [x] IDE-Cp6wh.1  Registrar uma ideia no **Rastreador**
  - se a ideia ainda não passou por **Entrevista**: a **issue da ideia** traz o texto do **Autor**, sem reescrita
  - se a ideia está em **Entrevista**: a **issue da ideia** traz o **Andamento**, a ideia como foi contada no começo e o que se decidiu em cada **rodada** já feita
  - se a ideia está em **Entrevista**: a **ramificação da ideia** fica ao alcance de outra sessão
- [x] IDE-Cp6wh.2  Separar uma **parte** numa ideia própria
  - se a parte fica para depois: nasce uma ideia nova, no **estado** sugestão
  - se a parte é **defeito**: nasce um registro de defeito, com a **afirmação** que o produto não cumpre
  - o registro novo e a **issue da ideia** se citam
  - no **Andamento**, a parte passa a **fora da ideia**
- [x] IDE-Cp6wh.3  Rejeitar uma ideia
  - nada é entregue
  - o **estado** passa a rejeitada
  - a **issue da ideia** é fechada, com o motivo

## **Entrevista**  `ETV`
Conversa em **rodadas** em que uma **Ideia** amadurece com o **Autor** e em que só o **consenso** é gravado.
- pertence a 1 **Ideia**; inverso: 0..1
- [x] ETV-Rp6wh.1  Procura o que a **Ideia** não previu, onde ela se contradiz e onde quebra
- [x] ETV-Rp6wh.2  Resposta vaga é cobrada até caber numa **Linha**
- [x] ETV-Rp6wh.3  Só se pergunta o que as respostas já dadas liberaram
- [x] ETV-Rp6wh.4  Nada é suposto no lugar de uma resposta que falta
- [x] ETV-Rp6wh.5  Toda pergunta leva o contexto, um exemplo e a resposta recomendada
- [x] ETV-Rp6wh.6  Quem decide cada resposta é o **Autor**
- [x] ETV-Rp6wh.7  O que já está escrito numa das três especificações é buscado, e não perguntado
- [x] ETV-Rp6wh.8  Fato que não depende do produto é buscado fora das especificações, e a fonte é dita ao **Autor**
- [x] ETV-Rp6wh.9  Cada **parte** é dada como da **Especificação do produto**, da **Especificação de arquitetura**, da **Especificação de interface** ou de codificação
- [x] ETV-Rp6wh.10  **Parte** de codificação não é gravada: fica para quem programa
- [x] ETV-Rp6wh.11  Cada **parte** é levada às condições de contorno: o limite, o vazio, o simultâneo, o caminho que falha, o depois e quem mais é afetado
- [x] ETV-Rp6wh.12  Cada **parte** é confrontada com o que já está escrito nas três especificações
- [x] ETV-Rp6wh.13  No conflito com o que está escrito, os dois lados são mostrados, e o **Autor** escolhe entre retirar a **parte**, ajustá-la ou mudar o existente
- [x] ETV-Rp6wh.14  Mudar o que já está na linha principal pede a confirmação do **Autor**, item por item
- [x] ETV-Rp6wh.15  Palavra do **Autor** que não é **Termo** é procurada antes de virar um: presume-se que o termo já existe
- [x] ETV-Rp6wh.16  **Parte** já escrita, implementada e que o produto faz não entra na **Ideia**
- [x] ETV-Rp6wh.17  **Parte** já escrita e ainda não implementada não entra na **Ideia**: falta implementar
- [x] ETV-Rp6wh.18  **Parte** já escrita, implementada e que o produto não faz é **defeito**: corrige-se o produto, e a **afirmação** fica ⟸ [Dp6wh.1]
- [x] ETV-Rp6wh.19  As perguntas de uma **rodada** são feitas uma por vez
- [x] ETV-Rp6wh.20  Duas respostas que se contradizem viram a pergunta seguinte
- [x] ETV-Rp6wh.21  Proposta adotada sem objeção é confirmada pelo **Autor** ao fim da **rodada**
- [x] ETV-Rp6wh.22  Só o **consenso** é gravado; o resto fica no **Andamento**
- [x] ETV-Rp6wh.23  Cada **rodada** gravada é validada pelo **Validador**, indexada pelo **Indexador** e guardada no **Controle de versão**
- [x] ETV-Rp6wh.24  Termina quando não sobra pergunta e o **Autor** confirma o **consenso** sobre a **Ideia** inteira
- [x] ETV-Rp6wh.25  O **consenso** é uma proposta do **Autor**; o aceite fica com o processo da equipe ⟸ [D08]
- [x] ETV-Rp6wh.26  Ao terminar, o **Autor** é informado das **Áreas** que a mudança toca e do **Responsável de área** de cada uma
- [x] ETV-Rp6wh.27  Todo código que uma **rodada** grava leva o **Ideia.prefixo** e é alocado por programa, conforme [IDT-R22.6] e [IDT-Rbvc2.3]
- [x] ETV-Cp6wh.1  Começar uma entrevista
  - exige: uma **Ideia** contada em texto, ou uma **issue da ideia** aberta
  - a **ramificação da ideia** nasce da linha principal em dia
  - o **Ideia.estado** passa a em entrevista
  - se o **Arquivo de produto** ainda traz os textos do modelo: a primeira **rodada** trata do produto, do problema que ele resolve, do público e dos **Atores**
- [x] ETV-Cp6wh.2  Retomar uma entrevista
  - exige: **issue da ideia** com **Andamento**
  - o que a **ramificação da ideia** já gravou é confrontado de novo com a linha principal
  - a entrevista segue pela primeira pergunta do **Andamento**
- [x] ETV-Cp6wh.3  Pausar uma entrevista
  - a **rodada** em curso é gravada até onde há **consenso**
  - o **Andamento** é mostrado
- [x] ETV-Cp6wh.4  Voltar atrás numa resposta já gravada
  - se a **Linha** foi criada pela **Ideia**: é reescrita ou apagada, sem lápide, conforme [IDT-Rknnk.2]
  - se a **Linha** já estava na linha principal e a **Ideia** a alterou: volta ao texto da linha principal
- [x] ETV-Cp6wh.5  Confirmar o consenso
  - exige: nenhuma pergunta em aberto no **Andamento**
  - o **Ideia.estado** passa a consenso

## **Andamento**  `AND`
Estado do que a **ramificação da ideia** não guarda: o objetivo da **Ideia**, o que falta decidir e o que ficou de fora.
- pertence a 1 **Ideia**; inverso: 0..1
- **em aberto**: perguntas ainda sem **consenso**, na ordem em que serão feitas
- **fora da ideia**: **partes** recusadas, já existentes, pendentes, de codificação, com **defeito** ou separadas numa **Ideia** própria
- [x] AND-Rp6wh.1  Não repete o que já tem **consenso**, que está gravado na **ramificação da ideia**
- [x] AND-Rp6wh.2  É mostrado na conversa
- [x] AND-Rp6wh.3  Na **Ideia** que tem **issue da ideia**, é o texto dela
- [x] AND-Rp6wh.4  Em **em aberto**, a pergunta que depende da resposta de outra é sub-item dela
- [x] AND-Rp6wh.5  Em **em aberto**, a pergunta já discutida leva as opções levantadas e a resposta recomendada
- [x] AND-Rp6wh.6  Na **issue da ideia**, é gravado a cada **rodada**, junto com o que o **Autor** decidiu nela
- [x] AND-Rp6wh.7  Se outra sessão escreveu na **issue da ideia**, a gravação para, e a diferença é mostrada ao **Autor**
- [x] AND-Rp6wh.8  Não traz o **Ideia.estado**

## **Sugestão**  `SUG`
**Ideia** proposta pelo produto, e não pelo **Autor**, que complementa uma funcionalidade já discutida ou já escrita.
- [x] SUG-Rp6wh.1  É vizinha do que complementa: diz o que mais o produto poderia ter por causa dele
- [x] SUG-Rp6wh.2  Tem um motivo: a **Linha** que a provoca, ou uma ausência que foi procurada e confirmada
- [x] SUG-Rp6wh.3  Não se sugere o que uma das três especificações já diz, implementado ou não
- [x] SUG-Rp6wh.4  Não se sugere o que está fora de escopo no **Arquivo de produto**, nem o que o **Autor** já recusou
- [x] SUG-Rp6wh.5  Não se sugere condição de contorno, que pertence à **Entrevista**
- [x] SUG-Rp6wh.6  Não se sugere qualidade geral nem escolha de arquitetura, de interface ou de codificação
- [x] SUG-Rp6wh.7  São mostradas no máximo cinco de cada vez, as de motivo mais forte
- [x] SUG-Rp6wh.8  Sugerir não altera nenhuma das três especificações
- [x] SUG-Cp6wh.1  Pedir sugestões
  - exige: o que complementar, que é uma **Área**, uma **Célula** ou a **Ideia** de uma **Entrevista** em curso
  - as sugestões são mostradas de uma vez, cada uma com o motivo e o que acrescentaria
- [x] SUG-Cp6wh.2  Dar destino a uma sugestão
  - se incorporada: vira **parte** da **Ideia** em **Entrevista**
  - se descartada: entra em **Andamento.fora da ideia**, para não voltar
  - se guardada: vira uma **Ideia** no **Rastreador**, no **Ideia.estado** sugestão

## **Entrega**  `ETG`
Passagem para a linha principal do que a **Entrevista** gravou na **ramificação da ideia**, depois de conferido.
- pertence a 1 **Ideia**; inverso: 0..1
- [x] ETG-Rp6wh.1  Não decide conteúdo: diante de dúvida de conteúdo, devolve a **Ideia** à **Entrevista**
- [x] ETG-Rp6wh.2  Só se entrega a **Ideia** em **consenso**, sem pergunta em aberto no **Andamento**
- [x] ETG-Rp6wh.3  Antes de conferir, a linha principal é trazida para a **ramificação da ideia**
- [x] ETG-Rp6wh.4  O que veio da linha principal é confrontado com o que a **Ideia** gravou
- [x] ETG-Rp6wh.5  **Linha** que a **Ideia** alterou e que mudou também na linha principal devolve a ideia
- [x] ETG-Rp6wh.6  Novidade da linha principal que contraria o que a **Ideia** gravou devolve a ideia
- [x] ETG-Rp6wh.7  Código que a linha principal também alocou é trocado na **ramificação da ideia** por outro, alocado por programa, por ainda não ser definitivo, conforme [IDT-Rknnk.1]
- [x] ETG-Rp6wh.8  Confere que o **Validador** não acusa violação
- [x] ETG-Rp6wh.9  Confere que todo código da linha principal continua, com o mesmo significado ou como lápide
- [x] ETG-Rp6wh.10  Confere que cada código novo leva o **Ideia.prefixo**
- [x] ETG-Rp6wh.11  Confere que cada **Decisão** nova é citada por algum item e traz contexto, alternativa descartada e consequências
- [x] ETG-Rp6wh.12  Confere que os índices do **Indexador** estão em dia
- [x] ETG-Rp6wh.13  Correção que é só de forma é feita na entrega; a que muda o significado de uma **Linha** devolve a **Ideia**
- [x] ETG-Rp6wh.14  A **issue da ideia** é fechada quando a entrega chega à linha principal
- [ ] ETG-Rtcwx.1  Não se entrega a **Ideia** enquanto há **Achado** de **Achado.criticidade** alta em aberto
- [ ] ETG-Rtcwx.2  O que segura a entrega é o **Achado** registrado, e não uma revisão feita na hora
- [x] ETG-Cp6wh.1  Entregar uma ideia
  - exige: **Ideia** em **consenso**
  - o que a **Ideia** muda ao todo é mostrado, e o **Autor** confirma a entrega
  - a **ramificação da ideia** entra na linha principal, pelo caminho que a equipe usa
  - o **Ideia.estado** passa a entregue
  - se algo pede uma decisão que não foi tomada: a **Ideia** volta ao **Ideia.estado** em entrevista, com o item que parou em **Andamento.em aberto**

## **Achado**  `ACH`
Problema de significado de uma das três especificações, que a forma dela não mostra, registrado para ser resolvido.
- **criticidade**: alta | média | baixa
- **situação**: em aberto | resolvido; inicial: em aberto
- [ ] ACH-Rtcwx.1  É registrado numa revisão feita por um agente de IA, e nunca pelo **Validador** ⟸ [Dtcwx.1]
- [ ] ACH-Rtcwx.2  Aponta o que duas ou mais **Linhas** bem formadas dizem juntas, como uma contradição entre duas **afirmações**
- [ ] ACH-Rtcwx.3  Não torna a **Especificação do produto** inválida ⟸ [Dtcwx.1]
- [ ] ACH-Rtcwx.4  Fica registrado até ser resolvido, e não depende de a revisão ser feita de novo
- [ ] ACH-Rtcwx.5  Só é resolvido pela mudança do texto: corrige-se a **afirmação**, ou reescreve-se para a leitura errada deixar de ser possível ⟸ [Dtcwx.2]
- [ ] ACH-Rtcwx.6  Não é descartado, nem tem a **criticidade** rebaixada ⟸ [Dtcwx.2]
- [ ] ACH-Ctcwx.1  Revisar o significado de uma das três especificações
  - cada problema encontrado vira um achado, com a **criticidade**
- [ ] ACH-Ctcwx.2  Resolver um achado
  - exige: o texto que o achado aponta foi corrigido ou reescrito
  - a **situação** passa a resolvido
