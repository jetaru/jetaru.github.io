import { IContactRepository } from "../domain/repositories/IContactRepository";
import { ContactMessage, ContactSubmissionResult } from "../domain/entities/contact";

/**
 * Caso de Uso de Dominio: Envío y validación de mensajes de contacto profesional.
 *
 * Aplica las reglas de negocio de validación de entradas antes de delegar la persistencia o
 * entrega al repositorio de infraestructura correspondiente.
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
    if (!message.name?.trim()) {
      return {
        success: false,
        message: "El nombre es obligatorio.",
        timestamp: new Date().toISOString(),
      };
    }
    if (!message.email?.trim() || !message.email.includes("@")) {
      return {
        success: false,
        message: "Por favor proporciona un correo electrónico válido.",
        timestamp: new Date().toISOString(),
      };
    }
    if (!message.message?.trim() || message.message.length < 10) {
      return {
        success: false,
        message: "El mensaje debe tener al menos 10 caracteres.",
        timestamp: new Date().toISOString(),
      };
    }

    return this.contactRepository.sendMessage(message);
  }
}
