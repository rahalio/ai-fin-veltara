/**
 * Profiles Domain Module - Composition root (hand-fit after Mode A).
 */

import {
  ProfileRepositoryAdapter,
  SuitabilityPolicyRepositoryAdapter,
} from "@veltara/adapters/profiles";
import { getIdGeneratorService } from "@veltara/adapters";
import type { AdapterDynamoDBClient } from "@veltara/adapters";
import { executionContextService } from "../../../lib/execution-context.service.js";
import {
  ExecuteCreateSuitabilityPolicy,
  ExecuteGetClientProfile,
  ExecuteGetSuitabilityPolicy,
  ExecuteListSuitabilityPolicies,
  ExecuteUpsertClientProfile,
  ExecuteUpsertSuitabilityPolicy,
} from "@veltara/services/profiles/usecases";
import type {
  ProfileRepository,
  SuitabilityPolicyRepository,
} from "@veltara/services/profiles/ports";

export interface ProfilesDomainModule {
  repos: {
    profiles: ProfileRepository;
    suitabilityPolicies: SuitabilityPolicyRepository;
  };
  useCases: {
    profiles: {
      get: ExecuteGetClientProfile;
      upsert: ExecuteUpsertClientProfile;
    };
    suitabilityPolicies: {
      create: ExecuteCreateSuitabilityPolicy;
      get: ExecuteGetSuitabilityPolicy;
      list: ExecuteListSuitabilityPolicies;
      upsert: ExecuteUpsertSuitabilityPolicy;
    };
  };
}

export function buildProfilesDomainModule(
  dynamoClient: AdapterDynamoDBClient,
): ProfilesDomainModule {
  const repos = {
    profiles: new ProfileRepositoryAdapter(dynamoClient) as ProfileRepository,
    suitabilityPolicies: new SuitabilityPolicyRepositoryAdapter(
      dynamoClient,
    ) as SuitabilityPolicyRepository,
  };

  const executionContext = executionContextService;
  const idGenerator = getIdGeneratorService();

  const useCases = {
    profiles: {
      get: new ExecuteGetClientProfile(executionContext, idGenerator, repos.profiles),
      upsert: new ExecuteUpsertClientProfile(
        executionContext,
        idGenerator,
        repos.profiles,
      ),
    },
    suitabilityPolicies: {
      create: new ExecuteCreateSuitabilityPolicy(
        executionContext,
        idGenerator,
        repos.suitabilityPolicies,
      ),
      get: new ExecuteGetSuitabilityPolicy(
        executionContext,
        idGenerator,
        repos.suitabilityPolicies,
      ),
      list: new ExecuteListSuitabilityPolicies(
        executionContext,
        idGenerator,
        repos.suitabilityPolicies,
      ),
      upsert: new ExecuteUpsertSuitabilityPolicy(
        executionContext,
        idGenerator,
        repos.suitabilityPolicies,
      ),
    },
  };

  return { repos, useCases };
}
