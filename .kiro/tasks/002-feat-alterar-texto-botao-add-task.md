# [002] - feat - Alterar texto do botão de adicionar tarefa

## Modelo de Trabalho

- **Branch model:** feature/branch — cada task tem seu próprio branch
- **Branch desta task:** `002-feat-alterar-texto-botao-add-task`
- **Branch base:** `ia-main` (o branch deve sempre derivar de `ia-main`)
- **Agent responsável por iniciar:** `dev` (`.kiro/agents/dev.json`)

### Instruções de início para o agent
1. Verificar se está no branch `ia-main`. Caso contrário, informar e perguntar se pode retornar para ele antes de iniciar.
2. Após autorizado, mover esta task para `.kiro/tasks/doing/`, fazer commit e push.
3. Criar o branch `002-feat-alterar-texto-botao-add-task` a partir de `ia-main` e iniciar a implementação.

---

## Descrição

Alterar o texto exibido no botão de submissão do formulário de adicionar tarefa, substituindo o texto em português pelo equivalente em inglês, alinhando a interface com o padrão de idioma desejado.

## Arquivo Alvo

- `client/src/components/AddTask.jsx`

## Critério de Aceite

- [ ] O botão que atualmente exibe o texto **"Adicionar Nova Tarefa"** deve passar a exibir **"Add New Task"**
- [ ] Nenhuma outra alteração visual ou funcional deve ser introduzida
- [ ] A aplicação deve compilar e funcionar corretamente após a mudança
- [ ] O botão deve continuar com as mesmas classes CSS (`btn btn-block success`)

## Detalhes Técnicos

**Localização do texto no código:**
```
Arquivo: client/src/components/AddTask.jsx
Linha:   62
Trecho atual:
  <button type="submit" className="btn btn-block success">
    Adicionar Nova Tarefa
  </button>

Trecho esperado:
  <button type="submit" className="btn btn-block success">
    Add New Task
  </button>
```

---

## Checklist do Agent DEV

> Marque cada item conforme for concluindo durante a implementação.

- [ ] Verificar se está no branch `ia-main`
- [ ] Mover esta task para `.kiro/tasks/doing/`, fazer commit e push
- [ ] Criar o branch `002-feat-alterar-texto-botao-add-task` a partir de `ia-main`
- [ ] Alterar o texto do botão em `client/src/components/AddTask.jsx` de `"Adicionar Nova Tarefa"` para `"Add New Task"`
- [ ] Verificar se a aplicação compila sem erros
- [ ] Confirmar que nenhuma outra alteração foi introduzida
- [ ] Fazer commit e push das alterações no branch da task
- [ ] Informar ao PO que a task está concluída e pronta para encerramento

> ⚠️ Ao finalizar todos os itens acima, avisar ao PO para que ele possa encerrar a task.

---

## Encerramento — Responsabilidade do PO

> O encerramento da task é **sempre responsabilidade do PO**. O agent DEV não deve mover a task para `done`.

Ao ser notificado pelo agent DEV, o PO deve:

- [ ] Verificar se todos os itens do checklist do DEV estão marcados
- [ ] Verificar se tudo foi implementado conforme o critério de aceite
- [ ] Confirmar que não há pendências ou itens em aberto
- [ ] Informar ao usuário que a task está finalizada
- [ ] Mover a task de `.kiro/tasks/doing/` para `.kiro/tasks/done/`
- [ ] Fazer commit e push final

---

## Tipo
`feat`

## Estimativa
Muito pequena — alteração pontual de string.
