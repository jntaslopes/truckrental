import type { NextConfig } from "next";

const codexRuntimeHeaders =
  process.env.CODEX_DEV_RUNTIME === "1"
    ? [
        {
          key: "X-Codex-Workspace-Root",
          value: process.env.CODEX_WORKSPACE_ROOT ?? process.cwd(),
        },
        {
          key: "X-Codex-Git-Branch",
          value: process.env.CODEX_GIT_BRANCH ?? "unknown",
        },
        {
          key: "X-Codex-Git-Commit",
          value: process.env.CODEX_GIT_COMMIT ?? "unknown",
        },
        {
          key: "X-Codex-Dev-Port",
          value: process.env.CODEX_DEV_PORT ?? process.env.PORT ?? "unknown",
        },
        {
          key: "X-Codex-Dev-Pid",
          value: process.env.CODEX_DEV_PID ?? `${process.pid}`,
        },
        {
          key: "X-Codex-Dev-Started-At",
          value: process.env.CODEX_DEV_STARTED_AT ?? "unknown",
        },
      ]
    : [];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet",
          },
        ],
      },
      ...(codexRuntimeHeaders.length > 0
        ? [
            {
              source: "/:path*",
              headers: codexRuntimeHeaders,
            },
          ]
        : []),
    ];
  },
};

export default nextConfig;
