import { ISkillRepository } from "@/core/domain/repositories/ISkillRepository";
import { SkillCategory } from "@/core/domain/entities/skill";

export const MOCK_SKILLS: SkillCategory[] = [
  {
    id: "architecture",
    title: "Arquitectura & Metodologías",
    description: "Diseño de sistemas mantenibles, desacoplados y resilientes a escala.",
    skills: [
      { name: "Clean Architecture", level: "Experto", description: "Aislamiento estricto de dominio y use cases." },
      { name: "Domain-Driven Design (DDD)", level: "Avanzado", description: "Modelado táctico y estratégico, bounded contexts." },
      { name: "Microservicios & APIs RESTful", level: "Experto", description: "Contratos tipados, versionado y rate limiting." },
      { name: "Event-Driven & WebSockets", level: "Avanzado", description: "Flujos reactivos asíncronos en tiempo real." },
      { name: "Principios SOLID & Patrones GoF", level: "Experto", description: "Estructuras de código limpias y testeables." },
    ],
  },
  {
    id: "frontend",
    title: "Frontend & Interfaces Web",
    description: "Desarrollo moderno orientado a performance, UX y renderizado estático/SSR.",
    skills: [
      { name: "Next.js (App Router)", level: "Experto", description: "Static export para GitHub Pages, SSR y optimización." },
      { name: "React 19 & TypeScript", level: "Experto", description: "Hooks modernos, tipado estricto y concurrencia." },
      { name: "Tailwind CSS v4", level: "Experto", description: "Sistemas de diseño modernos, responsivos y fluidos." },
      { name: "State Management (Zustand/Context)", level: "Avanzado", description: "Gestión de estado global predecible y liviana." },
      { name: "Turbopack & Webpack", level: "Avanzado", description: "Bundling ultrarrápido y tooling frontend." },
    ],
  },
  {
    id: "backend",
    title: "Backend & Servidores JS",
    description: "Servidores externos eficientes en JavaScript y Node.js para alimentar clientes estáticos.",
    skills: [
      { name: "Node.js & JavaScript/TS", level: "Experto", description: "Runtimes asíncronos de alto throughput." },
      { name: "Express & Fastify", level: "Experto", description: "Endpoints rápidos, middlewares seguros y validación." },
      { name: "NestJS", level: "Avanzado", description: "Arquitectura modular empresarial con inyección de dependencias." },
      { name: "Seguridad & JWT / CORS", level: "Experto", description: "Conexión segura entre cliente estático y servidor externo." },
      { name: "Procesamiento en segundo plano", level: "Avanzado", description: "Workers y colas para tareas intensivas." },
    ],
  },
  {
    id: "data-devops",
    title: "Bases de Datos & DevOps",
    description: "Persistencia confiable, despliegue continuo e infraestructura en la nube.",
    skills: [
      { name: "PostgreSQL & Prisma / SQL", level: "Avanzado", description: "Modelado relacional, índices y transacciones." },
      { name: "Redis", level: "Avanzado", description: "Caché de baja latencia y pub/sub." },
      { name: "Docker & Docker Compose", level: "Avanzado", description: "Contenedores consistentes para dev y prod." },
      { name: "GitHub Actions & Pages", level: "Experto", description: "Pipelines CI/CD automatizados para despliegues estáticos." },
      { name: "Linux & Nginx", level: "Avanzado", description: "Configuración de servidores proxy inversos y SSL." },
    ],
  },
];

export class MockSkillRepository implements ISkillRepository {
  async getAllCategories(): Promise<SkillCategory[]> {
    return MOCK_SKILLS;
  }
}
