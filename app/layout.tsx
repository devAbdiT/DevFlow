/* eslint-disable import/order */
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

import Navbar from "@/components/navigation/navbar";
import { cn } from "@/lib/utils";
import { auth } from "@/auth";

const inter = localFont({
  src: "./font/InterVf.ttf",
  variable: "--font-inter",
  weight: "100 200 300 400 500 700 800 900",
});

const spaceGrotesk = localFont({
  src: "./font/SpaceGroteskVF.ttf",
  variable: "--font-space-grotesk",
  weight: "300 400 500 700",
});

export const metadata: Metadata = {
  title: "DevFlow",
  description:
    "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web developmnet, mobile app development. algorithms, data structures, and more.",
  icons: {
    icon: "/images/site-logo.svg",
  },
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider session={session}>
        {/* // inter.className to be applied on all elemnts */}
        <body
          className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
};
export default RootLayout;
