import { defaultApiClient } from "./api/client";
import { HttpProjectRepository } from "./repositories/http/HttpProjectRepository";
import { HttpContactRepository } from "./repositories/http/HttpContactRepository";
import { HttpServerRepository } from "./repositories/http/HttpServerRepository";
import { MockSkillRepository } from "./repositories/mock/MockSkillRepository";
import { EmailJSContactRepository } from "./repositories/emailjs/EmailJSContactRepository";

import { GetProjectsUseCase } from "@/core/usecases/get-projects.usecase";
import { GetSkillsUseCase } from "@/core/usecases/get-skills.usecase";
import { SendContactUseCase } from "@/core/usecases/send-contact.usecase";
import { CheckServerStatusUseCase } from "@/core/usecases/check-server.usecase";

/**
 * Contenedor de Inversión de Control (IoC) del Portafolio.
 * Administra las dependencias entre infraestructura y casos de uso de dominio.
 */
class ServiceContainer {
  public readonly apiClient = defaultApiClient;

  // Repositories
  public readonly projectRepository = new HttpProjectRepository(this.apiClient);
  public readonly emailContactRepository = new EmailJSContactRepository();
  public readonly httpContactRepository = new HttpContactRepository(this.apiClient);
  /** Repositorio principal de contacto con EmailJS activo para GitHub Pages */
  public readonly contactRepository = this.emailContactRepository;
  public readonly serverRepository = new HttpServerRepository();
  public readonly skillRepository = new MockSkillRepository();

  // Use Cases
  public readonly getProjectsUseCase = new GetProjectsUseCase(this.projectRepository);
  public readonly getSkillsUseCase = new GetSkillsUseCase(this.skillRepository);
  public readonly sendContactUseCase = new SendContactUseCase(this.contactRepository);
  public readonly checkServerUseCase = new CheckServerStatusUseCase(this.serverRepository);
}

export const container = new ServiceContainer();
