import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";
import NavBar from "@/components/NavBar";
import Footer from "@/components/layout/Footer";
import Chat from "@/components/chat/Chat";
import WithContext from "@/context/WithContext";
import { siteConfig } from "@/config/site";
 
export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `${siteConfig.title} | %s`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    "buy online",
    "best deals",
    "discount shopping",
    "online marketplace",
    "shop now",
    "free shipping",
    "exclusive offers",
    "trendy products",
    "customer favorites",
    "latest arrivals",
    "eduuka",
    "duuka",
    "online shopping"
  ],
  authors: [
    {
      name: "E D Wafula",
      url: "https://edwafula.com",
    },
  ],
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  creator: "E D Wafula",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "E D Wafula",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/manifest.webmanifest`,
};

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", });


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body 
        className={
          cn(
            "bg-background font-sans antialiased scroll-smooth",
            inter.variable
          )
        }
      >
        {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > */}
            <WithContext>
              <NavBar />
              <div className="pt-[4.5rem] sm:pt-24 relative pb-10 min-h-screen">
                {children}
                <Chat />
              </div>
              <Footer />
            </WithContext>
          {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
