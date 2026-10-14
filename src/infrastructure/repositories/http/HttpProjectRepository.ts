import { IProjectRepository } from "@/core/domain/repositories/IProjectRepository";
import { Project } from "@/core/domain/entities/project";
import { ApiClient } from "@/infrastructure/api/client";
import { MockProjectRepository } from "../mock/MockProjectRepository";

export class HttpProjectRepository implements IProjectRepository {
  private fallbackRepo = new MockProjectRepository();

  constructor(private readonly client: ApiClient) {}

  async getAll(): Promise<Project[]> {
    if (!this.client.hasConfiguredUrl()) {
      return this.fallbackRepo.getAll();
    }
    try {
      const data = await this.client.get<{ projects: Project[] }>("/projects");
      return data.projects || [];
    } catch {
      // Fallback transparente al set de datos estático
      return this.fallbackRepo.getAll();
    }
  }

  async getBySlug(slug: string): Promise<Project | null> {
    if (!this.client.hasConfiguredUrl()) {
      return this.fallbackRepo.getBySlug(slug);
    }
    try {
      const data = await this.client.get<{ project: Project }>(`/projects/${slug}`);
      return data.project || null;
    } catch {
      return this.fallbackRepo.getBySlug(slug);
    }
  }

  async getFeatured(): Promise<Project[]> {
    const all = await this.getAll();
    return all.filter((p) => p.featured);
  }
}
