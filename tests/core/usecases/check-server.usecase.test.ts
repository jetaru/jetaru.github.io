import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { CheckServerStatusUseCase } from "@/core/usecases/check-server.usecase";
import { HttpServerRepository } from "@/infrastructure/repositories/http/HttpServerRepository";

describe("CheckServerStatusUseCase (Unit Tests)", () => {
  it("debe reportar el estado de salud del servidor adecuadamente", async () => {
    const repo = new HttpServerRepository();
    const useCase = new CheckServerStatusUseCase(repo);

    const health = await useCase.execute();

    assert.ok(health);
    assert.ok(["online", "offline", "degraded"].includes(health.status));
    assert.ok(typeof health.message === "string");
    assert.ok(health.message.length > 0);
  });
});
