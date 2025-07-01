import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCSSVariables } from "@/lib/colors";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Back to Bold Career Coach",
  description: "Career coaching and job search assistance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cssVariables = getCSSVariables() as React.CSSProperties;
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[--color-bg-primary] text-white min-h-screen relative overflow-x-hidden`}
        style={cssVariables}
      >
        {/* Abstract SVG background shapes */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="1200" cy="100" r="200" fill="#1e40af" fillOpacity="0.25" />
            <circle cx="200" cy="500" r="150" fill="#3b82f6" fillOpacity="0.15" />
            <ellipse cx="900" cy="400" rx="180" ry="80" fill="#2563eb" fillOpacity="0.10" />
            <ellipse cx="400" cy="100" rx="120" ry="60" fill="#60a5fa" fillOpacity="0.10" />
          </svg>
        </div>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
