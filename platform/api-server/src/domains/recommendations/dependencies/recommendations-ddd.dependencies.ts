/**
 * Recommendations Domain Module - Composition root (hand-fit after Mode A).
 */

import {
  RecommendationRepositoryAdapter,
  RiskParameterRepositoryAdapter,
} from "@veltara/adapters/recommendations";
import { getIdGeneratorService } from "@veltara/adapters";
import type { AdapterDynamoDBClient } from "@veltara/adapters";
import { executionContextService } from "../../../lib/execution-context.service.js";
import {
  ExecuteCreateClientRecommendation,
  ExecuteGetRecommendation,
  ExecuteGetRecommendationRiskParameters,
  ExecuteListClientRecommendations,
  ExecuteUpsertRecommendationRiskParameters,
} from "@veltara/services/recommendations/usecases";
import type {
  RecommendationRepository,
  RiskParameterRepository,
} from "@veltara/services/recommendations/ports";

export interface RecommendationsDomainModule {
  repos: {
    recommendations: RecommendationRepository;
    riskParameters: RiskParameterRepository;
  };
  useCases: {
    recommendations: {
      create: ExecuteCreateClientRecommendation;
      get: ExecuteGetRecommendation;
      list: ExecuteListClientRecommendations;
    };
    riskParameters: {
      get: ExecuteGetRecommendationRiskParameters;
      upsert: ExecuteUpsertRecommendationRiskParameters;
    };
  };
}

export function buildRecommendationsDomainModule(
  dynamoClient: AdapterDynamoDBClient,
): RecommendationsDomainModule {
  const repos = {
    recommendations: new RecommendationRepositoryAdapter(
      dynamoClient,
    ) as RecommendationRepository,
    riskParameters: new RiskParameterRepositoryAdapter(
      dynamoClient,
    ) as RiskParameterRepository,
  };
  const executionContext = executionContextService;
  const idGenerator = getIdGeneratorService();
  return {
    repos,
    useCases: {
      recommendations: {
        create: new ExecuteCreateClientRecommendation(
          executionContext,
          idGenerator,
          repos.recommendations,
        ),
        get: new ExecuteGetRecommendation(
          executionContext,
          idGenerator,
          repos.recommendations,
        ),
        list: new ExecuteListClientRecommendations(
          executionContext,
          idGenerator,
          repos.recommendations,
        ),
      },
      riskParameters: {
        get: new ExecuteGetRecommendationRiskParameters(
          executionContext,
          idGenerator,
          repos.riskParameters,
        ),
        upsert: new ExecuteUpsertRecommendationRiskParameters(
          executionContext,
          idGenerator,
          repos.riskParameters,
        ),
      },
    },
  };
}
