import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/providers/ThemeProvider";
import { cookies } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhsin Interiors | Premium Interior Design — Kampala, Uganda",
  description:
    "Muhsin Interiors is a premium interior design and renovation agency based in Kampala, Uganda. We craft breathtaking residential and commercial spaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const getCookie = async () => {
    const cookieStore = await cookies();
    return cookieStore.get("theme");
  };

  const defaultTheme = getCookie();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider defaultTheme={defaultTheme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
