/**
 * Strategies Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/strategies.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Advisor = components["schemas"]["Advisor"];
export type AdvisorCreate = components["schemas"]["AdvisorCreate"];
export type AdvisorId = components["schemas"]["AdvisorId"];
export type AdvisorListData = components["schemas"]["AdvisorListData"];
export type AdvisorUpdate = components["schemas"]["AdvisorUpdate"];
export type EvidenceStatus = components["schemas"]["EvidenceStatus"];
export type ModelVersion = components["schemas"]["ModelVersion"];
export type ModelVersionCreate = components["schemas"]["ModelVersionCreate"];
export type ModelVersionId = components["schemas"]["ModelVersionId"];
export type ModelVersionListData = components["schemas"]["ModelVersionListData"];
export type Provenance = components["schemas"]["Provenance"];
export type StrategyId = components["schemas"]["StrategyId"];
export type StrategyPackage = components["schemas"]["StrategyPackage"];
export type StrategyPackageCreate = components["schemas"]["StrategyPackageCreate"];
export type StrategyPackageListData = components["schemas"]["StrategyPackageListData"];
export type StrategyPackageUpdate = components["schemas"]["StrategyPackageUpdate"];
export type StrategyStatus = components["schemas"]["StrategyStatus"];
export type Strategy = operations["listStrategies"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateStrategyRequestInput = NonNullable<operations["createStrategy"]["requestBody"]>["content"]["application/json"];
export type UpdateStrategyRequestInput = NonNullable<operations["updateStrategy"]["requestBody"]>["content"]["application/json"];
export type UpdateStrategyRequest = UpdateStrategyRequestInput;
export type CreateModelVersionRequestInput = NonNullable<operations["createModelVersion"]["requestBody"]>["content"]["application/json"];
export type CreateAdvisorRequestInput = NonNullable<operations["createAdvisor"]["requestBody"]>["content"]["application/json"];
export type UpdateAdvisorRequestInput = NonNullable<operations["updateAdvisor"]["requestBody"]>["content"]["application/json"];
export type UpdateAdvisorRequest = UpdateAdvisorRequestInput;


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListStrategiesParams = NonNullable<operations["listStrategies"]["parameters"]["query"]>;
export type GetStrategyParams = operations["getStrategy"]["parameters"]["path"];
export type UpdateStrategyParams = operations["updateStrategy"]["parameters"]["path"];
export type GetModelVersionParams = operations["getModelVersion"]["parameters"]["path"];
export type GetAdvisorParams = operations["getAdvisor"]["parameters"]["path"];
export type UpdateAdvisorParams = operations["updateAdvisor"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListStrategiesResponse = operations["listStrategies"]["responses"]["200"]["content"]["application/json"];
export type CreateStrategyResponse = operations["createStrategy"]["responses"]["201"]["content"]["application/json"];
export type GetStrategyResponse = operations["getStrategy"]["responses"]["200"]["content"]["application/json"];
export type UpdateStrategyResponse = operations["updateStrategy"]["responses"]["200"]["content"]["application/json"];
export type ListModelVersionsResponse = operations["listModelVersions"]["responses"]["200"]["content"]["application/json"];
export type CreateModelVersionResponse = operations["createModelVersion"]["responses"]["201"]["content"]["application/json"];
export type GetModelVersionResponse = operations["getModelVersion"]["responses"]["200"]["content"]["application/json"];
export type ListAdvisorsResponse = operations["listAdvisors"]["responses"]["200"]["content"]["application/json"];
export type CreateAdvisorResponse = operations["createAdvisor"]["responses"]["201"]["content"]["application/json"];
export type GetAdvisorResponse = operations["getAdvisor"]["responses"]["200"]["content"]["application/json"];
export type UpdateAdvisorResponse = operations["updateAdvisor"]["responses"]["200"]["content"]["application/json"];


