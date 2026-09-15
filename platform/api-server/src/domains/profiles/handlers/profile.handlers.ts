/**
 * Handlers for Profile
 */

import type { FastifyRequest, FastifyReply } from "fastify";
import type { ProfilesDomainModule } from "../dependencies/profiles-ddd.dependencies.js";
import type {
  GetClientProfileInput,
  UpsertClientProfileInput,
} from "@veltara/services/profiles";

export async function getClientProfile(
  request: FastifyRequest<{ Params: { clientId: string } }>,
  reply: FastifyReply,
  deps: ProfilesDomainModule,
): Promise<void> {
  const input: GetClientProfileInput = {
    clientId: request.params.clientId,
  };
  const result = await deps.useCases.profiles.get.execute(input);
  return reply.code(200).send(result);
}

export async function upsertClientProfile(
  request: FastifyRequest<{ Params: { clientId: string }; Body: unknown }>,
  reply: FastifyReply,
  deps: ProfilesDomainModule,
): Promise<void> {
  const input: UpsertClientProfileInput = {
    clientId: request.params.clientId,
    ...(request.body as object ?? {}),
  };
  const result = await deps.useCases.profiles.upsert.execute(input);
  return reply.code(200).send(result);
}
