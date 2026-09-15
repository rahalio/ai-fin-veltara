/**
 * Gates Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/gates.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type GateDecision = components["schemas"]["GateDecision"];
export type GateDecisionCreate = components["schemas"]["GateDecisionCreate"];
export type GateDecisionId = components["schemas"]["GateDecisionId"];
export type GateDecisionListData = components["schemas"]["GateDecisionListData"];
export type GateOutcome = components["schemas"]["GateOutcome"];
export type RecommendationId = components["schemas"]["RecommendationId"];
export type Gate = operations["listGateDecisions"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type DecideRecommendationGateRequestInput = NonNullable<operations["decideRecommendationGate"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListGateDecisionsParams = NonNullable<operations["listGateDecisions"]["parameters"]["query"]>;
export type DecideRecommendationGateParams = operations["decideRecommendationGate"]["parameters"]["path"];
export type GetGateDecisionParams = operations["getGateDecision"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListGateDecisionsResponse = operations["listGateDecisions"]["responses"]["200"]["content"]["application/json"];
export type DecideRecommendationGateResponse = operations["decideRecommendationGate"]["responses"]["201"]["content"]["application/json"];
export type GetGateDecisionResponse = operations["getGateDecision"]["responses"]["200"]["content"]["application/json"];


