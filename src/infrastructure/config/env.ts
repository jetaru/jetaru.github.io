export const appConfig = {
  appName: "Jorge Thompson | Senior Software Engineer & Architect",
  appDescription:
    "Portafolio profesional de alta ingeniería: arquitectura limpia, aplicaciones escalables, sistemas distribuidos y microservicios.",
  author: {
    name: "Jorge Thompson",
    handle: "jetaru",
    role: "Senior Software Engineer & Systems Architect",
    location: "Chile / Remoto",
    github: "https://github.com/jetaru",
    linkedin: "https://linkedin.com/in/jorge-e-thompson-alvarado",
    email: "a.thompson.jorge@gmail.com",
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "",
    timeoutMs: 5000,
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  isProduction: process.env.NODE_ENV === "production",
};
