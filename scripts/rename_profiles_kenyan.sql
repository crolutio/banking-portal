-- =========================================================================
-- RENAME PROFILES TO KENYAN NAMES (Banking DB)
-- Run in Banking Supabase SQL Editor
-- =========================================================================

-- Retail customer 1: Sarah Chen → Amina Odhiambo
UPDATE profiles
SET full_name = 'Amina Odhiambo',
    email = 'amina.odhiambo@email.com'
WHERE id = '4e140685-8f38-49ff-aae0-d6109c46873d';

-- Retail customer 2: Mohammed Ali → Brian Kariuki
UPDATE profiles
SET full_name = 'Brian Kariuki',
    email = 'brian.kariuki@email.com'
WHERE id = '22222222-2222-2222-2222-222222222222';

-- RM: James Rodriguez → Peter Mwangi
UPDATE profiles
SET full_name = 'Peter Mwangi',
    email = 'peter.rm@bank.com'
WHERE id = '51880b1d-3935-49dd-bac6-9469d33d3ee3';

-- Risk: David Kim → Grace Wanjiku
UPDATE profiles
SET full_name = 'Grace Wanjiku',
    email = 'grace.risk@bank.com'
WHERE id = '2be06428-7933-41f5-a426-f27478e75c1c';

-- Verify
SELECT id, full_name, email, role FROM profiles
WHERE id IN (
  '4e140685-8f38-49ff-aae0-d6109c46873d',
  '22222222-2222-2222-2222-222222222222',
  '51880b1d-3935-49dd-bac6-9469d33d3ee3',
  '2be06428-7933-41f5-a426-f27478e75c1c'
);
