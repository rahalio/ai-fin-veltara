/**
 * ProfileRepositoryDdb — sandbox in-memory implementation (local/dev).
 * Hand-fit after Mode A codegen so product APIs work without DynamoDB Local.
 */

import type { ProfileRepository } from "@veltara/services/profiles";
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


export class ProfileRepositoryDdb implements ProfileRepository {
  private readonly store = sandboxEntityMap("profiles:clientProfile");

  constructor(_dynamoClient: AdapterDynamoDBClient) {}

  async getClientProfile(input: any): Promise<any> {
    const inputExt = asRecord(input);
    const id = entityId(inputExt, "id", "clientId");
    const item = this.store.get(id);
    if (!item) throw new Error(`Entity ${id} not found`);
    return { data: item, meta: meta(inputExt) } as any;
  }
  async upsertClientProfile(input: any): Promise<any> {
    const inputExt = asRecord(input);
    const id = entityId(inputExt, "id", "clientId");
    const now = nowIso();
    const prev = this.store.get(id) ?? {};
    const item = { ...prev, ...inputExt, id, updatedAt: now, createdAt: (prev as any).createdAt ?? now };
    this.store.set(id, item);
    return { data: item, meta: meta(inputExt) } as any;
  }
}
