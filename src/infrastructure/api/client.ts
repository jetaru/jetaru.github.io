import { appConfig } from "../config/env";

export interface RequestOptions extends RequestInit {
  timeoutMs?: number;
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly message: string,
    public readonly data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class ApiClient {
  private baseUrl: string;

  constructor(customBaseUrl?: string) {
    this.baseUrl = (customBaseUrl || appConfig.api.baseUrl).replace(/\/$/, "");
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  setBaseUrl(url: string) {
    this.baseUrl = url.replace(/\/$/, "");
  }

  hasConfiguredUrl(): boolean {
    return Boolean(this.baseUrl && this.baseUrl.trim().length > 0);
  }

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { timeoutMs = appConfig.api.timeoutMs, ...fetchOptions } = options;
    const url = `${this.baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...fetchOptions.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errData;
        try {
          errData = await response.json();
        } catch {
          errData = await response.text();
        }
        throw new ApiError(
          response.status,
          `HTTP Error ${response.status}: ${response.statusText}`,
          errData
        );
      }

      return (await response.json()) as T;
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      if (error instanceof ApiError) {
        throw error;
      }
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new ApiError(408, `Tiempo de espera agotado (${timeoutMs}ms) al conectar con el servidor.`);
      }
      const msg = error instanceof Error ? error.message : "Error de red desconocido";
      throw new ApiError(0, `Fallo de conexión con el servidor JS: ${msg}`);
    }
  }

  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  async post<T>(endpoint: string, body: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });
  }
}

export const defaultApiClient = new ApiClient();
