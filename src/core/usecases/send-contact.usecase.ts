import { IContactRepository } from "../domain/repositories/IContactRepository";
import { ContactMessage, ContactSubmissionResult } from "../domain/entities/contact";

export class SendContactUseCase {
  constructor(private readonly contactRepository: IContactRepository) {}

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
