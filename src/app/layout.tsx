import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";

// Existing fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// New Inter font
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Play Pro | Ultimate Football Experience",
  description:
    "Play Pro is your all-in-one football app for live scores, match updates, news, player stats, and league standings. Stay ahead of the game, anytime, anywhere.",
  keywords: [
    "football app",
    "Play Pro",
    "live football scores",
    "football news",
    "match updates",
    "player stats",
    "football leagues",
    "soccer app",
  ],
  authors: [{ name: "Play Pro Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} relative font-sans antialiased`}
      >
        <Navbar />
        <Sidebar />
        <div className="min-h-screen flex">
          <Sidebar />
          <main className="flex-1">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
