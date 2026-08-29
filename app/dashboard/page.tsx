import { redirect } from "next/navigation";
import Dashboard from "@/components/dashboard/Dashboard";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/");

  const notes = await prisma.note.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <Dashboard
      email={user.email}
      initialNotes={notes.map((note) => ({
        ...note,
        createdAt: note.createdAt.toISOString(),
        updatedAt: note.updatedAt.toISOString(),
      }))}
    />
  );
}
