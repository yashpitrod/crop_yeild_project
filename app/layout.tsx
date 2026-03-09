import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CropYield AI - Predict Crop Yield with Machine Learning",
  description:
    "Advanced ML-powered crop yield prediction. Enter environmental parameters and get instant predictions in hectograms per hectare.",
};

export const viewport: Viewport = {
  themeColor: "#050a05",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
