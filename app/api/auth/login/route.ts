import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const normalizedEmail = String(email ?? "").trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (!user || !(await bcrypt.compare(String(password), user.password))) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    await prisma.session.deleteMany({
      where: { userId: user.id, expiresAt: { lt: new Date() } },
    });
    await createSession(user.id);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Unable to sign in." }, { status: 500 });
  }
}
