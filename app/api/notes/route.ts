import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const notes = await prisma.note.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json({ notes });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await request.json();
  const title = String(body.title ?? "").trim();
  const content = String(body.content ?? "").trim();

  if (!title) return NextResponse.json({ error: "Title is required." }, { status: 400 });
  if (title.length > 100) return NextResponse.json({ error: "Title is too long." }, { status: 400 });
  if (content.length > 5000) return NextResponse.json({ error: "Content is too long." }, { status: 400 });

  const note = await prisma.note.create({
    data: { title, content, userId: user.id },
  });

  return NextResponse.json({ note }, { status: 201 });
}
