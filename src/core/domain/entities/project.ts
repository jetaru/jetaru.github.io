export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectEvidence {
  url: string;
  title: string;
  description: string;
  type: "architecture" | "schema" | "workflow" | "ui";
}

export interface LocalizedProjectText {
  title: string;
  subtitle: string;
  summary: string;
  description: string;
  role: string;
  architectureType: string;
  tags?: string[];
  highlights?: string[];
  metrics?: ProjectMetric[];
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
  evidences?: ProjectEvidence[];
  architectureDiagramCode?: string;
  en?: LocalizedProjectText;
}
