import { IServerRepository } from "@/core/domain/repositories/IServerRepository";
import { ServerHealth } from "@/core/domain/entities/server-health";
import { MockServerRepository } from "../mock/MockServerRepository";

export class HttpServerRepository implements IServerRepository {
  private mockRepo = new MockServerRepository();

  async checkHealth(targetUrl?: string): Promise<ServerHealth> {
    return this.mockRepo.checkHealth(targetUrl);
  }
}
