export interface SkillItem {
  name: string;
  level: "Experto" | "Avanzado" | "Competente";
  iconName?: string;
  description?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: SkillItem[];
}
