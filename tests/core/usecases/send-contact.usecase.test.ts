import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { SendContactUseCase } from "@/core/usecases/send-contact.usecase";
import { IContactRepository } from "@/core/domain/repositories/IContactRepository";
import { ContactMessage, ContactSubmissionResult } from "@/core/domain/entities/contact";
import { SecurityRateLimiter } from "@/core/security/rate-limiter";

class SpyContactRepository implements IContactRepository {
  public lastMessage?: ContactMessage;
  public callCount = 0;

  async sendMessage(message: ContactMessage): Promise<ContactSubmissionResult> {
    this.lastMessage = message;
    this.callCount++;
    return {
      success: true,
      message: "Mensaje procesado por Spy",
      ticketId: "MSG-TEST01",
      timestamp: new Date().toISOString(),
    };
  }
}

describe("SendContactUseCase - Portfolio (Unit Tests)", () => {
  beforeEach(() => {
    SecurityRateLimiter.reset();
  });

  it("debe rechazar el envío si el nombre está vacío o sólo contiene espacios", async () => {
    const spy = new SpyContactRepository();
    const useCase = new SendContactUseCase(spy);

    const result = await useCase.execute({
      name: "   ",
      email: "test@domain.com",
      subject: "Consulta",
      message: "Este es un mensaje de prueba con longitud suficiente",
    });

    assert.equal(result.success, false);
    assert.match(result.message, /nombre/i);
    assert.equal(spy.callCount, 0);
  });

  it("debe rechazar el envío si el correo no tiene formato válido (falta @)", async () => {
    const spy = new SpyContactRepository();
    const useCase = new SendContactUseCase(spy);

    const result = await useCase.execute({
      name: "Usuario Test",
      email: "correo-invalido-sin-arroba",
      subject: "Consulta",
      message: "Mensaje suficientemente largo para pasar la validación",
    });

    assert.equal(result.success, false);
    assert.match(result.message, /correo/i);
    assert.equal(spy.callCount, 0);
  });

  it("debe rechazar el mensaje si tiene menos de 10 caracteres", async () => {
    const spy = new SpyContactRepository();
    const useCase = new SendContactUseCase(spy);

    const result = await useCase.execute({
      name: "Usuario Test",
      email: "valido@correo.com",
      subject: "Consulta",
      message: "Corto", // < 10 caracteres
    });

    assert.equal(result.success, false);
    assert.match(result.message, /10 caracteres/i);
    assert.equal(spy.callCount, 0);
  });

  it("debe rechazar el envío si el asunto está vacío o sólo contiene espacios", async () => {
    const spy = new SpyContactRepository();
    const useCase = new SendContactUseCase(spy);

    const result = await useCase.execute({
      name: "Usuario Test",
      email: "valido@correo.com",
      subject: "   ",
      message: "Este es un mensaje con longitud más que suficiente.",
    });

    assert.equal(result.success, false);
    assert.match(result.message, /asunto/i);
    assert.equal(spy.callCount, 0);
  });

  it("debe sanitizar etiquetas maliciosas HTML/XSS antes de enviarlas al repositorio (OWASP A03)", async () => {
    const spy = new SpyContactRepository();
    const useCase = new SendContactUseCase(spy);

    const messageWithXss: ContactMessage = {
      name: "Empresa <script>alert('xss')</script>",
      email: "contacto@empresa.com",
      subject: "Consulta con <img src=x onerror=alert(1)>",
      message: "Detalles del proyecto con iframe <iframe src='malicious.site'></iframe> y texto normal.",
    };

    const result = await useCase.execute(messageWithXss);

    assert.equal(result.success, true);
    assert.equal(spy.callCount, 1);
    assert.ok(spy.lastMessage);
    assert.ok(!spy.lastMessage.name.includes("<script>"));
    assert.ok(!spy.lastMessage.subject.includes("<img"));
    assert.ok(!spy.lastMessage.message.includes("<iframe"));
  });

  it("debe bloquear envíos consecutivos excesivos mediante rate limiting (OWASP A04)", async () => {
    const spy = new SpyContactRepository();
    const useCase = new SendContactUseCase(spy);

    const validMsg: ContactMessage = {
      name: "Empresa Uno",
      email: "info@empresa.com",
      subject: "Requerimiento Técnico",
      message: "Mensaje inicial válido para activar el registro.",
    };

    const res1 = await useCase.execute(validMsg);
    assert.equal(res1.success, true);

    // Inmediatamente el segundo intento debe ser bloqueado por anti-flood (< 5s)
    const res2 = await useCase.execute(validMsg);
    assert.equal(res2.success, false);
    assert.match(res2.message, /anti-flood|espera/i);
    assert.equal(spy.callCount, 1);
  });

  it("debe aceptar y procesar un mensaje que cumple con todas las reglas de negocio", async () => {
    const spy = new SpyContactRepository();
    const useCase = new SendContactUseCase(spy);

    const validMessage: ContactMessage = {
      name: "Acme Corp",
      email: "contacto@acme.com",
      subject: "Arquitectura Cloud y Microservicios",
      message: "Hola Jorge, nos interesa conversar sobre el diseño de un nuevo sistema distribuido.",
      preferredChannel: "email",
    };

    const result = await useCase.execute(validMessage);

    assert.equal(result.success, true);
    assert.equal(spy.callCount, 1);
    assert.deepEqual(spy.lastMessage, validMessage);
    assert.equal(result.ticketId, "MSG-TEST01");
  });
});
