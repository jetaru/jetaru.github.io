import { IProjectRepository } from "../domain/repositories/IProjectRepository";
import { Project } from "../domain/entities/project";

export class GetProjectsUseCase {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async execute(): Promise<Project[]> {
    return this.projectRepository.getAll();
  }

  async executeFeatured(): Promise<Project[]> {
    return this.projectRepository.getFeatured();
  }

  async executeBySlug(slug: string): Promise<Project | null> {
    return this.projectRepository.getBySlug(slug);
  }
}
