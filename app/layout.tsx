import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gió đi code",
  description: "Created with Gió đi code",
  generator: "Gió đi code",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
