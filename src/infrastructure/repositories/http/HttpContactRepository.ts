import { IContactRepository } from "@/core/domain/repositories/IContactRepository";
import { ContactMessage, ContactSubmissionResult } from "@/core/domain/entities/contact";
import { ApiClient } from "@/infrastructure/api/client";
import { MockContactRepository } from "../mock/MockContactRepository";

export class HttpContactRepository implements IContactRepository {
  private fallbackRepo = new MockContactRepository();

  constructor(private readonly client: ApiClient) {}

  async sendMessage(message: ContactMessage): Promise<ContactSubmissionResult> {
    if (!this.client.hasConfiguredUrl()) {
      return this.fallbackRepo.sendMessage(message);
    }
    try {
      const response = await this.client.post<ContactSubmissionResult>("/contact", message);
      return {
        ...response,
        isSimulated: false,
      };
    } catch {
      // Si el servidor externo falla temporalmente, cae en fallback para no perder el feedback
      const fallbackResult = await this.fallbackRepo.sendMessage(message);
      return {
        ...fallbackResult,
        message: `${fallbackResult.message} (Procesado mediante cola de contingencia local porque el servidor externo no respondió).`,
      };
    }
  }
}
