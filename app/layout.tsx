import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import LocalFont from "next/font/local"

export const metadata: Metadata = {
  title: "First",
  description: "First Coffee",
};

const cutiveFont = LocalFont({
  src: '../public/fonts/CutiveRegular.ttf',
  variable: '--font-cutive',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cutiveFont.variable}>
      <body className={`antialiased ${cutiveFont.variable}`} aria-live="polite">
        <Header />
        {children}
      </body>
    </html>
  );
}
