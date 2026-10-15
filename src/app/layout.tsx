import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/presentation/context/LanguageContext";
import { Navbar } from "@/presentation/components/layout/Navbar";
import { Footer } from "@/presentation/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jetaru.github.io"),
  title: "Jorge Eduardo Thompson Alvarado | Senior Mobile Developer & Back-End Engineer",
  description:
    "Portafolio oficial de Jorge Thompson (jetaru). Especialista en desarrollo Mobile (Kotlin, Jetpack Compose, React Native), Back-End de alto rendimiento (NestJS, .NET Core, SAP HANA, Oracle SQL) y Clean Architecture.",
  authors: [{ name: "Jorge Eduardo Thompson Alvarado", url: "https://github.com/jetaru" }],
  keywords: [
    "Jorge Thompson",
    "jetaru",
    "Senior Mobile Developer",
    "Back-End Engineer",
    "Kotlin",
    "Jetpack Compose",
    "React Native",
    "NestJS",
    "SAP HANA",
    "Oracle SQL",
    "Clean Architecture",
    "Next.js",
    "GitHub Pages",
  ],
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "android-chrome", url: "/android-chrome-192x192.png", sizes: "192x192" },
      { rel: "android-chrome", url: "/android-chrome-512x512.png", sizes: "512x512" },
    ],
  },
  openGraph: {
    title: "Jorge Thompson | Senior Mobile Developer & Back-End Engineer",
    description:
      "Ingeniero Civil en Informática con más de 5 años de experiencia especializándose en desarrollo Mobile y Back-End de alto rendimiento.",
    url: "https://jetaru.github.io",
    siteName: "Jorge Thompson Portfolio",
    type: "website",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jorge Thompson Portfolio — Universal System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jorge Thompson | Senior Mobile Developer & Back-End Engineer",
    description:
      "Ingeniero Civil en Informática especialista en Mobile (Kotlin, React Native) y Back-End (NestJS, SAP HANA).",
    images: ["/assets/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth dark`}>
      <body className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200 antialiased">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
