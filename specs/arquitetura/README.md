<!-- gerado; não editar -->
# Arquitetura do Tabularium
Arquivos de texto num repositório público, levados ao repositório que adota o formato por uma skill que executa um script.

## [Distribuição](distribuicao.md)
Como o formato chega ao repositório que o adota e é mantido em dia.
- Instalador `INS`: Script que copia da linha principal, para o repositório que adota o formato, as Instruções para agentes, o Arquivo de convenções e os modelos dos arquivos que faltam.
- Manifesto de instalação `MAN`: Lista do que o Instalador copia, separando o que ele sobrescreve do que só cria.
- Skill de instalação `SKI`: Instruções que levam um agente de IA a executar o Instalador e a relatar o resultado.

## [Indexação](indexacao.md)
Como os índices de pasta de uma especificação são produzidos no repositório que adota o formato.
- Script de indexação `IDX`: Script que lê a pasta da especificação e grava o `README.md` de índice de cada pasta.
- Skill de indexação `SKX`: Instruções que levam um agente de IA a executar o Script de indexação e a relatar o que ficou sem indexar.

## [Sorteio](sorteio.md)
Como se obtém o código sorteado que serve de prefixo aos códigos de uma mudança sem issue.
- Script de sorteio `SOR`: Script que sorteia um código que ainda não aparece na pasta da especificação.
- Skill de sorteio `SKS`: Instruções que levam um agente de IA a decidir se a mudança pede um código sorteado e a executar o Script de sorteio.

## [Validação](validacao.md)
Como a forma de uma especificação é conferida no repositório que adota o formato.
- Script de validação `VAL`: Script que lê a pasta da especificação e acusa as violações de forma.
- Skill de validação `SKV`: Instruções que levam um agente de IA a executar o Script de validação e a corrigir o que ele acusa.
