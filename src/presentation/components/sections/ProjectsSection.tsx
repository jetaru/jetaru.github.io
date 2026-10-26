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
  ShieldCheck,
  ZoomIn,
  X,
  Image as ImageIcon,
} from "lucide-react";
import { GithubIcon } from "@/presentation/components/ui/Icons";
import { useProjects } from "@/presentation/hooks/useProjects";
import { Project, ProjectEvidence } from "@/core/domain/entities/project";
import { useLanguage, getLocalizedProject } from "@/presentation/context/LanguageContext";

export function ProjectsSection() {
  const { language, t } = useLanguage();
  const { projects, loading, error } = useProjects();
  const [expandedId, setExpandedId] = useState<string | null>("inspeccion-industrial-sap");
  const [selectedEvidence, setSelectedEvidence] = useState<ProjectEvidence | null>(null);

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
            <span>{t("projects.sectionBadge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t("projects.sectionTitle")}
          </h2>
          <p className="mt-4 text-slate-400 leading-relaxed">
            {t("projects.sectionSubtitle")}
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="p-12 text-center text-slate-400 font-mono flex items-center justify-center gap-3">
            <Activity className="w-5 h-5 animate-spin text-cyan-400" />
            <span>
              {language === "es"
                ? "Consultando repositorio de proyectos (Clean Architecture)..."
                : "Querying project repository (Clean Architecture)..."}
            </span>
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
          {projects.map((rawProject: Project) => {
            const project = getLocalizedProject(rawProject, language);
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
                        {project.subtitle} • {language === "es" ? "Rol" : "Role"}: {project.role}
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
                          <span>{t("projects.btnCode")}</span>
                        </a>
                      )}
                      <button
                        onClick={() => toggleExpand(project.id)}
                        className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors flex items-center gap-2"
                      >
                        <span>{isExpanded ? t("projects.btnHideDetails") : t("projects.btnViewArch")}</span>
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
                        {t("projects.deepDescription")}
                      </h4>
                      <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                        {project.description}
                      </p>
                    </div>

                    {/* Highlights */}
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                        {t("projects.archDecisions")}
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
                        {t("projects.detailedStack")}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                          <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 mb-2">
                            <Terminal className="w-3.5 h-3.5" /> {t("projects.stackFrontend")}
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {project.techStack.frontend.map((tItem) => (
                              <span
                                key={tItem}
                                className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300"
                              >
                                {tItem}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                          <div className="flex items-center gap-1.5 text-xs font-mono text-blue-400 mb-2">
                            <Cpu className="w-3.5 h-3.5" /> {t("projects.stackBackend")}
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {project.techStack.backend.map((tItem) => (
                              <span
                                key={tItem}
                                className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300"
                              >
                                {tItem}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                          <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 mb-2">
                            <Database className="w-3.5 h-3.5" /> {t("projects.stackDatabase")}
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {project.techStack.database.map((tItem) => (
                              <span
                                key={tItem}
                                className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300"
                              >
                                {tItem}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                          <div className="flex items-center gap-1.5 text-xs font-mono text-purple-400 mb-2">
                            <Layers className="w-3.5 h-3.5" /> {t("projects.stackDevops")}
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {project.techStack.devops.map((tItem) => (
                              <span
                                key={tItem}
                                className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300"
                              >
                                {tItem}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Evidencias Técnicas & Diagramas de Arquitectura (NDA Compliant) */}
                    {project.evidences && project.evidences.length > 0 && (
                      <div className="pt-4 border-t border-slate-800/80">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                          <div>
                            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300">
                              {t("projects.evidenceTitle")}
                            </h4>
                            <p className="text-xs text-slate-400 mt-0.5">
                              {t("projects.evidenceSubtitle")}
                            </p>
                          </div>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 w-fit">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{t("projects.ndaBadge")}</span>
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {project.evidences.map((evidence, idx) => (
                            <div
                              key={idx}
                              onClick={() => setSelectedEvidence(evidence)}
                              className="group relative rounded-xl border border-slate-800 bg-slate-900/70 overflow-hidden hover:border-cyan-500/50 transition-all cursor-pointer flex flex-col shadow-md"
                            >
                              {/* Image Preview with Hover Overlay */}
                              <div className="relative w-full h-48 bg-slate-950 flex items-center justify-center overflow-hidden border-b border-slate-800/80">
                                <img
                                  src={evidence.url}
                                  alt={evidence.title}
                                  className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-cyan-300 font-mono text-xs">
                                  <ZoomIn className="w-4 h-4 text-cyan-400" />
                                  <span>{t("projects.viewHighRes")}</span>
                                </div>
                                <div className="absolute top-2 left-2">
                                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold bg-slate-900/90 text-cyan-300 border border-slate-700 backdrop-blur-sm">
                                    {t("evidence.type." + evidence.type)}
                                  </span>
                                </div>
                              </div>
                              {/* Card Info */}
                              <div className="p-3.5 flex-1 flex flex-col justify-between">
                                <div>
                                  <h5 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                                    {evidence.title}
                                  </h5>
                                  <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                                    {evidence.description}
                                  </p>
                                </div>
                                <div className="mt-2.5 flex items-center gap-1 text-[11px] font-mono text-cyan-400">
                                  <span>{t("projects.exploreTechnicalDesign")}</span>
                                  <ExternalLink className="w-3 h-3" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Preview for High-Resolution Diagrams */}
      {selectedEvidence && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedEvidence(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-900 border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:px-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    {selectedEvidence.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" /> {t("projects.ndaBadge")}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-[11px] font-mono uppercase text-slate-400">
                      {language === "es" ? "Tipo: " : "Type: "}
                      {t("evidence.type." + selectedEvidence.type)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedEvidence(null)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Body with Scroll */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 bg-slate-950 flex items-center justify-center min-h-[300px]">
              <img
                src={selectedEvidence.url}
                alt={selectedEvidence.title}
                className="max-h-[68vh] w-auto max-w-full object-contain rounded-lg shadow-lg border border-slate-800"
              />
            </div>

            {/* Modal Footer Description */}
            <div className="p-4 sm:px-6 bg-slate-900/95 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-300">
              <p className="leading-relaxed text-slate-300 max-w-3xl">
                {selectedEvidence.description}
              </p>
              <button
                onClick={() => setSelectedEvidence(null)}
                className="self-end sm:self-auto px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs transition-colors shrink-0"
              >
                {t("projects.closeView")}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
