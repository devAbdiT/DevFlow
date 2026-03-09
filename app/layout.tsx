import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // inter.className to be applied on all elemnts
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
