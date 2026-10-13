<!-- gerado; não editar -->
# Decisões do sistema

- [D95](D95-quem-aciona-skill.md) Quem pode acionar cada skill? A skill que altera arquivos escritos à mão ou acessa a rede só é acionada por uma pessoa, e a que só lê ou só grava arquivos gerados também pode ser acionada pelo agente.
  - citada por: SKS-Ibvc2.1, SKI-I1, SKX-I23.1, SKV-I1
- [D99](D99-genericos-da-propria-specs.md) Os arquivos genéricos distribuídos têm cópia própria? Não, são os da própria pasta da especificação do formato.
  - citada por: ARQ-R2
- [D100](D100-modelos-em-branco.md) Como se distribuem os arquivos que cada repositório preenche? Como modelos em branco, que o instalador cria só onde o arquivo ainda não existe.
  - citada por: ARQ-R4, INS-Rp7zm.5
- [D101](D101-modelos-das-pastas-experimentais.md) Os modelos cobrem a arquitetura e a interface? Sim, cobrem a versão inicial de todo arquivo que o repositório preenche.
  - citada por: ARQ-R4
- [D102](D102-configuracao-fora-da-raiz.md) Onde ficam o manifesto e a configuração? Na pasta da especificação, e os de instalação na pasta do instalador, nunca soltos na raiz do repositório.
  - citada por: ARQ-R3
- [D103](D103-sem-versoes.md) O formato tem versões? Por ora, não: vale sempre a linha principal.
  - citada por: ARQ-R1
- [D104](D104-node-sem-dependencias.md) Em que os scripts são escritos? Em Node.js, só com o que vem com ele.
  - citada por: Script de sorteio, Script de próximo código, Instalador, Script de indexação, Script de validação
- [D108](D108-script-dentro-da-skill.md) Como o script chega a quem usa a skill? Dentro da pasta da skill.
  - citada por: SKS-R22.1, SKS-Rbvc2.1, SKI-R1, SKI-Rp7zm.2, SKX-R23.1, SKV-R1, D23.5
- [D109](D109-formato-cetico.md) O que o agente faz quando o formato da arquitetura ou da interface encaixa mal? Avisa o usuário uma vez por tipo de problema, e o usuário decide entre forçar o encaixe e anotá-lo em achados, com ou sem issue.
  - citada por: ARQ-R5
