/**
 * Handlers for RiskParameter
 */

import type { FastifyRequest, FastifyReply } from "fastify";
import type { RecommendationsDomainModule } from "../dependencies/recommendations-ddd.dependencies.js";
import type {
  GetRecommendationRiskParametersInput,
  UpsertRecommendationRiskParametersInput,
} from "@veltara/services/recommendations";

export async function getRecommendationRiskParameters(
  request: FastifyRequest<{ Params: { recommendationId: string } }>,
  reply: FastifyReply,
  deps: RecommendationsDomainModule,
): Promise<void> {
  const input: GetRecommendationRiskParametersInput = {
    recommendationId: request.params.recommendationId,
  };
  const result = await deps.useCases.riskParameters.get.execute(input);
  return reply.code(200).send(result);
}

export async function upsertRecommendationRiskParameters(
  request: FastifyRequest<{ Params: { recommendationId: string }; Body: unknown }>,
  reply: FastifyReply,
  deps: RecommendationsDomainModule,
): Promise<void> {
  const input: UpsertRecommendationRiskParametersInput = {
    recommendationId: request.params.recommendationId,
    ...(request.body as object ?? {}),
  };
  const result = await deps.useCases.riskParameters.upsert.execute(input);
  return reply.code(200).send(result);
}
