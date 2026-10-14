import { IServerRepository } from "@/core/domain/repositories/IServerRepository";
import { ServerHealth } from "@/core/domain/entities/server-health";
import { appConfig } from "@/infrastructure/config/env";

export class MockServerRepository implements IServerRepository {
  async checkHealth(targetUrl?: string): Promise<ServerHealth> {
    const url = (targetUrl || appConfig.api.baseUrl || "").replace(/\/$/, "");

    if (!url) {
      return {
        status: "offline",
        message: "Sin URL de servidor configurada. La página estática funciona de forma autónoma (Mock Mode).",
        endpointUrl: "(no configurado)",
        latencyMs: 0,
        runtime: "JavaScript Client-Side Standalone",
      };
    }

    const startTime = performance.now();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const healthUrl = `${url}/health`;
      const res = await fetch(healthUrl, {
        method: "GET",
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const latencyMs = Math.round(performance.now() - startTime);

      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        return {
          status: "online",
          latencyMs,
          endpointUrl: healthUrl,
          uptimeSeconds: data.uptimeSeconds,
          version: data.version || "1.0.0",
          environment: data.environment || "production",
          runtime: data.runtime || "Node.js (External Server)",
          message: data.message || "Servidor externo JS respondiendo con normalidad",
        };
      } else {
        return {
          status: "degraded",
          latencyMs,
          endpointUrl: healthUrl,
          message: `El servidor respondió con código HTTP ${res.status}`,
        };
      }
    } catch {
      return {
        status: "offline",
        latencyMs: Math.round(performance.now() - startTime),
        endpointUrl: `${url}/health`,
        message: "No se pudo conectar con el servidor externo. Operando en modo estático resiliente.",
        runtime: "Offline Fallback",
      };
    }
  }
}
