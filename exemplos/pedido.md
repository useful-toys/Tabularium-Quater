# Exemplo: a célula Pedido

Esta é a célula Pedido, de um sistema de pedidos fictício. Numa especificação real, ela estaria dentro do arquivo de uma área, ao lado das células relacionadas.

```markdown
## **Pedido**  `PED`
Solicitação de compra de um **Cliente**, com os **Produtos** e as quantidades escolhidas.
- pertence a 1 **Cliente**; inverso: 0..N
- **situação**: aberto | aguardando pagamento | pago | cancelado; inicial: aberto
- **total**: dinheiro; derivado: soma de preço × quantidade dos **Itens de pedido**
- evento: **Pedido pago**
- [x] PED-R1.1  Visível só ao **Cliente** dono e ao **Atendente** ⟸ [D7.1]
- [x] PED-R2.1  Ao **Cliente excluído**: pedidos em aberto são cancelados
- [x] PED-C1.1  Fechar o pedido
  - exige: ao menos um item
  - se algum **Produto** está sem estoque: o fechamento é recusado com aviso ⟵ [P3.1]
  - a situação passa a aguardando pagamento
- [ ] PED-C2.1  Cancelar o pedido
  - se já foi pago: o pagamento é estornado
```

## Como ler

- **Título e definição.** O nome, em negrito, a sigla e uma frase que diz o que a célula é.
- **Modelo.** As linhas sem identificador: do que a célula é feita e a que se liga.
- **Eventos.** Os fatos que ela produz e aos quais outras células reagem.
- **Afirmações.** As linhas com identificador: regras (R), capacidades (C), visões (V) e outras. `[x]` quer dizer que o produto já cumpre; `[ ]`, que ainda não.
- **Critérios.** Os sub-itens de uma capacidade: `exige:` é pré-condição, `se …:` é exceção, e sem prefixo é resultado.
- **Marcas.** O negrito marca termo: no título e no começo de uma linha de modelo ou de evento, o termo que ali é definido; no meio do texto, um termo definido em outro lugar. `⟸ [D7.1]` aponta a decisão que justifica a linha, e `⟵ [P3.1]`, uma pergunta ainda aberta.

Não há subtítulos nem prosa além da definição. O significado vem da posição e da forma de cada linha.

O [guia](../GUIA.md#o-bloco-de-célula) explica cada parte em detalhe.
