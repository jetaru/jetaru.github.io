import { IContactRepository } from "@/core/domain/repositories/IContactRepository";
import { ContactMessage, ContactSubmissionResult } from "@/core/domain/entities/contact";

export class MockContactRepository implements IContactRepository {
  async sendMessage(message: ContactMessage): Promise<ContactSubmissionResult> {
    // Simula una breve latencia de red para dar feedback realista
    await new Promise((resolve) => setTimeout(resolve, 800));

    const ticketId = `MSG-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Guarda en localStorage si el navegador está disponible
    if (typeof window !== "undefined") {
      try {
        const stored = JSON.parse(localStorage.getItem("jetaru_contact_submissions") || "[]");
        stored.push({ ...message, ticketId, sentAt: new Date().toISOString() });
        localStorage.setItem("jetaru_contact_submissions", JSON.stringify(stored));
      } catch {
        // Ignorar errores de localStorage
      }
    }

    return {
      success: true,
      message: `¡Gracias ${message.name}! Tu mensaje ha sido recibido exitosamente en modo desacoplado.`,
      ticketId,
      timestamp: new Date().toISOString(),
      isSimulated: true,
    };
  }
}
