<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Agent Work Sync

Antes de executar qualquer plano, atualize o contexto real do projeto:

- Rode `git status --short --branch`, confira a branch/worktree atual e veja se há commits ahead/behind.
- Confira se está no worktree principal (`C:\projects\truckrental`) ou em uma worktree auxiliar. Em worktree auxiliar, trabalhe em branch com prefixo `codex/`; ao criar uma branch nova, use o menor número incremental disponível no formato `codex/codex-1`, `codex/codex-2`, `codex/codex-3`, etc., considerando branches locais e remotas. Se não houver branch com upstream, crie uma e publique com `git push -u origin <branch>`. No worktree principal em `main`, branch não é obrigatória.
- Rode `git fetch origin` e verifique se `origin/main` mudou; incorpore essas mudanças antes de implementar quando isso for necessário para trabalhar sobre a base atual.
- Releia os arquivos relevantes depois do fetch/merge e antes de editar. O usuário pode alterar arquivos localmente em paralelo, com ou sem commit.
- Não presuma que o Git contém todo o contexto: mudanças locais não commitadas também são fonte de verdade.
- Nunca descarte mudanças locais do usuário. Antes de pull/merge/rebase que possa sobrescrever arquivos, preserve o estado atual com commit temporário, stash seletivo ou branch de segurança.
- Nunca crie ou troque branch descartando mudanças locais; preserve o estado primeiro.
- Se o plano ficar desatualizado por mudanças locais ou remotas, ajuste o plano antes de executar.
- Resolva merges e conflitos de forma autônoma, preservando a intenção local e remota sempre que possível. O usuário não fará resolução manual.
- Preserve texto em PT-BR como UTF-8. Não introduza mojibake; se tocar em um arquivo com mojibake, corrija o trecho afetado.

## Project Figma Source

Official design source:
https://www.figma.com/design/1wk9mJMKUrlcO6Q7PkgSCW/Truck-Rental-LP?node-id=0-1&t=pV9fzLt2bjqH3LrS-1

Always use the screens in this Figma file as the source of truth before changing UI, layout, visual assets, visible copy, spacing, colors, or components.

When Figma MCP is available, fetch the relevant node with `get_design_context` and capture a screenshot before implementing visual changes. If the design uses assets, download them from Figma or reuse existing files in `public/assets/figma/`.

Document any intentional deviation from the Figma design in the change summary.
