import { apiFetch } from "@/lib/api-client";

export const freezesService = {
  async list() {
    return apiFetch(`/v1/freezes`);
  },
  async create(body?: Record<string, unknown>) {
    return apiFetch(`/v1/freezes`, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      headers: { "Idempotency-Key": crypto.randomUUID() },
    });
  },
  async lift(params: { id: string }, body?: Record<string, unknown>) {
    return apiFetch(`/v1/freezes/${params.id}/lift`, { method: 'POST', body: body ? JSON.stringify(body) : undefined, headers: { 'Idempotency-Key': crypto.randomUUID() } });
  },
};

export const freezesFacade = freezesService;
