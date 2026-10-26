"use client";

import {
  Sparkles,
  ExternalLink,
  HeartHandshake,
  GraduationCap,
  Wrench,
} from "lucide-react";
import { useLanguage } from "@/presentation/context/LanguageContext";

export function UniversalSystemSection() {
  const { t } = useLanguage();

  return (
    <section id="universal-system" className="py-24 border-t border-slate-900 bg-slate-950/80 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/90 via-slate-950/90 to-slate-900/80 p-8 sm:p-12 lg:p-16 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          
          {/* Top Decorative Elements */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left Content */}
            <div className="max-w-2xl space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-xs font-mono text-cyan-400">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t("universal.sectionBadge")}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
                {t("universal.title")}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {t("universal.subtitle")}
              </p>

              {/* Direct Access CTA */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a
                  href="https://jetaru.github.io/universal-system/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm font-mono shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2 group"
                >
                  <span>{t("universal.ctaExplore")}</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right Logo & Brand Emblem */}
            <div className="shrink-0 flex flex-col items-center justify-center relative">
              <div className="relative p-6 sm:p-8 rounded-3xl bg-slate-950/90 border border-slate-800 shadow-2xl flex items-center justify-center group hover:border-cyan-500/50 transition-all">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 rounded-3xl blur-sm" />
                <img
                  src="/assets/universal-system-logo.png"
                  alt="Universal System - Porque aprender nunca fue tan fácil"
                  className="w-48 sm:w-56 h-auto object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-3 text-center">
                <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wider">
                  {t("universal.brandTagline")}
                </span>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                  {t("universal.brandSub")}
                </p>
              </div>
            </div>
          </div>

          {/* 3 Real Service Pillars */}
          <div className="mt-12 pt-10 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white tracking-tight">
                {t("universal.pillar1Title")}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t("universal.pillar1Desc")}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white tracking-tight">
                {t("universal.pillar2Title")}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t("universal.pillar2Desc")}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                <Wrench className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white tracking-tight">
                {t("universal.pillar3Title")}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t("universal.pillar3Desc")}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
