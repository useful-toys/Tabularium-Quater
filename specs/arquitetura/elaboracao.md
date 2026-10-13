# Elaboração
Como a entrevista, a sugestão, o registro e a entrega de uma ideia são oferecidos no repositório que adota o formato.
- componente central: **Skill de entrevista**

## Skill de entrevista  `SKE`
Instruções que levam um agente de IA a entrevistar o autor sobre uma ideia e a gravar, a cada rodada, o que chegou ao consenso.
- tecnologia: skill de agente, em Markdown
- local: `skills/tabularium-entrevistar/`
- realiza: [ETV-Rp6wh.1], [ETV-Rp6wh.2], [ETV-Rp6wh.3], [ETV-Rp6wh.4], [ETV-Rp6wh.5], [ETV-Rp6wh.6], [ETV-Rp6wh.7], [ETV-Rp6wh.8], [ETV-Rp6wh.9], [ETV-Rp6wh.10], [ETV-Rp6wh.11], [ETV-Rp6wh.12], [ETV-Rp6wh.13], [ETV-Rp6wh.14], [ETV-Rp6wh.15], [ETV-Rp6wh.16], [ETV-Rp6wh.17], [ETV-Rp6wh.18], [ETV-Rp6wh.19], [ETV-Rp6wh.20], [ETV-Rp6wh.21], [ETV-Rp6wh.22], [ETV-Rp6wh.23], [ETV-Rp6wh.24], [ETV-Rp6wh.25], [ETV-Rp6wh.26], [ETV-Rp6wh.27], [ETV-Cp6wh.1], [ETV-Cp6wh.2], [ETV-Cp6wh.3], [ETV-Cp6wh.4], [ETV-Cp6wh.5], [AND-Rp6wh.1], [AND-Rp6wh.2], [AND-Rp6wh.3], [AND-Rp6wh.4], [AND-Rp6wh.5], [AND-Rp6wh.6], [AND-Rp6wh.7], [AND-Rp6wh.8], [IDE-Rp6wh.1], [IDE-Rp6wh.2], [IDE-Rp6wh.3], [IDE-Rp6wh.8], [IDE-Rp6wh.10], [IDE-Rp6wh.11], [IDE-Cp6wh.3]
- andamento: `andamento.md`, a forma do **Andamento**, lida também pela **Skill de entrega**
- usa 1 **Skill de alocação**
- usa 1 **Skill de validação**
- usa 1 **Skill de indexação**
- usa 1 **Skill de registro**
- usa 1 **Git**
- usa 0..1 **GitHub**
- usa 1 **npx skills**
- [x] SKE-Rp7zm.1  Grava o consenso ao fim de cada rodada, num commit próprio, na ramificação da ideia ⟸ [Dp7zm.2]
- [x] SKE-Rp7zm.2  A ramificação da ideia nasce da linha principal do servidor, ligada à issue quando a ideia tem uma ⟸ [Dp7zm.4]
- [x] SKE-Rp7zm.3  O estado da entrevista entre duas sessões fica na issue da ideia, com o **Andamento** no corpo ⟸ [Dp7zm.3]
- [x] SKE-Rp7zm.4  Sem issue, o **Andamento** vive só na conversa
- [x] SKE-Rp7zm.5  Cada rodada gravada ganha um comentário na issue, que não é reescrito depois ⟸ [Dp7zm.6]
- [x] SKE-Rp7zm.6  O texto com que a ideia chegou é guardado num comentário da issue, antes de o corpo dar lugar ao **Andamento**
- [x] SKE-Rp7zm.7  Antes de gravar na issue, relê o corpo, e para se outra sessão o alterou
- [x] SKE-Rp7zm.8  Com issue, envia a ramificação da ideia ao servidor a cada gravação; sem issue, só a pedido
- [x] SKE-Rp7zm.9  Lê a forma da issue em `issue.md`, na pasta da **Skill de registro** instalada ao lado da sua ⟸ [Dp7zm.5]
- [x] SKE-Rp7zm.10  Busca na especificação por um subagente, para os arquivos lidos não ocuparem a conversa ⟸ [Dp7zm.7]
- [x] SKE-Rp7zm.11  Sugere a **Skill de registro**, a **Skill de sugestão** e a **Skill de entrega** na hora de cada uma, e não as aciona ⟸ [D95]
- [x] SKE-Ip7zm.1  Comando `/tabularium-entrevistar`, digitado por quem usa o agente ⟸ [D95]
  - argumento opcional: o número ou o link de uma issue, ou o texto da ideia
  - o agente não a aciona por conta própria

