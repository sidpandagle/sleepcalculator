-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Posts table
create table posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  content text not null default '',
  cover_image text,
  meta_description text not null default '',
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger posts_updated_at
  before update on posts
  for each row execute function update_updated_at();

-- Row Level Security
alter table posts enable row level security;

-- Public can read published posts
create policy "Public can read published posts"
  on posts for select
  using (published = true);

-- Authenticated users (admin) can do everything
create policy "Authenticated users can manage posts"
  on posts for all
  using (auth.role() = 'authenticated');
