/**
 * Profiles Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/profiles.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ClientId = components["schemas"]["ClientId"];
export type ClientProfile = components["schemas"]["ClientProfile"];
export type ClientProfileUpsert = components["schemas"]["ClientProfileUpsert"];
export type PolicyId = components["schemas"]["PolicyId"];
export type ProfileStatus = components["schemas"]["ProfileStatus"];
export type SuitabilityPolicy = components["schemas"]["SuitabilityPolicy"];
export type SuitabilityPolicyListData = components["schemas"]["SuitabilityPolicyListData"];
export type SuitabilityPolicyUpsert = components["schemas"]["SuitabilityPolicyUpsert"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type UpsertClientProfileRequestInput = NonNullable<operations["upsertClientProfile"]["requestBody"]>["content"]["application/json"];
export type CreateSuitabilityPolicyRequestInput = NonNullable<operations["createSuitabilityPolicy"]["requestBody"]>["content"]["application/json"];
export type UpsertSuitabilityPolicyRequestInput = NonNullable<operations["upsertSuitabilityPolicy"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type GetClientProfileParams = operations["getClientProfile"]["parameters"]["path"];
export type UpsertClientProfileParams = operations["upsertClientProfile"]["parameters"]["path"];
export type GetSuitabilityPolicyParams = operations["getSuitabilityPolicy"]["parameters"]["path"];
export type UpsertSuitabilityPolicyParams = operations["upsertSuitabilityPolicy"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type GetClientProfileResponse = operations["getClientProfile"]["responses"]["200"]["content"]["application/json"];
export type UpsertClientProfileResponse = operations["upsertClientProfile"]["responses"]["200"]["content"]["application/json"];
export type ListSuitabilityPoliciesResponse = operations["listSuitabilityPolicies"]["responses"]["200"]["content"]["application/json"];
export type CreateSuitabilityPolicyResponse = operations["createSuitabilityPolicy"]["responses"]["201"]["content"]["application/json"];
export type GetSuitabilityPolicyResponse = operations["getSuitabilityPolicy"]["responses"]["200"]["content"]["application/json"];
export type UpsertSuitabilityPolicyResponse = operations["upsertSuitabilityPolicy"]["responses"]["200"]["content"]["application/json"];


