# Picnic MVP Design

Date: 2026-06-12
Status: Approved for implementation planning

## Goal

Picnic is a cafe-style lunchbox delivery and catering reservation website.

The first MVP should prove the core business flow: customers can browse lunchbox or catering menus, submit a reservation request, and an operator can review and manage that reservation. The system should stay simple for launch while leaving clear extension points for Naver login, NPay or other payment providers, Solapi coupon messages, and verified customer reviews.

## Scope

### In Scope For MVP

- Public cafe/order website.
- Lunchbox and catering menu browsing.
- Guest reservation flow.
- Reservation form with customer name, phone, delivery address, date, time, request notes, selected menu items, quantities, and payment method.
- Payment method selection without live payment:
  - On-site payment.
  - Bank transfer guidance.
  - Consultation before confirmation.
- Reservation completion page with a receipt or reservation number.
- Admin reservation list.
- Admin reservation detail page.
- Admin status changes:
  - Pending.
  - Confirmed.
  - Completed.
  - Cancelled.
- Supabase-backed data persistence.
- Environment variable placeholders for future Naver, payment, and Solapi integration.

### Out Of Scope For MVP

- Live Naver OAuth login.
- NPay or PG payment processing.
- Solapi coupon issuing or SMS sending.
- Customer review submission.
- Automatic marketing campaigns.
- Refund, cancellation fee, or settlement workflows.

These features should be documented as future integrations, not exposed as broken UI in the MVP.

## Recommended Architecture

Use Next.js App Router with Supabase.

Next.js responsibilities:

- Public pages:
  - `/`
  - `/menu`
  - `/reserve`
  - `/reserve/complete`
- Admin pages:
  - `/admin`
  - `/admin/reservations/[id]`
- Server-side reservation creation.
- Server-side admin reservation updates.
- Form validation and user-facing error states.

Supabase responsibilities:

- Store menu categories and menu items.
- Store reservations and reservation line items.
- Store admin user records or connect to Supabase Auth.
- Provide future tables or columns for reviews, payment status, coupons, and marketing messages.

Security boundary:

- Public clients may read only public menu data.
- Reservation creation should go through server-side code or carefully scoped Supabase policies.
- Admin reservation updates must be server-side protected.
- Supabase service role keys must never be exposed to the browser.
- Real provider secrets must not be committed.

## Pages

### Public Pages

`/`

- Brand introduction.
- Lunchbox and catering positioning.
- Primary CTA to reserve.
- Secondary CTA to view menus.
- A review or social-proof area may exist as a static section, but no customer review form is included in MVP.

`/menu`

- Shows lunchbox and catering menu items.
- Supports category filtering.
- Displays price, description, minimum order quantity, and availability.

`/reserve`

- Lets the customer choose lunchbox or catering.
- Lets the customer choose menu items and quantities.
- Collects delivery date, time, address, name, phone, and request notes.
- Lets the customer choose one payment method:
  - On-site payment.
  - Bank transfer guidance.
  - Consultation before confirmation.
- Submits the reservation.

`/reserve/complete`

- Shows successful reservation receipt.
- Shows reservation number.
- Explains that the operator will confirm the reservation.

### Admin Pages

`/admin`

- Lists reservations.
- Filters by status.
- Shows date, customer name, phone, order type, total amount, and status.

`/admin/reservations/[id]`

- Shows reservation detail.
- Shows selected menus, quantities, delivery address, requested time, request notes, and payment method.
- Lets the admin change status to pending, confirmed, completed, or cancelled.

## Data Model

### `menu_categories`

- `id`
- `name`
- `slug`
- `sort_order`
- `created_at`

### `menu_items`

- `id`
- `category_id`
- `type`: `lunchbox` or `catering`
- `name`
- `description`
- `price`
- `image_url`
- `minimum_quantity`
- `is_available`
- `sort_order`
- `created_at`
- `updated_at`

### `reservations`

- `id`
- `reservation_number`
- `order_type`: `lunchbox` or `catering`
- `customer_name`
- `customer_phone`
- `delivery_address`
- `delivery_detail_address`
- `delivery_date`
- `delivery_time`
- `request_note`
- `payment_method`: `onsite`, `bank_transfer`, or `consultation`
- `reservation_status`: `pending`, `confirmed`, `completed`, or `cancelled`
- `payment_status`: nullable extension field for later live payment
- `coupon_code`: nullable extension field for later coupon integration
- `notification_status`: nullable extension field for later Solapi integration
- `review_status`: nullable extension field for later verified reviews
- `total_amount`
- `created_at`
- `updated_at`

### `reservation_items`

- `id`
- `reservation_id`
- `menu_item_id`
- `menu_name_snapshot`
- `unit_price_snapshot`
- `quantity`
- `line_total`
- `created_at`

### `admin_users`

- `id`
- `auth_user_id`
- `email`
- `role`
- `created_at`

The MVP may start with simple admin protection during development, but production should use Supabase Auth and server-side authorization checks.

### `reviews`

Designed for later use, not implemented in MVP.

- `id`
- `reservation_id`
- `rating`
- `content`
- `display_name`
- `approval_status`
- `created_at`

Only completed reservations should be eligible for review when this feature is implemented.

## Future Integrations

### Naver Login

The MVP should not expose a non-working Naver login button. Add environment placeholders and code boundaries so actual OAuth can be added later.

Future required values:

- `NAVER_CLIENT_ID`
- `NAVER_CLIENT_SECRET`
- `NAVER_REDIRECT_URI`

### Payment And NPay

The MVP does not process money. Payment status should be separate from reservation status so future payment integration can be added without rewriting reservations.

Future required values depend on the selected provider.

### Solapi Coupon Messages

The MVP should leave `coupon_code` and `notification_status` fields ready for later marketing automation.

Future required values:

- `SOLAPI_API_KEY`
- `SOLAPI_API_SECRET`
- `SOLAPI_SENDER`

Marketing messages should require consent before production use.

### Reviews

Reviews should later be tied to completed reservations. Anonymous public review posting is not recommended because it weakens trust and invites spam.

## Validation Plan

### Customer Flow

- Home page loads.
- Menu page loads and shows lunchbox/catering items.
- Reservation form shows validation errors when required fields are missing.
- Valid reservation submits successfully.
- Reservation is stored in Supabase.
- Completion page displays a reservation number.

### Admin Flow

- Admin reservation list loads.
- Status filters work.
- Reservation detail shows selected menu items, quantities, address, request notes, and payment method.
- Admin can change reservation status.
- Status change is saved in Supabase.

### Security And Operations

- No real secrets are committed.
- `.env.example` lists required variable names only.
- Supabase service role key is used only server-side.
- Admin pages are separated from public customer pages.
- Future Naver, payment, and Solapi work is documented as required integration work.

### Responsive QA

Use browser or gstack verification after implementation.

Minimum viewports:

- Mobile portrait.
- Mobile landscape or narrow tablet.
- Desktop or wide screen.

Check for:

- Text overlap.
- Button clipping.
- Form usability.
- Excessive empty space.
- Broken visual hierarchy.
- Console errors.

## Implementation Notes

- Start from a small Next.js app, not a full commerce platform.
- Prefer simple server-side reservation actions over speculative abstractions.
- Do not build unused live integration UI.
- Seed a small set of realistic menu items so the MVP can be reviewed visually.
- Keep admin tools utilitarian and dense enough for repeated operational use.
