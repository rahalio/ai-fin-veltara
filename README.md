# Veltara

Suitability-gated AI wealth-advice and strategy marketplace for regulated brokers. Built on the OpenAPI-first DDD codegen scaffold (`@veltara/*`).

Product canon: [PRODUCT.md](./PRODUCT.md) · [WEBAPP.md](./WEBAPP.md) · [USER_STORIES.md](./USER_STORIES.md).

## What you get

| Piece | Location |
|-------|----------|
| `zero-codegen` tool | `.codegen/codegen/` (**local only — never commit**) |
| OpenAPI + Redocly | `packages/openapi-core/` (`common/` + domain YAMLs) |
| Core / services / adapters / api-server | `packages/core`, `platform/*` |
| Web console | `platform/webapp/` |
| Agent skills | `.cursor/skills/` |

Package scope: **`@veltara/*`**.

### `.codegen` is never committed

`.codegen/` is gitignored. After a fresh clone, copy it from `zero-apps-codegen-scaffold`, set `package_scope` to `@veltara`, then run `pnpm codegen:paths`. See `.cursor/skills/codegen-local-only/` and `.cursor/rules/codegen-never-commit.mdc`.

## Layout

```
packages/openapi-core  →  packages/core  →  platform/services  →  platform/adapters  →  platform/api-server
         ↑ OpenAPI source of truth                              ports↑        impl↑              HTTP↑
```

## Quick start

```bash
pnpm install
pnpm lint:openapi && pnpm bundle:openapi
pnpm codegen:paths
pnpm build
pnpm dev:api
# Health: curl http://127.0.0.1:4000/health
# Demo key: X-API-Key: veltara_demo_local_dev_key

# Web console (separate terminal)
pnpm dev:web
# http://127.0.0.1:3000 — login with demo API key
```

Optional Dynamo Local:

```bash
docker compose up -d
TABLE_NAME=veltara-core-local AWS_ENDPOINT_URL=http://localhost:8000 node scripts/ensure-dynamo-table.mjs
```

## Codegen rules (agents)

1. **New domain** → full multi-layer generate once (Mode A).
2. **YAML edit on existing domain** → regenerate **core only**, handwrite below (Mode B).
3. Keep envelopes (`{ data, meta }`), nested DI, and identity middleware intact.

See `.cursor/skills/` and `docs/CODEGEN.md`.

## Local codegen bootstrap

1. Copy `.codegen/` from `zero-apps-codegen-scaffold` into this repo (do not commit it).
2. Confirm `package_scope` is `@veltara` in `.codegen/.zero-codegen-merged.json`.
3. `pnpm codegen:paths` → lint/bundle OpenAPI → Mode A/B as in `docs/CODEGEN.md`.
4. Keep `common/` + `identity`; product domains live under `packages/openapi-core/src/`.
