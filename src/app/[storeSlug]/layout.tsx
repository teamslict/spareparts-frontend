import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css"; // Fixed path
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TenantProvider } from "@/lib/tenant-context";

// ... imports remain the same

export const metadata: Metadata = {
  title: "Spare Parts Store",
  description: "Quality automotive spare parts for all vehicle brands",
};

export default async function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ storeSlug: string }>;
}) {
  const { storeSlug } = await params;

  return (
    <TenantProvider storeSlug={storeSlug}>
      {/* TopBar can be optional or integrated into Header. user asked to remove "heavy" bars, so removing TopBar for clean look */}
      <Header />

      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </TenantProvider>
  );
}
