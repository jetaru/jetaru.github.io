"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { profileData } from "@/data/profile";
import { profileDataEs } from "@/data/profile.es";

export type Language = "es" | "en";
export type ProfileRole = "mobile" | "backend";

export interface NormalizedProfile {
  personalInfo: {
    name: string;
    titleMobile: string;
    titleBackend: string;
    location: string;
    availability: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    englishLevel: string;
  };
  summary: string;
  skills: Array<{ category: string; items: string[] }>;
  experience: Array<{
    company: string;
    role: string;
    period: string;
    location: string;
    highlights: string[];
  }>;
  education: {
    degree: string;
    institution: string;
    year: string;
    honors?: string;
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  activeRole: ProfileRole;
  setActiveRole: (role: ProfileRole) => void;
  profile: NormalizedProfile;
  t: (key: string) => string;
}

const UI_STRINGS: Record<Language, Record<string, string>> = {
  es: {
    "nav.projects": "Proyectos",
    "nav.experience": "Experiencia",
    "nav.skills": "Habilidades",
    "nav.architecture": "Arquitectura",
    "nav.server": "Servidor JS",
    "nav.contact": "Contacto",
    "role.mobile": "Mobile Developer",
    "role.backend": "Back-End Engineer",
    "hero.availabilityBadge": "Disponibilidad",
    "hero.viewExperience": "Ver Experiencia",
    "hero.exploreProjects": "Explorar Proyectos",
    "hero.downloadCV": "Descargar CV",
    "hero.copiedEmail": "¡Correo copiado al portapapeles!",
    "hero.contactMe": "Contactar",
    "experience.title": "Trayectoria & Experiencia Profesional",
    "experience.subtitle": "Historial de liderazgo técnico, diseño de arquitecturas y soluciones de misión crítica.",
    "experience.education": "Formación Académica",
    "skills.title": "Especialización Técnica & Stack",
    "skills.subtitle": "Habilidades organizadas por dominios de ingeniería con badges interactivos.",
    "skills.filterAll": "Todas",
    "skills.filterRole": "Filtrar por Perfil",
    "skills.clickToCopy": "Haz clic en cualquier tecnología para copiarla",
    "skills.copied": "¡Copiado!",
    "lang.toggle": "Switch to English",
  },
  en: {
    "nav.projects": "Projects",
    "nav.experience": "Experience",
    "nav.skills": "Skills",
    "nav.architecture": "Architecture",
    "nav.server": "JS Server",
    "nav.contact": "Contact",
    "role.mobile": "Mobile Developer",
    "role.backend": "Back-End Engineer",
    "hero.availabilityBadge": "Availability",
    "hero.viewExperience": "View Experience",
    "hero.exploreProjects": "Explore Projects",
    "hero.downloadCV": "Download CV",
    "hero.copiedEmail": "Email copied to clipboard!",
    "hero.contactMe": "Contact Me",
    "experience.title": "Career & Professional Experience",
    "experience.subtitle": "Track record of technical leadership, architectural design, and mission-critical solutions.",
    "experience.education": "Academic Education",
    "skills.title": "Technical Specialization & Stack",
    "skills.subtitle": "Skills grouped by engineering domains with interactive badges.",
    "skills.filterAll": "All",
    "skills.filterRole": "Filter by Role",
    "skills.clickToCopy": "Click any skill to copy",
    "skills.copied": "Copied!",
    "lang.toggle": "Cambiar a Español",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es");
  const [activeRole, setActiveRole] = useState<ProfileRole>("mobile");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 1. Check saved language preference in localStorage
    const saved = localStorage.getItem("jetaru_lang") as Language | null;
    if (saved === "es" || saved === "en") {
      setLanguageState(saved);
      return;
    }

    // 2. Initial detection based on user's browser language
    if (typeof navigator !== "undefined" && navigator.language) {
      const isSpanish = navigator.language.toLowerCase().startsWith("es");
      setLanguageState(isSpanish ? "es" : "en");
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("jetaru_lang", lang);
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === "es" ? "en" : "es";
    setLanguage(nextLang);
  };

  const rawSource = language === "es" ? profileDataEs : profileData;

  const normalizedProfile: NormalizedProfile = {
    personalInfo: rawSource.personalInfo,
    summary:
      typeof rawSource.summary === "string"
        ? rawSource.summary
        : language === "es"
        ? rawSource.summary.es
        : rawSource.summary.en,
    skills: rawSource.skills,
    experience: rawSource.experience,
    education: rawSource.education,
  };

  const t = (key: string): string => {
    return UI_STRINGS[language][key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        activeRole,
        setActiveRole,
        profile: normalizedProfile,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
