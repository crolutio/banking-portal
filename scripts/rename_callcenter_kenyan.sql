-- =========================================================================
-- RENAME CUSTOMERS TO KENYAN NAMES (Call Center DB)
-- Run in Call Center Supabase SQL Editor
-- =========================================================================

-- Amina Odhiambo (was Sarah Chen)
UPDATE customers
SET name = 'Amina Odhiambo',
    email = 'amina.odhiambo@email.com'
WHERE id = '4e140685-8f38-49ff-aae0-d6109c46873d';

-- Brian Kariuki (was Mohammed Ali)
UPDATE customers
SET name = 'Brian Kariuki',
    email = 'brian.kariuki@email.com'
WHERE id = '22222222-2222-2222-2222-222222222222';

-- Verify
SELECT id, name, email FROM customers
WHERE id IN (
  '4e140685-8f38-49ff-aae0-d6109c46873d',
  '22222222-2222-2222-2222-222222222222'
);
