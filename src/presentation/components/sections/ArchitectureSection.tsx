"use client";

import { useState } from "react";
import { Terminal, Shield, ArrowRight, Server, Globe, Cpu, Database, Check } from "lucide-react";

export function ArchitectureSection() {
  const [activeTab, setActiveTab] = useState<"clean" | "external" | "deployment">("clean");

  return (
    <section id="arquitectura" className="py-24 border-t border-slate-900 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/50 text-xs font-mono text-blue-400 mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>Clean Architecture & Escalabilidad</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Arquitectura de Software y Diseño de Sistemas
          </h2>
          <p className="mt-4 text-slate-400 leading-relaxed">
            Este proyecto ha sido estructurado siguiendo estrictamente los principios de Arquitectura Limpia (Clean Architecture)
            y diseño hexagonal, permitiendo que una página estática en GitHub Pages interactúe sin fricción con un servidor externo en JavaScript.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-800 mb-8 space-x-2 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab("clean")}
            className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-mono font-medium transition-colors flex items-center gap-2 ${
              activeTab === "clean"
                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Capas Clean Architecture</span>
          </button>

          <button
            onClick={() => setActiveTab("external")}
            className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-mono font-medium transition-colors flex items-center gap-2 ${
              activeTab === "external"
                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <Server className="w-4 h-4" />
            <span>Integración Servidor JS Externo</span>
          </button>

          <button
            onClick={() => setActiveTab("deployment")}
            className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-mono font-medium transition-colors flex items-center gap-2 ${
              activeTab === "deployment"
                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Estrategia GitHub Pages</span>
          </button>
        </div>

        {/* Tab 1: Clean Architecture Layers */}
        {activeTab === "clean" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-fadeIn">
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/40 transition-colors space-y-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-mono font-bold text-sm">
                01
              </div>
              <h3 className="text-lg font-bold text-white">Dominio (Core)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Entidades puras y contratos (interfaces) de repositorios. No depende de ningún framework, librería ni API externa.
              </p>
              <div className="pt-2 font-mono text-[11px] text-purple-300 space-y-1">
                <div>• Project, Skill, ContactMessage</div>
                <div>• IProjectRepository</div>
                <div>• IContactRepository, IServerRepository</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/40 transition-colors space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono font-bold text-sm">
                02
              </div>
              <h3 className="text-lg font-bold text-white">Casos de Uso</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Reglas de negocio y orquestación de la aplicación. Aplican validaciones y coordinan la ejecución sin conocer la infraestructura.
              </p>
              <div className="pt-2 font-mono text-[11px] text-blue-300 space-y-1">
                <div>• GetProjectsUseCase</div>
                <div>• SendContactUseCase</div>
                <div>• CheckServerStatusUseCase</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/40 transition-colors space-y-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-sm">
                03
              </div>
              <h3 className="text-lg font-bold text-white">Infraestructura</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Implementación de adaptadores: cliente HTTP, llamada a APIs externas y repositorios mock con fallback automático de contingencia.
              </p>
              <div className="pt-2 font-mono text-[11px] text-cyan-300 space-y-1">
                <div>• HttpProjectRepository</div>
                <div>• MockProjectRepository (Fallback)</div>
                <div>• ApiClient con timeout & retry</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/40 transition-colors space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-sm">
                04
              </div>
              <h3 className="text-lg font-bold text-white">Presentación (UI)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Componentes React 19 desacoplados, Next.js App Router, Tailwind CSS v4 y Hooks que consumen el contenedor de inyección de dependencias.
              </p>
              <div className="pt-2 font-mono text-[11px] text-emerald-300 space-y-1">
                <div>• useProjects, useServerStatus</div>
                <div>• Componentes atómicos y secciones</div>
                <div>• DiContainer (IoC)</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: External JS Server Integration */}
        {activeTab === "external" && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              {/* Client Box */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-center sm:text-left">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800">
                  Cliente Estático
                </span>
                <h4 className="font-bold text-white text-base">GitHub Pages (Next.js)</h4>
                <p className="text-xs text-slate-400">
                  Aloja HTML, CSS y JS optimizados estáticamente. Se ejecuta en la CDN de GitHub Pages con carga instantánea y costo $0.
                </p>
              </div>

              {/* Arrow / Protocol Box */}
              <div className="flex flex-col items-center justify-center p-3 text-center space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
                  <span>HTTPS / REST JSON</span>
                  <ArrowRight className="w-4 h-4 hidden lg:inline" />
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-300">
                  CORS Habilitado • Resilient Fallback
                </div>
              </div>

              {/* Server Box */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-center sm:text-left">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Backend Externo
                </span>
                <h4 className="font-bold text-white text-base">Servidor JavaScript / Node.js</h4>
                <p className="text-xs text-slate-400">
                  Servicio externo (Express, Fastify, microservicio Node o serverless) ejecutándose en Render, Railway, VPS o Docker.
                </p>
              </div>
            </div>

            <div className="border-t border-slate-800/80 pt-6">
              <h4 className="text-sm font-semibold text-white mb-3">
                ¿Por qué esta solución es altamente resiliente?
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
                <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/60">
                  <div className="font-bold text-cyan-400 mb-1 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" /> Desacoplamiento Total
                  </div>
                  Si el servidor externo se reinicia, cae o está en frío, la página estática sigue funcionando al 100% gracias al fallback inteligente.
                </div>
                <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/60">
                  <div className="font-bold text-cyan-400 mb-1 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" /> Seguridad y CORS
                  </div>
                  Las credenciales y lógica privada residen en el backend externo; el cliente estático sólo consume endpoints públicos sanitizados.
                </div>
                <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/60">
                  <div className="font-bold text-cyan-400 mb-1 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" /> Configurable en Caliente
                  </div>
                  La URL del backend puede definirse mediante <code className="text-cyan-300">NEXT_PUBLIC_API_URL</code> o probarse en vivo desde la consola del portafolio.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: GitHub Pages Deployment */}
        {activeTab === "deployment" && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 space-y-6 animate-fadeIn">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">
                Flujo Automatizado de Despliegue con GitHub Actions
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                El repositorio <code className="text-cyan-300 font-mono">jetaru.github.io</code> está configurado con Next.js en modo
                <code className="text-cyan-300 font-mono"> output: &apos;export&apos;</code>. Al subir cambios a GitHub, la acción automatizada compila los archivos estáticos en la carpeta <code className="text-cyan-300 font-mono">out/</code> y los publica directamente en GitHub Pages.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs font-mono text-cyan-400 font-semibold">1. Commit & Push</div>
                  <p className="text-xs text-slate-400">
                    Trabajas en ramas (ej. <code className="text-slate-300 font-mono">develop</code> o <code className="text-slate-300 font-mono">main</code>) y realizas git push al repositorio.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs font-mono text-blue-400 font-semibold">2. Build Automatizado</div>
                  <p className="text-xs text-slate-400">
                    GitHub Actions ejecuta <code className="text-slate-300 font-mono">npm run build</code>, exportando HTML estático optimizado, scripts empaquetados y assets.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs font-mono text-emerald-400 font-semibold">3. Despliegue en CDN</div>
                  <p className="text-xs text-slate-400">
                    GitHub Pages distribuye el sitio en su red global bajo el dominio <code className="text-emerald-300 font-mono">https://jetaru.github.io</code>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
