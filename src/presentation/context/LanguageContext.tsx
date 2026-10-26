"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { profileData } from "@/data/profile";
import { profileDataEs } from "@/data/profile.es";
import { Project } from "@/core/domain/entities/project";

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
  summaryMobile?: string;
  summaryBackend?: string;
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
    "nav.universal": "Universal System",
    "nav.server": "Servidor JS",
    "nav.contact": "Contacto",
    "role.mobile": "Desarrollador Mobile",
    "role.backend": "Ingeniero Back-End",
    "hero.availabilityBadge": "Disponibilidad",
    "hero.viewExperience": "Ver Experiencia",
    "hero.exploreProjects": "Explorar Proyectos",
    "hero.downloadCV": "Descargar CV",
    "hero.copiedEmail": "¡Correo copiado al portapapeles!",
    "hero.contactMe": "Contactar",
    "hero.englishLevel": "Nivel de Inglés",
    "experience.title": "Trayectoria & Experiencia Profesional",
    "experience.subtitle": "Historial de liderazgo técnico, diseño de arquitecturas y soluciones de misión crítica.",
    "experience.education": "Formación Académica",
    "skills.title": "Especialización Técnica & Stack",
    "skills.subtitle": "Habilidades organizadas por dominios de ingeniería con badges interactivos.",
    "skills.filterAll": "Todas",
    "skills.filterRole": "Filtrar por Perfil",
    "skills.clickToCopy": "Haz clic en cualquier tecnología para copiarla",
    "skills.copied": "¡Copiado!",
    "projects.sectionBadge": "Casos de Éxito & Portafolio",
    "projects.sectionTitle": "Proyectos Principales de Alta Ingeniería",
    "projects.sectionSubtitle": "Sistemas reales diseñados bajo principios de arquitectura limpia, resiliencia offline-first, integración transaccional con ERPs corporativos y telemetría de alta concurrencia.",
    "projects.btnCode": "Código",
    "projects.btnHideDetails": "Ocultar Detalles",
    "projects.btnViewArch": "Ver Arquitectura",
    "projects.deepDescription": "Descripción Profunda & Desafío de Ingeniería",
    "projects.archDecisions": "Decisiones Arquitectónicas & Logros Clave",
    "projects.detailedStack": "Stack Tecnológico Detallado",
    "projects.stackFrontend": "Frontend & Mobile",
    "projects.stackBackend": "Backend & APIs",
    "projects.stackDatabase": "Persistencia & Edge",
    "projects.stackDevops": "Cloud & DevOps",
    "projects.evidenceTitle": "Evidencias Técnicas & Diagramas de Arquitectura",
    "projects.evidenceSubtitle": "Diagramas de red, esquemas de bases de datos y flujos de integración en proyectos reales.",
    "projects.ndaBadge": "Evidencia Técnica Sanitizada (NDA Compliant)",
    "projects.exploreTechnicalDesign": "Examinar diseño técnico",
    "projects.viewHighRes": "Ver en Alta Resolución",
    "projects.closeView": "Cerrar Vista",
    "evidence.type.architecture": "Arquitectura",
    "evidence.type.schema": "Esquema BD",
    "evidence.type.workflow": "Flujo Operacional",
    "evidence.type.ui": "Interfaz / Pantalla",
    "universal.sectionBadge": "Emprendimiento Tecnológico & Servicios",
    "universal.title": "Conoce mi PYME: Universal System",
    "universal.subtitle": "A través de Universal System brindo acompañamiento tecnológico humano con absoluta empatía y paciencia para adultos y familias, mentorías personalizadas de productividad digital y un laboratorio de soporte informático de alta precisión, bajo el lema «Porque aprender nunca fue tan fácil».",
    "universal.brandTagline": "Porque aprender nunca fue tan fácil",
    "universal.brandSub": "Asesoría Humana • Nivelación • Soporte de Precisión",
    "universal.pillar1Title": "Asesoría Tecnológica Humana",
    "universal.pillar1Desc": "Especialmente creada para adultos mayores, familias y profesionales: home banking seguro, trámites digitales oficiales y configuración de smartphones (Android & iOS) sin tecnicismos complejos.",
    "universal.pillar2Title": "Clases de Nivelación & Productividad",
    "universal.pillar2Desc": "Mentorías 1 a 1 adaptadas a tu propio ritmo: ofimática moderna (Excel, Google Sheets), herramientas de Inteligencia Artificial aplicadas al día a día y organización de archivos en la nube.",
    "universal.pillar3Title": "Soporte & Laboratorio de Precisión",
    "universal.pillar3Desc": "Diagnóstico riguroso y reparación de computadoras portátiles y de escritorio: aceleración extrema con discos SSD, mantenimiento térmico profundo y recuperación de datos confidenciales.",
    "universal.ctaExplore": "Conocer Servicios en Universal System",
    "lang.toggle": "Switch to English",
  },
  en: {
    "nav.projects": "Projects",
    "nav.experience": "Experience",
    "nav.skills": "Skills",
    "nav.architecture": "Architecture",
    "nav.universal": "Universal System",
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
    "hero.englishLevel": "English Level",
    "experience.title": "Career & Professional Experience",
    "experience.subtitle": "Track record of technical leadership, architectural design, and mission-critical solutions.",
    "experience.education": "Academic Education",
    "skills.title": "Technical Specialization & Stack",
    "skills.subtitle": "Skills grouped by engineering domains with interactive badges.",
    "skills.filterAll": "All",
    "skills.filterRole": "Filter by Role",
    "skills.clickToCopy": "Click any skill to copy",
    "skills.copied": "Copied!",
    "projects.sectionBadge": "Case Studies & Portfolio",
    "projects.sectionTitle": "High-Engineering Case Studies",
    "projects.sectionSubtitle": "Production systems architected under clean architecture, offline-first resilience, ERP transactional integration, and high-concurrency telemetry.",
    "projects.btnCode": "Code",
    "projects.btnHideDetails": "Hide Details",
    "projects.btnViewArch": "View Architecture",
    "projects.deepDescription": "Deep Overview & Engineering Challenge",
    "projects.archDecisions": "Architectural Decisions & Key Achievements",
    "projects.detailedStack": "Detailed Tech Stack",
    "projects.stackFrontend": "Frontend & Mobile",
    "projects.stackBackend": "Backend & APIs",
    "projects.stackDatabase": "Persistence & Edge",
    "projects.stackDevops": "Cloud & DevOps",
    "projects.evidenceTitle": "Technical Evidence & Architecture Diagrams",
    "projects.evidenceSubtitle": "Network topologies, database schemas, and integration pipelines from production systems.",
    "projects.ndaBadge": "Sanitized Technical Evidence (NDA Compliant)",
    "projects.exploreTechnicalDesign": "Inspect technical design",
    "projects.viewHighRes": "View in High Resolution",
    "projects.closeView": "Close View",
    "evidence.type.architecture": "Architecture",
    "evidence.type.schema": "DB Schema",
    "evidence.type.workflow": "Operational Workflow",
    "evidence.type.ui": "UI Screen",
    "universal.sectionBadge": "Tech Venture & Digital Services",
    "universal.title": "Discover My Venture: Universal System",
    "universal.subtitle": "Through Universal System, I provide empathetic tech guidance for families and seniors, 1-on-1 digital productivity mentorships, and a precision hardware diagnostic & repair lab under the motto 'Because learning was never so easy'.",
    "universal.brandTagline": "Because learning was never so easy",
    "universal.brandSub": "Human Advisory • Productivity • Precision Support",
    "universal.pillar1Title": "Human Technology Advisory",
    "universal.pillar1Desc": "Specially designed for seniors, families, and busy professionals: secure online banking, official digital procedures, and comprehensive smartphone setup with empathy and zero jargon.",
    "universal.pillar2Title": "Skill Leveling & Productivity Classes",
    "universal.pillar2Desc": "1-on-1 personalized mentorships adapted to your pace: modern office tools (Excel, Google Sheets), applied Artificial Intelligence, and cloud storage organization.",
    "universal.pillar3Title": "Precision Lab & Hardware Support",
    "universal.pillar3Desc": "Exhaustive diagnostics and repair for laptops and desktop workstations: high-speed SSD upgrades, deep thermal overhaul with premium thermal paste, and secure data recovery.",
    "universal.ctaExplore": "Explore Universal System Services",
    "lang.toggle": "Cambiar a Español",
  },
};

