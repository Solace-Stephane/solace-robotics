import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (!body?.name || !body?.email || !body?.company || !body?.robotType || !body?.notes) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  console.log("[solace-robotics] new pilot request", {
    name: body.name,
    email: body.email,
    company: body.company,
    robotType: body.robotType,
    notes: body.notes,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
