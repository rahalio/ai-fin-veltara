import { apiFetch } from "@/lib/api-client";

export const strategiesService = {
  async list() {
    return apiFetch(`/v1/strategies`);
  },
  async create(body?: Record<string, unknown>) {
    return apiFetch(`/v1/strategies`, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      headers: { "Idempotency-Key": crypto.randomUUID() },
    });
  },
  async get(params: { id: string }) {
    return apiFetch(`/v1/strategies/${params.id}`);
  },
};

export const strategiesFacade = strategiesService;
