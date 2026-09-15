/**
 * Freezes Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/freezes.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type FreezeOrder = components["schemas"]["FreezeOrder"];
export type FreezeOrderCreate = components["schemas"]["FreezeOrderCreate"];
export type FreezeOrderId = components["schemas"]["FreezeOrderId"];
export type FreezeOrderListData = components["schemas"]["FreezeOrderListData"];
export type FreezeStatus = components["schemas"]["FreezeStatus"];
export type FreezeTargetType = components["schemas"]["FreezeTargetType"];
export type Freeze = operations["listFreezeOrders"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateFreezeOrderRequestInput = NonNullable<operations["createFreezeOrder"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListFreezeOrdersParams = NonNullable<operations["listFreezeOrders"]["parameters"]["query"]>;
export type GetFreezeOrderParams = operations["getFreezeOrder"]["parameters"]["path"];
export type LiftFreezeOrderParams = operations["liftFreezeOrder"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListFreezeOrdersResponse = operations["listFreezeOrders"]["responses"]["200"]["content"]["application/json"];
export type CreateFreezeOrderResponse = operations["createFreezeOrder"]["responses"]["201"]["content"]["application/json"];
export type GetFreezeOrderResponse = operations["getFreezeOrder"]["responses"]["200"]["content"]["application/json"];
export type LiftFreezeOrderResponse = operations["liftFreezeOrder"]["responses"]["200"]["content"]["application/json"];


