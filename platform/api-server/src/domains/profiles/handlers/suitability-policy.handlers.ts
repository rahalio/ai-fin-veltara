/**
 * Handlers for SuitabilityPolicy
 */

import type { FastifyRequest, FastifyReply } from "fastify";
import type { ProfilesDomainModule } from "../dependencies/profiles-ddd.dependencies.js";
import type {
  CreateSuitabilityPolicyInput,
  GetSuitabilityPolicyInput,
  ListSuitabilityPoliciesInput,
  UpsertSuitabilityPolicyInput,
} from "@veltara/services/profiles";

export async function listSuitabilityPolicies(
  _request: FastifyRequest,
  reply: FastifyReply,
  deps: ProfilesDomainModule,
): Promise<void> {
  const input: ListSuitabilityPoliciesInput = {};
  const result = await deps.useCases.suitabilityPolicies.list.execute(input);
  return reply.code(200).send(result);
}

export async function createSuitabilityPolicy(
  request: FastifyRequest,
  reply: FastifyReply,
  deps: ProfilesDomainModule,
): Promise<void> {
  const input: CreateSuitabilityPolicyInput = {
    ...(request.body as object ?? {}),
  };
  const result = await deps.useCases.suitabilityPolicies.create.execute(input);
  return reply.code(201).send(result);
}

export async function getSuitabilityPolicy(
  request: FastifyRequest<{ Params: { policyId: string } }>,
  reply: FastifyReply,
  deps: ProfilesDomainModule,
): Promise<void> {
  const input: GetSuitabilityPolicyInput = {
    policyId: request.params.policyId,
  };
  const result = await deps.useCases.suitabilityPolicies.get.execute(input);
  return reply.code(200).send(result);
}

export async function upsertSuitabilityPolicy(
  request: FastifyRequest<{ Params: { policyId: string }; Body: unknown }>,
  reply: FastifyReply,
  deps: ProfilesDomainModule,
): Promise<void> {
  const input: UpsertSuitabilityPolicyInput = {
    policyId: request.params.policyId,
    ...(request.body as object ?? {}),
  };
  const result = await deps.useCases.suitabilityPolicies.upsert.execute(input);
  return reply.code(200).send(result);
}
