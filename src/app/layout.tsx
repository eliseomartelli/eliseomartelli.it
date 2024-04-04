import { Menu } from "@/components/Icons";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { DefaultNavbar } from "@/components/Navbar";

export const metadata = {
  title: "Eliseo Martelli",
  description: "Computers, photography & music.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="min-h-screen scroll-smooth bg-stone-50 text-stone-950"
    >
      <body className="flex flex-col w-full min-h-screen">
        <Analytics />
        <DefaultNavbar />
        <main className="flex flex-col min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
