import { apiFetch } from "@/lib/api-client";

export const marketplaceService = {
  async list() {
    return apiFetch(`/v1/marketplace/contracts`);
  },
  async create(body?: Record<string, unknown>) {
    return apiFetch(`/v1/marketplace/contracts`, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      headers: { "Idempotency-Key": crypto.randomUUID() },
    });
  },
};

export const marketplaceFacade = marketplaceService;
