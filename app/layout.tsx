import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Script from "next/script";


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

      
      lang="ru"
      className={cn("no-scrollbar scroll-smooth h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
     <head>
        <Script id="yandex-metrika" strategy="afterInteractive" type="text/javascript">
    {`
      (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=110750178', 'ym');

    ym(110750178, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
    `}
  </Script>
        <noscript>
    <div>
      <img
        src="https://mc.yandex.ru/watch/110750178"
        style={{ position: "absolute", left: "-9999px" }}
        alt=""
      />
    </div>
  </noscript>

      </head>
      <body className="max-w-7xl mx-auto">
        
        {children}
     
        </body>
    </html>
  );
}
