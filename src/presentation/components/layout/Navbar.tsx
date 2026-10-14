"use client";

import { useState } from "react";
import { Terminal, Layers, Cpu, Server, Mail, Menu, X, Activity } from "lucide-react";
import { GithubIcon } from "@/presentation/components/ui/Icons";
import { useServerStatus } from "@/presentation/hooks/useServerStatus";
import { appConfig } from "@/infrastructure/config/env";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { health } = useServerStatus();

  const isServerOnline = health.status === "online";

  const navItems = [
    { label: "Proyectos", href: "#proyectos", icon: Layers },
    { label: "Arquitectura", href: "#arquitectura", icon: Terminal },
    { label: "Habilidades", href: "#habilidades", icon: Cpu },
    { label: "Servidor JS", href: "#servidor", icon: Server },
    { label: "Contacto", href: "#contacto", icon: Mail },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            JT
          </div>
          <div>
            <div className="font-bold text-slate-100 text-sm tracking-tight flex items-center gap-2">
              Jorge Thompson
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">
                Senior
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">Software Architect</p>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-300">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 rounded-lg hover:text-cyan-400 hover:bg-slate-900/60 transition-colors flex items-center gap-1.5"
              >
                <Icon className="w-4 h-4 text-slate-400" />
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Actions & Status Pill */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#servidor"
            className="flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono border transition-colors bg-slate-900/80 hover:bg-slate-800/80"
            title={health.message || "Estado del Servidor JS"}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isServerOnline
                  ? "bg-emerald-400 animate-pulse"
                  : health.status === "connecting"
                  ? "bg-amber-400 animate-pulse"
                  : "bg-slate-500"
              }`}
            />
            <span className="text-slate-300">
              API JS:{" "}
              <strong
                className={
                  isServerOnline
                    ? "text-emerald-400"
                    : health.status === "connecting"
                    ? "text-amber-400"
                    : "text-slate-400"
                }
              >
                {isServerOnline ? "En Línea" : health.status === "connecting" ? "Conectando..." : "Modo Local"}
              </strong>
            </span>
          </a>

          <a
            href={appConfig.author.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            aria-label="GitHub Repository"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800/80 bg-slate-950/95 px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-900 hover:text-cyan-400"
              >
                <Icon className="w-5 h-5 text-slate-400" />
                <span>{item.label}</span>
              </a>
            );
          })}
          <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400 px-3">
            <span>Servidor JS: {isServerOnline ? "En Línea" : "Modo Local"}</span>
            <a
              href={appConfig.author.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-cyan-400"
            >
              <GithubIcon className="w-4 h-4" /> GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
