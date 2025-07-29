'use client'

import Navbar from "@/components/layout/Navbar";
import '@suiet/wallet-kit/style.css';
import "../globals.css"
import { MusicProvider } from "@/components/contexts/MusicContext";
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div>
                <MusicProvider>
                    <Navbar />
                    {children}
                </MusicProvider>
            </div>
        </>

    );
}
