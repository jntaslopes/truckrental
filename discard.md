Quando o usuário mencionar este arquivo, `[discard.md](discard.md)` ou pedir `discard`, execute este rito de descarte sem depender de novas instruções:

- Inspecione `git status --short --branch`, a branch/worktree atual e o escopo das mudanças.
- Confirme que não haverá merge, PR ou push de commits.
- "Sem subir nada" significa sem push de conteúdo; a única operação remota permitida é `git push --delete` para fechar branch remota de trabalho.
- Se o usuário pedir para reverter "o último ajuste", prefira reverter o checkpoint commit correspondente em vez de usar reset/checkout/clean destrutivo.
- Se estiver em branch de trabalho (qualquer branch diferente de `main`):
  - Descarte mudanças locais rastreadas com `git reset --hard HEAD` somente quando o pedido for descartar a branch inteira, não apenas reverter um checkpoint específico.
  - Descarte mudanças locais não rastreadas com `git clean -fd` somente quando o pedido for descartar a branch inteira.
  - Atualize referências remotas com `git fetch origin`.
  - Garanta retorno para `main` atualizada com `origin/main`, sem levar alterações da branch descartada.
  - Exclua a branch de trabalho local.
  - Se houver upstream da branch de trabalho, exclua a branch remota correspondente com `git push --delete`.
- Se estiver em `main`:
  - Nunca apague a `main`.
  - Trate descarte direto na `main` com cautela porque checkpoints locais podem conter trabalho recuperável.
  - Para desfazer um ajuste específico, prefira `git revert` do checkpoint correspondente.
  - Aplique descarte local destrutivo (`git reset --hard HEAD` e `git clean -fd`) apenas quando o usuário pedir explicitamente para limpar mudanças locais não commitadas da `main`.
- Não apague a worktree; preserve-a para próximas conversas.

Casos esperados após o rito:

- Branch de trabalho com mudanças não commitadas e pedido de descarte total: mudanças descartadas e branch de trabalho local/remota encerradas.
- Branch de trabalho sem upstream remoto: branch local encerrada sem erro, sem tentativa de exclusão remota inválida.
- Reversão de último ajuste: checkpoint commit revertido, preservando histórico recuperável.
- Execução em `main`: `main` preservada; preferir revert de checkpoint para desfazer trabalho commitado.
- Worktree auxiliar: branch encerrada e worktree preservada.
