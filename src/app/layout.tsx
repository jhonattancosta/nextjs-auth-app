import type { Metadata } from "next";
import { Cinzel } from "next/font/google";
import Providers from "@/components/Providers";
import Header from "@/components/layout/Header";
import LeftMenu from "@/components/layout/LeftMenu";
import RightSidebar from "@/components/layout/RightSidebar";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";
import "./globals.css";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-cinzel" });

export const metadata: Metadata = {
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: `${siteConfig.name} — ${siteConfig.tagline}`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={cinzel.variable}>
      <body className="min-h-screen text-parchment antialiased">
        <Providers>
          <Header />
          <div className="mx-auto grid max-w-7xl gap-4 px-3 py-6 lg:grid-cols-[210px_minmax(0,1fr)_260px]">
            <LeftMenu />
            <main className="min-w-0 space-y-4">{children}</main>
            <RightSidebar />
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
