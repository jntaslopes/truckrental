<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Agent Work Sync

Before executing any plan, update yourself on the real project context:

- Run `git status --short --branch`, confirm the current branch/worktree, and check whether there are commits ahead/behind.
- Confirm whether you are in the main worktree (`C:\projects\truckrental`) or in an auxiliary worktree. In an auxiliary worktree, work on a branch with the `codex/` prefix; when creating a new branch, use the highest existing number + 1 in the format `codex/codex-1`, `codex/codex-2`, `codex/codex-3`, etc., considering both local and remote branches, without reusing gaps. If there is no branch with an upstream, create one and publish it with `git push -u origin <branch>`. In the main worktree on `main`, a branch is not required.
- Canonical PowerShell command to calculate, create, and publish the next `codex/codex-*` branch:
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
- Run `git fetch origin` and check whether `origin/main` changed; incorporate those changes before implementing when necessary to work from the current base.
- Re-read the relevant files after any fetch/merge and before editing. The user may change files locally in parallel, with or without a commit.
- Do not assume Git contains the full context: uncommitted local changes are also a source of truth.
- Never discard the user's local changes. Before any pull/merge/rebase that could overwrite files, preserve the current state with a temporary commit, selective stash, or safety branch.
- Never create or switch branches in a way that discards local changes; preserve the state first.
- If the plan becomes outdated because of local or remote changes, adjust the plan before executing.
- Resolve merges and conflicts autonomously, preserving both local and remote intent whenever possible. The user will not resolve conflicts manually.
- Preserve Brazilian Portuguese text as UTF-8. Do not introduce mojibake; if you touch a file with mojibake, fix the affected text.

### Mandatory Sync Baseline

- The canonical source of updates is always `origin/main`.
- The updates to incorporate are always the ones from `origin/main`, not merely the current local branch or its upstream.
- In the main worktree on `main`, incorporate `origin/main` into the local `main` before implementing.
- In an auxiliary worktree on a working branch, incorporate `origin/main` into that working branch before implementing.
- In `detached HEAD`, do not continue into implementation from the detached commit. Create or attach a working branch first, then incorporate `origin/main` before continuing. `detached HEAD` is acceptable only for temporary inspection.
- `git fetch origin` only updates remote refs; it does not move the currently checked out worktree. Treat the worktree as updated only after `origin/main` has been incorporated into the checked out state without discarding local changes.
- Never use the generic instruction "update the worktree" without naming `origin/main` as the baseline to incorporate.

Decision rule:
- "Which updates should I pull in?" -> always `origin/main`.
- "What is the base for current work?" -> always `origin/main`.
- "Can I keep implementing in `detached HEAD` after fetch?" -> no; only temporary inspection is allowed.

## Browser Automation Policy

For any local navigation, inspection, visual validation, clicking, typing, screenshot capture, or manual UI testing task:

- The agent may use whichever available browser tool is most appropriate for the case.
- Choosing the browser tool is the agent's responsibility.
- The primary criterion is not the tool; it is validating in the browser and continuing to iterate until the result is identical to the approved reference.
- All local QA output must stay in temporary directories ignored by Git, preferably `.playwright-cli/`, `.playwright/`, `playwright-report/`, `test-results/`, and `.codex-artifacts/`. Do not write temporary evidence to versioned paths.

### Multi-agent Port Isolation

- In parallel execution with multiple agents, each agent must use an exclusive local port for its development server.
- An occupied port does not imply reuse. Only reuse it after confirming by process and by HTTP that the server belongs to the same worktree.
- Do not start a server on a port already occupied by another worktree; choose a different free port and record the port used in the summary.
- Suggested default allocation order without conflicts: `3000`, `3001`, `3002`, `3003`, and so on.

### npm run dev Restart Intent

- When the user's task implies `npm run dev`, treat that as authorization to get the correct dev server running without asking the user to stop stale processes manually.
- Start with `npm run dev`. If the wrapper reports that another Next dev server is already running and prints a PID, stop only that identified process with a precise command such as `Stop-Process -Id <pid> -Force` or `taskkill /PID <pid> /F`, then run `npm run dev` again.
- Preserve multi-agent isolation: do not stop servers owned by other worktrees. Only stop the reported PID when it is confirmed to belong to the same project/worktree, or when `scripts/codex-dev.mjs` itself identifies it as the blocking Next dev server for this project.
- If process ownership is ambiguous, inspect the PID, command line, and/or HTTP runtime identity before stopping it. If ambiguity remains, report the blocker instead of killing the process.
- In the final summary, record any PID stopped, the port selected, the validated URL, and the browser/tool used for validation when applicable.

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

