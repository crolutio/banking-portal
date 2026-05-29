-- =========================================================================
-- KENYA — CALL CENTER CUSTOMERS SEED
-- Run in the CALL CENTER Supabase SQL Editor (separate Supabase project).
-- Prerequisite: add_market_column_callcenter.sql must be run first.
--
-- Mirrors the banking-DB persona IDs so cross-DB joins by ID work cleanly.
-- =========================================================================

INSERT INTO customers (id, name, email, phone, tier, kyc_status, market)
VALUES
  ('11ce0001-0001-4001-a001-000000000001',
   'Wanjiru Kamau', 'wanjiru.kamau@email.co.ke', '+254712345001',
   'premium', 'verified', 'kenya'),

  ('11ce0002-0002-4002-a002-000000000002',
   'Otieno Ouma',   'otieno.ouma@email.co.ke',   '+254712345002',
   'premium', 'verified', 'kenya')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  email = EXCLUDED.email,
  phone = EXCLUDED.phone,
  tier = EXCLUDED.tier,
  market = EXCLUDED.market;


-- -------------------------------------------------------------------------
-- Verify
-- -------------------------------------------------------------------------
SELECT id, name, tier, market
FROM customers
WHERE market = 'kenya'
ORDER BY name;
