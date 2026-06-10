-- =====================================================================
-- Make support_tickets / support_messages readable by the demo app
-- ---------------------------------------------------------------------
-- The RM 360 support panel and the portfolio/churn logic read these two
-- tables with the PUBLISHABLE (anon) key — same as accounts/cards/etc.
-- Those other tables are readable by anon, but support_tickets and
-- support_messages have RLS enabled with no public-read policy, so the
-- tickets seeded via the SQL editor (service role) are invisible to the
-- app. This adds a read-only policy so they show up.
--
-- Demo-only: opens SELECT to everyone. Fine for this seeded demo dataset;
-- do NOT copy this pattern to a table holding real customer PII in prod.
-- Idempotent (drop-then-create).
-- =====================================================================

alter table support_tickets  enable row level security;
alter table support_messages enable row level security;

drop policy if exists "demo public read tickets"  on support_tickets;
create policy "demo public read tickets"  on support_tickets  for select using (true);

drop policy if exists "demo public read messages" on support_messages;
create policy "demo public read messages" on support_messages for select using (true);

-- Verify (run as anon afterwards, or just re-run the introspection script):
--   select count(*) from support_tickets where user_id::text like '11ce00%';  -- expect 14
