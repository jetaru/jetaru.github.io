export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  description: string;
  role: string;
  architectureType: string;
  tags: string[];
  metrics: ProjectMetric[];
  highlights: string[];
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    devops: string[];
  };
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  status: "Producción" | "En Desarrollo" | "Completado" | "Migración";
}
