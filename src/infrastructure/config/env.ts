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
  emailjs: {
    /**
     * Clave pública de EmailJS (Account Public Key).
     * Se expone de forma segura en el cliente web según el diseño de EmailJS.
     */
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "fc4QxiMiBJhDBwCbH",
    /**
     * ID del servicio configurado en EmailJS (conectado a Gmail o proveedor SMTP).
     */
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_gmail_jeta_us",
    /**
     * ID de la plantilla de correo configurada en EmailJS (Email Templates).
     */
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_jetaru",
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  isProduction: process.env.NODE_ENV === "production",
};
