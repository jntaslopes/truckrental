Quando o usuário mencionar este arquivo, `[finish.md](finish.md)` ou pedir `finish`, execute este rito de finalização sem depender de novas instruções:

- Inspecione `git status --short --branch`, a branch/worktree atual e o escopo das mudanças.
- Rode as validações aplicáveis, pelo menos lint/build quando existirem.
- Faça commit do trabalho da branch/worktree atual.
- Se estiver em branch de trabalho, faça push dela; se estiver direto na `main`, faça push da `main`.
- Antes de atualizar ou integrar, preserve mudanças locais não commitadas; nunca use reset/checkout/clean para descartá-las.
- Atualize a `main` com `origin/main`.
- Se houver branch de trabalho, integre-a na `main`; se o trabalho já estiver na `main`, apenas valide de novo. Resolva conflitos autonomamente preservando o trabalho local e remoto, depois faça push da `main`.
- Depois da integração, apague a branch de trabalho local e remota, exceto `main`. Se não houve branch de trabalho, não apague nada.
- Não apague a worktree; preserve-a para próximas conversas.
