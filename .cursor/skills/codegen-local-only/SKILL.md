---
name: codegen-local-only
description: >-
  Keep .codegen local-only for Veltara. Use when copying the scaffold, running
  zero-codegen, or when git status shows .codegen changes.
---

# Codegen is local-only (Veltara)

## Hard rule

**Never commit or push `.codegen/` to GitHub.** It is gitignored. Agents must not force-add it.

## How to obtain codegen

1. Copy `.codegen/` from `/Users/nrahal/@code/zero-apps/zero-apps-codegen-scaffold` (or another local scaffold copy) into this repo root.
2. Set `"package_scope": "@veltara"` in `.codegen/.zero-codegen-merged.json` and keep `@veltara` imports in `.codegen/zero-codegen.json`.
3. Run `pnpm codegen:paths` so absolute paths match this checkout.

## Related

- Rule: `.cursor/rules/codegen-never-commit.mdc`
- Pipeline: `ddd-codegen` skill, `docs/CODEGEN.md`
