Quando o usuário mencionar este arquivo, `[finish.md](finish.md)` ou pedir `finish`, execute este rito de finalização sem depender de novas instruções:

- Inspecione `git status --short --branch`, a branch/worktree atual e o escopo das mudanças.
- Rode as validações aplicáveis, pelo menos lint/build quando existirem.
- Faça commit do trabalho da branch/worktree atual somente se ainda houver mudanças não commitadas. Se a solicitação já terminou com checkpoint commit, reaproveite esse commit e crie outro apenas para mudanças adicionais.
- Se estiver em branch de trabalho, faça push dela; se estiver direto na `main`, faça push da `main`.
- Antes de atualizar ou integrar, preserve mudanças locais não commitadas; nunca use reset/checkout/clean para descartá-las.
- Atualize a `main` com `origin/main`.
- Se houver branch de trabalho, integre-a na `main`; se o trabalho já estiver na `main`, apenas valide de novo. Resolva conflitos autonomamente preservando o trabalho local e remoto, depois faça push da `main`.
- Depois da integração, apague a branch de trabalho local e remota, exceto `main`. Se não houve branch de trabalho, não apague nada.
- Não apague a worktree; preserve-a para próximas conversas.

Checkpoint commit não é `finish`: ao terminar uma solicitação normal, faça apenas o commit local na branch atual. Não faça push, merge para `main`, limpeza de branch ou exclusão de worktree sem pedido explícito ou sem este rito de `finish`.
