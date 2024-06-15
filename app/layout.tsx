import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", });

export const metadata: Metadata = {
  title: "Duuka",
  description: "An online market place where you can buy, sell and advertise your products and services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body 
        className={
          cn(
            "bg-background font-sans antialiased",
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
            
            <NavBar />
            <div className="mt-16 sm:mt-[5.25rem] min-h-[70vh]">
            {children}
            </div>
            <Footer />
          {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
