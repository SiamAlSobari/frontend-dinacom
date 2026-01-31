import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/common/providers/QueryProvider";
import { ThemeProvider } from "@/common/providers/ThemeProvider";
import { Toaster } from 'react-hot-toast';
import Script from "next/script";
import { MIDTRANS_CLIENT_KEY } from "@/common/libs/load-env";
import AuthGuardEmpty from "@/common/guards/AuthGuardEmpty";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inventa - Smart Inventory Management",
  description: "Smart inventory management for small retailers",
  icons: {
    icon: [
      {
        url: "/icons/inventa_icon.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/icons/inventa_icon.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: "/icons/inventa_icon.png",
    shortcut: "/icons/inventa_icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={MIDTRANS_CLIENT_KEY}
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          enableSystem
          disableTransitionOnChange
          defaultTheme="light"
        >
          <Toaster
            position="top-right"
            reverseOrder={false}
          />
          <AuthGuardEmpty>
            <QueryProvider>{children}</QueryProvider>
          </AuthGuardEmpty>
        </ThemeProvider>
      </body>
    </html>
  );
}
