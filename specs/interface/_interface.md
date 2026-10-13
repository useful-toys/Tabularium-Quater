# Interface do Tabularium
O produto não tem tela própria: quem o usa conversa com um agente de IA, que executa as skills e mostra o que os scripts imprimem.

## Meios
- conversa: troca de mensagens com um agente de IA, em texto com Markdown
- terminal: linhas de texto que os scripts imprimem, lidas pelo agente ou por quem os executa

## Diretrizes
- [x] IFC-Rtt9n.1  Cada processo começa por um comando de barra, com `tabularium-` e o verbo do processo, como `/tabularium-entrevistar`
- [x] IFC-Rtt9n.2  O que o produto mostra na conversa é Markdown, com um título por rodada, por pergunta ou por sugestão
- [x] IFC-Rtt9n.3  O título de uma pergunta traz a posição dela e o total da rodada, como `Pergunta 2/4`
- [x] IFC-Rtt9n.4  Cada pergunta é mostrada em quatro partes, nesta ordem: `Contexto`, `Exemplo`, `Recomendação` e `Pergunta`
- [x] IFC-Rtt9n.5  As perguntas são mostradas uma por vez, e a seguinte só depois da resposta
- [x] IFC-Rtt9n.6  O que está na especificação é citado pelo nome, com o código entre parênteses
- [x] IFC-Rtt9n.7  A **afirmação**, que não tem nome, é citada pelo texto da **Linha**, encurtado se for longo
- [x] IFC-Rtt9n.8  A confirmação que encerra uma **Entrevista** ou faz uma **Entrega** é pedida numa pergunta só para isso
- [x] IFC-Rtt9n.9  O resumo de uma rodada gravada lista cada item com o que foi feito dele
- [x] IFC-Rtt9n.10  As **Sugestões** são mostradas de uma vez, da mais ligada ao que complementam para a menos
- [x] IFC-Rtt9n.11  No terminal, cada script imprime uma linha por item tratado
