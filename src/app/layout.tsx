import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import EmergencyButton from "@/components/EmergencyButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gidan Kwano - FUTMinna Student Accommodation",
  description:
    "Find safe, verified student accommodation near Federal University of Technology, Minna. Compare prices, read reviews, and report scams.",
  keywords:
    "FUTMinna, student accommodation, Minna lodges, university housing, Nigeria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-black text-white antialiased min-h-screen`}
      >
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
          {children}
          <EmergencyButton />
        </div>
      </body>
    </html>
  );
}
