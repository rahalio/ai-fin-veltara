/**
 * AdvisorRepositoryDdb — sandbox in-memory implementation (local/dev).
 * Hand-fit after Mode A codegen so product APIs work without DynamoDB Local.
 */

import type { AdvisorRepository } from "@veltara/services/strategies";
import type { AdapterDynamoDBClient } from "../_shared/dynamodb-client-types.js";

import { sandboxEntityMap, nowIso, responseMeta } from "../_shared/sandbox-store.js";

function meta(input: Record<string, unknown>) {
  return responseMeta(String(input.correlationId ?? "")).meta;
}

function asRecord(input: unknown): Record<string, unknown> {
  return (input ?? {}) as Record<string, unknown>;
}

function entityId(input: Record<string, unknown>, ...keys: string[]): string {
  for (const k of keys) {
    const v = input[k];
    if (typeof v === "string" && v.length > 0) return v;
  }
  throw new Error(`Missing id field among: ${keys.join(", ")}`);
}


export class AdvisorRepositoryDdb implements AdvisorRepository {
  private readonly store = sandboxEntityMap("strategies:advisor");

  constructor(_dynamoClient: AdapterDynamoDBClient) {}

  async listAdvisors(input: any): Promise<any> {
    const inputExt = asRecord(input);
    const items = [...this.store.values()];
    return { data: { items }, meta: meta(inputExt) } as any;
  }
  async createAdvisor(input: any): Promise<any> {
    const inputExt = asRecord(input);
    const id = entityId(inputExt, "id");
    const now = nowIso();
    const item = { ...inputExt, id, createdAt: now, updatedAt: now, status: inputExt.status ?? "active" };
    this.store.set(id, item);
    return { data: item, meta: meta(inputExt) } as any;
  }
  async getAdvisor(input: any): Promise<any> {
    const inputExt = asRecord(input);
    const id = entityId(inputExt, "id", "advisorId");
    const item = this.store.get(id);
    if (!item) throw new Error(`Entity ${id} not found`);
    return { data: item, meta: meta(inputExt) } as any;
  }
  async updateAdvisor(input: any): Promise<any> {
    const inputExt = asRecord(input);
    const id = entityId(inputExt, "id", "advisorId");
    const prev = this.store.get(id);
    if (!prev) throw new Error(`Entity ${id} not found`);
    const item = { ...prev, ...inputExt, id, updatedAt: nowIso() };
    this.store.set(id, item);
    return { data: item, meta: meta(inputExt) } as any;
  }
}
