'use client'

import { Geist, Geist_Mono } from "next/font/google";
import { WalletProvider } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
import Providers from "@/providers/privyProvider";
import { MusicProvider } from "@/components/contexts/MusicContext";
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <MusicProvider>
            <WalletProvider>
              {children}
            </WalletProvider>
          </MusicProvider>
        </Providers>
      </body>
    </html>
  );
}
