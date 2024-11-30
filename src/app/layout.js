import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "@/components/shared/sidebar";
import { Toaster } from "@/components/ui/toaster";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/nextjs";
import { GrammarlyFix } from "@/components/shared/GrammarlyFix";

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

// Client component to handle Grammarly attributes

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          data-enable-grammarly="false"
        >
          <GrammarlyFix />
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <div className="h-screen flex">
            <Toaster />
            <Sidebar />
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
