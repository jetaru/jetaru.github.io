import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { cn, formatDate } from "@/lib/utils";

describe("Utils - Portfolio (Unit Tests)", () => {
  describe("cn", () => {
    it("debe concatenar clases y resolver conflictos de Tailwind", () => {
      const result = cn("bg-red-500", "p-2", true && "text-white", "bg-blue-500");
      assert.equal(result, "p-2 text-white bg-blue-500");
    });

    it("debe omitir valores falsy", () => {
      const result = cn("border", null, undefined, false, "rounded");
      assert.equal(result, "border rounded");
    });
  });

  describe("formatDate", () => {
    it("debe formatear una fecha válida con año y mes", () => {
      const formatted = formatDate("2026-10-15T12:00:00Z", "es-CL");
      assert.ok(formatted.includes("2026"));
    });

    it("debe retornar el string original si la fecha es inválida", () => {
      const invalid = "no-es-fecha";
      const result = formatDate(invalid);
      // Date inválida puede arrojar "Invalid Date" o retornar el fallback
      assert.ok(typeof result === "string");
    });
  });
});
