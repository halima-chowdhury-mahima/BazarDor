import type { Metadata } from "next";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

import "./globals.css";

export const metadata: Metadata = {
  title: "বাজার দর | BazarDor",
  description:
    "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" data-theme="light">
      <body className="flex min-h-screen flex-col">
        <Suspense
          fallback={
            <div className="h-28 animate-pulse bg-white" />
          }
        >
          <SiteHeader />
        </Suspense>

        <div className="flex-1">
          {children}
        </div>

        <Footer />

        <Toaster position="top-right" />
      </body>
    </html>
  );
}