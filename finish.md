Quando o usuário mencionar este arquivo, `[finish.md](finish.md)` ou pedir `finish`, execute este rito de finalização sem depender de novas instruções:

- Inspecione `git status --short --branch`, a branch/worktree atual e o escopo das mudanças.
- Rode as validações aplicáveis, pelo menos lint/build quando existirem.
- Faça commit do trabalho da branch/worktree atual.
- Faça push da branch de trabalho.
- Atualize a `main` com `origin/main`.
- Integre o trabalho na `main`, resolva conflitos autonomamente, valide de novo e faça push da `main`.
- Depois da integração, apague a branch de trabalho local e remota, exceto `main`.
- Não apague a worktree; preserve-a para próximas conversas.
