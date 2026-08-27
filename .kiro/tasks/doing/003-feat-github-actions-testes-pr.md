# [003] - feat - GitHub Actions para executar testes a cada PR

## Modelo de Trabalho

- **Branch model:** feature/branch — cada task tem seu próprio branch
- **Branch desta task:** `003-feat-github-actions-testes-pr`
- **Branch base:** `ia-main` (o branch deve sempre derivar de `ia-main`)
- **Agent responsável por iniciar:** `devops` (`.kiro/agents/devops.json`)

### Instruções de início para o agent
1. Verificar se está no branch `ia-main`. Caso contrário, informar e perguntar se pode retornar para ele antes de iniciar.
2. Após autorizado, mover esta task para `.kiro/tasks/doing/`, fazer commit e push.
3. Criar o branch `003-feat-github-actions-testes-pr` a partir de `ia-main` e iniciar a implementação.

---

## Descrição

Criar um workflow de GitHub Actions que execute automaticamente os testes unitários do projeto BIA a cada Pull Request aberto contra o branch `ia-main`. O objetivo é garantir que nenhuma alteração introduza regressões nos testes existentes antes de ser integrada.

## Contexto dos Testes

O projeto já possui uma suíte de testes unitários configurada:

- **Framework:** Jest 27.5.1
- **Comando:** `npm test` (executa `jest tests/unit`)
- **Localização dos testes:** `tests/unit/controllers/`
  - `versao.test.js` — testa o controller de versão
  - `tarefas.test.js` — testa o controller de tarefas (com mocks, sem dependência de banco)
- **Importante:** Os testes são **unitários com mocks**, portanto **não precisam de banco de dados** para rodar no CI.

## Arquivo a ser criado

- `.github/workflows/tests.yml`

## Critério de Aceite

- [x] O workflow deve ser disparado em Pull Requests abertos contra o branch `ia-main`
- [x] O workflow deve instalar as dependências com `npm install`
- [x] O workflow deve executar `npm test` com sucesso
- [x] O workflow deve utilizar Node.js compatível com o projeto (verificar versão no Dockerfile ou package.json — usar Node 18 ou 20)
- [x] O workflow deve falhar o PR caso algum teste não passe
- [x] Nenhuma configuração de banco de dados deve ser necessária (testes são unitários com mocks)
- [x] O arquivo deve ser criado no caminho `.github/workflows/tests.yml`

## Detalhes Técnicos

**Estrutura esperada do workflow:**

```yaml
name: Testes Unitários

on:
  pull_request:
    branches:
      - ia-main

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout do código
        uses: actions/checkout@v4

      - name: Configurar Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Instalar dependências
        run: npm install

      - name: Executar testes unitários
        run: npm test
```

> ⚠️ O agent DEVOPS deve verificar a versão do Node.js usada no `Dockerfile` do projeto e ajustar o `node-version` conforme necessário antes de criar o arquivo.

---

## Checklist do Agent DEVOPS

> Marque cada item conforme for concluindo durante a implementação.

- [x] Verificar se está no branch `ia-main`
- [x] Mover esta task para `.kiro/tasks/doing/`, fazer commit e push
- [ ] Criar o branch `003-feat-github-actions-testes-pr` a partir de `ia-main`
- [x] Verificar a versão do Node.js no `Dockerfile` do projeto
- [ ] Criar o diretório `.github/workflows/` caso não exista
- [ ] Criar o arquivo `.github/workflows/tests.yml` com o workflow configurado
- [ ] Verificar se o arquivo está sintaticamente correto (YAML válido)
- [ ] Confirmar que o workflow aponta para o branch `ia-main` como trigger
- [ ] Fazer commit e push das alterações no branch da task
- [ ] Informar ao PO que a task está concluída e pronta para encerramento

> ⚠️ Ao finalizar todos os itens acima, avisar ao PO para que ele possa encerrar a task.

---

## Encerramento — Responsabilidade do PO

> O encerramento da task é **sempre responsabilidade do PO**. O agent DEVOPS não deve mover a task para `done`.

Ao ser notificado pelo agent DEVOPS, o PO deve:

- [ ] Verificar se todos os itens do checklist do DEVOPS estão marcados
- [ ] Verificar se tudo foi implementado conforme o critério de aceite
- [ ] Confirmar que não há pendências ou itens em aberto
- [ ] Informar ao usuário que a task está finalizada
- [ ] Mover a task de `.kiro/tasks/doing/` para `.kiro/tasks/done/`
- [ ] Fazer commit e push final
- [ ] Abrir Pull Request do branch da feature contra `ia-main` usando o comando `gh pr create`
  - O PR deve SEMPRE ser aberto do branch `003-feat-github-actions-testes-pr` contra `ia-main`
  - NUNCA abrir PR contra `main` ou qualquer outro branch que não seja `ia-main`
  - Exemplo: `gh pr create --base ia-main --head 003-feat-github-actions-testes-pr --title "[003] feat: GitHub Actions para executar testes a cada PR" --body "<descricao>"`

---

## Tipo
`feat`

## Estimativa
Pequena — criação de um arquivo YAML de workflow.
