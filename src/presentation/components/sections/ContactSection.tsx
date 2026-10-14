"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2, AlertCircle, MapPin, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/presentation/components/ui/Icons";
import { useContact } from "@/presentation/hooks/useContact";
import { appConfig } from "@/infrastructure/config/env";

export function ContactSection() {
  const { submitting, result, sendMessage, resetResult } = useContact();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await sendMessage(form);
    if (ok) {
      setForm({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <section id="contacto" className="py-24 border-t border-slate-900 bg-slate-950/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-xs font-mono text-cyan-400 mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>Contacto Directo & Contratación</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Iniciemos una Conversación Técnica
          </h2>
          <p className="mt-4 text-slate-400 leading-relaxed">
            ¿Buscas liderar la arquitectura de un nuevo proyecto, modernizar sistemas legados o escalar plataformas críticas?
            Envíame un mensaje y evaluemos juntos la solución.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Jorge Thompson</h3>
              <p className="text-xs text-cyan-400 font-mono font-medium">
                Senior Software Engineer & Architect
              </p>
            </div>

            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Correo Electrónico</div>
                  <a
                    href={`mailto:${appConfig.author.email}`}
                    className="text-slate-200 hover:text-cyan-400 transition-colors font-mono text-xs"
                  >
                    {appConfig.author.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Ubicación & Modalidad</div>
                  <div className="text-slate-200 text-xs">Chile • Remoto Global / Híbrido</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">GitHub Pages</div>
                  <a
                    href={appConfig.author.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline font-mono text-xs"
                  >
                    jetaru.github.io
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80">
              <span className="text-xs text-slate-500 block mb-3">Redes y Repositorios</span>
              <div className="flex items-center gap-3">
                <a
                  href={appConfig.author.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={appConfig.author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800">
            {result && result.success ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white">¡Mensaje Enviado con Éxito!</h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  {result.message}
                </p>
                {result.ticketId && (
                  <div className="inline-block p-2 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-400">
                    ID de Seguimiento: {result.ticketId}
                  </div>
                )}
                <div>
                  <button
                    onClick={resetResult}
                    className="mt-4 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {result && !result.success && (
                  <div className="p-4 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{result.message}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">Nombre / Empresa</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Tu nombre o empresa"
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">Correo Electrónico</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="correo@ejemplo.com"
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400">Asunto</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Consulta sobre desarrollo, arquitectura o proyecto"
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400">Mensaje Detallado</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Cuéntame sobre tu proyecto o requerimiento técnico..."
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? "Enviando al Servidor..." : "Enviar Mensaje"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
