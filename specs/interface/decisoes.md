# Decisões sobre como representar a interface

Este arquivo é informal e não faz parte do formato. Ele guarda a memória das decisões tomadas na conversa de 7 de outubro de 2026 entre Daniel e o Claude. Não segue o formato das decisões de `specs/decisoes/`, não tem código `Dnn` e não é citado por nenhum item.

Cada entrada diz quem decidiu. "Daniel" é decisão dele; "proposta do Claude, aceita" é algo que o Claude recomendou e o Daniel aprovou.

## Sobre o formato

### 1. Pasta experimental, com a gramática da especificação

Proposta do Claude, aceita. `specs/interface/`, com legenda e instruções próprias, como a arquitetura.

### 2. A unidade é o componente, e não a tela

Daniel. As telas têm componentes em comum, e a interface pode ser web, desktop ou terminal.

### 3. O nome da unidade é "componente", e "controle" é a parte

Daniel. O Claude tinha recomendado "controle", pela distinção do Delphi entre `TComponent` e `TControl`. O Daniel recusou: controle sugere um item específico da tela, e o componente é um conjunto de controles coordenados para um objetivo.

- Descartado: "widget" (estrangeirismo, sugere peça pequena), "elemento" (não diz nada), "padrão" (já é a marca do ator padrão).
- Consequência: a palavra tem dois sentidos, um aqui e outro na arquitetura. Cada pasta define o seu; onde uma cita a outra, qualifica.

### 4. Vocabulário fixo na legenda

Daniel pediu; a lista é proposta do Claude, aceita. As palavras não levam negrito.

- Como o vocabulário colide com termos de algum produto, as palavras genéricas foram trocadas por outras mais raras: "listagem" em vez de "coleção", "marcação" em vez de "seleção", "notificação" em vez de "aviso". As três colidiam com células do Iconula.
- "Ação" em vez de "botão", porque no terminal é uma tecla. "Situação" em vez de "estado", que na especificação é atributo de célula.

### 5. A fronteira com a especificação é o teste da troca de meio

Proposta do Claude, aceita. A afirmação que continuaria verdadeira se o produto trocasse de meio é da especificação; a que não, é da interface.

- Descartado: deixar tudo nas células; migrar inteiras para a interface as células que são interface.

### 6. Componente, padrão e diretriz

Proposta do Claude, aceita. Componente é bloco com partes; padrão é bloco sem partes; diretriz é afirmação global.

### 7. O leitor é quem implementa

Proposta do Claude, aceita. Entra o que impede duas telas de resolverem a mesma coisa de dois jeitos. Por isso existe a linha `local:`.

### 8. Há uma forma de documentar estilos, e eles são citáveis

Daniel. O Claude tinha proposto só papéis nomeados; o Daniel pediu uma forma de documentar as convenções de estilo e de fazer referência a elas.

- Forma, proposta do Claude, aceita: seção `Estilos`, com nome e papel obrigatórios e valor opcional, citados em negrito.
- Só a interface cita estilos; a especificação do produto, não. Proposta do Claude, aceita.

### 9. Cada produto declara os seus meios

Proposta do Claude, aceita. Lista livre em `_interface.md`; a variação vai em sub-item com o nome do meio.

### 10. Sem composição de telas

Proposta do Claude, aceita. Fica no código, e observa-se no experimento se a falta dói.

### 11. Sem wireframe, por ora

Daniel. É decisão, e não esquecimento: foco na simplicidade do experimento, amadurecer e incrementar sob necessidade.

### 12. Necessidade não prevista vai ao humano

Daniel. Se surge uma necessidade que o formato não trata, o agente a apresenta ao humano, que decide se o formato evolui. Vale também para a arquitetura, que já tinha a regra.

### 13. As afirmações levam `[x]` e `[ ]`

Proposta do Claude, aceita. Cada diretriz precisa ser verificável.

### 14. Papéis R, Q e I, e as linhas de modelo

Proposta do Claude, aceita. Diretriz, qualidade e interação; `tipo:`, `partes:`, `situações:`, `usa`, `segue`, `realiza:` e `local:`; sigla global `IFC`.

### 15. Decisões e perguntas dentro da pasta experimental

Proposta do Claude, aceita, para a interface e para a arquitetura. `decisoes/` e `_perguntas.md` moram na própria pasta, com os códigos `Dnn` e `Pnn` da sequência do produto.

- Descartado: `specs/decisoes/interface/`. Exigiria mudar a definição do formato, porque uma decisão que só a interface cita é órfã pelas regras de hoje, e a limpeza a apagaria.
- Aceita-se: essas decisões ficam sem checagem do validador.

### 16. Componente com o nome de uma célula

Proposta do Claude, aceita. O componente recebe o mesmo nome e outra sigla, e o caso entra nos achados como célula candidata a migrar.

- Descartado: dar outro nome ao componente, que seria um sinônimo.

### 17. O teste do que entra tem três perguntas

Proposta do Claude, aceita. Vale em mais de um lugar; o ator teria de reaprender; é compromisso com alguém de fora.

### 21. Tipos gerais e tipos da aplicação

Daniel, depois da conversão do Iconula. A lista de tipos da legenda só serviu a 4 de 14 componentes, e o Claude propôs tirar a linha `tipo:`. O Daniel preferiu o contrário:

- região, grupo, painel e seletor entram na lista de tipos da legenda;
- a aplicação pode definir tipos próprios, num bloco, e os componentes desse tipo herdam as afirmações dele. É reuso, nas palavras dele: como componentes customizados definidos pela aplicação.

Complementos do Claude, aceitos: a linha `tipo:` é opcional num componente e é omitida quando nenhum tipo serve; o tipo da aplicação é citado em negrito; o padrão continua existindo, porque o tipo diz o que o componente é (um só) e o padrão diz um comportamento que ele segue (vários).

## Sobre o experimento

### 18. O experimento é no Iconula, e fica no Iconula

Daniel. A especificação de interface gerada mora no repositório do Iconula, e não aqui. Aqui ficam a legenda, as instruções, estes dois arquivos e um exemplo fictício.

### 19. Primeiro um recorte

Proposta do Claude, aceita. Cabeçalho, menu de ações, avisos e identidade visual. O que não couber fica de fora e entra numa lista de achados.

### 20. Só viram decisão os registros que têm alternativa

Proposta do Claude, aceita. Dos registros de decisão de interface do Iconula, convertem-se os que fundamentam um item do recorte e trazem alternativa descartada.
