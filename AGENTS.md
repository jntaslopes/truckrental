<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Agent Work Sync

Antes de executar qualquer plano, atualize o contexto real do projeto:

- Rode `git status --short --branch`, confira a branch/worktree atual e veja se há commits ahead/behind.
- Confira se está no worktree principal (`C:\projects\truckrental`) ou em uma worktree auxiliar. Em worktree auxiliar, trabalhe em branch com prefixo `codex/`; ao criar uma branch nova, use o maior número existente + 1 no formato `codex/codex-1`, `codex/codex-2`, `codex/codex-3`, etc., considerando branches locais e remotas (sem reutilizar lacunas). Se não houver branch com upstream, crie uma e publique com `git push -u origin <branch>`. No worktree principal em `main`, branch não é obrigatória.
- Comando canônico (PowerShell) para calcular, criar e publicar a próxima branch `codex/codex-*`:
  ```powershell
  $refs = git for-each-ref --format='%(refname:short)' `
    refs/heads/codex/codex-* `
    refs/remotes/origin/codex/codex-* 2>$null
  $max = ($refs |
    ForEach-Object { if ($_ -match 'codex/codex-(\d+)$') { [int]$Matches[1] } } |
    Measure-Object -Maximum).Maximum
  if ($null -eq $max) { $max = 0 }
  $next = "codex/codex-$($max + 1)"
  git switch -c $next
  git push -u origin $next
  ```
- Rode `git fetch origin` e verifique se `origin/main` mudou; incorpore essas mudanças antes de implementar quando isso for necessário para trabalhar sobre a base atual.
- Releia os arquivos relevantes depois do fetch/merge e antes de editar. O usuário pode alterar arquivos localmente em paralelo, com ou sem commit.
- Não presuma que o Git contém todo o contexto: mudanças locais não commitadas também são fonte de verdade.
- Nunca descarte mudanças locais do usuário. Antes de pull/merge/rebase que possa sobrescrever arquivos, preserve o estado atual com commit temporário, stash seletivo ou branch de segurança.
- Nunca crie ou troque branch descartando mudanças locais; preserve o estado primeiro.
- Se o plano ficar desatualizado por mudanças locais ou remotas, ajuste o plano antes de executar.
- Resolva merges e conflitos de forma autônoma, preservando a intenção local e remota sempre que possível. O usuário não fará resolução manual.
- Preserve texto em PT-BR como UTF-8. Não introduza mojibake; se tocar em um arquivo com mojibake, corrija o trecho afetado.

## Browser Automation Policy

Para qualquer tarefa de navegação, inspeção, validação visual, clique, digitação, captura de tela ou teste manual de UI em ambiente local:

- Prefira a skill/plugin `Browser Use` para `localhost`, `127.0.0.1`, `::1`, `file://` e aba atual do app quando a tarefa exigir navegação manual, inspeção visual interativa, clique, digitação, captura de tela ou uso explícito do browser no app.
- `Playwright` está permitido no fluxo normal do projeto para QA automatizado local, regressão visual assistida, coleta de logs e verificação repetível de UI, desde que não substitua pedidos explícitos de uso do browser no app.
- Em pedidos explícitos de browser, não substituir `Browser Use` por shell, Playwright ou navegação web genérica.
- Toda saída local de QA deve ficar em diretórios temporários ignorados pelo Git, preferencialmente `.playwright-cli/`, `.playwright/`, `playwright-report/`, `test-results/` e `.codex-artifacts/`. Não gravar evidências temporárias em caminhos versionados.

### Multi-agent Port Isolation

- Em execução paralela com múltiplos agents, cada agent deve usar porta local exclusiva para servidor de desenvolvimento.
- Não iniciar servidor em porta já ocupada; escolher outra porta livre e registrar a porta usada no resumo.
- Ordem padrão sugerida para alocação sem conflito: `3000`, `3001`, `3002`, `3003` e assim por diante.
- Se já existir servidor ativo para o mesmo escopo do agent, reutilizar esse servidor na porta já alocada em vez de subir outro na mesma porta.

## Project Figma Source

Official design source:
https://www.figma.com/design/1wk9mJMKUrlcO6Q7PkgSCW/Truck-Rental-LP?node-id=0-1&t=pV9fzLt2bjqH3LrS-1

Always use the screens in this Figma file as the source of truth before changing UI, layout, visual assets, visible copy, spacing, colors, or components.

When Figma MCP is available, fetch the relevant node with `get_design_context` and capture a screenshot before implementing visual changes. If the design uses assets, download them from Figma or reuse existing files in `public/assets/figma/`.

Document any intentional deviation from the Figma design in the change summary.

## Figma Fidelity Contract (Pixel-Perfect Mandatory)

For any UI implementation or visual update, Figma is mandatory and non-negotiable. Agents are not authorized to reinterpret design decisions when Figma already defines them.

- **Precedence order (must be followed exactly):**
  1. Visual match between browser rendering and the target Figma node/frame screenshot (or approved print fallback) (approval gate).
  2. Figma `Text Style` and tokens: `font-family`, `font-weight`, `font-size`, `line-height`, `letter-spacing`, `color`.
  3. Frame geometry and layout: spacing, gaps, paddings, alignment, dimensions, and positioning.
- **Prohibited behaviors:**
  - Do not replace typography, colors, or spacing values when they already exist in Figma.
  - Do not make "approximate" style adjustments.
  - Do not introduce unsolicited visual "improvements".
- **Implementation autonomy with accountability:**
  - The agent chooses the technical implementation path.
  - Completion is allowed only when the result is pixel-perfect against Figma (or approved print fallback) and all validation gates pass.

### Browser Validation Gate

