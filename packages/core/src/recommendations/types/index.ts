/**
 * Recommendations Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/recommendations.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ClientId = components["schemas"]["ClientId"];
export type Recommendation = components["schemas"]["Recommendation"];
export type RecommendationCreate = components["schemas"]["RecommendationCreate"];
export type RecommendationId = components["schemas"]["RecommendationId"];
export type RecommendationListData = components["schemas"]["RecommendationListData"];
export type RecommendationStatus = components["schemas"]["RecommendationStatus"];
export type RiskParameterSet = components["schemas"]["RiskParameterSet"];
export type RiskParameterSetId = components["schemas"]["RiskParameterSetId"];
export type RiskParameterSetUpsert = components["schemas"]["RiskParameterSetUpsert"];
export type StrategyId = components["schemas"]["StrategyId"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateClientRecommendationRequestInput = NonNullable<operations["createClientRecommendation"]["requestBody"]>["content"]["application/json"];
export type UpsertRecommendationRiskParametersRequestInput = NonNullable<operations["upsertRecommendationRiskParameters"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListClientRecommendationsParams = NonNullable<operations["listClientRecommendations"]["parameters"]["query"]>;
export type CreateClientRecommendationParams = operations["createClientRecommendation"]["parameters"]["path"];
export type GetRecommendationParams = operations["getRecommendation"]["parameters"]["path"];
export type GetRecommendationRiskParametersParams = operations["getRecommendationRiskParameters"]["parameters"]["path"];
export type UpsertRecommendationRiskParametersParams = operations["upsertRecommendationRiskParameters"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListClientRecommendationsResponse = operations["listClientRecommendations"]["responses"]["200"]["content"]["application/json"];
export type CreateClientRecommendationResponse = operations["createClientRecommendation"]["responses"]["201"]["content"]["application/json"];
export type GetRecommendationResponse = operations["getRecommendation"]["responses"]["200"]["content"]["application/json"];
export type GetRecommendationRiskParametersResponse = operations["getRecommendationRiskParameters"]["responses"]["200"]["content"]["application/json"];
export type UpsertRecommendationRiskParametersResponse = operations["upsertRecommendationRiskParameters"]["responses"]["200"]["content"]["application/json"];


