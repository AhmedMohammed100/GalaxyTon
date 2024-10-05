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
        <TonConnectUIProvider manifestUrl="https://ahmedmohammed100.github.io/GalaxyTon/">
        {children}
        </TonConnectUIProvider>
      </body>
    </html>
  );
}
