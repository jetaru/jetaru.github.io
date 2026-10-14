import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
  title: "Jorge Thompson | Desarrollador Senior & Arquitecto de Software",
  description:
    "Portafolio oficial de Jorge Thompson. Especialista en Clean Architecture, microservicios, Next.js, sistemas de alta disponibilidad y soluciones para la industria logística.",
  authors: [{ name: "Jorge Thompson", url: "https://github.com/jetaru" }],
  keywords: [
    "Jorge Thompson",
    "jetaru",
    "Desarrollador Senior",
    "Software Architect",
    "Clean Architecture",
    "Next.js",
    "GitHub Pages",
    "Patio Madera",
    "SISPAT",
    "Node.js",
    "TypeScript",
  ],
  openGraph: {
    title: "Jorge Thompson | Desarrollador Senior & Arquitecto de Software",
    description:
      "Portafolio técnico en Next.js con Clean Architecture, despliegue en GitHub Pages y servidor externo en JavaScript.",
    url: "https://jetaru.github.io",
    siteName: "Jorge Thompson Portfolio",
    type: "website",
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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
