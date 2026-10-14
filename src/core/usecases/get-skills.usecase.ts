import { ISkillRepository } from "../domain/repositories/ISkillRepository";
import { SkillCategory } from "../domain/entities/skill";

export class GetSkillsUseCase {
  constructor(private readonly skillRepository: ISkillRepository) {}

  async execute(): Promise<SkillCategory[]> {
    return this.skillRepository.getAllCategories();
  }
}
