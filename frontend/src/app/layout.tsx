import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import Navigation from "@/components/Navigation";
import GDPRConsentBanner from "@/components/GDPRConsentBanner";

// Anti-establishment fonts for the people
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stavanger Twin - Digital Democracy Revolution",
  description: "Empowering citizens, exposing corruption, revolutionizing democracy. For the honor, not the glory - by the people, for the people.",
  keywords: ["democracy", "transparency", "Stavanger", "Norway", "digital twin", "citizen empowerment"],
  authors: [{ name: "Norway AS Twin Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Stavanger Twin - Digital Democracy Revolution",
    description: "Empowering citizens, exposing corruption, revolutionizing democracy.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stavanger Twin - Digital Democracy Revolution",
    description: "Empowering citizens, exposing corruption, revolutionizing democracy.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* GDPR Compliance - Minimal tracking */}
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#0a0a0a" />
        {/* Preload critical fonts */}
        <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
                        <body
                    className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-corruption-900 text-foreground min-h-screen`}
                  >
                    <ServiceWorkerRegistration />
        
        {/* People's Pulse Ticker - Always visible */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-rebel-500 text-white text-sm py-1 px-4 overflow-hidden">
          <div className="animate-pulse">
            <span className="font-bold">PEOPLE'S PULSE:</span> 82% voted NO on fees—Councilor X ignored YOU! | 
            Transparency index: 94% | Blockchain verified: 1,247 votes | 
            <span className="text-people-300">Join the revolution!</span>
          </div>
        </div>
        
        {/* Main content with top padding for ticker */}
        <div className="pt-8">
          <Navigation />
          {children}
        </div>
        
                {/* Footer with People's Oath */}
        <footer className="bg-corruption-800 text-corruption-200 py-4 px-4 mt-auto">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm">
              <span className="font-bold text-people-400">People's Oath:</span>
              "We fight for the people, not the system. For the honor, not the glory."
            </p>
            <p className="text-xs mt-2 text-corruption-400">
              © 2024 Norway AS Twin. Built with ❤️ and rebellion.
              <a href="/transparency" className="text-truth-400 hover:text-truth-300 ml-2">
                View Transparency Report
              </a>
              <a href="/privacy" className="text-truth-400 hover:text-truth-300 ml-2">
                Privacy Policy
              </a>
            </p>
          </div>
        </footer>

        {/* GDPR Consent Banner */}
        <GDPRConsentBanner />
      </body>
    </html>
  );
}
