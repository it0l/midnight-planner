import { redirect } from "next/navigation";
import LampLogin from "@/components/auth/LampLogin";
import { getCurrentUser } from "@/lib/auth";

export default async function Home() {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <LampLogin />
    </main>
  );
}
