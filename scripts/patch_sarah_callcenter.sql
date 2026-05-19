-- =========================================================================
-- SARAH CHEN — CALL CENTER CLEANUP
-- Run in Call Center Supabase SQL Editor
-- Remove duplicate "card lost" convos, keep the meaningful ones
-- =========================================================================

-- -------------------------------------------------------------------------
-- STEP 1: See what we have
-- -------------------------------------------------------------------------
SELECT id, subject, status, channel FROM conversations
WHERE customer_id = '4e140685-8f38-49ff-aae0-d6109c46873d'
ORDER BY created_at DESC;

-- -------------------------------------------------------------------------
-- STEP 2: Delete duplicate/noisy conversations
-- Keep: Card dispute, Travel notice, Account access locked,
--        Chargeback request, Billing inquiry, Thank you
-- Remove: 5x "Card lost"/"Lost Card"/"Card help"/"Card blocked"
-- -------------------------------------------------------------------------
DELETE FROM messages
WHERE conversation_id IN (
  '8a969520-471e-4593-ad3b-fb417a72a32f',  -- "Credit card lost"
  'bb8fe8b9-f109-486a-9b88-6ee596f9b8cb',  -- "I lost my card"
  '7a633002-bb21-4eb6-a35c-7018bd296aee',  -- "Card lost"
  '597945a5-1cdc-410d-bd8d-8b94f438efde',  -- "Card blocked"
  'b6b4e56c-178a-4445-a062-83c6e98d0325',  -- "Card help"
  '1b9b7cf2-3f4d-46b6-88e7-356273c2b8da',  -- "Card help" (dup)
  'aad4132e-448c-47b8-ad03-e01f94267e75',  -- "Card lost" (dup)
  'c514fa7e-6bec-4f80-882e-8e2136e20a2d',  -- "Card lost" (dup)
  'b86a1c6f-fbbc-4f38-9582-4508e45f837d'   -- "Lost Card"
);

DELETE FROM conversations
WHERE id IN (
  '8a969520-471e-4593-ad3b-fb417a72a32f',
  'bb8fe8b9-f109-486a-9b88-6ee596f9b8cb',
  '7a633002-bb21-4eb6-a35c-7018bd296aee',
  '597945a5-1cdc-410d-bd8d-8b94f438efde',
  'b6b4e56c-178a-4445-a062-83c6e98d0325',
  '1b9b7cf2-3f4d-46b6-88e7-356273c2b8da',
  'aad4132e-448c-47b8-ad03-e01f94267e75',
  'c514fa7e-6bec-4f80-882e-8e2136e20a2d',
  'b86a1c6f-fbbc-4f38-9582-4508e45f837d'
);

-- -------------------------------------------------------------------------
-- STEP 3: Verify remaining conversations (should be ~7 meaningful ones)
-- -------------------------------------------------------------------------
SELECT id, subject, status, channel, sentiment FROM conversations
WHERE customer_id = '4e140685-8f38-49ff-aae0-d6109c46873d'
ORDER BY created_at DESC;
