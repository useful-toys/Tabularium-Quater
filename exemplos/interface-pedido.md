# Exemplo: a interface em torno do Pedido

Este é um trecho da interface do mesmo sistema de pedidos fictício do [exemplo do Pedido](pedido.md). O formato da interface é experimental e ainda não faz parte da definição do Tabularium. Numa especificação real, o primeiro bloco estaria em `specs/interface/_interface.md`, e os outros, no arquivo de uma área da interface.

```markdown
## Meios
- web: navegador, em qualquer largura
- terminal: 80 colunas ou mais

## Estilos
- cor de destaque: cor; marca a ação principal de cada componente
  - web: laranja da marca
  - terminal: amarelo
- cor de perigo: cor; marca a ação que não se desfaz
  - valor: vermelho

## Diretrizes
- [x] IFC-R1  Toda ação tem texto
- [ ] IFC-R2  Toda ação que não se desfaz segue **Confirmação**
- [ ] IFC-Q1  O retorno de uma ação aparece em até 200 ms
```

```markdown
## Confirmação  `CNF`
Pergunta feita ao ator antes de uma ação que não se desfaz.
- tipo: padrão
- [ ] CNF-R1  A pergunta diz a consequência, e não só o nome da ação
- [ ] CNF-R2  A ação de confirmar usa a **cor de perigo**
- [ ] CNF-R3  O foco inicial fica na ação de desistir ⟸ [D12]

## Diálogo de cancelamento  `DCA`
Diálogo em que o **Cliente** confirma o cancelamento de um **Pedido**.
- tipo: diálogo
- partes: pergunta, aviso de estorno, ação de desistir, ação de cancelar o pedido
- segue **Confirmação**
- realiza: [PED-C2]
- [ ] DCA-R1  O aviso de estorno só aparece quando o **Pedido** já foi pago
- [ ] DCA-I1  Desistir
  - o diálogo fecha, e nada muda
  - web: também ao clicar fora do diálogo
  - terminal: também com `Esc`
```

## Como ler

- **Meios.** Onde a interface aparece. Cada produto declara os seus.
- **Estilos.** Convenções visuais com nome e papel. O valor entra quando é compromisso, e pode mudar de um meio para outro. Um estilo é citado em negrito, como um termo.
- **Diretrizes.** Afirmações que valem para a interface inteira, de sigla `IFC`.
- **Padrão.** O bloco `Confirmação` não tem partes: é uma solução que vários componentes seguem.
- **Componente.** O bloco `Diálogo de cancelamento` é um conjunto de controles coordenados para um objetivo. Os controles aparecem em `partes:` e não ganham bloco próprio.
- **Modelo.** `tipo:` diz o que o bloco é, `segue` aponta o padrão, e `realiza:` aponta a afirmação da especificação que o componente apresenta. A especificação nunca aponta de volta.
- **Afirmações.** R é diretriz, sempre verdadeira; Q é qualidade, com número e unidade; I é interação, o que o ator faz, com a resposta do produto nos sub-itens.
- **Variação por meio.** O sub-item que começa pelo nome de um meio vale só nele.

Não há telas: o que se descreve é o componente, que aparece em mais de uma. A regra de que um pedido pago é estornado ao ser cancelado continua na célula `Pedido`, porque valeria em qualquer meio; aqui só fica como ela se apresenta.

A legenda completa está em [`specs/interface/_convencoes.md`](../specs/interface/_convencoes.md).
