import './globals.scss';

import type { Metadata } from "next";
import BootstrapClient from "./components/bootstrap";
import { Nav } from "./components/nav";
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
  title: "FUMA Clubs Community",
  description: "Full Manual EA Sports FC 25 Pro Clubs League",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-bs-theme="dark">
      <body>
        <SessionProvider>
          <Nav />
        </SessionProvider>
        <main className="container my-3">
          {children}
        </main>
        <BootstrapClient />
      </body>
    </html>
  );
}
