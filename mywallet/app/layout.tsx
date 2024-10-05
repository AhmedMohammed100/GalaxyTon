'use client'

import { TonConnectUIProvider } from "@tonconnect/ui-react";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Big Farm Wallet Connect</title>
      </head>
      <body>
        <TonConnectUIProvider manifestUrl="https://mega.nz/file/5L0HEbLB#6mqiNA-rrM_HMtAz6JJW6FlNGGNYgavGBYLuJnAp9gI">
        {children}
        </TonConnectUIProvider>
      </body>
    </html>
  );
}
