"use client";

import { useState } from "react";
import {
  Layers,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Cpu,
  Database,
  Terminal,
  Activity,
} from "lucide-react";
import { GithubIcon } from "@/presentation/components/ui/Icons";
import { useProjects } from "@/presentation/hooks/useProjects";
import { Project } from "@/core/domain/entities/project";

export function ProjectsSection() {
  const { projects, loading, error } = useProjects();
  const [expandedId, setExpandedId] = useState<string | null>("patio-madera");

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="proyectos" className="py-24 border-t border-slate-900 bg-slate-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-xs font-mono text-cyan-400 mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Casos de Éxito & Portafolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Proyectos Principales de Alta Ingeniería
          </h2>
          <p className="mt-4 text-slate-400 leading-relaxed">
            Sistemas reales diseñados bajo principios de arquitectura limpia, alta concurrencia y máxima
            eficiencia operativa en sectores logísticos e industriales.
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="p-12 text-center text-slate-400 font-mono flex items-center justify-center gap-3">
            <Activity className="w-5 h-5 animate-spin text-cyan-400" />
            <span>Consultando repositorio de proyectos (Clean Architecture)...</span>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="p-6 rounded-xl bg-red-950/30 border border-red-800 text-red-300 text-sm mb-8">
            {error}
          </div>
        )}

        {/* Projects Grid / Stack */}
        <div className="space-y-8">
          {projects.map((project: Project) => {
            const isExpanded = expandedId === project.id;

            return (
              <div
                key={project.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-slate-700/80 transition-all overflow-hidden shadow-xl"
              >
                {/* Main Card Header */}
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                          {project.title}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                          {project.status}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700">
                          {project.architectureType}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-cyan-400 font-mono">
                        {project.subtitle} • Rol: {project.role}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors flex items-center gap-1.5"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Código</span>
                        </a>
                      )}
                      <button
                        onClick={() => toggleExpand(project.id)}
                        className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors flex items-center gap-2"
                      >
                        <span>{isExpanded ? "Ocultar Detalles" : "Ver Arquitectura"}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Metrics preview */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {project.metrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80"
                        >
                          <div className="text-lg sm:text-xl font-bold font-mono text-cyan-400">
                            {metric.value}
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5 leading-snug">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Expanded Details Panel */}
                {isExpanded && (
                  <div className="border-t border-slate-800/80 bg-slate-950/70 p-6 sm:p-8 space-y-6 animate-fadeIn">
                    {/* Deep Description */}
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                        Descripción Profunda & Desafío de Ingeniería
                      </h4>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Highlights */}
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                        Decisiones Arquitectónicas & Logros Clave
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {project.highlights.map((h, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900/60 border border-slate-800/60 text-xs sm:text-sm text-slate-300"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech stack matrix */}
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                        Stack Tecnológico Detallado
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                          <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 mb-2">
                            <Terminal className="w-3.5 h-3.5" /> Frontend
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {project.techStack.frontend.map((t) => (
                              <span
                                key={t}
                                className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                          <div className="flex items-center gap-1.5 text-xs font-mono text-blue-400 mb-2">
                            <Cpu className="w-3.5 h-3.5" /> Backend & APIs
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {project.techStack.backend.map((t) => (
                              <span
                                key={t}
                                className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                          <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 mb-2">
                            <Database className="w-3.5 h-3.5" /> Persistencia
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {project.techStack.database.map((t) => (
                              <span
                                key={t}
                                className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                          <div className="flex items-center gap-1.5 text-xs font-mono text-purple-400 mb-2">
                            <Layers className="w-3.5 h-3.5" /> DevOps & CI/CD
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {project.techStack.devops.map((t) => (
                              <span
                                key={t}
                                className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
