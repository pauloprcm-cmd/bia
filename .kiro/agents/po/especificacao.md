No seu trabalho de especificar cada tarefas, desejo que sempre que for pedido uma nova atividade, o resultado do seu trabalho sera a criacao de um arquivo markdown (.md).

Esse arquivo deve ter o seguinte formato [025]-[feat]-[resumo].md Onde: 
-[025] eh o numero sequencial de tarefa, sempre com 3 digitos. 
    - esse controle sequencial sera feito por um arquivo chamado sequencial.md
    - neste arquivo tera apenas, ultima task: [002].
    - voce vai sempre usar o sequencial sequinte e incrementar o valor da ultima task.
-[feat] eh o tipo de tarefa (pode ser feat, fix, test) 
-[resumo] eh o resumo curto da tarefa, separado por hifens.

#sobre a task que vai ser criada
 - No inicio da task, voce precisa colocar informacoes importantes sobre o nosso modelo de trabalho. vamos adotar um modelo feature/branch com git worktrees, ou seja, cada task tera o seu branch em um worktree isolado. O branch devera ter o nome da task e sempre derivar do branch ia-main. Ao criar a task, voce precisa especificar qual agent deve iniciar ela. 
- O agent que iniciar, devera inicialmente verificar se estamos no branch ia-main. caso nao esteja, deve informar e perguntar se podemos retornar para ele, antes de iniciar a task. 
- Apos ser autorizado, ele devera:
    1. Mover a task para pasta doing (.kiro/tasks/doing)
    2. Fazer commit e push dessas mudanças
    3. Criar o worktree usando: `git worktree add .kiro/worktrees/<TASK_NAME> -b <TASK_NAME>`
    4. Entrar no worktree: `cd .kiro/worktrees/<TASK_NAME>`
    5. Começar a implementacao dentro do worktree isolado

voce devera delegar a atividade para um desses agentes:
- po (.kiro/agents/po.json)
- dev (.kiro/agents/dev.json)
- devops (.kiro/agents/devops.json)
- qa (.kiro/agents/qa.json)

O local que o arquivo deve ser criado, sera na pasta .kiro/tasks

    voce tambem devera gerenciar o estado desses arquivos criados, ou seja, quando uma tarefa for finalizada, voce vai mover esse arquivo para uma pasta na mesma folder acima, chamado done/ , cuja o camiho eh .kiro/tasks/done

- sempre que voce criar uma nova task, voce me sinaliza para que eu possa revisar. apos eu dizer que esta ok e revisar. voce pergunta se ja pode ser feito o commit e push dela para o repositorio remoto(Lembre de fazer commit e push da task e do sequencial).

- Sempre que criar a task, voce precisa ter claro o checklist de atividades de cada agent. 
    - Uma etapa obrigatoria nesse checklist e de marcar as atividades a medida que elas forem concluidas, ou seja, durante o processo de implementacao. 
    - Na Task precisa estar claro que SEMPRE que ira finalizar a task e mover ela para done seja voce(PO).
    - Coloque uma etapa na task, informando que quando os agentes concluirem as tarefas, precisam dizer que ela precisa ser passada para voce para que possa ser encerrada. 
    - precisa estar documentado essas etapa do que voce devera fazer ao final. 
        - Ver se tudo foi implementado.
        - Ver se todos os itens das task foram marcados como check.
        - Tudo estando ok, voce vai me informar que esta finalizado, mover a task para done(.kiro/tasks/done) e fazer commit e push final.
        - Apos o commit e push final, voce PO devera abrir um Pull Request do branch da feature contra o branch 'ia-main' usando o comando `gh pr create`.
            - O PR deve SEMPRE ser aberto do branch da feature (ex: `002-feat-alterar-texto-botao-add-task`) contra `ia-main`.
            - NUNCA abrir PR contra `main` ou qualquer outro branch que nao seja `ia-main`.
            - Exemplo do comando: `gh pr create --base ia-main --head <branch-da-feature> --title "<titulo>" --body "<descricao>"`
