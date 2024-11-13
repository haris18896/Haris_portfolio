import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Haris Ahmad",
  description: 'A showcase of my work and skills.',
  icons: {
    icon: '/favicon/android-chrome-384x384.png',
    apple: '/apple-touch-icon.png',
    other: [
            {
            rel: 'icon',
            url: '/favicon/favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png'
        },
        {
            rel: 'icon',
            url: '/favicon/favicon-16x16.png',
            sizes: '16x16',
            type: 'image/png'
        }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
