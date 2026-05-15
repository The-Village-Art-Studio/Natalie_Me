-- Explicitly grant Data API access to the artworks table
grant select on public.artworks to anon;
grant select, insert, update, delete on public.artworks to authenticated, service_role;

-- Explicitly grant Data API access to the events table
grant select on public.events to anon;
grant select, insert, update, delete on public.events to authenticated, service_role;

-- Explicitly grant Data API access to the bio table
grant select on public.bio to anon;
grant select, insert, update, delete on public.bio to authenticated, service_role;

-- Explicitly grant Data API access to the messages table
grant insert on public.messages to anon;
grant select, insert, update, delete on public.messages to authenticated, service_role;
