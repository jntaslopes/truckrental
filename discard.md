Quando o usuário mencionar este arquivo, `[discard.md](discard.md)` ou pedir `discard`, execute este rito de descarte sem depender de novas instruções:

- Inspecione `git status --short --branch`, a branch/worktree atual e o escopo das mudanças.
- Confirme que não haverá merge, PR ou push de commits.
- "Sem subir nada" significa sem push de conteúdo; a única operação remota permitida é `git push --delete` para fechar branch remota de trabalho.
- Se estiver em branch de trabalho (qualquer branch diferente de `main`):
- Descarte mudanças locais rastreadas com `git reset --hard HEAD`.
- Descarte mudanças locais não rastreadas com `git clean -fd`.
- Atualize referências remotas com `git fetch origin`.
- Garanta retorno para `main` atualizada com `origin/main`, sem levar alterações da branch descartada.
- Exclua a branch de trabalho local.
- Se houver upstream da branch de trabalho, exclua a branch remota correspondente com `git push --delete`.
- Se estiver em `main`:
- Nunca apague a `main`.
- Aplique apenas descarte local (`git reset --hard HEAD` e `git clean -fd`) sem remover branch.
- Não apague a worktree; preserve-a para próximas conversas.

Casos esperados após o rito:

- Branch de trabalho com mudanças não commitadas: mudanças descartadas e branch de trabalho local/remota encerradas.
- Branch de trabalho sem upstream remoto: branch local encerrada sem erro, sem tentativa de exclusão remota inválida.
- Execução em `main`: apenas limpeza local, com `main` preservada.
- Worktree auxiliar: branch encerrada e worktree preservada.
