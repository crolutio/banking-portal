-- =========================================================================
-- ADD `market` COLUMN TO CALL CENTER DB TABLES
-- Run in the CALL CENTER Supabase SQL Editor (separate Supabase project).
--
-- Additive only. All existing rows will default to market = 'default'.
-- Safe to run multiple times (uses IF NOT EXISTS guards).
-- =========================================================================


-- -------------------------------------------------------------------------
-- STEP 1 — add `market` column
-- -------------------------------------------------------------------------

ALTER TABLE customers     ADD COLUMN IF NOT EXISTS market TEXT NOT NULL DEFAULT 'default';
ALTER TABLE conversations ADD COLUMN IF NOT EXISTS market TEXT NOT NULL DEFAULT 'default';
ALTER TABLE messages      ADD COLUMN IF NOT EXISTS market TEXT NOT NULL DEFAULT 'default';


-- -------------------------------------------------------------------------
-- STEP 2 — indexes
-- -------------------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_messages_market      ON messages(market);
CREATE INDEX IF NOT EXISTS idx_conversations_market ON conversations(market);
CREATE INDEX IF NOT EXISTS idx_customers_market     ON customers(market);


-- -------------------------------------------------------------------------
-- STEP 3 — verification: every existing row should now show market = 'default'
-- -------------------------------------------------------------------------

SELECT 'customers' AS table_name,
       COUNT(*) AS total_rows,
       COUNT(*) FILTER (WHERE market = 'default') AS default_rows,
       COUNT(*) FILTER (WHERE market <> 'default') AS non_default_rows
FROM customers
UNION ALL
SELECT 'conversations', COUNT(*),
       COUNT(*) FILTER (WHERE market = 'default'),
       COUNT(*) FILTER (WHERE market <> 'default')
FROM conversations
UNION ALL
SELECT 'messages', COUNT(*),
       COUNT(*) FILTER (WHERE market = 'default'),
       COUNT(*) FILTER (WHERE market <> 'default')
FROM messages;
