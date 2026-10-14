export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  preferredChannel?: "email" | "linkedin" | "whatsapp";
}

export interface ContactSubmissionResult {
  success: boolean;
  message: string;
  ticketId?: string;
  timestamp: string;
  isSimulated?: boolean;
}
