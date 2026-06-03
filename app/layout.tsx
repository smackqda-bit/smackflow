import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SmackFlow",
  description: "SmackFlow — платформа об AI и нейросетях: гайды, инструменты и кейсы для работы и обучения.",
  keywords: [
    "AI",
    "нейросети",
    "искусственный интеллект",
    "ChatGPT",
    "автоматизация",
    "гайды",
  ],

  openGraph: {
    title: "SmackFlow",
    description:
      "Платформа об AI и нейросетях: гайды, инструменты и кейсы.",
    url: "https://smackflow.space",
    siteName: "SmackFlow",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "SmackFlow",
    description:
      "Платформа об AI и нейросетях: гайды, инструменты и кейсы.",
  },
}
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html

      
      lang="en"
      className={cn("no-scrollbar scroll-smooth h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="max-w-7xl mx-auto">{children}</body>
    </html>
  );
}
