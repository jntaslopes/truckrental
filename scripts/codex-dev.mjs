import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const workspaceRoot = process.cwd();
const requested = parseArgs(process.argv.slice(2));
const requestedPort = requested.port ?? 3000;
const passthroughArgs = requested.rest;
const gitBranch = readGitValue(["rev-parse", "--abbrev-ref", "HEAD"], "unknown");
const gitCommit = readGitValue(["rev-parse", "--short", "HEAD"], "unknown");

main().catch((error) => {
  console.error(`[codex-dev] ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});

async function main() {
  for (let port = requestedPort; port < requestedPort + 25; port += 1) {
    const owner = await inspectPort(port);

    if (!owner) {
      startDevServer(port);
      return;
    }

    const runtime = await readRuntimeIdentity(port);
    if (runtime && matchesCurrentRuntime(runtime, port)) {
      logReusedServer(
        port,
        owner,
        `validated by runtime identity (${runtime.gitBranch}@${runtime.gitCommit})`,
      );
      return;
    }

    if (owner.commandLine && containsWorkspace(owner.commandLine)) {
      logReusedServer(port, owner, "matched by process ownership for this worktree");
      return;
    }

    const ownerLabel = owner.commandLine
      ? owner.commandLine.replace(/\s+/g, " ").trim()
      : `PID ${owner.pid}`;
    console.log(`[codex-dev] Port ${port} is occupied by another worktree. Skipping. (${ownerLabel})`);
  }

  throw new Error(`No free or reusable port found between ${requestedPort} and ${requestedPort + 24}.`);
}

function logReusedServer(port, owner, reason) {
  const url = `http://127.0.0.1:${port}`;
  const pidLabel = Number.isFinite(owner?.pid) ? ` PID ${owner.pid}.` : "";

  console.log(`[codex-dev] Reusing dev server at ${url}; automatic reuse ${reason}.${pidLabel}`);

  if (Number.isFinite(owner?.pid)) {
    console.log(
      `[codex-dev] If you want to restart it, stop the current process first: Stop-Process -Id ${owner.pid}`,
    );
  } else {
    console.log("[codex-dev] If you want to restart it, stop the current process first.");
  }
}

function startDevServer(port) {
  const startedAt = new Date().toISOString();
  const outLogPath = path.join(workspaceRoot, `.codex-dev-${port}.out.log`);
  const errLogPath = path.join(workspaceRoot, `.codex-dev-${port}.err.log`);
  const outLog = fs.createWriteStream(outLogPath, { flags: "a" });
  const errLog = fs.createWriteStream(errLogPath, { flags: "a" });
  const nextBin = path.join(workspaceRoot, "node_modules", "next", "dist", "bin", "next");
  const child = spawn(
    process.execPath,
    [nextBin, "dev", "--webpack", "--port", String(port), ...passthroughArgs],
    {
      cwd: workspaceRoot,
      env: {
        ...process.env,
        PORT: String(port),
        CODEX_DEV_RUNTIME: "1",
        CODEX_WORKSPACE_ROOT: workspaceRoot,
        CODEX_GIT_BRANCH: gitBranch,
        CODEX_GIT_COMMIT: gitCommit,
        CODEX_DEV_PORT: String(port),
        CODEX_DEV_STARTED_AT: startedAt,
      },
      stdio: ["inherit", "pipe", "pipe"],
    },
  );

  console.log(`[codex-dev] Starting validated dev server on http://127.0.0.1:${port}`);
  console.log(`[codex-dev] Runtime identity: ${workspaceRoot} :: ${gitBranch}@${gitCommit}`);
  console.log(`[codex-dev] Logs: ${outLogPath} / ${errLogPath}`);

  child.stdout.on("data", (chunk) => {
    process.stdout.write(chunk);
    outLog.write(chunk);
  });

  child.stderr.on("data", (chunk) => {
    process.stderr.write(chunk);
    errLog.write(chunk);
  });

  const forwardSignal = (signal) => {
    if (!child.killed) {
      child.kill(signal);
    }
  };

  process.on("SIGINT", forwardSignal);
  process.on("SIGTERM", forwardSignal);

  child.on("exit", (code, signal) => {
    outLog.end();
    errLog.end();

    if (signal) {
      process.kill(process.pid, signal);
      return;
    }

    process.exit(code ?? 0);
  });
}

function parseArgs(argv) {
  let port;
  const rest = [];

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];

    if ((value === "--port" || value === "-p") && argv[index + 1]) {
      port = Number.parseInt(argv[index + 1], 10);
      index += 1;
      continue;
    }

    if (value.startsWith("--port=")) {
      port = Number.parseInt(value.slice("--port=".length), 10);
      continue;
    }

    rest.push(value);
  }

  return { port: Number.isFinite(port) ? port : undefined, rest };
}

function readGitValue(args, fallback) {
  try {
    return spawnSync("git", args, {
      cwd: workspaceRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).stdout.trim() || fallback;
  } catch {
    return fallback;
  }
}

async function inspectPort(port) {
  if (process.platform === "win32") {
    const netstat = spawnSync("netstat.exe", ["-ano", "-p", "tcp"], {
      cwd: workspaceRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    const portPattern = new RegExp(`^\\s*TCP\\s+\\S+:${port}\\s+\\S+\\s+LISTENING\\s+(\\d+)\\s*$`, "im");
    const pidMatch = netstat.stdout.match(portPattern);

    if (!pidMatch) {
      return null;
    }

    const pid = Number(pidMatch[1]);
    const processLookup = spawnSync(
      "powershell.exe",
      [
        "-NoProfile",
        "-Command",
        `$process = Get-CimInstance Win32_Process -Filter "ProcessId = ${pid}"; if ($process) { [PSCustomObject]@{ pid = ${pid}; commandLine = $process.CommandLine } | ConvertTo-Json -Compress }`,
      ],
      {
        cwd: workspaceRoot,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      },
    );
    const output = processLookup.stdout.trim();

    if (!output) {
      return { pid, commandLine: null };
    }

    return JSON.parse(output);
  }

  const result = spawnSync("lsof", ["-nP", `-iTCP:${port}`, "-sTCP:LISTEN", "-Fpc"], {
    cwd: workspaceRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  });
  const output = result.stdout.trim();

  if (!output) {
    return null;
  }

  const pidMatch = output.match(/p(\d+)/);
  const commandLineMatch = output.match(/c([^\n]+)/);

  return {
    pid: pidMatch ? Number(pidMatch[1]) : null,
    commandLine: commandLineMatch?.[1] ?? null,
  };
}

async function readRuntimeIdentity(port) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1200);
    const response = await fetch(`http://127.0.0.1:${port}/api/codex-runtime`, {
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch {
    return null;
  }
}

function isSameWorkspace(candidateWorkspaceRoot) {
  return normalizePathForCompare(candidateWorkspaceRoot) === normalizePathForCompare(workspaceRoot);
}

function containsWorkspace(commandLine) {
  return normalizeTextForCompare(commandLine).includes(normalizeTextForCompare(workspaceRoot));
}

function matchesCurrentRuntime(runtime, port) {
  return (
    isSameWorkspace(runtime.workspaceRoot) &&
    runtime.gitBranch === gitBranch &&
    runtime.gitCommit === gitCommit &&
    String(runtime.port) === String(port)
  );
}

function normalizePathForCompare(value) {
  return path.resolve(String(value)).replace(/\//g, "\\").toLowerCase();
}

function normalizeTextForCompare(value) {
  return String(value).replace(/\//g, "\\").toLowerCase();
}