## Skill de sugestão  `SKG`
Instruções que levam um agente de IA a propor ideias que complementam uma ideia já discutida ou uma área já escrita.
- tecnologia: skill de agente, em Markdown
- local: `skills/tabularium-sugerir/`
- realiza: [SUG-Rp6wh.1], [SUG-Rp6wh.2], [SUG-Rp6wh.3], [SUG-Rp6wh.4], [SUG-Rp6wh.5], [SUG-Rp6wh.6], [SUG-Rp6wh.7], [SUG-Rp6wh.8], [SUG-Cp6wh.1], [SUG-Cp6wh.2]
- usa 1 **Skill de registro**
- usa 0..1 **GitHub**
- usa 1 **npx skills**
- [x] SKG-Rp7zm.1  Só lê a especificação: não grava nada na pasta dela
- [x] SKG-Rp7zm.2  A sugestão guardada vira uma issue, com o rótulo `especificação` e sem rótulo de estado
- [x] SKG-Rp7zm.3  A sugestão como foi mostrada é guardada num comentário da issue
- [x] SKG-Ip7zm.1  Comando `/tabularium-sugerir`, digitado por quem usa o agente ⟸ [D95]
  - argumento opcional: a área ou a célula a complementar
  - o agente não a aciona por conta própria

## Skill de registro  `SKR`
Instruções que levam um agente de IA a criar no **GitHub** a issue de uma ideia, e os rótulos que guardam o estado dela.
- tecnologia: skill de agente, em Markdown
- local: `skills/tabularium-registrar/`
- realiza: [IDE-Rp6wh.4], [IDE-Rp6wh.5], [IDE-Rp6wh.6], [IDE-Rp6wh.7], [IDE-Rp6wh.9], [IDE-Cp6wh.1], [IDE-Cp6wh.2]
- issue: `issue.md`, a forma da issue, os rótulos e o que cada skill muda neles
- usa 1 **GitHub**
- usa 1 **gh** ⟸ [Dp7zm.8]
- usa 1 **npx skills**
- [x] SKR-Rp7zm.1  A forma da issue é escrita uma só vez, em **issue**, e as outras skills a leem dali ⟸ [Dp7zm.5]
- [x] SKR-Rp7zm.2  Toda issue de ideia leva o rótulo `especificação`
- [x] SKR-Rp7zm.3  O **Ideia.estado** é guardado num rótulo de estado, e a issue leva no máximo um: `em-entrevista`, `consenso` ou `rejeitada`
- [x] SKR-Rp7zm.4  A ideia no estado sugestão é a issue sem rótulo de estado
- [x] SKR-Rp7zm.5  A ideia entregue é a issue fechada, com `consenso`
- [x] SKR-Rp7zm.6  A ideia que virou defeito é a issue só com o rótulo `defeito`
- [x] SKR-Rp7zm.7  Cria no repositório o rótulo que faltar
- [x] SKR-Rp7zm.8  Mudar o rótulo de estado e gravar o corpo da issue são feitos juntos
- [x] SKR-Ip7zm.1  Comando `/tabularium-registrar`, digitado por quem usa o agente ⟸ [D95]
  - argumento opcional: o texto de uma ideia a registrar como sugestão
  - o agente não a aciona por conta própria

## Skill de entrega  `SKA`
Instruções que levam um agente de IA a conferir a ramificação de uma ideia e a entregá-la na linha principal.
- tecnologia: skill de agente, em Markdown
- local: `skills/tabularium-aplicar/`
- realiza: [ETG-Rp6wh.1], [ETG-Rp6wh.2], [ETG-Rp6wh.3], [ETG-Rp6wh.4], [ETG-Rp6wh.5], [ETG-Rp6wh.6], [ETG-Rp6wh.7], [ETG-Rp6wh.8], [ETG-Rp6wh.9], [ETG-Rp6wh.10], [ETG-Rp6wh.11], [ETG-Rp6wh.12], [ETG-Rp6wh.13], [ETG-Rp6wh.14], [ETG-Cp6wh.1]
- usa 1 **Skill de entrevista**
- usa 1 **Skill de registro**
- usa 1 **Skill de validação**
- usa 1 **Skill de indexação**
- usa 1 **Skill de alocação**
- usa 1 **Git**
- usa 0..1 **GitHub**
- usa 1 **npx skills**
- [x] SKA-Rp7zm.1  Mescla a linha principal na ramificação da ideia antes de conferir
- [x] SKA-Rp7zm.2  Conflito de mesclagem que é só de posição é resolvido mantendo os dois lados; o que pede escolher entre dois textos devolve a ideia
- [x] SKA-Rp7zm.3  Compara a ramificação da ideia com a linha principal pelo **Git**, só na pasta da especificação
- [x] SKA-Rp7zm.4  Entrega pelo fluxo que o `AGENTS.md` da raiz do repositório descreve; sem fluxo escrito, mescla a ramificação na linha principal
- [x] SKA-Rp7zm.5  O envio ao servidor só é feito a pedido
- [x] SKA-Rp7zm.6  Fecha a issue só quando a entrega está na linha principal do servidor
- [x] SKA-Rp7zm.7  Ao devolver, grava na issue o item que parou e troca o rótulo de estado por `em-entrevista`
- [x] SKA-Ip7zm.1  Comando `/tabularium-aplicar`, digitado por quem usa o agente ⟸ [D95]
  - argumento opcional: o número ou o link da issue da ideia; sem ele, entrega a ramificação atual
  - o agente não a aciona por conta própria
