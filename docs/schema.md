# Monthly Mail Club - Data Model

## Users

Represents authenticated platform users.

users

* id
* email
* name
* created_at
* updated_at

## Artist Accounts

artist_accounts

* id
* user_id
* display_name
* public_slug
* bio
* created_at
* updated_at

## Platform Plans

platform_plans

* id
* name
* slug
* monthly_price_cents
* annual_price_cents
* is_public
* is_active

## Platform Subscriptions

platform_subscriptions

* id
* artist_account_id
* platform_plan_id
* status
* started_at
* cancelled_at

## Clubs

clubs

* id
* artist_account_id
* name
* description
* status
* created_at
* updated_at

## Club Plans

club_plans

* id
* club_id
* name
* description
* price_cents
* is_active
* sort_order

## Club Items

club_items

* id
* club_id
* name
* item_type
* is_active

Examples:

* Sticker
* ACEO
* Postcard
* Original ACEO

## Club Plan Items

club_plan_items

* id
* club_plan_id
* club_item_id
* quantity

Defines what each plan includes.

## Subscribers

subscribers

* id
* club_id
* email
* first_name
* last_name
* status
* joined_at
* archived_at

## Subscriptions

subscriptions

* id
* subscriber_id
* club_plan_id
* status
* started_at
* ended_at

## Subscriber Addresses

subscriber_addresses

* id
* subscriber_id
* encrypted_payload
* validation_status
* validated_at
* created_at
* updated_at

Encrypted payload contains:

* recipient_name
* address_1
* address_2
* city
* state
* postal_code
* country

## Mail Runs

mail_runs

* id
* club_id
* name
* month
* status
* generated_at
* locked_at

## Mail Run Items

mail_run_items

* id
* mail_run_id
* subscriber_id
* subscription_id
* club_plan_id
* status
* packed_at
* shipped_at

## Audit Logs

audit_logs

* id
* actor_user_id
* artist_account_id
* action
* object_type
* object_id
* metadata
* created_at

## Future Tables

Not part of MVP:

* stripe_accounts
* stripe_customers
* stripe_subscriptions
* patreon_accounts
* kofi_accounts
* inventory_items
* shipments
* custom_domains
