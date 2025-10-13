import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Forest Queen - Premium Outdoor & Camping Equipment",
  description: "Discover premium camping and hiking gear for your next outdoor adventure. Quality tents, sleeping bags, backpacks, and more. Free shipping on orders over $50.",
  keywords: ["camping gear", "outdoor equipment", "hiking gear", "tents", "sleeping bags", "backpacks"],
  authors: [{ name: "Forest Queen" }],
  openGraph: {
    title: "Forest Queen - Premium Outdoor & Camping Equipment",
    description: "Discover premium camping and hiking gear for your next outdoor adventure.",
    type: "website",
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
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
