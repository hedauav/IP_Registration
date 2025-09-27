import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ContextProvider } from '.';
import ReactQueryProvider from './ReactQueryProvider';
const inter = Inter({ subsets: ["latin"] });

// Websit Config
export const metadata: Metadata = {
  title: "Pulse",
  description: "Made with love",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <ContextProvider>
            {children}
          </ContextProvider>
        </ReactQueryProvider>
      </body>
    </html>
 
 );
}
