import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Footer } from "@/components/Footer";
import Link from "next/link";

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
      <body className="flex flex-col w-full">
        <Analytics />
        <Navbar />
        <main className="flex flex-col min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

const Navbar = () =>
  <div className="p-4 z-50 fixed top-0 left-0 bg-stone-50 w-full flex flex-row justify-between">
    <HomeLogo />
    <ul className="flex gap-4">
      <li>Blog</li>
      <li>Photos</li>
      <li>About</li>
    </ul>
  </div>;
function HomeLogo() {
  return <Link href="/"><div className="font-mono text-rose-600 font-bold text-xl">
    <div className="group relative h-8 w-48 overflow-y-hidden flex items-center">
      <div className="absolute transition-transform duration-200 transform translate-y-0 group-hover:-translate-y-full">
        <p>EM</p>
      </div>
      <div className="absolute transition-transform duration-200 transform translate-y-full group-hover:translate-y-0">
        <p>eliseomartelli</p>
      </div>
    </div>
  </div></Link>;
}
