/**
 * Handlers for Gate
 */

import type { FastifyRequest, FastifyReply } from "fastify";
import type { GatesDomainModule } from "../dependencies/gates-ddd.dependencies.js";
import type {
  DecideRecommendationGateInput,
  GetGateDecisionInput,
  ListGateDecisionsInput,
} from "@veltara/services/gates";

export async function listGateDecisions(
  request: FastifyRequest<{ Querystring: { outcome?: string | string[] } }>,
  reply: FastifyReply,
  deps: GatesDomainModule,
): Promise<void> {
  const input: ListGateDecisionsInput = {
    ...(request.query ?? {}),
  };
  const result = await deps.useCases.gates.list.execute(input);
  return reply.code(200).send(result);
}

export async function decideRecommendationGate(
  request: FastifyRequest<{ Params: { recommendationId: string }; Body: unknown }>,
  reply: FastifyReply,
  deps: GatesDomainModule,
): Promise<void> {
  const input: DecideRecommendationGateInput = {
    recommendationId: request.params.recommendationId,
    ...(request.body as object ?? {}),
  };
  const result = await deps.useCases.gates.decide.execute(input);
  return reply.code(201).send(result);
}

export async function getGateDecision(
  request: FastifyRequest<{ Params: { gateDecisionId: string } }>,
  reply: FastifyReply,
  deps: GatesDomainModule,
): Promise<void> {
  const input: GetGateDecisionInput = {
    gateDecisionId: request.params.gateDecisionId,
  };
  const result = await deps.useCases.gates.get.execute(input);
  return reply.code(200).send(result);
}
