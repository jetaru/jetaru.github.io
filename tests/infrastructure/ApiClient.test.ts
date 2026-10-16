import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ApiClient, ApiError } from "@/infrastructure/api/client";

describe("ApiClient (Unit Tests)", () => {
  it("debe inicializarse y sanitizar trailing slash en la URL base", () => {
    const client = new ApiClient("https://api.ejemplo.com/v1/");
    assert.equal(client.getBaseUrl(), "https://api.ejemplo.com/v1");
    assert.equal(client.hasConfiguredUrl(), true);
  });

  it("debe reportar false en hasConfiguredUrl cuando la URL está vacía", () => {
    const client = new ApiClient("");
    assert.equal(client.hasConfiguredUrl(), false);
  });

  it("debe permitir actualizar la URL base en tiempo de ejecución", () => {
    const client = new ApiClient();
    client.setBaseUrl("http://localhost:5000/api/");
    assert.equal(client.getBaseUrl(), "http://localhost:5000/api");
    assert.equal(client.hasConfiguredUrl(), true);
  });

  it("debe formatear errores ApiError con código y mensaje", () => {
    const err = new ApiError(404, "Recurso no encontrado", { detail: "ID 99" });
    assert.equal(err.status, 404);
    assert.equal(err.message, "Recurso no encontrado");
    assert.deepEqual(err.data, { detail: "ID 99" });
    assert.equal(err.name, "ApiError");
  });
});
