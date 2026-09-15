# Codegen guide

## Local tool (never commit)

`.codegen/` is **gitignored** and must never be pushed to GitHub. Obtain it by copying from `zero-apps-codegen-scaffold`, set `"package_scope": "@veltara"`, then run `pnpm codegen:paths`. See `.cursor/skills/codegen-local-only/`.

## Modes

| Mode | When | Action |
|------|------|--------|
| **A — New domain** | First time a domain YAML has no layers | Full multi-layer `generate --domain X` |
| **B — YAML edit** | Domain already scaffolded | Bundle → `--layers core` → handwrite platform |

## Commands

```bash
pnpm codegen:paths
pnpm lint:openapi
pnpm bundle:openapi
pnpm codegen:core
pnpm codegen:identity   # full identity scaffold (starter)
```

Config: `.codegen/.zero-codegen-merged.json`  
Tool: `PYTHONPATH=.codegen/codegen/src python3 -m zero_codegen.cli.main`

## OpenAPI sample shape

- `packages/openapi-core/src/common/` — envelopes, problem, security, parameters, primitives
- `packages/openapi-core/src/identity.yaml` — live sample domain
- `.codegen/openapi-examples/` — teaching specs (not wired to Redocly)

## Shared vs product

| Shared (keep) | Product (add in consumer) |
|---------------|---------------------------|
| `_shared` dirs, middleware, messaging | Domain YAML + generated trees |
| Identity domain | Invoice / orders / … domains |
| Envelope + Problem contracts | Domain-specific schemas |

## Related skills

- `ddd-platform` — architecture & anti-drift
- `ddd-codegen` — pipeline commands
- `ddd-identity` — auth blueprint
