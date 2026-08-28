# Regras de Git Worktree - Projeto BIA

## O que é Git Worktree?

Git worktree permite ter múltiplos branches checados simultaneamente em diretórios separados. Isso é essencial para trabalhar com múltiplos agents sem que eles alterem arquivos uns dos outros.

**Conceito baseado em:** Claude Code, Codex e [banteg/agents workflow](https://github.com/banteg/agents)

## Estrutura de Pastas

### Localização dos Worktrees
- **Pasta:** `.kiro/worktrees/` (dentro da pasta .kiro do projeto)
- **Padrão de nome:** `.kiro/worktrees/<nome-da-task>`
- **Exemplo:** `.kiro/worktrees/002-feat-alterar-texto-botao`

### GitIgnore
A pasta `.kiro/worktrees/` DEVE estar no `.gitignore` para não ser commitada:

```
# Git Worktrees (agents)
.kiro/worktrees/
```

## Workflow Completo

### 1. Criação de Task com Worktree

Quando uma nova task for criada, o PO deve:

1. **Criar o arquivo da task** em `.kiro/tasks/`
2. **Atualizar o sequencial.md**
3. **Indicar na task** que o agent responsável deve criar o worktree

**Template para incluir na task:**

```markdown
## Setup Inicial (Agent Responsável)

### Pré-requisitos
1. Verificar se está no branch `ia-main`:
   ```bash
   git branch --show-current
   ```
   - Se NÃO estiver em `ia-main`, INFORMAR e PERGUNTAR se pode retornar antes de continuar

2. Após autorização, executar:
   ```bash
   # Garantir que está em ia-main
   git checkout ia-main
   git pull origin ia-main
   
   # Mover task para doing
   git mv .kiro/tasks/<TASK_FILE>.md .kiro/tasks/doing/<TASK_FILE>.md
   git add .kiro/tasks/sequencial.md
   git commit -m "chore: move task <TASK_NUMBER> to doing"
   git push origin ia-main
   
   # Criar worktree
   git worktree add .kiro/worktrees/<TASK_NAME> -b <TASK_NAME>
   cd .kiro/worktrees/<TASK_NAME>
   ```

3. Agora você está no worktree isolado e pode começar a trabalhar
```

### 2. Durante o Desenvolvimento

O agent trabalha **dentro do worktree**:
- Path: `.kiro/worktrees/<task-name>/`
- Branch: `<task-name>`
- Commits normais no branch

**Comandos úteis:**
```bash
# Ver todos os worktrees
git worktree list

# Voltar para o diretório principal (se necessário)
cd ../..
```

### 3. Finalização da Task

Quando o agent finalizar:

1. **Fazer commit e push final** do branch da feature
2. **Informar ao PO** que a task está pronta
3. **NÃO remover o worktree ainda** - PO fará isso

### 4. Processo do PO ao Finalizar

Quando informado que a task está pronta, o PO deve:

```bash
# 1. Voltar para ia-main (se não estiver)
git checkout ia-main

# 2. Verificar se tudo foi implementado
# (revisar código, checklist, etc.)

# 3. Mover task para done
git mv .kiro/tasks/doing/<TASK_FILE>.md .kiro/tasks/done/<TASK_FILE>.md
git add .
git commit -m "chore: task <TASK_NUMBER> completed"
git push origin ia-main

# 4. Abrir Pull Request do worktree
cd .kiro/worktrees/<TASK_NAME>
gh pr create --base ia-main --head <TASK_NAME> --title "<Título da PR>" --body "<Descrição>"

# 5. Após PR ser MERGEADA pelo usuário, limpar worktree
cd ../..
git worktree remove .kiro/worktrees/<TASK_NAME>
git branch -d <TASK_NAME>  # Remove branch local
git push origin --delete <TASK_NAME>  # Remove branch remoto (se necessário)
```

## Comandos Essenciais

### Criar Worktree
```bash
git worktree add .kiro/worktrees/<task-name> -b <task-name>
```

### Listar Worktrees
```bash
git worktree list
```

### Remover Worktree
```bash
# Remover worktree
git worktree remove .kiro/worktrees/<task-name>

# Ou forçar remoção (se houver mudanças não commitadas)
git worktree remove --force .kiro/worktrees/<task-name>

# Limpar referências órfãs
git worktree prune
```

### Verificar Status
```bash
# Ver branch atual
git branch --show-current

# Ver worktrees ativos
git worktree list
```

## Vantagens do Worktree

✅ **Isolamento total** - Cada agent trabalha em seu próprio diretório  
✅ **Sem conflitos** - Mudanças não afetam outros agents  
✅ **Velocidade:** Sem necessidade de fazer stash/checkout constante  
✅ **Organização:** Estrutura clara com `.kiro/worktrees/`  
✅ **GitIgnore:** Worktrees não são commitados  

## Troubleshooting

### Worktree não remove
```bash
# Forçar remoção
git worktree remove --force .kiro/worktrees/<task-name>
git worktree prune
```

### Ver worktrees órfãos
```bash
git worktree list
# Procurar por paths que não existem mais
```

### Branch não deleta
```bash
# Forçar delete local
git branch -D <task-name>

# Forçar delete remoto
git push origin --delete <task-name> --force
```

## Checklist de Implementação

### Para o PO ao criar task:
- [ ] Criar arquivo da task
- [ ] Atualizar sequencial.md
- [ ] Incluir seção de setup do worktree na task
- [ ] Commit e push

### Para o Agent ao iniciar:
- [ ] Verificar branch ia-main
- [ ] Mover task para doing
- [ ] Criar worktree
- [ ] Entrar no worktree
- [ ] Começar desenvolvimento

### Para o PO ao finalizar:
- [ ] Revisar implementação
- [ ] Mover task para done
- [ ] Abrir PR
- [ ] Aguardar merge da PR
- [ ] Remover worktree
- [ ] Remover branch (local e remoto se necessário)

## Importante

⚠️ **NUNCA remover worktree antes da PR ser mergeada**  
⚠️ **SEMPRE verificar se está no worktree correto antes de fazer commits**  
⚠️ **SEMPRE fazer push antes de remover o worktree**  
⚠️ **PR deve SEMPRE ser contra `ia-main`, NUNCA contra `main`**

## Referências

Workflow inspirado em:
- [banteg/agents](https://github.com/banteg/agents) - Bunny-approved agent workflows
- [Claude Code Worktree Guide](https://gist.github.com/owainlewis/58ee5ef6c0ac24db4db9c4e71f01ae94)
- Git oficial: `man git-worktree`

*Content was rephrased for compliance with licensing restrictions*
