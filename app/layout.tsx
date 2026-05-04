import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StickyCallBar from "@/components/StickyCallBar";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import ChatWidget from "@/components/ChatWidget";
import TabTitleEffect from "@/components/TabTitleEffect";
import FOMONotification from "@/components/FOMONotification";
import PageTransition from "@/components/PageTransition";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Console Repair Fort Worth | Retro Madness",
  description:
    "Fast, affordable console repair in Fort Worth. PS5, Xbox, Nintendo Switch. Walk in or mail it in. Upfront pricing, same-day repairs.",
  keywords: [
    "PS5 repair Fort Worth",
    "Xbox repair Fort Worth",
    "Nintendo Switch repair",
    "HDMI port repair",
    "console repair near me",
  ],
  openGraph: {
    title: "Console Repair Fort Worth | Retro Madness",
    description: "We fix consoles fast. No guesswork.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${geistMono.variable}`}>
      <body className="bg-base text-white antialiased font-sans">
        <TabTitleEffect />
        <Nav />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
        <StickyCallBar />
        <ExitIntentPopup />
        <ChatWidget />
        <FOMONotification />
      </body>
    </html>
  );
}
