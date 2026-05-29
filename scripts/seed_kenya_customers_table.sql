-- =========================================================================
-- KENYA — BANKING `customers` TABLE SEED
-- Run in the BANKING Supabase SQL Editor.
--
-- The banking DB has a `customers` table (separate from `profiles`) that
-- `accounts.customer_id` FKs to. For each retail customer there is a 1:1
-- row by id in both tables. This seed populates the two Kenyan retail
-- customers in the `customers` table.
--
-- RM/R&C/Admin profiles do NOT belong in `customers` (they are staff,
-- not customers).
--
-- Prerequisite: patch_market_column_customers.sql must be run first.
-- =========================================================================

INSERT INTO customers (id, name, email, phone, market)
VALUES
  ('11ce0001-0001-4001-a001-000000000001',
   'Wanjiru Kamau', 'wanjiru.kamau@email.co.ke', '+254712345001',
   'kenya'),

  ('11ce0002-0002-4002-a002-000000000002',
   'Otieno Ouma',   'otieno.ouma@email.co.ke',   '+254712345002',
   'kenya')
ON CONFLICT (id) DO UPDATE SET
  name   = EXCLUDED.name,
  email  = EXCLUDED.email,
  phone  = EXCLUDED.phone,
  market = EXCLUDED.market;


-- -------------------------------------------------------------------------
-- Verify
-- -------------------------------------------------------------------------
SELECT id, name, email, market
FROM customers
WHERE market = 'kenya'
ORDER BY name;
