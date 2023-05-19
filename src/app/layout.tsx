import { DefaultNavbar } from "@/components/Navbar";
import "./globals.css";
import { Footer } from "@/components/Footer";

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
    <html lang="en" className="min-h-screen scroll-smooth">
      <body className="flex flex-col w-full min-h-screen">
        {/*<NextTopLoader color="rgb(153 27 27)" showSpinner={false} />*/}
        <DefaultNavbar />
        <main className="flex flex-col min-h-screen my-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