- Browser visual validation is mandatory for 100% of UI tasks, but the tool is not fixed. Prefer `Browser Use` when manual inspection helps and use `Playwright` when automation is more effective.
- A UI task can only be marked as complete after rendering the implemented screen in a browser and comparing it against the corresponding Figma node/frame screenshot, regardless of whether the validation used `Browser Use`, `Playwright`, or both.
- The agent must iterate on fixes until visual divergences are zero.
- Validation evidence is textual by default (no mandatory screenshot or pixel-diff artifact unless explicitly requested).

### UI Execution SOP (Mandatory)

For every UI task, follow this operational SOP before declaring completion:

- **UI preflight (mandatory):**
  - Check whether a local dev server for the target URL/port is already active before visual QA.
  - If already running, reuse it (do not restart by default).
  - If not running, start it with `npm run dev -- --port <default-port>` and confirm HTTP access before visual comparison.
  - Execute visual QA in a browser using the method that best supports pixel-perfect validation; prefer `Browser Use` for manual inspection and `Playwright` for automated verification.
- **Port policy and fallback:**
  - Em modo multi-agent, cada agent deve alocar porta exclusiva antes de iniciar o dev server.
  - Ordem padrão de alocação: `3000`, `3001`, `3002`, `3003` e seguintes; se houver porta explícita no contexto do agent (por exemplo `3017`), priorizá-la desde que esteja livre.
  - If the current in-app browser URL is valid for the requested screen, treat it as the primary source.
- **Visual comparison protocol:**
  - Always compare browser rendering against the target Figma node/frame or user-approved print before closing the task, using `Browser Use`, `Playwright`, or both as needed.
  - After each CSS/TSX visual adjustment, reload and revalidate the same crop/area.
- **Viewport and breakpoint policy:**
  - For responsive UI, validate at least desktop, tablet, and mobile.
  - If the user provides a print from a specific breakpoint, that breakpoint becomes an approval gate.
  - If the user provides multiple breakpoint prints, validate each one explicitly.
- **Browser-size awareness:**
  - Browser width/height materially changes layout and comparison outcomes; treat viewport as part of the acceptance criteria.
  - Report which viewports were validated in the completion summary.
- **UI done criteria (blocking):**
  - Do not mark complete before all are true: visual validation passed in a browser, `npm run lint` passed, `npm run build` passed, and breakpoint checks are listed objectively.

### Reference Fallback Policy

- If Figma MCP is available, use target node/frame context plus screenshot as the primary reference.
- If Figma MCP is unavailable, use the user-provided print as temporary source of truth and state this explicitly in the completion summary.
- Default responsive validation set (when user does not specify): desktop `1440x900`, tablet `1024x768`, mobile `390x844`.
- The agent may resize viewport autonomously to cover required breakpoints without waiting for extra user instruction.

### MCP Connectivity Retry Gate

- Do not declare MCP unavailability after a single failed attempt.
- Before fallback, the agent must run a short retry sequence (up to 3 attempts) with brief intervals.
- When multiple equivalent MCP/connectors exist for the same source, the agent must try alternatives before declaring failure.
- For Figma tasks, if reading the target node fails, the agent must also try one known node/frame in the same file to distinguish node-level failure from connection-level failure.
- Fallback to print/manual reference is allowed only after the retry gate is exhausted.
- Completion summary must include objective MCP attempt evidence:
  - MCP/connector tried
  - attempt count
  - short error outcome per attempt
  - final decision (`MCP active` or `fallback used`)

### Visibility Contract

- If a node (or any visual property in it) is invisible in Figma (`visible=false`), it must not be implemented in the target state.
- The same rule applies to invisible `fill`, `stroke`, `effect`, `text decoration`, or equivalent style properties: do not implement them.
- Do not add preventive/placeholder markup or CSS for hidden parts.
- Implement only the requested target frame/state. Hidden elements from non-requested variants remain out of scope.

### Image Asset Contract

- If Figma defines an image asset for the target frame/state, implement exactly that asset (same content, crop, scale, and placement).
- Never invent or replace defined Figma assets with AI-generated images, stock photos, alternative illustrations, simulated gradients, or final placeholders.
- Asset source priority: direct export from Figma first, then matching existing file in `public/assets/figma/` for the same node.
- Before declaring any image-asset blocker, the agent must try all available MCPs and retrieval paths. Do not stop after the first failure.
- If all attempts fail, report each attempted path/MCP and outcome, then block completion with objective pending items (affected node/frame and expected asset).

- **Blocking delivery policy:**
  - If any visual divergence exists between implementation and Figma/print, the task must not be marked as complete.
  - If any structural divergence exists from Figma tokens or geometry/layout, the task must not be marked as complete.
  - If any hidden element is implemented in the target state, the task must not be marked as complete.
  - If a defined Figma image asset is not used or is replaced by invented imagery, the task must not be marked as complete.
  - The agent must report objective pending items, including the exact divergent property and where it occurs.
- **Mandatory pre-completion checklist for UI changes:**
  - Compare browser rendering versus Figma node/frame screenshot.
  - Validate: `font-family`, `font-size`, `font-weight`, `line-height`, `letter-spacing`, `color`.
  - Validate spacing and positioning against Figma frame geometry: gaps, paddings, alignments, dimensions, and positions.
  - Verify visibility for all relevant layers/properties and confirm no `border`, `shadow`, `background`, or text style was derived from hidden layers.
  - Verify that every rendered image has traceable origin to Figma and matches screenshot/content/crop/scale/placement.
  - Confirm compliance: UI task is only complete after browser validation achieves pixel-perfect fidelity, with `Browser Use` recommended for explicit in-app browser requests and `Playwright` allowed when it is the more effective path.
- **Tolerance:**
  - Zero tolerance. No visual deviation is allowed.
