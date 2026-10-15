"use client";

import { useState } from "react";
import {
  Cpu,
  Smartphone,
  Server,
  Database,
  ShieldCheck,
  Terminal,
  Check,
  Copy,
  Sparkles,
  Layers,
} from "lucide-react";
import { useLanguage } from "@/presentation/context/LanguageContext";
import { Badge } from "@/presentation/components/ui/badge";

export function Skills() {
  const { profile, t, language, activeRole } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [copiedSkill, setCopiedSkill] = useState<string | null>(null);

  const getCategoryIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes("mobile") || cat.includes("móvil")) return Smartphone;
    if (cat.includes("back-end") || cat.includes("cloud")) return Server;
    if (cat.includes("data") || cat.includes("base") || cat.includes("architecture") || cat.includes("arquitectura"))
      return Database;
    if (cat.includes("security") || cat.includes("seguridad") || cat.includes("calidad") || cat.includes("quality"))
      return ShieldCheck;
    return Terminal;
  };

  const getCategoryVariant = (category: string): "default" | "blue" | "emerald" | "purple" | "amber" => {
    const cat = category.toLowerCase();
    if (cat.includes("mobile") || cat.includes("móvil")) return "default"; // cyan
    if (cat.includes("back-end") || cat.includes("cloud")) return "blue";
    if (cat.includes("data") || cat.includes("base") || cat.includes("architecture") || cat.includes("arquitectura"))
      return "purple";
    if (cat.includes("security") || cat.includes("seguridad")) return "emerald";
    return "amber";
  };

  const handleCopy = (skill: string) => {
    navigator.clipboard.writeText(skill);
    setCopiedSkill(skill);
    setTimeout(() => setCopiedSkill(null), 2000);
  };

  const displayedCategories =
    selectedCategory === "ALL"
      ? profile.skills
      : profile.skills.filter((c) => c.category === selectedCategory);

  const totalSkillsCount = profile.skills.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <section id="habilidades" className="py-24 border-t border-slate-900 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-xs font-mono text-cyan-400 mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>{language === "es" ? "Stack & Habilidades" : "Stack & Skills"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t("skills.title")}
          </h2>
          <p className="mt-4 text-slate-400 leading-relaxed">
            {t("skills.subtitle")}
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs font-mono text-slate-500">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{totalSkillsCount} {language === "es" ? "tecnologías y metodologías dominadas" : "mastered technologies and methodologies"}</span>
            <span>•</span>
            <span className="text-slate-400">{t("skills.clickToCopy")}</span>
          </div>
        </div>

        {/* Interactive Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-slate-800/80">
          <button
            onClick={() => setSelectedCategory("ALL")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              selectedCategory === "ALL"
                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{t("skills.filterAll")} ({totalSkillsCount})</span>
          </button>

          {profile.skills.map((cat) => {
            const Icon = getCategoryIcon(cat.category);
            const isSelected = selectedCategory === cat.category;
            return (
              <button
                key={cat.category}
                onClick={() => setSelectedCategory(cat.category)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  isSelected
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                    : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? "text-slate-950" : "text-cyan-400"}`} />
                <span>{cat.category}</span>
                <span className="text-[11px] opacity-70">({cat.items.length})</span>
              </button>
            );
          })}
        </div>

        {/* Categories Grid with Interactive Pills */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCategories.map((group) => {
            const Icon = getCategoryIcon(group.category);
            const variant = getCategoryVariant(group.category);

            return (
              <div
                key={group.category}
                className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-slate-700/80 transition-all shadow-xl backdrop-blur-sm space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4 border-b border-slate-800/80 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {group.category}
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-slate-500">
                      {group.items.length} items
                    </span>
                  </div>

                  {/* Interactive Pills */}
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => {
                      const isCopied = copiedSkill === skill;
                      return (
                        <button
                          key={skill}
                          onClick={() => handleCopy(skill)}
                          className="group relative focus:outline-none"
                          title={`${skill} (Click to copy)`}
                        >
                          <Badge
                            variant={variant}
                            className={`text-xs font-medium px-3 py-1 cursor-pointer transition-all duration-200 flex items-center gap-1.5 ${
                              isCopied
                                ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-md scale-105"
                                : "hover:scale-105 hover:border-slate-500"
                            }`}
                          >
                            <span>{skill}</span>
                            {isCopied ? (
                              <Check className="w-3 h-3 text-slate-950" />
                            ) : (
                              <Copy className="w-2.5 h-2.5 opacity-0 group-hover:opacity-70 transition-opacity" />
                            )}
                          </Badge>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 text-[11px] font-mono text-slate-500 text-right">
                  {language === "es" ? "Click para copiar" : "Click to copy"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
