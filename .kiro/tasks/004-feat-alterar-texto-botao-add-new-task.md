# [004] feat: Alterar texto do botão "Add New Task" para "Adicionar Nova Tarefa"

## Informações da Task

- **Branch base:** `ia-main`
- **Branch da feature:** `004-feat-alterar-texto-botao-add-new-task`
- **Tipo:** feat
- **Agente responsável:** dev

---

## Contexto

O botão de adicionar tarefa no frontend exibe atualmente o texto em inglês "Add New Task". O objetivo é traduzir esse texto para português, alinhando com o padrão do projeto.

- **Arquivo:** `client/src/components/AddTask.jsx`
- **Texto atual:** `Add New Task`
- **Texto desejado:** `Adicionar Nova Tarefa`

---

## Instruções de Início (Agente dev)

Antes de iniciar a implementação, o agente **dev** deve:

1. - [ ] Verificar se está no branch `ia-main`:
   ```bash
   git branch
   ```
2. - [ ] Caso **não** esteja no `ia-main`, informar ao usuário e perguntar se pode retornar para ele antes de prosseguir.
3. - [ ] Após autorizado, mover esta task para a pasta `doing`:
   ```bash
   git mv .kiro/tasks/004-feat-alterar-texto-botao-add-new-task.md .kiro/tasks/doing/004-feat-alterar-texto-botao-add-new-task.md
   ```
4. - [ ] Fazer commit e push da movimentação:
   ```bash
   git add .kiro/tasks/doing/004-feat-alterar-texto-botao-add-new-task.md
   git commit -m "[004] chore: move task 004 para doing"
   git push origin ia-main
   ```
5. - [ ] Criar e mudar para o branch da feature a partir do `ia-main`:
   ```bash
   git checkout ia-main
   git checkout -b 004-feat-alterar-texto-botao-add-new-task
   git push -u origin 004-feat-alterar-texto-botao-add-new-task
   ```

---

## Checklist de Implementação (Agente dev)

- [ ] Localizar o arquivo `client/src/components/AddTask.jsx`
- [ ] Alterar o texto `Add New Task` para `Adicionar Nova Tarefa`
- [ ] Verificar se há outros arquivos com o mesmo texto em inglês e corrigir se necessário
- [ ] Garantir que a aplicação compila sem erros após a alteração
- [ ] Fazer commit da alteração no branch da feature:
  ```bash
  git add client/src/components/AddTask.jsx
  git commit -m "[004] feat: altera texto do botao de 'Add New Task' para 'Adicionar Nova Tarefa'"
  git push origin 004-feat-alterar-texto-botao-add-new-task
  ```
- [ ] Informar ao PO que a task está concluída e pode ser encerrada

---

## Encerramento (Agente PO)

Quando o agente **dev** informar que concluiu, o PO deve:

- [ ] Verificar se todos os itens do checklist foram marcados
- [ ] Confirmar que a alteração foi implementada corretamente no arquivo `AddTask.jsx`
- [ ] Mover a task de `doing` para `done`:
  ```bash
  git mv .kiro/tasks/doing/004-feat-alterar-texto-botao-add-new-task.md .kiro/tasks/done/004-feat-alterar-texto-botao-add-new-task.md
  ```
- [ ] Fazer commit e push final:
  ```bash
  git add .kiro/tasks/done/004-feat-alterar-texto-botao-add-new-task.md
  git commit -m "[004] chore: move task 004 para done"
  git push origin 004-feat-alterar-texto-botao-add-new-task
  ```
- [ ] Abrir Pull Request do branch da feature contra `ia-main`:
  ```bash
  gh pr create --base ia-main --head 004-feat-alterar-texto-botao-add-new-task --title "[004] feat: altera texto do botao Add New Task para Adicionar Nova Tarefa" --body "Traduz o texto do botão de adicionar tarefa de inglês para português, alinhando com o padrão do projeto."
  ```
- [ ] Informar ao usuário que a task foi finalizada e o PR foi aberto
