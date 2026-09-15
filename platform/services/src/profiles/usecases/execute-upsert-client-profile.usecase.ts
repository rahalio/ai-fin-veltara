/**
 * ExecuteUpsertClientProfile Use Case (hand-fit: merge body + clientId).
 */

import type { UpsertClientProfileInput, UpsertClientProfileOutput } from "../dto/profile.dto";
import type { ExecutionContextService, IdGeneratorService } from "@veltara/services/_shared/index.js";
import type { ProfileRepository } from "../ports";
import { ValidationError } from "../errors";

export class ExecuteUpsertClientProfile {
  constructor(
    private readonly context: ExecutionContextService,
    private readonly idGenerator: IdGeneratorService,
    private readonly profile: ProfileRepository,
  ) {}

  async execute(input: UpsertClientProfileInput): Promise<UpsertClientProfileOutput> {
    const correlationId = this.idGenerator.prfId();
    if (!input) throw new ValidationError("Input is required");
    const clientId = (input as any).clientId;
    if (!clientId) throw new ValidationError("clientId is required");

    const entity = await this.profile.upsertClientProfile({
      ...input,
      id: clientId,
      clientId,
      orgId: this.context.getOrgId(),
      correlationId,
    } as any);

    return entity as UpsertClientProfileOutput;
  }
}
