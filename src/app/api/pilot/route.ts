import { NextResponse } from "next/server";

import { savePilotSubmission } from "@/lib/pilot-store";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (!body?.name || !body?.email || !body?.company || !body?.robotType || !body?.notes) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const submission = {
    name: String(body.name),
    email: String(body.email),
    company: String(body.company),
    robotType: String(body.robotType),
    notes: String(body.notes),
    createdAt: new Date().toISOString(),
  };

  await savePilotSubmission(submission);
  return NextResponse.json({ ok: true });
}
