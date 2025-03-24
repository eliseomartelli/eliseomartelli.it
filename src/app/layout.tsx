import type { Metadata } from "next";
import "./globals.css";
import { Toolbar } from "@/components/custom/toolbar";
import { Footer } from "@/components/custom/footer";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: {
    default: "Eliseo Martelli",
    template: "%s | Eliseo Martelli",
  },
  description: "Software Developer & Visual Artist based in Turin, Italy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen w-full overflow-x-hidden">
        <Toolbar />
        <main className="max-w-prose w-full mx-auto p-4 flex-1 space-y-6 mb-8">
          {children}
        </main>
        <Toaster />
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
