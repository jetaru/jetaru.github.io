import { ServerHealth } from "../entities/server-health";

export interface IServerRepository {
  checkHealth(targetUrl?: string): Promise<ServerHealth>;
}