- Every UI task must be validated in a browser.
- The comparison must be made against the relevant Figma frame/node or against the approved reference image for that task.
- Visual approval is viewport-specific. Pixel-perfect validation at one viewport does not validate any other breakpoint.
- If any visual difference remains, the task is not complete and the agent must keep iterating until the divergences are eliminated.
- Validation evidence is textual by default, with no mandatory screenshot or pixel-diff artifact unless explicitly requested.

### UI Execution SOP (Mandatory)

For every UI task, follow this operational SOP before declaring completion:

- **UI preflight (mandatory):**
  - Identify the current worktree before choosing the QA URL.
  - Verify the port that will be used and only reuse an occupied port after confirming by process and by HTTP that it belongs to the same worktree.
  - If there is no valid server for the current worktree, start a local server on a free port and confirm its identity before visual comparison.
- **Visual comparison protocol:**
  - Always compare the browser against the relevant Figma frame/node or the approved reference image before closing the task.
  - Use a URL explicitly validated for the current worktree.
  - After each relevant visual adjustment, reload and revalidate the same area.
- **Viewport and breakpoint policy:**
  - For responsive UI, validate at least desktop, tablet, and mobile unless the task defines a different breakpoint set.
  - If the user provides an image for a specific breakpoint, that breakpoint becomes the approval criterion.
  - Required breakpoint checks must be executed at explicit dimensions, never inferred from approximate window size or the current tab size.
  - When the task requires objective responsive validation, the agent must use a tool or surface that can explicitly set the viewport.
  - If the active browser surface cannot set viewport dimensions, the agent must switch to one that can or report breakpoint validation as blocked.
  - It is not allowed to claim desktop, tablet, or mobile as validated based only on inspection at the current tab size.
- **Browser-size awareness:**
  - The viewport is part of the acceptance criteria and must be reported in the completion summary.
  - The final summary must state which tool was used for validation.
  - The final summary must record the exact viewport for each approved check.
  - The final summary must list which breakpoints were actually validated and which were not, if any.
- **UI done criteria (blocking):**
  - Do not mark the task complete until all of the following are true: visual validation passed in a browser, `npm run lint` passed, `npm run build` passed, and breakpoint checks are listed objectively.
  - The task cannot be marked complete if any required breakpoint has not been validated at the exact size.
  - Lack of a resize API or explicit viewport control does not justify partial completion unless the item is recorded as an objective pending item or blocker.

### Reference Fallback Policy

- If Figma MCP is available, use the target node/frame context plus a screenshot as the primary reference.
- If Figma MCP is unavailable, use the user-provided image/screenshot as the temporary source of truth and state this explicitly in the completion summary.
- Default responsive validation set when the user does not specify another one: desktop `1440x900`, tablet `1024x768`, mobile `390x844`.
- The agent may autonomously choose any browser automation surface that exposes explicit viewport control.
- If the current surface does not expose viewport control, fallback is not "validate at the current tab size"; fallback is to switch tools or report the missing capability as a blocker.

### Browser Capability Note

- Browser Use/in-app browser may only be used for breakpoint approval when the session actually exposes viewport control.
- A limited Playwright surface without `setViewportSize` or equivalent does not satisfy the requirement for objective responsive breakpoint validation.

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
  - If the browser result differs from the approved reference in any way, the task is not finished and the agent must keep working until the difference is resolved.
  - The agent must not claim desktop, tablet, or mobile validation without recording the exact viewport used for each approved check.
  - The agent must report objective pending items, including the exact divergent property and where it occurs.
- **Mandatory pre-completion checklist for UI changes:**
  - Compare browser rendering versus Figma node/frame screenshot or approved reference image.
  - Validate: `font-family`, `font-size`, `font-weight`, `line-height`, `letter-spacing`, `color`.
  - Validate spacing and positioning against Figma frame geometry: gaps, paddings, alignments, dimensions, and positions.
  - Verify visibility for all relevant layers/properties and confirm no `border`, `shadow`, `background`, or text style was derived from hidden layers.
  - Verify that every rendered image has traceable origin to Figma and matches screenshot/content/crop/scale/placement.
  - Confirm compliance: UI task is only complete after browser validation achieves pixel-perfect fidelity and full visual match with the approved reference.
- **Tolerance:**
  - Zero tolerance. No visual deviation is allowed.
