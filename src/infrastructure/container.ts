import { defaultApiClient } from "./api/client";
import { HttpProjectRepository } from "./repositories/http/HttpProjectRepository";
import { HttpContactRepository } from "./repositories/http/HttpContactRepository";
import { HttpServerRepository } from "./repositories/http/HttpServerRepository";
import { MockSkillRepository } from "./repositories/mock/MockSkillRepository";

import { GetProjectsUseCase } from "@/core/usecases/get-projects.usecase";
import { GetSkillsUseCase } from "@/core/usecases/get-skills.usecase";
import { SendContactUseCase } from "@/core/usecases/send-contact.usecase";
import { CheckServerStatusUseCase } from "@/core/usecases/check-server.usecase";

class ServiceContainer {
  public readonly apiClient = defaultApiClient;

  // Repositories
  public readonly projectRepository = new HttpProjectRepository(this.apiClient);
  public readonly contactRepository = new HttpContactRepository(this.apiClient);
  public readonly serverRepository = new HttpServerRepository();
  public readonly skillRepository = new MockSkillRepository();

  // Use Cases
  public readonly getProjectsUseCase = new GetProjectsUseCase(this.projectRepository);
  public readonly getSkillsUseCase = new GetSkillsUseCase(this.skillRepository);
  public readonly sendContactUseCase = new SendContactUseCase(this.contactRepository);
  public readonly checkServerUseCase = new CheckServerStatusUseCase(this.serverRepository);
}

export const container = new ServiceContainer();
