<!-- gerado; não editar -->
# Arquitetura do Tabularium
Arquivos de texto num repositório público, levados ao repositório que adota o formato por uma skill que executa um script.

## [Alocação de códigos](alocacao.md)
Como se obtêm o código sorteado, que serve de prefixo aos códigos de uma mudança sem issue, e o número de ordem de cada código novo.
- Script de sorteio `SOR`: Script que sorteia um código que ainda não aparece na pasta da especificação.
- Script de próximo código `PRX`: Script que devolve o código seguinte ao maior já usado na pasta da especificação, para um tipo de código e um prefixo de mudança.
- Skill de alocação `SKS`: Instruções que levam um agente de IA a achar o prefixo de uma mudança, executando o Script de sorteio quando ela não tem issue, e a obter cada código novo do Script de próximo código.

## [Distribuição](distribuicao.md)
Como o formato chega ao repositório que o adota e é mantido em dia.
- Instalador `INS`: Script que copia da linha principal, para o repositório que adota o formato, as Instruções para agentes, o Arquivo de convenções e os modelos dos arquivos que faltam.
- Manifesto de instalação `MAN`: Lista do que o Instalador copia, separando o que ele sobrescreve do que só cria.
- Skill de instalação `SKI`: Instruções que levam um agente de IA a executar o Instalador e a relatar o resultado.

## [Indexação](indexacao.md)
Como os índices de pasta de uma especificação são produzidos no repositório que adota o formato.
- Script de indexação `IDX`: Script que lê a pasta da especificação e grava o `README.md` de índice de cada pasta.
- Skill de indexação `SKX`: Instruções que levam um agente de IA a executar o Script de indexação e a relatar o que ficou sem indexar.

## [Validação](validacao.md)
Como a forma de uma especificação é conferida no repositório que adota o formato.
- Script de validação `VAL`: Script que lê a pasta da especificação e acusa as violações de forma.
- Skill de validação `SKV`: Instruções que levam um agente de IA a executar o Script de validação e a corrigir o que ele acusa.
