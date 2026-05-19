-- =========================================================================
-- RENAME CARDHOLDER NAMES TO KENYAN NAMES (Banking DB)
-- Run in Banking Supabase SQL Editor
-- =========================================================================

-- Amina Odhiambo (was Sarah Chen / SARAH CHEN)
UPDATE cards
SET cardholder_name = 'AMINA ODHIAMBO'
WHERE customer_id = '4e140685-8f38-49ff-aae0-d6109c46873d';

-- Brian Kariuki (was Mohammed Ali / MOHAMMED ALI)
UPDATE cards
SET cardholder_name = 'BRIAN KARIUKI'
WHERE customer_id = '22222222-2222-2222-2222-222222222222';

-- Verify
SELECT cardholder_name, last_four, type FROM cards
WHERE customer_id IN (
  '4e140685-8f38-49ff-aae0-d6109c46873d',
  '22222222-2222-2222-2222-222222222222'
);
