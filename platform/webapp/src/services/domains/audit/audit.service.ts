import { apiFetch } from "@/lib/api-client";

export const auditService = {
  async list() {
    return apiFetch(`/v1/audit/exports`);
  },
  async create(body?: Record<string, unknown>) {
    return apiFetch(`/v1/audit/exports`, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      headers: { "Idempotency-Key": crypto.randomUUID() },
    });
  },
};

export const auditFacade = auditService;
