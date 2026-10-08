# O plano

O plano é o estado de uma ideia: o que já tem consenso, o que falta decidir e o que ficou de fora. Ele é mostrado na conversa e é o que `/tabularium-registrar` grava no corpo da issue.

A notação é densa e hierárquica: títulos, uma coisa por linha, sub-itens para detalhar, sem prosa. As seções são sempre estas, nesta ordem:

```markdown
## Resumo
- Proposto: o cliente cancela um pedido ainda não enviado, e é reembolsado
- Em discussão: o cancelamento de pedido já pago
- Estado: em discussão · última rodada: 3

## Mudanças

### Produto
1. Acrescentar em Pedido (`PED`)
   - [ ] PED-R?  **Pedido** enviado não pode ser cancelado ⟸ [D?a]
2. Mudar o significado de "Cancelar um pedido" (`PED-C4`)
   - lápide `removida` em [PED-C4]
   - [ ] PED-C?  Cancelar um **Pedido**
     - exige: pedido ainda não enviado · sem objeção
3. Termo novo, na linguagem de Vendas
   - reembolso: devolução ao **Cliente** do valor de um **Pedido** cancelado
4. Abrir pergunta
   - P?  Em quanto tempo o reembolso é pago? · sobre: **Pedido**

### Arquitetura
5. Acrescentar em Avisos (`AVI`)
   - [ ] AVI-R?  O aviso de cancelamento sai pelo **Serviço de e-mail**

### Interface

## Decisões
- D?a  Um pedido enviado pode ser cancelado? · Não.
  - contexto: depois do envio, o pedido está com a transportadora
  - descartada: cancelar com devolução pelo correio
    - motivo do autor: o custo do frete de volta
    - motivo, sugerido e aceito: a devolução já cobre esse caso
  - ganha: o cancelamento nunca envolve frete
  - aceita: o cliente espera a entrega para devolver

## Em aberto
- O cliente cancela um pedido já pago?
  - opção: sim, com reembolso
  - opção: não; pedido pago só admite devolução
  - sugestão: sim, com reembolso

## Fora do plano
- Já existe: "O cliente vê os seus pedidos" (`PED-V1`)
- Defeito: "O cliente recebe a confirmação do pedido" (`PED-R2`)
- Pendente: "O cliente vê o motivo do cancelamento" (`PED-V3`)
- Codificação: o nome da função de cancelamento

## Para retomar
- Próximo ponto: o cliente cancela um pedido já pago?
```

## Regras da notação

- **Resumo:** o que está proposto, o que está em discussão e o estado. O estado traz o rótulo e o número da última rodada.
- **Mudanças:** cada linha na redação final, como será escrita, agrupada por registro. O código novo aparece sem número: `PED-R?`, `P?`, `D?a`. Seção de registro sem mudança fica vazia.
- **`· sem objeção`:** no fim da linha que você adotou e o autor ainda não confirmou.
- **Decisões:** a questão, a resposta numa frase só, o contexto, cada alternativa descartada com os motivos, o que se ganha e o que se aceita. O motivo diz a origem: "motivo do autor", quando ele o disse, ou "motivo, sugerido e aceito", quando a sugestão foi sua.
- **Em aberto:** o que ainda não virou mudança, com as opções levantadas e a sua sugestão.
- **Fora do plano:** as partes com veredito já existe, defeito, pendente ou codificação, e o que foi adiado.
- **Para retomar:** o próximo ponto.

A ideia rejeitada guarda o motivo no Resumo: `- Estado: rejeitada · motivo: contraria a regra de pedido entregue, e o autor preferiu mantê-la`.
