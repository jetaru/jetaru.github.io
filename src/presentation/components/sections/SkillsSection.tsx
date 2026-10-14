"use client";

import { useState, useEffect } from "react";
import { Cpu, Terminal, Database, Cloud, CheckCircle, Shield } from "lucide-react";
import { container } from "@/infrastructure/container";
import { SkillCategory } from "@/core/domain/entities/skill";

export function SkillsSection() {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [selectedCat, setSelectedCat] = useState<string>("architecture");

  useEffect(() => {
    container.getSkillsUseCase.execute().then(setCategories);
  }, []);

  const currentCategory = categories.find((c) => c.id === selectedCat) || categories[0];

  const categoryIcons: Record<string, typeof Cpu> = {
    architecture: Shield,
    frontend: Terminal,
    backend: Cpu,
    "data-devops": Cloud,
  };

  return (
    <section id="habilidades" className="py-24 border-t border-slate-900 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-xs font-mono text-cyan-400 mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>Matriz Técnica de Habilidades</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Especialización y Capacidades Senior
          </h2>
          <p className="mt-4 text-slate-400 leading-relaxed">
            Dominio profundo de tecnologías modernas, patrones arquitectónicos y diseño de infraestructuras escalables.
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-800/80 pb-4">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.id] || Cpu;
            const isSelected = selectedCat === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 ${
                  isSelected
                    ? "bg-cyan-500 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20"
                    : "bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800"
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? "text-slate-950" : "text-cyan-400"}`} />
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Category Content */}
        {currentCategory && (
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-6">
            <div className="border-b border-slate-800/80 pb-4">
              <h3 className="text-xl font-bold text-white">{currentCategory.title}</h3>
              <p className="text-sm text-slate-400 mt-1">{currentCategory.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentCategory.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/70 hover:border-slate-700 transition-colors flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="font-semibold text-white text-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{skill.name}</span>
                    </div>
                    {skill.description && (
                      <p className="text-xs text-slate-400 pl-6 leading-relaxed">
                        {skill.description}
                      </p>
                    )}
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-mono font-medium shrink-0 ${
                      skill.level === "Experto"
                        ? "bg-emerald-950 text-emerald-400 border border-emerald-800/60"
                        : "bg-blue-950 text-blue-400 border border-blue-800/60"
                    }`}
                  >
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
