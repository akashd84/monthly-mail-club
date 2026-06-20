# Monthly Mail Club - MVP Specification

## MVP Goal

Allow a creator to manage subscribers, collect addresses, generate a monthly mail run, and print labels without using spreadsheets.

## Success Criteria

A creator can:

1. Create a club
2. Create membership plans
3. Import subscribers
4. Collect subscriber addresses
5. Generate a monthly mail run
6. Export labels
7. Track fulfillment status

## User Roles

### Artist

Can:

* Create clubs
* Create plans
* Manage subscribers
* Generate mail runs
* Export labels

### Subscriber

Can:

* Submit address
* Update address
* View subscription information

## Core Features

### Authentication

Artist:

* Magic link login
* Email/password optional later

Subscriber:

* Secure tokenized address forms

### Club Management

Artists can:

* Create clubs
* Edit clubs
* Archive clubs

Examples:

* Bird Mail Club
* Watercolor Club
* Sticker Club

### Membership Plans

Artists can create plans such as:

Basic:

* Sticker

Premium:

* Sticker
* ACEO

Collector:

* Sticker
* ACEO
* Original Artwork

Plans define fulfillment requirements.

### Club Items

Artists can define items included in plans.

Examples:

* Sticker
* ACEO Print
* Original ACEO
* Bookmark
* Postcard

### Subscriber Management

Artists can:

* Add subscriber
* Import CSV
* Edit subscriber
* Archive subscriber

### Address Collection

Subscribers can:

* Enter address
* Update address

System should support:

* Address validation
* Address completeness checks

### Monthly Mail Runs

Artists can:

* Create mail run
* Generate mail run
* Lock mail run

System calculates:

* Active subscribers
* Required items
* Fulfillment counts

### Fulfillment Tracking

Per subscriber:

* Pending
* Packed
* Shipped

### Label Generation

Support:

* Avery 5160 PDF
* Avery 8160 PDF
* 2x4 thermal PDF
* CSV export

## Security Requirements

* Tenant isolation
* Encrypted address storage
* Audit logs for exports
* Secure tokenized subscriber forms

## Deferred Features

* Stripe Connect
* Patreon integration
* Ko-fi integration
* Marketplace
* Custom domains
* Inventory tracking
* Shipping APIs
* Analytics
