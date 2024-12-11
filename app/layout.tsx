import type { Metadata } from "next";
import localFont from "next/font/local";

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

const firaCode = localFont({
  src: "./fonts/FiraCode.ttf",
  variable: "--font-fira",
  weight: "100 900",
});

const handjet = localFont({
  src: "./fonts/Handjet.ttf",
  variable: "--font-handjet",
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
        className={`${geistSans.variable} ${geistMono.variable} ${firaCode.variable} ${handjet.variable} antialiased p-8 pb-1 flex flex-col gap-8 min-h-screen`}
      >
       {children}
      </body>
    </html>
  );
}
