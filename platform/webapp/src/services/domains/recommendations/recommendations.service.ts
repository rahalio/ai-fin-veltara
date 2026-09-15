import { apiFetch } from "@/lib/api-client";

export const recommendationsService = {
  async list(params: { clientId: string }) {
    return apiFetch(`/v1/clients/${params.clientId}/recommendations`);
  },
  async create(params: { clientId: string }, body?: Record<string, unknown>) {
    return apiFetch(`/v1/clients/${params.clientId}/recommendations`, { method: 'POST', body: body ? JSON.stringify(body) : undefined, headers: { 'Idempotency-Key': crypto.randomUUID() } });
  },
  async get(params: { id: string }) {
    return apiFetch(`/v1/recommendations/${params.id}`);
  },
};

export const recommendationsFacade = recommendationsService;
