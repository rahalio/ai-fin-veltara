import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const upsertClientProfile_Body = z
  .object({
    riskScore: z.number().gte(0).lte(100),
    horizonYears: z.number().int().gte(1).lte(50).optional(),
    hardLossLimitPct: z.number().gte(0).lte(100).optional(),
    productPermissions: z.array(z.string()).optional(),
    suitabilityPolicyId: z
      .string()
      .regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    status: z.enum(['active', 'frozen']).optional(),
  })
  .passthrough();
const createSuitabilityPolicy_Body = z
  .object({
    name: z.string().min(1).max(200),
    version: z.string(),
    rulesSummary: z.string(),
    maxRiskScore: z.number().optional(),
    requireHumanGate: z.boolean().optional(),
    status: z.enum(['active', 'retired']).optional(),
  })
  .passthrough();
const ClientId = z.string();
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const PolicyId = z.string();
const ProfileStatus = z.enum(['active', 'frozen']);
const ClientProfile = z
  .object({
    id: z.string().regex(/^cli_[0-9A-HJKMNP-TV-Z]{26}$/),
    riskScore: z.number().gte(0).lte(100),
    horizonYears: z.number().int().gte(1).lte(50).optional(),
    hardLossLimitPct: z.number().gte(0).lte(100).optional(),
    productPermissions: z.array(z.string()).optional(),
    suitabilityPolicyId: z
      .string()
      .regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    status: z.enum(['active', 'frozen']),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const ClientProfileResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^cli_[0-9A-HJKMNP-TV-Z]{26}$/),
        riskScore: z.number().gte(0).lte(100),
        horizonYears: z.number().int().gte(1).lte(50).optional(),
        hardLossLimitPct: z.number().gte(0).lte(100).optional(),
        productPermissions: z.array(z.string()).optional(),
        suitabilityPolicyId: z
          .string()
          .regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        status: z.enum(['active', 'frozen']),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const ClientProfileUpsert = z
  .object({
    riskScore: z.number().gte(0).lte(100),
    horizonYears: z.number().int().gte(1).lte(50).optional(),
    hardLossLimitPct: z.number().gte(0).lte(100).optional(),
    productPermissions: z.array(z.string()).optional(),
    suitabilityPolicyId: z
      .string()
      .regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    status: z.enum(['active', 'frozen']).optional(),
  })
  .passthrough();
const SuitabilityPolicy = z
  .object({
    id: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string().min(1).max(200),
    version: z.string(),
    rulesSummary: z.string(),
    maxRiskScore: z.number().optional(),
    requireHumanGate: z.boolean().optional(),
    status: z.enum(['active', 'retired']),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const SuitabilityPolicyListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
          name: z.string().min(1).max(200),
          version: z.string(),
          rulesSummary: z.string(),
          maxRiskScore: z.number().optional(),
          requireHumanGate: z.boolean().optional(),
          status: z.enum(['active', 'retired']),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
  })
  .passthrough();
const SuitabilityPolicyListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string().min(1).max(200),
              version: z.string(),
              rulesSummary: z.string(),
              maxRiskScore: z.number().optional(),
              requireHumanGate: z.boolean().optional(),
              status: z.enum(['active', 'retired']),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const SuitabilityPolicyUpsert = z
  .object({
    name: z.string().min(1).max(200),
    version: z.string(),
    rulesSummary: z.string(),
    maxRiskScore: z.number().optional(),
    requireHumanGate: z.boolean().optional(),
    status: z.enum(['active', 'retired']).optional(),
  })
  .passthrough();
const SuitabilityPolicyResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string().min(1).max(200),
        version: z.string(),
        rulesSummary: z.string(),
        maxRiskScore: z.number().optional(),
        requireHumanGate: z.boolean().optional(),
        status: z.enum(['active', 'retired']),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();

export const schemas: any = {
  upsertClientProfile_Body,
  createSuitabilityPolicy_Body,
  ClientId,
  Problem,
  PolicyId,
  ProfileStatus,
  ClientProfile,
  ResponseMeta,
  ClientProfileResponse,
  ClientProfileUpsert,
  SuitabilityPolicy,
  SuitabilityPolicyListData,
  SuitabilityPolicyListResponse,
  SuitabilityPolicyUpsert,
  SuitabilityPolicyResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/clients/:clientId/profile',
    alias: 'getClientProfile',
    requestFormat: 'json',
    parameters: [
      {
        name: 'clientId',
        type: 'Path',
        schema: z.string().regex(/^cli_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^cli_[0-9A-HJKMNP-TV-Z]{26}$/),
            riskScore: z.number().gte(0).lte(100),
            horizonYears: z.number().int().gte(1).lte(50).optional(),
            hardLossLimitPct: z.number().gte(0).lte(100).optional(),
            productPermissions: z.array(z.string()).optional(),
            suitabilityPolicyId: z
              .string()
              .regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            status: z.enum(['active', 'frozen']),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'put',
    path: '/v1/clients/:clientId/profile',
    alias: 'upsertClientProfile',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: upsertClientProfile_Body,
      },
      {
        name: 'clientId',
        type: 'Path',
        schema: z.string().regex(/^cli_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^cli_[0-9A-HJKMNP-TV-Z]{26}$/),
            riskScore: z.number().gte(0).lte(100),
            horizonYears: z.number().int().gte(1).lte(50).optional(),
            hardLossLimitPct: z.number().gte(0).lte(100).optional(),
            productPermissions: z.array(z.string()).optional(),
            suitabilityPolicyId: z
              .string()
              .regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            status: z.enum(['active', 'frozen']),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/suitability-policies',
    alias: 'listSuitabilityPolicies',
    requestFormat: 'json',
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string().min(1).max(200),
                  version: z.string(),
                  rulesSummary: z.string(),
                  maxRiskScore: z.number().optional(),
                  requireHumanGate: z.boolean().optional(),
                  status: z.enum(['active', 'retired']),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/suitability-policies',
    alias: 'createSuitabilityPolicy',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createSuitabilityPolicy_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            version: z.string(),
            rulesSummary: z.string(),
            maxRiskScore: z.number().optional(),
            requireHumanGate: z.boolean().optional(),
            status: z.enum(['active', 'retired']),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/suitability-policies/:policyId',
    alias: 'getSuitabilityPolicy',
    requestFormat: 'json',
    parameters: [
      {
        name: 'policyId',
        type: 'Path',
        schema: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            version: z.string(),
            rulesSummary: z.string(),
            maxRiskScore: z.number().optional(),
            requireHumanGate: z.boolean().optional(),
            status: z.enum(['active', 'retired']),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'put',
    path: '/v1/suitability-policies/:policyId',
    alias: 'upsertSuitabilityPolicy',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createSuitabilityPolicy_Body,
      },
      {
        name: 'policyId',
        type: 'Path',
        schema: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            version: z.string(),
            rulesSummary: z.string(),
            maxRiskScore: z.number().optional(),
            requireHumanGate: z.boolean().optional(),
            status: z.enum(['active', 'retired']),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
