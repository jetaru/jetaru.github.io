/**
 * Entidad de dominio que representa un mensaje de contacto técnico o profesional.
 */
export interface ContactMessage {
  /** Nombre completo o empresa del remitente */
  name: string;
  /** Correo electrónico de respuesta del remitente */
  email: string;
  /** Asunto o tópico de la consulta */
  subject: string;
  /** Detalle o cuerpo del mensaje */
  message: string;
  /** Canal de contacto preferente (opcional) */
  preferredChannel?: "email" | "linkedin" | "whatsapp";
}

/**
 * Resultado estructurado tras enviar un mensaje de contacto.
 */
export interface ContactSubmissionResult {
  /** Indica si el mensaje fue enviado con éxito */
  success: boolean;
  /** Mensaje de retroalimentación para el usuario */
  message: string;
  /** Identificador de ticket único para seguimiento */
  ticketId?: string;
  /** Fecha y hora ISO de la sumisión */
  timestamp: string;
  /** Indica si se procesó mediante simulación local */
  isSimulated?: boolean;
  /** Canal o método de entrega utilizado */
  deliveryMethod?: "emailjs" | "http" | "mock";
}
