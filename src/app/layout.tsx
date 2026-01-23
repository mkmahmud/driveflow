import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TRPCProvider from "@/trpc/Provider";
import { Provider } from "@/components/ui/provider"
import { AuthProvider } from "@/hooks/useAuth";
import Script from "next/script";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DriveFlow | Premium Car Rental",
  description: "Rent your dream car today",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="beforeInteractive"
        />
        <TRPCProvider>
          <Provider>
            <AuthProvider>

              {children}
              <Toaster />
            </AuthProvider>
          </Provider>
        </TRPCProvider>
      </body>
    </html>
  );
}