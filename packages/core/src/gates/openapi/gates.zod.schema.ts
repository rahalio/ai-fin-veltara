import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const decideRecommendationGate_Body = z
  .object({
    outcome: z.enum(['pass', 'fail', 'override']),
    reasons: z.array(z.string()).optional(),
    overrideJustification: z.string().optional(),
    secondApproverId: z.string().optional(),
  })
  .passthrough();
const GateOutcome = z.enum(['pass', 'fail', 'override']);
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
const GateDecisionId = z.string();
const RecommendationId = z.string();
const GateDecision = z
  .object({
    id: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
    recommendationId: z.string().regex(/^rec_[0-9A-HJKMNP-TV-Z]{26}$/),
    outcome: z.enum(['pass', 'fail', 'override']),
    reasons: z.array(z.string()).optional(),
    overrideJustification: z.string().optional(),
    secondApproverId: z.string().optional(),
    decidedBy: z.string(),
    decidedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const GateDecisionListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
          recommendationId: z.string().regex(/^rec_[0-9A-HJKMNP-TV-Z]{26}$/),
          outcome: z.enum(['pass', 'fail', 'override']),
          reasons: z.array(z.string()).optional(),
          overrideJustification: z.string().optional(),
          secondApproverId: z.string().optional(),
          decidedBy: z.string(),
          decidedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
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
const GateDecisionListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
              recommendationId: z
                .string()
                .regex(/^rec_[0-9A-HJKMNP-TV-Z]{26}$/),
              outcome: z.enum(['pass', 'fail', 'override']),
              reasons: z.array(z.string()).optional(),
              overrideJustification: z.string().optional(),
              secondApproverId: z.string().optional(),
              decidedBy: z.string(),
              decidedAt: z.string().datetime({ offset: true }),
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
const GateDecisionCreate = z
  .object({
    outcome: z.enum(['pass', 'fail', 'override']),
    reasons: z.array(z.string()).optional(),
    overrideJustification: z.string().optional(),
    secondApproverId: z.string().optional(),
  })
  .passthrough();
const GateDecisionResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
        recommendationId: z.string().regex(/^rec_[0-9A-HJKMNP-TV-Z]{26}$/),
        outcome: z.enum(['pass', 'fail', 'override']),
        reasons: z.array(z.string()).optional(),
        overrideJustification: z.string().optional(),
        secondApproverId: z.string().optional(),
        decidedBy: z.string(),
        decidedAt: z.string().datetime({ offset: true }),
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
  decideRecommendationGate_Body,
  GateOutcome,
  Problem,
  GateDecisionId,
  RecommendationId,
  GateDecision,
  GateDecisionListData,
  ResponseMeta,
  GateDecisionListResponse,
  GateDecisionCreate,
  GateDecisionResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/gates',
    alias: 'listGateDecisions',
    requestFormat: 'json',
    parameters: [
      {
        name: 'outcome',
        type: 'Query',
        schema: z.enum(['pass', 'fail', 'override']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
                  recommendationId: z
                    .string()
                    .regex(/^rec_[0-9A-HJKMNP-TV-Z]{26}$/),
                  outcome: z.enum(['pass', 'fail', 'override']),
                  reasons: z.array(z.string()).optional(),
                  overrideJustification: z.string().optional(),
                  secondApproverId: z.string().optional(),
                  decidedBy: z.string(),
                  decidedAt: z.string().datetime({ offset: true }),
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
    method: 'get',
    path: '/v1/gates/:gateDecisionId',
    alias: 'getGateDecision',
    requestFormat: 'json',
    parameters: [
      {
        name: 'gateDecisionId',
        type: 'Path',
        schema: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
            recommendationId: z.string().regex(/^rec_[0-9A-HJKMNP-TV-Z]{26}$/),
            outcome: z.enum(['pass', 'fail', 'override']),
            reasons: z.array(z.string()).optional(),
            overrideJustification: z.string().optional(),
            secondApproverId: z.string().optional(),
            decidedBy: z.string(),
            decidedAt: z.string().datetime({ offset: true }),
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
    method: 'post',
    path: '/v1/recommendations/:recommendationId/gate',
    alias: 'decideRecommendationGate',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: decideRecommendationGate_Body,
      },
      {
        name: 'recommendationId',
        type: 'Path',
        schema: z.string().regex(/^rec_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
            recommendationId: z.string().regex(/^rec_[0-9A-HJKMNP-TV-Z]{26}$/),
            outcome: z.enum(['pass', 'fail', 'override']),
            reasons: z.array(z.string()).optional(),
            overrideJustification: z.string().optional(),
            secondApproverId: z.string().optional(),
            decidedBy: z.string(),
            decidedAt: z.string().datetime({ offset: true }),
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
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
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
