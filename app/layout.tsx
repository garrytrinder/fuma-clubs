import './globals.scss';

import type { Metadata } from "next";
import BootstrapClient from "./components/bootstrap";
import { Nav } from "./components/nav";
import { Analytics } from '@vercel/analytics/react';

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
        <Nav />
        <main className="container my-3">
          {children}
        </main>
        <BootstrapClient />
        <Analytics />
      </body>
    </html>
  );
}
