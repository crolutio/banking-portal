-- =====================================================================
-- Dedupe Kenya support tickets
-- ---------------------------------------------------------------------
-- The enrich pass (enrich_kenya_depth_banking.sql, section E) added open
-- tickets for clients 02–18 — but those clients ALREADY had equivalent
-- tickets from the original persona seed (which were invisible at the time
-- because RLS hid support_tickets from the anon key). The result is two
-- near-identical open tickets per client.
--
-- This removes the enrich-pass duplicates and keeps the ORIGINAL persona
-- tickets (they cover the same topics and keep their churn keywords, e.g.
-- David's "...closure...", Catherine's "Unhappy with..."). The focus-
-- expansion clients (19–28) only ever had one ticket each, so their tickets
-- (dd11ce19..28) are deliberately NOT touched.
--
-- support_messages.ticket_id → support_tickets(id) is ON DELETE CASCADE, so
-- deleting the tickets also removes their message threads. Idempotent.
-- =====================================================================

delete from support_tickets where id in (
  'dd11ce02-7777-4702-a702-000000000002', -- Otieno (cheque clearing) — KEMSA + USD-wire originals remain
  'dd11ce04-7777-4704-a704-000000000004', -- Joseph (overdraft)
  'dd11ce05-7777-4705-a705-000000000005', -- Aisha (better returns)
  'dd11ce06-7777-4706-a706-000000000006', -- David (close account) — original closure ticket remains
  'dd11ce08-7777-4708-a708-000000000008', -- Mary (travel card)
  'dd11ce09-7777-4709-a709-000000000009', -- Samuel (KYC)
  'dd11ce10-7777-4710-a710-000000000010', -- Faith (loan restructure)
  'dd11ce11-7777-4711-a711-000000000011', -- Daniel (mortgage)
  'dd11ce12-7777-4712-a712-000000000012', -- Esther (second shop)
  'dd11ce13-7777-4713-a713-000000000013', -- Peter Omondi (card declined Kampala — exact dup)
  'dd11ce14-7777-4714-a714-000000000014', -- Lucy (branch wait)
  'dd11ce16-7777-4716-a716-000000000016', -- Cynthia (asset finance)
  'dd11ce17-7777-4717-a717-000000000017', -- Brian (auto loan)
  'dd11ce18-7777-4718-a718-000000000018'  -- Catherine (fees) — original "Unhappy with..." remains
);

-- Verify (per client should now show 1 open ticket, except Wanjiru/Otieno who
-- legitimately have a few distinct ones):
--   select p.full_name, count(*) filter (where t.status in ('open','in_progress')) as open_tickets
--   from profiles p left join support_tickets t on t.user_id = p.id
--   where p.assigned_rm_id = '11ce0003-0003-4003-a003-000000000003'
--   group by p.full_name order by open_tickets desc;
-- =====================================================================
