"use client";

import { Briefcase, Calendar, MapPin, CheckCircle2, Award, GraduationCap } from "lucide-react";
import { useLanguage } from "@/presentation/context/LanguageContext";
import { Badge } from "@/presentation/components/ui/badge";

export function Experience() {
  const { profile, t, language } = useLanguage();

  return (
    <section id="experiencia" className="py-24 border-t border-slate-900 bg-slate-950/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-xs font-mono text-cyan-400 mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{language === "es" ? "Trayectoria Profesional" : "Work History"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t("experience.title")}
          </h2>
          <p className="mt-4 text-slate-400 leading-relaxed">
            {t("experience.subtitle")}
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-slate-800/80 space-y-12 ml-2 sm:ml-4">
          {profile.experience.map((exp, index) => (
            <div key={index} className="relative group">
              {/* Timeline Glowing Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-slate-950 border-2 border-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.6)] flex items-center justify-center group-hover:scale-125 transition-transform">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </div>

              {/* Experience Card */}
              <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-slate-700/80 transition-all shadow-xl backdrop-blur-sm space-y-5">
                {/* Header: Company, Role, Period, Location */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {exp.company}
                      </h3>
                      <Badge variant="default" className="font-mono text-[11px]">
                        {index === 0
                          ? language === "es"
                            ? "Última Posición"
                            : "Latest Position"
                          : language === "es"
                          ? "Rol Previo"
                          : "Previous Role"}
                      </Badge>
                    </div>
                    <div className="text-base font-semibold text-cyan-400">
                      {exp.role}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950 border border-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950 border border-slate-800">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Structured Technical Highlights (Viñetas estructuradas) */}
                <div className="space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    {language === "es"
                      ? "Logros Técnicos Destacados & Responsabilidades:"
                      : "Key Technical Achievements & Responsibilities:"}
                  </div>
                  <div className="grid grid-cols-1 gap-2.5">
                    {exp.highlights.map((highlight, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/60 hover:border-slate-700/80 hover:bg-slate-950/90 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-300 leading-relaxed">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Education Milestone in Timeline */}
          {profile.education && (
            <div className="relative group">
              {/* Node for education */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-slate-950 border-2 border-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.6)] flex items-center justify-center group-hover:scale-125 transition-transform">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              </div>

              <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-slate-700/80 transition-all shadow-xl backdrop-blur-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                  <div>
                    <span className="text-xs font-mono text-purple-400 uppercase tracking-wider font-semibold">
                      {t("experience.education")}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1">
                      {profile.education.degree}
                    </h3>
                    <div className="text-sm text-slate-400">
                      {profile.education.institution}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300">
                      {profile.education.year}
                    </span>
                  </div>
                </div>

                {profile.education.honors && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-purple-950/30 border border-purple-800/40 text-xs sm:text-sm text-purple-300">
                    <Award className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>{profile.education.honors}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
