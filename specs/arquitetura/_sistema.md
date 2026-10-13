# Arquitetura do Tabularium
Arquivos de texto num repositório público, levados ao repositório que adota o formato por uma skill que executa um script, e mantidos ali por skills que conduzem a redação e por scripts que fazem a parte mecânica.


## Externos
- GitHub · hospedagem
  - guarda: o repositório do formato
  - guarda: as issues das ideias, com o estado de cada uma em rótulos
  - fornece: cada arquivo da linha principal por URL, sem autenticação
- npx skills · instalador de skills
  - fornece: a instalação da **Skill de instalação**, da **Skill de validação**, da **Skill de alocação**, da **Skill de indexação**, da **Skill de entrevista**, da **Skill de sugestão**, da **Skill de registro** e da **Skill de entrega** no repositório que adota o formato
- Node.js · ambiente de execução
  - fornece: a execução do **Instalador**, do **Script de validação**, do **Script de sorteio**, do **Script de próximo código** e do **Script de indexação**
- Git · controle de versão
  - guarda: a linha principal e a ramificação de cada ideia
- gh · linha de comando do GitHub
  - fornece: a leitura e a gravação de issues, comentários e rótulos
- Agente de IA · quem executa as skills
  - fornece: a conversa com quem usa o formato, a leitura das instruções e a execução dos scripts

## Restrições globais
- [x] ARQ-R1  O formato é guardado num repositório público no **GitHub**, e a linha principal é a única versão distribuída ⟸ [D97, D103]
- [x] ARQ-R2  Os arquivos genéricos distribuídos são os da própria `specs/`; o repositório não guarda segunda cópia deles ⟸ [D99]
- [x] ARQ-R3  Manifesto e configuração não ficam soltos na raiz do repositório: vão em `specs/`, e os de instalação, em `instalador/` ⟸ [D102]
- [x] ARQ-R4  Os arquivos que cada repositório preenche por conta própria são distribuídos como modelos, guardados em `instalador/modelos/` no mesmo caminho do destino ⟸ [D100, D101]
- [x] ARQ-R5  As **Instruções para agentes** da arquitetura e da interface mandam o agente avisar o usuário do que o formato não serve a escrever, e deixar que ele decida entre forçar o encaixe e anotá-lo em `_achados.md` ⟸ [D109]
- [x] ARQ-Rp7zm.1  Cada processo é oferecido como uma skill, que conduz o que pede redação e julgamento, e chama um script para o que é mecânico e determinístico ⟸ [Dp7zm.1]
- [x] ARQ-Rp7zm.2  Validar, indexar, sortear, contar códigos e copiar arquivos são sempre feitos por script, e nunca pelo agente lendo as instruções ⟸ [Dp7zm.1]
- [x] ARQ-Rp7zm.3  Entrevistar, sugerir, registrar e entregar não têm script próprio: usam os scripts das outras skills ⟸ [Dp7zm.1]
- [x] ARQ-Rp7zm.4  A skill que só uma pessoa aciona não é acionada por outra skill: a outra sugere o comando ⟸ [D95]
- [x] ARQ-Rp7zm.5  O texto que mais de uma skill usa é escrito numa só, e as outras o leem na pasta dela, instalada ao lado ⟸ [Dp7zm.5]

## Fluxos
- ARQ-F1  Instalar ou atualizar o formato: [SKI-I1] → [INS-I1]
- ARQ-F2  Validar a especificação: [SKV-I1] → [VAL-I1]
- ARQ-F22.1  Sortear o prefixo de uma mudança: [SKS-Ibvc2.1] → [SOR-I22.1]
- ARQ-Fbvc2.1  Obter o próximo código de uma mudança: [SKS-Ibvc2.1] → [PRX-Ibvc2.1]
- ARQ-F23.1  Indexar as pastas da especificação: [SKX-I23.1] → [IDX-I23.1]
- ARQ-Fp7zm.1  Gravar uma rodada da entrevista: [SKE-Ip7zm.1] → [SKS-Ibvc2.1] → [SKV-I1] → [SKX-I23.1]
- ARQ-Fp7zm.2  Entregar uma ideia: [SKA-Ip7zm.1] → [SKV-I1] → [SKX-I23.1]

## Fora de escopo
- Escolhas táticas, que mudam dentro de um componente sem que outro perceba · permanente
