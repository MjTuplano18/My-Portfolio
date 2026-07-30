-- Run this in your Supabase SQL Editor to create all required tables

-- Profile (single row)
create table if not exists profile (
  id integer primary key default 1,
  name text,
  location text,
  tagline text,
  email text,
  phone text,
  github text,
  linkedin text,
  facebook text,
  instagram text,
  image text,
  initials text
);

-- About paragraphs
create table if not exists about_paragraphs (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  sort_order integer default 0
);

-- Experience
create table if not exists experience (
  id text primary key,
  role text not null,
  organization text not null,
  period text,
  type text default 'work',
  description text,
  sort_order integer default 0
);

-- Tech Stack
create table if not exists tech_stack (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  skill text not null,
  sort_order integer default 0
);

-- Projects
create table if not exists projects (
  id text primary key,
  title text not null,
  description text,
  url text,
  domain text,
  sort_order integer default 0
);

-- Certifications
create table if not exists certifications (
  id text primary key,
  title text not null,
  issuer text,
  date text,
  url text,
  image text,
  sort_order integer default 0
);

-- Testimonials / Recommendations
create table if not exists testimonials (
  id text primary key,
  quote text not null,
  name text not null,
  title text,
  image text,
  sort_order integer default 0
);

-- Memberships
create table if not exists memberships (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  url text,
  sort_order integer default 0
);

-- Gallery
create table if not exists gallery (
  id uuid primary key default gen_random_uuid(),
  src text not null,
  alt text,
  sort_order integer default 0
);

-- Social Links
create table if not exists social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  url text not null,
  aria_label text,
  sort_order integer default 0
);

-- Enable Row Level Security and allow public reads on all tables
alter table profile enable row level security;
alter table about_paragraphs enable row level security;
alter table experience enable row level security;
alter table tech_stack enable row level security;
alter table projects enable row level security;
alter table certifications enable row level security;
alter table testimonials enable row level security;
alter table memberships enable row level security;
alter table gallery enable row level security;
alter table social_links enable row level security;

-- Public read access
create policy "Public read profile" on profile for select using (true);
create policy "Public read about" on about_paragraphs for select using (true);
create policy "Public read experience" on experience for select using (true);
create policy "Public read tech_stack" on tech_stack for select using (true);
create policy "Public read projects" on projects for select using (true);
create policy "Public read certifications" on certifications for select using (true);
create policy "Public read testimonials" on testimonials for select using (true);
create policy "Public read memberships" on memberships for select using (true);
create policy "Public read gallery" on gallery for select using (true);
create policy "Public read social_links" on social_links for select using (true);

-- Allow all writes via anon key (admin panel uses this)
create policy "Anon write profile" on profile for all using (true) with check (true);
create policy "Anon write about" on about_paragraphs for all using (true) with check (true);
create policy "Anon write experience" on experience for all using (true) with check (true);
create policy "Anon write tech_stack" on tech_stack for all using (true) with check (true);
create policy "Anon write projects" on projects for all using (true) with check (true);
create policy "Anon write certifications" on certifications for all using (true) with check (true);
create policy "Anon write testimonials" on testimonials for all using (true) with check (true);
create policy "Anon write memberships" on memberships for all using (true) with check (true);
create policy "Anon write gallery" on gallery for all using (true) with check (true);
create policy "Anon write social_links" on social_links for all using (true) with check (true);
