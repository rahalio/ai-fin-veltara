import { apiFetch } from "@/lib/api-client";

export const profilesService = {
  async getProfile(params: { clientId: string }) {
    return apiFetch(`/v1/clients/${params.clientId}/profile`);
  },
  async upsertProfile(params: { clientId: string }, body?: Record<string, unknown>) {
    return apiFetch(`/v1/clients/${params.clientId}/profile`, { method: 'PUT', body: body ? JSON.stringify(body) : undefined, headers: { 'Idempotency-Key': crypto.randomUUID() } });
  },
  async listPolicies() {
    return apiFetch(`/v1/suitability-policies`);
  },
  async createPolicy(body?: Record<string, unknown>) {
    return apiFetch(`/v1/suitability-policies`, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      headers: { "Idempotency-Key": crypto.randomUUID() },
    });
  },
};

export const profilesFacade = profilesService;
