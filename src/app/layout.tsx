import type { Metadata } from "next";
import { Inter, Fira_Code, Handjet } from 'next/font/google'

import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-fira",
});

const handjet = Handjet({
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-handjet",
});

export const metadata: Metadata = {
  title: "What does the fox had?",
  description: "Bulário eletrônico para você sempre saber qual remédio tomar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${firaCode.variable} ${handjet.variable} antialiased p-4 md:p-8 pb-1 flex flex-col gap-8 min-h-screen`}
      >
       {children}
      </body>
    </html>
  );
}
