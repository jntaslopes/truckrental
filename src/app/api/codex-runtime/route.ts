import { NextResponse } from "next/server";
import { getCodexRuntimeIdentity } from "@/lib/codex-runtime";

export const dynamic = "force-dynamic";

export async function GET() {
  const identity = getCodexRuntimeIdentity();

  if (!identity) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(identity, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
