import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { SecuritySanitizer } from "@/core/security/sanitizer";

describe("SecuritySanitizer (Unit Tests)", () => {
  describe("sanitizeText", () => {
    it("debe remover scripts, iframes y objetos embebidos", () => {
      const malicious = "<script>alert('xss')</script>Hola Mundo<iframe src='bad.com'></iframe>";
      const cleaned = SecuritySanitizer.sanitizeText(malicious);
      assert.equal(cleaned, "Hola Mundo");
    });

    it("debe remover manejadores de eventos en línea (onerror, onclick)", () => {
      const input = "Texto normal onerror=alert(1) onclick=stealCookies()";
      const cleaned = SecuritySanitizer.sanitizeText(input);
      assert.ok(!cleaned.includes("onerror="));
      assert.ok(!cleaned.includes("onclick="));
    });

    it("debe neutralizar protocolos peligrosos como javascript: y data:text/html", () => {
      const input = "Enlace: javascript:alert(1) y data:text/html;base64,...";
      const cleaned = SecuritySanitizer.sanitizeText(input);
      assert.ok(!cleaned.includes("javascript:"));
      assert.ok(!cleaned.includes("data:text/html:"));
    });

    it("debe retornar cadena vacía si se pasa null o vacío", () => {
      assert.equal(SecuritySanitizer.sanitizeText(""), "");
      // @ts-expect-error probando valor nulo
      assert.equal(SecuritySanitizer.sanitizeText(null), "");
    });
  });

  describe("escapeHtml", () => {
    it("debe escapar caracteres especiales HTML (&, <, >, \", ', /)", () => {
      const input = '<div class="test" data-id=\'1\'>&/</div>';
      const escaped = SecuritySanitizer.escapeHtml(input);
      assert.equal(escaped, "&lt;div class=&quot;test&quot; data-id=&#x27;1&#x27;&gt;&amp;&#x2F;&lt;&#x2F;div&gt;");
    });
  });

  describe("validateName", () => {
    it("debe aceptar nombres válidos con tildes, ñ y espacios", () => {
      assert.equal(SecuritySanitizer.validateName("Jorge Thompson").isValid, true);
      assert.equal(SecuritySanitizer.validateName("María José Núñez").isValid, true);
      assert.equal(SecuritySanitizer.validateName("Jean-Luc O'Connor").isValid, true);
      assert.equal(SecuritySanitizer.validateName("Acme Corp.").isValid, true);
    });

    it("debe rechazar nombres demasiado cortos (< 2 caracteres)", () => {
      const res = SecuritySanitizer.validateName("J");
      assert.equal(res.isValid, false);
      assert.match(res.error!, /al menos 2 caracteres/i);
    });

    it("debe rechazar nombres que exceden 80 caracteres", () => {
      const longName = "A".repeat(81);
      const res = SecuritySanitizer.validateName(longName);
      assert.equal(res.isValid, false);
      assert.match(res.error!, /no puede exceder 80/i);
    });

    it("debe rechazar caracteres especiales no permitidos en nombres", () => {
      const res = SecuritySanitizer.validateName("User <123> $$");
      assert.equal(res.isValid, false);
    });
  });

  describe("validateSubject", () => {
    it("debe aceptar asuntos válidos", () => {
      assert.equal(SecuritySanitizer.validateSubject("Propuesta de Arquitectura").isValid, true);
    });

    it("debe rechazar asuntos vacíos", () => {
      assert.equal(SecuritySanitizer.validateSubject("   ").isValid, false);
    });

    it("debe rechazar asuntos que excedan 150 caracteres", () => {
      const longSubj = "A".repeat(151);
      assert.equal(SecuritySanitizer.validateSubject(longSubj).isValid, false);
    });
  });

  describe("validateMessageBody", () => {
    it("debe aceptar mensajes dentro del rango permitido (10 a 2000 caracteres)", () => {
      assert.equal(SecuritySanitizer.validateMessageBody("Este es un mensaje válido con suficiente detalle.").isValid, true);
    });

    it("debe rechazar mensajes de menos de 10 caracteres", () => {
      assert.equal(SecuritySanitizer.validateMessageBody("Corto").isValid, false);
    });

    it("debe rechazar mensajes que superen 2000 caracteres", () => {
      const longBody = "A".repeat(2001);
      assert.equal(SecuritySanitizer.validateMessageBody(longBody).isValid, false);
    });
  });

  describe("validateEmail", () => {
    it("debe aceptar correos electrónicos válidos", () => {
      assert.equal(SecuritySanitizer.validateEmail("usuario@ejemplo.com").isValid, true);
      assert.equal(SecuritySanitizer.validateEmail("jorge.thompson@empresa.cl").isValid, true);
    });

    it("debe rechazar correos sin @ o malformados", () => {
      assert.equal(SecuritySanitizer.validateEmail("invalido-sin-arroba").isValid, false);
      assert.equal(SecuritySanitizer.validateEmail("user@.com").isValid, false);
      assert.equal(SecuritySanitizer.validateEmail("@dominio.com").isValid, false);
    });
  });
});
