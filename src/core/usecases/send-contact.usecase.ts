import { IContactRepository } from "../domain/repositories/IContactRepository";
import { ContactMessage, ContactSubmissionResult } from "../domain/entities/contact";
import { SecuritySanitizer } from "../security/sanitizer";
import { SecurityRateLimiter } from "../security/rate-limiter";

/**
 * Caso de Uso de Dominio: Envío y validación de mensajes de contacto profesional.
 *
 * Aplica las reglas de negocio de validación de entradas, saneamiento contra inyecciones / XSS
 * y protección anti-flood (OWASP Top 10) antes de delegar la entrega al repositorio correspondiente.
 */
export class SendContactUseCase {
  constructor(private readonly contactRepository: IContactRepository) {}

  /**
   * Ejecuta la validación de negocio y envía el mensaje de contacto.
   *
   * @param message Entidad del mensaje de contacto recibida desde la vista.
   * @returns Resultado con el estado de la operación y mensaje de retroalimentación.
   */
  async execute(message: ContactMessage): Promise<ContactSubmissionResult> {
    const timestamp = new Date().toISOString();

    // 1. Verificación de Rate Limiting (OWASP A04)
    const rateStatus = SecurityRateLimiter.checkRateLimit();
    if (!rateStatus.isAllowed) {
      return {
        success: false,
        message: rateStatus.reason || "Por favor espera antes de enviar otra solicitud.",
        timestamp,
      };
    }

    // 2. Validación de Nombre (OWASP A03)
    const nameCheck = SecuritySanitizer.validateName(message.name);
    if (!nameCheck.isValid) {
      return {
        success: false,
        message: nameCheck.error || "El nombre es obligatorio.",
        timestamp,
      };
    }

    // 3. Validación de Correo Electrónico
    const emailCheck = SecuritySanitizer.validateEmail(message.email);
    if (!emailCheck.isValid) {
      return {
        success: false,
        message: emailCheck.error || "Por favor proporciona un correo electrónico válido.",
        timestamp,
      };
    }

    // 4. Validación de Asunto
    const subjectCheck = SecuritySanitizer.validateSubject(message.subject);
    if (!subjectCheck.isValid) {
      return {
        success: false,
        message: subjectCheck.error || "El asunto es obligatorio.",
        timestamp,
      };
    }

    // 5. Validación del Cuerpo del Mensaje
    const bodyCheck = SecuritySanitizer.validateMessageBody(message.message);
    if (!bodyCheck.isValid) {
      return {
        success: false,
        message: bodyCheck.error || "El mensaje debe tener al menos 10 caracteres.",
        timestamp,
      };
    }

    // 6. Sanitización integral para prevenir XSS antes de persistir o despachar
    const sanitizedMessage: ContactMessage = {
      name: SecuritySanitizer.sanitizeText(message.name),
      email: message.email.trim(),
      subject: SecuritySanitizer.sanitizeText(message.subject),
      message: SecuritySanitizer.sanitizeText(message.message, { multiline: true }),
      preferredChannel: message.preferredChannel,
    };

    const result = await this.contactRepository.sendMessage(sanitizedMessage);

    if (result.success) {
      SecurityRateLimiter.recordSubmission();
    }

    return result;
  }
}
