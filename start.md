Antes de qualquer plano, atualize o contexto real do projeto e trabalhe sobre a versão mais nova. A fonte canônica de atualização é sempre `origin/main`.

Comece com `git status --short --branch`, confirme a branch/worktree atual e verifique se há commits ahead/behind.

No worktree principal em `main`, é permitido trabalhar direto na `main`. Rode `git fetch origin` e incorpore `origin/main` na `main` local antes de implementar se houver mudança. Se a `main` tiver mudanças locais antes dessa incorporação, preserve-as primeiro com commit temporário/checkpoint ou stash seletivo; nunca descarte trabalho local para atualizar.

Em worktree auxiliar, permaneça nessa worktree e não a apague. Antes de implementar qualquer nova solicitação/thread, a branch de trabalho é obrigatória: se a branch atual não for uma `codex/codex-*` válida com upstream, crie a próxima branch pelo comando canônico do `AGENTS.md`, usando sempre `max+1` considerando local e remoto, e publique com upstream. Depois disso, incorpore `origin/main` na branch de trabalho correta sem descartar mudanças locais. `git fetch origin` sozinho não move a worktree, e branch local ou upstream atual não substituem `origin/main` como base.

Em `detached HEAD`, não siga para implementação a partir desse commit solto. Crie ou associe uma branch de trabalho, incorpore `origin/main` nela e só então continue. `detached HEAD` serve apenas para inspeção temporária.

Regra de decisão:
- Quais atualizações pegar? Sempre `origin/main`.
- Posso seguir em `detached HEAD`? Apenas para inspeção, não para implementação.
- Posso trabalhar direto na `main`? Sim, quando ela for a branch/worktree atual; faça checkpoint commit local ao final da solicitação, sem push automático.
