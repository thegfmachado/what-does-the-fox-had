import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "What does the fox had?",
  description: "Bulário eletrônico para você sempre saber qual remédio tomou xD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[peru] p-8 pb-1 flex flex-col gap-8 min-h-screen`}
      >
        {children}

        <footer className="grow flex justify-center items-end">
          <div className="flex flex-col justify-center items-center gap-2">
            <div>
              Made with <span>❤️</span> and <span>☕</span>
            </div>
            <Link
              href=""
              target="_blank"
            >
              {`<gfm />`} © 2024
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
