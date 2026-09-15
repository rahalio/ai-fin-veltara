import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createFreezeOrder_Body = z
  .object({
    targetType: z.enum(['strategy', 'advisor', 'model']),
    targetId: z.string(),
    reason: z.string(),
  })
  .passthrough();
const FreezeStatus = z.enum(['active', 'lifted']);
const FreezeTargetType = z.enum(['strategy', 'advisor', 'model']);
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
const FreezeOrderId = z.string();
const FreezeOrder = z
  .object({
    id: z.string().regex(/^frz_[0-9A-HJKMNP-TV-Z]{26}$/),
    targetType: z.enum(['strategy', 'advisor', 'model']),
    targetId: z.string(),
    reason: z.string(),
    status: z.enum(['active', 'lifted']),
    issuedBy: z.string(),
    issuedAt: z.string().datetime({ offset: true }),
    liftedAt: z.string().datetime({ offset: true }).optional(),
    liftedBy: z.string().optional(),
  })
  .passthrough();
const FreezeOrderListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^frz_[0-9A-HJKMNP-TV-Z]{26}$/),
          targetType: z.enum(['strategy', 'advisor', 'model']),
          targetId: z.string(),
          reason: z.string(),
          status: z.enum(['active', 'lifted']),
          issuedBy: z.string(),
          issuedAt: z.string().datetime({ offset: true }),
          liftedAt: z.string().datetime({ offset: true }).optional(),
          liftedBy: z.string().optional(),
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
const FreezeOrderListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^frz_[0-9A-HJKMNP-TV-Z]{26}$/),
              targetType: z.enum(['strategy', 'advisor', 'model']),
              targetId: z.string(),
              reason: z.string(),
              status: z.enum(['active', 'lifted']),
              issuedBy: z.string(),
              issuedAt: z.string().datetime({ offset: true }),
              liftedAt: z.string().datetime({ offset: true }).optional(),
              liftedBy: z.string().optional(),
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
const FreezeOrderCreate = z
  .object({
    targetType: z.enum(['strategy', 'advisor', 'model']),
    targetId: z.string(),
    reason: z.string(),
  })
  .passthrough();
const FreezeOrderResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^frz_[0-9A-HJKMNP-TV-Z]{26}$/),
        targetType: z.enum(['strategy', 'advisor', 'model']),
        targetId: z.string(),
        reason: z.string(),
        status: z.enum(['active', 'lifted']),
        issuedBy: z.string(),
        issuedAt: z.string().datetime({ offset: true }),
        liftedAt: z.string().datetime({ offset: true }).optional(),
        liftedBy: z.string().optional(),
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
  createFreezeOrder_Body,
  FreezeStatus,
  FreezeTargetType,
  Problem,
  FreezeOrderId,
  FreezeOrder,
  FreezeOrderListData,
  ResponseMeta,
  FreezeOrderListResponse,
  FreezeOrderCreate,
  FreezeOrderResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/freezes',
    alias: 'listFreezeOrders',
    requestFormat: 'json',
    parameters: [
      {
        name: 'status',
        type: 'Query',
        schema: z.enum(['active', 'lifted']).optional(),
      },
      {
        name: 'targetType',
        type: 'Query',
        schema: z.enum(['strategy', 'advisor', 'model']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^frz_[0-9A-HJKMNP-TV-Z]{26}$/),
                  targetType: z.enum(['strategy', 'advisor', 'model']),
                  targetId: z.string(),
                  reason: z.string(),
                  status: z.enum(['active', 'lifted']),
                  issuedBy: z.string(),
                  issuedAt: z.string().datetime({ offset: true }),
                  liftedAt: z.string().datetime({ offset: true }).optional(),
                  liftedBy: z.string().optional(),
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
    path: '/v1/freezes',
    alias: 'createFreezeOrder',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createFreezeOrder_Body,
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
            id: z.string().regex(/^frz_[0-9A-HJKMNP-TV-Z]{26}$/),
            targetType: z.enum(['strategy', 'advisor', 'model']),
            targetId: z.string(),
            reason: z.string(),
            status: z.enum(['active', 'lifted']),
            issuedBy: z.string(),
            issuedAt: z.string().datetime({ offset: true }),
            liftedAt: z.string().datetime({ offset: true }).optional(),
            liftedBy: z.string().optional(),
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
    path: '/v1/freezes/:freezeId',
    alias: 'getFreezeOrder',
    requestFormat: 'json',
    parameters: [
      {
        name: 'freezeId',
        type: 'Path',
        schema: z.string().regex(/^frz_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^frz_[0-9A-HJKMNP-TV-Z]{26}$/),
            targetType: z.enum(['strategy', 'advisor', 'model']),
            targetId: z.string(),
            reason: z.string(),
            status: z.enum(['active', 'lifted']),
            issuedBy: z.string(),
            issuedAt: z.string().datetime({ offset: true }),
            liftedAt: z.string().datetime({ offset: true }).optional(),
            liftedBy: z.string().optional(),
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
    path: '/v1/freezes/:freezeId/lift',
    alias: 'liftFreezeOrder',
    requestFormat: 'json',
    parameters: [
      {
        name: 'freezeId',
        type: 'Path',
        schema: z.string().regex(/^frz_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^frz_[0-9A-HJKMNP-TV-Z]{26}$/),
            targetType: z.enum(['strategy', 'advisor', 'model']),
            targetId: z.string(),
            reason: z.string(),
            status: z.enum(['active', 'lifted']),
            issuedBy: z.string(),
            issuedAt: z.string().datetime({ offset: true }),
            liftedAt: z.string().datetime({ offset: true }).optional(),
            liftedBy: z.string().optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
