import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { GetSkillsUseCase } from "@/core/usecases/get-skills.usecase";
import { MockSkillRepository } from "@/infrastructure/repositories/mock/MockSkillRepository";

describe("GetSkillsUseCase (Unit Tests)", () => {
  it("debe retornar todas las categorías de habilidades del sistema", async () => {
    const repo = new MockSkillRepository();
    const useCase = new GetSkillsUseCase(repo);

    const categories = await useCase.execute();

    assert.ok(Array.isArray(categories));
    assert.ok(categories.length >= 4);

    const ids = categories.map((c) => c.id);
    assert.ok(ids.includes("architecture"));
    assert.ok(ids.includes("frontend"));
    assert.ok(ids.includes("backend"));
    assert.ok(ids.includes("data-devops"));

    const archCategory = categories.find((c) => c.id === "architecture");
    assert.ok(archCategory!.skills.some((s) => s.name === "Clean Architecture"));
  });
});
