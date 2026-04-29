import { execFileSync } from "node:child_process";

export type CodexRuntimeIdentity = {
  workspaceRoot: string;
  gitBranch: string;
  gitCommit: string;
  port: string;
  pid: number;
  startedAt: string;
};

type GitFallback = {
  gitBranch: string;
  gitCommit: string;
};

let gitFallbackCache: GitFallback | null = null;

function readGitValue(args: string[], fallback: string) {
  try {
    return execFileSync("git", args, {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return fallback;
  }
}

function getGitFallback() {
  if (gitFallbackCache) {
    return gitFallbackCache;
  }

  gitFallbackCache = {
    gitBranch: readGitValue(["rev-parse", "--abbrev-ref", "HEAD"], "unknown"),
    gitCommit: readGitValue(["rev-parse", "--short", "HEAD"], "unknown"),
  };

  return gitFallbackCache;
}

export function shouldExposeCodexRuntime() {
  return process.env.CODEX_DEV_RUNTIME === "1" || process.env.NODE_ENV !== "production";
}

export function getCodexRuntimeIdentity(): CodexRuntimeIdentity | null {
  if (!shouldExposeCodexRuntime()) {
    return null;
  }

  const fallback = getGitFallback();

  return {
    workspaceRoot: process.env.CODEX_WORKSPACE_ROOT ?? process.cwd(),
    gitBranch: process.env.CODEX_GIT_BRANCH ?? fallback.gitBranch,
    gitCommit: process.env.CODEX_GIT_COMMIT ?? fallback.gitCommit,
    port: process.env.CODEX_DEV_PORT ?? process.env.PORT ?? "unknown",
    pid: process.pid,
    startedAt: process.env.CODEX_DEV_STARTED_AT ?? "unknown",
  };
}
