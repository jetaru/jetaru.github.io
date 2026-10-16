import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  EmailJSContactRepository,
  EmailJSSenderFn,
} from "@/infrastructure/repositories/emailjs/EmailJSContactRepository";
import { ContactMessage } from "@/core/domain/entities/contact";
import { appConfig } from "@/infrastructure/config/env";

describe("EmailJSContactRepository - Portfolio (Unit Tests)", () => {
  it("debe enviar el correo a través de EmailJS con los parámetros mapeados correctamente", async () => {
    let capturedCall: {
      serviceId: string;
      templateId: string;
      templateParams: Record<string, unknown>;
      options: { publicKey: string };
    } | null = null;

    const mockSender: EmailJSSenderFn = async (serviceId, templateId, templateParams, options) => {
      capturedCall = { serviceId, templateId, templateParams, options };
      return { status: 200, text: "OK" };
    };

    const repo = new EmailJSContactRepository(mockSender);

    const message: ContactMessage = {
      name: "Empresa Líder Tech",
      email: "recruiter@tech.com",
      subject: "Oportunidad Software Architect",
      message: "Queremos invitarte a una reunión para liderar nuestro equipo de arquitectura.",
      preferredChannel: "linkedin",
    };

    const result = await repo.sendMessage(message);

    assert.equal(result.success, true);
    assert.equal(result.deliveryMethod, "emailjs");
    assert.equal(result.isSimulated, false);
    assert.match(result.ticketId!, /^MSG-[A-Z0-9]+$/);

    if (!capturedCall) {
      assert.fail("La función de despacho no fue invocada");
    }
    const call = capturedCall as {
      serviceId: string;
      templateId: string;
      templateParams: Record<string, unknown>;
      options: { publicKey: string };
    };

    assert.equal(call.options.publicKey, appConfig.emailjs.publicKey);
    assert.equal(call.templateParams.from_name, "Empresa Líder Tech");
    assert.equal(call.templateParams.from_email, "recruiter@tech.com");
    assert.equal(call.templateParams.reply_to, "recruiter@tech.com");
    assert.equal(call.templateParams.subject, "Oportunidad Software Architect");
    assert.equal(
      call.templateParams.message,
      "Queremos invitarte a una reunión para liderar nuestro equipo de arquitectura."
    );
    assert.equal(call.templateParams.preferred_channel, "linkedin");
    assert.equal(call.templateParams.to_email, appConfig.author.email);
  });

  it("debe activar contingencia local si EmailJS no está disponible o falla", async () => {
    const failingSender: EmailJSSenderFn = async () => {
      throw new Error("Network timeout or invalid service ID");
    };

    const repo = new EmailJSContactRepository(failingSender);

    const message: ContactMessage = {
      name: "Cliente Contingencia",
      email: "contacto@cliente.com",
      subject: "Consulta Offline",
      message: "Mensaje que debe guardarse en contingencia ante fallo de red",
    };

    const result = await repo.sendMessage(message);

    assert.equal(result.success, true);
    assert.equal(result.deliveryMethod, "mock");
    assert.equal(result.isSimulated, true);
    assert.match(result.ticketId!, /^MSG-[A-Z0-9]+$/);
    assert.match(result.message, /contingencia local/i);
  });
});
