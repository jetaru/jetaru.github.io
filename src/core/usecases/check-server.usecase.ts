import { IServerRepository } from "../domain/repositories/IServerRepository";
import { ServerHealth } from "../domain/entities/server-health";

export class CheckServerStatusUseCase {
  constructor(private readonly serverRepository: IServerRepository) {}

  async execute(customUrl?: string): Promise<ServerHealth> {
    return this.serverRepository.checkHealth(customUrl);
  }
}
