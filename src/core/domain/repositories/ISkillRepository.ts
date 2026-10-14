import { SkillCategory } from "../entities/skill";

export interface ISkillRepository {
  getAllCategories(): Promise<SkillCategory[]>;
}
