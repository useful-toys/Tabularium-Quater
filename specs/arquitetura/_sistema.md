# Arquitetura do Tabularium
Arquivos de texto num repositório público, levados ao repositório que adota o formato por uma skill que executa um script.

## Áreas
| Área | Componente central | Arquivo |
| --- | --- | --- |
| Distribuição | **Instalador** | distribuicao.md |

## Externos
- GitHub · hospedagem
  - guarda: o repositório do formato
  - fornece: cada arquivo da linha principal por URL, sem autenticação
- npx skills · instalador de skills
  - fornece: a instalação da **Skill de instalação** no repositório que adota o formato
- Node.js · ambiente de execução
  - fornece: a execução do **Instalador**

## Restrições globais
- [x] ARQ-R1  O formato é guardado num repositório público no **GitHub**, e a linha principal é a única versão distribuída
- [x] ARQ-R2  Os arquivos distribuídos são os da própria `specs/`; o repositório não guarda segunda cópia
- [x] ARQ-R3  Manifesto e configuração não ficam soltos na raiz do repositório: vão em `specs/`, e os de instalação, em `instalador/`

## Fluxos
- ARQ-F1  Instalar ou atualizar o formato: [SKI-I1] → [INS-I1]

## Fora de escopo
- Escolhas táticas, que mudam dentro de um componente sem que outro perceba · permanente
