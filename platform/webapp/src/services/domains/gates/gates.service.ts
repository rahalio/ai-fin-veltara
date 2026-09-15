import { apiFetch } from "@/lib/api-client";

export const gatesService = {
  async list() {
    return apiFetch(`/v1/gates`);
  },
  async decide(params: { recommendationId: string }, body?: Record<string, unknown>) {
    return apiFetch(`/v1/recommendations/${params.recommendationId}/gate`, { method: 'POST', body: body ? JSON.stringify(body) : undefined, headers: { 'Idempotency-Key': crypto.randomUUID() } });
  },
};

export const gatesFacade = gatesService;
