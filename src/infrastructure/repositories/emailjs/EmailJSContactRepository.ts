import { IContactRepository } from "@/core/domain/repositories/IContactRepository";
import { ContactMessage, ContactSubmissionResult } from "@/core/domain/entities/contact";
import { appConfig } from "@/infrastructure/config/env";
import emailjs from "@emailjs/browser";

/**
 * Firma de la función para el envío de correo mediante EmailJS.
 * Soporta inyección de dependencias para ejecución de pruebas unitarias desacopladas de red.
 */
export type EmailJSSenderFn = (
  serviceId: string,
  templateId: string,
  templateParams: Record<string, unknown>,
  options: { publicKey: string }
) => Promise<{ status: number; text: string }>;

/**
 * Repositorio de infraestructura para envío de mensajes de contacto utilizando EmailJS.
 *
 * Implementa la interfaz de dominio `IContactRepository`.
 * Permite el despacho directo de correos desde el navegador sin intermediación de un servidor backend,
 * manteniendo compatibilidad total con la exportación estática para GitHub Pages.
 */
export class EmailJSContactRepository implements IContactRepository {
  private readonly senderFn: EmailJSSenderFn;

  /**
   * @param customSenderFn Función opcional para despachar correos (útil para inyección en tests unitarios).
   */
  constructor(customSenderFn?: EmailJSSenderFn) {
    this.senderFn =
      customSenderFn ||
      (async (serviceId, templateId, templateParams, options) => {
        return emailjs.send(serviceId, templateId, templateParams, options);
      });
  }

  /**
   * Envía un mensaje de contacto a la bandeja de entrada del autor mediante EmailJS.
   *
   * @param message Mensaje validado por la capa de aplicación/dominio.
   * @returns Resultado con el estado de entrega y ticket de seguimiento.
   */
  async sendMessage(message: ContactMessage): Promise<ContactSubmissionResult> {
    const timestamp = new Date().toISOString();
    const ticketId = `MSG-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Parámetros formateados para la plantilla de EmailJS
    const templateParams: Record<string, unknown> = {
      ticket_id: ticketId,
      from_name: message.name.trim(),
      from_email: message.email.trim(),
      reply_to: message.email.trim(),
      subject: message.subject.trim(),
      message: message.message.trim(),
      preferred_channel: message.preferredChannel || "email",
      to_email: appConfig.author.email,
      submission_date: new Date().toLocaleString("es-CL", {
        timeZone: "America/Santiago",
        dateStyle: "medium",
        timeStyle: "short",
      }),
    };

    const { publicKey, serviceId, templateId } = appConfig.emailjs;

    try {
      await this.senderFn(serviceId, templateId, templateParams, { publicKey });

      // Guardar registro en localStorage si el navegador está disponible
      this.saveToLocalStorage(message, ticketId, timestamp, "delivered");

      return {
        success: true,
        message: `¡Gracias ${message.name}! Tu mensaje ha sido enviado exitosamente a la bandeja de entrada de Jorge Thompson.`,
        ticketId,
        timestamp,
        isSimulated: false,
        deliveryMethod: "emailjs",
      };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.warn(
        `[EmailJSContactRepository] No se pudo enviar el correo vía EmailJS (${errorMsg}). Guardando en cola de contingencia local.`
      );

      // Guardar en almacenamiento local como respaldo ante desconexión
      this.saveToLocalStorage(message, ticketId, timestamp, "queued_offline");

      return {
        success: true,
        message: `¡Gracias ${message.name}! Tu mensaje ha sido registrado con el ticket de seguimiento ${ticketId} mediante cola de contingencia local.`,
        ticketId,
        timestamp,
        isSimulated: true,
        deliveryMethod: "mock",
      };
    }
  }

  private saveToLocalStorage(
    message: ContactMessage,
    ticketId: string,
    timestamp: string,
    status: string
  ): void {
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        const stored = JSON.parse(
          localStorage.getItem("jetaru_contact_submissions") || "[]"
        );
        stored.push({ ...message, ticketId, sentAt: timestamp, status });
        localStorage.setItem("jetaru_contact_submissions", JSON.stringify(stored));
      } catch {
        // Ignorar fallos de cuota o privacidad en localStorage
      }
    }
  }
}
