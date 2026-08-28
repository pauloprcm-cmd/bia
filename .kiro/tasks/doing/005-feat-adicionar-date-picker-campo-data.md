# Task 005 - Adicionar Date Picker no Campo Data/Prazo

**Tipo:** feat  
**Agent Responsável:** dev  
**Status:** Pending

---

## Setup Inicial (Agent DEV)

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
   git mv .kiro/tasks/005-feat-adicionar-date-picker-campo-data.md .kiro/tasks/doing/005-feat-adicionar-date-picker-campo-data.md
   git add .kiro/tasks/sequencial.md
   git commit -m "chore: move task 005 to doing"
   git push origin ia-main
   
   # Criar worktree
   git worktree add .kiro/worktrees/005-feat-adicionar-date-picker-campo-data -b 005-feat-adicionar-date-picker-campo-data
   cd .kiro/worktrees/005-feat-adicionar-date-picker-campo-data
   ```

3. Agora você está no worktree isolado e pode começar a trabalhar

---

## Objetivo

Substituir o campo de texto "Data/Prazo" na tela home da BIA por um componente de calendário (date picker) que permita ao usuário selecionar a data de forma visual e intuitiva.

**Importante:** O banco de dados continua persistindo as datas como STRING, então o date picker deve converter a data selecionada para o formato string adequado antes de enviar para a API.

---

## Contexto

Atualmente, o campo "Data/Prazo" no componente `AddTask.jsx` é um input de texto simples com placeholder "Quando?". O usuário precisa digitar manualmente a data, o que pode gerar inconsistências de formato.

**Arquivo atual:** `client/src/components/AddTask.jsx`

**Formato esperado no banco:** String no formato `DD/MM/YYYY` (padrão pt-BR)

---

## Requisitos Funcionais

### 1. Implementar Date Picker
- [ ] Escolher e instalar uma biblioteca de date picker compatível com React (sugestões: `react-datepicker` ou similar)
- [ ] Substituir o input de texto atual por um componente de date picker
- [ ] Manter o label "Data/Prazo" e o placeholder visual adequado

### 2. Formatação de Data
- [ ] Configurar o date picker para exibir datas no formato `DD/MM/YYYY` (padrão brasileiro)
- [ ] Converter a data selecionada para string no formato `DD/MM/YYYY` antes de enviar ao backend
- [ ] Se nenhuma data for selecionada, usar a data atual como fallback (comportamento atual)

### 3. Experiência do Usuário
- [ ] O calendário deve abrir ao clicar no campo
- [ ] Deve ser possível navegar entre meses e anos
- [ ] A data selecionada deve ser exibida no campo de forma clara
- [ ] Manter a responsividade do formulário

### 4. Estilização
- [ ] O date picker deve seguir o tema visual atual da aplicação
- [ ] Respeitar o tema claro/escuro já implementado
- [ ] Garantir que o componente fique visualmente harmonioso com os demais campos

---

## Requisitos Técnicos

### Dependências
- [ ] Adicionar biblioteca de date picker ao `package.json` do client
- [ ] Importar e configurar a biblioteca no componente `AddTask.jsx`
- [ ] Adicionar estilos CSS necessários para o date picker

### Código
- [ ] Modificar o componente `AddTask.jsx`
- [ ] Manter a lógica de estado (`dia`, `setDia`)
- [ ] Garantir que o valor enviado no `onSubmit` continue sendo string no formato `DD/MM/YYYY`
- [ ] Não alterar a interface com a API ou o backend

### Validação
- [ ] A funcionalidade de adicionar tarefa deve continuar funcionando normalmente
- [ ] O formato da data deve ser consistente com o formato atual (`DD/MM/YYYY`)
- [ ] A data deve ser persistida corretamente no banco de dados como string

---

## Arquivos a Modificar

- `client/package.json` - Adicionar dependência do date picker
- `client/src/components/AddTask.jsx` - Implementar o date picker
- Possível arquivo CSS adicional para estilização do date picker

---

## Testes Manuais Necessários

### Cenário 1: Seleção de Data
1. [ ] Abrir a aplicação BIA
2. [ ] Clicar no campo "Data/Prazo"
3. [ ] Verificar que o calendário abre
4. [ ] Selecionar uma data
5. [ ] Verificar que a data é exibida no formato `DD/MM/YYYY`

### Cenário 2: Adicionar Tarefa com Data
1. [ ] Preencher o campo "Tarefa"
2. [ ] Selecionar uma data no date picker
3. [ ] Clicar em "Adicionar Nova Tarefa"
4. [ ] Verificar que a tarefa foi criada com a data selecionada
5. [ ] Verificar no banco de dados que a data está como string no formato correto

### Cenário 3: Adicionar Tarefa sem Selecionar Data
1. [ ] Preencher o campo "Tarefa"
2. [ ] NÃO selecionar data (deixar vazio)
3. [ ] Clicar em "Adicionar Nova Tarefa"
4. [ ] Verificar que a tarefa foi criada com a data atual

### Cenário 4: Tema Claro/Escuro
1. [ ] Testar o date picker no tema claro
2. [ ] Alternar para o tema escuro
3. [ ] Verificar que o date picker está visualmente adequado em ambos os temas

---

## Critérios de Aceite

- ✅ O campo "Data/Prazo" exibe um date picker ao ser clicado
- ✅ O usuário consegue selecionar datas de forma visual através do calendário
- ✅ A data selecionada é exibida no formato `DD/MM/YYYY`
- ✅ A data é persistida no banco de dados como STRING no formato `DD/MM/YYYY`
- ✅ O date picker respeita o tema claro/escuro da aplicação
- ✅ A funcionalidade de adicionar tarefa continua funcionando normalmente
- ✅ O componente é responsivo e se adapta a diferentes tamanhos de tela

---

## Observações Importantes

⚠️ **NÃO ALTERAR O BACKEND** - Esta task é exclusivamente de frontend. O backend já está preparado para receber datas como string.

⚠️ **MANTER COMPATIBILIDADE** - A data deve continuar sendo enviada como string no formato `DD/MM/YYYY` para manter compatibilidade com o banco de dados existente.

⚠️ **SIMPLICIDADE** - Escolher uma biblioteca leve e fácil de usar, priorizando simplicidade sobre recursos avançados (público-alvo: alunos em aprendizado).

---

## Finalização da Task

### Quando Concluir a Implementação
1. [ ] Marcar todos os itens do checklist como concluídos
2. [ ] Fazer commit final das mudanças no branch `005-feat-adicionar-date-picker-campo-data`
3. [ ] Fazer push do branch para o repositório remoto
4. [ ] **INFORMAR AO PO** que a task está pronta para revisão
5. [ ] **AGUARDAR** o PO mover a task para done e abrir o Pull Request

### O que o PO fará ao receber a task:
1. Revisar a implementação e verificar todos os critérios de aceite
2. Verificar se todos os itens do checklist estão marcados
3. Testar a funcionalidade manualmente
4. Se tudo estiver OK:
   - Mover a task para `.kiro/tasks/done/`
   - Fazer commit e push final
   - Abrir Pull Request do branch `005-feat-adicionar-date-picker-campo-data` contra `ia-main`
   - Comando: `gh pr create --base ia-main --head 005-feat-adicionar-date-picker-campo-data --title "feat: adicionar date picker no campo Data/Prazo" --body "Implementa calendário para seleção de data na tela home"`

---

## Referências

- Componente atual: `client/src/components/AddTask.jsx`
- Estado atual: Input de texto com `type="text"`
- Formato de data esperado: `DD/MM/YYYY` (padrão pt-BR)
- Banco de dados: Campo `dia_atividade` do tipo STRING

---

**Data de Criação:** 2026-08-28  
**Próxima Task:** 006
