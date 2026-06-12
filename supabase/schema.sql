create table if not exists public.menu_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.menu_items (
  id text primary key,
  category_id uuid references public.menu_categories(id),
  category text,
  type text not null check (type in ('picnic', 'lunchbox', 'catering')),
  name text not null,
  description text not null,
  price integer not null check (price >= 0),
  image_url text,
  minimum_quantity integer not null default 1 check (minimum_quantity > 0),
  is_available boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  reservation_number text not null unique,
  order_type text not null check (order_type in ('picnic', 'lunchbox', 'catering')),
  customer_name text not null,
  customer_phone text not null,
  delivery_address text not null,
  delivery_detail_address text,
  delivery_date date not null,
  delivery_time text not null,
  request_note text,
  payment_method text not null check (payment_method in ('onsite', 'bank_transfer', 'consultation')),
  reservation_status text not null default 'pending' check (reservation_status in ('pending', 'confirmed', 'completed', 'cancelled')),
  payment_status text,
  coupon_code text,
  notification_status text,
  review_status text,
  total_amount integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reservation_items (
  id uuid primary key default gen_random_uuid(),
  reservation_id uuid not null references public.reservations(id) on delete cascade,
  menu_item_id text references public.menu_items(id),
  menu_name_snapshot text not null,
  unit_price_snapshot integer not null,
  quantity integer not null check (quantity > 0),
  line_total integer not null,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid,
  email text not null unique,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  reservation_id uuid not null references public.reservations(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  content text not null,
  display_name text not null,
  approval_status text not null default 'pending',
  created_at timestamptz not null default now()
);

alter table public.menu_categories enable row level security;
alter table public.menu_items enable row level security;
alter table public.reservations enable row level security;
alter table public.reservation_items enable row level security;
alter table public.admin_users enable row level security;
alter table public.reviews enable row level security;

drop policy if exists "Public can read menu categories" on public.menu_categories;
create policy "Public can read menu categories"
  on public.menu_categories
  for select
  using (true);

drop policy if exists "Public can read available menu items" on public.menu_items;
create policy "Public can read available menu items"
  on public.menu_items
  for select
  using (is_available = true);

drop policy if exists "Public can read approved reviews" on public.reviews;
create policy "Public can read approved reviews"
  on public.reviews
  for select
  using (approval_status = 'approved');
