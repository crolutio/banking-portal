-- =========================================================================
-- KENYA — PROFILES SEED (Banking DB)
-- Run in the BANKING Supabase SQL Editor.
-- Prerequisite: scripts/add_market_column_banking.sql must be run first.
--
-- Persona UUIDs (referenced by every other Kenya seed script):
--   Wanjiru Kamau    (retail A, Premium):     11ce0001-0001-4001-a001-000000000001
--   Otieno Ouma      (retail B, SME):         11ce0002-0002-4002-a002-000000000002
--   Peter Mwangi     (RM):                    11ce0003-0003-4003-a003-000000000003
--   Grace Wanjiku    (Risk & Compliance):     11ce0004-0004-4004-a004-000000000004
--   Njeri Otieno     (System Administrator):  11ce0005-0005-4005-a005-000000000005
-- =========================================================================


-- -------------------------------------------------------------------------
-- STEP 1 — insert the 5 Kenyan profiles
-- assigned_rm_id is set in STEP 2 after Peter exists (avoids FK confusion).
-- -------------------------------------------------------------------------

INSERT INTO profiles (
  id, email, full_name, phone, role, segment, kyc_status, avatar_url, assigned_rm_id, market
) VALUES
  ('11ce0001-0001-4001-a001-000000000001',
   'wanjiru.kamau@email.co.ke', 'Wanjiru Kamau', '+254712345001',
   'retail_customer', 'Premium', 'Verified',
   '/placeholder.svg?height=40&width=40', NULL, 'kenya'),

  ('11ce0002-0002-4002-a002-000000000002',
   'otieno.ouma@email.co.ke', 'Otieno Ouma', '+254712345002',
   'retail_customer', 'Premium', 'Verified',
   '/placeholder.svg?height=40&width=40', NULL, 'kenya'),

  ('11ce0003-0003-4003-a003-000000000003',
   'peter.mwangi@bank.co.ke', 'Peter Mwangi', '+254712345003',
   'relationship_manager', NULL, 'Verified',
   '/placeholder.svg?height=40&width=40', NULL, 'kenya'),

  ('11ce0004-0004-4004-a004-000000000004',
   'grace.wanjiku@bank.co.ke', 'Grace Wanjiku', '+254712345004',
   'risk_compliance', NULL, 'Verified',
   '/placeholder.svg?height=40&width=40', NULL, 'kenya'),

  ('11ce0005-0005-4005-a005-000000000005',
   'njeri.otieno@bank.co.ke', 'Njeri Otieno', '+254712345005',
   'admin', NULL, 'Verified',
   '/placeholder.svg?height=40&width=40', NULL, 'kenya')

ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  phone = EXCLUDED.phone,
  role = EXCLUDED.role,
  segment = EXCLUDED.segment,
  kyc_status = EXCLUDED.kyc_status,
  market = EXCLUDED.market;


-- -------------------------------------------------------------------------
-- STEP 2 — assign Peter Mwangi as RM for both Kenyan retail clients
-- -------------------------------------------------------------------------

UPDATE profiles
SET assigned_rm_id = '11ce0003-0003-4003-a003-000000000003'
WHERE id IN (
  '11ce0001-0001-4001-a001-000000000001',
  '11ce0002-0002-4002-a002-000000000002'
);


-- -------------------------------------------------------------------------
-- STEP 3 — verify
-- -------------------------------------------------------------------------

SELECT id, full_name, role, segment, market, assigned_rm_id
FROM profiles
WHERE market = 'kenya'
ORDER BY role, full_name;
