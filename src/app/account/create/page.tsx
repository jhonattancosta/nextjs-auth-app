import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Box from "@/components/ui/Box";
import CreateAccountForm from "./CreateAccountForm";

export const metadata = { title: "Criar conta" };

export default async function CreateAccountPage() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/account");

  return (
    <Box title="Criar conta">
      <CreateAccountForm />
    </Box>
  );
}
