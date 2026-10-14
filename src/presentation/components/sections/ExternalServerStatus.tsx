"use client";

import { useState } from "react";
import { Server, Activity, RefreshCw, CheckCircle, AlertTriangle, XCircle, Terminal, Play } from "lucide-react";
import { useServerStatus } from "@/presentation/hooks/useServerStatus";

export function ExternalServerStatus() {
  const { health, loading, customUrl, checkStatus, updateUrlAndCheck } = useServerStatus();
  const [inputUrl, setInputUrl] = useState(customUrl);

  const handleTestUrl = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrlAndCheck(inputUrl);
  };

  const isOnline = health.status === "online";
  const isDegraded = health.status === "degraded";

  return (
    <section id="servidor" className="py-24 border-t border-slate-900 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/50 text-xs font-mono text-emerald-400 mb-4">
            <Server className="w-3.5 h-3.5" />
            <span>Consola del Servidor JS Externo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Monitoreo e Integración con Backend Externo
          </h2>
          <p className="mt-4 text-slate-400 leading-relaxed">
            La página estática alojada en GitHub Pages está configurada para conectarse a un servidor externo en JavaScript
            (Node.js / Express). Puedes probar la conectividad en vivo o ejecutar el servidor local incluido.
          </p>
        </div>

        {/* Dashboard Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 space-y-8">
          {/* Top Status Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-slate-950 border border-slate-800/80">
            <div className="flex items-center gap-3">
              <div
                className={`w-4 h-4 rounded-full ${
                  isOnline
                    ? "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)] animate-pulse"
                    : isDegraded
                    ? "bg-amber-400"
                    : "bg-slate-500"
                }`}
              />
              <div>
                <div className="text-base font-bold text-white flex items-center gap-2">
                  <span>Estado:</span>
                  <span
                    className={
                      isOnline
                        ? "text-emerald-400"
                        : isDegraded
                        ? "text-amber-400"
                        : "text-slate-400"
                    }
                  >
                    {isOnline ? "OPERATIVO (ONLINE)" : isDegraded ? "DEGRADADO" : "OFFLINE / MODO CONTINGENCIA"}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{health.message}</p>
              </div>
            </div>

            <button
              onClick={() => checkStatus()}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-cyan-400" : ""}`} />
              <span>{loading ? "Comprobando..." : "Hacer Ping"}</span>
            </button>
          </div>

          {/* Telemetry Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-mono text-slate-400">Latencia Ping</span>
              <div className="text-xl font-bold font-mono text-white mt-1">
                {health.latencyMs !== undefined ? `${health.latencyMs} ms` : "—"}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-mono text-slate-400">Tiempo Activo (Uptime)</span>
              <div className="text-xl font-bold font-mono text-cyan-400 mt-1">
                {health.uptimeSeconds !== undefined ? `${health.uptimeSeconds}s` : "—"}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-mono text-slate-400">Runtime Detectado</span>
              <div className="text-sm font-bold font-mono text-slate-200 mt-1 truncate">
                {health.runtime || "Stand-alone"}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-mono text-slate-400">Endpoint Consultor</span>
              <div className="text-xs font-mono text-slate-400 mt-1 truncate" title={health.endpointUrl}>
                {health.endpointUrl || "/api/health"}
              </div>
            </div>
          </div>

          {/* Interactive URL Tester Form */}
          <div className="p-6 rounded-xl bg-slate-950/70 border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              Probar Endpoint del Servidor en Vivo
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ingresa la URL base de tu servidor externo (ejemplo: <code className="text-cyan-300">http://localhost:4000/api</code> si lo corres en local, o tu URL desplegada en Render / Railway):
            </p>

            <form onSubmit={handleTestUrl} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="http://localhost:4000/api"
                className="flex-1 px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-xs sm:text-sm font-mono focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm font-mono transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>Conectar & Testear</span>
              </button>
            </form>
          </div>

          {/* Quickstart Instructions */}
          <div className="p-5 rounded-xl bg-slate-950/40 border border-slate-800/60 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300 font-semibold">
              <Play className="w-3.5 h-3.5 text-emerald-400" />
              ¿Cómo iniciar el servidor JS externo incluido?
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              En este proyecto ya tienes incluido el archivo <code className="text-cyan-300 font-mono">server/server.js</code> con endpoints <code className="text-cyan-300 font-mono">/api/health</code>, <code className="text-cyan-300 font-mono">/api/projects</code> y <code className="text-cyan-300 font-mono">/api/contact</code> listos.
            </p>
            <div className="p-3 rounded-lg bg-slate-900 font-mono text-xs text-emerald-400 border border-slate-800 flex items-center justify-between">
              <span>npm run server</span>
              <span className="text-slate-500 text-[11px]">Inicia en el puerto 4000</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
