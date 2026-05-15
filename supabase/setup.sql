-- 1. Create artworks table
create table public.artworks (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    year text,
    medium text,
    description text,
    image_url text,
    "order" integer default 0,
    preview_position_x integer default 50,
    preview_position_y integer default 50,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Grant Data API access
grant select on public.artworks to anon;
grant select, insert, update, delete on public.artworks to authenticated, service_role;

-- 2. Create events table
create table public.events (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    date_string text,
    description text,
    location text,
    link text,
    date_actual timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Grant Data API access
grant select on public.events to anon;
grant select, insert, update, delete on public.events to authenticated, service_role;

-- 3. Create bio table
create table public.bio (
    id uuid default gen_random_uuid() primary key,
    statement text,
    photo_url text,
    exhibitions jsonb default '[]'::jsonb,
    awards jsonb default '[]'::jsonb,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Grant Data API access
grant select on public.bio to anon;
grant select, insert, update, delete on public.bio to authenticated, service_role;

-- 4. Create messages table for CRM
create table public.messages (
    id uuid default gen_random_uuid() primary key,
    name text,
    email text,
    subject text,
    message text,
    status text default 'unread',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Grant Data API access
grant insert on public.messages to anon;
grant select, insert, update, delete on public.messages to authenticated, service_role;

-- 5. Set up Row Level Security (RLS)
-- Artworks
alter table public.artworks enable row level security;
create policy "Allow public read access" on public.artworks for select using (true);
create policy "Allow admin full access" on public.artworks for all using (auth.uid() is not null);

-- Events
alter table public.events enable row level security;
create policy "Allow public read access" on public.events for select using (true);
create policy "Allow admin full access" on public.events for all using (auth.uid() is not null);

-- Bio
alter table public.bio enable row level security;
create policy "Allow public read access" on public.bio for select using (true);
create policy "Allow admin full access" on public.bio for all using (auth.uid() is not null);

-- Messages
alter table public.messages enable row level security;
create policy "Allow admin full access" on public.messages for all using (auth.uid() is not null);
create policy "Allow public insert access" on public.messages for insert with check (auth.role() = 'anon');

-- 6. Storage Buckets
-- Note: You'll need to create these in the Supabase Dashboard UI under "Storage":
-- 'gallery' bucket (Public)
-- 'profile' bucket (Public)
