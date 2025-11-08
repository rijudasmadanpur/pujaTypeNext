
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/navbar/navbar";
// import { Providers as ImportedProviders } from '"./providers";
import Script from "next/script";


import { AuthProvider } from "./context/AuthContext";
import { LocationProvider } from "./context/LocationContext";

interface ProvidersProps {
  children: React.ReactNode;
  session?: any; // Make session optional
}



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "PanditJi4You",
//   description: "Book Best Pandit",
// };
export const metadata = {
  title: 'My PWA',
  description: 'My Next.js PWA',
  manifest: '/manifest.json',
  themeColor: '#2563eb',
};

export default function Providers({ children, session }: ProvidersProps) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Load Google Identity Services SDK globally */}
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* <Providers> */}
        <LocationProvider>

          <AuthProvider>

            <Navbar />
            {children}
          </AuthProvider>
        </LocationProvider>
        {/* </Providers> */}
      </body>
    </html>
  );
}

