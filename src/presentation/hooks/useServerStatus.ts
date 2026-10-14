"use client";

import { useState, useEffect, useCallback } from "react";
import { container } from "@/infrastructure/container";
import { ServerHealth } from "@/core/domain/entities/server-health";
import { appConfig } from "@/infrastructure/config/env";

export function useServerStatus() {
  const [health, setHealth] = useState<ServerHealth>({
    status: "connecting",
    message: "Verificando conexión con el servidor externo...",
  });
  const [loading, setLoading] = useState(true);
  const [customUrl, setCustomUrl] = useState<string>(appConfig.api.baseUrl);

  const checkStatus = useCallback(async (targetUrl?: string) => {
    setLoading(true);
    setHealth((prev) => ({ ...prev, status: "connecting" }));
    try {
      const result = await container.checkServerUseCase.execute(targetUrl ?? customUrl);
      setHealth(result);
    } catch {
      setHealth({
        status: "offline",
        message: "Fallo inesperado al consultar el servidor.",
      });
    } finally {
      setLoading(false);
    }
  }, [customUrl]);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  const updateUrlAndCheck = (newUrl: string) => {
    setCustomUrl(newUrl);
    container.apiClient.setBaseUrl(newUrl);
    checkStatus(newUrl);
  };

  return {
    health,
    loading,
    customUrl,
    checkStatus,
    updateUrlAndCheck,
  };
}
