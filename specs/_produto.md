# Tabularium
Formato para especificar produtos de software em Markdown: denso, hierárquico, fonte única da verdade, com linguagem ubíqua e organizado por proximidade lógica.

## Propósito
- Problema: **Especificações do produto** espalhadas em documentos por tipo repetem informação, divergem entre si e não podem ser verificadas por programa
- Público: quem especifica produtos e quer extrair da **Especificação do produto** os demais documentos

## Diferenciais
- Tudo o que se sabe sobre uma **Célula** mora num só bloco ⟸ [D24]
- Cada **afirmação** existe uma vez e é citável por **Identificador**
- As **Decisões** relevantes ficam em anotações densas à parte, citadas pelos itens que fundamentam e lidas só sob demanda, sem sobrecarregar a **Especificação do produto**
- Legível por pessoas sem renderização e econômica para agentes de IA, que leem só a **Área** de que precisam
- Um programa, o **Validador**, checa a forma da **Especificação do produto**, e outro, o **Indexador**, produz o **Índice de áreas**, o **Índice de decisões**, a **Fronteira da área**, o **Glossário** e o **Mapa entre áreas**, ambos sem interpretar o texto
- Os **Documentos derivados** são redigidos por agente de IA a partir da **Especificação do produto**, com a origem de cada frase

## Atores
- **Autor**: altera a **Especificação do produto**; pessoa ou agente de IA; padrão
- **Responsável de área**: responde por uma **Área**; aceita as mudanças nela
- **Leitor**: consulta a **Especificação do produto** e os **Documentos derivados**; nunca altera

## Tipos comuns
- **Sigla de célula**: texto; de 2 a 5 letras maiúsculas
- **Letra de papel**: R | Q | C | V | T | J ⟸ [D36]
- **Código sorteado**: texto; 4 caracteres de `bcdfghjklmnpqrstvwxz23456789`, o primeiro uma letra ⟸ [D22.3]
- **Prefixo de mudança**: texto; número de uma issue do **Rastreador**, inteiro a partir de 1 e sem zero à esquerda, ou **Código sorteado** ⟸ [D22.2]
- **Número de ordem**: inteiro; a partir de 1, sem zero à esquerda (~~contador~~)
- **Código de identificador**: texto; **Sigla de célula**, `-`, **Letra de papel**, **Prefixo de mudança**, `.` e **Número de ordem**
- **Código de pergunta**: texto; `P`, **Prefixo de mudança**, `.` e **Número de ordem**
- **Código de decisão**: texto; `D`, **Prefixo de mudança**, `.` e **Número de ordem**
- **Cardinalidade**: 1 | 0..1 | 0..N | 1..N

## Jornadas
- PRD-J1  Acrescentar uma **Regra**: [CEL-V1] → [LIN-C1] → [VRF-V1]
- PRD-J2  Retirar uma **afirmação**: [LIN-C2] → [VRF-V1]
- PRD-J3  Extrair um documento: [GER-C23.2] → [DER-V1]
- PRD-J4  Responder uma **Pergunta**: [PER-C2] → [VRF-V1]

## Externos
- **Controle de versão** · histórico
  - guarda: todas as versões dos arquivos
  - fornece: a linha principal, onde se vê se o número de uma issue já serviu de **Prefixo de mudança**
- **LGPD** · lei geral de proteção de dados
  - impõe: identificar os dados **pessoais** tratados pelo produto
- **Rastreador** · ideias ⟸ [D60]
  - guarda: ideias e pedidos ainda não comprometidos, até amadurecerem
  - fornece: o número da issue que pede uma mudança

## Regras globais
- [x] PRD-Q1  O texto se lê sem renderização e se renderiza nos editores e forjas comuns ⟸ [D73]
- [ ] PRD-Q2  O texto está no idioma do produto especificado

## Fora de escopo
- Arquitetura e detalhes técnicos na **Especificação do produto** · permanente ⟸ [D74]
- Documentação do negócio: como ele funciona sem o sistema · permanente
- Detalhe de interface na **Especificação do produto**: formato, máscara, leiaute · permanente
- Formato da **Especificação de arquitetura** e da **Especificação de interface** · nesta versão ⟸ [Dv3r6.1]
- Histórico e justificativas no texto · permanente
- Ideias e pedidos não comprometidos · permanente
- Estado parcial de implementação · permanente
- Aceite de uma mudança da **Especificação do produto**: quem aprova, e sobre qual texto · nesta versão ⟸ [D08]
