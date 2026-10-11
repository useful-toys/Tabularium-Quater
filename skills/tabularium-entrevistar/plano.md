# O plano

O plano é o estado do que a ramificação da ideia não guarda: o que falta decidir, o que ficou de fora e por onde retomar. O que já tem consenso está gravado em `specs/`, na ramificação, e não se repete aqui. O plano é mostrado na conversa e é o que `/tabularium-registrar` grava no corpo da issue.

A notação é densa e hierárquica: títulos, uma coisa por linha, sub-itens para detalhar, sem prosa. As seções são sempre estas, nesta ordem:

```markdown
## Resumo
- Proposto: o cliente cancela um pedido ainda não enviado, e é reembolsado
- Em discussão: o cancelamento de pedido já pago
- Estado: em discussão · última rodada: 3
- Ramificação: `31-cancelar-pedido` · prefixo: `31`

## Em aberto
- O cliente cancela um pedido já pago?
  - opção: sim, com reembolso
  - opção: não; pedido pago só admite devolução
  - sugestão: sim, com reembolso

## Fora do plano
- Já existe: "O cliente vê os seus pedidos" (`PED-V1.1`)
- Defeito: "O cliente recebe a confirmação do pedido" (`PED-R2.1`)
- Pendente: "O cliente vê o motivo do cancelamento" (`PED-V3.1`)
- Codificação: o nome da função de cancelamento

## Para retomar
- Próximo ponto: o cliente cancela um pedido já pago?
```

## Regras da notação

- **Resumo:** o que está proposto, o que está em discussão, o estado e a ramificação. O estado traz o rótulo e o número da última rodada. `Proposto` conta, em palavras do negócio, o que a ramificação já gravou.
- **Ramificação:** o nome da ramificação da ideia e o prefixo dos códigos dela. É por essa linha que uma retomada acha onde continuar.
- **Em aberto:** o que ainda não tem consenso, com as opções levantadas e a sua sugestão. Seção sem item fica vazia.
- **Fora do plano:** as partes com veredito já existe, defeito, pendente ou codificação, e o que foi adiado.
- **Para retomar:** o próximo ponto.

A ideia rejeitada guarda o motivo no Resumo: `- Estado: rejeitada · motivo: contraria a regra de pedido entregue, e o autor preferiu mantê-la`.
