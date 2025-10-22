import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Head from "@/lib/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Cheezious",
  description: "Created By Hamza Faiz",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <head>
        <Head />
      </head> */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
