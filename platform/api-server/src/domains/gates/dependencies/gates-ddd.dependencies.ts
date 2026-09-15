/**
 * Gates Domain Module - Composition root (hand-fit after Mode A).
 */

import { GateRepositoryAdapter } from "@veltara/adapters/gates";
import { getIdGeneratorService } from "@veltara/adapters";
import type { AdapterDynamoDBClient } from "@veltara/adapters";
import { executionContextService } from "../../../lib/execution-context.service.js";
import {
  ExecuteDecideRecommendationGate,
  ExecuteGetGateDecision,
  ExecuteListGateDecisions,
} from "@veltara/services/gates/usecases";
import type { GateRepository } from "@veltara/services/gates/ports";

export interface GatesDomainModule {
  repos: {
    gates: GateRepository;
  };
  useCases: {
    gates: {
      decide: ExecuteDecideRecommendationGate;
      get: ExecuteGetGateDecision;
      list: ExecuteListGateDecisions;
    };
  };
}

export function buildGatesDomainModule(
  dynamoClient: AdapterDynamoDBClient,
): GatesDomainModule {
  const repos = {
    gates: new GateRepositoryAdapter(dynamoClient) as GateRepository,
  };
  const executionContext = executionContextService;
  const idGenerator = getIdGeneratorService();
  return {
    repos,
    useCases: {
      gates: {
        decide: new ExecuteDecideRecommendationGate(
          executionContext,
          idGenerator,
          repos.gates,
        ),
        get: new ExecuteGetGateDecision(executionContext, idGenerator, repos.gates),
        list: new ExecuteListGateDecisions(
          executionContext,
          idGenerator,
          repos.gates,
        ),
      },
    },
  };
}
