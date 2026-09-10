import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Vision Webseiten-Kalkulator",
  description:
    "Digital Vision Webseiten-Kalkulator für Website-Raten, Support und Vertragslaufzeiten.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
