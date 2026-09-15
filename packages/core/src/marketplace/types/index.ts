/**
 * Marketplace Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/marketplace.openapi.types";

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
export type ContractStatus = components["schemas"]["ContractStatus"];
export type MarketplaceContract = components["schemas"]["MarketplaceContract"];
export type MarketplaceContractCreate = components["schemas"]["MarketplaceContractCreate"];
export type MarketplaceContractId = components["schemas"]["MarketplaceContractId"];
export type MarketplaceContractListData = components["schemas"]["MarketplaceContractListData"];
export type StrategyId = components["schemas"]["StrategyId"];
export type Contract = operations["listMarketplaceContracts"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateMarketplaceContractRequestInput = NonNullable<operations["createMarketplaceContract"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListMarketplaceContractsParams = NonNullable<operations["listMarketplaceContracts"]["parameters"]["query"]>;
export type GetMarketplaceContractParams = operations["getMarketplaceContract"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListMarketplaceContractsResponse = operations["listMarketplaceContracts"]["responses"]["200"]["content"]["application/json"];
export type CreateMarketplaceContractResponse = operations["createMarketplaceContract"]["responses"]["201"]["content"]["application/json"];
export type GetMarketplaceContractResponse = operations["getMarketplaceContract"]["responses"]["200"]["content"]["application/json"];


