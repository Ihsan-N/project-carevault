import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import SidebarRestrictions from "@/components/shared/SidebarRestrictions";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CareVault",
  description: "Hospital Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="flex flex-row">
              <SidebarRestrictions />
              <section className="main-container">
                <div className="w-full">{children}</div>
              </section>
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
