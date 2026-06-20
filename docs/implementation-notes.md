# Implementation Notes

## Built

- Next.js App Router project foundation with TypeScript and Tailwind CSS.
- Prisma schema for the MVP domain model, including tenant-aware relationships and indexes.
- Development auth/session scaffold that creates a demo artist account and keeps the app ready for Better Auth.
- Club CRUD foundation: create, list, edit, and archive clubs.
- Plan and included item management, including assigning item quantities to plans.
- Subscriber management: list, manual add, archive, and initial plan assignment.
- Address collection page at `/address/[token]` with token hashing placeholders and encrypted address storage.
- AES-256-GCM address encryption helper using a single encrypted JSON payload field.
- Mail run generation domain service with plan snapshots and required item count summaries.
- Fulfillment dashboard with per-item status changes.
- Audit logging helper and audit events for address updates, mail run generation, exports, and fulfillment status changes.
- CSV export service for mail runs.
- PDF label export stubs for Avery 5160, Avery 8160, and 2x4 thermal labels.

## Stubbed or intentionally minimal

- Better Auth is not fully wired because provider secrets, production URLs, and email delivery configuration are environment-specific.
- CSV import has a visible placeholder on the subscriber page but no parser yet.
- PDF label generation has service stubs only.
- Address token creation exists as helpers and schema, but no artist UI for generating/sending links is built yet.
- Address validation status is modeled but no third-party validation API is integrated.

## Migration note

Added `subscriber_address_tokens` to support secure subscriber address forms. The original MVP schema did not include token persistence, but `/address/[token]` needs a durable hash, expiration, and usage tracking to avoid storing raw tokens.
