import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createStrategy_Body = z
  .object({
    name: z.string().min(1).max(200),
    thesis: z.string().optional(),
    provenance: z.enum(['ai', 'human', 'hybrid']),
    modelVersionId: z
      .string()
      .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    advisorId: z
      .string()
      .regex(/^adv_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    sharpeClaim: z.number().optional(),
    maxDrawdownClaim: z.number().optional(),
    evidenceStatus: z.enum(['unverified', 'verified', 'rejected']).optional(),
  })
  .passthrough();
const updateStrategy_Body = z
  .object({
    name: z.string(),
    thesis: z.string(),
    evidenceStatus: z.enum(['unverified', 'verified', 'rejected']),
    status: z.enum(['draft', 'published', 'frozen', 'retired']),
    sharpeClaim: z.number(),
    maxDrawdownClaim: z.number(),
  })
  .partial()
  .passthrough();
const createModelVersion_Body = z
  .object({
    name: z.string(),
    version: z.string(),
    description: z.string().optional(),
  })
  .passthrough();
const createAdvisor_Body = z
  .object({
    displayName: z.string(),
    licenseAttested: z.boolean(),
    licenseRef: z.string().optional(),
  })
  .passthrough();
const updateAdvisor_Body = z
  .object({
    displayName: z.string(),
    licenseAttested: z.boolean(),
    licenseRef: z.string(),
    status: z.enum(['active', 'suspended', 'retired']),
  })
  .partial()
  .passthrough();
const StrategyStatus = z.enum(['draft', 'published', 'frozen', 'retired']);
const Provenance = z.enum(['ai', 'human', 'hybrid']);
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
const StrategyId = z.string();
const ModelVersionId = z.string();
const AdvisorId = z.string();
const EvidenceStatus = z.enum(['unverified', 'verified', 'rejected']);
const StrategyPackage = z
  .object({
    id: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string().min(1).max(200),
    thesis: z.string().optional(),
    provenance: z.enum(['ai', 'human', 'hybrid']),
    modelVersionId: z
      .string()
      .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    advisorId: z
      .string()
      .regex(/^adv_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    sharpeClaim: z.number().optional(),
    maxDrawdownClaim: z.number().optional(),
    evidenceStatus: z.enum(['unverified', 'verified', 'rejected']),
    status: z.enum(['draft', 'published', 'frozen', 'retired']),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const StrategyPackageListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
          name: z.string().min(1).max(200),
          thesis: z.string().optional(),
          provenance: z.enum(['ai', 'human', 'hybrid']),
          modelVersionId: z
            .string()
            .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          advisorId: z
            .string()
            .regex(/^adv_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          sharpeClaim: z.number().optional(),
          maxDrawdownClaim: z.number().optional(),
          evidenceStatus: z.enum(['unverified', 'verified', 'rejected']),
          status: z.enum(['draft', 'published', 'frozen', 'retired']),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
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
const StrategyPackageListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string().min(1).max(200),
              thesis: z.string().optional(),
              provenance: z.enum(['ai', 'human', 'hybrid']),
              modelVersionId: z
                .string()
                .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              advisorId: z
                .string()
                .regex(/^adv_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              sharpeClaim: z.number().optional(),
              maxDrawdownClaim: z.number().optional(),
              evidenceStatus: z.enum(['unverified', 'verified', 'rejected']),
              status: z.enum(['draft', 'published', 'frozen', 'retired']),
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
const StrategyPackageCreate = z
  .object({
    name: z.string().min(1).max(200),
    thesis: z.string().optional(),
    provenance: z.enum(['ai', 'human', 'hybrid']),
    modelVersionId: z
      .string()
      .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    advisorId: z
      .string()
      .regex(/^adv_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    sharpeClaim: z.number().optional(),
    maxDrawdownClaim: z.number().optional(),
    evidenceStatus: z.enum(['unverified', 'verified', 'rejected']).optional(),
  })
  .passthrough();
const StrategyPackageResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string().min(1).max(200),
        thesis: z.string().optional(),
        provenance: z.enum(['ai', 'human', 'hybrid']),
        modelVersionId: z
          .string()
          .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        advisorId: z
          .string()
          .regex(/^adv_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        sharpeClaim: z.number().optional(),
        maxDrawdownClaim: z.number().optional(),
        evidenceStatus: z.enum(['unverified', 'verified', 'rejected']),
        status: z.enum(['draft', 'published', 'frozen', 'retired']),
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
const StrategyPackageUpdate = z
  .object({
    name: z.string(),
    thesis: z.string(),
    evidenceStatus: z.enum(['unverified', 'verified', 'rejected']),
    status: z.enum(['draft', 'published', 'frozen', 'retired']),
    sharpeClaim: z.number(),
    maxDrawdownClaim: z.number(),
  })
  .partial()
  .passthrough();
const ModelVersion = z
  .object({
    id: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string(),
    version: z.string(),
    description: z.string().optional(),
    status: z.enum(['active', 'retired']),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ModelVersionListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
          name: z.string(),
          version: z.string(),
          description: z.string().optional(),
          status: z.enum(['active', 'retired']),
          createdAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
  })
  .passthrough();
const ModelVersionListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string(),
              version: z.string(),
              description: z.string().optional(),
              status: z.enum(['active', 'retired']),
              createdAt: z.string().datetime({ offset: true }),
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
const ModelVersionCreate = z
  .object({
    name: z.string(),
    version: z.string(),
    description: z.string().optional(),
  })
  .passthrough();
const ModelVersionResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string(),
        version: z.string(),
        description: z.string().optional(),
        status: z.enum(['active', 'retired']),
        createdAt: z.string().datetime({ offset: true }),
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
const Advisor = z
  .object({
    id: z.string().regex(/^adv_[0-9A-HJKMNP-TV-Z]{26}$/),
    displayName: z.string(),
    licenseAttested: z.boolean(),
    licenseRef: z.string().optional(),
    status: z.enum(['active', 'suspended', 'retired']),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const AdvisorListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^adv_[0-9A-HJKMNP-TV-Z]{26}$/),
          displayName: z.string(),
          licenseAttested: z.boolean(),
          licenseRef: z.string().optional(),
          status: z.enum(['active', 'suspended', 'retired']),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
  })
  .passthrough();
const AdvisorListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^adv_[0-9A-HJKMNP-TV-Z]{26}$/),
              displayName: z.string(),
              licenseAttested: z.boolean(),
              licenseRef: z.string().optional(),
              status: z.enum(['active', 'suspended', 'retired']),
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
const AdvisorCreate = z
  .object({
    displayName: z.string(),
    licenseAttested: z.boolean(),
    licenseRef: z.string().optional(),
  })
  .passthrough();
const AdvisorResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^adv_[0-9A-HJKMNP-TV-Z]{26}$/),
        displayName: z.string(),
        licenseAttested: z.boolean(),
        licenseRef: z.string().optional(),
        status: z.enum(['active', 'suspended', 'retired']),
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
const AdvisorUpdate = z
  .object({
    displayName: z.string(),
    licenseAttested: z.boolean(),
    licenseRef: z.string(),
    status: z.enum(['active', 'suspended', 'retired']),
  })
  .partial()
  .passthrough();

export const schemas: any = {
  createStrategy_Body,
  updateStrategy_Body,
  createModelVersion_Body,
  createAdvisor_Body,
  updateAdvisor_Body,
  StrategyStatus,
  Provenance,
  Problem,
  StrategyId,
  ModelVersionId,
  AdvisorId,
  EvidenceStatus,
  StrategyPackage,
  StrategyPackageListData,
  ResponseMeta,
  StrategyPackageListResponse,
  StrategyPackageCreate,
  StrategyPackageResponse,
  StrategyPackageUpdate,
  ModelVersion,
  ModelVersionListData,
  ModelVersionListResponse,
  ModelVersionCreate,
  ModelVersionResponse,
  Advisor,
  AdvisorListData,
  AdvisorListResponse,
  AdvisorCreate,
  AdvisorResponse,
  AdvisorUpdate,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/advisors',
    alias: 'listAdvisors',
    requestFormat: 'json',
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^adv_[0-9A-HJKMNP-TV-Z]{26}$/),
                  displayName: z.string(),
                  licenseAttested: z.boolean(),
                  licenseRef: z.string().optional(),
                  status: z.enum(['active', 'suspended', 'retired']),
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
    path: '/v1/advisors',
    alias: 'createAdvisor',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createAdvisor_Body,
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
            id: z.string().regex(/^adv_[0-9A-HJKMNP-TV-Z]{26}$/),
            displayName: z.string(),
            licenseAttested: z.boolean(),
            licenseRef: z.string().optional(),
            status: z.enum(['active', 'suspended', 'retired']),
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
    path: '/v1/advisors/:advisorId',
    alias: 'getAdvisor',
    requestFormat: 'json',
    parameters: [
      {
        name: 'advisorId',
        type: 'Path',
        schema: z.string().regex(/^adv_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^adv_[0-9A-HJKMNP-TV-Z]{26}$/),
            displayName: z.string(),
            licenseAttested: z.boolean(),
            licenseRef: z.string().optional(),
            status: z.enum(['active', 'suspended', 'retired']),
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
    method: 'patch',
    path: '/v1/advisors/:advisorId',
    alias: 'updateAdvisor',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: updateAdvisor_Body,
      },
      {
        name: 'advisorId',
        type: 'Path',
        schema: z.string().regex(/^adv_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^adv_[0-9A-HJKMNP-TV-Z]{26}$/),
            displayName: z.string(),
            licenseAttested: z.boolean(),
            licenseRef: z.string().optional(),
            status: z.enum(['active', 'suspended', 'retired']),
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
  {
    method: 'get',
    path: '/v1/model-versions',
    alias: 'listModelVersions',
    requestFormat: 'json',
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string(),
                  version: z.string(),
                  description: z.string().optional(),
                  status: z.enum(['active', 'retired']),
                  createdAt: z.string().datetime({ offset: true }),
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
    path: '/v1/model-versions',
    alias: 'createModelVersion',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createModelVersion_Body,
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
            id: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string(),
            version: z.string(),
            description: z.string().optional(),
            status: z.enum(['active', 'retired']),
            createdAt: z.string().datetime({ offset: true }),
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
    path: '/v1/model-versions/:modelVersionId',
    alias: 'getModelVersion',
    requestFormat: 'json',
    parameters: [
      {
        name: 'modelVersionId',
        type: 'Path',
        schema: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string(),
            version: z.string(),
            description: z.string().optional(),
            status: z.enum(['active', 'retired']),
            createdAt: z.string().datetime({ offset: true }),
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
    method: 'get',
    path: '/v1/strategies',
    alias: 'listStrategies',
    requestFormat: 'json',
    parameters: [
      {
        name: 'status',
        type: 'Query',
        schema: z.enum(['draft', 'published', 'frozen', 'retired']).optional(),
      },
      {
        name: 'provenance',
        type: 'Query',
        schema: z.enum(['ai', 'human', 'hybrid']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string().min(1).max(200),
                  thesis: z.string().optional(),
                  provenance: z.enum(['ai', 'human', 'hybrid']),
                  modelVersionId: z
                    .string()
                    .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  advisorId: z
                    .string()
                    .regex(/^adv_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  sharpeClaim: z.number().optional(),
                  maxDrawdownClaim: z.number().optional(),
                  evidenceStatus: z.enum([
                    'unverified',
                    'verified',
                    'rejected',
                  ]),
                  status: z.enum(['draft', 'published', 'frozen', 'retired']),
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
    path: '/v1/strategies',
    alias: 'createStrategy',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createStrategy_Body,
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
            id: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            thesis: z.string().optional(),
            provenance: z.enum(['ai', 'human', 'hybrid']),
            modelVersionId: z
              .string()
              .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            advisorId: z
              .string()
              .regex(/^adv_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            sharpeClaim: z.number().optional(),
            maxDrawdownClaim: z.number().optional(),
            evidenceStatus: z.enum(['unverified', 'verified', 'rejected']),
            status: z.enum(['draft', 'published', 'frozen', 'retired']),
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
    path: '/v1/strategies/:strategyId',
    alias: 'getStrategy',
    requestFormat: 'json',
    parameters: [
      {
        name: 'strategyId',
        type: 'Path',
        schema: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            thesis: z.string().optional(),
            provenance: z.enum(['ai', 'human', 'hybrid']),
            modelVersionId: z
              .string()
              .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            advisorId: z
              .string()
              .regex(/^adv_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            sharpeClaim: z.number().optional(),
            maxDrawdownClaim: z.number().optional(),
            evidenceStatus: z.enum(['unverified', 'verified', 'rejected']),
            status: z.enum(['draft', 'published', 'frozen', 'retired']),
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
    method: 'patch',
    path: '/v1/strategies/:strategyId',
    alias: 'updateStrategy',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: updateStrategy_Body,
      },
      {
        name: 'strategyId',
        type: 'Path',
        schema: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            thesis: z.string().optional(),
            provenance: z.enum(['ai', 'human', 'hybrid']),
            modelVersionId: z
              .string()
              .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            advisorId: z
              .string()
              .regex(/^adv_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            sharpeClaim: z.number().optional(),
            maxDrawdownClaim: z.number().optional(),
            evidenceStatus: z.enum(['unverified', 'verified', 'rejected']),
            status: z.enum(['draft', 'published', 'frozen', 'retired']),
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
