import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "@/components/shared/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { GrammarlyFix } from "@/components/shared/GrammarlyFix";
import { ThemeProvider } from "@/components/providers/theme-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export const metadata = {
  title: "SamajSeva",
  description: "Made by Team Hare Krishna"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        data-enable-grammarly="false"
      >
        <ThemeProvider>
          <GrammarlyFix />
          <div className="h-screen flex">
            <Toaster />
            <Sidebar />

            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
