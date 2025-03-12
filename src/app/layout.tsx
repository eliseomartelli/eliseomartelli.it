import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toolbar } from "@/components/custom/toolbar";
import { Footer } from "@/components/custom/footer";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen w-full overflow-x-hidden`}
      >
        <Toolbar />
        <main className="max-w-prose w-full mx-auto p-4 flex-1 space-y-6 mb-8">
          {children}
        </main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
