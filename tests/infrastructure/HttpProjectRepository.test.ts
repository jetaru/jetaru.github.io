import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { HttpProjectRepository } from "@/infrastructure/repositories/http/HttpProjectRepository";
import { ApiClient } from "@/infrastructure/api/client";

describe("HttpProjectRepository (Unit Tests)", () => {
  it("debe retornar los proyectos del fallback estático si la URL de la API no está configurada", async () => {
    const client = new ApiClient(""); // Sin URL externa configurada
    const repo = new HttpProjectRepository(client);

    const projects = await repo.getAll();

    assert.ok(Array.isArray(projects));
    assert.ok(projects.length > 0);
    assert.ok(projects.some((p) => p.featured === true));
  });

  it("debe retornar proyectos destacados filtrados", async () => {
    const client = new ApiClient("");
    const repo = new HttpProjectRepository(client);

    const featured = await repo.getFeatured();

    assert.ok(Array.isArray(featured));
    assert.ok(featured.every((p) => p.featured === true));
  });

  it("debe buscar correctamente un proyecto por slug en el fallback", async () => {
    const client = new ApiClient("");
    const repo = new HttpProjectRepository(client);

    const all = await repo.getAll();
    if (all.length > 0) {
      const firstSlug = all[0].slug;
      const found = await repo.getBySlug(firstSlug);

      assert.ok(found);
      assert.equal(found?.slug, firstSlug);
    }
  });
});
