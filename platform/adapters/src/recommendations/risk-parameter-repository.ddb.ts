/**
 * RiskParameterRepositoryDdb — sandbox in-memory implementation (local/dev).
 * Hand-fit after Mode A codegen so product APIs work without DynamoDB Local.
 */

import type { RiskParameterRepository } from "@veltara/services/recommendations";
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


export class RiskParameterRepositoryDdb implements RiskParameterRepository {
  private readonly store = sandboxEntityMap("recommendations:riskParameter");

  constructor(_dynamoClient: AdapterDynamoDBClient) {}

  async getRecommendationRiskParameters(input: any): Promise<any> {
    const inputExt = asRecord(input);
    const id = entityId(inputExt, "id", "recommendationId", "riskParameterSetId");
    const item = this.store.get(id);
    if (!item) throw new Error(`Entity ${id} not found`);
    return { data: item, meta: meta(inputExt) } as any;
  }
  async upsertRecommendationRiskParameters(input: any): Promise<any> {
    const inputExt = asRecord(input);
    const id = entityId(inputExt, "id", "recommendationId");
    const now = nowIso();
    const prev = this.store.get(id) ?? {};
    const item = { ...prev, ...inputExt, id, updatedAt: now, createdAt: (prev as any).createdAt ?? now };
    this.store.set(id, item);
    return { data: item, meta: meta(inputExt) } as any;
  }
}
