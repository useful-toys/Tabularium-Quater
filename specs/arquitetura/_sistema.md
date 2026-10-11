# Arquitetura do Tabularium
Arquivos de texto num repositório público, levados ao repositório que adota o formato por uma skill que executa um script.


## Externos
- GitHub · hospedagem
  - guarda: o repositório do formato
  - fornece: cada arquivo da linha principal por URL, sem autenticação
- npx skills · instalador de skills
  - fornece: a instalação da **Skill de instalação**, da **Skill de validação**, da **Skill de sorteio** e da **Skill de indexação** no repositório que adota o formato
- Node.js · ambiente de execução
  - fornece: a execução do **Instalador**, do **Script de validação**, do **Script de sorteio** e do **Script de indexação**

## Restrições globais
- [x] ARQ-R1  O formato é guardado num repositório público no **GitHub**, e a linha principal é a única versão distribuída ⟸ [D97, D103]
- [x] ARQ-R2  Os arquivos genéricos distribuídos são os da própria `specs/`; o repositório não guarda segunda cópia deles ⟸ [D99]
- [x] ARQ-R3  Manifesto e configuração não ficam soltos na raiz do repositório: vão em `specs/`, e os de instalação, em `instalador/` ⟸ [D102]
- [x] ARQ-R4  Os arquivos que cada repositório preenche por conta própria são distribuídos como modelos, guardados em `instalador/modelos/` no mesmo caminho do destino ⟸ [D100, D101]
- [x] ARQ-R5  As **Instruções para agentes** da arquitetura e da interface mandam o agente avisar o usuário do que o formato não serve a escrever, e deixar que ele decida entre forçar o encaixe e anotá-lo em `_achados.md` ⟸ [D109]

## Fluxos
- ARQ-F1  Instalar ou atualizar o formato: [SKI-I1] → [INS-I1]
- ARQ-F2  Validar a especificação: [SKV-I1] → [VAL-I1]
- ARQ-F22.1  Sortear o prefixo de uma mudança: [SKS-I22.1] → [SOR-I22.1]
- ARQ-F23.1  Indexar as pastas da especificação: [SKX-I23.1] → [IDX-I23.1]

## Fora de escopo
- Escolhas táticas, que mudam dentro de um componente sem que outro perceba · permanente
