import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { GetProjectsUseCase } from "@/core/usecases/get-projects.usecase";
import { IProjectRepository } from "@/core/domain/repositories/IProjectRepository";
import { Project } from "@/core/domain/entities/project";

const SAMPLE_PROJECTS: Project[] = [
  {
    id: "p1",
    slug: "patio-madera",
    title: "Patio Madera",
    subtitle: "Logística",
    summary: "Sistema de gestión",
    description: "Descripción detallada",
    role: "Architect",
    architectureType: "Clean Architecture",
    tags: ["Logística", "Microservicios"],
    metrics: [{ label: "Precisión", value: "99%" }],
    highlights: ["Alta disponibilidad"],
    techStack: { frontend: ["Next.js"], backend: ["Node.js"], database: ["PostgreSQL"], devops: ["Docker"] },
    featured: true,
    status: "Producción",
  },
  {
    id: "p2",
    slug: "sistema-inventario",
    title: "Sistema Inventario",
    subtitle: "Stock",
    summary: "Control de stock",
    description: "Descripción detallada 2",
    role: "Full Stack",
    architectureType: "Hexagonal",
    tags: ["Stock"],
    metrics: [{ label: "Velocidad", value: "+50%" }],
    highlights: ["Tiempo real"],
    techStack: { frontend: ["React"], backend: ["Express"], database: ["Redis"], devops: ["GitHub Actions"] },
    featured: false,
    status: "Completado",
  },
];

class MockRepo implements IProjectRepository {
  async getAll(): Promise<Project[]> {
    return SAMPLE_PROJECTS;
  }
  async getFeatured(): Promise<Project[]> {
    return SAMPLE_PROJECTS.filter((p) => p.featured);
  }
  async getBySlug(slug: string): Promise<Project | null> {
    return SAMPLE_PROJECTS.find((p) => p.slug === slug) || null;
  }
}

describe("GetProjectsUseCase (Unit Tests)", () => {
  it("debe retornar la lista completa de proyectos", async () => {
    const useCase = new GetProjectsUseCase(new MockRepo());
    const projects = await useCase.execute();

    assert.equal(projects.length, 2);
    assert.equal(projects[0].slug, "patio-madera");
  });

  it("debe filtrar solo los proyectos destacados (featured)", async () => {
    const useCase = new GetProjectsUseCase(new MockRepo());
    const featured = await useCase.executeFeatured();

    assert.equal(featured.length, 1);
    assert.equal(featured[0].id, "p1");
    assert.equal(featured[0].featured, true);
  });

  it("debe encontrar un proyecto por su slug", async () => {
    const useCase = new GetProjectsUseCase(new MockRepo());
    const project = await useCase.executeBySlug("patio-madera");

    assert.ok(project);
    assert.equal(project.title, "Patio Madera");
  });

  it("debe retornar null cuando el slug no existe", async () => {
    const useCase = new GetProjectsUseCase(new MockRepo());
    const project = await useCase.executeBySlug("proyecto-inexistente");

    assert.equal(project, null);
  });
});
