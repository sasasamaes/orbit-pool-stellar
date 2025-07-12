import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Community Wallet - Group Savings Platform",
  description:
    "Save and invest together with your community using blockchain technology",
  keywords: ["savings", "community", "blockchain", "stellar", "defi", "group"],
  authors: [{ name: "Community Wallet Team" }],
  openGraph: {
    title: "Community Wallet",
    description: "Save and invest together with your community",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Community Wallet",
    description: "Save and invest together with your community",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen">{children}</div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
