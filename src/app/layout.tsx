import type { Metadata } from "next";
import { Playfair_Display, Lato, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
});

const devanagari = Noto_Sans_Devanagari({
  weight: ["400", "600"],
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nritya Lok — Indian Classical Dance School",
  description:
    "Nritya Lok is a premier Indian classical dance school offering training in Bharatanatyam, Kathak, and more. Join us to discover the beauty of traditional Indian dance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lato.variable} ${devanagari.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
