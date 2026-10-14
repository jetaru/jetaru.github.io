"use client";

import { useState, useEffect } from "react";
import { container } from "@/infrastructure/container";
import { Project } from "@/core/domain/entities/project";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await container.getProjectsUseCase.execute();
      setProjects(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al cargar los proyectos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, loading, error, refetch: fetchProjects };
}
