import { ArrowRight, Terminal, ShieldCheck, Cpu, Code2, Server, Sparkles } from "lucide-react";
import { appConfig } from "@/infrastructure/config/env";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-mono text-cyan-400 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>Next.js 16 • GitHub Pages • Clean Architecture</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
            Hola, soy{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
              Jorge Thompson
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">
            Desarrollador Senior & Arquitecto de Software.
          </p>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Especializado en diseñar sistemas empresariales desacoplados, aplicaciones estáticas de alto rendimiento preparadas para GitHub Pages y orquestación con servidores backend externos en JavaScript.
          </p>

          {/* Key featured badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-mono text-slate-300">
            <span className="px-3 py-1 rounded-md bg-slate-900/80 border border-slate-800 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" /> Patio Madera
            </span>
            <span className="px-3 py-1 rounded-md bg-slate-900/80 border border-slate-800 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-blue-400" /> SISPAT
            </span>
            <span className="px-3 py-1 rounded-md bg-slate-900/80 border border-slate-800 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-emerald-400" /> Servidor Externo JS
            </span>
            <span className="px-3 py-1 rounded-md bg-slate-900/80 border border-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Clean Architecture
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#proyectos"
              className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2 group"
            >
              <span>Explorar Proyectos</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#arquitectura"
              className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all flex items-center gap-2"
            >
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>Ver Arquitectura</span>
            </a>

            <a
              href="#servidor"
              className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all flex items-center gap-2"
            >
              <Server className="w-4 h-4 text-emerald-400" />
              <span>Consola Servidor JS</span>
            </a>
          </div>

          {/* Stats Bar */}
          <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">+10</div>
              <div className="text-xs text-slate-400 mt-1">Años Diseñando Software</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">100%</div>
              <div className="text-xs text-slate-400 mt-1">Arquitectura Limpia</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">99.9%</div>
              <div className="text-xs text-slate-400 mt-1">Alta Disponibilidad</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">Static</div>
              <div className="text-xs text-slate-400 mt-1">Despliegue GitHub Pages</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
