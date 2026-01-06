import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TenantProvider } from "@/lib/tenant-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spare Parts Store",
  description: "Quality automotive spare parts for all vehicle brands",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <TenantProvider>
          {/* TopBar can be optional or integrated into Header. user asked to remove "heavy" bars, so removing TopBar for clean look */}
          <Header />

          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </TenantProvider>
      </body>
    </html>
  );
}
