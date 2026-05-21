-- =========================================================================
-- REVERT PROFILES BACK TO UAE NAMES
-- Inverse of `rename_profiles_kenyan.sql` + `rename_cards_kenyan.sql`
-- + `rename_callcenter_kenyan.sql`.
--
-- The RM relationship (profiles.assigned_rm_id) is already correct — these
-- profiles are already assigned to James Rodriguez. Only the display fields
-- (full_name, email, cardholder_name) and the call-center customer rows
-- need flipping back so the UI labels match the frontend.
--
-- Run STEP 1 in the BANKING Supabase SQL Editor.
-- Run STEP 2 in the CALL CENTER Supabase SQL Editor.
-- =========================================================================


-- =========================================================================
-- STEP 1 — BANKING DB
-- =========================================================================

-- Retail customer 1: Amina Odhiambo → Sarah Chen
UPDATE profiles
SET full_name = 'Sarah Chen',
    email = 'sarah.chen@example.com'
WHERE id = '4e140685-8f38-49ff-aae0-d6109c46873d';

-- Retail customer 2: Brian Kariuki → Mohammed Ali
UPDATE profiles
SET full_name = 'Mohammed Ali',
    email = 'mohammed.ali@example.com'
WHERE id = '22222222-2222-2222-2222-222222222222';

-- RM: Peter Mwangi → James Rodriguez
UPDATE profiles
SET full_name = 'James Rodriguez',
    email = 'james.rm@bank.com'
WHERE id = '51880b1d-3935-49dd-bac6-9469d33d3ee3';

-- Risk: Grace Wanjiku → David Kim
UPDATE profiles
SET full_name = 'David Kim',
    email = 'david.kim@bank.com'
WHERE id = '2be06428-7933-41f5-a426-f27478e75c1c';

-- Card holders
UPDATE cards
SET cardholder_name = 'SARAH CHEN'
WHERE customer_id = '4e140685-8f38-49ff-aae0-d6109c46873d';

UPDATE cards
SET cardholder_name = 'MOHAMMED ALI'
WHERE customer_id = '22222222-2222-2222-2222-222222222222';

-- Verify banking
SELECT id, full_name, email, role, assigned_rm_id
FROM profiles
WHERE id IN (
  '4e140685-8f38-49ff-aae0-d6109c46873d',
  '22222222-2222-2222-2222-222222222222',
  '51880b1d-3935-49dd-bac6-9469d33d3ee3',
  '2be06428-7933-41f5-a426-f27478e75c1c'
);

SELECT cardholder_name, last_four, type
FROM cards
WHERE customer_id IN (
  '4e140685-8f38-49ff-aae0-d6109c46873d',
  '22222222-2222-2222-2222-222222222222'
);


-- =========================================================================
-- STEP 2 — CALL CENTER DB
-- =========================================================================

-- Amina Odhiambo → Sarah Chen
UPDATE customers
SET name = 'Sarah Chen',
    email = 'sarah.chen@example.com'
WHERE id = '4e140685-8f38-49ff-aae0-d6109c46873d';

-- Brian Kariuki → Mohammed Ali
UPDATE customers
SET name = 'Mohammed Ali',
    email = 'mohammed.ali@example.com'
WHERE id = '22222222-2222-2222-2222-222222222222';

-- Verify call center
SELECT id, name, email
FROM customers
WHERE id IN (
  '4e140685-8f38-49ff-aae0-d6109c46873d',
  '22222222-2222-2222-2222-222222222222'
);
