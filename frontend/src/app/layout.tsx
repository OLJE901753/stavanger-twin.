import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import Navigation from "@/components/Navigation";
import GDPRConsentBanner from "@/components/GDPRConsentBanner";
import ErrorBoundary from "@/components/ErrorBoundary";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Anti-establishment fonts for the people
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Only preload the primary font
});

export const metadata: Metadata = {
  title: "Stavanger Twin - Smart City Digital Platform",
  description: "Empowering citizens through transparent, data-driven governance. Digital twin platform for smart city services and citizen engagement.",
  keywords: ["smart city", "digital twin", "Stavanger", "Norway", "citizen engagement", "municipal services", "transparency"],
  authors: [{ name: "Stavanger Municipality" }],
  robots: "index, follow",
  openGraph: {
    title: "Stavanger Twin - Smart City Digital Platform",
    description: "Empowering citizens through transparent, data-driven governance.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stavanger Twin - Smart City Digital Platform",
    description: "Empowering citizens through transparent, data-driven governance.",
  },
};

// Separate viewport export for Next.js 15 compatibility
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        {/* GDPR Compliance - Minimal tracking */}
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#2563eb" />
        {/* Professional digital twin theme */}
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-white text-gray-900 min-h-screen flex flex-col`}
      >
        <ServiceWorkerRegistration />
        
        {/* City Status Ticker - Always visible */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white text-sm py-1 px-4 overflow-hidden">
          <div className="animate-pulse">
            <span className="font-bold">CITY STATUS:</span> 82% citizen participation in recent consultation | 
            Transparency index: 94% | Digital votes: 1,247 | 
            <span className="text-blue-200">Join the digital transformation!</span>
          </div>
        </div>
        
        {/* Main content with top padding for ticker */}
        <div className="pt-8 flex-1">
          <ErrorBoundary>
            <Navigation />
            {children}
          </ErrorBoundary>
        </div>
        
        {/* Footer */}
        <footer className="bg-gray-800 text-gray-200 py-4 px-4 mt-auto">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm">
              <span className="font-bold text-blue-400">Stavanger Digital Twin:</span>
              &quot;Empowering citizens through transparent, data-driven governance.&quot;
            </p>
            <p className="text-xs mt-2 text-gray-400">
              © 2024 Stavanger Municipality. Built with ❤️ for the community.
              <a href="/transparency" className="text-blue-400 hover:text-blue-300 ml-2">
                View Transparency Report
              </a>
              <a href="/privacy" className="text-blue-400 hover:text-blue-300 ml-2">
                Privacy Policy
              </a>
            </p>
          </div>
        </footer>

        {/* GDPR Consent Banner */}
        <GDPRConsentBanner />
        
        {/* Vercel Speed Insights - Track performance for better user experience */}
        <SpeedInsights />
      </body>
    </html>
  );
}
