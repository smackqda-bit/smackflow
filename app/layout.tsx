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
  description: "SmackFlow — это современная платформа об искусственном интеллекте и нейросетях, созданная для всех: от дизайнеров и разработчиков до маркетологов, студентов и офисных специалистов. Здесь вы найдёте практические гайды, полезные AI-инструменты, реальные кейсы и простые объяснения сложных технологий, которые помогают автоматизировать задачи, повышать продуктивность и открывать новые возможности в работе и повседневной жизни.",
   metadataBase: new URL("https://smackflow.space")
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