export function getLocalizedProject(project: Project, language: Language): Project {
  if (language === "en" && project.en) {
    return {
      ...project,
      title: project.en.title || project.title,
      subtitle: project.en.subtitle || project.subtitle,
      summary: project.en.summary || project.summary,
      description: project.en.description || project.description,
      role: project.en.role || project.role,
      architectureType: project.en.architectureType || project.architectureType,
      tags: project.en.tags || project.tags,
      highlights: project.en.highlights || project.highlights,
      metrics: project.en.metrics || project.metrics,
    };
  }
  return project;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es");
  const [activeRole, setActiveRole] = useState<ProfileRole>("mobile");

  useEffect(() => {
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

  const currentSummary =
    activeRole === "mobile"
      ? (language === "es"
          ? (profileDataEs as any).summaryMobile || (profileDataEs as any).summary
          : (profileData as any).summaryMobile?.en || (profileData as any).summary?.en)
      : (language === "es"
          ? (profileDataEs as any).summaryBackend || (profileDataEs as any).summary
          : (profileData as any).summaryBackend?.en || (profileData as any).summary?.en);

  const normalizedProfile: NormalizedProfile = {
    personalInfo: rawSource.personalInfo,
    summary: currentSummary,
    summaryMobile:
      language === "es" ? (profileDataEs as any).summaryMobile : (profileData as any).summaryMobile?.en,
    summaryBackend:
      language === "es" ? (profileDataEs as any).summaryBackend : (profileData as any).summaryBackend?.en,
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
