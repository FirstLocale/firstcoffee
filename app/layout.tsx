import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import LocalFont from "next/font/local"
import ThemeProvider from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "First.",
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
    <html lang="en" className={`${cutiveFont.variable}`} suppressHydrationWarning>
      <body className={`antialiased ${cutiveFont.variable} bg-white text-neutral-900 dark:bg-[#0a0a0a] dark:text-[#ededed]`}
        aria-live="polite">
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
