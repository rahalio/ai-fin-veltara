/**
 * LiftRepositoryDdb — sandbox lift of an active freeze order.
 */

import type { LiftRepository } from "@veltara/services/freezes";
import type { AdapterDynamoDBClient } from "../_shared/dynamodb-client-types.js";
import { sandboxEntityMap, nowIso, responseMeta } from "../_shared/sandbox-store.js";

export class LiftRepositoryDdb implements LiftRepository {
  private readonly freezes = sandboxEntityMap("freezes:freezeOrder");

  constructor(_dynamoClient: AdapterDynamoDBClient) {}

  async liftFreezeOrder(input: any): Promise<any> {
    const inputExt = (input ?? {}) as Record<string, unknown>;
    const id = String(inputExt.id ?? inputExt.freezeId ?? "");
    if (!id) throw new Error("Missing freezeId");
    const prev = this.freezes.get(id);
    if (!prev) throw new Error(`Freeze ${id} not found`);
    const item = {
      ...prev,
      status: "lifted",
      liftedAt: nowIso(),
      liftedBy: inputExt.liftedBy ?? inputExt.createdByActorId ?? "system",
      updatedAt: nowIso(),
    };
    this.freezes.set(id, item);
    return {
      data: item,
      meta: responseMeta(String(inputExt.correlationId ?? "")).meta,
    } as any;
  }
}
