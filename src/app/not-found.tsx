import Link from "next/link";
import Box from "@/components/ui/Box";
import { linkClass } from "@/components/ui/styles";

export default function NotFound() {
  return (
    <Box title="Página não encontrada">
      <p>O caminho que você procura se perdeu nas cavernas de Aurora.</p>
      <Link href="/news" className={`${linkClass} mt-4 inline-block`}>
        « Voltar ao início
      </Link>
    </Box>
  );
}
