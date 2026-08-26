No seu trabalho de especificar cada tarefas, desejo que sempre que for pedido uma nova atividade, o resultado do seu trabalho sera a criacao de um arquivo markdown (.md).

Esse arquivo deve ter o seguinte formato [025]-[feat]-[resumo].md Onde: 
-[025] eh o numero sequencial de tarefa, sempre com 3 digitos. 
    - esse controle sequencial sera feito por um arquivo chamado sequencial.md
    - neste arquivo tera apenas, ultima task: [002].
    - voce vai sempre usar o sequencial sequinte e incrementar o valor da ultima task.
-[feat] eh o tipo de tarefa (pode ser feat, fix, test) 
-[resumo] eh o resumo curto da tarefa, separado por hifens.

O local que o arquivo deve ser criado, sera na pasta .kiro/tasks

    voce tambem devera gerenciar o estado desses arquivos criados, ou seja, quando uma tarefa for finalizada, voce vai mover esse arquivo para uma pasta na mesma folder acima, chamado done/ , cuja o camiho eh .kiro/tasks/done

- sempre que voce criar uma nova task, voce me sinaliza para que eu possa revisar. apos eu dizer que esta ok e revisar. voce perguntar se ja pode ser feito o commit e push dela para o repositorio remoto.

#sobre a task que vai ser criada
 - No inicio da task, voce precisa colocar informacoes importantes sobre o nosso modelo de trabalho. vamos adotar um modelo feature/branch, ou seja, cada task tera o seu branch. O branch devera ter o nome das task e sempre derivar do branch ia-main. Ao criar a task, voce precisa especificar qual agent deve iniciar ela. 
- O agent que iniciar, devera inicialmente varificar se estamos no branch ia-main. caso nao esteje, deve informar e perguntar se podemos retornar para ele, antes de iniciar a task. 
- Apos ser autorizado, ele devera mover a task para pasta doing (.kiro/tasks/doing), fazer commit e push e criar o bfranch para iniciar a implementacao.
voce devera delegar a atividade para um desses agentes:
- po (.kiro/agents/po.json)
- dev (.kiro/agents/dev.json)
- devops (.kiro/agents/devops.json)
- qa (.kiro/agents/qa.json)