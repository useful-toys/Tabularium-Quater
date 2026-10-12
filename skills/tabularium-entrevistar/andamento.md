# O andamento

O andamento é o estado do que a ramificação da ideia não guarda: o objetivo da ideia, o que falta decidir e o que ficou de fora. O que já tem consenso está gravado em `specs/`, na ramificação, e não se repete aqui. O andamento é mostrado na conversa e, quando a ideia tem issue, é o corpo dela.

A notação é densa e hierárquica: títulos, uma coisa por linha, sub-itens para detalhar, sem prosa. As seções são sempre estas, nesta ordem:

```markdown
## Resumo
- Objetivo: o cliente desiste de um pedido sem falar com o atendimento
- Em discussão: o cancelamento de pedido já pago, e o aviso ao vendedor
- Ramificação: `31-cancelar-pedido` · prefixo: `31` · última rodada: 3

## Em aberto
- O cliente cancela um pedido já pago?
  - opção: sim, com reembolso
  - opção: não; pedido pago só admite devolução
  - sugestão: sim, com reembolso
  - Em quanto tempo sai o reembolso?
  - O reembolso é integral?
- O vendedor é avisado do cancelamento?

## Fora da ideia
- Recusado: o vendedor cancelar um pedido
- Já existe: "O cliente vê os seus pedidos" (`PED-V1.1`)
- Defeito: "O cliente recebe a confirmação do pedido" (`PED-R2.1`)
- Pendente: "O cliente vê o motivo do cancelamento" (`PED-V3.1`)
- Codificação: o nome da função de cancelamento
```

## Regras da notação

- **Resumo:** o objetivo, o que está em discussão e a ramificação. `Objetivo` diz, em palavras do negócio, para que a ideia serve, e não muda com as rodadas. `Em discussão` diz os assuntos de `Em aberto`, numa linha.
- **Ramificação:** o nome da ramificação da ideia, o prefixo dos códigos dela e o número da última rodada. É por essa linha que uma retomada acha onde continuar.
- **Em aberto:** toda pergunta ainda sem consenso, feita ou por fazer, na ordem em que será perguntada: a primeira é o próximo ponto. A pergunta que depende da resposta de outra é sub-item dela. A que já foi discutida leva as opções levantadas e a sua sugestão. Seção sem item fica vazia.
- **Fora da ideia:** o que o autor respondeu deixando de fora, como `Recusado: …`, inclusive a sugestão de `/tabularium-sugerir` que ele recusou; as partes com veredito já existe, defeito, pendente ou codificação; e a parte que saiu para uma issue própria, com o número dela.

O estado da ideia não está no andamento: está no rótulo da issue.
