# [002] feat - Checkbox "Importante" marcado por padrão no cadastro de tarefas

## Descrição
Na tela de cadastro de tarefas, o checkbox "Importante" deve vir marcado por padrão ao abrir o formulário. O usuário ainda poderá desmarcá-lo manualmente se desejar.

## Contexto
Atualmente, no componente `AddTask.jsx`, o estado inicial do campo `importante` é `false`, fazendo com que o checkbox apareça desmarcado. A mudança é simples e localizada: apenas o valor inicial do estado precisa ser alterado.

## Critérios de Aceite

- [ ] Ao abrir o formulário de cadastro de tarefas, o checkbox "Importante" deve estar **marcado (checked)** por padrão
- [ ] O usuário deve conseguir **desmarcar** o checkbox normalmente
- [ ] Após salvar uma tarefa, o formulário deve ser resetado com o checkbox voltando a ficar **marcado** (padrão)
- [ ] Nenhum outro comportamento do formulário deve ser alterado

## Escopo Técnico

**Arquivo a ser alterado:**
- `client/src/components/AddTask.jsx`

**Alteração esperada:**
```jsx
// Antes
const [importante, setImportante] = useState(false);

// Depois
const [importante, setImportante] = useState(true);
```

**Atenção:** O reset após o submit também deve usar `true` (e não `false`):
```jsx
// Antes
setImportante(false);

// Depois
setImportante(true);
```

## O que NÃO deve ser alterado
- Layout ou estilo do formulário
- Lógica de validação
- Demais campos do formulário
- Comportamento da API

## Tipo
`feat` — melhoria de UX no formulário de cadastro

## Prioridade
Baixa — mudança simples de comportamento padrão
