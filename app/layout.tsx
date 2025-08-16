import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const chillax = localFont({
  src: [
    {
      path: "./fonts/Chillax-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-chillax",
  display: "swap",
});

const panchang = localFont({
  src: [
    {
      path: "./fonts/Panchang-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-panchang",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Redemy - Learn, Grow, Succeed",
    template: "%s | Redemy",
  },
  description:
    "Redemy is a modern learning platform where you can master new skills, explore expert-led courses, and grow your career with knowledge that matters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${chillax.variable} ${panchang.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
