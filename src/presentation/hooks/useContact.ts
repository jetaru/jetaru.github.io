"use client";

import { useState } from "react";
import { container } from "@/infrastructure/container";
import { ContactMessage, ContactSubmissionResult } from "@/core/domain/entities/contact";

export function useContact() {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<ContactSubmissionResult | null>(null);

  const sendMessage = async (message: ContactMessage): Promise<boolean> => {
    setSubmitting(true);
    setResult(null);
    try {
      const res = await container.sendContactUseCase.execute(message);
      setResult(res);
      return res.success;
    } catch (err: unknown) {
      setResult({
        success: false,
        message: err instanceof Error ? err.message : "Error inesperado al enviar el mensaje.",
        timestamp: new Date().toISOString(),
      });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const resetResult = () => setResult(null);

  return { submitting, result, sendMessage, resetResult };
}
