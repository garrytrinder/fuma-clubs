import './globals.scss';

import type { Metadata } from "next";
import BootstrapClient from "./components/bootstrapClient";
import { Nav } from "./components/nav";

export const metadata: Metadata = {
  title: "FUMA Clubs Community",
  description: "Full Manual EA Sports FC 24 Pro Clubs League",
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
      </body>
    </html>
  );
}
