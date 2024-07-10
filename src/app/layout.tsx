import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import Provider from "@/components/Provider";
import { Toaster } from "@/components/ui/toaster";

const font = League_Spartan({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Invoice Manager",
  description: "Manage all your invoices from a single place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(font.className)}>
        <Provider>
          <Navbar />
          <main className="h-full pt-[4.5rem] md:pt-20 lg:ml-24 lg:pt-0">
            {children}
          </main>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
