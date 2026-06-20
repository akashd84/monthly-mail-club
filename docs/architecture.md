# Monthly Mail Club - Architecture

## Product Scope

Monthly Mail Club is a workflow-first SaaS for creators who run recurring physical mail clubs.

The MVP should focus on:

- Artist accounts
- Club setup
- Membership plans
- Included items
- Subscribers
- Address collection
- Monthly mail runs
- Label exports
- Fulfillment tracking

Do not build marketplace, social, Stripe Connect, Patreon, Ko-fi, custom domains, or shipping APIs in the initial MVP unless explicitly requested.

---

## Recommended Stack

- Next.js App Router
- TypeScript
- Prisma
- Postgres
- Better Auth
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- Resend
- Cloudflare R2, later
- PostHog, later

---

## Application Structure

Use a single Next.js app for MVP.

```txt
/
  marketing homepage

/login
  artist login

/dashboard
  artist dashboard

/clubs
  list artist clubs

/clubs/new
  create club

/clubs/[clubId]
  club overview

/clubs/[clubId]/plans
  membership plans

/clubs/[clubId]/items
  included items

/clubs/[clubId]/subscribers
  subscriber list

/clubs/[clubId]/subscribers/[subscriberId]
  subscriber detail

/clubs/[clubId]/mail-runs
  mail run list

/clubs/[clubId]/mail-runs/[mailRunId]
  mail run detail

/clubs/[clubId]/exports
  label and CSV exports

/address/[token]
  subscriber address collection/update page

/account
  artist account settings

Suggested Folder Structure
src/
  app/
    (marketing)/
    (auth)/
    (dashboard)/
    address/

  components/
    ui/
    layout/
    clubs/
    plans/
    items/
    subscribers/
    mail-runs/
    exports/

  lib/
    auth/
    db/
    encryption/
    mail-runs/
    labels/
    validation/
    tokens/
    audit/

  server/
    actions/
    queries/
    services/

  types/

Core Architectural Rule

All artist-owned data must be scoped by artist_account_id.

Never query by object ID alone.

Bad:
await prisma.subscriber.findUnique({
  where: { id: subscriberId }
})

Good:
await prisma.subscriber.findFirst({
  where: {
    id: subscriberId,
    club: {
      artistAccountId: currentArtist.id
    }
  }
})

Data Ownership Model

User
↓
Artist Account
↓
Club
↓
Plans / Items / Subscribers / Mail Runs

Subscribers belong to clubs.

Artists can only access subscribers attached to their own clubs.

MVP Domain Model

users
artist_accounts
platform_plans
platform_subscriptions

clubs
club_plans
club_items
club_plan_items

subscribers
subscriptions
subscriber_addresses

mail_runs
mail_run_items

audit_logs

Permission Model
Artist

Can access:

Own artist account
Own clubs
Own subscribers
Own mail runs
Own exports

Cannot access:

Other artists' clubs
Other artists' subscribers
Other artists' exports
Subscriber

Can access:

Address form through secure token only

Cannot access:

Artist dashboard
Other subscriber records
Full club management
Platform Admin

Deferred for MVP.

If added, admin access must be logged.


Security Requirements
Address Encryption

Subscriber address data must be encrypted at the application layer.

Use one encrypted JSON payload field:
subscriber_addresses.encrypted_payload
Encrypted contents:
{
  "recipientName": "Jane Smith",
  "address1": "123 Main St",
  "address2": "Apt 2",
  "city": "Alpharetta",
  "state": "GA",
  "postalCode": "30022",
  "country": "US"
}

Only decrypt:

On subscriber detail view
During mail run generation
During label export
During CSV export
Audit Logs

Create audit logs for:

Address viewed
Address updated
Mail run generated
Label export generated
CSV export generated
Tokens

Subscriber address pages should use secure random tokens.

Token requirements:

Long random value
Expiration date
Single subscriber scope
Revocable

Mail Run Logic

A mail run is generated from:

Active subscribers
Active subscribers
Active subscription
Club plan
Club plan items
Primary address
Generation steps:

Artist selects club and month.
System finds active subscribers.
System finds each subscriber's active subscription.
System resolves the subscriber's plan.
System copies plan/item requirements into the mail run.
System creates one mail_run_item per eligible subscriber.
System calculates required item totals.
System marks mail run as generated.

Mail runs should be lockable.

After locking, changes to plans or subscribers should not change the existing mail run.

Fulfillment Statuses

Mail run item statuses:

pending
packed
shipped
skipped

Mail run statuses:
draft
generated
locked
completed
cancelled

Label Export Architecture

Do not store generated PDFs permanently in MVP.

Generate labels on demand.

Supported MVP exports:

Avery 5160 PDF
Avery 8160 PDF
2x4 thermal PDF
CSV export

Label generation should read decrypted addresses server-side and stream/download the generated file.

All exports must be logged.

Address Validation

MVP can start with manual validation status:

unverified
valid
needs_review
invalid

Later integration options:

Smarty
Lob
Melissa

Do not block MVP on address validation API integration.
CSV Import

CSV import should support common fields:
email
first_name
last_name
plan_name
status
recipient_name
address_1
address_2
city
state
postal_code
country

Import flow:

Upload CSV.
Parse headers.
Preview rows.
Map fields.
Validate basic required fields.
Create subscribers.
Create subscriptions.
Create addresses if present.

Component Structure
Club Components
ClubCard
ClubForm
ClubHeader
ClubEmptyState

Plan Components
PlanCard
PlanForm
PlanItemSelector
PlanIncludedItemsList

Item Components
ClubItemForm
ClubItemList

Subscriber Components
SubscriberTable
SubscriberForm
SubscriberDetailPanel
AddressStatusBadge
SubscriptionStatusBadge

Mail Run Components

MailRunCard
MailRunCreateForm
MailRunSummary
MailRunItemTable
FulfillmentStatusBadge
RequiredItemsSummary

Export Components
ExportFormatSelector
LabelExportButton
CsvExportButton

Server Services

Create service modules for business logic.
lib/mail-runs/generate-mail-run.ts
lib/mail-runs/calculate-required-items.ts
lib/encryption/address-encryption.ts
lib/labels/generate-avery-5160.ts
lib/labels/generate-avery-8160.ts
lib/labels/generate-thermal-labels.ts
lib/audit/log-event.ts
lib/tokens/address-token.ts


Server Actions

Suggested actions:
createClub
updateClub
archiveClub

createClubPlan
updateClubPlan
archiveClubPlan

createClubItem
updateClubItem
archiveClubItem

createSubscriber
updateSubscriber
archiveSubscriber
importSubscribersCsv

createAddressToken
submitSubscriberAddress

generateMailRun
lockMailRun
updateMailRunItemStatus

exportAvery5160
exportAvery8160
exportThermalLabels
exportCsv

Error Handling

Use friendly errors:

Club not found
Subscriber not found
Address missing
Address invalid
Mail run already locked
No active subscribers
No plan assigned

Do not expose internal IDs or stack traces to users.

MVP Build Order
App shell and auth
Prisma schema
Artist account creation
Club CRUD
Plan and item management
Subscriber CRUD
Address collection tokens
Address encryption
Mail run generation
Fulfillment dashboard
Label and CSV exports
Basic audit logs

Deferred Architecture

Do not implement yet, but leave room for:

Stripe Connect

Future tables:
stripe_connected_accounts
stripe_products
stripe_prices
stripe_subscriptions
stripe_webhook_events

Patreon

Future tables:
patreon_accounts
patreon_members
patreon_sync_logs

Ko-fi

Future tables:
kofi_accounts
kofi_webhook_events

Custom Domains

Future tables:
public_domains
domain_verifications

Inventory

Future tables:
inventory_items
inventory_adjustments

Product Rule

Every feature should answer one of these questions:

Who gets mail this month?
What do they get?
Where should it be sent?
Has it been packed?
Has it been shipped?

If a feature does not support one of those questions, defer it.
