/**
 * RecommendationRepositoryDdb — sandbox in-memory implementation (local/dev).
 * Hand-fit after Mode A codegen so product APIs work without DynamoDB Local.
 */

import type { RecommendationRepository } from "@veltara/services/recommendations";
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


export class RecommendationRepositoryDdb implements RecommendationRepository {
  private readonly store = sandboxEntityMap("recommendations:recommendation");

  constructor(_dynamoClient: AdapterDynamoDBClient) {}

  async listClientRecommendations(input: any): Promise<any> {
    const inputExt = asRecord(input);
    const filterVal = inputExt["clientId"];
    let items = [...this.store.values()];
    if (filterVal) items = items.filter((x) => x["clientId"] === filterVal);

    return { data: { items }, meta: meta(inputExt) } as any;
  }
  async createClientRecommendation(input: any): Promise<any> {
    const inputExt = asRecord(input);
    const id = entityId(inputExt, "id");
    const now = nowIso();
    const item = { ...inputExt, id, createdAt: now, updatedAt: now, status: inputExt.status ?? "active" };
    this.store.set(id, item);
    return { data: item, meta: meta(inputExt) } as any;
  }
  async getRecommendation(input: any): Promise<any> {
    const inputExt = asRecord(input);
    const id = entityId(inputExt, "id", "recommendationId");
    const item = this.store.get(id);
    if (!item) throw new Error(`Entity ${id} not found`);
    return { data: item, meta: meta(inputExt) } as any;
  }
}
