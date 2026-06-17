create table if not exists public.customer_profiles (
  id uuid primary key default gen_random_uuid(),
  provider text not null check (provider in ('naver')),
  provider_user_id text not null,
  email text,
  name text,
  nickname text,
  avatar_url text,
  marketing_consent boolean not null default false,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (provider, provider_user_id)
);

alter table public.reservations
  add column if not exists customer_profile_id uuid references public.customer_profiles(id);

create index if not exists reservations_customer_profile_id_idx
  on public.reservations(customer_profile_id);

alter table public.customer_profiles enable row level security;
