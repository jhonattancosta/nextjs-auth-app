import { redirect } from "next/navigation";

// Rota antiga: agora a área logada fica em /account.
export default function DashboardPage() {
  redirect("/account");
}
