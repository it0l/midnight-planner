import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: RouteContext) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const existing = await prisma.note.findFirst({ where: { id, userId: user.id } });
  if (!existing) return NextResponse.json({ error: "Note not found." }, { status: 404 });

  const body = await request.json();
  const title = String(body.title ?? "").trim();
  const content = String(body.content ?? "").trim();

  if (!title) return NextResponse.json({ error: "Title is required." }, { status: 400 });
  if (title.length > 100) return NextResponse.json({ error: "Title is too long." }, { status: 400 });
  if (content.length > 5000) return NextResponse.json({ error: "Content is too long." }, { status: 400 });

  const note = await prisma.note.update({
    where: { id },
    data: { title, content },
  });

  return NextResponse.json({ note });
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const result = await prisma.note.deleteMany({ where: { id, userId: user.id } });
  if (!result.count) return NextResponse.json({ error: "Note not found." }, { status: 404 });

  return new NextResponse(null, { status: 204 });
}
