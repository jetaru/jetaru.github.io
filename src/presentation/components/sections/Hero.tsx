"use client";

import { useState } from "react";
import {
  Smartphone,
  Server,
  MapPin,
  Clock,
  Mail,
  Phone,
  Check,
  Copy,
  ArrowDown,
  Sparkles,
  Globe,
  ExternalLink,
} from "lucide-react";
import { useLanguage } from "@/presentation/context/LanguageContext";
import { GithubIcon, LinkedinIcon } from "@/presentation/components/ui/Icons";
import { Badge } from "@/presentation/components/ui/badge";
import { Button } from "@/presentation/components/ui/button";

export function Hero() {
  const { profile, language, activeRole, setActiveRole, t } = useLanguage();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const isMobile = activeRole === "mobile";
  const activeTitle = isMobile
    ? profile.personalInfo.titleMobile
    : profile.personalInfo.titleBackend;

  const mobilePills =
    language === "es"
      ? ["Kotlin", "Jetpack Compose", "React Native", "Android SDK", "Servicios en Segundo Plano"]
      : ["Kotlin", "Jetpack Compose", "React Native", "Android SDK", "Background Services"];

  const backendPills = [
    "NestJS",
    "Node.js",
    ".NET Core",
    "SAP BTP",
    "SAP HANA",
    "Oracle SQL",
    "Clean Architecture",
  ];

  const currentPills = isMobile ? mobilePills : backendPills;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[420px] h-[320px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-7">
          {/* Top Status & Availability Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-800/60 text-xs font-mono text-emerald-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{profile.personalInfo.availability}</span>
            </div>

            {/* Location Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{profile.personalInfo.location}</span>
            </div>

            {/* English Level */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>{t("hero.englishLevel")}: {profile.personalInfo.englishLevel}</span>
            </div>
          </div>

          {/* Profile Role Selector */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
            <button
              onClick={() => setActiveRole("mobile")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                isMobile
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/20 font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Smartphone className={`w-4 h-4 ${isMobile ? "text-slate-950" : "text-cyan-400"}`} />
              <span>{t("role.mobile")}</span>
            </button>

            <button
              onClick={() => setActiveRole("backend")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                !isMobile
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Server className={`w-4 h-4 ${!isMobile ? "text-white" : "text-blue-400"}`} />
              <span>{t("role.backend")}</span>
            </button>
          </div>

          {/* Main Name & Dynamic Role Headline */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15]">
              {profile.personalInfo.name}
            </h1>
            <div className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
              {activeTitle}
            </div>
          </div>

          {/* Summary */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {profile.summary}
          </p>

          {/* Dynamic Technology Stack Highlights based on active profile */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="text-xs font-mono text-slate-400 mr-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Focus:
            </span>
            {currentPills.map((tech) => (
              <Badge
                key={tech}
                variant={isMobile ? "default" : "blue"}
                className="text-xs font-mono px-3 py-1 cursor-default"
              >
                {tech}
              </Badge>
            ))}
          </div>

          {/* Action Links & Socials */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            {/* GitHub Button */}
            <a
              href={profile.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-white font-medium text-xs sm:text-sm transition-all flex items-center gap-2 shadow-sm"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            {/* LinkedIn Button */}
            <a
              href={profile.personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-white font-medium text-xs sm:text-sm transition-all flex items-center gap-2 shadow-sm"
            >
              <LinkedinIcon className="w-4 h-4 text-blue-400" />
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            {/* Email Copy Button */}
            <button
              onClick={handleCopyEmail}
              className="px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-white font-medium text-xs sm:text-sm transition-all flex items-center gap-2 shadow-sm"
              title="Click to copy email"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">
                    {language === "es" ? "¡Copiado!" : "Copied!"}
                  </span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>{profile.personalInfo.email}</span>
                  <Copy className="w-3 h-3 text-slate-400" />
                </>
              )}
            </button>

            {/* Direct Contact Anchor */}
            <a
              href="#contacto"
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-1.5"
            >
              <span>{t("hero.contactMe")}</span>
            </a>
          </div>

          {/* Quick jump anchors */}
          <div className="pt-6 flex items-center justify-center gap-4 text-xs font-mono text-slate-400">
            <a
              href="#experiencia"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <ArrowDown className="w-3 h-3" /> {t("hero.viewExperience")}
            </a>
            <span>•</span>
            <a
              href="#habilidades"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <ArrowDown className="w-3 h-3" /> {t("nav.skills")}
            </a>
            <span>•</span>
            <a
              href="#proyectos"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <ArrowDown className="w-3 h-3" /> {t("nav.projects")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
