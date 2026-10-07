# Tabularium
Formato para especificar produtos de software em Markdown: denso, hierárquico, fonte única da verdade, com linguagem ubíqua e organizado por proximidade lógica.

## Propósito
- Problema: **Especificações** espalhadas em documentos por tipo repetem informação, divergem entre si e não podem ser verificadas por programa
- Público: quem especifica produtos e quer extrair da **Especificação** os demais documentos
- Não técnico: descreve o que o sistema é e o que faz para o negócio; os assuntos técnicos começam no documento de arquitetura ⟸ [D74]
- Não é documentação do negócio: como o negócio funciona sem o sistema fica fora
- Diferencial: tudo o que se sabe sobre uma **Célula** mora num só bloco ⟸ [D24]
- Diferencial: cada **afirmação** existe uma vez e é citável por **Identificador**
- Diferencial: as **Decisões** relevantes ficam em anotações densas à parte, citadas pelos itens que fundamentam e lidas só sob demanda, sem sobrecarregar a **Especificação**
- Diferencial: legível por pessoas sem renderização e econômica para agentes de IA, que leem só a **Área** de que precisam
- Diferencial: um programa, o **Validador**, checa a forma da **Especificação**, e outro, o **Gerador**, produz o **Índice**, o **Glossário** e o **Mapa entre áreas**, ambos sem interpretar o texto
- Diferencial: os **Documentos derivados** são redigidos por agente de IA a partir da **Especificação**, com a origem de cada frase

## Áreas
| Área | Célula central | Prioridade | Dono | Arquivo |
| --- | --- | --- | --- | --- |
| Organização | **Especificação** | apoio | mantenedor do formato | organizacao.md |
| Modelagem | **Célula** | núcleo | mantenedor do formato | modelagem.md |
| Redação | **Linha** | núcleo | mantenedor do formato | redacao.md |

## Atores
- Autor: altera a **Especificação**; pessoa ou agente de IA; padrão
- Dono de área: responde por uma **Área**; aceita as mudanças nela
- Leitor: consulta a **Especificação** e os **Documentos derivados**; nunca altera

## Tipos comuns
- Sigla de célula: texto; de 2 a 5 letras maiúsculas
- Letra de papel: R | Q | C | V | T | J ⟸ [D36]
- Código de identificador: texto; **Sigla de célula**, `-`, **Letra de papel** e número inteiro a partir de 1
- Código de pergunta: texto; `P` e número inteiro a partir de 1
- Código de decisão: texto; `D` e número inteiro a partir de 1
- Cardinalidade: 1 | 0..1 | 0..N | 1..N

## Jornadas
- PRD-J1  Acrescentar uma **Regra**: [CEL-V1] → [LIN-C1] → [VRF-V1]
- PRD-J2  Retirar uma **afirmação**: [LIN-C2] → [VRF-V1]
- PRD-J3  Extrair um documento: [GER-C1] → [DER-V1]
- PRD-J4  Responder uma **Pergunta**: [PER-C2] → [VRF-V1]

## Externos
- Controle de versão · histórico
  - guarda: todas as versões dos arquivos
  - fornece: a linha principal, a partir da qual nenhum código é renumerado
- LGPD · lei geral de proteção de dados
  - impõe: identificar os dados **pessoais** tratados pelo produto
- Rastreador · ideias ⟸ [D60]
  - guarda: ideias e pedidos ainda não comprometidos, até amadurecerem

## Regras globais
- [x] PRD-Q1  O texto se lê sem renderização e se renderiza nos editores e forjas comuns ⟸ [D73]
- [ ] PRD-Q2  O texto está no idioma do produto especificado

## Fora de escopo
- Arquitetura e detalhes técnicos · permanente
- Detalhe de interface: formato, máscara, leiaute · permanente
- Histórico e justificativas no texto · permanente
- Ideias e pedidos não comprometidos · permanente
- Estado parcial de implementação · permanente
- Processo de mudança da **Especificação**: proposta, revisão e aceite · nesta versão ⟸ [D08]
