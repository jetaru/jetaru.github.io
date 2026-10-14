import { IProjectRepository } from "@/core/domain/repositories/IProjectRepository";
import { Project } from "@/core/domain/entities/project";

export const MOCK_PROJECTS: Project[] = [
  {
    id: "patio-madera",
    slug: "patio-madera",
    title: "Patio Madera",
    subtitle: "Plataforma Logística y Trazabilidad Operacional",
    summary:
      "Sistema integral de gestión logística e inventario en tiempo real diseñado para optimizar el flujo de despacho, recepción y cubicación en patios industriales.",
    description:
      "Patio Madera es una solución corporativa de alto rendimiento orientada a la industria de manufactura y distribución. Resuelve problemas críticos de cuello de botella mediante sincronización en tiempo real, control de stock volumétrico, trazabilidad por código/RFID y generación automatizada de órdenes de despacho.",
    role: "Lead Software Architect & Full Stack Engineer",
    architectureType: "Clean Architecture + Event-Driven Core",
    tags: ["Logística", "Tiempo Real", "Microservicios", "Clean Architecture", "Industrial"],
    metrics: [
      { label: "Reducción de tiempos de cubicación", value: "-45%" },
      { label: "Precisión de stock auditado", value: "99.8%" },
      { label: "Disponibilidad del servicio", value: "99.95%" },
      { label: "Transacciones diarias", value: "+12,000" },
    ],
    highlights: [
      "Diseño desacoplado con Clean Architecture y principios SOLID para máxima mantenibilidad.",
      "Algoritmo optimizado de cubicación y asignación de espacio en bodega/patio.",
      "Módulo offline-first con sincronización automática para operadores en terreno con conectividad inestable.",
      "Integración bidireccional con ERP corporativo mediante Webhooks seguros y colas de mensajería.",
    ],
    techStack: {
      frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand"],
      backend: ["Node.js", "Express", "TypeScript", "BullMQ / Redis", "Socket.io"],
      database: ["PostgreSQL", "Prisma ORM", "Redis Cache"],
      devops: ["Docker", "GitHub Actions", "Nginx", "Linux VPS"],
    },
    githubUrl: "https://github.com/jetaru",
    featured: true,
    status: "Producción",
  },
  {
    id: "sispat",
    slug: "sispat",
    title: "SISPAT",
    subtitle: "Sistema de Diagramación, Arquitectura e Inteligencia de Procesos",
    summary:
      "Herramienta web interactiva para el modelado, diagramación y orquestación de sistemas de arquitectura empresarial y flujos operativos complejos.",
    description:
      "SISPAT permite a los equipos de ingeniería y operaciones modelar topologías de sistemas, diagramas relacionales y dependencias críticas con renderizado vectorial acelerado por GPU y exportación a múltiples especificaciones de arquitectura.",
    role: "Senior Architect & Core Developer",
    architectureType: "Hexagonal / Ports & Adapters + Canvas Engine",
    tags: ["Diagramación", "Modelado", "Vectorial", "Hexagonal", "Enterprise"],
    metrics: [
      { label: "Rendimiento de renderizado", value: "60 FPS en 5k nodos" },
      { label: "Tiempo de generación de diagramas", value: "-60%" },
      { label: "Formatos de exportación", value: "SVG, JSON, PDF, PNG" },
      { label: "Compatibilidad", value: "100% Web Estándar" },
    ],
    highlights: [
      "Motor reactivo de diagramación basado en grafos dirigidos acíclicos (DAG).",
      "Persistencia de estado inmutable con historial de deshacer/rehacer infinito optimizado en memoria.",
      "Arquitectura hexagonal que permite desacoplar por completo el motor de cálculo gráfico de la capa UI.",
      "API de extensiones modulares para permitir validaciones de reglas de negocio en caliente.",
    ],
    techStack: {
      frontend: ["React", "TypeScript", "HTML5 Canvas / SVG", "Tailwind CSS"],
      backend: ["Node.js / JavaScript Server", "Fastify", "TypeScript"],
      database: ["PostgreSQL", "JSONB Document Store"],
      devops: ["Docker", "GitHub Pages / CI", "Cloudflare"],
    },
    githubUrl: "https://github.com/jetaru",
    featured: true,
    status: "Producción",
  },
  {
    id: "clean-core-engine",
    slug: "clean-core-engine",
    title: "Clean Core JS Engine",
    subtitle: "Micro-framework TypeScript con Arquitectura Limpia",
    summary:
      "Plantilla arquitectónica modular orientada a empresas para el despliegue rápido de servicios backend robustos, desacoplados y testeables.",
    description:
      "Un esqueleto de grado industrial estructurado bajo Domain-Driven Design (DDD) y Clean Architecture. Diseñado para desacoplar las reglas de negocio de frameworks web y bases de datos, permitiendo migraciones tecnológicas sin tocar el núcleo de dominio.",
    role: "Creador & Mantenedor",
    architectureType: "Domain-Driven Design (DDD) + Clean Architecture",
    tags: ["TypeScript", "Clean Architecture", "DDD", "Framework", "Testing"],
    metrics: [
      { label: "Cobertura de pruebas unitarias", value: "95%+" },
      { label: "Tiempo de onboarding para devs", value: "< 1 día" },
      { label: "Dependencias externas en Core", value: "0 (Pure Domain)" },
    ],
    highlights: [
      "Capa de dominio 100% aislada de dependencias externas (sin frameworks en el Core).",
      "Contratos estrictos mediante interfaces TypeScript para inversión de control (IoC).",
      "Manejador centralizado de errores, telemetría y validación de schemas con Zod.",
    ],
    techStack: {
      frontend: ["Next.js (Documentation Site)"],
      backend: ["Node.js", "TypeScript", "Express / Fastify Adapters"],
      database: ["Agnóstico (In-memory, PostgreSQL, MongoDB adapters)"],
      devops: ["GitHub Actions", "Jest / Vitest", "ESLint"],
    },
    githubUrl: "https://github.com/jetaru",
    featured: false,
    status: "Completado",
  },
];

export class MockProjectRepository implements IProjectRepository {
  async getAll(): Promise<Project[]> {
    return MOCK_PROJECTS;
  }

  async getBySlug(slug: string): Promise<Project | null> {
    const item = MOCK_PROJECTS.find((p) => p.slug === slug);
    return item || null;
  }

  async getFeatured(): Promise<Project[]> {
    return MOCK_PROJECTS.filter((p) => p.featured);
  }
}
