/**
 * StrategyRepositoryDdb — sandbox in-memory implementation (local/dev).
 * Hand-fit after Mode A codegen so product APIs work without DynamoDB Local.
 */

import type { StrategyRepository } from "@veltara/services/strategies";
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


export class StrategyRepositoryDdb implements StrategyRepository {
  private readonly store = sandboxEntityMap("strategies:strategy");

  constructor(_dynamoClient: AdapterDynamoDBClient) {}

  async listStrategies(input: any): Promise<any> {
    const inputExt = asRecord(input);
    const items = [...this.store.values()];
    return { data: { items }, meta: meta(inputExt) } as any;
  }
  async createStrategy(input: any): Promise<any> {
    const inputExt = asRecord(input);
    const id = entityId(inputExt, "id");
    const now = nowIso();
    const item = { ...inputExt, id, createdAt: now, updatedAt: now, status: inputExt.status ?? "active" };
    this.store.set(id, item);
    return { data: item, meta: meta(inputExt) } as any;
  }
  async getStrategy(input: any): Promise<any> {
    const inputExt = asRecord(input);
    const id = entityId(inputExt, "id", "strategyId");
    const item = this.store.get(id);
    if (!item) throw new Error(`Entity ${id} not found`);
    return { data: item, meta: meta(inputExt) } as any;
  }
  async updateStrategy(input: any): Promise<any> {
    const inputExt = asRecord(input);
    const id = entityId(inputExt, "id", "strategyId");
    const prev = this.store.get(id);
    if (!prev) throw new Error(`Entity ${id} not found`);
    const item = { ...prev, ...inputExt, id, updatedAt: nowIso() };
    this.store.set(id, item);
    return { data: item, meta: meta(inputExt) } as any;
  }
}
