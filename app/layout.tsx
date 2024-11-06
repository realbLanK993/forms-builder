import type { Metadata } from "next";
import "./globals.css";
import RootNavbar from "@/components/layout/root";
import { Poppins } from "next/font/google";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/toaster"
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Form Builder",
  description: "Effortlessly Generate Custom Form Code for React and HTML",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased w-full min-h-screen h-full flex flex-col gap-10`}
      >
        <Providers>
          <RootNavbar />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
